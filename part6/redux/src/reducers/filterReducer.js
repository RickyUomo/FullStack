import { createSlice } from '@reduxjs/toolkit';

const initialState = 'ALL';

const filterSlice = createSlice({
    name: 'slice',
    initialState,
    reducers: {
        filterChange(state, action) {
            state = action.payload;
            return state;
        }
    }
});

export default filterSlice.reducer;
export const { filterChange } = filterSlice.actions;


// export default function filterReducer(state = 'ALL', action) {
//     switch (action.type) {
//         case 'SET_FILTER':
//             return action.filter;
//         default:
//             return state;
//     }
// };

// export const filterChange = filter => {
//     return {
//         type: 'SET_FILTER',
//         filter
//     }
// };