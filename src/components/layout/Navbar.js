'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
    const { user, googleSignIn, logout, loading, error } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = event => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
        setShowProfileMenu(false);
    };

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
        <nav className="bg-white border-b border-gray-200 fixed w-full z-50 top-0 md:bg-white/80 md:backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3">
                            <svg
                                className="h-8 w-8 text-blue-600"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M23 11h-4.6a1 1 0 0 1-.8-.4l-1.2-1.6a1 1 0 0 0-.8-.4H8.4a1 1 0 0 0-.8.4L6.4 10.6a1 1 0 0 1-.8.4H1" />
                                <path d="M3 17h18" />
                                <path d="M12 17v-6" />
                                <path d="M9 11v6" />
                                <path d="M15 11v6" />
                            </svg>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">EV Charging</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        <div className="flex space-x-4">
                            <Link href="/about" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                About Us
                            </Link>
                            <Link href="/gallery" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                Gallery
                            </Link>
                            <Link href="/schemes" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                Schemes
                            </Link>
                        </div>

                        {loading || isLoading ? (
                            <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-600">
                                <svg className="animate-spin h-5 w-5 mr-2 text-blue-600" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                </svg>
                                Loading...
                            </div>
                        ) : user ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/booking" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    Book Now
                                </Link>
                                <Link href="/bookings" className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    My Bookings
                                </Link>
                                <div className="relative" ref={menuRef}>
                                    <button
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        <span>{user?.email?.split('@')[0]}</span>
                                        <svg
                                            className={`h-4 w-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {showProfileMenu && (
                                        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                            <Link
                                                href="/profile"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                                                onClick={() => setShowProfileMenu(false)}
                                            >
                                                Profile Settings
                                            </Link>
                                            <button
                                                disabled={isLoading}
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <button
                                onClick={handleSignIn}
                                disabled={isLoading}
                                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In with Google'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                ref={mobileMenuRef}
                className={`fixed inset-y-0 right-0 w-full max-w-sm bg-white/100 shadow-lg transform transition-transform duration-300 ease-in-out backdrop-blur-2xl md:hidden ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                <div className="flex flex-col h-full divide-y divide-gray-200">
                    <div className="flex items-center justify-between h-16 px-4">
                        <span className="text-xl font-bold text-gray-900">Menu</span>
                        <button
                            onClick={closeMobileMenu}
                            className="rounded-md text-gray-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                        >
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="px-2 py-3 space-y-1">
                        <Link
                            href="/about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            onClick={closeMobileMenu}
                        >
                            About Us
                        </Link>
                        <Link
                            href="/gallery"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            onClick={closeMobileMenu}
                        >
                            Gallery
                        </Link>
                        <Link
                            href="/schemes"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                            onClick={closeMobileMenu}
                        >
                            Schemes
                        </Link>
                    </div>

                    {user && (
                        <div className="px-2 py-3 space-y-1">
                            <Link
                                href="/booking"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                onClick={closeMobileMenu}
                            >
                                Book Now
                            </Link>
                            <Link
                                href="/bookings"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                onClick={closeMobileMenu}
                            >
                                My Bookings
                            </Link>
                            <Link
                                href="/profile"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                                onClick={closeMobileMenu}
                            >
                                Profile Settings
                            </Link>
                            <button
                                onClick={() => {
                                    closeMobileMenu();
                                    handleSignOut();
                                }}
                                disabled={isLoading}
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-gray-50 disabled:opacity-50"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}

                    {!user && !loading && (
                        <div className="px-4 py-4">
                            <button
                                onClick={() => {
                                    closeMobileMenu();
                                    handleSignIn();
                                }}
                                disabled={isLoading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? 'Signing in...' : 'Sign In with Google'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
