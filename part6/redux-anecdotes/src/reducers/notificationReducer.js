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

export const { createNotification, removeNotification } = notificationSlice.actions;

let hide; // sanitize the timer before a new one register
export const setNotification = (content, displayTime) => async dispatch => {
    dispatch(createNotification(`You voted ${content}`));

    clearTimeout(hide);
    hide = setTimeout(() => dispatch(removeNotification()), displayTime * 1000);
};

export default notificationSlice.reducer;