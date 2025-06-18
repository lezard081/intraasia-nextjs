'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { getHeroSlides } from '@/app/lib/data-client';
import { SlideData } from '@/app/lib/types/slides';
import { cn } from '@/app/lib/utils';
import { useState, useEffect } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroCarousel = () => {
    const [slides, setSlides] = useState<SlideData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadSlides() {
            try {
                const heroSlides = await getHeroSlides();
                setSlides(heroSlides);
            } catch (error) {
                console.error('Error loading hero slides:', error);
            } finally {
                setLoading(false);
            }
        }

        loadSlides();
    }, []);

    if (loading) {
        return (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-200">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full overflow-hidden">
            <Swiper
                style={{
                    ["--swiper-theme-color" as string]: "rgba(0, 0, 0, 0.8)",
                    ["--swiper-pagination-bullet-inactive-color" as string]: "rgba(255, 255, 255, 0.5)",
                    ["--swiper-pagination-bullet-inactive-opacity" as string]: "1",
                }}
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                slidesPerView={1}
                spaceBetween={0}
                speed={1000}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                pagination={{ 
                    clickable: true,
                    dynamicBullets: true,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                effect="fade"
                fadeEffect={{
                    crossFade: true
                }}
                loop={true}
                className="w-full h-full"
            >
                {slides.map((slide: SlideData, index: number) => (
                    <SwiperSlide key={slide.id} className="relative">
                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                        <Image
                            src={slide.image}
                            alt={`Hero image ${slide.id}`}
                            width={1920}
                            height={1080}
                            className={cn(
                                "w-full h-full object-cover transition-opacity duration-700",
                                "swiper-fade-out:opacity-0 swiper-fade-in:opacity-100"
                            )}
                            priority={index === 0}
                        />
                    </SwiperSlide>
                ))}

                <div className="swiper-button-prev !text-white !opacity-70 hover:!opacity-100 transition-opacity"></div>
                <div className="swiper-button-next !text-white !opacity-70 hover:!opacity-100 transition-opacity"></div>

                <div className="absolute bottom-0 left-0 w-full z-10">
                    <div className="w-full h-1 bg-black/10">
                        <div className="h-full bg-white/50 animate-[progress_5s_linear_infinite]"></div>
                    </div>
                </div>
            </Swiper>
        </div>
    );
};

export default HeroCarousel;
