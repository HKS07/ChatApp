import { useContext, useState } from "react";
import { FaPaperPlane, FaCheck, FaTimes } from "react-icons/fa";
import { AccountContext } from "./../../context/AccountProvider";
import { SecondSectionContext } from "../../context/SecondSection";
import { ConversationContext } from "../../context/ConversationContext";

const handleStatusUI = (status) => {
  const pending = "text-yellow-500 border border-yellow-500";
  const accepted = "text-green-500 border border-green-500";
  const rejected = "text-red-500 border border-red-500";
  if (status === "Pending") return pending;
  else if (status === "Accepted") return accepted;
  else return rejected;
};

const SendRequestLabel = ({ req }) => {
  return (
    <div
      key={req.id}
      className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3"
    >
      <div className="text-white">Request to {req.receiverEmail}</div>
      <div className={`${handleStatusUI(req.status)} px-2 py-1 rounded-lg`}>
        {req.status}
      </div>
    </div>
  );
};

const ReceiveRequestLabel = ({ req, updateStatus }) => {
  return (
    <div
      key={req.id}
      className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3"
    >
      <div className="text-white">Request from {req.senderEmail}</div>
      <div className="space-x-3 flex items-center">
        <button
          className="bg-green-500 p-2 rounded-full text-white cursor-pointer"
          onClick={() => updateStatus("Accepted", req)}
        >
          <FaCheck />
        </button>
        <button
          className="bg-red-500 p-2 rounded-full text-white"
          onClick={() => updateStatus("Rejected", req)}
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
};

const AddUserSection = () => {
  const { accountDBInfo } = useContext(AccountContext);
  const { sentRequest, receivedRequest, setReceivedRequest } =
    useContext(SecondSectionContext);
  const {conversations, setConversations} = useContext(ConversationContext);

  const [category, setCategory] = useState("Received"); // Tracks active section
  const [emailId, setEmailId] = useState("");
  // const [isSentSucceed, setIsSentSucceed] = useState();
  // console.log("sender request",sentRequest,"received request",receivedRequest);

  const handleCategory = (type) => {
    setCategory(type);
  };

  const handleSendRequest = async () => {
    try {
      const sendRequest = await fetch(
        "http://localhost:8080/requests/sendRequest",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            senderEmail: accountDBInfo.email,
            receiverEmail: emailId,
          }),
        }
      );
    } catch (error) {
      console.log("error while sending request", error);
    }
  };

  const updateStatus = async (status, req) => {
    const updatedStatus = await fetch(
      "http://localhost:8080/requests/updateStatus",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: status,
          reqId: req.id,
        }),
      }
    );
    
    if (updatedStatus.ok) {
      const newReceivedRequest = receivedRequest.filter(
        (recReq) => recReq.id !== req.id
      );
      setReceivedRequest(newReceivedRequest);

      if (status === "Accepted") {
        // this will add user to accepter contact
        const addNewContact = await fetch("http://localhost:8080/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userAEmailId: accountDBInfo.email,
            userBEmailId: req.senderEmail,
          }),
        });

        //create new chat and put chat id to both the user.
        //think more before writing this code!!!!!!!

        
        const addConversation = await fetch("http://localhost:8080/conversation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              primaryUserEmail: accountDBInfo.email,
              secondryUserEmail: req.senderEmail,
            }),
          });

        const convo = await addConversation.json();
        
        const currentConversation = conversations;
        currentConversation.push( convo.conversations);
        setConversations(currentConversation);
        
        
      }
    }
  };

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
          <button
            className="bg-customGreen text-customGreen3 p-2 rounded-lg flex items-center"
            onClick={() => handleSendRequest()}
          >
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
            {receivedRequest ? (
              receivedRequest?.map((req) => {
                if (req.status === "Pending") {
                  return (
                    <ReceiveRequestLabel
                      key={req.id}
                      req={req}
                      updateStatus={updateStatus}
                    />
                  );
                } else {
                  return (
                    <div
                      key={req.id}
                      className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3"
                    >
                      <div className="text-white">
                        Request to {req.receiverEmail}
                      </div>
                      <div
                        className={`${handleStatusUI(
                          req.status
                        )} px-2 py-1 rounded-lg`}
                      >
                        {req.status}
                      </div>
                    </div>
                  );
                }
              })
            ) : (
              <></>
            )}
            {/* Add more requests as needed */}
          </div>
        ) : (
          <div>
            {/* Sent Requests UI */}
            {sentRequest ? (
              sentRequest.map((req) => (
                <SendRequestLabel key={req.id} req={req} />
              ))
            ) : (
              <></>
            )}
            {/* <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg mb-3">
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
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddUserSection;
