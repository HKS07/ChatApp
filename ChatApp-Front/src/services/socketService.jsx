import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8080";
let socket = null;

export const initializeSocket = (email, oAuthSub, contacts, id) => {
  socket = io(BASE_URL, {
    query: {
      email: email,
      oAuthSub: oAuthSub,
      contacts: contacts,
      dbId: id,
    },
  });

  socket.on("connect", () => {
    console.log("Connect to socket server");
    console.log("socket id:", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("Disconnected from socket server.");
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const checkIsUserOnline = (emailId) => {
  console.log("email", emailId);

  return new Promise((resolve) => {
    socket.once("responseIsUserOnline", (response) => resolve(response));
    socket.emit("isUserOnline", { email: emailId });
  });
};

export const updateStatusSocket = ({ status, reqId, socketId }) => {
  console.log(status, reqId, typeof reqId, socketId);

  return new Promise((resolve, reject) => {
    socket.once("updateStatusAck", (response) => {
      if (response?.success) {
        resolve(true);
      } else {
        reject(new Error("Status update failed"));
      }
    });

    socket.emit("updateStatusSender", {
      status: status,
      reqId: reqId,
      requestSenderSocketId: socketId,
    });
  });
};

export const addContactSocket = ({ accountEmail, senderEmail }) => {
  return new Promise((resolve, reject) => {
    socket.once("addContactAck", (response) => {
      if (response?.success) {
        resolve(true);
      } else {
        reject(new Error("Add Contact Failed through socket."));
      }
    });
    socket.emit("addContact", {
      userAEmailId: accountEmail,
      userBEmailId: senderEmail,
    });
  });
};

export const createConversationSocket = ({
  accountEmail,
  senderEmail,
  socketId,
}) => {
  return new Promise((resolve, reject) => {
    socket.once("createConversationAck", (response) => {
      if (response?.success) {
        resolve(response);
      } else {
        reject(new Error("create conversation failed in socket"));
      }
    });

    socket.emit("createConversation", {
      primaryUserEmail: accountEmail,
      secondryUserEmail: senderEmail,
      requestSenderSocketId: socketId,
    });
  });
};

export const sendRequestSocket = ({
  accountEmail,
  receiverEmail,
  socketId,
}) => {
  return new Promise((resolve, reject) => {
    socket.once("sendRequestAck", (response) => {
      if (response?.success) {
        resolve(true);
      } else {
        reject(new Error("send request through socket failed."));
      }
    });

    socket.emit("sendRequest", {
      senderEmail: accountEmail,
      receiverEmail: receiverEmail,
      receiverSocketId: socketId,
    });
  });
};

export const sendMessageSocket = ({ conversationId, senderId, content, receiverSocketId }) => {
  return new Promise((resolve, reject) => {
    socket.once("sendMessageAck", (response) => {
      if (response?.success) {
        resolve(response);
      } else {
        reject(new Error("message not sent"));
      }
    });

    socket.emit("sendMessage", {
      conversationId: conversationId,
      senderId: senderId,
      content: content,
      recSocketId: receiverSocketId
    });
  });
};
