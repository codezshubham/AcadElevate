import Slider from "react-slick";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import testimonials from "./TestimonialData";

export default function TestimonialCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="bg-gray-950 flex flex-col justify-center items-center p-4 custom-dots">
      <h1 className="text-6xl font-bold text-center pb-14 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
        Faculty Feedback
      </h1>
      <div className="max-w-6xl w-full" data-aos="fade-up-left">
        <Slider {...settings}>
          {testimonials.map((testimonial, i) => (
            <div key={i}>
              <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
                {/* Image Section */}
                <div className="md:w-1/3 w-full flex justify-center items-center bg-gray-800">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover transition-opacity duration-500 rounded-lg"
                  />
                </div>

                {/* Text Section */}
                <div className="md:w-2/3 w-full p-8 text-white flex flex-col justify-center">
                  <FaQuoteLeft className="text-4xl opacity-30 mb-4" />
                  <p className="text-lg font-semibold italic">{testimonial.quote}</p>
                  <FaQuoteRight className="text-4xl opacity-30 mt-4 self-end" />

                  <div className="mt-6 text-center md:text-left">
                    <p className="font-bold text-xl">{testimonial.name}</p>
                    <p className="text-sm opacity-70">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
