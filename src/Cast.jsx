import React from 'react'
import { useState, useEffect } from 'react';
function Cast({movieId}) {
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const API_KEY = "bd4d33c515f54cd65162664d129c1ecc";

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setCast(data.cast.slice(0, 12)); 
        setCrew(data.crew.filter(c => c.job === "Director" || c.job === "Writer"));
      });
  }, [movieId]);

  return (
    <div>
        <div className="mt-4">
      {/* Cast */}
      <h2 className="h4 font mb-3 fs-3">Cast</h2>
      <div className="flex pb-3">
        {cast.map(actor => (
          <div key={actor.id} className="card flex-shrink-0" style={{ width: "9rem" }}>
            <img
              src={actor.profile_path
                ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                : "https://via.placeholder.com/300x450"}
              alt={actor.name}
              className="card-img-top rounded"
            />
            <div className="card-body p-2 text-center">
              <h6 className="card-title mb-1 font fs-5">{actor.name}</h6>
            </div>
          </div>
        ))}
      </div>

      {/* Crew */}
      <h2 className="h4 mt-4 mb-3 font fs-4">Crew</h2>
      <ul className="list-group list-group-flush mb-4">
        {crew.map(person => (
          <li key={person.id} className="list-group-item bg-dark text-light">
            <strong>{person.job}</strong>: {person.name}
          </li>
        ))}
      </ul>
    </div>
  
    </div>
  )
}

export default Cast