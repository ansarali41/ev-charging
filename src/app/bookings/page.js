'use client';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Bookings() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isCancelling, setIsCancelling] = useState(false);

    useEffect(() => {
        if (user) {
            loadBookings();
        }
    }, [user]);

    const loadBookings = async () => {
        try {
            const bookingsQuery = query(
                collection(db, 'bookings'),
                where('userId', '==', user.uid)
            );
            const querySnapshot = await getDocs(bookingsQuery);
            const bookingsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setBookings(bookingsData);
        } catch (error) {
            toast.error('Failed to load bookings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelClick = (booking) => {
        setSelectedBooking(booking);
        setShowConfirmModal(true);
    };

    const handleCancelConfirm = async () => {
        if (!selectedBooking) return;
        
        setIsCancelling(true);
        const toastId = toast.loading('Cancelling booking...');

        try {
            await deleteDoc(doc(db, 'bookings', selectedBooking.id));
            toast.success('Booking cancelled successfully', { id: toastId });
            
            // Remove the cancelled booking from the state
            setBookings(bookings.filter(b => b.id !== selectedBooking.id));
        } catch (error) {
            console.error('Error cancelling booking:', error);
            toast.error('Failed to cancel booking. Please try again.', { id: toastId });
        } finally {
            setIsCancelling(false);
            setShowConfirmModal(false);
            setSelectedBooking(null);
        }
    };

    const handleCancelModalClose = () => {
        if (!isCancelling) {
            setShowConfirmModal(false);
            setSelectedBooking(null);
        }
    };

    const formatBookingDateTime = (date, time) => {
        if (!date || !time) return 'N/A';
        return `${date} ${time}`;
    };



    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Please sign in to view your bookings.</p>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading bookings...</p>
            </div>
        );
    }

    return (
        <div className="py-8">
            <Toaster position="top-right" />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-base font-semibold leading-6 text-blue-600">My Bookings</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            A list of all your charging station bookings including station details and status.
                        </p>
                    </div>
                </div>
                
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            {bookings.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-sm text-gray-500">No bookings found.</p>
                                    <p className="mt-1 text-sm text-gray-500">Book a charging station to see it here.</p>
                                </div>
                            ) : (
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Station Name
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Booking Time
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Duration
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Actions
                                            </th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {booking.stationName}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {formatBookingDateTime(booking.date, booking.time)}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    {booking.duration} minutes
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <button
                                                        onClick={() => handleCancelClick(booking)}
                                                        className="text-red-600 hover:text-red-900 font-medium"
                                                    >
                                                        Cancel
                                                    </button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmModal && (
                <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">Cancel Booking</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to cancel this booking? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="button"
                                        disabled={isCancelling}
                                        onClick={handleCancelConfirm}
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:bg-red-300"
                                    >
                                        {isCancelling ? 'Cancelling...' : 'Cancel Booking'}
                                    </button>
                                    <button
                                        type="button"
                                        disabled={isCancelling}
                                        onClick={handleCancelModalClose}
                                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
