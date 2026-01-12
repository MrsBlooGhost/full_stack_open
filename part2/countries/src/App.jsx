import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar';
import Display from './components/Display';
import CountryDetail from './components/CountryDetail';
import countryService from './services/countries';

function App() {
  const [allCountries, setAllCountries] = useState([]);
  const [search, setSearch] = useState('');
  let matches = [];

  // after the app loads, fetch all countries and store them in state `allCountries`
  useEffect(() => {
    countryService
      .getAll()
      .then(results => setAllCountries(results))
  }, []);

  // when the search term changes, set state `search` to that input
  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  if (search !== '') {
    matches = allCountries.filter(country => {
      return country.name.common.toLowerCase().includes(search.toLowerCase());
    });
  }

  return (
    <>
      <SearchBar 
        handleSearch={handleSearch} 
      />
      {matches.length > 10 && <p>Too many matches, specify another filter</p>}
      {(matches.length >= 2 && matches.length <= 10) && <Display matches={matches} setSearch={setSearch} />}
      {matches.length === 1 && <CountryDetail country={matches[0]}/>}
    </>
  )
}

export default App
