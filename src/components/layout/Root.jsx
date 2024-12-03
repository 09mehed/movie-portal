import React from 'react';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const Root = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen">
                <Header></Header>
                <main className="flex-grow">
                    <Outlet></Outlet>
                </main>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Root;