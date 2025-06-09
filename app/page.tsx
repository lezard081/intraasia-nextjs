import Image from "next/image";
import HeroCarousel from "@/app/ui/hero-carousel";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Carousel Section */}
      <section className="w-full h-[600px]">
        <HeroCarousel />
      </section>

      {/* Our Products Section */}
      <section className="w-full py-16 bg-[#0054A6] text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Products</h2>
          <div className="prose prose-lg prose-invert mx-auto">
            <p className="mb-4">
              Intra Asia is a trusted name in the supply and servicing of high-quality laundry and kitchen equipment across the region. We specialize in providing both equipment solutions and preventive maintenance services, ensuring optimal performance and extended lifespan of our clients' investments.
            </p>
            <p className="mb-4">
              With a commitment to technical excellence and client satisfaction, our mission is to deliver reliable and efficient support that helps businesses run smoothly. Whether you're outfitting a new facility or maintaining existing equipment, our skilled team is here to provide prompt, professional service tailored to your needs.
            </p>
            <p>
              At Intra Asia, we believe in building lasting relationships through quality, integrity, and dependable technical service.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
