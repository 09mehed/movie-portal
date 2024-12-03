import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <div className="navbar bg-base-100 w-11/12 mx-auto p-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a>Item 1</a></li>
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <a className="text-2xl font-bold">MOVIE PORTAL</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 text-xl">
                    <NavLink to='/' className='pr-2'>Home</NavLink>
                    <NavLink to='allMovies' className='pr-2'>All Movies</NavLink>
                    <NavLink to='addMovie' className='pr-2'>Add Movie</NavLink>
                    <NavLink to='favourite' className='pr-2'>My Favorites</NavLink>
                    <NavLink to='/share' className='pr-2'>Share</NavLink>
                </ul>
            </div>
            <div className="navbar-end">
                <Link className='btn btn-success' to='signin'>Login</Link>
            </div>
        </div>
    );
};

export default Header;