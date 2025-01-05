import {  createContext, useState } from "react";

export const ConversationContext = createContext(null);

const ConversationContextProvider = ({children}) => {
    const [conversations, setConversations] = useState([]);

    return (
        <ConversationContext.Provider value={{conversations, setConversations}}>
            {children}
        </ConversationContext.Provider>
    )
}

export default ConversationContextProvider;