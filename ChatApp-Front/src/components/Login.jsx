import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setConversations } from "../features/conversationsSlice";
import { setSentRequest } from "../features/secondSectionSlice";
import { setReceivedRequest } from "../features/secondSectionSlice";
import {
  fetchUserData,
  fetchRequestData,
  fetchContactsData,
  fetchConversationData,
} from "./FirstSectionService";
import { setAccountDBInfo, setOAuthInfo } from "../features/accountSlice";
import { setContacts } from "../features/contactsSlice";

const ChatAppWebLogin = () => {
  const dispatch = useDispatch();
  // const {  setReceivedRequest } =
  //   useContext(SecondSectionContext);

  const onLoginError = (res) => {
    console.log("Login Failed", res);
  };

  const onLoginSuccess = async (res) => {
    try {
      const decoded = jwtDecode(res.credential);
      // setOAuthInfo(decoded);
      dispatch(setOAuthInfo(decoded));

      //Fetching user information
      const userData = await fetchUserData({
        oAuthSub: decoded.sub,
        username: decoded.name,
        profileUrl: decoded.picture,
        email: decoded.email,
      });
      
      // setAccountDBInfo(userData.user);
      dispatch(setAccountDBInfo(userData.user));

      //Fetching user requests
      const requests = await fetchRequestData({ userId: userData.user.id });
      const sentRequest = requests?.request?.filter(
        (req) => req.senderEmail === decoded.email
      );
      const receivedRequest = requests?.request?.filter(
        (req) => req.receiverEmail === decoded.email
      );
      dispatch(setSentRequest(sentRequest));
      dispatch(setReceivedRequest(receivedRequest));

      //fetching user contacts
      const userContactsData = await fetchContactsData(userData.user.id);
      dispatch(setContacts(userContactsData.contacts));

      //fetch all the conversations
      const conversationData = await fetchConversationData({
        userId: userData.user.id,
      });
      
      dispatch(setConversations(conversationData?.conversations || []));



    } catch (error) {
      console.error("Error during login process:", error);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen bg-[#FCF5EB]">
      <div className="bg-white rounded-lg shadow-md p-8 flex items-center max-w-2xl w-full">
        <div className="mr-8">
          <div>
            <h1 className="text-3xl my-4">Log into ChatApp Web</h1>
            <h2 className="text-xl my-2">
              Message privately with friends and family using Chatapp on your
              browser.
            </h2>
            <h2>Sign up/in using gmail id</h2>
          </div>
        </div>
        <div>
          <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
        </div>
      </div>
    </div>
  );
};

export default ChatAppWebLogin;
