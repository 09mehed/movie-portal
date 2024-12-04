import React from 'react';
import Featured from '../Featured/Featured'
import { Link } from 'react-router-dom';
const Addmovie = ({ movie = [] }) => {
    const topRatedMovies = movie.sort((a, b) => b.rating - a.rating).slice(0, 6);
    return (
        <div className='w-11/12 mx-auto py-3'>
            <h2 className='text-4xl font-bold text-center py-3'>Featured Movie</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
                {
                    topRatedMovies.map(movies => <Featured key={movies._id} movies={movies}></Featured>)
                }
                <div className="text-center mt-6">
                    <Link to="/allMovies" className=" bg-blue-500 text-white py-2 px-4 rounded-md">
                        See All Movies
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Addmovie;