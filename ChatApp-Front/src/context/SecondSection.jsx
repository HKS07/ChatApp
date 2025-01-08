import { createContext, useState } from "react";

export const SecondSectionContext = createContext(null);

const SecondSectionProvider = ({ children }) => {
  const [currentConversationUser, setCurrentConversationUser] =
    useState(undefined);
  const [dynamicActiveComponent, setDynamicActiveComponent] =
    useState("ChatSection");
  const [sentRequest, setSentRequest] = useState();
  const [receivedRequest, setReceivedRequest] = useState();

    

  return (
    <SecondSectionContext.Provider
      value={{
        currentConversationUser,
        setCurrentConversationUser,
        dynamicActiveComponent,
        setDynamicActiveComponent,
        sentRequest,
        setSentRequest,
        receivedRequest,
        setReceivedRequest,
      }}
    >
      {children}
    </SecondSectionContext.Provider>
  );
};

export default SecondSectionProvider;
