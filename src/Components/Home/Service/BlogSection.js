import React, { useState, useEffect } from "react";
import blogImg1 from "../../../Asset/AcadElevate2.jpg";
import blogImg2 from "../../../Asset/AcadElevate3.jpg";
import blogImg3 from "../../../Asset/AcadElevate4.jpg";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or use any icon you prefer

const blogs = [
  {
    title: "Maximizing Research Visibility",
    shortDesc: "Learn how to boost your academic reach...",
    fullDesc: "Learn how to boost your academic reach through smart publication tracking, search engine optimization for scholarly platforms, and active research collaboration. Discover tools to amplify your visibility in the academic world.",
    image: blogImg1,
  },
  {
    title: "Simplifying Appraisals for Faculty",
    shortDesc: "How automation helps streamline tedious...",
    fullDesc: "How automation helps streamline tedious appraisal submissions and improves accuracy, making faculty evaluations stress-free and insightful. Explore how digital workflows replace paperwork with efficiency.",
    image: blogImg2,
  },
  {
    title: "Going Paperless in Higher Ed",
    shortDesc: "Explore the shift toward paperless campuses...",
    fullDesc: "Explore the shift toward paperless campuses and its impact on sustainability, digital literacy, and smoother academic operations. Embrace the future of smart, eco-friendly education systems.",
    image: blogImg3,
  },
  {
    title: "Enhancing Digital Collaboration",
    shortDesc: "Discover how collaboration tools reshaping...",
    fullDesc: "Discover how collaboration tools are reshaping academia by enabling remote teamwork, boosting productivity, and streamlining communication between faculty and students.",
    image: blogImg1,
  },
  {
    title: "Data-Driven Education",
    shortDesc: "Harnessing analytics for better teaching...",
    fullDesc: "Harnessing analytics for better teaching strategies and institutional improvements. Learn how to leverage data to drive meaningful changes in academic performance.",
    image: blogImg2,
  },
  {
    title: "Sustainable University Practices",
    shortDesc: "Green tech & policies for smarter campuses...",
    fullDesc: "Explore how sustainable policies, renewable energy, and tech integration are turning universities into eco-leaders for future generations.",
    image: blogImg3,
  },
];

export default function BlogSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // Adjust number of visible items based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) setItemsPerPage(1); // mobile
      else if (width < 1024) setItemsPerPage(2); // tablet
      else setItemsPerPage(3); // desktop
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const handleToggle = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + itemsPerPage < blogs.length)
      setStartIndex(startIndex + 1);
  };

  const visibleBlogs = blogs.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section id="blog" className="bg-gray-950 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl font-bold pb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Insights & Articles
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          Stay informed with the latest in academia, faculty development, and educational tech.
        </p>

        <div className="relative" data-aos="flip-up" data-aos-duration="1000">
          {/* Left Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100 disabled:opacity-30"
            disabled={startIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleBlogs.map((blog, index) => {
              const actualIndex = startIndex + index;
              return (
                <div
                  key={actualIndex}
                  className="bg-transparent rounded-xl shadow-md hover:shadow-emerald-700 hover:shadow-xl transition-all duration-300 border-2 border-sky-600"
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-6 text-left">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {expandedIndex === actualIndex
                        ? blog.fullDesc
                        : blog.shortDesc}
                    </p>
                    <button
                      onClick={() => handleToggle(actualIndex)}
                      className="bg-[#d92152] px-6 sm:px-8 py-3 hover:bg-transparent transition
                                text-white border-2 border-[#d92152] hover:text-[#d92152] focus:ring-4 focus:outline-none focus:ring-[#d92152] font-medium 
                                rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
                    >
                      {expandedIndex === actualIndex
                        ? "Show Less ↑"
                        : "Read More →"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Navigation */}
          <button
            onClick={handleNext}
            className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 bg-white border rounded-full p-2 shadow hover:bg-gray-100 disabled:opacity-30"
            disabled={startIndex + itemsPerPage >= blogs.length}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}