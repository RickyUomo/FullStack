import { createNote, toggleImportant } from './reducers/noteReducer';
import { useSelector, useDispatch } from 'react-redux';

const App = ({ store }) => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state);

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    dispatch(toggleImportant(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.map(note =>
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

export default App;
