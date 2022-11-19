import { toggleImportant } from './reducers/noteReducer';
import { useSelector } from 'react-redux';

import Form from './components/Form';
import Note from './components/Note';

const App = () => {
  return (
    <div>
      <Form />
      <Note />
    </div>
  )
}

export default App;
