import {  createContext, useState } from "react";


export const SecondSectionContext = createContext(null);

const SecondSectionProvider = ({children}) => {
    const [currentChatLabel,setCurrentChatLabel] = useState(undefined);
    const [dynamicActiveComponent, setDynamicActiveComponent] = useState('ChatSection')
    return (
        <SecondSectionContext.Provider value={{currentChatLabel,setCurrentChatLabel,dynamicActiveComponent,setDynamicActiveComponent}}>
            {children}
        </SecondSectionContext.Provider>
    )
};

export default SecondSectionProvider;