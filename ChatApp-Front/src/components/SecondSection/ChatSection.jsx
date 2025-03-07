import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { LuMessageSquarePlus } from "react-icons/lu";
import UserLable from "./UsersLabel";
import { useDispatch, useSelector } from "react-redux";
import { setDynamicActiveComponent } from "../../features/slices/secondSectionSlice";

const ChatSection = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contact.contacts);
  const accountDBInfo = useSelector((state) => state.account.accountDBInfo);
  const [category, setCategory] = useState("All");
  const [isHovered, setIsHovered] = useState(false);
  const [transformedContacts, setTransformedContacts] = useState();
  const isReceivedRequest = useSelector(state => state.secondSection.isReceivedRequest) ;
  const isUpdatedStatusOfRequest = useSelector(state => state.secondSection.isUpdatedStatusOfRequest);
  // const { conversations } = useContext(ConversationContext);
  const conversations = useSelector(
    (state) => state.conversation.conversations
  );
  
  useEffect(() => {
    if (!contacts || contacts.length == 0) return;
    const tempContacts = Object.values(contacts);
    setTransformedContacts(tempContacts);
  }, [contacts]);  
  
  const handleCategory = (cat) => {
    setCategory(cat);
  };
  return (
    <div className="w-[446px] bg-customBlack text-white">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold mx-5 my-2 py-2">Chats</div>
        <div className="relative flex items-center p-1">
          {/* Icon with hover events */}
          <LuMessageSquarePlus
            className="mx-5 text-2xl cursor-pointer"
            onClick={() =>
              dispatch(setDynamicActiveComponent("AddUserSection"))
            }
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

          {/* Green dot */}
          {(isReceivedRequest || isUpdatedStatusOfRequest) && (
            <div className="absolute top-0 right-4 w-2 h-2 bg-green-500 rounded-full"></div>
          )}

          {/* Tooltip */}
          {isHovered && (
            <div className="absolute z-10 left-14 text-sm p-0 m-0">
              <div className="bg-white text-black rounded-2xl p-2 shadow-lg inline-block whitespace-nowrap">
                Add User
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex px-1 py-2 mx-2 my-1 rounded-lg bg-customLightGray">
        <div className="mx-2 text-2xl text-customDarkWhite">
          <IoIosSearch />
        </div>
        <input
          className="mx-2 bg-customLightGray text-customDarkWhite w-full focus:outline-none"
          placeholder="Search"
        />
      </div>
      <div className="flex px-1 py-2 mx-2 mt-1">
        <div
          onClick={() => handleCategory("All")}
          className={`mr-2 px-2 py-1 rounded-xl cursor-pointer ${
            category == "All"
              ? "bg-customGreen text-customGreen3"
              : "bg-customLightGray text-customDarkWhite"
          }`}
        >
          All
        </div>
        <div
          onClick={() => handleCategory("Unread")}
          className={`mr-2 px-2 py-1 rounded-xl cursor-pointer ${
            category == "Unread"
              ? "bg-customGreen text-customGreen3"
              : "bg-customLightGray text-customDarkWhite"
          }`}
        >
          Unread
        </div>
        <div
          onClick={() => handleCategory("Favourites")}
          className={`mr-2 px-2 py-1 rounded-xl cursor-pointer ${
            category == "Favourites"
              ? "bg-customGreen text-customGreen3"
              : "bg-customLightGray text-customDarkWhite"
          }`}
        >
          Favourites
        </div>
      </div>
      <div className="max-h-[580px] overflow-y-scroll custom-scrollbar">
        {transformedContacts ? (
          transformedContacts.map((contact) => {
            const currentConvo = conversations?.filter((convo) => {
              return (
                convo?.participants?.includes(accountDBInfo.id) &&
                convo?.participants?.includes(contact.id)
              );
            });

            return (
              <UserLable
                key={contact.id}
                {...contact}
                msg={currentConvo[0]?.lastMessage}
                convoId={currentConvo[0]?.id}
                updatedAt={currentConvo[0]?.updatedAt}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ChatSection;
