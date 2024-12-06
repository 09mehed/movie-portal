import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const PopularMovie = () => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        fetch("http://localhost:3000/movie")
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

    const onSubmit = (data) => {
        console.log("Review submitted:", data);
        reset();
    };

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
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                    <h3 className="text-lg font-semibold">Leave a Review</h3>

                    {/* Review Field */}
                    <textarea
                        {...register("review", { required: "Review is required" })}
                        placeholder="Write your review here..."
                        className="textarea textarea-bordered w-full mt-2"
                    ></textarea>
                    {errors.review && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.review.message}
                        </p>
                    )}

                    {/* Rating Field */}
                    <input
                        type="number"
                        {...register("rating", {
                            required: "Rating is required",
                            min: { value: 1, message: "Rating must be at least 1" },
                            max: { value: 5, message: "Rating must be at most 5" },
                        })}
                        placeholder="Rating (1-5)"
                        className="input input-bordered w-full mt-2"
                    />
                    {errors.rating && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.rating.message}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="btn btn-primary mt-4"
                    >
                        Submit Review
                    </button>
                </form>
            </section>
        </div>
    );
};

export default PopularMovie;