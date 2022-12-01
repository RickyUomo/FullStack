import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        filterAnecdote(state, action) {
            return state = action.payload;
        }
    }
});

export default filterSlice.reducer;
export const { filterAnecdote } = filterSlice.actions;