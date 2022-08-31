// React
import React from 'react';

// Assets
import { LoupeIcon, QuickIcon, TagIcon, ArrowShadePattern } from '../../../../assets/images';

// CSS
import './index.css';

const Offer = () => {
    return (
        <section id="offer">
            <img src={ArrowShadePattern} alt="arrow-shade-pattern" className="overlay-img img-fluid" />
            <div className="container">
                <div className="row mb-4">
                    <div className="col-12 text-center">
                        <h2 className="heading">Why To Choose Us</h2>
                    </div>
                </div>
                <div className="row justify-content-center text-center">
                    <div className="col-md-4 col-12 mb-5">
                        <img src={LoupeIcon} alt="loupe-icon" className="offer-icon" />
                        <h5 className="card-title card-user">Easy to find</h5>
                        <p className="card-text card-user">Urna, massa aliqua dui pellentesque. Ac, gravida in. Diam vitae, nec mattis lectus quam pretium amet facilisis.</p>
                    </div>
                    <div className="col-md-4 col-12 mb-5">
                        <img src={TagIcon} alt="tag-icon" className="offer-icon" />
                        <h5 className="card-title card-user">Affordable Prices</h5>
                        <p className="card-text card-user">Urna, massa aliqua dui pellentesque. Ac, gravida in. Diam vitae, nec mattis lectus quam pretium amet facilisis.</p>
                    </div>
                    <div className="col-md-4 col-12 mb-5">
                        <img src={QuickIcon} alt="quick-icon" className="offer-icon" />
                        <h5 className="card-title card-user">Quickly Process</h5>
                        <p className="card-text card-user">Urna, massa aliqua dui pellentesque. Ac, gravida in. Diam vitae, nec mattis lectus quam pretium amet facilisis.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Offer;
