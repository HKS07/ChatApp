import { useContext, useState } from "react";
import MessageSection from "./components/MessageSection";
import NotificationSection from "./components/NotificationSection";
import DynamicSection from "./components/DynamicSection";
import ChatExtendedSection from "./components/ChatExtendedSection";
import { AccountContext } from "./context/AccountProvider";
import Login from "./components/Login";

function App() {
  const { account } = useContext(AccountContext);
  console.log("account:",account);
  
  const [activeComponent, setActiveComponent] = useState("ChatSection");
  const handleComponentChange = (componentName) => {
    setActiveComponent(componentName);
  };
  return (
    <>
      {account === undefined? (
        <Login />
      ) : (
        <div className="bg-[#262524] m-0 p-0">
          <div className="p-4 flex flex-row  min-h-screen">
            <NotificationSection
              activeComponent={activeComponent}
              onComponentChange={handleComponentChange}
            />
            <DynamicSection activeComponent={activeComponent} />
            <MessageSection />
            <ChatExtendedSection />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
