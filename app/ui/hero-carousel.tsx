'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { heroSlides } from '@/app/lib/data/heroSlides';
import { SlideData } from '@/app/lib/types/slides';
import { cn } from '@/app/lib/utils';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroCarousel = () => {
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
                {heroSlides.map((slide: SlideData, index: number) => (
                    <SwiperSlide key={slide.id} className="relative">
                        <div className="absolute inset-0 bg-black/20 z-10"></div>
                        <Image
                            src={slide.image}
                            alt={`Hero image ${slide.id}`}
                            width={1920}
                            height={1080}
                            className={cn(
                                "w-full h-full object-cover",
                                "transition-opacity duration-500"
                            )}
                            priority={index === 0}
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="text-center text-white animate-fade-in-up px-4">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                                    Welcome to Intra Asia
                                </h2>
                                <p className="text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
                                    Connecting Asia with innovative solutions
                                </p>
                            </div>
                        </div>
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
