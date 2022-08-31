// React
import React from 'react';
import { Whatsapp as WhatsappIcon } from 'react-bootstrap-icons';
import { Home1IMG, Home2IMG } from '../../../../assets/images';

// Utils
import { apiWhatsappLink } from '../../../../utils/data';

// CSS
import './index.css';

const Contact = () => {
    return (
        <section id="contact" style={{ background: "url('/assets/images/residence-bg.png') no-repeat", backgroundSize: 'cover' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-6 mb-5">
                        <img src={Home1IMG} alt="home-1-img" className="img-fluid" />
                    </div>
                    <div className="col-lg-3 col-6 mb-5">
                        <img src={Home2IMG} alt="home-2-img" className="img-fluid" />
                    </div>
                    <div className="col-lg-6 d-flex flex-column justify-content-center align-items-start">
                        <h2 className="heading">
                            We Help People To
                            <br />
                            Find Homes
                        </h2>
                        <p className="mb-4">
                            Mauris orci donec blandit maecenas. Orci lorem purus porttitor massa consectetur. Neque, vestibulum sed varius magna et at. Eu, adipiscing morbi augue justo. Nibh laoreet
                            volutpat quis velit. Blandit aliquam donec sed morbi congue eget lorem viverra porta id lobortis.
                        </p>
                        <a href="https://wa.me/message/BPOLGRDUPQKWG1" className="btn btn-lg btn-primary shadow-sm d-none d-lg-inline-block" target="_blank" rel="noreferrer">
                            <WhatsappIcon />
                            <span className="mx-2">Get In Touch</span>
                        </a>
                        <a href="https://wa.me/message/BPOLGRDUPQKWG1" className="btn btn-primary shadow-sm d-lg-none" target="_blank" rel="noreferrer">
                            <WhatsappIcon />
                            <span className="mx-2">Get In Touch</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
