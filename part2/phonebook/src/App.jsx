import { useState, useEffect } from 'react'
import personService from './services/persons';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(true);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, []);

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    // get the existing person or undefined
    const existingPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())

    if (existingPerson) {
      // confirm replacement of old number with new number with the user
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) return;

    // send replacement request to BE
    const updatedPerson = { ...existingPerson, number: newNumber };
    personService
      .update(existingPerson.id, updatedPerson)
      // update FE state
      .then(returnedPerson => {
        setSuccess(true);
        setPersons(prev => prev.map(person => person.id === existingPerson.id ? returnedPerson : person));
        setNewName('');
        setNewNumber('');
        setMessage(`Updated ${existingPerson.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch(error => {
        setSuccess(false);
        setMessage(`Information of ${existingPerson.name} has already been removed from server`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);

      })
    } else {
      // create the new person
      const newPerson = { name: newName, number: newNumber };
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setSuccess(true);
          setPersons(prev => prev.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setMessage(`Added ${newPerson.name}`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
 
        })
        .catch(err => {
          console.log(err);
          alert('Saving failed');
        })
    }
  }

  const handleDelete = (id, name) => {
    // confirm deletion with the user
    if (!window.confirm(`Delete ${name}?`)) return;

    // send delete request to BE
    personService
      .remove(id)
      // update FE state by removing the person from the array
      .then(() => {
        setPersons(prev => prev.filter(person => person.id !== id));
      })
      .catch(error => {
        console.log(error);
        alert(`there was an error removing ${name} from the list`)
      });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification 
        message={message}
        isSuccessful={success}
      />
      <Filter 
        searchName={searchName} 
        handleSearchChange={handleSearchChange}
      />
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber}
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange} 
        handleSubmit={handleSubmit} 
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        searchName={searchName}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App