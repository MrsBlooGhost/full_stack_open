import Weather from './Weather'

const CountryDetail = ({ country }) => {
  const languagesSpoken = [];

  for (let languageAbbreviation in country.languages) {
    languagesSpoken.push(country.languages[languageAbbreviation]);
  }

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {languagesSpoken.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}/>
      <Weather capital={country.capital[0]} capitalCoordinates={country.capitalInfo.latlng} />
    </>
  )
}

export default CountryDetail;