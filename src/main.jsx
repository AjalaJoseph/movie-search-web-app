import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import './index.css'
import App from './App.jsx'
import Home from './Home.jsx'
import WatchTrailer from './WatchTrailer.jsx'
import Search from './Search.jsx'
import NotFound from './NotFound.jsx'
import MovieDetails from './MovieDetails.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Favourite from './Favourite.jsx'

const router =createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement: <NotFound/>,
    children:[
      {
        index: true,
        element:<Home/>
      },
      {
        path:"Watchlist",
        element:<WatchTrailer/>
      },
      {
        path:"MoviesSearch",
        element:<Search/>
      },
      {
        path:"favourite",
        element:<Favourite/>
      },
      {
        path:"/:type/:id",
        element:<MovieDetails/>
      },
      
    ]
  }
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
