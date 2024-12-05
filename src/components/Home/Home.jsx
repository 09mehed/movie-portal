import React from 'react';
import Banner from '../Banner/Banner';
import { useLoaderData } from 'react-router-dom';
import Addmovie from '../AddMovie/Addmovie';
import TopRatedMovie from '../TopRatedMovie/TopRatedMovie';

const Home = () => {

    const movie = useLoaderData()

    return (
        <div>
            <Banner></Banner>
            <Addmovie movie={movie}></Addmovie>
            <TopRatedMovie></TopRatedMovie>
        </div>
    );
};

export default Home;