import React from 'react';
import { FaStar } from 'react-icons/fa'; // Import star icon for ratings

const testimonials = [
    {
        id: 1,
        name: 'Alice Johnson',
        profileImage: 'https://via.placeholder.com/80', // Replace with actual image URL
        rating: 5,
        review: 'This is the best shopping experience I have ever had. The product quality is outstanding and the delivery was prompt.',
    },
    {
        id: 2,
        name: 'Bob Smith',
        profileImage: 'https://via.placeholder.com/80', // Replace with actual image URL
        rating: 4,
        review: 'Great products and customer service. I had a minor issue with my order, but it was resolved quickly.',
    },
    {
        id: 3,
        name: 'Charlie Brown',
        profileImage: 'https://via.placeholder.com/80', // Replace with actual image URL
        rating: 4,
        review: 'Good quality and fast shipping. The website is easy to navigate and the checkout process was smooth.',
    },
];

const Testimonial = () => {
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">What Our Customers Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="border rounded-lg p-4 shadow-lg bg-white">
                        <div className="flex items-center mb-4">
                            <img
                                src={testimonial.profileImage}
                                alt={testimonial.name}
                                className="w-16 h-16 rounded-full object-cover mr-4"
                            />
                            <div>
                                <h3 className="text-xl font-semibold">{testimonial.name}</h3>
                                <div className="flex text-yellow-500">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <FaStar key={index} className={index < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-700">{testimonial.review}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
