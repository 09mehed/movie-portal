import React from 'react';
import { Helmet } from 'react-helmet';

const AddAMovie = () => {

    const handleAddAMovie = e => {
        e.preventDefault()

        const form = e.target

        const photo = form.photo.value;
        const title = form.title.value;
        const genre = form.genre.value;
        const duration = form.duration.value;
        const year = form.year.value;
        const rating = form.rating.value;

        const newMovie = {photo, title, genre, duration, year, rating};
        console.log(newMovie);

        fetch('http://localhost:3000/movie', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newMovie)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
    }

    return (
        <div className='w-11/12 mx-auto py-5'>
            <Helmet>
                <title>MOVIE PORTAL | add a movie</title>
            </Helmet>
            <div className="h-[700px] flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Add a movie Form
                    </h2>
                    <form onSubmit={handleAddAMovie}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Movie Poster
                            </label>
                            <input
                                name="photo"
                                type="url"
                                placeholder="Enter your movie poster"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Title
                            </label>
                            <input
                                name="title"
                                type="text"
                                placeholder="Enter your title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Genre
                            </label>
                            <input
                                name="genre"
                                type="text"
                                placeholder="Enter your genre"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Duration
                            </label>
                            <input
                                name="duration"
                                type="text"
                                placeholder="Enter your duration"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Release Year
                            </label>
                            <input
                                name="year"
                                type="text"
                                placeholder="Enter your Release Year"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                            Rating
                            </label>
                            <input
                                name="rating"
                                type="text"
                                placeholder="Enter your Rating"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>
                        <input type="submit" value="Add A Movie" className='btn btn-block' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAMovie;