const Persons = ({ persons, searchName, handleDelete }) => {
  const searchedPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));
  const personsToShow = searchName === '' ? persons : searchedPersons;

  return (
    <ul>
      {personsToShow.map(person => 
        <li key={person.id}>
          {person.name} {person.number} <button onClick={() => handleDelete(person.id, person.name)}>delete</button>
        </li>
      )}
    </ul>
  );
}

export default Persons;