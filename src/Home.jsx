import React from 'react'
import { useState,useEffect } from 'react'
import { FaFilm,FaFire,FaStar } from 'react-icons/fa';
import { MdLiveTv } from "react-icons/md";
import { GiExplosionRays, GiCrossedSwords } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from './Nav'
function Home() {
  const gotomovidetails=useNavigate()
   const [movies, setMovies] = useState([]);
   const [topRated, setTopRated] = useState([]);
   const [popular, setPopular]= useState([]);
   const [nollywood, setNollywood]=useState([]);
   const [tvShow, setTvShow]=useState([]);
   const [yoruba, setYoruba]=useState([]);
   const [top,setTop]=useState([]);
   const [action, setAction]=useState([]);
   const [korean, setKorean]=useState([]);
   const [chinese,setchinese]=useState([]);
   const [nowPlaying, setnowpPlaying]=useState([]);
   const [upcoming, setUpcoming]=useState([])
   const [page, setPage]=useState(1);
   const [Loading, setLoading]=useState(false);
  const API_KEY = "bd4d33c515f54cd65162664d129c1ecc";
  const BASE_URL = "https://api.themoviedb.org/3";
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
const MoreMovies=async()=>{
  let allMovies=[];
  for(let i=1;i<=4; i++){
    const response=await  fetch( `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&region=NG&with_original_language=ko&page=${i}`)
    const data=await response.json();
    allMovies=[...allMovies,...data.results];
    setKorean(allMovies)
  }
}
const MoreNowPlay=async()=>{
  let nowplay=[];
  for(let i=1;i<=4; i++){
    const response=await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${i}`)
    const data=await response.json();
    nowplay=[...nowplay,...data.results];
    setnowpPlaying(nowplay)
  }
}
 useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`);
      const data = await res.json();
      const today=new Date();
       const getnew=data.results.filter((latest)=>{
        if(!latest.release_date) return false;
         return new Date(latest.release_date)>today
       });
      // Append new movies instead of replacing
      setUpcoming((prev) => [...prev,...getnew ]);
      setLoading(false);
    };

    fetchMovies();
  }, [page]);

