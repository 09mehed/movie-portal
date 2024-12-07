import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../authProvider/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const MyFavourites = () => {
    const [favorites, setFavorites] = useState([]);
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (user && user.email) {
            favorite(user.email);
        }
    }, [user]);

    const favorite = (email) => {
        fetch(`https://assignment-10-project.vercel.app/favorites?email=${email}`)
            .then((res) => res.json())
            .then((data) => setFavorites(data))
            .catch((error) => console.error('Error fetching favorites:', error));
    }

    const deleteFavorite = (movieId) => {
        const updatedFavorites = favorites.filter((movie) => movie.movieId !== movieId);
        setFavorites(updatedFavorites);

        fetch(`https://assignment-10-project.vercel.app/favorites/${movieId}`, {
            method: 'DELETE',
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (user && user.email) {
                    favorite(user.email);
                    if (data.deletedCount > 0) {
                        Swal.fire({
                            title: "Success!",
                            text: "Movie Deleted Successfully",
                            icon: "success",
                        }).then(() => {
                            // navigate('/allMovies');
                        });
                    }
                }
            })
            .catch((error) => {
                console.error("Error deleting movie:", error);
            });
    };

    return (
        <div className="w-11/12 mx-auto py-3">
            <Helmet>
                <title>Movie Portal | Favorite</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-6">My Favourites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <div key={movie.movieId} className="border rounded-md shadow-md p-4 flex flex-col items-center">
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-60 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold">{movie.title}</h3>
                            <p className="text-gray-600">Genre: {movie.genre}</p>
                            <p className="text-gray-600">Year: {movie.year ? movie.year : "Not Available"}</p>
                            <p className="text-gray-600">Duration: {movie.duration ? `${movie.duration} minutes` : "Not Available"}</p>
                            <p className="text-gray-600">Rating: {movie.rating}</p>

                            <button
                                onClick={() => deleteFavorite(movie.movieId)}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Delete Favorite
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No favorites found.</p>
                )}

            </div>

        </div>
    );
};

export default MyFavourites;


// {favorites.map((movie) => (
//     <div
//         key={movie.movieId}
//         className="border rounded-md shadow-md p-4 flex flex-col items-center"
//     >
//         <img
//             src={movie.posterUrl}
//             alt={movie.title}
//             className="w-full h-60 object-cover rounded-md mb-4"
//         />
//         <h3 className="text-2xl font-semibold">{movie.title}</h3>
//         <p className="text-gray-600">Genre: {movie.genre}</p>
//         <p className="text-gray-600">Year: {movie.year ? movie.year : "Not Available"}</p>
//         <p className="text-gray-600">Duration: {movie.duration ? `${movie.duration} minutes` : "Not Available"}</p>
//         <p className="text-gray-600">Rating: {movie.rating}</p>
//         <button
//             onClick={() => deleteFavorite(movie.movieId)}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
//         >
//             Delete Favorite
//         </button>
//     </div>
// ))}
