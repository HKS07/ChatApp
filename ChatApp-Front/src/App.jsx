import MessageSection from "./components/MessageSection";
import NotificationSection from "./components/NotificationSection";
import DynamicSection from "./components/DynamicSection";
import ChatExtendedSection from "./components/ChatExtendedSection";
import Login from "./components/Login";
import MessageContextProvider from "./context/Messagecontext";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initializeSocket } from "./services/socketService";
import { registerSocketListeners } from "./features/socketManager";

function App() {
  // const { oAuthInfo } = useContext(AccountContext);
  const dispatch = useDispatch();
  const oAuthInfo = useSelector((state) => state.account.oAuthInfo);
  const accountDBInfo = useSelector((state) => state.account.accountDBInfo);
  
  useEffect(() => {
    if (accountDBInfo) {
      const socket = initializeSocket(
        accountDBInfo.email,
        accountDBInfo.oAuthSub,
        accountDBInfo.contacts,
        accountDBInfo.id
      );

      
      registerSocketListeners(socket,dispatch);

      //getting all connected contacts
      socket.emit("getAllContactsStatus");
    }
  }, [accountDBInfo]);
  return (
    <>
      {oAuthInfo === undefined ? (
        <Login />
      ) : (
        <div className="bg-[#262524] m-0 p-0">
          <div className="p-4 flex flex-row  min-h-screen">
            <NotificationSection />
            <DynamicSection />
            <MessageContextProvider>
              <MessageSection />
            </MessageContextProvider>
            <ChatExtendedSection />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
