import { useSelector } from "react-redux";

const IsOnline = (id, idType) => {
  const allOnlineContacts = useSelector(
    (state) => state.contact.onlineContacts
  );
  const res = { success: false, socketId: null };
  if (idType === "DB") {
    allOnlineContacts?.map((contact) => {
      if (contact.dbId === id) {
        res.success = true;
        res.socketId = contact.socketId;
      }
    });
  } else if (idType === "oAuthSub") {
    allOnlineContacts?.map((contact) => {
      if (contact.oAuthSub === id) {
        res.success = true;
        res.socketId = contact.socketId;
      }
    });
  } else if (idType === "email") {
    allOnlineContacts?.map((contact) => {
      if (contact.email === id) {
        res.success = true;
        res.socketId = contact.socketId;
      }
    });
  }
  return res;
};

export default IsOnline;
