import React, { useContext } from 'react';
import { AuthContext } from '../../authProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Featured = ({ movies }) => {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const handleSeeDetailsClick = (id) => {
        if (!user) {
            navigate("/signin", { state: { from: `/movie-details/${id}` } });
        } else {
            navigate(`/movie-details/${id}`);
        }
    };

    const onSubmit = (data) => {
        console.log("Review submitted:", data);
        reset();
    };

    const { _id, photo, title, genre, duration, year, rating } = movies

    return (
        <div>
            <div className="card card-compact bg-base-100 w-96 shadow-xl">
                <figure>
                    <img
                        src={photo}
                        alt="Movie" className='h-48 w-full' />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Title: {title}</h2>
                    <p>Genre: {genre}</p>
                    <p>Duration: {duration}</p>
                    <p>Year: {year}</p>
                    <p>Rating: {rating}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={() => handleSeeDetailsClick(_id)}>
                            See Details
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <h3 className="text-lg font-semibold">Leave a Review</h3>
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
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Submit Review
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Featured;