import { createSlice, isRejected } from "@reduxjs/toolkit";

const initialState = {
  currentConversationUser: undefined,
  dynamicActiveComponent: "ChatSection",
  sentRequest: [],
  receivedRequest: [],
  isReceivedRequest: false,
  isUpdatedStatusOfRequest: false
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
    addSentRequest(state,action) {
      state.sentRequest.push(action.payload)
    },
    setReceivedRequest(state, action) {
      state.receivedRequest = action.payload;
    },
    addReceivedRequest(state, action) {
      state.receivedRequest.push(action.payload);
    },
    updateNotificationFlag(state, action) {
      if(action.payload.type === "receivedRequest") state.isReceivedRequest = action.payload.flag;
      else state.isUpdatedStatusOfRequest = action.payload.flag;
    },
    updateSentRequestStatus(state,action) {
      const idx = state.sentRequest.findIndex(req => req.id === action.payload.reqId);
      state.sentRequest[idx].status = action.payload.status;
    },
    updateReceivedRequestStatusInSlice(state,action) {
      const idx = state.receivedRequest.findIndex(req => req.id === action.payload.reqId);
      state.receivedRequest[idx].status = action.payload.status;
    }
  },
});

export const {
  setCurrentConversationUser,
  setDynamicActiveComponent,
  setReceivedRequest,
  setSentRequest,
  addSentRequest,
  addReceivedRequest,
  updateNotificationFlag,
  updateSentRequestStatus,
  updateReceivedRequestStatusInSlice
} = secondSectionSlice.actions;
export default secondSectionSlice.reducer;
