import {
  addOnlineContacts,
  setOnlineContacts,
  removeOnlineContacts,
} from "./slices/contactsSlice";

export const registerSocketListeners = (socket, dispatch) => {
  socket.on("disconnect", () => {
    console.log("disconnected from socket");
  });

  socket.on("connectedContacts", (contactStatus) => {
    // console.log("connectedContacts", contactStatus);
    dispatch(setOnlineContacts(contactStatus));
  });

  socket.on("contactDisconnected", (data) => {
    // console.log("contactDisconnected", data)
    dispatch(removeOnlineContacts(data.socketId));
  });

  socket.on("newContactConnected", (data) => {
    // console.log("newContactConnected", data);
    dispatch(addOnlineContacts(data));
  });

  socket.on("error", (data) => {
    console.log(data);
  });
};
