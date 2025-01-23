import { useSelector } from "react-redux";


const IsOnline = (id, idType) => {
    const allContacts = useSelector(state => state.contact.onlineContacts);
    if(idType === "DB")
    {
        return allContacts?.some(contact => contact.dbId === id) ? 1: 0;
    }
    else if( idType === "oAuthSub")
    {
        return allContacts?.some(contact => contact.oAuthSub === id) ? 1: 0;
    }
    else if( idType === "email")
    {
        return allContacts?.some(contact => contact.email === id); 
    }
}

export default IsOnline;