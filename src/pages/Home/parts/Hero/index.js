// React
import React from 'react';

// CSS
import './index.css';

const Hero = ({ heroIMG, overlayIMG }) => {
    return (
        <section id="hero">
            <img className="overlay-img" src={overlayIMG} alt="diamond-overlay" />
            <div className="container">
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-center mb-4 mb-md-0">
                        <h1 className="title">Perfect Way To Buy And Sell A Home</h1>
                        <p className="text">Diam vitae, nec mattis lectus quam pretium amet facilisis. Urna, massa aliqua dui pellentesque. Ac, gravida in eget non amet eget purus non.</p>
                        <div className="input-group mt-4">
                            <input type="text" className="form-control" placeholder="Search here..." style={{ padding: '2rem 1.4rem' }} />
                            <div className="input-group-append">
                                <button type="button" className="btn btn-primary">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <img className="img-fluid" src={heroIMG} alt="hero-img" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
