import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
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
    }
});

export const { setContacts, addContact} = contactsSlice.actions;
export default contactsSlice.reducer;