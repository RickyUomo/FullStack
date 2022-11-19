import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import noteReducer from './reducers/noteReducer';

const store = createStore(noteReducer);
store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const createNote = (content) => { // action creator
  return {
    type: 'NEW_NOTE',
    data: {
      content,
      id: generateId(),
      important: false
    }
  }
};

const toggleImportant = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: {
      id
    }
  }
};

const App = () => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    store.dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    store.dispatch(toggleImportant(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {store.getState().map(note =>
          <li
            key={note.id}
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        )}
      </ul>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => root.render(<App />)

renderApp()
store.subscribe(renderApp)