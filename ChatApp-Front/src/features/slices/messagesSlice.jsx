// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   messages: [],
// };

// const messageSlice = createSlice({
//   name: "message",
//   initialState,
//   reducers: {
//     addMessages(state, action) {
//       state.messages.push(action.payload);
//       // state.messages.forEach((v,i) => console.log(i,v)
//       // )
//       const idx = state.messages.findIndex(
//         (msg) => msg.dbId === action.payload.dbId
//       );
//       state.currentUserMessageIdx = idx;
//     },
//     setCurrentUserMessageIdx(state, action) {
//       const idx = state.messages.findIndex(
//         (msg) => msg.dbId === action.payload.id
//       );
//       // console.log("setCurrentUserMessageIdx", action.payload);
//       // state.messages.map(e => console.log(e)
//       // )
//       state.currentUserMessageIdx = idx;
//       if(idx !== -1)
//       state.currentUserMessages = state.messages[idx];
//       else 
//       state.currentUserMessages = []
//     },
//     setCurrentUserMessages(state, action) {
//         const message = action.payload?.messages;
//         const sortedMessages = message.sort(
//           (a, b) => new Date(a.timeStamp) - new Date(b.timeStamp)
//         );
//         state.currentUserMessages = sortedMessages
//     },
//   },
// });

// export const { addMessages, setCurrentUserMessageIdx, setCurrentUserMessages } =
//   messageSlice.actions;
// export default messageSlice.reducer;


import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'message',
  initialState: {
    messages: [], // Array of user message objects
    currentUserMessageIdx: null
  },
  reducers: {
    addMessages: (state, action) => {
      // Check if messages for this user already exist
      const existingUserIndex = state.messages.findIndex(
        msg => msg.id === action.payload.id
      );

      if (existingUserIndex === -1) {
        // If not existing, add new user messages
        state.messages.push(action.payload);
      } else {
        // If existing, replace with new messages
        state.messages[existingUserIndex] = action.payload;
      }
    },
    addMessageToUser: (state, action) => {
      const { id, message } = action.payload;
      
      // Find the user's message object
      const userMessagesIndex = state.messages.findIndex(
        msgObj => msgObj.id === id
      );
      
      // If user messages exist, add new message
      if (userMessagesIndex !== -1) {
        // Ensure messages array exists
        if (!state.messages[userMessagesIndex].messages) {
          state.messages[userMessagesIndex].messages = [];
        }
        
        state.messages[userMessagesIndex].messages.push(message);
      }
    },
    setCurrentUserMessageIdx: (state, action) => {
      state.currentUserMessageIdx = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
      state.currentUserMessageIdx = null;
    }
  }
});

export const { 
  addMessages, 
  setCurrentUserMessageIdx, 
  clearMessages ,
  addMessageToUser
} = messagesSlice.actions;

export default messagesSlice.reducer;