import { useContext, useState } from "react";
import { FaPaperPlane, FaCheck, FaTimes } from "react-icons/fa";
import {AccountContext} from './../../context/AccountProvider';
const AddUserSection = () => {
  const {accountDBInfo} = useContext(AccountContext);
  const [category, setCategory] = useState("Received"); // Tracks active section
  const [emailId, setEmailId] = useState("");
  // const [isSentSucceed, setIsSentSucceed] = useState();
  

  const handleCategory = (type) => {
    setCategory(type);
  };

  const handleSendRequest = async () => {
    try {
      
      const sendRequest = await fetch('http://localhost:8080/contact/sendRequest',{
        method: 'POST',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({senderEmail: accountDBInfo.email, receiverEmail:emailId}),
      });
      
      // if(sendRequest.ok)
      // {
      //   setIsSentSucceed(true);
      // }
      // else{
      //   setIsSentSucceed(false);
      // }


    } catch (error) {
      console.log("error while sending request", error);
    }
  }

  return (
    <div className="w-[446px] bg-customBlack text-white p-5 rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Users Requests</div>
      </div>

      {/* Send Request Section */}
      <div className="mt-5">
        <div className="text-xl font-bold mb-2">Send Request</div>
        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Enter user ID"
            value={emailId}
            className="w-full p-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
            onChange={(e) => setEmailId(e.target.value)}
          />
          <button className="bg-customGreen text-customGreen3 p-2 rounded-lg flex items-center" onClick={() => handleSendRequest()}>
            <FaPaperPlane className="mr-1" /> Send
          </button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-5 flex space-x-3">
        <div
          onClick={() => handleCategory("Received")}
          className={`px-3 py-2 rounded-xl cursor-pointer ${
            category === "Received"
              ? "bg-customGreen text-customGreen3"
              : "bg-customLightGray text-customDarkWhite"
          }`}
        >
          Received Requests
        </div>
        <div
          onClick={() => handleCategory("Sent")}
          className={`px-3 py-2 rounded-xl cursor-pointer ${
            category === "Sent"
              ? "bg-customGreen text-customGreen3"
              : "bg-customLightGray text-customDarkWhite"
          }`}
        >
          Sent Requests
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-5">
        {category === "Received" ? (
          <div>
            {/* Received Requests UI */}
            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3">
              <div className="text-white">Request from User123</div>
              <div className="space-x-3 flex items-center">
                <button className="bg-green-500 p-2 rounded-full text-white">
                  <FaCheck />
                </button>
                <button className="bg-red-500 p-2 rounded-full text-white">
                  <FaTimes />
                </button>
              </div>
            </div>
            {/* Add more requests as needed */}
          </div>
        ) : (
          <div>
            {/* Sent Requests UI */}
            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3">
              <div className="text-white">Request to User456</div>
              <div className="text-yellow-500 border border-yellow-500 px-2 py-1 rounded-lg">
                Pending
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3">
              <div className="text-white">Request to User789</div>
              <div className="text-green-500 border border-green-500 px-2 py-1 rounded-lg">
                Accepted
              </div>
            </div>
            <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3">
              <div className="text-white">Request to User012</div>
              <div className="text-red-500 border border-red-500 px-2 py-1 rounded-lg">
                Rejected
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserSection;
