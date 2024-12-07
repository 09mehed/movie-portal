import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import Swal from 'sweetalert2';

const UpdatedMovie = () => {
    const movie = useLoaderData()
    const navigate = useNavigate()
    const { _id, photo, title, email, genre, duration, year, summary } = movie
    const handleUpdateMovie = event => {
        event.preventDefault()

        const form = event.target
        const photo = form.photo.value
        const title = form.title.value
        const email = form.email.value
        const genre = form.genre.value
        const duration = form.duration.value
        const year = form.year.value
        const summary = form.summary.value

        const updatedMovie = { _id, photo, title, email, genre, duration, year, summary }

        fetch(`http://localhost:3000/movie/${_id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedMovie)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Success!",
                        text: "Movie updated successfully",
                        icon: "success",
                    }).then(() => {
                        navigate('/allMovies');
                    });
                }
            })
    }

    return (
        <div className="w-11/12 mx-auto py-5">
            <h2 className="text-3xl font-bold text-center mb-6">Updated Movie</h2>
            <form onSubmit={handleUpdateMovie} className="max-w-2xl mx-auto space-y-4">
                {/* Poster URL */}
                <div>
                    <label className="block font-semibold mb-2">Movie Poster URL</label>
                    <input
                        type="text"
                        name="photo"
                        defaultValue={photo}
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
                        defaultValue={title}
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
                        defaultValue={email}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your email"
                    />
                </div>

                {/* Genre */}
                <div>
                    <label className="block font-semibold mb-2">Genre</label>
                    <input
                        name="genre"
                        defaultValue={genre}
                        type='text'
                        className="w-full p-2 border rounded"
                    >
                    </input>
                </div>

                {/* Duration */}
                <div>
                    <label className="block font-semibold mb-2">Duration (in minutes)</label>
                    <input
                        type="number"
                        name="duration"
                        defaultValue={duration}
                        className="w-full p-2 border rounded"
                        placeholder="Enter duration"
                    />
                </div>

                {/* Release Year */}
                <div>
                    <label className="block font-semibold mb-2">Release Year</label>
                    <input
                        name="year"
                        type='text'
                        defaultValue={year}
                        className="w-full p-2 border rounded"
                    >
                    </input>
                </div>

                {/* Rating */}
                <div>
                    <label className="block font-semibold mb-2">Rating</label>
                    <div className="flex items-center space-x-4">
                        <Rating
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
                        defaultValue={summary}
                        className="w-full p-2 border rounded"
                        placeholder="Write a short summary"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Update Movie
                </button>
            </form>
        </div>
    );
};

export default UpdatedMovie;
