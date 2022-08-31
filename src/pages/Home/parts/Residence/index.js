// React
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid3x3Gap as Grid3x3GapIcon } from 'react-bootstrap-icons';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Components
import ResidenceCard from '../../../../components/ResidenceCard';
import Fancybox from '../../../../components/Fancybox';

// CSS
import 'swiper/css';
import 'swiper/css/navigation';
import './index.css';

const Residence = ({ data }) => {
    const [slidesPerView, setSlidesPerView] = useState('');

    const changeSlidesPerView = () => {
        if (window.innerWidth <= 576) {
            setSlidesPerView(1);
        } else if (window.innerWidth > 576 && window.innerWidth < 768) {
            setSlidesPerView(2);
        } else if (window.innerWidth >= 768) {
            setSlidesPerView(3);
        }
    };

    useEffect(() => {
        changeSlidesPerView();
        window.addEventListener('resize', changeSlidesPerView);
    }, []);

    return (
        <section className="my-5" id="residence" style={{ background: "url('/assets/images/residence-bg.png') no-repeat", backgroundSize: 'cover' }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="heading">Popular Residence</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 mb-4">
                        <Fancybox options={{ infinite: false }}>
                            <Swiper modules={[Navigation]} spaceBetween={30} slidesPerView={slidesPerView} navigation>
                                {data.map((residence, index) => (
                                    <SwiperSlide key={index}>
                                        <ResidenceCard residence={residence} isFancybox fancyboxData="residence-1" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Fancybox>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <Link to="/properties" className="btn btn-lg btn-primary shadow-sm d-none d-lg-inline-block">
                            <Grid3x3GapIcon />
                            <span className="mx-2">View All Properties</span>
                        </Link>
                        <Link to="/properties" className="btn btn-primary shadow-sm d-lg-none">
                            <Grid3x3GapIcon />
                            <span className="mx-2">View All Properties</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Residence;
