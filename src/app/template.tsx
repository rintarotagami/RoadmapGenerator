"use client";

import React, { useContext } from 'react';
import Navigation from '../components/layouts/navigation/navigation';
import { useNavigation } from '../contexts/UserContext';

export default function Template({ children }: { children: React.ReactNode }) {
    const { isOpen } = useNavigation();

    return (
        <div className="flex bg-gray-200">
            {isOpen && <Navigation />}
            <div className="flex-1">{children}</div>
        </div>
    );
}