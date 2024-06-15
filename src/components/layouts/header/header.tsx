"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import SearchBar from '../../elements/search/searchBar';
import Hamburger from '../../elements/button/header_hamburger';

import AuthToggleWrap from '../../elements/button/header_authtogglewrap';

const Header = ({ webTitle }: { webTitle: string }) => {
    const [showNavigation, setShowNavigation] = useState(false);
    const toggleNavigation = () => setShowNavigation(!showNavigation);

    return (
        <header className="w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-between">
            <div className="flex items-center justify-start">
                <Hamburger />
                <div className="logo">
                    <Link href="/" style={{ color: 'white', fontSize: 'large' }}>{webTitle}</Link>
                </div>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <SearchBar />
            </div>
            <AuthToggleWrap isLoggedIn={true} />
        </header>
    );
};

export default Header;