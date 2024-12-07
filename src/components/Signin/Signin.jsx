import React, { useContext, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../authProvider/AuthProvider';
import Swal from 'sweetalert2';

const Signin = () => {

    const { handleLogin, handleGoogleLogin, setUser } = useContext(AuthContext)
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const emailRef = useRef()
    const [email, setEmail] = useState("")
    const location = useLocation()
    const from = location.state?.from || '/movie-details';

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        handleLogin(email, password)
            .then(res => {
                const user = res.user
                setUser(user)
                navigate(from, { replace: true });
                Swal.fire({
                    title: "Success!",
                    text: "User loged in  Successfully",
                    icon: "success",
                })
            })
            .catch(err => {
                setError(err.message);
                toast.error("Login failed! Please try again.", {
                    position: "top-center",
                });
            })
    }
    const googleLoginHandler = () => {
        handleGoogleLogin()
            .then((res) => {
                const user = res.user;
                setUser(user);
                navigate("/");
                Swal.fire({
                    title: "Success!",
                    text: "User loged in  Successfully",
                    icon: "success",
                })
            })
            .catch((err) => {
                setError(err.message);
                Swal.fire({
                    title: "Success!",
                    text: "User loged in  Successfully",
                    icon: "success",
                })
            });
    }

    return (
        <div className="w-11/12 mx-auto py-5">
            <Helmet>
                <title>Movie Portal | login</title>
            </Helmet>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Login Form
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                ref={emailRef}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        {
                            error.login && <label className="label">{error.login}</label>
                        }
                        <div className="mb-4">
                            <Link
                                to="/forgotPassword"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Forget Password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Login
                        </button>
                    </form>
                    {error && <p className="text-red-500 font-semibold">{error.split("/")[1].slice(0, 18)}</p>}

                    <p>Do not have any account? Please <Link className="text-red-600 font-semibold" to='/signup'>Register</Link> or <button onClick={googleLoginHandler} className="text-green-600 font-semibold">Google</button></p>
                </div>
            </div>
        </div>
    );
};

export default Signin;