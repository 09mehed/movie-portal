import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const TopRatedMovie = () => {
    const [featuredMovies, setFeaturedMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all movies
        fetch("http://localhost:3000/movie")
            .then((res) => res.json())
            .then((data) => {
                // Filter Featured Movies
                // const featured = data.slice(0, 3);
                // setFeaturedMovies(featured);
                // Filter Top Rated Movies
                const topRated = data.filter((movie) => movie.rating && movie.rating >= 4).slice(0, 3);
                if (topRated.length === 0) {
                    Swal.fire("No top-rated movies found.");
                }
                setTopRatedMovies(topRated);
                setLoading(false);
            })
            .catch((error) => console.error("Error fetching movies:", error));
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className='w-11/12 mx-auto py-3'>
            <section className="mt-3">
                <h2 className="text-3xl text-center font-semibold mb-4">Top Rated Movies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {topRatedMovies.map((movie) => (
                        <div key={movie._id} className="p-4 border rounded-md shadow-md">
                            <img
                                src={movie.photo}
                                alt={movie.title}
                                className="w-full h-64 object-cover rounded-md"
                            />
                            <h3 className="mt-4 text-xl text-center font-bold">{movie.title}</h3>
                            <p className='text-center'>{movie.summary}</p>
                            <p className="text-xl text-gray-600">Genre: {movie.genre}</p>
                            <p className="text-xl text-gray-600">Rating: {movie.rating}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default TopRatedMovie;