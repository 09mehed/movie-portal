import React from 'react';
import Featured from '../Featured/Featured'
import { Link } from 'react-router-dom';
const Addmovie = ({ movie = [] }) => {
    const topRatedMovies = movie.sort((a, b) => b.rating - a.rating).slice(0, 6);
    return (
        <div className='w-11/12 mx-auto py-3'>
            <h2 className='text-4xl font-bold text-center py-3'>Featured Movie</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    topRatedMovies.map(movies => <Featured key={movies._id} movies={movies}></Featured>)
                }
            </div>
            <div className="text-right my-6">
                <Link to="/signin" className=" btn btn-primary text-white py-2 px-4 rounded-md">
                    See All Movies
                </Link>
            </div>
        </div>
    );
};

export default Addmovie;