import { useState } from 'react'
import Filter from './components/Filter';
var _ = require('lodash');

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [showList, setShowList] = useState([]);
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');

  const addName = (e) => {
    e.preventDefault();
    let isUsed = false;

    const personObject = {
      name: newName,
      number: newNumber
    };

    _.each(persons, p => {
      if (_.isEqual(p.name, personObject.name) || _.isEqual(p.number, personObject.number)) {
        alert(`${newName} or ${newNumber} has been used!`);
        isUsed = true;
      }
    })

    if (!isUsed) {
      setPersons(persons.concat(personObject));
      setNewName('');
      setNewNumber('');
    }
  }

  const handleChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);

  const filter = e => {
    const filterName = e.target.value.toLowerCase();
    console.log(['filterName'], filterName);
    const show = _.filter(persons, p => p.name.toLowerCase().indexOf(filterName) > -1);
    if (show.length) setShowList(show);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} />
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showList.map(p => <p key={p.id}>{p.name} {p.number}</p>)}
    </div>
  )
}

export default App