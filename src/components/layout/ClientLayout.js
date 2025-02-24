'use client';

import { AuthContextProvider } from '@/context/AuthContext';
import Navbar from '@/components/layout/Navbar';
import { useState, useEffect } from 'react';

export default function ClientLayout({ children }) {
    const [error, setError] = useState(null);

    // Add global error handler
    useEffect(() => {
        const handleError = (event) => {
            event.preventDefault();
            console.error('Global error:', event.error);
            setError(event.error || new Error('An unexpected error occurred'));
        };

        window.addEventListener('error', handleError);
        window.addEventListener('unhandledrejection', handleError);

        return () => {
            window.removeEventListener('error', handleError);
            window.removeEventListener('unhandledrejection', handleError);
        };
    }, []);

    // Clear error after 5 seconds
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    if (error) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-red-100 rounded-full p-3">
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">Oops! Something went wrong</h2>
                    <p className="text-gray-600 text-center mb-6">{error.message}</p>
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Reload Page
                        </button>
                        <button
                            onClick={() => setError(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                            Dismiss
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <AuthContextProvider>
            <Navbar />
            <main className="min-h-screen bg-gray-50">{children}</main>
        </AuthContextProvider>
    );
}
