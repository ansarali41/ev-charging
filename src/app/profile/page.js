'use client';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
    const { user } = useAuth();
    const [profile, setProfile] = useState({
        name: '',
        surname: '',
        address: '',
        batteryCapacity: '',
        dailyRange: '',
        registrationYear: '',
        registrationNumber: '',
        email: user?.email || '',
        photoURL: user?.photoURL || '',
        lastUpdated: null,
    });
    const [editMode, setEditMode] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (user) {
            loadProfile();
        }
    }, [user]);

    const loadProfile = async () => {
        try {
            const docRef = doc(db, 'profiles', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                setProfile(prev => ({
                    ...prev,
                    ...data,
                    email: user.email, // Always use latest email from auth
                    photoURL: user.photoURL, // Always use latest photo from auth
                }));
            }
        } catch (error) {
            const errorMessage =
                error.code === 'permission-denied'
                    ? 'You do not have permission to access this profile. Please sign in with the correct account.'
                    : 'Failed to load profile. Please refresh the page.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        if (editMode) {
            setProfile(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const validateProfile = data => {
        if (!data.name || !data.surname) {
            throw new Error('Name and surname are required');
        }
        if (!data.address) {
            throw new Error('Address is required');
        }
        if (data.batteryCapacity && (isNaN(data.batteryCapacity) || data.batteryCapacity <= 0)) {
            throw new Error('Battery capacity must be a positive number');
        }
        if (data.dailyRange && (isNaN(data.dailyRange) || data.dailyRange <= 0)) {
            throw new Error('Daily range must be a positive number');
        }
        if (data.registrationYear) {
            const year = parseInt(data.registrationYear);
            const currentYear = new Date().getFullYear();
            if (isNaN(year) || year < 1900 || year > currentYear) {
                throw new Error(`Registration year must be between 1900 and ${currentYear}`);
            }
        }
        return true;
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSaving(true);
        const toastId = toast.loading('Saving profile...');

        try {
            // Validate profile data
            validateProfile(profile);

            // Prepare profile data with timestamps and metadata
            const updatedProfile = {
                ...profile,
                lastUpdated: serverTimestamp(),
                updatedBy: user.uid,
                email: user.email,
                photoURL: user.photoURL,
            };

            // Save to Firestore
            const docRef = doc(db, 'profiles', user.uid);
            await setDoc(docRef, updatedProfile, { merge: true });

            // Update local state
            setProfile(prev => ({ ...prev, lastUpdated: new Date() }));
            setEditMode(false);
            toast.success('Profile updated successfully!', { id: toastId });
        } catch (error) {
            let errorMessage = error.message || 'Error saving profile. Please try again.';

            // Handle specific Firebase errors
            if (error.code === 'permission-denied') {
                errorMessage = 'You do not have permission to save this profile. Please sign in with the correct account.';
            } else if (error.code === 'unavailable') {
                errorMessage = 'The service is currently unavailable. Please try again later.';
            } else if (error.code === 'unauthenticated') {
                errorMessage = 'Please sign in to save your profile.';
            }

            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsSaving(false);
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        loadProfile();
        toast.success('Changes cancelled');
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Please sign in to view your profile.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="py-8 sm:py-8">
            <Toaster position="top-right" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <h2 className="text-base font-semibold leading-6 text-blue-600">Profile</h2>

                    <p className="mt-6 text-lg leading-6 text-gray-600">Manage your personal and vehicle information.</p>

                    <div className="mt-16">
                        {/* Form */}
                        <form>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                First name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    value={profile.name}
                                                    onChange={handleInputChange}
                                                    disabled={!editMode}
                                                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="surname"
                                                    id="surname"
                                                    value={profile.surname}
                                                    onChange={handleInputChange}
                                                    disabled={!editMode}
                                                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-full">
                                            <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                                                Address
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="address"
                                                    id="address"
                                                    value={profile.address}
                                                    onChange={handleInputChange}
                                                    disabled={!editMode}
                                                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Vehicle Information</h2>
                                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="batteryCapacity" className="block text-sm font-medium leading-6 text-gray-900">
                                                Battery Capacity (kWh)
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="number"
                                                    name="batteryCapacity"
                                                    id="batteryCapacity"
                                                    value={profile.batteryCapacity}
                                                    onChange={handleInputChange}
                                                    disabled={!editMode}
                                                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="dailyRange" className="block text-sm font-medium leading-6 text-gray-900">
                                                Daily Range (km)
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="number"
                                                    name="dailyRange"
                                                    id="dailyRange"
                                                    value={profile.dailyRange}
                                                    onChange={handleInputChange}
                                                    disabled={!editMode}
                                                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="registrationYear" className="block text-sm font-medium leading-6 text-gray-900">
                                                Registration Year
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="number"
                                                    name="registrationYear"
                                                    id="registrationYear"
                                                    value={profile.registrationYear}
                                                    onChange={handleInputChange}
                                                    disabled={!editMode}
                                                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="registrationNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                                Registration Number
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="registrationNumber"
                                                    id="registrationNumber"
                                                    value={profile.registrationNumber}
                                                    onChange={handleInputChange}
                                                    disabled={!editMode}
                                                    className="block w-full rounded-md border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                <div className="text-sm text-gray-500">
                                    {profile.lastUpdated && <span>Last updated: {new Date(profile.lastUpdated?.toDate?.() || profile.lastUpdated).toLocaleString()}</span>}
                                </div>
                            </div>
                        </form>
                        {/* Edit/Save/Cancel buttons at the top */}
                        <div className="mb-6 flex justify-end">
                            {editMode ? (
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                        className="rounded-md bg-gray-100 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={isSaving}
                                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:bg-blue-300"
                                    >
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleEdit}
                                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
