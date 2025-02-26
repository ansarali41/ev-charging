import Image from 'next/image';

export default function About() {
    const sponsorsData = [
        {
            id: 1,
            name: 'Company 1',
            description: 'Modern EV charging station with multiple ports',
            imageUrl: '/images/logos/Lorem-ipsum-logo-design-on-transparent-PNG-removebg-preview.png',
            website: 'https://www.example.com/company1',
        },
        {
            id: 2,
            name: 'Company 2',
            description: 'Solar-powered charging station',
            imageUrl: '/images/logos/Lorem-ipsum-logo-design-on-transparent-PNG-removebg-preview.png',
            website: 'https://www.example.com/company2',
        },
        {
            id: 3,
            name: 'Company 3',
            description: 'Fast charging station for electric vehicles',
            imageUrl: '/images/logos/Lorem-ipsum-logo-design-on-transparent-PNG-removebg-preview.png',
            website: 'https://www.example.com/company3',
        },
    ];

    const teamMembers = [
        {
            id: 1,
            name: 'John Doe',
            role: 'CEO & Founder',
            image: '/images/team/member2.png',
            bio: 'With over 15 years of experience in sustainable energy.',
            social: {
                linkedin: 'https://linkedin.com/in/johndoe',
                twitter: 'https://twitter.com/johndoe',
            },
        },
        {
            id: 2,
            name: 'Jane Smith',
            role: 'Technical Director',
            image: '/images/team/member1.png',
            bio: 'Expert in EV charging infrastructure and smart grid solutions.',
            social: {
                linkedin: 'https://linkedin.com/in/janesmith',
                twitter: 'https://twitter.com/janesmith',
            },
        },
        {
            id: 3,
            name: 'Mike Johnson',
            role: 'Operations Manager',
            image: '/images/team/member3.png',
            bio: 'Specializes in customer experience and service optimization.',
            social: {
                linkedin: 'https://linkedin.com/in/mikejohnson',
                twitter: 'https://twitter.com/mikejohnson',
            },
        },
    ];

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
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {teamMembers.map(member => (
                            <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-[4/3] relative bg-gradient-to-b from-blue-50 to-blue-100">
                                    <Image src={member.image} alt={member.name} fill className="object-cover" priority={member.id === 1} />
                                </div>
                                <div className="p-6">
                                    <h4 className="text-xl font-semibold text-gray-900">{member.name}</h4>
                                    <p className="text-blue-600 font-medium mt-1">{member.role}</p>
                                    <p className="text-gray-600 mt-4 text-sm">{member.bio}</p>
                                    <div className="mt-6 flex space-x-4">
                                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                        </a>
                                        <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sponsors */}
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                    <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-8">Our Sponsors</h3>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {sponsorsData.map(item => (
                            <div key={item.id} className="relative group overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                                <div className="aspect-[16/9] relative">
                                    <Image src={item.imageUrl} alt={item.name} fill className="object-contain p-4" priority={item.id === 1} />
                                </div>
                                <div className="p-4 bg-white">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.name}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                    <a href={item.website} className="mt-4 inline-block text-blue-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
                                        Visit Website
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
