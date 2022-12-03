import { createSlice } from '@reduxjs/toolkit';
import noteService from '../service/note';

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
    initialState: [],
    reducers: {
        createNote(state, action) {// action creator
            state.push(action.payload);
        },
        toggleImportanceOf(state, action) {
            const id = action.payload;
            const noteToChange = state.find(n => n.id === id);
            noteToChange.important = !noteToChange.important;
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNote(state, action) {
            return action.payload;
        }
    }
});

export const { createNote, toggleImportanceOf, setNote, appendNote } = noteSlice.actions;

export const initializeNotes = () => { // thunk action creator
    return async (dispatch, getState) => { // thunk function
        const notes = await noteService.getAll();
        dispatch(setNote(notes));
    };
};

export const createNewNote = (content) => {
    return async (dispatch, getState) => {
        const newNote = await noteService.createNew(content);
        dispatch(appendNote(newNote));
    };
};

export default noteSlice.reducer;

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