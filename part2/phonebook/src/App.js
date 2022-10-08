import { useState, useEffect } from 'react'
import personService from './services/person';
import Filter from './components/Filter';
import Notification from './components/Notification';
var _ = require('lodash');

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showList, setShowList] = useState([]);
  const [newNumber, setNewNumber] = useState('');
  const [newName, setNewName] = useState('');
  const [message, setMessage] = useState({});

  const getAllData = () => personService.getAll().then(res => setPersons(res));

  useEffect(() => {
    getAllData();
  }, [])

  const addName = (e) => {
    e.preventDefault();
    let isUsed = false;

    const personObject = {
      name: newName,
      number: newNumber
    };

    // _.each(persons, p => {
    //   if (_.isEqual(p.name, personObject.name) || _.isEqual(p.number, personObject.number)) {
    //     alert(`${newName} or ${newNumber} has been used!`);
    //     isUsed = true;
    //   }
    // })

    if (!isUsed) {
      personService.create(personObject)
        .then(res => {
          setPersons(persons.concat(personObject));
          setNewName('');
          setNewNumber('');
          getAllData();
          setMessage({ content: `Added ${personObject.name}`, error: false });

          setTimeout(() => setMessage({}), 5000);
        })
        .catch(err => {
          console.log(['error'], err)
          setMessage({ content: err.response.data.error, error: true });
          setTimeout(() => setMessage({}), 5000);
        })
    }
  }

  const handleChange = e => setNewName(e.target.value);
  const handleNumberChange = e => setNewNumber(e.target.value);

  const filter = e => {
    const filterName = e.target.value.toLowerCase();
    const show = _.filter(persons, p => p.name.toLowerCase().indexOf(filterName) > -1);
    if (show.length) setShowList(show);
  }

  const deletePerson = person => {
    if (window.confirm(`delete ${person.name}?`)) {
      personService.deletePerson(person.id)
        .then(res => {
          getAllData();
        })
    }
  }

  return (
    <div>
      <h2 style={{ color: "green" }}>Phonebook</h2>
      <Notification message={message} />
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
      {showList.length
        ? showList.map(p => <><p key={p.id}>{p.name} {p.number}</p><button onClick={() => deletePerson(p)}>delete</button></>)
        : persons.map(p => <><p key={p.id}>{p.name} {p.number}</p><button onClick={() => deletePerson(p)}>delete</button></>)
      }
    </div>
  )
}

export default App