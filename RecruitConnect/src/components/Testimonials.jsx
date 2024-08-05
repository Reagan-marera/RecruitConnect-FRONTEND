import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ThumbsUp, ThumbsDown } from "lucide-react";
import "../Testimonials.css";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newReview, setNewReview] = useState({
    yourName: "",
    currentOccupation: "",
    feedback: "",
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

  const handleStarClick = (rating) => {
    setNewReview({ ...newReview, rating });
  };

  const handleLike = (id) => {
    fetch(`http://127.0.0.1:5000/feedback/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((updatedTestimonial) => {
        setTestimonials(testimonials.map(t =>
          t.id === id ? updatedTestimonial : t
        ));
      })
      .catch((error) => console.error("Error liking review:", error));
  };

  const handleDislike = (id) => {
    fetch(`http://127.0.0.1:5000/feedback/${id}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((updatedTestimonial) => {
        setTestimonials(testimonials.map(t =>
          t.id === id ? updatedTestimonial : t
        ));
      })
      .catch((error) => console.error("Error disliking review:", error));
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
        setNewReview({ yourName: "", currentOccupation: "", feedback: "", rating: 0 });
        setFormSubmitted(true); // Set form submission state to true
        setShowForm(false); // Hide the form after submission
      })
      .catch((error) => console.error("Error posting review:", error));
  };

  const handleToggleForm = () => {
    if (formSubmitted) {
      // If the form was submitted, reset the form and show it again
      setFormSubmitted(false);
      setNewReview({ yourName: "", currentOccupation: "", feedback: "", rating: 0 });
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
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="card">
                    <div className="card-content">
                      <p className="card-para">"{testimonial.feedback}"</p>
                      <h4 className="card-title">{testimonial.yourName}</h4>
                      <p className="card-para">{testimonial.currentOccupation}</p>
                      <div className="card-rating">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`star ${i < testimonial.rating ? "filled" : ""}`}>&#9733;</span>
                        ))}
                      </div>
                      <div className="like-dislike-buttons">
                        <button
                          onClick={() => handleLike(testimonial.id)}
                          className={`like-button ${testimonial.userLiked ? "active" : ""}`}
                          aria-label="Like this review"
                          disabled={testimonial.userLiked || testimonial.userDisliked}
                        >
                          <ThumbsUp size={24} />
                        </button>
                        <button
                          onClick={() => handleDislike(testimonial.id)}
                          className={`dislike-button ${testimonial.userDisliked ? "active" : ""}`}
                          aria-label="Dislike this review"
                          disabled={testimonial.userDisliked || testimonial.userLiked}
                        >
                          <ThumbsDown size={24} />
                        </button>
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
          <p className="no-testimonials">No testimonials available.</p>
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
              name="yourName"
              placeholder="Your Name"
              value={newReview.yourName}
              onChange={handleInputChange}
              required
              aria-label="Your name"
            />
            <input
              type="text"
              name="currentOccupation"
              placeholder="Your Current Occupation"
              value={newReview.currentOccupation}
              onChange={handleInputChange}
              required
              aria-label="Your current occupation"
            />
            <textarea
              name="feedback"
              placeholder="Your Feedback"
              value={newReview.feedback}
              onChange={handleInputChange}
              required
              aria-label="Your feedback"
            />
            <div className="rating-container">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < newReview.rating ? "filled" : ""}`}
                  onClick={() => handleStarClick(i + 1)}
                  aria-label={`Rate ${i + 1} star${i > 0 ? 's' : ''}`}
                >
                  &#9733;
                </span>
              ))}
            </div>
            <button type="submit">Submit Review</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
