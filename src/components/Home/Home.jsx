import React from 'react';
import Banner from '../Banner/Banner';
import { useLoaderData } from 'react-router-dom';
import Addmovie from '../AddMovie/Addmovie';

const Home = () => {

    const movie = useLoaderData()

    return (
        <div>
            <Banner></Banner>
            <Addmovie movie={movie}></Addmovie>
            
        </div>
    );
};

export default Home;