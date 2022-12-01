import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            state = action.payload;
            return state;
        },
        removeNotification(state, action) {
            return state = '';
        }
    }
});

export default notificationSlice.reducer;
export const { createNotification, removeNotification } = notificationSlice.actions;