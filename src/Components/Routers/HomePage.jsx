import React from 'react'
import HeroSection1 from '../Home/HeroSection/HeroSection1';
import Navbar from '../Home/Navbar/Navbar'
import CTASection from '../Home/HeroSection/CTASection';
import AboutSection from '../Home/HeroSection/AboutSection';
import TestimonialSection from '../Home/Testimonial/TestimonialSection'
import BlogSection from '../Home/Service/BlogSection'
import TrialSection from '../Home/Service/TrialSection2'
import FeatureSection from '../Home/FeatureSection/FeatureSection'
import Footer from '../Home/Footer/Footer'
import UniversityLogos from '../Home/Service/UniversityLogos';

const HomePage = () => {
  return (
    <div>
      <Navbar/> 
      <HeroSection1/>
      <CTASection/>
      <FeatureSection/>
      <BlogSection/>
      <TestimonialSection/>
      <TrialSection/>
      <AboutSection/>
      <UniversityLogos/>
      <Footer/>
    </div>
  )
}

export default HomePage
