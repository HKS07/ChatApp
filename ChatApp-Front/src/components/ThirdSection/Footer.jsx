import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateConversation } from "../../features/slices/conversationsSlice";
import { addMessageToUser } from "../../features/slices/messagesSlice";
import { messageSentCall } from "./Service";
import IsOnline from "../Utils/isContactOnline";
import {sendMessageSocket} from "../../services/socketService";

const Footer = () => {
  const dispatch = useDispatch();
  const [typedMessage, setTypedMessage] = useState("");
  const currentConversationUser = useSelector(
    (state) => state.secondSection.currentConversationUser
  );

  const accountDBInfo = useSelector((state) => state.account.accountDBInfo);
  const isOnline = IsOnline(currentConversationUser.id, "DB").success;
  const socketId = IsOnline(currentConversationUser.id, "DB").socketId;

  const sendMessage = async () => {
    try {
      var sentBySocket = false,
        sentByRest = false,
        msg;
      
      if (isOnline) {
        const sendMessageResponse = await sendMessageSocket({
          conversationId: currentConversationUser.convoId,
          senderId: accountDBInfo.id,
          content: typedMessage,
          receiverSocketId: socketId,
        });

        if (sendMessageResponse?.success) {
          sentBySocket = true;
          msg = sendMessageResponse;
        }
      } else {
        const messageSentResponse = await messageSentCall(
          currentConversationUser.convoId,
          accountDBInfo.id,
          typedMessage
        );
        if (messageSentResponse) {
          sentByRest = true;
          msg = messageSentResponse;
        }
      }
      if (sentByRest || sentBySocket) {
        dispatch(
          addMessageToUser({id: currentConversationUser.id, message: msg?.newMessage})
        );
        dispatch(updateConversation({convoId: currentConversationUser.convoId, content: typedMessage}))
        setTypedMessage("");
      }
    } catch (error) {
      console.log("error while sending message", error);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="w-full px-3 py-1 bg-customLightGray">
      <div className="w-full flex items-center text-3xl ">
        <div className="m-2 text-customDarkWhite">
          <MdOutlineEmojiEmotions />
        </div>
        <div className="m-2 text-customLightWhite">
          <IoMdAdd />
        </div>
        <div className="my-1 px-2 py-2 flex items-center flex-grow p-1 rounded-lg bg-[#2A3942] ">
          <input
            className="w-full bg-[#2A3942] text-lg  text-customLightWhite focus:outline-none"
            placeholder="Type a message"
            value={typedMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setTypedMessage(e.target.value)}
          />
          {typedMessage ? (
            <IoIosSend
              className="text-customGreen3"
              onClick={() => sendMessage()}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="m-2 text-customDarkWhite">
          <FaMicrophone />
        </div>
      </div>
    </div>
  );
};

export default Footer;
