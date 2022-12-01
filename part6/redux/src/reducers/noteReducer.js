import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action) {// action creator
            const content = action.payload;
            state.push({ // use Immer internally, so it can mutate the state
                id: generateId(),
                important: false,
                content
            })
        },
        toggleImportanceOf(state, action) {
            const id = action.payload;
            const noteToChange = state.find(n => n.id === id);
            noteToChange.important = !noteToChange.important;
        }
    }
});

export default noteSlice.reducer;
export const { createNote, toggleImportanceOf } = noteSlice.actions;

/* Standard Redux Reducers and action creator */

// export default function noteReducer(state = initialState, action) {
//     switch (action.type) {
//         case 'NEW_NOTE':
//             return state.concat(action.data);
//         case 'TOGGLE_IMPORTANCE': {
//             const id = action.data.id;
//             const noteToChange = state.find(note => note.id === id);
//             const changedNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             };

//             return state.map(note => note.id !== id ? note : changedNote);
//         }
//         default:
//             return state;
//     }
// };

// export const createNote = (content) => { // action creator
//     return {
//         type: 'NEW_NOTE',
//         data: {
//             content,
//             id: generateId(),
//             important: false
//         }
//     }
// };

// export const toggleImportanceOf = (id) => {
//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         data: {
//             id
//         }
//     }
// };