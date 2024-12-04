import { createContext, useState } from "react";

export const AccountContext = createContext(null);

const AccountProvider = ({children}) => {
    const [oAuthInfo, setOAuthInfo] = useState();
    const [accountDBInfo, setAccountDBInfo] = useState();
    // console.log("information fetched at account provider,", accountDBInfo);
    
    return (
        <AccountContext.Provider value={{oAuthInfo,setOAuthInfo,accountDBInfo,setAccountDBInfo}}>
            {children}
        </AccountContext.Provider>
    )
}

export default AccountProvider;