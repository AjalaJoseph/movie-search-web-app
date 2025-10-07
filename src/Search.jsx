import React from 'react'
import Nav from './Nav'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaFilm } from 'react-icons/fa'
function Search() {
  const navigate=useNavigate()
   const [popular, setPopular]= useState([]);
   const [page, setPage]=useState(1);
   const [Loading, setLoading]=useState(false);
  const API_KEY = "bd4d33c515f54cd65162664d129c1ecc";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
   useEffect(() => {
       const fetchMovies = async () => {
         setLoading(true);
         const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
         const data = await res.json();
         // Append new movies instead of replacing
         setPopular((prev) => [...prev,...data.results ]);
         setLoading(false);
       };
   
       fetchMovies();
     }, [page]);

     useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
            query
          )}&page=1&include_adult=false`
        );
        const data = await response.json();
        const validResults = data.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );
        setSuggestions(validResults.slice(0, 10)); // limit to 8 results
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 400); // delay typing
    return () => clearTimeout(debounce);
  }, [query]);

  const highlightMatch = (title) => {
    if (!query) return title;
    const regex = new RegExp(`(${query})`, "ig");
    const parts = title.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i}  className='text-warning fw-bold'> 
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div>
      <div className="container mt-3">
        <div className='d-flex flex-lg-row flex-column '> 
          <div className='py-4 d-flex gap-2 l-1'>
            <Link className='nav-link fs-3 fs-lg- fw-semibold font'>Movies | Link</Link>
             <FaFilm className='mt-1 fs-3'/>
          </div>
          <div className='mt-0 mt-lg-4 l-1'>
            {/* <form action="" className='d-flex flex-row gap-2'> */}
              <input type="text" className='form-control border-info w-75 font' placeholder='Search for any kind of movies' value={query} onChange={(e) => setQuery(e.target.value)}/>
              {/* <button className='btn btn-info text-white font'>Search</button> */}
            {/* </form> */}
            
          </div>
        </div>
             {suggestions.length > 0 && (
        <ul className= " list-group  w-100 container mt-2  text-white mt-3 fs-6 ">
          {suggestions.map((item) => (
            <li
               key={item.id}
              onClick={() => navigate(`/${item.media_type}/${item.id}`)}
               className="list-group-item list-group-item-action d-flex align-items-center gap-4 bg-secondary text-white font "
            style={{ cursor: "pointer" }}>
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                    : "https://via.placeholder.com/50x75"
                }
                alt={item.title || item.name}
                width="50"
                height="50"
                className="rounded"
              />
               <span>  {highlightMatch(item.title || item.name)}</span>
               </li>
          ))}
        </ul>
      )}
               <div className='pb-6'>
                   <h2 className='mt-1 mb-3 font'>Movies for you</h2>
                   <div className='row mb-4 '>
                         {popular.map((upcome) => (
                        <div key={upcome.id} className='col-lg-2 col-4 col-md-3 '>
                           {upcome.poster_path ? (
                            <Link to={`/movie/${upcome.id}`}><img  src={`${IMG_BASE_URL}${upcome.poster_path}`} alt={upcome.title} className='img rounded img-fluid'/></Link>
                           ):
                           <p>no image</p>}
                         <h6 className='mt-2 text-break fw-bold '>{upcome.title}</h6>
                      </div>
                         ))}
                         <div className="d-flex justify-content-center mt-2">
                          <button onClick={()=> setPage((prev)=>prev+1)} className='btn btn-primary font px-4 fs-6 text-white'>
                            {Loading?<p>Loading...</p>:"more"}
                          </button>
                         </div>
                      </div>
                  </div>
      </div>
      <Nav/>
    </div>
  )
}

export default Search