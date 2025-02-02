import {
  addOnlineContacts,
  setOnlineContacts,
  removeOnlineContacts,
  addContact,
} from "./slices/contactsSlice";
import { addConversation } from "./slices/conversationsSlice";
import {
  addSentRequest,
  addReceivedRequest,
  updateNotificationFlag,
  updateSentRequestStatus,
} from "./slices/secondSectionSlice";

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
    dispatch(updateNotificationFlag({ type: "receivedRequest", flag: true }));
  });

  socket.on("sendRequestSuccess", (data) => {
    dispatch(addSentRequest(data));
  });

  socket.on("updatedStatusOfSentRequest", (data) => {
    // console.log("inside updatedStatusOfSentRequest", data);
    dispatch(updateSentRequestStatus(data));
  });

  socket.on("createConversationOfRequestSenderAck", (data) => {
    // console.log("inside createConversationOfRequestSenderAck", data?.conversation);
    dispatch(addConversation(data));
  });

  socket.on("getContactInfo", (data) => {
    // console.log("getContactInfo", data.contact, data.contact.contact); 
    dispatch(addContact(data?.contact));
  });

  socket.on("error", (data) => {
    console.log(data);
  });
};
