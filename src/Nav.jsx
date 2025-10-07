import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome,FaSearch, FaHeart } from "react-icons/fa"; 
import { MdPlaylistAdd } from "react-icons/md"; 
import { RiMovie2Line } from "react-icons/ri"; 

function Nav() {
  return (
    <div>
      <div className="position-fixed bottom-0 bg-white container-fluid py-3">
        <div className='d-flex flex-row justify-content-center gap-lg-5 gap-4'>
          <div className='d-flex flex-column'>
            <FaHome className='fs-2'/>
           <Link to="/" className='nav-link font fw-bold'>Home</Link>
          </div>
         <div className='d-flex flex-column'>
          <FaSearch className='fs-2 '/>
           <Link to="/MoviesSearch" className='nav-link font fw-bold'>Search</Link>
         </div>
         <div className='d-flex flex-column'>
          <RiMovie2Line className='fs-2'/>
            <Link to='/Watchlist' className='nav-link font fw-bold'>WatchList</Link>
         </div>
          <div>
            <FaHeart className='text-danger fs-2 '/>
            <Link to="/favourite" className='font nav-link fw-bold'>Favourite</Link>
          </div>
        </div>
        </div>
    </div>
  )
}

export default Nav