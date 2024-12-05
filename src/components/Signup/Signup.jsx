import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const { handleRegister, manageProfile, handleGoogleLogin, setUser } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState()
    const from = location.state?.from || '/';

    const handleSubmit = (e) => {
        e.preventDefault()
        setError("")
        const name = e.target.name.value
        const email = e.target.email.value
        const photoURL = e.target.photoURL.value
        const password = e.target.password.value
        const conPassword = e.target.conPassword.value
        if (password !== conPassword) {
            setError("Password didn't match")
            return;
        }
        if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
            setError("please strong password")
            return;
        }
        handleRegister(email, password)

            .then(res => {
                manageProfile({ displayName: name, photoURL: photoURL })
                    .then(() => {
                        setUser((prevUser) => {
                            return { ...prevUser, displayName: name, photoURL: photoURL }
                        })
                        navigate(from, { replace: true });
                    })

                const user = res.user
                setUser(user)
                navigate(from, { replace: true });
                toast.success("Successfully logged in!", {
                    position: "top-center",
                });
            })
    }
    const googleLoginHandler = () => {
        handleGoogleLogin()
            .then(() => {
                navigate(location?.state?.from || "/", { replace: true });
            })
    }
    return (
        <div className="w-11/12 mx-auto py-5">
            <Helmet>
                <title>MOVIE PORTAL | register</title>
            </Helmet>
            <div className="h-[700px] flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Register Form
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Photo URL
                            </label>
                            <input
                                name="photoURL"
                                type="url"
                                placeholder="Enter your photo URL"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Password
                            </label>
                            <input
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Confirm Password
                            </label>
                            <input
                                name="conPassword"
                                type="password"
                                placeholder="Enter your confirm password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                            Register
                        </button>
                    </form>

                    {error && <p className="text-red-500">{error}</p>}
                    <p>Do not have any account? Please <Link className="text-red-600 font-semibold" to='/signin'>Login</Link> or <button onClick={googleLoginHandler} className="text-green-600 font-semibold">Google</button></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;