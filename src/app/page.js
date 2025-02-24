'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
    return (
        <div className="relative isolate">
            {/* Hero section */}
            <div className="relative pt-14">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
                </div>

                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Smart EV Charging Solutions</h1>
                            <p className="mt-6 text-lg leading-8 text-gray-600">
                                Book your charging slots efficiently and manage your EV charging schedule with our intelligent platform. Compare different charging schemes and find
                                the best option for your needs.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link
                                    href="/schemes"
                                    className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    View Schemes
                                </Link>
                                <Link href="/about" className="text-sm font-semibold leading-6 text-gray-900">
                                    Learn more <span aria-hidden="true">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Feature section */}
                    <div className="mx-auto mt-32 max-w-7xl sm:mt-56">
                        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
                            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
                                <h2 className="mb-3 text-2xl font-semibold">
                                    Smart Booking <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
                                </h2>
                                <p className="m-0 max-w-[30ch] text-sm opacity-50">Book your charging slots with just a few clicks.</p>
                            </div>

                            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
                                <h2 className="mb-3 text-2xl font-semibold">
                                    Compare Schemes <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
                                </h2>
                                <p className="m-0 max-w-[30ch] text-sm opacity-50">Compare different charging schemes and find the best fit.</p>
                            </div>

                            <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100">
                                <h2 className="mb-3 text-2xl font-semibold">
                                    Profile Management <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">→</span>
                                </h2>
                                <p className="m-0 max-w-[30ch] text-sm opacity-50">Manage your profile and track your charging history.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
