// React
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArchiveFill, ArrowLeft as ArrowLeftIcon, Bag as BagIcon, Cart as CartIcon, DisplayportFill, PlusSquareDotted } from 'react-bootstrap-icons';
import { Swiper, SwiperSlide } from 'swiper/react';

// Layouts
import BaseLayout from '../../../layouts/BaseLayout';

// Components
import ReviewBody from '../../../components/ReviewBody';
import Fancybox from '../../../components/Fancybox';

// Utils
import { apiWhatsappLink } from '../../../utils/data';

// Assets
import { Residence1IMG, Residence2IMG, Residence3IMG } from '../../../assets/images';

// CSS
import 'swiper/css';
import './index.css';

const Property = () => {
    const navigate = useNavigate();

    const handleAddToCart = () => {
        navigate('/carts');
    };

    return (
        <BaseLayout title="Property">
            <section id="property">
                <div className="container">
                    <div className="row mb-4">
                        <div className="col-12">
                            <Link to="/properties" className="btn btn-outline-primary">
                                <ArrowLeftIcon />
                                <span className="mx-2">Back to Properties</span>
                            </Link>
                        </div>
                    </div>
                    <div className="row">
                        <Fancybox options={{ infinite: false }}>
                            <div className="residence-thumbnail col-lg-6">
                                <img className="img-fluid" src={Residence1IMG} alt="residence" data-fancybox="residence-thumb" data-src={Residence1IMG} />
                                <div className="residence-thumbs">
                                    <Swiper spaceBetween={10} slidesPerView={3}>
                                        <SwiperSlide>
                                            <img className="img-fluid" src={Residence1IMG} alt="residence" data-fancybox="residence-thumb" data-src={Residence1IMG} />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-fluid" src={Residence2IMG} alt="residence" data-fancybox="residence-thumb" data-src={Residence2IMG} />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-fluid" src={Residence3IMG} alt="residence" data-fancybox="residence-thumb" data-src={Residence3IMG} />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-fluid" src={Residence1IMG} alt="residence" data-fancybox="residence-thumb" data-src={Residence1IMG} />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-fluid" src={Residence2IMG} alt="residence" data-fancybox="residence-thumb" data-src={Residence2IMG} />
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <img className="img-fluid" src={Residence3IMG} alt="residence" data-fancybox="residence-thumb" data-src={Residence3IMG} />
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                        </Fancybox>
                        <div className="col-lg-6 mt-5 pt-3 mt-lg-0">
                            <div className="card card-user">
                                <div className="card-body card-user">
                                    <h5 className="card-title card-user">Aliva Priva Jalvin</h5>
                                    <h6 className="card-subtitle card-user">1087 Pin Oak Drive, Clinton, USA</h6>
                                    <div className="d-flex mt-4" style={{ flexWrap: 'wrap', columnGap: '1.5rem', rowGap: '0.4rem' }}>
                                        <div className="bed-icon">
                                            <DisplayportFill />
                                            <span className="ml-2">4 Beds</span>
                                        </div>
                                        <div className="bath-icon">
                                            <ArchiveFill />
                                            <span className="ml-2">2 Bath</span>
                                        </div>
                                        <div className="square-icon">
                                            <PlusSquareDotted />
                                            <span className="ml-2">1203 m2</span>
                                        </div>
                                    </div>
                                    <div className="d-flex my-4" style={{ flexWrap: 'wrap', gap: '1rem' }}>
                                        <button className="btn btn-outline-primary" onClick={handleAddToCart}>
                                            <CartIcon />
                                            <span className="mx-2">Add to Cart</span>
                                        </button>
                                        <a href={apiWhatsappLink} className="btn btn-primary" target="_blank" rel="noreferrer">
                                            <BagIcon />
                                            <span className="mx-2">Buy Now</span>
                                        </a>
                                    </div>
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3 mt-lg-5 pt-lg-5">
                        <div className="col-md-8 col-12">
                            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item mb-2" role="presentation">
                                    <button
                                        className="nav-link active"
                                        id="pills-description-tab"
                                        data-toggle="pill"
                                        data-target="#pills-description"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-description"
                                        aria-selected="true"
                                    >
                                        Description
                                    </button>
                                </li>
                                <li className="nav-item ml-2" role="presentation">
                                    <button
                                        className="nav-link"
                                        id="pills-reviews-tab"
                                        data-toggle="pill"
                                        data-target="#pills-reviews"
                                        type="button"
                                        role="tab"
                                        aria-controls="pills-reviews"
                                        aria-selected="false"
                                    >
                                        Reviews
                                    </button>
                                </li>
                            </ul>
                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-description" role="tabpanel" aria-labelledby="pills-description-tab">
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In laboriosam tempora assumenda, dolor rerum ad magnam voluptatibus incidunt iusto, omnis amet enim sed
                                        porro itaque autem obcaecati necessitatibus minus fuga.
                                    </p>
                                </div>
                                <div className="tab-pane fade" id="pills-reviews" role="tabpanel" aria-labelledby="pills-reviews-tab">
                                    <ReviewBody
                                        name="Muhammad Zachrie Kurniawan"
                                        username="zachriek"
                                        image="https://avatars.githubusercontent.com/u/82297739?v=4"
                                        body="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos dicta molestiae inventore temporibus minus fugiat! Odit dolore nihil obcaecati eaque rem repellendus labore, magnam nobis eius repudiandae placeat culpa aut."
                                    />
                                    <ReviewBody
                                        name="Muhammad Zachrie Kurniawan"
                                        username="zachriek"
                                        image="https://avatars.githubusercontent.com/u/82297739?v=4"
                                        body="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos dicta molestiae inventore temporibus minus fugiat! Odit dolore nihil obcaecati eaque rem repellendus labore, magnam nobis eius repudiandae placeat culpa aut."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </BaseLayout>
    );
};

export default Property;
