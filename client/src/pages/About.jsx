import React from 'react';
import { FaGlobe, FaLeaf, FaUsers } from 'react-icons/fa'; // Importing some icons
import AboutMission from '../../public/assests/About/mission.png';
const About = () => {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto py-16 px-6 lg:px-12">
                
                {/* Our Story Section */}
                <section className="mb-16 text-center">
                    <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Our Story</h2>
                    <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
                        Founded in 2024, our clothing brand started with a simple idea: to make high-quality, stylish clothing accessible to everyone. From humble beginnings, we've grown into a brand that's recognized for its dedication to quality and sustainable practices.
                    </p>
                    <div className="md:flex md:items-center md:justify-center">
                        <img
                            src='https://img.freepik.com/free-photo/two-beautiful-girls-shopping-clothes-shop_1301-6701.jpg?t=st=1725369410~exp=1725373010~hmac=52248c474a3ec8902560795312ae4f3b7e9eb21a33dc4e5039b1088d94020018&w=996'
                            alt="Our Story"
                            className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 md:w-1/2"
                        />
                    </div>
                </section>

                {/* Our Mission Section */}
                <section className="mb-16 text-center bg-white py-16 rounded-lg shadow-lg">
                    <div className="flex justify-center mb-8">
                        <FaGlobe className="text-6xl text-green-500" />
                    </div>
                    <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Our Mission</h2>
                    <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
                        Our mission is to offer fashion that’s not only stylish but also ethically produced. We work closely with designers and artisans from around the world to bring unique and exclusive collections to our customers, ensuring that every piece we sell meets our high standards of quality and sustainability.
                    </p>
                    <img
                        src={AboutMission}
                        alt="Our Mission"
                        className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 mx-auto md:w-1/2"
                    />
                </section>

                {/* Meet the Team Section */}
                <section className="mb-16 text-center">
                    <h2 className="text-5xl font-extrabold text-gray-800 mb-12">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                name: "John Doe",
                                role: "Founder & CEO",
                                image: "https://img.freepik.com/free-photo/portrait-handsome-man_23-2150770959.jpg?uid=R115460107&ga=GA1.1.1632891089.1722874396&semt=ais_hybrid"
                            },
                            {
                                name: "Jane Smith",
                                role: "Head of Design",
                                image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df"
                            },
                            {
                                name: "Sarah Brown",
                                role: "Marketing Director",
                                image: "https://images.unsplash.com/photo-1504593811423-6dd665756598"
                            }
                        ].map((member, index) => (
                            <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                                <img
                                    src={member.image}
                                    alt={`Team Member - ${member.name}`}
                                    className="rounded-full shadow-xl mx-auto w-40 h-40 object-cover"
                                />
                                <h3 className="text-2xl font-semibold text-gray-800 mt-4">{member.name}</h3>
                                <p className="text-md text-gray-500">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Our Values Section */}
                <section className="text-center bg-white py-16 rounded-lg shadow-lg">
                    <div className="flex justify-center mb-8">
                        <FaLeaf className="text-6xl text-green-500" />
                    </div>
                    <h2 className="text-5xl font-extrabold text-gray-800 mb-4">Our Values</h2>
                    <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
                        We believe in sustainability, transparency, and inclusivity. Our values drive everything we do, from the way we source materials to how we interact with our customers. We are committed to making fashion that’s good for the planet and everyone on it.
                    </p>
                    <img
                        src="https://img.freepik.com/free-photo/medium-shot-girl-having-fun-outdoors_23-2150725977.jpg?t=st=1725370372~exp=1725373972~hmac=c606b3716a7a694c0a3aa990dc8f0c4884bc4e898a3f15d9ecdf8a0f7cc42bbb&w=996"
                        alt="Our Values"
                        className="rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 mx-auto md:w-1/2"
                    />
                </section>

                {/* Call to Action Section */}
                <div className="text-center mt-16">
                    <h3 className="text-3xl font-bold text-gray-800 mb-4">Join Us in Making a Difference!</h3>
                    <p className="text-lg text-gray-500 mb-8">Explore our collections and be part of our journey towards sustainable fashion.</p>
                    <a
                        href="/shop" // Change this to your shop page link
                        className="inline-block bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                    >
                        Shop Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
