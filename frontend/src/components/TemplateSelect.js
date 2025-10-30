import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function TemplateSelect() {
    const [selected, setSelected] = useState(null);
    const navigate = useNavigate();

    const handleSelect = (templateId) => {
        setSelected(templateId);
        localStorage.setItem("selectedTemplate", templateId=="dark"?2:1);
        navigate("/new-profile");
    };

    const templates = [
        {
            id: "light",
            name: "Light Theme",
            image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=500&h=400&fit=crop&auto=format",
            description: "A clean, bright and professional light theme template. Perfect for corporate profiles, professionals who prefer a classic and clean aesthetic with excellent readability.",
            keyFeatures: [
                "Clean white background",
                "High contrast text",
                "Professional typography",
                "Bright color accents",
                "Excellent readability",
                "Corporate friendly"
            ]
        },
        {
            id: "dark",
            name: "Dark Theme",
            image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=400&fit=crop&auto=format",
            description: "A modern dark theme with sleek design. Ideal for creatives, developers, and those who prefer a contemporary look that's easy on the eyes with reduced eye strain.",
            keyFeatures: [
                "Dark background theme",
                "Reduced eye strain",
                "Modern aesthetic",
                "Vibrant accent colors",
                "Night-friendly browsing",
                "Battery efficient"
            ]
        }
    ];

    return (
        <div className="container my-5">
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold text-primary">Choose Your Template</h1>
                <p className="lead text-muted">Select between light and dark theme for your portfolio</p>
            </div>

            <div className="row g-4">
                {templates.map((template) => (
                    <div key={template.id} className="col-lg-6 col-md-12" style={{cursor:"pointer"}}>
                        <div
                            className={`card template-card h-100 shadow-sm border-3 transition-all ${selected === template.id ? "border-primary selected-template" : "border-light"
                                }`}
                        >
                            {/* Template Image */}
                            <div className="position-relative">
                                <img
                                    src={template.image}
                                    alt={template.name}
                                    className="card-img-top template-image"
                                    style={{ height: '250px', objectFit: 'cover' }}
                                />
                                <div className="position-absolute top-0 end-0 m-3">
                                    <span className={`badge ${selected === template.id ? "bg-primary" : "bg-secondary"
                                        } text-white fs-6`}>
                                        {selected === template.id ? "Selected" : "Available"}
                                    </span>
                                </div>
                                <div className="position-absolute top-0 start-0 m-3">
                                    <span className={`badge ${template.id === 'light' ? 'bg-warning text-dark' : 'bg-dark text-white'} fs-6`}>
                                        {template.id === 'light' ? '☀️ Light' : '🌙 Dark'}
                                    </span>
                                </div>
                            </div>

                            {/* Card Body */}
                            <div className="card-body d-flex flex-column">
                                {/* Template Name */}
                                <h3 className="card-title fw-bold text-dark mb-2">
                                    {template.name}
                                    {template.id === 'light' && ' ☀️'}
                                    {template.id === 'dark' && ' 🌙'}
                                </h3>

                                {/* Description */}
                                <p className="card-text text-muted mb-3 flex-grow-1">
                                    {template.description}
                                </p>

                                {/* Key Features */}
                                <div className="mb-3">
                                    <h6 className="fw-semibold text-primary mb-3">
                                        <i className="bi bi-stars me-2"></i>
                                        Key Features:
                                    </h6>
                                    <ul className="list-disc list-inside text-blue-500 marker:text-blue-500">
                                        <div className="row">
                                            {template.keyFeatures.map((feature, index) => (
                                                <div key={index} className="col-6">
                                                    <li className="mb-2">
                                                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                        <small className="text-dark">{feature}</small>
                                                    </li>
                                                </div>
                                            ))}
                                        </div>
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-auto pt-3">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-between">
                                        <button
                                            className="btn btn-outline-primary btn-lg flex-fill me-md-2"
                                            onClick={() => handleSelect(template.id)}
                                        >
                                            <i className="bi bi-magic me-2"></i>
                                            Choose {template.id === 'light' ? 'Light' : 'Dark'}
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary btn-lg flex-fill"
                                            onClick={() => window.open('/preview/' + template.id, '_blank')}
                                        >
                                            <i className="bi bi-eye me-2"></i>
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer with Additional Info */}
                            <div className="card-footer bg-transparent border-0 pt-0">
                                <div className="d-flex justify-content-between align-items-center text-muted">
                                    <small>
                                        <i className="bi bi-clock me-1"></i>
                                        Setup: 5 minutes
                                    </small>
                                    <small>
                                        <i className="bi bi-phone me-1"></i>
                                        Mobile Friendly
                                    </small>
                                    <small>
                                        <i className="bi bi-palette me-1"></i>
                                        Customizable
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Selection Help Text */}
            {selected && (
                <div className="row mt-4">
                    <div className="col-12">
                        <div className="alert alert-info text-center">
                            <i className="bi bi-info-circle me-2"></i>
                            <strong>{templates.find(t => t.id === selected)?.name}</strong> theme selected.
                            Click "Choose {selected === 'light' ? 'Light' : 'Dark'}" to proceed with your selection.
                        </div>
                    </div>
                </div>
            )}

            {/* Theme Comparison Help */}
            <div className="row mt-5">
                <div className="col-12">
                    <div className="card border-0 bg-light">
                        <div className="card-body text-center">
                            <h5 className="card-title text-primary mb-3">Theme Selection Guide</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="p-3">
                                        <h6 className="text-warning">☀️ Light Theme</h6>
                                        <small className="text-muted">
                                            Best for: Corporate profiles, professional services, 
                                            content-heavy sites, and users who prefer classic web experience.
                                        </small>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="p-3">
                                        <h6 className="text-dark">🌙 Dark Theme</h6>
                                        <small className="text-muted">
                                            Best for: Creative portfolios, developers, 
                                            night-time users, and modern aesthetic preferences.
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}