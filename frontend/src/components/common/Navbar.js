import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar fixed-top">
                <div className="container-fluid">
                    {/* Brand Logo with enhanced styling */}
                    <Link 
                        className="navbar-brand fw-bold d-flex align-items-center" 
                        to="/"
                        onClick={handleCloseMenu}
                    >
                        <div className="brand-logo me-2">
                            <i className="bi bi-stars"></i>
                        </div>
                        PortfolioPro
                    </Link>
                    
                    {/* Mobile Toggle Button */}
                    <button 
                        className="navbar-toggler custom-toggler" 
                        type="button" 
                        onClick={handleToggleMenu}
                        aria-controls="navbarSupportedContent" 
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    {/* Navigation Menu */}
                    <div 
                        className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`} 
                        id="navbarSupportedContent"
                    >
                        {/* Center Navigation Links */}
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link 
                                    className="nav-link nav-link-custom" 
                                    aria-current="page" 
                                    to="/"
                                    onClick={handleCloseMenu}
                                >
                                    <i className="bi bi-house me-1 d-lg-none"></i>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className="nav-link nav-link-custom" 
                                    to="/about"
                                    onClick={handleCloseMenu}
                                >
                                    <i className="bi bi-info-circle me-1 d-lg-none"></i>
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link 
                                    className="nav-link nav-link-custom" 
                                    to="/contact"
                                    onClick={handleCloseMenu}
                                >
                                    <i className="bi bi-telephone me-1 d-lg-none"></i>
                                    Contact
                                </Link>
                            </li>
                            <li className="nav-item dropdown d-lg-none">
                                <Link 
                                    className="nav-link dropdown-toggle nav-link-custom" 
                                    to="#" 
                                    id="navbarDropdown" 
                                    role="button" 
                                    data-bs-toggle="dropdown" 
                                    aria-expanded="false"
                                >
                                    <i className="bi bi-grid me-1"></i>
                                    More
                                </Link>
                                <ul className="dropdown-menu custom-dropdown" aria-labelledby="navbarDropdown">
                                    <li>
                                        <Link 
                                            className="dropdown-item" 
                                            to="/services"
                                            onClick={handleCloseMenu}
                                        >
                                            <i className="bi bi-briefcase me-2"></i>
                                            Services
                                        </Link>
                                    </li>
                                    <li>
                                        <Link 
                                            className="dropdown-item" 
                                            to="/portfolio"
                                            onClick={handleCloseMenu}
                                        >
                                            <i className="bi bi-collection me-2"></i>
                                            Portfolio
                                        </Link>
                                    </li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <Link 
                                            className="dropdown-item" 
                                            to="/testimonials"
                                            onClick={handleCloseMenu}
                                        >
                                            <i className="bi bi-chat-quote me-2"></i>
                                            Testimonials
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        
                        {/* Right Side CTA Button */}
                        <div className="d-flex">
                            <Link 
                                className="btn btn-custom-primary btn-lg" 
                                to="/select-template"
                                onClick={handleCloseMenu}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Create Portfolio
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>


            {/* Add Bootstrap Icons CDN if not already included */}
            <link 
                rel="stylesheet" 
                href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css" 
            />
        </>
    );
}