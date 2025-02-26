'use client';

import { useState } from 'react';

export default function Schemes() {
    const [batteryCapacity, setBatteryCapacity] = useState('');
    const [mileage, setMileage] = useState('');
    const [irradiance, setIrradiance] = useState('1'); // Default multiplier

    // Irradiance levels and their multipliers
    const irradianceLevels = [
        { value: '1', label: 'Low Irradiance (1x)' },
        { value: '1.5', label: 'Medium Irradiance (1.5x)' },
        { value: '2', label: 'High Irradiance (2x)' },
    ];

    // Calculate costs based on battery capacity (mAh)
    const calculateCosts = () => {
        const capacity = parseFloat(batteryCapacity) || 0;
        const miles = parseFloat(mileage) || 0;
        const irradianceMultiplier = parseFloat(irradiance);

        return {
            offGrid: capacity * 100, // Off-grid: mAh * 100 USD
            hybrid: capacity * 75, // Hybrid: mAh * 75 USD
            ceb: (capacity * 25 + miles * 7) * irradianceMultiplier, // CEB: (mAh * 25 + mileage * 7) * irradiance
        };
    };

    const costs = calculateCosts();

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">Scheme Calculator</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">EV Charging Scheme Cost Calculator</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">Calculate and compare costs across different charging schemes based on your vehicle specifications.</p>
                </div>

                <div className="mx-auto mt-16 max-w-2xl sm:mt-20">
                    {/* Input Parameters */}
                    <div className="space-y-6 bg-white p-6 rounded-lg shadow">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Battery Capacity (mAh)</label>
                            <input
                                type="number"
                                value={batteryCapacity}
                                onChange={e => setBatteryCapacity(e.target.value)}
                                className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="Enter battery capacity"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Mileage</label>
                            <input
                                type="number"
                                value={mileage}
                                onChange={e => setMileage(e.target.value)}
                                className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                placeholder="Enter mileage"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Irradiance Level</label>
                            <select
                                value={irradiance}
                                onChange={e => setIrradiance(e.target.value)}
                                className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            >
                                {irradianceLevels.map(level => (
                                    <option key={level.value} value={level.value}>
                                        {level.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Scheme Costs */}
                    <div className="mt-10 grid gap-6 sm:grid-cols-3">
                        {/* Off-Grid Scheme */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900">Off-Grid Scheme</h3>
                            <div className="mt-4">
                                <p className="text-3xl font-bold text-blue-600">${costs.offGrid.toFixed(2)}</p>
                                <p className="mt-2 text-sm text-gray-500">Based on battery capacity only</p>
                            </div>
                        </div>

                        {/* Hybrid Scheme */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900">Hybrid Scheme</h3>
                            <div className="mt-4">
                                <p className="text-3xl font-bold text-blue-600">${costs.hybrid.toFixed(2)}</p>
                                <p className="mt-2 text-sm text-gray-500">Optimized for mixed usage</p>
                            </div>
                        </div>

                        {/* CEB Scheme */}
                        <div className="bg-white p-6 rounded-lg shadow">
                            <h3 className="text-lg font-medium text-gray-900">CEB Scheme</h3>
                            <div className="mt-4">
                                <p className="text-3xl font-bold text-blue-600">${costs.ceb.toFixed(2)}</p>
                                <p className="mt-2 text-sm text-gray-500">Includes mileage and irradiance factors</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
