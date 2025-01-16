import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentConversationUser: undefined,
  dynamicActiveComponent: "ChatSection",
  sentRequest: null,
  receivedRequest: null,
};

const secondSectionSlice = createSlice({
  name: "secondSection",
  initialState,
  reducers: {
    setCurrentConversationUser(state, action) {
      state.currentConversationUser = action.payload;
    },
    setDynamicActiveComponent(state, action) {
      state.dynamicActiveComponent = action.payload;
    },
    setSentRequest(state, action) {
      state.sentRequest = action.payload;
    },
    setReceivedRequest(state, action) {
      state.receivedRequest = action.payload;
    },
  },
});

export const {
  setCurrentConversationUser,
  setDynamicActiveComponent,
  setReceivedRequest,
  setSentRequest,
} = secondSectionSlice.actions;
export default secondSectionSlice.reducer;
