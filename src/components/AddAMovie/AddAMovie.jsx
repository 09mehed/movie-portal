import React, { useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate() 

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const genres = ["Comedy", "Drama", "Horror", "Action", "Romance"];
    const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2019"];

    const handleRatingChange = (rate) => {
        setValue('rating', rate);
    };

    const validateForm = (data) => {
        if (!data.photo || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(data.photo)) {
            Swal.fire({
                title: "Oops...",
                text: "Please provide a valid image link for the poster.",
            });
            return false;
        }
        if (!data.title || data.title.length < 2) {
            Swal.fire({
                title: "Oops...",
                text: "Title must have at least 2 characters.",
            });
            return false;
        }
        if (data.genre.length === 0) {
            Swal.fire({
                title: "Oops...",
                text: "Please select at least one genre.",
            });
            return false;
        }
        if (!data.duration || data.duration < 60) {
            Swal.fire({
                title: "Oops...",
                text: "Duration must be at least 60 minutes.",
            });
            return false;
        }
        if (!data.year) {
            Swal.fire({
                title: "Oops...",
                text: "Please select a release year.",
            });
            return false;
        }
        if (data.rating === 0) {
            Swal.fire({
                title: "Oops...",
                text: "Please select a rating.",
            });
            return false;
        }
        if (!data.summary || data.summary.length < 10) {
            Swal.fire({
                title: "Oops...",
                text: "Summary must have at least 10 characters.",
            });
            return false;
        }
        return true;
    };

    const onSubmit = (data) => {
        if (!validateForm(data)) return;

        const newMovie = {
            ...data,
        };

        fetch("https://assignment-10-project.vercel.app/movie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
        })
            .then((response) => response.json())
                .then(() => {
                    Swal.fire({
                        title: "Success!",
                        text: "Movie added successfully!",
                        icon: "success",
                    }).then(() => {
                        navigate("/allMovies");
                    });
                })
            .catch((error) => {
                console.error("Error adding movie:", error);
                Swal.fire({
                    title: "Oops...",
                    text: "Failed to add movie.",
                });
            });
    };

    return (
        <div className="w-11/12 mx-auto py-5">
            <Helmet>
                <title>Movie Portal | Add Movie</title>
            </Helmet>
            <h2 className="text-3xl font-bold text-center mb-6">Add Movie</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto space-y-4">

                {/* Poster URL */}
                <div>
                    <label className="block font-semibold mb-2">Movie Poster URL</label>
                    <input
                        type="text"
                        {...register("photo", { required: "Please provide a poster image URL." })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter poster URL"
                    />
                    {errors.photo && <span className="text-red-500 text-sm">{errors.photo.message}</span>}
                </div>

                {/* Title */}
                <div>
                    <label className="block font-semibold mb-2">Movie Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Title is required.", minLength: { value: 2, message: "Title must have at least 2 characters." } })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter movie title"
                    />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>

                {/* Genre */}
                <div>
                    <label className="block font-semibold mb-2">Genre</label>
                    <select
                        {...register("genre", { required: "Please select at least one genre." })}
                        multiple
                        className="w-full p-2 border rounded"
                    >
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                    {errors.genre && <span className="text-red-500 text-sm">{errors.genre.message}</span>}
                </div>

                {/* Duration */}
                <div>
                    <label className="block font-semibold mb-2">Duration (in minutes)</label>
                    <input
                        type="number"
                        {...register("duration", { required: "Duration is required.", min: { value: 60, message: "Duration must be at least 60 minutes." } })}
                        className="w-full p-2 border rounded"
                        placeholder="Enter duration"
                    />
                    {errors.duration && <span className="text-red-500 text-sm">{errors.duration.message}</span>}
                </div>

                {/* Release Year */}
                <div>
                    <label className="block font-semibold mb-2">Release Year</label>
                    <select
                        {...register("year", { required: "Please select a release year." })}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    {errors.year && <span className="text-red-500 text-sm">{errors.year.message}</span>}
                </div>

                {/* Rating */}
                <div>
                    <label className="block font-semibold mb-2">Rating</label>
                    <div className="flex items-center space-x-4">
                        <Rating
                            onClick={handleRatingChange}
                            ratingValue={0}
                            size={30}
                            allowHalfIcon
                        />
                    </div>
                </div>

                {/* Summary */}
                <div>
                    <label className="block font-semibold mb-2">Summary</label>
                    <textarea
                        {...register("summary", { required: "Summary is required.", minLength: { value: 10, message: "Summary must have at least 10 characters." } })}
                        className="w-full p-2 border rounded"
                        placeholder="Write a short summary"
                    />
                    {errors.summary && <span className="text-red-500 text-sm">{errors.summary.message}</span>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Add Movie
                </button>
            </form>
        </div>
    );
};

export default AddMovie;


