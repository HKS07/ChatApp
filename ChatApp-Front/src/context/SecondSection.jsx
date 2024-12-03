import {  createContext, useState } from "react";


export const SecondSectionContext = createContext(null);

const SecondSectionProvider = ({children}) => {
    const [chatLabel,setChatLabel] = useState();

    return (
        <SecondSectionContext.Provider value={{chatLabel,setChatLabel}}>
            {children}
        </SecondSectionContext.Provider>
    )
};

export default SecondSectionProvider;