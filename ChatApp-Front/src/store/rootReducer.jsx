import { combineReducers } from "redux";
import accountReducer from '../features/accountSlice';
import contactsReducer from '../features/contactsSlice';
import conversationReducer from '../features/conversationsSlice';

const rootReducer = combineReducers({
    account: accountReducer,
    contact: contactsReducer,
    conversation: conversationReducer,
});

export default rootReducer;