import { combineReducers } from "redux";
import accountReducer from '../features/accountSlice';
import contactsReducer from '../features/contactsSlice';
import conversationReducer from '../features/conversationsSlice';
import globalReducer from '../features/globalSlice';
import messageReducer from '../features/messagesSlice';
import secondSectionReducer from '../features/secondSectionSlice';

const rootReducer = combineReducers({
    account: accountReducer,
    contact: contactsReducer,
    conversation: conversationReducer,
    global: globalReducer,
    message: messageReducer,
    secondSection: secondSectionReducer, 
});

export default rootReducer;