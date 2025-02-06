import { useEffect, useState, useRef } from "react";
import MessageBox from "./MessageBox";
import { FaAnglesDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessages,
} from "../../features/slices/messagesSlice";
import { fetchMessageCall } from "./Service";

const Body = () => {
  const dispatch = useDispatch();
  const accountDBInfo = useSelector((state) => state.account.accountDBInfo);
  const currentConversationUser = useSelector((state) => state.secondSection.currentConversationUser);
  const messagesState = useSelector((state) => state.message.messages);

  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchOrGetMessages = async () => {
      const existingUserMessages = messagesState.find(
        userMessages => userMessages.id === currentConversationUser.id
      );

      if (existingUserMessages) {
        setMessages(existingUserMessages);
        // Scroll to bottom after messages are set
        scrollToBottom();
      } else {
        try {
          const messageResponse = await fetchMessageCall(
            currentConversationUser.convoId
          );

          const userMessageObject = {
            id: currentConversationUser.id,
            ...messageResponse
          };

          dispatch(addMessages(userMessageObject));
          setMessages(userMessageObject);
          // Scroll to bottom after fetching messages
          scrollToBottom();
        } catch (error) {
          console.error("Error fetching current messages:", error);
          setMessages([]);
        }
      }
    };

    if (currentConversationUser) {
      fetchOrGetMessages();
    }
  }, [currentConversationUser, dispatch, messagesState]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="relative flex-grow w-full bg-message-body text-customLightWhite">
      <div className="flex flex-col h-[640px] overflow-y-scroll custom-scrollbar">
        <div
          className="absolute right-0 bottom-0 m-4 rounded-full text-xl outline-none p-1 bg-customGray cursor-pointer"
          onClick={() => scrollToBottom()}>
          <FaAnglesDown />
        </div>
        {messages?.messages?.map((message) => {
          const timeNow = new Date(message?.timeStamp)?.toLocaleTimeString(
            "en-IN",
            { hour: "2-digit", minute: "2-digit", hour12: true }
          );
          return (
            <MessageBox
              key={message.id}
              message={message?.content}
              time={timeNow}
              isRead={false}
              byUser={accountDBInfo.id === message.senderId ? true : false}
            />
          );
        })}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default Body;