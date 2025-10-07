import React from 'react'
import Nav from './Nav'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, data } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import Cast from './Cast'
function MovieDetails() {
  const API_KEY = "bd4d33c515f54cd65162664d129c1ecc";
  const {type,id}=useParams();
  const [movies, setMovies]=useState(null);
  const [trailer, setTrailer] = useState(null);
  const [image, setImage]=useState([]);
  const [recommended, setRecommended]=useState([])
  const [seasons, setSeasons] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState(null);

  const navigate=useNavigate()
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,credits`)
      .then((res) => res.json())
      .then((data) => { setMovies(data);
       if (type === "tv") { setSeasons(data.seasons || []); }
    });
    // Fetch trailer video
    fetch(`https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const youtubeTrailer = data.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (youtubeTrailer) {
          setTrailer(youtubeTrailer.key); // YouTube video ID
        }
      });
      fetch(`https://api.themoviedb.org/3/${type}/${id}/images?api_key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setImage(data.posters.slice(0, 3)); 
      });
       fetch(`https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`)
      .then(res => res.json())
      .then(data => setRecommended(data.results));
     
  }, [id,type]);
  const fetchEpisodes = (seasonNumber) => {
    fetch(`https://api.themoviedb.org/3/tv/${id}/season/${seasonNumber}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setEpisodes(data.episodes);
        setSelectedSeason(seasonNumber);
      });
  };
  if (!movies) return <p className="text-center">Loading...</p>;
  return (
    <div>
      <div className="container">
        <div className='mt-4'>
            {trailer ? (
            <div className="ratio ratio-16x9">
              <iframe
                src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
                title="Movie Trailer" className='w-100 h-75 rounded-3'
                allow='autoplay'
              ></iframe>
            </div>
          ) : (
            <p className=' font fs-2 text-center'>No trailer available.</p>
          )}
        </div>
        <h1 className=' text-center mb-4 font text-secondary'>Movie title:<span className='text-black'>{movies.title || movies.name}</span></h1>
         <div className="row gy-3 mt-2">
            {image.map((img, index) => (
              <img
                key={index}
                src={`https://image.tmdb.org/t/p/w300${img.file_path}`}
                alt={`Poster ${index + 1}`}
                className="img-fluid rounded shadow col-lg-4 col-sm-12 "
              />
            ))}
          </div>
        <p className='font fs-3 my-4 text-secondary text-center'>{movies.overview}</p>
        <p className='text-warning text-center fs-4'><span className='text-black font fs-3'>movie rate:</span><FaStar className='fs-3 '/>{movies.vote_average}</p>
      <div className="d-flex justify-content-center gap-4 ">
        <p className='fw-semibold '><span className='fs-4 text-secondary fw-normal font'>Release Date: </span>{movies.release_date || movies.first_air_date? new Date(movies.release_date || movies.first_air_date).toLocaleDateString("en-us", {
          month: "short",
          day: "numeric",
          year:"numeric"
        }):"TBA" }</p>
        <p className='font fw-semibold'><span className='text-secondary fs-4 fw-normal font'>Movie status: </span>{movies.status}</p>
      </div>
      <div>
        <h3 className='font text-center'>Movie genres</h3>
      <div className=' d-flex flex-wrap flex-column flex-lg-row gap-3 justify-content-center'>
        {movies.genres.map((genre)=>(
          <li key={genre.id} className='font ms-5'>{genre.name}</li>
        ))}
      </div>
      </div>
      <div className='d-flex gap-4 justify-content-center my-4'>
        <button onClick={()=>{
           const existingList = JSON.parse(localStorage.getItem("watchlist")) || [];

    // Check if movie already exists
    const alreadyAdded = existingList.some((item) => item.id === movies.id);

    if (!alreadyAdded) {
      existingList.push(movies);
      localStorage.setItem("watchlist", JSON.stringify(existingList));
      alert("✅ Added to Watchlist!");
    } else {
      alert("⚠️ Already in Watchlist!");
    }
        }} className="btn btn-primary fo">Add to Watchlist</button>
        <button className='btn btn-danger' onClick={()=>{
           const existingList = JSON.parse(localStorage.getItem("favourite")) || [];

    // Check if movie already exists
    const alreadyAdded = existingList.some((item) => item.id === movies.id);

    if (!alreadyAdded) {
      existingList.push(movies);
      localStorage.setItem("favourite", JSON.stringify(existingList));
      alert("✅ Added to favourite!");
    } else {
      alert("⚠️ Already in favourite!");
    }
        }}>Add to favourite</button>
      </div>
      {type === "tv" && (
  <div className="my-4">
    <h3 className="font text-center">Seasons</h3>
    <div className="d-flex flex-wrap gap-3 justify-content-center">
      {seasons.map(season => (
        <button
          key={season.id}
          className="btn btn-outline-primary"
          onClick={() => fetchEpisodes(season.season_number)}
        >
          {season.name}
        </button>
      ))}
    </div>
    {episodes.length > 0 && (
      <div className="mt-3">
        <div className='flex '>
          {episodes.map((ep) => (
      <div key={ep.id} className="mb-3 flex-shrink-0">
    <div className="card w-100 h-75 p-2">
      <h4 className='badge bg-info p-2'>Episode  {ep.episode_number}</h4>
      <p className="font text-break"> {ep.name} </p>
    </div>
  </div>
  
))}

        </div>
      </div>
    )}
  </div>
)}

      <Cast movieId={id}/>
     <h4 className="mt-5 mb-3 position-stick">Recommended Movies</h4>
          <div className="row pb-6" >
            {recommended.map(rec => (
              <div key={rec.id} className=" col-lg-3 col-6 col-md-4 cursor-pointer" onClick={() => navigate(`/${type}/${rec.id}`)}>
                <img
                  src={rec.poster_path
                    ? `https://image.tmdb.org/t/p/w300${rec.poster_path}`
                    : "https://via.placeholder.com/300x450"}
                  alt={rec.title}
                  className="img-fluid rounded"
                />
                <div className=" p-2 text-center">
                  <h6 className=" mb-2 font fw-semibold text-break">{rec.title || rec.name}</h6>
                </div>
              </div>
            ))}
            </div>
           
      </div>
        <Nav/>
    </div>
  )
}

export default MovieDetails