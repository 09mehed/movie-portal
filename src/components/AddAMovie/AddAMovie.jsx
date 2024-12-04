// import React from 'react';
// import { Helmet } from 'react-helmet';

// const AddAMovie = () => {

//     const handleAddAMovie = e => {
//         e.preventDefault()

//         const form = e.target

//         const photo = form.photo.value;
//         const title = form.title.value;
//         const genre = form.genre.value;
//         const duration = form.duration.value;
//         const year = form.year.value;
//         const rating = form.rating.value;

//         const newMovie = {photo, title, genre, duration, year, rating};
//         console.log(newMovie);

//         fetch('http://localhost:3000/movie', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify(newMovie)
//         })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data);
//         })
//     }

//     return (
//         <div className='w-11/12 mx-auto py-5'>
//             <Helmet>
//                 <title>MOVIE PORTAL | add a movie</title>
//             </Helmet>
//             <div className="h-[700px] flex items-center justify-center bg-gray-100">
//                 <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
//                     <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
//                         Add a movie Form
//                     </h2>
//                     <form onSubmit={handleAddAMovie}>
//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-semibold mb-2">
//                             Movie Poster
//                             </label>
//                             <input
//                                 name="photo"
//                                 type="url"
//                                 placeholder="Enter your movie poster"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-semibold mb-2">
//                                 Title
//                             </label>
//                             <input
//                                 name="title"
//                                 type="text"
//                                 placeholder="Enter your title"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-semibold mb-2">
//                             Genre
//                             </label>
//                             <input
//                                 name="genre"
//                                 type="text"
//                                 placeholder="Enter your genre"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-semibold mb-2">
//                             Duration
//                             </label>
//                             <input
//                                 name="duration"
//                                 type="text"
//                                 placeholder="Enter your duration"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-semibold mb-2">
//                             Release Year
//                             </label>
//                             <input
//                                 name="year"
//                                 type="text"
//                                 placeholder="Enter your Release Year"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                                 required
//                             />
//                         </div>

//                         <div className="mb-4">
//                             <label className="block text-gray-700 text-sm font-semibold mb-2">
//                             Rating
//                             </label>
//                             <input
//                                 name="rating"
//                                 type="text"
//                                 placeholder="Enter your Rating"
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
//                                 required
//                             />
//                         </div>
//                         <input type="submit" value="Add A Movie" className='btn btn-block' />
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AddAMovie;


import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify'; 

const AddAMovie = () => {
    const [formData, setFormData] = useState({
        photo: '',
        title: '',
        email: '',
        genre: '',
        duration: '',
        year: '',
        rating: ''
    });

    const handleAddAMovie = e => {
        e.preventDefault();

        const { photo, title, email, genre, duration, year, rating } = formData;

        // Form validation
        if (!/^https?:\/\//.test(photo)) {
            toast.error('Please enter a valid image URL.');
            return;
        }

        if (title.length < 2) {
            toast.error('Title must be at least 2 characters.');
            return;
        }

        if (duration <= 60) {
            toast.error('Duration must be greater than 60 minutes.');
            return;
        }

        if (!rating || rating < 1 || rating > 5) {
            toast.error('Please select a valid rating between 1 and 5.');
            return;
        }

        const newMovie = { photo, title, email, genre, duration, year, rating };
        console.log(newMovie);

        fetch('http://localhost:3000/movie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Movie added successfully!');
                setFormData({
                    photo: '',
                    title: '',
                    email: '',
                    genre: '',
                    duration: '',
                    year: '',
                    rating: ''
                });
            })
            .catch(err => {
                toast.error('Failed to add movie.');
                console.error('Error:', err);
            });
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='w-11/12 mx-auto py-5'>
            <Helmet>
                <title>MOVIE PORTAL | Add a Movie</title>
            </Helmet>
            <div className="h-[700px] flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Add a Movie Form</h2>
                    <form onSubmit={handleAddAMovie}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Movie Poster</label>
                            <input
                                name="photo"
                                type="url"
                                value={formData.photo}
                                onChange={handleChange}
                                placeholder="Enter your movie poster URL"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Title</label>
                            <input
                                name="title"
                                type="text"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter your title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
                            <input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Genre</label>
                            <input
                                name="genre"
                                type="text"
                                value={formData.genre}
                                onChange={handleChange}
                                placeholder="Enter your genre"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Duration</label>
                            <input
                                name="duration"
                                type="number"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="Enter movie duration in minutes"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Release Year</label>
                            <input
                                name="year"
                                type="text"
                                value={formData.year}
                                onChange={handleChange}
                                placeholder="Enter release year"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">Rating</label>
                            <input
                                name="rating"
                                type="number"
                                value={formData.rating}
                                onChange={handleChange}
                                min="1"
                                max="5"
                                placeholder="Enter movie rating (1-5)"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <input
                            type="submit"
                            value="Add A Movie"
                            className="btn btn-block bg-blue-500 text-white py-2 px-4 rounded-md"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAMovie;
