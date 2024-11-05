import { createContext, useState } from "react";

const GlobalContext = createContext({
  activeChatExtendedSection : '',
  setActiveChatExtendedSection : () => {},
});

export const GlobalProvider = ({ children }) => {
  const [activeChatExtendedSection, setActiveChatExtendedSection] =
    useState('');

  return (
    <GlobalContext.Provider
      value={{
        activeChatExtendedSection,
        setActiveChatExtendedSection,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
