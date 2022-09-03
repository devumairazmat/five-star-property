// React
import React from "react";

// Layout
import BaseLayout from "../../layouts/BaseLayout";

// Parts
import Hero from "./parts/Hero";
import Residence from "./parts/Residence";
import Offer from "./parts/Offer";
import Contact from "./parts/Contact";
import ResidenceCard from "../../components/ResidenceCard";

// Assets
import {
  HeroIMG,
  DiamondOverlayPattern,
  Residence1IMG,
} from "../../assets/images";

// Utils
import { residencesData } from "../../utils/data";

const Home = () => {
  return (
    <BaseLayout title="Home">
      <Hero heroIMG={HeroIMG} overlayIMG={DiamondOverlayPattern} />
      <Residence data={residencesData} />
      <Offer />
      <ResidenceCard
        residence={{
          id: 1,
          image: Residence1IMG,
          name: "Aliva Priva Jalvin",
          location: "1087 Pin Oak Drive, Clinton, USA",
          bed: 4,
          bath: 2,
          size: 1203,
        }}
      />
      <Contact />
    </BaseLayout>
  );
};

export default Home;
