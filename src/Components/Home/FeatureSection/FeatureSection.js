import { FaSearch, FaCalendarAlt, FaClipboardCheck, FaChalkboardTeacher, FaUserShield, FaLeaf } from "react-icons/fa";

const features = [
  {
    title: "Research Publication Tracker",
    description: "Easily upload, track, and manage faculty research publications with auto-status updates.",
    icon: <FaSearch className="text-3xl text-blue-500" />,
  },
  {
    title: "Event & Seminar Logs",
    description: "Log and validate participation in academic events, seminars, and workshops with proof.",
    icon: <FaCalendarAlt className="text-3xl text-purple-500" />,
  },
  {
    title: "Self-Appraisal Automation",
    description: "Auto-generate appraisal forms based on recorded activities—ready for download or admin review.",
    icon: <FaClipboardCheck className="text-3xl text-green-500" />,
  },
  {
    title: "Lecture & Project Management",
    description: "Maintain records of guest lectures and ongoing academic projects all in one dashboard.",
    icon: <FaChalkboardTeacher className="text-3xl text-yellow-500" />,
  },
  {
    title: "Secure Faculty Profiles",
    description: "JWT-secured individual dashboards with role-based access for both faculty and admin.",
    icon: <FaUserShield className="text-3xl text-teal-500" />,
  },
  {
    title: "Paperless & Eco-Friendly",
    description: "Completely digital, supporting India’s paperless mission with cloud storage and digital submissions.",
    icon: <FaLeaf className="text-3xl text-lime-500" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="bg-gray-950 py-20" id="features">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Powerful Features at a Glance
        </h2>
        <p className="text-gray-400 text-lg mb-12">
          AcadElevate streamlines academic workflows for faculty and institutions.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10" data-aos="zoom-in-up">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-transparent rounded-2xl p-6 text-left flex flex-col gap-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-800 border-2 border-sky-600"
            >
              <div>{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
