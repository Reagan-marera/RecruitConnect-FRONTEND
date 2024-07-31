import React from "react";
import { useSpring, animated } from "react-spring";
import { Search, Briefcase, Users, TrendingUp } from "lucide-react";
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
  return (
    <div className="landing-page">
   

      <AnimatedSection>
        <section className="hero">
          <div className="container">
            <h1>Find Your Dream Job with RecruitConnect</h1>
            <p>Connecting talented professionals with amazing opportunities</p>
            <div className="cta-buttons">
              <button className="btn btn-primary">Find Jobs</button>
              <button className="btn btn-secondary">Post a Job</button>
            </div>
          </div>
        </section>
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
