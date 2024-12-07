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
import Favourite from './components/Favourite/Favourite';
import AuthProvider from './authProvider/AuthProvider';
import AddAMovie from './components/AddAMovie/AddAMovie';
import MovieDetails from './components/MovieDetails/MovieDetails';
import UpdatedMovie from './components/UpdatedMovie/UpdatedMovie';
import About from './components/About/About';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>,
        loader: () => fetch('https://assignment-10-project.vercel.app/movie')
      },
      {
        path: 'allMovies',
        element: <AllMovies></AllMovies>
      },
      {
        path: 'movie-details/:id',
        element: <MovieDetails></MovieDetails>
       
      },
      {
        path: 'update-movie/:id',
        element: <UpdatedMovie></UpdatedMovie>,
        loader: ({params}) => fetch(`https://assignment-10-project.vercel.app/movie/${params.id}`)
      },
      {
        path: 'favourite',
        element: <Favourite></Favourite>
      },
      {
        path: 'about',
        element: <About></About>
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
