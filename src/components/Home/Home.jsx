import React, { useContext, useState } from 'react';
import Banner from '../Banner/Banner';
import { useLoaderData } from 'react-router-dom';
import Addmovie from '../AddMovie/Addmovie';
import TopRatedMovie from '../TopRatedMovie/TopRatedMovie';
import PopularMovie from '../PopularMovie/PopularMovie';
import { AuthContext } from '../../authProvider/AuthProvider';

const Home = () => {

    const movie = useLoaderData()
    const [isRegistered, setIsRegistered] = useState(false);
    const {theme} = useContext(AuthContext);

    return (
        <div className={`min-h-screen bg-${theme === "light" ? "white" : "black"} text-${theme === "light" ? "black" : "white"}`}>
            <Banner></Banner>
            <Addmovie movie={movie} isRegistered={isRegistered}></Addmovie>
            
            <TopRatedMovie></TopRatedMovie>
            <PopularMovie></PopularMovie>
        </div>
    );
};

export default Home;