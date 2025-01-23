import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
    onlineContacts: []
}

const contactsSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        setContacts(state, action) {
            // console.log("in conact slice",action);
            state.contacts = action.payload;
        },
        addContact(state, action) {
            state.contacts.push(action.payload);
        },
        setOnlineContacts(state,action) {
            state.onlineContacts = action.payload;
        },
        addOnlineContacts(state,action) {
            state.onlineContacts.push(action.payload);
        },
        removeOnlineContacts(state,action) {
           const socketId = action.payload;
           const idx = state.onlineContacts.findIndex(contact => contact.socketId === socketId);
           if(idx !== -1) state.onlineContacts.splice(idx,1);
           
        }
    }
});

export const { setContacts, addContact, setOnlineContacts, addOnlineContacts,removeOnlineContacts} = contactsSlice.actions;
export default contactsSlice.reducer;