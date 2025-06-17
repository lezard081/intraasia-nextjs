import Image from "next/image";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <section className="relative w-full h-[400px]">
        <Image
          src="/about-banner.jpg"
          alt="About Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">About our company</h1>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="mb-4">
                <h2 className="text-3xl font-bold mb-2 relative">
                  <span className="inline-block w-16 h-1 bg-gray-800 absolute -top-4"></span>
                  Who we are
                </h2>
              </div>
              <p className="text-gray-700">
                Intra Asia is a trusted name in the supply and servicing of high-quality laundry and kitchen equipment across the region. We specialize in providing both equipment solutions and preventive maintenance services, ensuring optimal performance and extended lifespan of our clients' investments.
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="w-full h-[300px] relative rounded-lg overflow-hidden shadow">
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src="/about-images/about-1.jpg"
                    alt="Intra Asia team at work"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Quality Policy Section */}
      <section className="w-full py-16 bg-gray-100">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2">
              <div className="w-full h-[300px] relative rounded-lg overflow-hidden shadow">
                <Image
                  src="/about-images/about-2.jpg"
                  alt="Intra Asia quality policy"
                  fill
                  className="object-contain bg-transparent"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="mb-4">
                <h2 className="text-3xl font-bold mb-2 relative text-gray-800">
                  <span className="inline-block w-16 h-1 bg-gray-800 absolute -top-4"></span>
                  Our Quality Policy
                </h2>
              </div>
              <p className="text-gray-700">
                At Intra Asia, we believe in building lasting relationships through quality, integrity, and dependable technical service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add a third section for the last image */}
      <section className="w-full py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="mb-4">
                <h2 className="text-3xl font-bold mb-2 relative">
                  <span className="inline-block w-16 h-1 bg-gray-800 absolute -top-4"></span>
                  Our Team
                </h2>
              </div>
              <p className="text-gray-700">
                Our dedicated team is committed to providing the best service and support to our clients, ensuring their equipment runs smoothly and efficiently.
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="w-full h-[300px] relative rounded-lg overflow-hidden shadow">
                <div className="absolute inset-0 rounded-lg overflow-hidden">
                  <Image
                    src="/about-images/about-3.jpg"
                    alt="Intra Asia team group photo"
                    fill
                    className="object-contain bg-transparent"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}