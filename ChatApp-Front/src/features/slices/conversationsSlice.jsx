import {createSlice} from '@reduxjs/toolkit';


const initialState = {
    conversations: [],
}

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setConversations(state, action) {
            state.conversations = action.payload;
        },
        addConversation(state,action){
            console.log("inside add covnersation", action.payload.conversation);
            
            state.conversations.push(action.payload.conversation);
        }
    }
})

export const {setConversations, addConversation} = conversationSlice.actions;
export default conversationSlice.reducer;