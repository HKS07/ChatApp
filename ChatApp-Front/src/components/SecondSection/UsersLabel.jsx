import { SecondSectionContext } from "../../context/SecondSection";
import { useContext } from "react";

const getDateTime = (isoDateString) => {
  const messageDateObj = new Date(isoDateString);
  const currentDateObj = new Date();

  if (
    messageDateObj.getDate() === currentDateObj.getDate() &&
    messageDateObj.getMonth() === currentDateObj.getMonth() &&
    messageDateObj.getFullYear() === currentDateObj.getFullYear()
  ) {
    return messageDateObj.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else {
    return messageDateObj.toLocaleDateString("en-IN");
  }
};

const UserLable = ({ id, username, profileUrl, msg, convoId, updatedAt }) => {
  const { setCurrentConversationUser } = useContext(SecondSectionContext);
  const dateTime = getDateTime(updatedAt);

  const onClickSetLabel = (id, username, profileUrl, convoId) => {
    setCurrentConversationUser({
      id: id,
      username: username,
      profileUrl: profileUrl,
      convoId: convoId,
    });
  };
  return (
    <div
      className="flex w-[95%] hover:bg-customDarkWhite2 cursor-pointer"
      onClick={() => onClickSetLabel(id, username, profileUrl, convoId)}
    >
      <div className="text-4xl m-2 py-3 w-14 h-14">
        <img src={profileUrl} alt="" />
      </div>
      <div className="w-full py-3 pr-5 border-b border-customDarkWhite">
        <div className="flex justify-between">
          <div className="text-customLightWhite">{username}</div>
          <div className=" text-customDarkWhite">
            {msg !== "Tap to being conversation" ? dateTime : ""}
          </div>
        </div>
        <div className="text-customDarkWhite">{msg ? msg : ""}</div>
      </div>
    </div>
  );
};

export default UserLable;
