import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <footer className="custom-footer mt-5">
                <div className="container-fluid">
                    {/* Main Footer Content */}
                    <div className="footer-main py-5">
                        <div className="row g-4">
                            {/* Company Info */}
                            <div className="col-lg-4 col-md-6">
                                <div className="footer-brand mb-4">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="brand-logo me-2">
                                            <i className="bi bi-stars"></i>
                                        </div>
                                        <h4 className="brand-text mb-0">PortfolioPro</h4>
                                    </div>
                                    <p className="footer-description">
                                        Create stunning professional portfolios in minutes. 
                        Showcase your skills, projects, and achievements with our 
                        easy-to-use portfolio builder.
                                    </p>
                                    <div className="social-links">
                                        <a href="#" className="social-link">
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                        <a href="#" className="social-link">
                                            <i className="bi bi-twitter"></i>
                                        </a>
                                        <a href="#" className="social-link">
                                            <i className="bi bi-instagram"></i>
                                        </a>
                                        <a href="#" className="social-link">
                                            <i className="bi bi-linkedin"></i>
                                        </a>
                                        <a href="#" className="social-link">
                                            <i className="bi bi-github"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="col-lg-2 col-md-6">
                                <h5 className="footer-heading mb-4">Quick Links</h5>
                                <ul className="footer-links list-unstyled">
                                    <li className="mb-2">
                                        <Link to="/" className="footer-link">
                                            <i className="bi bi-chevron-right me-2"></i>
                                            Home
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/about" className="footer-link">
                                            <i className="bi bi-chevron-right me-2"></i>
                                            About
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/services" className="footer-link">
                                            <i className="bi bi-chevron-right me-2"></i>
                                            Services
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/portfolio" className="footer-link">
                                            <i className="bi bi-chevron-right me-2"></i>
                                            Portfolio
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Resources */}
                            <div className="col-lg-2 col-md-6">
                                <h5 className="footer-heading mb-4">Resources</h5>
                                <ul className="footer-links list-unstyled">
                                    <li className="mb-2">
                                        <Link to="/templates" className="footer-link">
                                            <i className="bi bi-chevron-right me-2"></i>
                                            Templates
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/blog" className="footer-link">
                                            <i className="bi bi-chevron-right me-2"></i>
                                            Blog
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/docs" className="footer-link">
                                            <i className="bi bi-chevron-right me-2"></i>
                                            Documentation
                                        </Link>
                                    </li>
                                    <li className="mb-2">
                                        <Link to="/support" className="footer-link">
                                            <i className="bi bi-chevron-right me-2"></i>
                                            Support
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            {/* Contact Info */}
                            <div className="col-lg-4 col-md-6">
                                <h5 className="footer-heading mb-4">Get In Touch</h5>
                                <div className="contact-info">
                                    <div className="contact-item mb-3">
                                        <i className="bi bi-geo-alt-fill me-3"></i>
                                        <span>123 Portfolio Street, Creative City, CC 12345</span>
                                    </div>
                                    <div className="contact-item mb-3">
                                        <i className="bi bi-envelope-fill me-3"></i>
                                        <span>hello@portfoliopro.com</span>
                                    </div>
                                    <div className="contact-item mb-3">
                                        <i className="bi bi-telephone-fill me-3"></i>
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                    <div className="contact-item">
                                        <i className="bi bi-clock-fill me-3"></i>
                                        <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                                    </div>
                                </div>

                                {/* Newsletter Subscription */}
                                <div className="newsletter mt-4">
                                    <h6 className="newsletter-title mb-3">Stay Updated</h6>
                                    <div className="input-group">
                                        <input 
                                            type="email" 
                                            className="form-control newsletter-input" 
                                            placeholder="Enter your email"
                                        />
                                        <button className="btn btn-newsletter" type="button">
                                            <i className="bi bi-send-fill"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Bottom */}
                    <div className="footer-bottom py-4 border-top border-light">
                        <div className="row align-items-center">
                            <div className="col-md-6 text-center text-md-start">
                                <p className="copyright mb-0">
                                    &copy; {currentYear} PortfolioPro. All rights reserved.
                                </p>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <div className="footer-legal-links">
                                    <Link to="/privacy" className="legal-link me-3">
                                        Privacy Policy
                                    </Link>
                                    <Link to="/terms" className="legal-link me-3">
                                        Terms of Service
                                    </Link>
                                    <Link to="/cookies" className="legal-link">
                                        Cookie Policy
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}