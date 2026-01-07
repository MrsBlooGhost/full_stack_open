const Numbers = ({ persons, searchName }) => {
  const searchedPersons = persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()));
  const personsToShow = searchName === '' ? persons : searchedPersons;

  return (
    <ul>
      {personsToShow.map(person => 
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      )}
    </ul>
  );
}

export default Numbers;