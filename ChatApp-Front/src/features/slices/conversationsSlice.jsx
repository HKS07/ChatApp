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
            state.conversations.push(action.payload.conversation);
        },
        updateConversation(state,action) {
            const {convoId, content} = action.payload;
            const idx = state.conversations.findIndex(convo => convo.id === convoId);
            if(idx === -1) return;
            state.conversations[idx].lastMessage = content;
            state.conversations[idx].updatedAt = new Date().toString();
            
        }
    }
})

export const {setConversations, addConversation, updateConversation} = conversationSlice.actions;
export default conversationSlice.reducer;