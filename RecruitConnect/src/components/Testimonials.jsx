import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const getAuthToken = () => localStorage.getItem("token");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const token = getAuthToken();
        const response = await fetch("https://recruitconnect-backend-mlpw.onrender.com/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        setError(`Failed to fetch testimonials: ${error.message}`);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (rating < 1 || rating > 5 || !content) {
      setError("Please provide valid inputs.");
      return;
    }
  
    try {
      const token = getAuthToken();
      const response = await fetch("https://recruitconnect-backend-mlpw.onrender.com/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          employer_id: 1, // Replace with actual employer ID if needed
          job_id: 2, // Optional: replace with actual job ID if needed
          rating: rating,
          content: content,
        }),
      });
  
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || `Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      setTestimonials((prev) => [...prev, data.feedback]);
      setRating(0);
      setContent("");
      setFormSubmitted(true);
      setShowForm(false);
      setError("");
      setMessage("Feedback submitted successfully!");
    } catch (error) {
      setError(`Error posting feedback: ${error.message}`);
    }
  };
  
  const handleToggleForm = () => {
    if (formSubmitted) {
      setFormSubmitted(false);
      setRating(0);
      setContent("");
      setMessage("");
    }
    setShowForm((prev) => !prev);
  };

  return (
    <section className="testimonial-section">
      <div className="testimonial-container">
        <h2 className="testimonial-heading">What Our Users Say</h2>
        {error && <p className="testimonial-error-message">{error}</p>}
        {message && <p className="testimonial-success-message">{message}</p>}
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
                {testimonials.map((testimonial, index) => {
                  const validRating = Number.isInteger(testimonial.rating) && testimonial.rating >= 1 && testimonial.rating <= 5
                    ? testimonial.rating
                    : 0;

                  return (
                    <div key={index} className="card">
                      <div className="card-content">
                        <p className="card-para">{testimonial.content}</p>
                        <h4 className="card-title">{testimonial.reviewer_id}</h4>
                        <div className="card-rating">
                          {[...Array(validRating)].map((_, i) => (
                            <span key={i}>&#9733;</span>
                          ))}
                          {[...Array(5 - validRating)].map((_, i) => (
                            <span key={i}>&#9734;</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
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
          <div>
            <h2>Submit Feedback</h2>
            {error && <p className="form-error">{error}</p>}
            {message && <p className="form-success">{message}</p>}
            <form onSubmit={handleSubmit} className="testimonial-form">
              <input
                type="number"
                placeholder="Rating (1-5)"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                min="1"
                max="5"
                required
              />
              <textarea
                placeholder="Feedback"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <button type="submit">Submit Feedback</button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
