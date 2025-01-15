import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GlobalProvider } from "./context/GlobalContext.jsx";
import AccountProvider from "./context/AccountProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import SecondSectionProvider from "./context/SecondSection.jsx";
import ContactsContextProvider from "./context/ContactsContext.jsx";
import ConversationContextProvider from "./context/ConversationContext.jsx";
import { Provider } from "react-redux";
import store from "./store/index.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="372673861512-s8oa4olta75onc8q418itb2jvmhlcm4e.apps.googleusercontent.com">
      <GlobalProvider>
        <AccountProvider>
          <SecondSectionProvider>
            <ContactsContextProvider>
              <ConversationContextProvider>
                <Provider store={store}>
                  <App />
                </Provider>
              </ConversationContextProvider>
            </ContactsContextProvider>
          </SecondSectionProvider>
        </AccountProvider>
      </GlobalProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
