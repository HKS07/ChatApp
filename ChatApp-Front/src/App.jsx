import { useContext } from "react";
import MessageSection from "./components/MessageSection";
import NotificationSection from "./components/NotificationSection";
import DynamicSection from "./components/DynamicSection";
import ChatExtendedSection from "./components/ChatExtendedSection";
import { AccountContext } from "./context/AccountProvider";
import Login from "./components/Login";
import MessageContextProvider from "./context/Messagecontext";

function App() {
  const { oAuthInfo } = useContext(AccountContext);

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
