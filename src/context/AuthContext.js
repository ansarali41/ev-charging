'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

const AuthContext = createContext({});

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthContextProvider');
    }
    return context;
};

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [authInitialized, setAuthInitialized] = useState(false);

    // Initialize Firebase Auth
    useEffect(() => {
        if (typeof window === 'undefined') return;

        let unsubscribe;
        const initializeAuth = async () => {
            try {
                // Verify auth is properly initialized
                if (!auth) {
                    throw new Error('Firebase Auth is not properly initialized');
                }

                unsubscribe = onAuthStateChanged(auth,
                    (user) => {
                        setUser(user);
                        setLoading(false);
                        setAuthInitialized(true);
                    },
                    (error) => {
                        console.error('Auth state change error:', error);
                        setError(error.message);
                        setLoading(false);
                        setAuthInitialized(true);
                    }
                );
            } catch (error) {
                console.error('Auth initialization error:', error);
                setError(error.message);
                setLoading(false);
                setAuthInitialized(true);
            }
        };

        initializeAuth();
        return () => unsubscribe && unsubscribe();
    }, []);

    const googleSignIn = async () => {
        if (!authInitialized) {
            setError('Authentication system is not yet initialized. Please try again in a moment.');
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Verify auth and provider are available
            if (!auth || !googleProvider) {
                throw new Error('Authentication service is not properly configured');
            }

            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            return result;
        } catch (error) {
            console.error('Error signing in with Google:', error);
            
            // Enhanced error handling
            switch (error.code) {
                case 'auth/configuration-not-found':
                    setError('Authentication service is misconfigured. Please contact support.');
                    break;
                case 'auth/popup-closed-by-user':
                    setError('Sign-in cancelled. Please try again.');
                    break;
                case 'auth/popup-blocked':
                    setError('Pop-up blocked. Please allow pop-ups for this site.');
                    break;
                case 'auth/cancelled-popup-request':
                    setError('Multiple pop-up requests. Please try again.');
                    break;
                case 'auth/network-request-failed':
                    setError('Network error. Please check your internet connection.');
                    break;
                default:
                    setError(error.message || 'An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        if (!authInitialized) {
            setError('Authentication system is not yet initialized. Please try again in a moment.');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            
            if (!auth) {
                throw new Error('Authentication service is not properly configured');
            }
            
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
            setError('Failed to sign out. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider 
            value={{
                user,
                loading,
                error,
                clearError,
                googleSignIn,
                logout,
                authInitialized
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
