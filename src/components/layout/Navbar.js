'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const { user, googleSignIn, logout, loading, error } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    const handleSignIn = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            await googleSignIn();
        } catch (error) {
            console.error('Sign in error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignOut = async () => {
        if (isLoading) return;
        try {
            setIsLoading(true);
            await logout();
        } catch (error) {
            console.error('Sign out error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/" className="flex items-center">
                            <span className="text-xl font-bold">EV Charging</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8">
                        <Link href="/about" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                            About Us
                        </Link>
                        <Link href="/gallery" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                            Gallery
                        </Link>
                        <Link href="/schemes" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                            Schemes
                        </Link>
                        {loading || isLoading ? (
                            <div className="inline-flex items-center px-1 pt-1 text-gray-500">
                                <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Loading...
                            </div>
                        ) : user ? (
                            <>
                                <Link href="/booking" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                                    Book Now
                                </Link>
                                <Link href="/profile" className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
                                    Profile
                                </Link>
                                <button
                                    disabled={isLoading}
                                    onClick={handleSignOut}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleSignIn}
                                disabled={isLoading}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
