import React, { useEffect, useState } from 'react';

function Search() {
  const [movieSearchBox, setMovieSearchBox] = useState('');
  const [searchList, setSearchList] = useState([]);
  const [resultGrid, setResultGrid] = useState('');

  useEffect(() => {
    loadMovieDetails();
  }, [searchList]);

  // load movies from API
  async function loadMovies(searchTerm) {
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=8b26f5b7`;
    const res = await fetch(URL);
    const data = await res.json();
    if (data.Response === 'True') {
      displayMovieList(data.Search);
    }
  }

  function findMovies() {
    let searchTerm = movieSearchBox.trim();
    if (searchTerm.length > 0) {
      loadMovies(searchTerm);
    } else {
      setSearchList([]);
    }
  }

  function displayMovieList(movies) {
    setSearchList(movies);
  }

  async function loadMovieDetails(movie) {
    const result = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=8b26f5b7`);
    const movieDetails = await result.json();
    displayMovieDetails(movieDetails);
  }

  function displayMovieDetails(details) {
    setResultGrid(
      <div className="movie-details result-grid">
        <div className="movie-poster">
          <img
            src={details.Poster !== 'N/A' ? details.Poster : 'image_not_found.png'}
            alt="movie poster"
          />
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{details.Title}</h3>
          <ul className="movie-misc-info">
            <li className="year">Year: {details.Year}</li>
            <li className="rated">Ratings: {details.Rated}</li>
            <li className="released">Released: {details.Released}</li>
          </ul>
          <p className="genre">
            <b>Genre:</b> {details.Genre}
          </p>
          <p className="writer">
            <b>Writer:</b> {details.Writer}
          </p>
          <p className="actors">
            <b>Actors: </b>
            {details.Actors}
          </p>
          <p className="plot">
            <b>Plot:</b> {details.Plot}
          </p>
          <p className="language">
            <b>Language:</b> {details.Language}
          </p>
          <p className="awards">
            <b>
              <i className="fas fa-award"></i>
            </b>{' '}
            {details.Awards}
          </p>
        </div>
      </div>
    );
  }

  function handleOutsideClick(event) {
    if (event.target.className !== 'form-control') {
      setSearchList([]);
    }
  }

  return (
    <div className="wrapper" onClick={handleOutsideClick}>
      <div className="logo">
        <div className="container">
          <p>
            Movie<span>SDK</span>
          </p>
        </div>
      </div>

      <div className="search-container">
        <div className="search-element">
          <h3>Search Movie:</h3>
          <input
            type="text"
            className="form-control"
            placeholder="Search Movie..."
            value={movieSearchBox}
            onChange={(e) => setMovieSearchBox(e.target.value)}
            onKeyUp={findMovies}
          />

          <div className="search-list">
            {searchList.map((movie) => (
              <div
                key={movie.imdbID}
                className="search-list-item"
                onClick={() => loadMovieDetails(movie)}
              >
                <div className="search-item-thumbnail">
                  <img src={movie.Poster !== 'N/A' ? movie.Poster : 'image_not_found.png'} alt={movie.Title} />
                </div>
                
                <div className="search-item-info">
                  <h3>{movie.Title}</h3>
                  <p>{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        <div className="result-container">
          <div className="result-grid">{resultGrid}</div>
        </div>
      </div>
    </div>
  );
}

export default Search;
