import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState({
    name: "",
    title: "",
    quote: "",
    rating: 0
  });
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission

  useEffect(() => {
    fetch("http://127.0.0.1:5000/feedback")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setTestimonials(data))
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
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
    fetch("http://127.0.0.1:5000/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setTestimonials([...testimonials, data]);
        setNewReview({ name: "", title: "", quote: "", rating: 0 });
        setFormSubmitted(true); // Set form submission state to true
        setShowForm(false); // Hide the form after submission
      })
      .catch((error) => console.error("Error posting review:", error));
  };

  const handleToggleForm = () => {
    if (formSubmitted) {
      // If the form was submitted, reset the form and show it again
      setFormSubmitted(false);
      setNewReview({ name: "", title: "", quote: "", rating: 0 });
    }
    setShowForm((prev) => !prev);
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <h2 className="testimonial-heading">What Our Users Say</h2>
        {testimonials.length > 0 ? (
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
                      <h4 className="card-title">{testimonial.reviewer_name}</h4>
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
          </div>
        ) : (
          <p>No testimonials available.</p>
        )}
        <button
          onClick={handleToggleForm}
          className="toggle-form-button"
          aria-label={showForm ? "Cancel" : formSubmitted ? "Share Another Review" : "Share My Own Feedback"}
        >
          {showForm ? "Cancel" : formSubmitted ? "Share Another Review" : "Share My Own Feedback"}
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className="testimonial-form">
            <h3>Share Your Feedback</h3>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newReview.name}
              onChange={handleInputChange}
              required
              aria-label="Reviewer name"
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={newReview.title}
              onChange={handleInputChange}
              required
              aria-label="Review title"
            />
            <textarea
              name="quote"
              placeholder="Quote"
              value={newReview.quote}
              onChange={handleInputChange}
              required
              aria-label="Review quote"
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
              aria-label="Rating (1-5)"
            />
            <button type="submit">Submit Review</button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="cancel-button"
              aria-label="Cancel"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
