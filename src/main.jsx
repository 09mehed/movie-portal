import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import Root from './components/layout/Root';
import Home from './components/Home/Home';
import AllMovies from './components/AllMovies/AllMovies';
import Addmovie from './components/AddMovie/Addmovie';
import Favourite from './components/Favourite/Favourite';
import Share from './components/Share/Share';
import AuthProvider from './authProvider/AuthProvider';
import AddAMovie from './components/AddAMovie/AddAMovie';
import MovieDetails from './components/MovieDetails/MovieDetails';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:3000/movie')
      },
      {
        path: 'allMovies',
        element: <PrivateRoute>
          <AllMovies></AllMovies>
        </PrivateRoute>
      },
      {
        path: 'movie-details/:id',
        element: 
          <PrivateRoute>
            <MovieDetails></MovieDetails>
          </PrivateRoute>
      },
      {
        path: 'addMovie',
        element: <Addmovie></Addmovie>
      },
      {
        path: 'favourite',
        element: <Favourite></Favourite>
      },
      {
        path: 'share',
        element: <Share></Share>
      },
      {
        path: 'addAMovie',
        element: <AddAMovie></AddAMovie>
      },
      {
        path: 'signup',
        element: <Signup></Signup>
      },
      {
        path: 'signin',
        element: <Signin></Signin>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
