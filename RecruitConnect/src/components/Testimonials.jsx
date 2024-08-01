import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../Testimonials.css";

const testimonials = [
  {
    quote: "RecruitConnect helped me find my dream job in no time!",
    name: "John Doe",
    title: "Software Engineer",
  },
  {
    quote: "The platform is user-friendly and very effective.",
    name: "Jane Smith",
    title: "HR Manager",
  },
  {
    quote: "I've never had such a smooth job search experience before.",
    name: "Mike Johnson",
    title: "Marketing Specialist",
  },
  {
    quote: "RecruitConnect made hiring top talent a breeze for our startup.",
    name: "Sarah Lee",
    title: "CEO, TechStart Inc.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <h2 className="testimonial-heading">What Our Users Say</h2>
        <div className="testimonial-wrapper">
          <button
            onClick={prevTestimonial}
            className="testimonial-nav-button testimonial-nav-button-left"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="testimonial">
            <div
              className="testimonial-slider"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card">
                  <div className="card-content">
                    <p className="card-para">"{testimonial.quote}"</p>
                    <h4 className="card-title">{testimonial.name}</h4>
                    <p className="card-para">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={nextTestimonial}
            className="testimonial-nav-button testimonial-nav-button-right"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        <div className="testimonial-indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`indicator-dot ${
                index === currentIndex ? "active" : ""
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;