import React from 'react'
import Nav from './Nav';
import { useState, useEffect } from 'react';
function Favourite() {
   const [favourite, setFavourite] = useState([]);
  
    useEffect(() => {
      const storedList = JSON.parse(localStorage.getItem("favourite")) || [];
      setFavourite(storedList);
    }, []);
  return (
    <div>
         <div className="container mt-4">
            <h2 className="text-center mb-4 font">my favourite movies</h2>
      
            {favourite.length === 0 ? (
              <p className="text-center text-muted font">No movies in your favourite yet.</p>
            ) : (
              <div className="row gy-4 gx-4">
                {favourite.map((movie) => (
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

export default Favourite