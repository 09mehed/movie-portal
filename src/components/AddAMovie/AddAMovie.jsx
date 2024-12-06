import React, { useState, useContext } from "react";
import { AuthContext } from "../../authProvider/AuthProvider";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AddMovie = () => {
    const { user } = useContext(AuthContext);

    // State for form fields
    const [movieData, setMovieData] = useState({
        photo: "",
        title: "",
        email: "",
        genre: [],
        duration: "",
        year: "",
        rating: 0,
        summary: "",
    });

    const genres = ["Comedy", "Drama", "Horror", "Action", "Romance"];
    const years = ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2019"]; 
   
    const handleChange = (e) => {
        const { name, value } = e.target;
        setMovieData({ ...movieData, [name]: value });
    };

    const handleGenreChange = (e) => {
        const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
        setMovieData({ ...movieData, genre: selectedGenres });
    };

    const handleRatingChange = (rate) => {
        setMovieData({ ...movieData, rating: rate });
    };

    const validateForm = () => {
        if (!movieData.photo || !/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(movieData.photo)) {
            Swal.fire({
                title: "Oops...",
                text: "Please provide a valid image link for the poster.",
            });
            return false;
        }
        if (!movieData.title || movieData.title.length < 2) {
            Swal.fire({
                title: "Oops...",
                text: "Title must have at least 2 characters.",
            });
            return false;
        }
        if (movieData.genre.length === 0) {
            Swal.fire({
                title: "Oops...",
                text: "Please select at least one genre.",
            });
            return false;
        }
        if (!movieData.duration || movieData.duration < 60) {
            Swal.fire({
                title: "Oops...",
                text: "Duration must be at least 60 minutes.",
            });
            return false;
        }
        if (!movieData.year) {
            Swal.fire({
                title: "Oops...",
                text: "Please select a release year.",
            });
            return false;
        }
        if (movieData.rating === 0) {
            Swal.fire({
                title: "Oops...",
                text: "Please select a rating.",
            });
            return false;
        }
        if (!movieData.summary || movieData.summary.length < 10) {
            Swal.fire({
                title: "Oops...",
                text: "Summary must have at least 10 characters.",
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newMovie = {
            ...movieData,
        };

        fetch("http://localhost:3000/movie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
        })
            .then((response) => response.json())
            .then(() => {
                toast.success("Movie added successfully!");
                setMovieData({
                    photo: "",
                    title: "",
                    email: "",
                    genre: [],
                    duration: "",
                    year: "",
                    rating: 0,
                    summary: "",
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
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
                {/* Poster URL */}
                <div>
                    <label className="block font-semibold mb-2">Movie Poster URL</label>
                    <input
                        type="text"
                        name="photo"
                        value={movieData.photo}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter poster URL"
                    />
                </div>

                {/* Title */}
                <div>
                    <label className="block font-semibold mb-2">Movie Title</label>
                    <input
                        type="text"
                        name="title"
                        value={movieData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter movie title"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block font-semibold mb-2">Email</label>
                    <input
                        type="text"
                        name="email"
                        value={movieData.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block font-semibold mb-2">Genre</label>
                    <select
                        name="genre"
                        multiple
                        value={movieData.genre}
                        onChange={handleGenreChange}
                        className="w-full p-2 border rounded"
                    >
                        {genres.map((genre) => (
                            <option key={genre} value={genre}>
                                {genre}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Duration */}
                <div>
                    <label className="block font-semibold mb-2">Duration (in minutes)</label>
                    <input
                        type="number"
                        name="duration"
                        value={movieData.duration}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter duration"
                    />
                </div>

                {/* Release Year */}
                <div>
                    <label className="block font-semibold mb-2">Release Year</label>
                    <select
                        name="year"
                        value={movieData.year}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Select Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Rating */}
                <div>
                    <label className="block font-semibold mb-2">Rating</label>
                    <div className="flex items-center space-x-4">
                        <Rating
                            onClick={handleRatingChange}
                            ratingValue={movieData.rating}
                            size={30}
                            allowHalfIcon
                        />
                    </div>
                </div>

                {/* Summary */}
                <div>
                    <label className="block font-semibold mb-2">Summary</label>
                    <textarea
                        name="summary"
                        value={movieData.summary}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Write a short summary"
                    />
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

