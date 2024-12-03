import { createContext, useState } from "react";

export const ContactsContext = createContext(null);

const ContactsContextProvider = ({children}) => {
    const [contacts, setContacts] = useState(undefined);

    return (
        <ContactsContext.Provider value={{contacts,setContacts}}>
        {children}
        </ContactsContext.Provider>
    );
};

export default ContactsContextProvider;