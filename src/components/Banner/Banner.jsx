import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'animate.css';
import { useState } from "react";

import img1 from '../../assets/download.jpg'
import img2 from '../../assets/download (2).jpg'
import img3 from '../../assets/download (3).jpg'
import img4 from '../../assets/download (4).jpg'
import img5 from '../../assets/download.jpg'
import img6 from '../../assets/download5.jpg'

const Banner = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const images = [
        { src: img1, alt: 'Image 1', },
        { src: img2, alt: 'Image 2', },
        { src: img3, alt: 'Image 3', },
        { src: img4, alt: 'Image 4', },
        { src: img5, alt: 'Image 5', },
        { src: img6, alt: 'Image 6', },
    ];

    return (
        <div className="w-11/12 mx-auto py-5">
            <Swiper
                spaceBetween={50}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                navigation
                modules={[Navigation, Pagination]}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 1 },
                    1024: { slidesPerView: 1 },
                }}
                onSlideChange={(swiper) => setCurrentSlideIndex(swiper.activeIndex)}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-[100%] h-[500px]">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className={`w-full h-full object-cover rounded-lg bg-cover bg-no-repeat bg-center ${currentSlideIndex === index
                                        ? "animate__animated animate__fadeIn"
                                        : ""
                                    }`}
                            />
                            <div className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 text-white text-center rounded-lg p-4 ${currentSlideIndex === index
                                    ? "animate__animated animate__zoomIn"
                                    : ""
                                }`}>
                                <h2 className="text-3xl">{image.title}</h2>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;