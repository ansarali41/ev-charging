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
    const [currentPage, setCurrentPage] = useState(1);

    const ITEMS_PER_PAGE = 5;
    const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentBookings = bookings.slice(startIndex, endIndex);

    useEffect(() => {
        if (user) {
            loadBookings();
        }
    }, [user]);

    const loadBookings = async () => {
        try {
            const bookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
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

    const handleCancelClick = booking => {
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
                    <div className="sm:flex-auto mt-12">
                        <h1 className="text-base font-semibold leading-6 text-blue-600">My Bookings</h1>
                        <p className="mt-2 text-sm text-gray-700">A list of all your charging station bookings including station details and status.</p>
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
                                <>
                                    {/* Mobile view */}
                                    <div className="block sm:hidden space-y-4">
                                        {currentBookings.map(booking => (
                                            <div key={booking.id} className="bg-white rounded-lg shadow p-4 border border-gray-200">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-medium text-gray-900">{booking.stationName}</h3>
                                                    <button onClick={() => handleCancelClick(booking)} className="text-sm text-red-600 hover:text-red-900 font-medium">
                                                        Cancel
                                                    </button>
                                                </div>
                                                <div className="space-y-1 text-sm text-gray-500">
                                                    <p>Time: {formatBookingDateTime(booking.date, booking.time)}</p>
                                                    <p>Duration: {booking.duration} minutes</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Desktop view */}
                                    <div className="hidden sm:block">
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
                                                {currentBookings.map(booking => (
                                                    <tr key={booking.id}>
                                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{booking.stationName}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatBookingDateTime(booking.date, booking.time)}</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{booking.duration} minutes</td>
                                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                            <button onClick={() => handleCancelClick(booking)} className="text-red-600 hover:text-red-900 font-medium">
                                                                Cancel
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="mt-4 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                            <div className="flex flex-1 justify-between sm:hidden">
                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                    disabled={currentPage === 1}
                                                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                                >
                                                    Previous
                                                </button>
                                                <button
                                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                    disabled={currentPage === totalPages}
                                                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                                >
                                                    Next
                                                </button>
                                            </div>
                                            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                                <div>
                                                    <p className="text-sm text-gray-700">
                                                        Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                                        <span className="font-medium">{Math.min(endIndex, bookings.length)}</span> of{' '}
                                                        <span className="font-medium">{bookings.length}</span> results
                                                    </p>
                                                </div>
                                                <div>
                                                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                                        <button
                                                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                            disabled={currentPage === 1}
                                                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                                        >
                                                            <span className="sr-only">Previous</span>
                                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                            <button
                                                                key={page}
                                                                onClick={() => setCurrentPage(page)}
                                                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                                                    currentPage === page
                                                                        ? 'z-10 bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                                                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                                                }`}
                                                            >
                                                                {page}
                                                            </button>
                                                        ))}
                                                        <button
                                                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                            disabled={currentPage === totalPages}
                                                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
                                                        >
                                                            <span className="sr-only">Next</span>
                                                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path
                                                                    fillRule="evenodd"
                                                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                                                    clipRule="evenodd"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </>
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
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">
                                            Cancel Booking
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">Are you sure you want to cancel this booking? This action cannot be undone.</p>
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
