export default function About() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">About CEV Project</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Revolutionizing EV Charging Infrastructure</p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Our mission is to make electric vehicle charging more accessible, efficient, and sustainable for everyone.
                    </p>
                </div>

                {/* Aims and Objectives */}
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Aims and Objectives</h3>
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3">
                        <div className="flex flex-col">
                            <dt className="text-lg font-semibold leading-7 text-gray-900">Accessibility</dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">Make EV charging accessible to all vehicle owners through strategic placement of charging stations.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="text-lg font-semibold leading-7 text-gray-900">Sustainability</dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">Promote sustainable transportation by making EV charging more convenient and cost-effective.</p>
                            </dd>
                        </div>
                        <div className="flex flex-col">
                            <dt className="text-lg font-semibold leading-7 text-gray-900">Innovation</dt>
                            <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                <p className="flex-auto">Implement smart charging solutions and utilize renewable energy sources where possible.</p>
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Team Members */}
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Our Team</h3>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 text-gray-900">
                        {/* Add team member cards here */}
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold">Team Member 1</h4>
                            <p className="text-gray-600">Role / Position</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold">Team Member 2</h4>
                            <p className="text-gray-600">Role / Position</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="text-lg font-semibold">Team Member 3</h4>
                            <p className="text-gray-600">Role / Position</p>
                        </div>
                    </div>
                </div>

                {/* Sponsors */}
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Our Sponsors</h3>
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 text-gray-900">
                        {/* Add sponsor logos here */}
                        <div className="col-span-1 flex justify-center items-center">
                            <div className="h-16 w-full bg-gray-100 rounded-lg flex items-center justify-center">Sponsor 1</div>
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            <div className="h-16 w-full bg-gray-100 rounded-lg flex items-center justify-center">Sponsor 2</div>
                        </div>
                        <div className="col-span-1 flex justify-center items-center">
                            <div className="h-16 w-full bg-gray-100 rounded-lg flex items-center justify-center">Sponsor 3</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
