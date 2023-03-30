import { Data } from '@/types';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import styled from 'styled-components';
import 'swiper/css';
import { Key } from 'react';

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    overflow: hidden;

    .swiper {
        .swiper-slide {
            height: 100vh;

            img {
                object-fit: cover;
            }
        }
    }
`;

const Carousel = ({ item }: { item: Data }) => {
    return (
        <Container>
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
                allowTouchMove
                loop={true}
            >
                {item.imagesCollection.items?.map(
                    (img: { fileName: string; url: string }) => (
                        <SwiperSlide key={img.fileName}>
                            <Image
                                src={img.url ?? ''}
                                alt={img.fileName ?? ''}
                                fill
                            />
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </Container>
    );
};

export default Carousel;
