import { TiTick } from "react-icons/ti";
import { TiTickOutline } from "react-icons/ti";

const MessageBox = ({ message, time, isRead, byUser }) => {
  return byUser ? (
    <div className="flex mx-10 my-2 rounded-md bg-customGreen  max-w-96 p-2 break-words self-end">
      <div>{message}</div>
      <div className="flex items-end text-xs ml-1">
        <div>{time}</div>
        <div className="text-lg">{isRead ? <TiTick /> : <TiTickOutline />}</div>
      </div>
    </div>
  ) : (
    <div className="flex mx-10 my-2 rounded-md bg-customLightGray  max-w-96 p-2 break-words self-start">
      <div >{message}</div>
      <div className="flex items-end text-xs ml-1">
        <div>{time}</div>
        <div className="text-lg">{isRead ? <TiTick /> : <TiTickOutline />}</div>
      </div>
    </div>
  );
};

export default MessageBox;
