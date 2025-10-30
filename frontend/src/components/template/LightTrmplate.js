import React, { useState, useEffect } from 'react';

const LightTheme = ({ portfolioData }) => {
    // Hooks first
    const [activeSection, setActiveSection] = useState('hero');
    const [isNavVisible, setIsNavVisible] = useState(false);

    
    // Extract ALL data with safety checks
    const user = portfolioData.user?.[0] || {};
    const hero = portfolioData.hero?.[0] || {};
    const about = portfolioData.about?.[0] || {};
    const contact = portfolioData.contact?.[0] || {};
    const footer = portfolioData.footer?.[0] || {};
    const services = portfolioData.services || [];
    const portfolio = portfolioData.portfolio || [];
    const testimonials = portfolioData.testimonial || [];

    // Parse JSON fields
    const socialLinks = contact.social_links ? JSON.parse(contact.social_links) : {};
    const skills = about.skills ? JSON.parse(about.skills) : [];
    const additionalLinks = footer.additional_links ? JSON.parse(footer.additional_links) : [];

    const sections = [
        { id: 'hero', name: 'Home' },
        { id: 'about', name: 'About' },
        { id: 'services', name: 'Services' },
        { id: 'portfolio', name: 'Portfolio' },
        { id: 'testimonials', name: 'Testimonials' },
        { id: 'contact', name: 'Contact' }
    ];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(sectionId);
            setIsNavVisible(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            
            sections.forEach(section => {
                const element = document.getElementById(section.id);
                if (element) {
                    const offsetTop = element.offsetTop - 100;
                    const offsetBottom = offsetTop + element.offsetHeight;
                    
                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Early return for loading
    if (!portfolioData) {
        return (
            <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading portfolio...</p>
            </div>
        );
    }

    return (
        <div className="light-theme">
            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-container">
                    <div className="nav-logo px-5">
                        <img 
                            src={`${process.env.REACT_APP_IMAGE_URL}/${user.image}`} 
                            alt={user.name}
                            className="nav-profile-img"
                        />
                        <span>{user.name}</span>
                    </div>
                    
                    <div className={`nav-menu ${isNavVisible ? 'active' : ''}`}>
                        {sections.map(section => (
                            <button
                                key={section.id}
                                className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(section.id)}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>

                    <div className="nav-toggle" onClick={() => setIsNavVisible(!isNavVisible)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <div className="hero-text">
                            <div className="hero-badge">
                                <span>{user.profession}</span>
                            </div>
                            <h1 className="hero-title">{hero.hero_title}</h1>
                            <p className="hero-subtitle">{hero.hero_subtitle}</p>
                            <div className="hero-location">
                                <span>📍 {user.city}, {user.state}</span>
                            </div>
                            <button className="cta-button" onClick={() => scrollToSection('contact')}>
                                {hero.hero_cta}
                            </button>
                        </div>
                        <div className="hero-image">
                            <img 
                                src={`${process.env.REACT_APP_IMAGE_URL}/${hero.image}`} 
                                alt={user.name} 
                                className="hero-main-img"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="container">
                    <h2 className="section-title">About Me</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p>{about.bio}</p>
                            <div className="stats">
                                <div className="stat">
                                    <h3>{about.experience}+</h3>
                                    <p>Years Experience</p>
                                </div>
                                <div className="stat">
                                    <h3>{about.projects_count}+</h3>
                                    <p>Projects Completed</p>
                                </div>
                                <div className="stat">
                                    <h3>{services.length}+</h3>
                                    <p>Services Offered</p>
                                </div>
                            </div>
                        </div>
                        <div className="skills">
                            <h3>Skills & Technologies</h3>
                            <div className="skills-grid">
                                {skills.map((skill, index) => (
                                    <span key={index} className="skill-tag">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="services-section">
                <div className="container">
                    <h2 className="section-title">My Services</h2>
                    <div className="services-grid">
                        {services.map(service => (
                            <div key={service.id} className="service-card">
                                <div className="service-icon">⚡</div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className="portfolio-section">
                <div className="container">
                    <h2 className="section-title">My Portfolio</h2>
                    <div className="portfolio-grid">
                        {portfolio.map(project => (
                            <div key={project.id} className="portfolio-card">
                                <img 
                                    src={`${process.env.REACT_APP_IMAGE_URL}/${project.image}`} 
                                    alt={project.title}
                                    className="portfolio-image"
                                />
                                <div className="portfolio-content">
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                        View Project →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="testimonials-section">
                <div className="container">
                    <h2 className="section-title">Client Testimonials</h2>
                    <div className="testimonials-grid">
                        {testimonials.map(testimonial => (
                            <div key={testimonial.id} className="testimonial-card">
                                <div className="testimonial-content">
                                    <p>"{testimonial.testimonial}"</p>
                                </div>
                                <div className="testimonial-author">
                                    <img 
                                        src={`${process.env.REACT_APP_IMAGE_URL}/${testimonial.logo}`} 
                                        alt={testimonial.client_name}
                                        className="client-logo"
                                    />
                                    <div className="author-info">
                                        <strong>{testimonial.client_name}</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact-section">
                <div className="container">
                    <h2 className="section-title">Get In Touch</h2>
                    <div className="contact-content">
                        <div className="contact-info">
                            <div className="contact-item">
                                <div className="contact-icon">📧</div>
                                <div>
                                    <strong>Email</strong>
                                    <p>{contact.email}</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon">📱</div>
                                <div>
                                    <strong>Phone</strong>
                                    <p>{contact.phone}</p>
                                </div>
                            </div>
                            <div className="contact-item">
                                <div className="contact-icon">📍</div>
                                <div>
                                    <strong>Address</strong>
                                    <p>{contact.address}</p>
                                </div>
                            </div>
                        </div>
                        <div className="social-links">
                            <h3>Connect With Me</h3>
                            <div className="social-icons">
                                {socialLinks.linkedin && (
                                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <span className="social-icon">💼</span>
                                        <span>LinkedIn</span>
                                    </a>
                                )}
                                {socialLinks.github && (
                                    <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <span className="social-icon">🐙</span>
                                        <span>GitHub</span>
                                    </a>
                                )}
                                {socialLinks.twitter && (
                                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <span className="social-icon">🐦</span>
                                        <span>Twitter</span>
                                    </a>
                                )}
                                {socialLinks.website && (
                                    <a href={socialLinks.website} target="_blank" rel="noopener noreferrer" className="social-link">
                                        <span className="social-icon">🌐</span>
                                        <span>Website</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-main">
                            <div className="footer-brand">
                                <img 
                                    src={`${process.env.REACT_APP_IMAGE_URL}/${user.image}`} 
                                    alt={user.name}
                                    className="footer-logo"
                                />
                                <div>
                                    <h4>{user.company_name}</h4>
                                    <p>{user.profession}</p>
                                </div>
                            </div>
                            <p className="copyright">
                                &copy; {footer.year} {footer.company}. {footer.copyright_text}
                            </p>
                        </div>
                        <div className="footer-links">
                            {additionalLinks.map((link, index) => (
                                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            <style jsx>{`
                .light-theme {
                    background: #ffffff;
                    color: #333333;
                    min-height: 100vh;
                    font-family: 'Inter', sans-serif;
                }

                /* Navigation */
                .navbar {
                    position: fixed;
                    top: 0;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(20px);
                    z-index: 1000;
                    padding: 1rem 0;
                    border-bottom: 1px solid #e0e0e0;
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .nav-logo {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .nav-profile-img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #667eea;
                }

                .nav-logo span {
                    font-size: 1.3rem;
                    font-weight: bold;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .nav-menu {
                    display: flex;
                    gap: 2rem;
                }

                .nav-link {
                    background: none;
                    border: none;
                    color: #666;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0.5rem 1rem;
                    border-radius: 8px;
                    font-size: 0.9rem;
                }

                .nav-link:hover,
                .nav-link.active {
                    color: #667eea;
                    background: rgba(102, 126, 234, 0.1);
                }

                .nav-toggle {
                    display: none;
                    flex-direction: column;
                    cursor: pointer;
                }

                .nav-toggle span {
                    width: 25px;
                    height: 3px;
                    background: #333;
                    margin: 3px 0;
                    transition: 0.3s;
                }

                /* Sections */
                section {
                    padding: 120px 0;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .section-title {
                    text-align: center;
                    font-size: 3rem;
                    margin-bottom: 4rem;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    font-weight: 700;
                }

                /* Hero Section */
                .hero-section {
                    background: linear-gradient(135deg, #f8fafc, #e2e8f0);
                    position: relative;
                    overflow: hidden;
                }

                .hero-section::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -50%;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%);
                }

                .hero-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: center;
                    position: relative;
                    z-index: 2;
                }

                .hero-badge {
                    display: inline-block;
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    padding: 0.5rem 1.5rem;
                    border-radius: 25px;
                    margin-bottom: 1.5rem;
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .hero-title {
                    font-size: 3.5rem;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                    font-weight: 700;
                    color: #1a202c;
                }

                .hero-subtitle {
                    font-size: 1.3rem;
                    color: #666;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }

                .hero-location {
                    margin-bottom: 2.5rem;
                    color: #666;
                    font-size: 1.1rem;
                }

                .cta-button {
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 15px 35px;
                    font-size: 1.1rem;
                    border-radius: 30px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-weight: 600;
                }

                .cta-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
                }

                .hero-main-img {
                    width: 100%;
                    max-width: 500px;
                    border-radius: 20px;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.1);
                    transition: transform 0.3s ease;
                }

                .hero-main-img:hover {
                    transform: scale(1.02);
                }

                /* About Section */
                .about-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                    align-items: start;
                }

                .about-text p {
                    font-size: 1.1rem;
                    line-height: 1.8;
                    color: #666;
                    margin-bottom: 2rem;
                }

                .stats {
                    display: flex;
                    gap: 3rem;
                    margin-top: 2rem;
                }

                .stat {
                    text-align: center;
                }

                .stat h3 {
                    font-size: 2.5rem;
                    color: #667eea;
                    margin-bottom: 0.5rem;
                    font-weight: 700;
                }

                .stat p {
                    color: #666;
                    font-size: 0.9rem;
                }

                .skills h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1.5rem;
                    color: #1a202c;
                }

                .skills-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .skill-tag {
                    background: rgba(102, 126, 234, 0.1);
                    color: #667eea;
                    padding: 0.7rem 1.2rem;
                    border-radius: 20px;
                    border: 1px solid rgba(102, 126, 234, 0.3);
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                /* Services Section */
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2.5rem;
                }

                .service-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                }

                .service-card:hover {
                    transform: translateY(-10px);
                    border-color: #667eea;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }

                .service-icon {
                    font-size: 3rem;
                    margin-bottom: 1.5rem;
                }

                .service-card h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: #1a202c;
                }

                .service-card p {
                    color: #666;
                    line-height: 1.6;
                }

                /* Portfolio Section */
                .portfolio-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 2.5rem;
                }

                .portfolio-card {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                }

                .portfolio-card:hover {
                    transform: translateY(-5px);
                    border-color: #667eea;
                    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
                }

                .portfolio-image {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                }

                .portfolio-content {
                    padding: 2rem;
                }

                .portfolio-content h3 {
                    font-size: 1.3rem;
                    margin-bottom: 1rem;
                    color: #1a202c;
                }

                .portfolio-content p {
                    color: #666;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }

                .project-link {
                    color: #667eea;
                    text-decoration: none;
                    font-weight: 600;
                    transition: color 0.3s ease;
                }

                .project-link:hover {
                    color: #764ba2;
                }

                /* Testimonials Section */
                .testimonials-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 2.5rem;
                }

                .testimonial-card {
                    background: white;
                    padding: 2.5rem;
                    border-radius: 20px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                }

                .testimonial-content p {
                    font-size: 1.1rem;
                    line-height: 1.7;
                    color: #666;
                    font-style: italic;
                    margin-bottom: 1.5rem;
                }

                .testimonial-author {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .client-logo {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #667eea;
                }

                .author-info strong {
                    color: #1a202c;
                    font-size: 1.1rem;
                }

                /* Contact Section */
                .contact-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 4rem;
                }

                .contact-info {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .contact-item {
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    background: white;
                    padding: 1.5rem;
                    border-radius: 15px;
                    border: 1px solid #e2e8f0;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                }

                .contact-icon {
                    font-size: 1.5rem;
                }

                .contact-item strong {
                    color: #667eea;
                    display: block;
                    margin-bottom: 0.5rem;
                }

                .contact-item p {
                    color: #666;
                    margin: 0;
                }

                .social-links h3 {
                    color: #1a202c;
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                }

                .social-icons {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .social-link {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    color: #666;
                    text-decoration: none;
                    padding: 1rem 1.5rem;
                    background: white;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                    transition: all 0.3s ease;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                }

                .social-link:hover {
                    color: #667eea;
                    border-color: #667eea;
                    transform: translateX(10px);
                }

                .social-icon {
                    font-size: 1.2rem;
                }

                /* Footer */
                .footer {
                    background: #f8fafc;
                    padding: 3rem 0;
                    border-top: 1px solid #e2e8f0;
                }

                .footer-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .footer-brand {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .footer-logo {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #667eea;
                }

                .footer-brand h4 {
                    color: #1a202c;
                    margin: 0;
                    font-size: 1.2rem;
                }

                .footer-brand p {
                    color: #666;
                    margin: 0;
                }

                .copyright {
                    color: #666;
                    margin: 1rem 0 0 0;
                }

                .footer-links {
                    display: flex;
                    gap: 2rem;
                }

                .footer-links a {
                    color: #666;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .footer-links a:hover {
                    color: #667eea;
                }

                /* Loading */
                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background: #ffffff;
                    color: #333;
                }

                .loading-spinner {
                    width: 50px;
                    height: 50px;
                    border: 4px solid #e2e8f0;
                    border-top: 4px solid #667eea;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin-bottom: 20px;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .nav-menu {
                        position: fixed;
                        left: -100%;
                        top: 80px;
                        flex-direction: column;
                        background: #ffffff;
                        width: 100%;
                        text-align: center;
                        transition: 0.3s;
                        padding: 2rem 0;
                        border-bottom: 1px solid #e0e0e0;
                    }

                    .nav-menu.active {
                        left: 0;
                    }

                    .nav-toggle {
                        display: flex;
                    }

                    .hero-content,
                    .about-content,
                    .contact-content {
                        grid-template-columns: 1fr;
                        text-align: center;
                    }

                    .footer-content {
                        flex-direction: column;
                        gap: 2rem;
                        text-align: center;
                    }

                    .stats {
                        flex-direction: column;
                        gap: 2rem;
                    }

                    .section-title {
                        font-size: 2.5rem;
                    }

                    .hero-title {
                        font-size: 2.5rem;
                    }

                    .services-grid,
                    .portfolio-grid,
                    .testimonials-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default LightTheme;