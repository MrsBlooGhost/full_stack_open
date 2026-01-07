import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
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

    const alreadyExists = persons.some(person => person.name.toLowerCase() === newName.toLowerCase())
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 };
    setPersons(prev => prev.concat(newPerson));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
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
      />
    </div>
  )
}

export default App