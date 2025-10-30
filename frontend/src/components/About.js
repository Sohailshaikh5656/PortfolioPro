import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="hero-section py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 fw-bold text-primary mb-4">
                                About PortfolioPro
                            </h1>
                            <p className="lead text-muted mb-4">
                                We're on a mission to help professionals showcase their skills 
                                and talents through beautiful, modern portfolios that make 
                                lasting impressions.
                            </p>
                            <div className="hero-stats d-flex gap-4 mb-4">
                                <div className="stat-item">
                                    <h3 className="fw-bold text-primary">10K+</h3>
                                    <p className="text-muted mb-0">Portfolios Created</p>
                                </div>
                                <div className="stat-item">
                                    <h3 className="fw-bold text-primary">5K+</h3>
                                    <p className="text-muted mb-0">Happy Professionals</p>
                                </div>
                                <div className="stat-item">
                                    <h3 className="fw-bold text-primary">50+</h3>
                                    <p className="text-muted mb-0">Countries</p>
                                </div>
                            </div>
                            <Link to="/select-template" className="btn btn-primary btn-lg">
                                Create Your Portfolio
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-image text-center">
                                <div className="image-placeholder rounded-3 bg-gradient-primary text-white d-flex align-items-center justify-content-center"
                                    style={{ height: '400px' }}>
                                    <div className="text-center">
                                        <i className="bi bi-people-fill display-1 mb-3"></i>
                                        <h4>Our Community</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mission-section py-5 bg-light">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="icon-wrapper mb-3">
                                        <i className="bi bi-bullseye text-primary fs-1"></i>
                                    </div>
                                    <h3 className="h4 fw-bold text-dark mb-3">Our Mission</h3>
                                    <p className="text-muted">
                                        To empower professionals worldwide by providing them with 
                                        intuitive tools to create stunning portfolios that effectively 
                                        showcase their skills, experience, and achievements.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body p-4">
                                    <div className="icon-wrapper mb-3">
                                        <i className="bi bi-eye text-primary fs-1"></i>
                                    </div>
                                    <h3 className="h4 fw-bold text-dark mb-3">Our Vision</h3>
                                    <p className="text-muted">
                                        To become the leading platform for professional portfolio 
                                        creation, connecting talented individuals with opportunities 
                                        through compelling digital presentations of their work.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section py-5">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2 className="display-5 fw-bold text-dark mb-3">Why Choose PortfolioPro?</h2>
                            <p className="lead text-muted">We make portfolio creation simple and effective</p>
                        </div>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="feature-card text-center p-4">
                                <div className="feature-icon mb-3">
                                    <i className="bi bi-lightning-charge-fill text-primary fs-1"></i>
                                </div>
                                <h4 className="fw-bold mb-3">Easy to Use</h4>
                                <p className="text-muted">
                                    Create a professional portfolio in minutes with our 
                                    intuitive drag-and-drop builder.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card text-center p-4">
                                <div className="feature-icon mb-3">
                                    <i className="bi bi-phone-fill text-primary fs-1"></i>
                                </div>
                                <h4 className="fw-bold mb-3">Fully Responsive</h4>
                                <p className="text-muted">
                                    Your portfolio will look great on all devices - desktop, 
                                    tablet, and mobile.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="feature-card text-center p-4">
                                <div className="feature-icon mb-3">
                                    <i className="bi bi-palette-fill text-primary fs-1"></i>
                                </div>
                                <h4 className="fw-bold mb-3">Beautiful Templates</h4>
                                <p className="text-muted">
                                    Choose from a variety of professionally designed templates 
                                    that suit your style.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section py-5 bg-light">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2 className="display-5 fw-bold text-dark mb-3">Meet Our Team</h2>
                            <p className="lead text-muted">The passionate people behind PortfolioPro</p>
                        </div>
                    </div>
                    <div className="row g-4 justify-content-center">
                        <div className="col-md-4">
                            <div className="team-card text-center p-4">
                                <div className="team-avatar mb-3 mx-auto rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                    style={{ width: '120px', height: '120px' }}>
                                    <i className="bi bi-person-fill fs-1"></i>
                                </div>
                                <h4 className="fw-bold mb-2">John Doe</h4>
                                <p className="text-primary mb-3">Founder & CEO</p>
                                <p className="text-muted small">
                                    Passionate about empowering professionals through technology 
                                    and design.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="team-card text-center p-4">
                                <div className="team-avatar mb-3 mx-auto rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                                    style={{ width: '120px', height: '120px' }}>
                                    <i className="bi bi-person-fill fs-1"></i>
                                </div>
                                <h4 className="fw-bold mb-2">Jane Smith</h4>
                                <p className="text-primary mb-3">Lead Designer</p>
                                <p className="text-muted small">
                                    Creates beautiful and functional designs that enhance 
                                    user experience.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="team-card text-center p-4">
                                <div className="team-avatar mb-3 mx-auto rounded-circle bg-warning text-white d-flex align-items-center justify-content-center"
                                    style={{ width: '120px', height: '120px' }}>
                                    <i className="bi bi-person-fill fs-1"></i>
                                </div>
                                <h4 className="fw-bold mb-2">Mike Johnson</h4>
                                <p className="text-primary mb-3">Tech Lead</p>
                                <p className="text-muted small">
                                    Ensures our platform is fast, reliable, and secure 
                                    for all users.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section py-5 bg-gradient-primary text-white">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-lg-8 mx-auto">
                            <h2 className="display-5 fw-bold mb-4">Ready to Create Your Portfolio?</h2>
                            <p className="lead mb-4 opacity-75">
                                Join thousands of professionals who have already created 
                                their stunning portfolios with PortfolioPro.
                            </p>
                            <div className="d-flex gap-3 justify-content-center flex-wrap">
                                <Link to="/select-template" className="btn btn-light btn-lg px-4">
                                    Get Started Free
                                </Link>
                                <Link to="/contact" className="btn btn-outline-light btn-lg px-4">
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                
            `}</style>

            {/* Bootstrap Icons */}
            <link 
                rel="stylesheet" 
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" 
            />
        </div>
    );
}