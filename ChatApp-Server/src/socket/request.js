import { PrismaClient } from "@prisma/client";
import connectedUsers from "../utils/connectedUsers.js";
const prisma = new PrismaClient();

export const setupRequestHandlers = (io, socket) => {
  socket.on("sendRequest", async (data) => {
    const { senderEmail, receiverEmail, receiverSocketId } = data;

    const requestExists = await prisma.request.findFirst({
      where: {
        OR: [
          { senderEmail, receiverEmail },
          { senderEmail: receiverEmail, receiverEmail: senderEmail },
        ],
      },
    });

    if (requestExists) {
      socket.emit("error", { message: "Request already exists" });
      return;
    }

    const receiverProfile = await prisma.profiles.findUnique({
      where: {
        email: receiverEmail,
      },
    });

    const senderProfile = await prisma.profiles.findUnique({
      where: {
        email: senderEmail,
      },
    });

    if (!receiverProfile) {
      socket.emit("error", { message: "receiver profile doesn't exists" });
      return;
    }
    const newRequest = await prisma.request.create({
      data: {
        senderEmail: senderEmail,
        receiverEmail: receiverEmail,
      },
    });

    //sender profile
    await prisma.profiles.update({
      where: {
        id: senderProfile.id,
      },
      data: {
        requests: {
          push: newRequest.id,
        },
      },
    });
    //receiver profile
    await prisma.profiles.update({
      where: {
        id: receiverProfile.id,
      },
      data: {
        requests: {
          push: newRequest.id,
        },
      },
    });

    // console.log("connectedUsers ",connectedUsers);
    // console.log("from ", socket.id, "to ", receiverSocketId);

    socket.emit("sendRequestSuccess", newRequest);
    if (connectedUsers.has(receiverSocketId)) {
      console.log("sending request");

      socket.to(receiverSocketId).emit("receivedRequest", newRequest);
    }
  });

  socket.on("updateStatusSender", async (data) => {
    const { status, reqId, requestSenderSocketId } = data;
    console.log(status, reqId, requestSenderSocketId);

    try {
      const request = await prisma.request.findUnique({
        where: {
          id: reqId,
        },
      });

      if (!request) {
        socket.emit("error", { message: "No such request exists." });
      }

      await prisma.request.update({
        where: {
          id: reqId,
        },
        data: {
          status: status,
        },
      });

      socket.emit("updateStatusAck", { success: true });
      socket
        .to(requestSenderSocketId)
        .emit("updatedStatusOfSentRequest", { status: status, reqId: reqId });
    } catch (error) {
      socket.emit("error", {
        message: `error while updating status: ${error}`,
      });
      socket.emit("updateStatusAck", { success: false });
    }
  });

  socket.on("addContact", async (data) => {
    // userAEmailId = receiver of friend request, userBEmailId = sender of firent request
    const { userAEmailId, userBEmailId } = data;
    try {
      const userA = await prisma.profiles.findUnique({
        where: { email: userAEmailId },
      });
      const userB = await prisma.profiles.findUnique({
        where: { email: userBEmailId },
      });

      if (!userA || !userB) {
        socket.emit("error", {
          message:
            "Error during adding new contact upon accepting the friend request. user doesn't exists",
        });
        socket.emit("addContactAck", { success: false });
        return;
      }

      await prisma.profiles.update({
        where: {
          email: userA.email,
        },
        data: {
          contacts: {
            push: userB.id,
          },
        },
      });
      await prisma.profiles.update({
        where: {
          email: userB.email,
        },
        data: {
          contacts: {
            push: userA.id,
          },
        },
      });

      const senderContactInfo = {
        id: userB.id,
        username: userB.username,
        status: userB.status,
        email: userB.email,
        profileUrl: userB.profileUrl,
      };
      var socketIdOfContactRequestSender;
      connectedUsers.forEach((value, key) => {
        if (value.email === userBEmailId) {
          socketIdOfContactRequestSender = key;
        }
      });

      const receiverContactInfo = {
        id: userA.id,
        username: userA.username,
        status: userA.status,
        email: userA.email,
        profileUrl: userA.profileUrl,
      };

      socket.emit("getContactInfo", { contact: senderContactInfo });
      socket
        .to(socketIdOfContactRequestSender)
        .emit("getContactInfo", { contact: receiverContactInfo });

      socket.emit("addContactAck", {
        success: true,
        message: "new contact added successfully",
      });
    } catch (error) {
      console.log("error occured during adding contact to usser: ", error);
      socket.emit("addContactAck", {
        success: false,
        message: "new contact add failed",
      });
      socket.emit("error", {
        message: `error occured during adding contact to usser: ${error}`,
      });
    }
  });

  socket.on("createConversation", async (data) => {
    const { primaryUserEmail, secondryUserEmail, requestSenderSocketId } = data;
    try {
      const [primaryUser, secondaryUser] = await prisma.profiles.findMany({
        where: {
          email: {
            in: [primaryUserEmail, secondryUserEmail],
          },
        },
      });

      if (!primaryUser || !secondaryUser) {
        socket.emit("createConversationAck", { success: false });
        socket.emit("error", {
          message: "user doens't exists while creating new conversation",
        });
        return;
      }

      //create a conversation
      const newConversation = await prisma.conversations.create({
        data: {
          participants: [primaryUser.id, secondaryUser.id],
          lastMessage: "Tap to being conversation",
        },
      });

      //Add this conversation id to users profile
      await prisma.profiles.updateMany({
        where: {
          id: {
            in: [primaryUser.id, secondaryUser.id],
          },
        },
        data: {
          conversationId: {
            push: newConversation.id,
          },
        },
      });

      // socket.emit("newContactConnected", {socketId: requestSenderSocketId, restSender});
      {
        const { contacts,oAuthSub, ...rest } = connectedUsers.get(requestSenderSocketId);
        socket.emit("newContactConnected", {socketId: requestSenderSocketId, ...rest});
      }
      {
        const { contacts,oAuthSub, ...rest } = connectedUsers.get(socket.id);
        socket.to(requestSenderSocketId).emit("newContactConnected", {socketId: socket.id, ...rest});
      }
      socket.emit("createConversationAck", {
        success: true,
        message: "new conversation created successfully",
        conversation: newConversation,
      });
      // console.log("requestSenderSocketId",requestSenderSocketId);
      socket
        .to(requestSenderSocketId)
        .emit("createConversationOfRequestSenderAck", {
          success: true,
          message: "new conversation created successfully",
          conversation: newConversation,
        });
    } catch (error) {
      console.log("Error while createConversation", error);
      socket.emit("error", {
        message: `Error while createConversation: ${error}`,
      });
      socket.emit("createConversationAck", {
        success: false,
        message: "new conversation creation failed.",
      });
    }
  });
};
