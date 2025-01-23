import connectedUsers from "../utils/connectedUsers.js";

export const setupStatusHandlers = (io, socket) => {
    socket.on("getAllContactsStatus", () => {
        const currentUser = connectedUsers.get(socket.id);
        const currentConnectedContacts = [];
        connectedUsers.forEach((value, key) => {
            if (currentUser.contacts.includes(value.dbId)) {
                const { contacts, ...rest } = value;
                currentConnectedContacts.push({ socketId: key, ...rest });
            }
        });
        socket.emit("connectedContacts", currentConnectedContacts);
    });

    // Notify contacts when the user connects
    const currentUser = connectedUsers.get(socket.id);
    if (currentUser) {
        notifyContactsOnConnect(io,socket,currentUser);
    }

    // Notify contacts when the user disconnects
    socket.on("disconnect", () => {
        const currentUser = connectedUsers.get(socket.id);
        if (currentUser) {
            notifyContactsOnDisconnect(io,socket,currentUser);
            connectedUsers.delete(socket.id);
        }
        console.log(`User disconnected: ${socket.id}`);
    });
};

const findSocketIdbyUserDbId = (dbId) => {
    let socketId = null;
    connectedUsers.forEach((value, key) => {
        if (value.dbId === dbId) {
            socketId = key;
        }
    });
    return socketId;
};

const notifyContactsOnConnect = (io,socket,currentUser) => {
    // if (typeof currentUser?.contacts === "string") {
    //     currentUser.contacts = [currentUser.contacts];
    // }
    for (const contactsDBId of currentUser?.contacts) {
        const contactSocketId = findSocketIdbyUserDbId(contactsDBId);
        // console.log("notifyContactsOnConnect",contactSocketId);
        
        if (contactSocketId) {
            const { contacts, ...rest } = currentUser;
            io.to(contactSocketId).emit("newContactConnected", {
                socketId: socket.id,
                ...rest,
            });
        }
    }
};

const notifyContactsOnDisconnect = (io,socket,currentUser) => {
    // if (typeof currentUser?.contacts === "string") {
    //     currentUser.contacts = [currentUser.contacts];
    // }
    for (const dbId of currentUser?.contacts) {
        const contactSocketId = findSocketIdbyUserDbId(dbId);
        if (contactSocketId) {
            io.to(contactSocketId).emit("contactDisconnected", {
                socketId: socket.id,
            });
        }
    }
};
