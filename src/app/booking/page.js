'use client';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase/config';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';

export default function Booking() {
    const { user } = useAuth();
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);

    // Generate time slots from 6:00 to 18:00 with 30-minute intervals
    const timeSlots = Array.from({ length: 25 }, (_, i) => {
        const hour = Math.floor(i / 2) + 6;
        const minute = (i % 2) * 30;
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    });

    useEffect(() => {
        if (user && selectedDate) {
            loadBookings();
        }
    }, [user, selectedDate]);

    const loadBookings = async () => {
        try {
            const bookingsRef = collection(db, 'bookings');
            const q = query(bookingsRef, where('date', '==', selectedDate));
            const querySnapshot = await getDocs(q);

            const bookedSlots = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setBookings(bookedSlots);
        } catch (error) {
            console.error('Error loading bookings:', error);
            toast.error('Failed to load bookings. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!selectedDate || !selectedTime) {
            toast.error('Please select both date and time');
            return;
        }

        if (!user) {
            toast.error('Please sign in to book a slot');
            return;
        }

        const toastId = toast.loading('Creating your booking...');
        setIsBooking(true);

        try {
            // Check if slot is already booked
            const isSlotBooked = bookings.some(booking => booking.time === selectedTime);

            if (isSlotBooked) {
                toast.error('This slot is already booked. Please select another time.', { id: toastId });
                return;
            }

            // Format the date to be more readable
            const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Add new booking
            await addDoc(collection(db, 'bookings'), {
                userId: user.uid,
                userEmail: user.email,
                date: formattedDate,
                time: selectedTime,
                createdAt: serverTimestamp(),
                duration: 30, // 30 minutes slot
                stationName: 'EV Charging Station 1' // Default station name
            });

            toast.success('Booking successful!', { id: toastId });
            loadBookings(); // Reload bookings
            setSelectedTime(''); // Reset selected time
        } catch (error) {
            console.error('Error creating booking:', error);
            let errorMessage = 'Error creating booking. Please try again.';
            
            // Handle specific Firebase errors
            if (error.code === 'permission-denied') {
                errorMessage = 'You do not have permission to make bookings.';
            } else if (error.code === 'unavailable') {
                errorMessage = 'The service is currently unavailable. Please try again later.';
            }
            
            toast.error(errorMessage, { id: toastId });
        } finally {
            setIsBooking(false);
        }
    };

    const isSlotBooked = time => {
        return bookings.some(booking => booking.time === time);
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Please sign in to book a charging slot.</p>
            </div>
        );
    }

    return (
        <div className="py-24 sm:py-32">
            <Toaster position="top-right" />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">Booking</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Book Your Charging Slot</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Select your preferred date and time for charging your vehicle.</p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20">
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                    <label htmlFor="date" className="block text-sm font-medium leading-6 text-gray-900">
                                        Select Date
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            value={selectedDate}
                                            onChange={e => setSelectedDate(e.target.value)}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>

                            {selectedDate && (
                                <div className="mt-10">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Available Time Slots</h3>
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                                        {timeSlots.map(time => {
                                            const booked = isSlotBooked(time);
                                            return (
                                                <button
                                                    key={time}
                                                    onClick={() => !booked && setSelectedTime(time)}
                                                    disabled={booked}
                                                    className={`
                            rounded-md px-3 py-2 text-sm font-semibold shadow-sm
                            ${
                                booked
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : time === selectedTime
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                            }
                          `}
                                                >
                                                    {time}
                                                    {booked && ' (Booked)'}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                            type="button"
                            onClick={handleBooking}
                            disabled={!selectedDate || !selectedTime || isBooking}
                            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            {isBooking ? 'Booking...' : 'Book Slot'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
