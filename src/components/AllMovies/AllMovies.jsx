import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState({
        search: ""
    });


    useEffect(() => {
        fetch('https://assignment-10-project.vercel.app/movie')
            .then((res) => res.json())
            .then((data) => {
                setMovies(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    const handleChange = e => {
        const {name, value} = e.target
        setSearchQuery({
            ...searchQuery, 
            [name]: value
        })
    }

    const filteredMovies = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.search.toLowerCase())
    );

    return (
        <div className="w-11/12 mx-auto py-6">
            <Helmet>
                <title>Movie Portal | AllMovies</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-6">All Movies</h2>
            
            <input type="search" value={searchQuery.search}
                onChange={handleChange} name="search" id="" placeholder='search movie' className="w-full text-xl mb-6 p-2 border rounded-md text-center" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    filteredMovies.length > 0 ? (

                        filteredMovies.map((movie) => (
                            <div key={movie._id} className="p-4 border rounded-md shadow-md">
                                <img
                                    src={movie.photo}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover rounded-md"
                                />
                                <h3 className="mt-4 text-lg font-bold">{movie.title}</h3>
                                <p className="text-sm text-gray-600">Genre: {movie.genre}</p>
                                <p className="text-sm text-gray-600">Year: {movie.year}</p>
                                <p className="text-sm text-gray-600">Duration: {movie.duration}</p>
                                <p className="text-sm text-gray-600">Rating: {movie.rating}</p>
                                <Link
                                    to={`/movie-details/${movie._id}`}
                                    className="mt-4 inline-block text-blue-600 hover:underline"
                                >
                                    See Details
                                </Link>
                            </div>
                        ))

                    ):(
                        <p className="text-center col-span-3">No movies found.</p>
                    )}
                
            </div>
        </div>
    );
};

export default AllMovies;
