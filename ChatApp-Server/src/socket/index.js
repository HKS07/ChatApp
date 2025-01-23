import { setupMessageHandlers } from "./message.js";
import { setupStatusHandlers } from "./status.js";
import { setupRequestHandlers } from "./request.js";
import connectedUsers from "../utils/connectedUsers.js";

export const rootSocketHandlers = (io) => {
  io.on("connection", (socket) => {
    const {
      email,
      oAuthSub,
      contacts: rawContacts,
      dbId,
    } = socket.handshake.query;

    let contacts =
      typeof rawContacts === "string" ? [rawContacts] : rawContacts;

    connectedUsers.set(socket.id, {
      email,
      oAuthSub,
      contacts,
      dbId,
    });

    setupMessageHandlers(io, socket);
    setupStatusHandlers(io, socket);
    setupRequestHandlers(io, socket);
  });
};
