import { useEffect, useState } from "react";
import { FaPaperPlane, FaCheck, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addConversation } from "../../features/slices/conversationsSlice";
import {
  addSentRequest,
  setReceivedRequest,
  updateNotificationFlag,
  updateReceivedRequestStatusInSlice,
} from "../../features/slices/secondSectionSlice";
import {
  sendRequestCall,
  updateStatusCall,
  addNewContactCall,
  createConversationCall,
} from "./Service";
import {
  getSocket,
  checkIsUserOnline,
  updateStatusSocket,
  addContactSocket,
  createConversationSocket,
} from "../../services/socketService";
import { addContact } from "../../features/slices/contactsSlice";

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
  const dispatch = useDispatch();
  const accountDBInfo = useSelector((state) => state.account.accountDBInfo);
  const sentRequest = useSelector((state) => state.secondSection.sentRequest);
  const receivedRequest = useSelector(
    (state) => state.secondSection.receivedRequest
  );
  const isReceivedRequest = useSelector(
    (state) => state.secondSection.isReceivedRequest
  );
  const isUpdatedStatusOfRequest = useSelector(
    (state) => state.secondSection.isUpdatedStatusOfRequest
  );

  useEffect(() => {
    if (isReceivedRequest) {
      dispatch(
        updateNotificationFlag({ type: "receivedRequest", flag: false })
      );
    }
    if (isUpdatedStatusOfRequest) {
      dispatch(updateNotificationFlag({ type: "statusUpdate", flag: false }));
    }
  }, [isReceivedRequest, isUpdatedStatusOfRequest]);

  const [category, setCategory] = useState("Received"); // Tracks active section
  const [emailId, setEmailId] = useState("");

  const handleCategory = (type) => {
    setCategory(type);
  };

  const handleSendRequest = async () => {
    try {
      const socket = getSocket();
      // Remove any existing listener for 'responseIsUserOnline'
      socket.off("responseIsUserOnline");
      socket.emit("isUserOnline", { email: emailId });
      socket.on("responseIsUserOnline", async (response) => {
        const isPresent = response.isPresent;
        const socketId = response?.socketId;
        if (isPresent) {
          console.log("inside socket send email");

          socket.emit("sendRequest", {
            senderEmail: accountDBInfo.email,
            receiverEmail: emailId,
            receiverSocketId: socketId,
          });
        } else {
          const response = await sendRequestCall({
            senderEmail: accountDBInfo.email,
            receiverEmail: emailId,
          });
          if (response?.success) dispatch(addSentRequest(response.newRequest));
        }
        setEmailId("");
      });
    } catch (error) {
      console.log("error while sending request", error.message);
    }
  };

  const updateReceivedRequestStatus = async (status, req) => {
    try {
      const responseFromSocket = await checkIsUserOnline(req.senderEmail);
      const { isPresent, socketId } = responseFromSocket;
      var updatedThroughSocket = false,
        updatedThroughREST = false;
      console.log(isPresent, socketId);
      
      if (isPresent) {
        console.log("isPresnet");
        
        const updateStatusResponse = await updateStatusSocket({
          status: status,
          reqId: req.id,
          socketId: socketId,
        });
        console.log("updated status ack", updateStatusResponse);
        if (updateStatusResponse) updatedThroughSocket = updateStatusResponse;
      } else {
        const updatedStatus = await updateStatusCall({
          status: status,
          reqId: req.id,
        });

        if (updatedStatus.message === "request status updated successfully")
          updatedThroughREST = true;
      }

      if (updatedThroughREST || updatedThroughSocket) {
        dispatch(
          updateReceivedRequestStatusInSlice({ reqId: req.id, status: status })
        );

        if (status === "Accepted" && updatedThroughSocket) {

          const addContactResponse = await addContactSocket({
            accountEmail: accountDBInfo.email,
            senderEmail: req.senderEmail,
          });

          if (addContactResponse) {
            const createConversationResponse = await createConversationSocket({
              accountEmail: accountDBInfo.email,
              senderEmail: req.senderEmail,
              socketId: socketId,
            });
            if (createConversationResponse?.success) {
              dispatch(addConversation(createConversationResponse));
            }
          }
        } else if (status === "Accepted" && updatedThroughREST) {
          const addNewContactResponse = await addNewContactCall({
            userAEmailId: accountDBInfo.email,
            userBEmailId: req.senderEmail,
          });

          dispatch(addContact(addNewContactResponse?.contact));

          const conversationResponse = await createConversationCall({
            primaryUserEmail: accountDBInfo.email,
            secondryUserEmail: req.senderEmail,
          });
          // console.log("conversationResponse");
          
          dispatch(addConversation(conversationResponse));
        }
      }
    } catch (error) {
      console.log("error in update status", error);
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
                      updateStatus={updateReceivedRequestStatus}
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
