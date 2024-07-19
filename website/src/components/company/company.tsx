import React from 'react';
import './company.css';

const AboutPage = () => {
    return (
        <div className="about-container">
            <div className="company-section py-20 px-4 md:px-20">
                <h1 className="text-5xl font-bold text-gray-900 mb-8">About TravelMore</h1>
                <p className="text-lg text-gray-800 mb-8">
                    TravelMore is dedicated to inspiring and enabling people to travel and explore the world's wonders. 
                    We believe that travel enriches lives, broadens perspectives, and creates unforgettable experiences.
                    Our mission is to make travel accessible, enjoyable, and transformative for everyone.
                </p>
            </div>
            <div className="founder-section py-20 px-4 md:px-20">
                <h2 className="text-3xl font-bold mb-4">About the Founder</h2>
                <div className="founder-content">
                    <img src="picture.jpg" alt="Founder" className="founder-image rounded-full shadow-lg mb-6" />
                    <p className="text-lg text-gray-800">
                        Aaron Trelstad is a Computer Science and Mathematics major at Iowa State Univeristy
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;
