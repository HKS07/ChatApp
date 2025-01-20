import { setupMessageHandlers } from "./message.js";
import connectedUsers from "../utils/connectedUsers.js";
import { setupStatusHandlers } from "./status.js";

export const rootSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    const { email, oAuthSub, contacts } = socket.handshake.query;
    connectedUsers.set(socket.id, { email, oAuthSub, contacts });
    // console.log("Connected users:", Array.from(connectedUsers.values()));

    setupMessageHandlers(io, socket);
    setupStatusHandlers(io,socket);

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
