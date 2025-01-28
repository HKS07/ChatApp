import {
  addOnlineContacts,
  setOnlineContacts,
  removeOnlineContacts,
} from "./slices/contactsSlice";
import { addSentRequest, addReceivedRequest, updateNotificationFlag } from "./slices/secondSectionSlice";

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

  socket.on("receivedRequest", (data) => {
    dispatch(addReceivedRequest(data));
    dispatch(updateNotificationFlag({type: "receivedRequest", flag : true}));
  })

  socket.on("sendRequestSuccess", (data) => {
    dispatch(addSentRequest(data));
  })
  socket.on("error", (data) => {
    console.log(data);
  });
};
