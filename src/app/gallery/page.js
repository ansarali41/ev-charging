export default function Gallery() {
  // Sample gallery items - replace with your actual images
  const galleryItems = [
    {
      id: 1,
      title: 'Charging Station 1',
      description: 'Modern EV charging station with multiple ports',
      imageUrl: '/images/charging-station-1.jpg', // Add your images to public/images/
    },
    {
      id: 2,
      title: 'Charging Station 2',
      description: 'Solar-powered charging station',
      imageUrl: '/images/charging-station-2.jpg',
    },
    {
      id: 3,
      title: 'Charging Station 3',
      description: 'Fast charging station for electric vehicles',
      imageUrl: '/images/charging-station-3.jpg',
    },
    // Add more gallery items as needed
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Gallery</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Charging Stations
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Explore our network of modern and efficient charging stations.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {galleryItems.map((item) => (
            <article key={item.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-5 text-sm leading-6 text-gray-600">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
