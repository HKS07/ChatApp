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

    if(!receiverProfile)
    {
        socket.emit("error", {message: "receiver profile doesn't exists"});
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

    if (connectedUsers.has(receiverSocketId)) {
      socket.to(receiverSocketId).emit("receivedRequest", newRequest);
    }
  });
};
