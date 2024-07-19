import { Link } from "react-router-dom";
import "./landing.css";
import Greece from "/greece.jpg";

const LandingPage = () => {
  return (
    <div className="landing-container bg-white">
      <div className="hero-section py-20 px-20 md:px-20 flex flex-col md:flex-row items-center justify-center">
        <div className="hero-content text-center md:text-left mb-10 md:mb-0 md:mr-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to TravelMore
          </h1>
          <p className="text-2xl text-gray-900 mb-6">
            Discover your next adventure with us
          </p>
          <Link
            to="/search"
            className="cta-button bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Explore Now
          </Link>
        </div>
        <div className="hero-images flex justify-center md:justify-end mt-10 md:mt-0 space-x-6">
          <img
            src={Greece}
            alt="Vacation 1"
            className="hero-image rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
          />
        </div>
      </div>

      <div className="content-section text-center py-16 px-4 md:px-20">
        <h2 className="text-3xl font-bold mb-4">Why TravelMore?</h2>
        <p className="text-lg text-gray-800 mb-8">
          At TravelMore, we believe that travel enriches the soul and broadens
          the mind. Whether you're looking for an exotic beach getaway, a
          cultural city experience, or an adventurous mountain trek, we have
          something for everyone. Join us in exploring the world's most amazing
          destinations!
        </p>
        <Link
          to="/search"
          className="cta-button bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
