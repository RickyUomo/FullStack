import Form from './components/Form';
import Notes from './components/Notes';
import VisibilityFilter from './components/VisibilityFilter';
import noteService from './service/note';
import { useEffect } from 'react';
import { setNote, initializeNotes } from './reducers/noteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // noteService      // move fetching into note~Reducer file
    //   .getAll().then(notes => {
    //     dispatch(setNote(notes));
    //   })

    dispatch(initializeNotes());

  }, []);



  return (
    <div>
      <Form />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App;
