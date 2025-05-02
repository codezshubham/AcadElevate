import React from "react";
import Slider from "react-slick";
import univ1 from "../../../Asset/IITKanpurlogo.jpg";
import univ2 from "../../../Asset/Amity.png";
import univ3 from "../../../Asset/Jigyasa_University.png";
import univ4 from "../../../Asset/univer.png";
import univ5 from "../../../Asset/standford.png";

const logos = [univ1, univ2, univ3, univ4, univ5];

const UniversityLogos = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: false,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <section className="bg-gray-950 py-14 px-6" id="universities" data-aos="zoom-in-right">
      <h2 className="text-center sm:text-4xl font-bold pb-10 text-4xl md:text-5xl bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Trusted By Top Universities
      </h2>
      <div className="max-w-6xl mx-auto ml-8 sm:ml-20 pt-6">
        <Slider {...settings}>
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex justify-center items-center h-32"
            >
              <img
                src={logo}
                alt={`University ${index + 1}`}
                className="h-20 sm:h-24 object-contain transition duration-500 ease-in-out hover:scale-105 opacity-80 hover:opacity-100"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default UniversityLogos;