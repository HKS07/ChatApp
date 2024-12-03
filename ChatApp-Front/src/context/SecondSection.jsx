import {  createContext, useState } from "react";


export const SecondSectionContext = createContext(null);

const SecondSectionProvider = ({children}) => {
    const [currentChatLabel,setCurrentChatLabel] = useState(undefined);
    
    return (
        <SecondSectionContext.Provider value={{currentChatLabel,setCurrentChatLabel}}>
            {children}
        </SecondSectionContext.Provider>
    )
};

export default SecondSectionProvider;