import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      };
      state.push(newAnecdote);
    },
    voteAnecdote(state, action) {
      const anecdoteToChange = state.find(a => a.id === action.payload);
      anecdoteToChange.votes += 1;
    },
    setAnecdotes(state, action) {
      state.push(...action.payload);
    }
  }
});

export default anecdoteSlice.reducer;
export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions;


// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.data.id;
//       const itemToChange = state.find(item => item.id === id);
//       const changedItem = {
//         ...itemToChange,
//         votes: itemToChange.votes + 1
//       }
//       return state.map(item => item.id === id ? changedItem : item);
//     }
//     case 'ADD':
//       return state.concat(action.data);
//     default:
//       return state
//   }
// };

// // action creators below
// export const voteCreator = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// };

// export const newAnecdoteCreator = (content) => {
//   return {
//     type: 'ADD',
//     data: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// };

// export default reducer;