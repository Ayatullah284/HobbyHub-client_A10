import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

const Root = () => {
    return (
        <div>
            <Navbar />
            <div className="pt-20"> {/* Navbar height অনুযায়ী padding */}
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};


export default Root;