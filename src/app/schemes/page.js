'use client';

import { useState } from 'react';

export default function Schemes() {
    const [parameters, setParameters] = useState({
        batteryCapacity: '',
        wallBoxPower: '',
        socketBreaker: '',
        dailyRange: '',
        location: '',
    });

    const locations = [
        { id: 'loc1', name: 'Location 1', irradiance: 4.5 },
        { id: 'loc2', name: 'Location 2', irradiance: 5.0 },
        { id: 'loc3', name: 'Location 3', irradiance: 5.5 },
    ];

    const handleInputChange = e => {
        const { name, value } = e.target;
        setParameters(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const calculateSchemes = () => {
        // Add your scheme calculation logic here
        // This should update the displayed schemes based on the input parameters
    };

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">Charging Schemes</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Compare Our Charging Options</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Enter your vehicle and usage details to find the most suitable charging scheme for your needs.</p>
                </div>

                {/* Parameters Form */}
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                        <div className="px-4 py-6 sm:p-8">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="batteryCapacity" className="block text-sm font-medium leading-6 text-gray-900">
                                        Battery Capacity (kWh)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="batteryCapacity"
                                            id="batteryCapacity"
                                            value={parameters.batteryCapacity}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="wallBoxPower" className="block text-sm font-medium leading-6 text-gray-900">
                                        Wall Box Power Rating (kW)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="wallBoxPower"
                                            id="wallBoxPower"
                                            value={parameters.wallBoxPower}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="socketBreaker" className="block text-sm font-medium leading-6 text-gray-900">
                                        Socket Charging Breaker Size (A)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="socketBreaker"
                                            id="socketBreaker"
                                            value={parameters.socketBreaker}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="dailyRange" className="block text-sm font-medium leading-6 text-gray-900">
                                        Daily Range (km)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="number"
                                            name="dailyRange"
                                            id="dailyRange"
                                            value={parameters.dailyRange}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                        Location
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            name="location"
                                            id="location"
                                            value={parameters.location}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value="">Select a location</option>
                                            {locations.map(location => (
                                                <option key={location.id} value={location.id}>
                                                    {location.name} (Irradiance: {location.irradiance} kWh/m²/day)
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                            <button
                                type="button"
                                onClick={calculateSchemes}
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Calculate Schemes
                            </button>
                        </div>
                    </div>
                </div>

                {/* Schemes Comparison */}
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
                        {/* Basic Scheme */}
                        <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8">
                            <h3 className="text-xl font-semibold leading-8 text-gray-900">Basic Scheme</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">Perfect for occasional charging needs</p>
                            <div className="mt-6 text-base leading-7 text-gray-600">
                                <ul className="space-y-4">
                                    <li className="flex gap-x-3">
                                        <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Standard charging speed
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Pay-as-you-go pricing
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Standard Scheme */}
                        <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8">
                            <h3 className="text-xl font-semibold leading-8 text-gray-900">Standard Scheme</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">For regular charging requirements</p>
                            <div className="mt-6 text-base leading-7 text-gray-600">
                                <ul className="space-y-4">
                                    <li className="flex gap-x-3">
                                        <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Fast charging capability
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Monthly subscription
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Premium Scheme */}
                        <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8">
                            <h3 className="text-xl font-semibold leading-8 text-gray-900">Premium Scheme</h3>
                            <p className="mt-4 text-sm leading-6 text-gray-600">For heavy users with priority access</p>
                            <div className="mt-6 text-base leading-7 text-gray-600">
                                <ul className="space-y-4">
                                    <li className="flex gap-x-3">
                                        <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Priority charging access
                                    </li>
                                    <li className="flex gap-x-3">
                                        <svg className="h-6 w-5 flex-none text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        24/7 support
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
