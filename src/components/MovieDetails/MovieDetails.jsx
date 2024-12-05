import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../authProvider/AuthProvider';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const {user} = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3000/movie/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setMovie(data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load movie details. Please try again.");
                setLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        fetch(`http://localhost:3000/movie/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to delete movie.`);
                }
                return response.json();
            })
            .then(() => {
                Swal.fire("Movie deleted successfully!");
                navigate("/allMovies"); 
            })
            .catch((error) => {
                Swal.fire("Error deleting movie. Please try again.");
                console.error(error);
            });
    };

    const handleAddToFavorites = () => {
        const favoriteMovie = {
            movieId: movie._id,
            title: movie.title,
            email: user.email,
            posterUrl: movie.photo,
            genre: movie.genre,
            rating: movie.rating,
            summary: movie.summary
        };

        fetch("http://localhost:3000/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(favoriteMovie),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add movie to favorites.");
                }
                return response.json();
            })
            .then(() => {
                Swal.fire("Movie added to favorites successfully!");
                navigate("/favourite");
            })
            .catch((error) => {
                Swal.fire("Error adding movie to favorites. Please try again.");
                console.error(error);
            });
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="w-11/12 mx-auto py-3">
            <h2 className="text-3xl font-bold text-center mb-3">{movie.title}</h2>
            <p className="text-center py-3 text-2xl font-semibold">{movie.summary}</p>
            <div className="flex justify-center mb-6">
                <img
                    src={movie.photo}
                    alt={movie.title}
                    className="w-full h-96 object-cover rounded-md"
                />
            </div>
            <div className="movie-info text-center">
                <p className="text-lg text-gray-700">Genre: {movie.genre}</p>
                <p className="text-lg text-gray-700">Duration: {movie.duration} mins</p>
                <p className="text-lg text-gray-700">Release Year: {movie.year}</p>
                <p className="text-lg text-gray-700">Rating: {movie.rating}</p>
            </div>

            <div className="flex justify-center mt-8">
                <button
                    onClick={() => navigate('/allMovies')}
                    className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md"
                >
                    See All Movies
                </button>
            </div>
            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={handleDelete}
                    className="px-6 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md shadow-md"
                >
                    Delete Movie
                </button>
                <button
                    onClick={handleAddToFavorites}
                    className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-md"
                >
                    Add to Favorite
                </button>
            </div>
        </div>

    );
};

export default MovieDetails;
