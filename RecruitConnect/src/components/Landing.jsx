import React from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import { Search, Briefcase, Users, TrendingUp } from "lucide-react";
import Testimonials from "./Testimonials";
import "../Landing.css";

const AnimatedSection = ({ children }) => {
  const props = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
  });
  return <animated.div style={props}>{children}</animated.div>;
};

const Landing = () => {
  const navigate = useNavigate();

  const handleFindJobsClick = () => {
    navigate('/joblist');
  };

  return (
    <div className="landing-page">
      <AnimatedSection>
        <section className="hero">
          <div className="container">
            <h1>Find Your Dream Job with RecruitConnect</h1>
            <p>Connecting talented professionals with amazing opportunities</p>
          
            <div className="cta-buttons">
              <button className="btn btn-primary" onClick={handleFindJobsClick}>Find Jobs</button>
              <button className="btn btn-secondary">Post a Job</button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="features">
          <div className="container">
            <h2>Why RecruitConnect?</h2>
            <div className="feature-grid">
              <div className="feature-item">
                <Briefcase size={48} />
                <h3>Job Matching</h3>
                <p>Find jobs that match your skills and preferences.</p>
              </div>
              <div className="feature-item">
                <Users size={48} />
                <h3>Application Tracking</h3>
                <p>Keep track of your applications and get updates.</p>
              </div>
              <div className="feature-item">
                <Search size={48} />
                <h3>Resume Building</h3>
                <p>Upload your resume effortlessly.</p>
              </div>
              <div className="feature-item">
                <TrendingUp size={48} />
                <h3>Career Growth</h3>
                <p>Access resources to grow and advance your career.</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="mission-section">
          <div className="container">
            <h2>Our Mission</h2>
            <p>
              At RecruitConnect, our mission is to bridge the gap between job
              seekers and employers, providing a seamless and efficient platform
              for job matching and career growth. We strive to empower
              individuals to find their dream jobs and help companies find the
              best talent.
            </p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="awards">
          <div className="container">
            <h2>Our Awards</h2>
            <div className="awards-content">
              <div className="award">
                <img
                  src="https://images.pexels.com/photos/7005047/pexels-photo-7005047.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Award 1"
                />
                <p>Best Recruitment Platform 2023</p>
              </div>
              <div className="award">
                <img
                  src="https://images.pexels.com/photos/6532362/pexels-photo-6532362.jpeg?auto=compress&cs=tinysrgb&w=300"
                  alt="Award 2"
                />
                <p>Top Innovator in HR Tech 2022</p>
              </div>

              <div className="award">
                <img
                  src="https://t3.ftcdn.net/jpg/08/36/28/32/240_F_836283220_q2tQY2qLf3xq9ldERPnhtLeyM3e51iur.jpg"
                  alt="Award 3"
                />
                <p>Top Innovator in HR Tech 2023</p>
              </div>

            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="top-companies">
          <div className="container">
            <h2>Top Companies We've Worked With</h2>
            <div className="companies-content">
              <div className="company">
                <img
                  src="https://t3.ftcdn.net/jpg/03/99/04/82/240_F_399048295_bQCz5V7M2QZVnuv07lwHuMiQsR4X6o7X.jpg"
                  alt="Company 1"
                />
              </div>
              <div className="company">
                <img
                  src="https://t3.ftcdn.net/jpg/05/48/51/50/240_F_548515067_ds7TtH2FI2fNVE9MCWkgNHJhDMWBrVmL.jpg"
                  alt="Company 2"
                />
              </div>

              <div className="company">
                <img
                  src="https://t3.ftcdn.net/jpg/02/95/55/04/240_F_295550479_L7LYPxN9NYgCDjEXCDYREkbXTaFKrBb2.jpg"
                  alt="Company 3"
                />
              </div>
              <div className="company">
                <img
                  src="https://t3.ftcdn.net/jpg/02/97/73/28/240_F_297732896_pbAY87SnXyhhhgIOavV2PolvM7LUJ5ey.jpg"
                  alt="Company 4"
                />
              </div>
        
            </div>
          </div>
        </section>
      </AnimatedSection>
      <AnimatedSection>
        <Testimonials/>
      </AnimatedSection>
      <AnimatedSection>
        <section className="stats">
          <div className="container">
            <div className="stat-grid">
              <div className="stat-item">
                <Search size={48} />
                <h3>10,000+</h3>
                <p>Job Listings</p>
              </div>
              <div className="stat-item">
                <Briefcase size={48} />
                <h3>5,000+</h3>
                <p>Companies</p>
              </div>
              <div className="stat-item">
                <Users size={48} />
                <h3>1M+</h3>
                <p>Job Seekers</p>
              </div>
              <div className="stat-item">
                <TrendingUp size={48} />
                <h3>500K+</h3>
                <p>Placements</p>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

export default Landing;