useEffect(()=>{
  MoreNowPlay()
},[])
useEffect(()=>{
    fetch( `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&region=NG&with_original_language=zh&page=2`)
    .then((res)=>res.json())
    .then((data)=>setchinese(data.results))
     .catch((err) => console.error("Error fetching c-movies:", err));
}, [])
  useEffect(() => {
    // Fetch trending movies
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

   useEffect(() => {
    fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => res.json())
      .then((data) => setTopRated(data.results))
      .catch((err) => console.error("Error fetching top rated movies:", err));
  }, []);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res)=>res.json())
    .then((data)=>setPopular(data.results))
    .catch((err) => console.error("Error fetching top rated movies:", err));
  },[])
   useEffect(() => {
    fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_origin_country=NG&page=1`)
      .then((res) => res.json())
      .then((data) => {
        setNollywood(data.results);
      })
      .catch((err) => console.error("Error fetching Nollywood movies:", err));
  }, []);
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}`)
    .then((res)=>res.json())
    .then((data)=>setTvShow(data.results))
    .catch((err) => console.error("Error fetching Nollywood movies:", err));
  }, [])
  useEffect(()=>{
    fetch( `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&region=NG&with_original_language=yo`)
    .then((res)=>res.json())
    .then((data)=>setYoruba(data.results))
    .catch((err) => console.error("Error fetching Nollywood movies:", err));
  },[])
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res)=>res.json())
    .then((data)=>setTop(data.results))
    .catch((err) => console.error("Error fetching Top rated mpovies movies:", err));
  }, []);
   useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28&language=en-US&page=1`)
    .then((res)=>res.json())
    .then((data)=>setAction(data.results))
    .catch((err) => console.error("Error fetching Top rated mpovies movies:", err));
    //  fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const today=new Date();
    //     const getnew=data.results.filter(latest=>new Date(latest.release_date)>today);
    //     setUpcoming(getnew)
    //   });
  }, []);

  useEffect(()=>{
    MoreMovies()
  },[])

  return (
    <div>
        <div className="container">
          <div className='py-4 d-flex gap-2'>
            <Link className='nav-link fs-4 fw-bold font'>Movies | Link</Link>
             <FaFilm className='mt-1 fs-3'/>
          </div>
            <div className="d-flex flex-column flex-lg-row gap-4 mt-3">
                <div className='card d-flex justify-content-center align-items-center  l-1'>
                  <p className='p-3 fs-5 text-break text-secondary font'>Welcome to joseph movies search app, where you can able to search for any kind of movies and Tv show,
                    seen most trending movie,popular movie, top rated, upcoming movie including there release date in the whole world and also you can able to watch trailers .
                     </p>
                </div>
               <div className="l-1">
                 <div id="heroCarousel" className="carousel slide carousel-fade mb-0 " data-bs-ride="carousel">
        <div className="carousel-inner">
          {topRated.slice(0, 20).map((movie, index) => (
            <div
              key={movie.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval="3000" >
             <Link to={`/movie/${movie.id}`}>
               <img src={`${IMG_BASE_URL}${movie.backdrop_path}`} className="d-block w-100  rounded" alt={movie.title}  />
             </Link>
              <div className="carousel-caption d-md-block  bg-opacity-50 rounded p-3">
                <h2 className='font '>{movie.title}</h2>
                <p className='font fs-6'>{movie.overview.slice(0, 150)}...</p>
                <div className="">
                   <button className="btn btn-primary font" onClick={()=> gotomovidetails(`/movie/${movie.id}`)}>Watch Trailer</button>
                </div>
               
              </div>
            </div>
          ))}
           <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
        </div>
        </div>
           </div>
            </div>

            <div className="d-flex flex-row gap-2 my-3">
                <FaFire className='fs-1 text-danger'/>
            <h2 className=' font '>Trending Now</h2>
            </div>
            
            {movies.length==0?(<p className='font fs-5'>Loading....</p>):
               <div className='flex '>
                   {movies.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0   '>
                     {movie.poster_path ? (
                      <Link to={`/movie/${movie.id}`}><img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold'>{movie.title}</h6>
                </div>
                   ))}
                </div>
            }
            <div>
              <div className='d-flex flex-row gap-2 my-3'>
                   <FaStar className='text-warning fs-1 mt-1'/>
                   <h2 className='mt-1 font'>Popular Movies</h2>
                 
              </div>
              {popular.length==0?(<p className='font fs-5'>Loading....</p>):
                <div className='flex  '>
                   {popular.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0  '>
                     {movie.poster_path ? (
                      <Link to={`/movie/${movie.id}`}><img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{movie.title}</h6>
                </div>
                   ))}
                </div>
              }
            </div>
            
              <div>
              <div className='d-flex flex-row gap-2 my-3'>
                   <h2 className='mt-1 font'>Nollywood Movies</h2>
                 
              </div>
               {nollywood.length==0?(<p className='font fs-5'>Loading....</p>):
                  <div className='flex  '>
                   {nollywood.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0  '>
                     {movie.poster_path ? (
                      <Link to={`/movie/${movie.id}`}><img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{movie.title}</h6>
                </div>
                   ))}
                </div>
               }
            </div>
              <div>
              <div className='d-flex flex-row gap-2 my-3'>
                   <h2 className='mt-1 font'>Latest Tv Show</h2>
                 
              </div>
              {tvShow.length==0?(
                <p className='font fs-5'> Loading....</p>)
              : <div className='flex  '>
                   {tvShow.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0  '>
                     {movie.poster_path ? (
                      <Link to={`/tv/${movie.id}`}><img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{movie.name}</h6>
                </div>
                   ))}
                </div>
              }
               
            </div>
              <div>
              <div className='d-flex flex-row gap-2 my-3'>
                 <FaStar className='text-warning fs-1 mt-1'/>
                 <h2 className='mt-1 font'>Top Rated Movies</h2>
                 
              </div>
               {top.length==0?(<p className='font fs-5'>Loading....</p>):
                <div className='flex  '>
                   {top.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0  '>
                     {movie.poster_path ? (
                      <Link to={`/movie/${movie.id}`}><img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{movie.title}</h6>
                </div>
                   ))}
                </div>
               }
            </div>
              <div>
              <div className='d-flex flex-row gap-2 my-3'>
                <FaFire className='fs-1 text-danger'/>
                <h2 className='mt-1 font'>Trending Yoruba movie</h2>
                 
              </div>
               {yoruba.length==0?(<p className='font fs-5'>Loading....</p>):
                <div className='flex  '>
                   {yoruba.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0  '>
                     {movie.poster_path ? (
                      <Link to={`/movie/${movie.id}`}><img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{movie.title}</h6>
                </div>
                   ))}
                </div>
               }
            </div>
              <div>
              <div className='d-flex flex-row gap-2 my-3'>
                <GiExplosionRays className='fs-1 text-warning'/>
                <h2 className='mt-1 font'>Action movie</h2>
                 
              </div>
                <div className='flex mb-4 '>
                   {action.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0  '>
                     {movie.poster_path ? (
                      <Link to={`/movie/${movie.id}`}><img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{movie.title.slice(0,20)}</h6>
                </div>
                   ))}
                </div>
            </div>
             <div>
              <div className='d-flex flex-row gap-2 my-3'>
                <h2 className='mt-1 font'>Korean movie</h2>
                 
              </div>
                <div className='flex mb-4 '>
                   {korean.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0  '>
                     {movie.poster_path ? (
                     <Link to={`/movie/${movie.id}`}> <img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{movie.title.slice(0,20)}</h6>
                </div>
                   ))}
                </div>
            </div>
             <div>
              <div className='d-flex flex-row gap-2 my-3'>
                <h2 className='mt-1 font'>C-movie</h2>
                 
              </div>
                <div className='flex mb-4 '>
                   {chinese.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0  '>
                     {movie.poster_path ? (
                      <Link to={`/movie/${movie.id}`}><img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{movie.title.slice(0,20)}</h6>
                </div>
                   ))}
                </div>
            </div>
            <div className=''>
             <h2 className='mt-1 font'>Now Playing</h2>
             <div className='flex mb-4 '>
                   {nowPlaying.map((movie) => (
                  <div key={movie.id} className='flex-shrink-0  '>
                     {movie.poster_path ? (
                      <Link to={`/movie/${movie.id}`}><img  src={`${IMG_BASE_URL}${movie.poster_path}`} alt={movie.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{movie.title.slice(0,20)}</h6>
                </div>
                   ))}
                </div>
            </div>
             <div className='pb-6'>
             <h2 className='mt-1 font'>Upcoming movies</h2>
             <div className='flex mb-4 '>
                   {upcoming.map((upcome) => (
                  <div key={upcome.id} className='flex-shrink-0  '>
                     {upcome.poster_path ? (
                      <Link to={`/movie/${upcome.id}`}><img  src={`${IMG_BASE_URL}${upcome.poster_path}`} alt={upcome.title} className='img rounded img-fluid'/></Link>
                     ):
                     <p>no image</p>}
                   <h6 className='mt-2 text-break fw-bold '>{upcome.title}</h6>
                </div>
                   ))}
                   <div className="d-flex align-items-center">
                    <button onClick={()=> setPage((prev)=>prev+1)} className='btn btn-primary font text-white'>
                      {Loading?<p>Loading...</p>:"more"}
                    </button>
                   </div>
                </div>
            </div>
            <Nav/>
        </div>
    </div>
  )
}

export default Home