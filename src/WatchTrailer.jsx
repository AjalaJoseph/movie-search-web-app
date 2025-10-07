import React from 'react'
import { useState,useEffect } from 'react';
import Nav from './Nav'
function WatchTrailer() {
   const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(storedList);
  }, []);
  return (
    <div>
        <div className="container mt-4">
      <h2 className="text-center mb-4 font">🎬 My Watchlist</h2>

      {watchlist.length === 0 ? (
        <p className="text-center text-muted font">No movies in your watchlist yet.</p>
      ) : (
        <div className="row gy-4 gx-4">
          {watchlist.map((movie) => (
            <div key={movie.id} className="col-lg-2 col-md-3 col-4">
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="img-fluid rounded shadow"
              />
              <h6 className="text-center mt-2 font text-break">{movie.title}</h6>
            </div>
          ))}
        </div>
      )}
    </div>
        <Nav/>
    </div>
  )
}

export default WatchTrailer