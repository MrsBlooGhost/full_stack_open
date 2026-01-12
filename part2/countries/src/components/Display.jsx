import { Fragment } from 'react';

const Display = ({ matches, setSearch }) => {
  return (
    <>
      {matches.map(match =>
        <Fragment key={match.name.common}>
          <p>{match.name.common}</p>
          <button onClick={() => {setSearch(match.name.common)}}>Show</button>
        </Fragment>
      )}
    </>
  )
}

export default Display;