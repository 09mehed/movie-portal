import React from 'react';
import { Link } from 'react-router-dom';

const Featured = ({ movies }) => {
    const { name, title, genre, duration, year, rating } = movies
    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <img
                    src={name}
                    alt="Shoes" className='h-48 w-full' />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Title: {title}</h2>
                <p>Genre: {genre}</p>
                <p>Duration: {duration}</p>
                <p>Year: {year}</p>
                <p>Rating: {rating}</p>
                <div className="card-actions justify-end">
                    <Link to={`/movie-details/${movies.id}`} className="btn btn-primary">See Details</Link>
                </div>
            </div>
        </div>

    );
};

export default Featured;