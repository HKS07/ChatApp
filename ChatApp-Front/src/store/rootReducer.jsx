import { combineReducers } from "redux";
import accountReducer from '../features/slices/accountSlice';
import contactsReducer from '../features/slices/contactsSlice';
import conversationReducer from '../features/slices/conversationsSlice';
import globalReducer from '../features/slices/globalSlice';
import messageReducer from '../features/slices/messagesSlice';
import secondSectionReducer from '../features/slices/secondSectionSlice';

const rootReducer = combineReducers({
    account: accountReducer,
    contact: contactsReducer,
    conversation: conversationReducer,
    global: globalReducer,
    message: messageReducer,
    secondSection: secondSectionReducer, 
});

export default rootReducer;