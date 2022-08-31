// React
import React from 'react';

// Layout
import BaseLayout from '../../layouts/BaseLayout';

// Parts
import Hero from './parts/Hero';
import Residence from './parts/Residence';
import Offer from './parts/Offer';
import Contact from './parts/Contact';

// Assets
import { HeroIMG, DiamondOverlayPattern } from '../../assets/images';

// Utils
import { residencesData } from '../../utils/data';

const Home = () => {
    return (
        <BaseLayout title="Home">
            <Hero heroIMG={HeroIMG} overlayIMG={DiamondOverlayPattern} />
            <Residence data={residencesData} />
            <Offer />
            <Contact />
        </BaseLayout>
    );
};

export default Home;
