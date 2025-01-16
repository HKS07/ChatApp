import MessageBox from "./MessageBox";
import { SecondSectionContext } from "../../context/SecondSection";
import { useContext, useEffect, useRef } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../features/messagesSlice";

const Body = () => {
  const dispatch = useDispatch();
  // const [currentmessages, setCurrentMessages] = useState(null);
  // const { currentConversationUser } = useContext(SecondSectionContext);
  const currentConversationUser = useSelector(state => state.secondSection.currentConversationUser);
  const accountDBInfo = useSelector(state => state.account.accountDBInfo);
  // const { messages, setMessages } = useContext(MessageContext);
  const messages = useSelector(state => state.message.messages);
  const messagesEndRef = useRef(null);
  
  // console.log(messages);

  const handleScrollDown = () => {
    if(messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: "instant"});
    }
  }
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:8080/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conversationId: currentConversationUser.convoId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch currentmessages");
      }

      const formattedMessages = await response.json();
      return formattedMessages;
    } catch (error) {
      console.error("Error fetching currentmessages:", error);
      return [];
    }
  };

  useEffect(() => {
    if(messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }
  },[messages]);

  useEffect(() => {
    const loadMessages = async () => {
      const getMessages = await fetchMessages();
      if (getMessages.length === 0) {console.log("nothing in currentmessages"); }
      const message = getMessages?.messages;
      const sortedMessages = message.sort(
        (a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)
      );
      dispatch(setMessages(sortedMessages));
    };

    
    loadMessages();
  }, [currentConversationUser]);

  
  return (
    <div className="relative flex-grow w-full bg-message-body text-customLightWhite">
      <div className=" flex flex-col  h-[640px] overflow-y-scroll custom-scrollbar">
        <div className="absolute right-0 bottom-0 m-4 rounded-full text-xl outline-none p-1 bg-customGray" onClick={() => handleScrollDown()}>
          <FaAnglesDown />
        </div>
        {messages ? (
          messages?.map((message) => {
            const timeNow = new Date(message?.timeStamp)?.toLocaleTimeString("en-IN", {hour: "2-digit", minute:"2-digit", hour12: true});
            return <MessageBox
              key={message.id}
              message={message?.content}
              time={timeNow}
              isRead={false}
              byUser={accountDBInfo.id === message.senderId ? true : false}
            />;
          })
        ) : (
          <></>
        )}
        <div ref={messagesEndRef} />
      </div>
      
    </div>
  );
};

export default Body;
