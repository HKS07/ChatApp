import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    oAuthInfo: undefined,
    accountDBInfo: null,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setOAuthInfo(state,action){
            state.oAuthInfo = action.payload;
        },
        setAccountDBInfo(state,action) {
            state.accountDBInfo = action.payload
        },
    },
});

export const {setOAuthInfo, setAccountDBInfo} = accountSlice.actions;
export default accountSlice.reducer;