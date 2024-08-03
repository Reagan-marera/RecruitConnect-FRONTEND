import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState({ name: "", title: "", quote: "", rating: 0 });

  useEffect(() => {
    fetch("http://127.0.0.1:5000/feedback/")
      .then((response) => response.json())
      .then((data) => setTestimonials(data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({ ...newReview, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/feedback/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}` // Ensure JWT is sent in the request
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        setTestimonials([...testimonials, data]);
        setNewReview({ name: "", title: "", quote: "", rating: 0 });
      })
      .catch((error) => console.error("Error posting review:", error));
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
                    <p className="card-para">"{testimonial.content}"</p>
                    <h4 className="card-title">{testimonial.name}</h4>
                    <p className="card-para">{testimonial.title}</p>
                    <div className="card-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i}>&#9733;</span>
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <span key={i}>&#9734;</span>
                      ))}
                    </div>
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
              className={`indicator-dot ${index === currentIndex ? "active" : ""}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
        <form onSubmit={handleSubmit} className="testimonial-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newReview.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newReview.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="quote"
            placeholder="Quote"
            value={newReview.quote}
            onChange={handleInputChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="Rating (1-5)"
            value={newReview.rating}
            onChange={handleInputChange}
            min="1"
            max="5"
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </section>
  );
};

export default Testimonials;
