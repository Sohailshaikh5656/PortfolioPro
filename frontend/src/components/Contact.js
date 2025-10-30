import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
            
            // Reset status after 5 seconds
            setTimeout(() => setSubmitStatus(null), 5000);
        }, 2000);
    };

    return (
        <div className="contact-page">
            {/* Hero Section */}
            <section className="hero-section py-5 bg-light">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-lg-8 mx-auto">
                            <h1 className="display-4 fw-bold text-primary mb-3">Get In Touch</h1>
                            <p className="lead text-muted mb-4">
                                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </p>
                            <div className="d-flex justify-content-center gap-3 flex-wrap">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-telephone-fill text-primary me-2"></i>
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-envelope-fill text-primary me-2"></i>
                                    <span>hello@portfoliopro.com</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-clock-fill text-primary me-2"></i>
                                    <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info Section */}
            <section className="contact-main py-5">
                <div className="container">
                    <div className="row g-5">
                        {/* Contact Form */}
                        <div className="col-lg-8">
                            <div className="contact-form-card card border-0 shadow-lg">
                                <div className="card-header bg-gradient-primary text-white py-4">
                                    <h3 className="mb-0 fw-bold">
                                        <i className="bi bi-send me-2"></i>
                                        Send us a Message
                                    </h3>
                                </div>
                                <div className="card-body p-4 p-md-5">
                                    {submitStatus === 'success' && (
                                        <div className="alert alert-success d-flex align-items-center" role="alert">
                                            <i className="bi bi-check-circle-fill me-2"></i>
                                            Thank you for your message! We'll get back to you soon.
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label htmlFor="name" className="form-label fw-semibold">
                                                    Full Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="Enter your full name"
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label htmlFor="email" className="form-label fw-semibold">
                                                    Email Address *
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control form-control-lg"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="Enter your email address"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="subject" className="form-label fw-semibold">
                                                    Subject *
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    id="subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="What's this about?"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="message" className="form-label fw-semibold">
                                                    Message *
                                                </label>
                                                <textarea
                                                    className="form-control form-control-lg"
                                                    id="message"
                                                    name="message"
                                                    rows="6"
                                                    value={formData.message}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="Tell us how we can help you..."
                                                ></textarea>
                                            </div>
                                            <div className="col-12">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-lg px-5 py-3"
                                                    disabled={isSubmitting}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                            Sending Message...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <i className="bi bi-send-fill me-2"></i>
                                                            Send Message
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="col-lg-4">
                            <div className="contact-info">
                                {/* Office Address */}
                                <div className="info-card card border-0 shadow-sm mb-4">
                                    <div className="card-body p-4">
                                        <div className="d-flex">
                                            <div className="icon-wrapper bg-primary text-white rounded-circle me-3 flex-shrink-0 d-flex align-items-center justify-content-center"
                                                style={{ width: '50px', height: '50px' }}>
                                                <i className="bi bi-geo-alt-fill fs-5"></i>
                                            </div>
                                            <div>
                                                <h5 className="fw-bold mb-2">Our Office</h5>
                                                <p className="text-muted mb-0">
                                                    123 Portfolio Street<br />
                                                    Creative City, CC 12345<br />
                                                    United States
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Methods */}
                                <div className="info-card card border-0 shadow-sm mb-4">
                                    <div className="card-body p-4">
                                        <h5 className="fw-bold mb-3">Contact Methods</h5>
                                        <div className="contact-methods">
                                            <div className="method-item d-flex align-items-center mb-3">
                                                <div className="icon-wrapper bg-success text-white rounded-circle me-3 flex-shrink-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: '40px', height: '40px' }}>
                                                    <i className="bi bi-telephone-fill"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-1 fw-semibold">Phone</h6>
                                                    <a href="tel:+15551234567" className="text-muted text-decoration-none">
                                                        +1 (555) 123-4567
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="method-item d-flex align-items-center mb-3">
                                                <div className="icon-wrapper bg-warning text-white rounded-circle me-3 flex-shrink-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: '40px', height: '40px' }}>
                                                    <i className="bi bi-envelope-fill"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-1 fw-semibold">Email</h6>
                                                    <a href="mailto:hello@portfoliopro.com" className="text-muted text-decoration-none">
                                                        hello@portfoliopro.com
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="method-item d-flex align-items-center">
                                                <div className="icon-wrapper bg-info text-white rounded-circle me-3 flex-shrink-0 d-flex align-items-center justify-content-center"
                                                    style={{ width: '40px', height: '40px' }}>
                                                    <i className="bi bi-clock-fill"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-1 fw-semibold">Business Hours</h6>
                                                    <p className="text-muted mb-0">
                                                        Mon - Fri: 9:00 AM - 6:00 PM<br />
                                                        Sat: 10:00 AM - 4:00 PM
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="info-card card border-0 shadow-sm">
                                    <div className="card-body p-4">
                                        <h5 className="fw-bold mb-3">Follow Us</h5>
                                        <div className="social-links d-flex gap-2">
                                            <a href="#" className="social-link btn btn-outline-primary btn-sm">
                                                <i className="bi bi-facebook"></i>
                                            </a>
                                            <a href="#" className="social-link btn btn-outline-primary btn-sm">
                                                <i className="bi bi-twitter"></i>
                                            </a>
                                            <a href="#" className="social-link btn btn-outline-primary btn-sm">
                                                <i className="bi bi-instagram"></i>
                                            </a>
                                            <a href="#" className="social-link btn btn-outline-primary btn-sm">
                                                <i className="bi bi-linkedin"></i>
                                            </a>
                                            <a href="#" className="social-link btn btn-outline-primary btn-sm">
                                                <i className="bi bi-github"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section py-5 bg-light">
                <div className="container">
                    <div className="row text-center mb-5">
                        <div className="col-12">
                            <h2 className="display-5 fw-bold text-dark mb-3">Frequently Asked Questions</h2>
                            <p className="lead text-muted">Quick answers to common questions</p>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="accordion" id="faqAccordion">
                                <div className="accordion-item border-0 shadow-sm mb-3">
                                    <h3 className="accordion-header">
                                        <button className="accordion-button fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                            How long does it take to create a portfolio?
                                        </button>
                                    </h3>
                                    <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body text-muted">
                                            You can create a beautiful portfolio in under 30 minutes using our templates. 
                                            Just fill in your information, upload your photos, and you're ready to go!
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0 shadow-sm mb-3">
                                    <h3 className="accordion-header">
                                        <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                            Can I customize my portfolio design?
                                        </button>
                                    </h3>
                                    <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body text-muted">
                                            Yes! All our templates are fully customizable. You can change colors, fonts, 
                                            layouts, and add your own branding to make it truly yours.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item border-0 shadow-sm mb-3">
                                    <h3 className="accordion-header">
                                        <button className="accordion-button collapsed fw-semibold" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                            Is there a free trial available?
                                        </button>
                                    </h3>
                                    <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body text-muted">
                                            Absolutely! We offer a 14-day free trial with full access to all features. 
                                            No credit card required to get started.
                                        </div>
                                    </div>
                                </div>
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
                            <h2 className="display-5 fw-bold mb-4">Ready to Get Started?</h2>
                            <p className="lead mb-4 opacity-75">
                                Create your professional portfolio today and showcase your skills to the world.
                            </p>
                            <div className="d-flex gap-3 justify-content-center flex-wrap">
                                <Link to="/select-template" className="btn btn-light btn-lg px-4">
                                    Create Portfolio
                                </Link>
                                <Link to="/about" className="btn btn-outline-light btn-lg px-4">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bootstrap Icons */}
            <link 
                rel="stylesheet" 
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" 
            />
        </div>
    );
}