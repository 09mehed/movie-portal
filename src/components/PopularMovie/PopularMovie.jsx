import React, { useEffect, useState } from 'react';

const PopularMovie = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://assignment-10-project.vercel.app/movie")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch movies.");
                return res.json();
            })
            .then((data) => {
                const actionMovies = data.sort((a, b) => a.duration - b.duration).slice(0, 3);
                setPopularMovies(actionMovies);

                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                setLoading(false);
            });
    }, []);

    // const onSubmit = (data) => {
    //     console.log("Review submitted:", data);
    //     reset();
    // };

    if (loading) return <p>Loading...</p>;

    return (
        <div className='w-11/12 mx-auto py-3'>
            <section className='border border-gray-300 p-2 rounded-md'>
                <h2 className="text-2xl text-center font-bold mb-4">Popular Action Movies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {popularMovies.map((movie) => (
                        <div key={movie._id} className="p-4 border rounded-md shadow-md">
                            <img
                                src={movie.photo}
                                alt={movie.title}
                                className="w-full h-64 object-cover rounded-md"
                            />
                            <h3 className="mt-4 text-lg font-bold">{movie.title}</h3>
                            <p className="text-sm text-gray-600">Genre: {movie.genre}</p>
                            <p className="text-sm text-gray-600">Duration: {movie.duration}</p>
                            <p className="text-sm text-gray-600">Rating: {movie.rating}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PopularMovie;