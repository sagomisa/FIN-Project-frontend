import React from "react";
import HeaderHero from "../../components/header/HeaderHero.js";
import HeroCarousel from "../../components/hero_carousel/HeroCarousel.js";
import HomeContentSection from "../../components/home_contents/HomeContentSection.js";
import Contact from "../contact/Contact.js";

const Home = () => {
  return (
    <>
      {/* <HeroCarousel /> */}
      <HeaderHero />
      <HomeContentSection />
    </>
  );
};

export default Home;
