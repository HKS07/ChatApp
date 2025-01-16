import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    activeChatExtendedSection : '',
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setActiveChatExtendedSection(state,action){
            state.activeChatExtendedSection = action.payload;
        },
    }
});

export const {setActiveChatExtendedSection} = globalSlice.actions;
export default globalSlice.reducer;