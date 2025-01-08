import { createContext, useState } from "react";

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
  const [oAuthInfo, setOAuthInfo] = useState();
  const [accountDBInfo, setAccountDBInfo] = useState();
  
  return (
    <AccountContext.Provider
      value={{ oAuthInfo, setOAuthInfo, accountDBInfo, setAccountDBInfo }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
