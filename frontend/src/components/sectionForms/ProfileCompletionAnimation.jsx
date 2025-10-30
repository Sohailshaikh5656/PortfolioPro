import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProfileCompletionAnimation() {
    const navigate = useNavigate()
    const [step, setStep] = useState(0)
    const [progress, setProgress] = useState(0)

    const steps = [
        { icon: "📝", text: "Finalizing your portfolio..." },
        { icon: "🎨", text: "Applying your design choices..." },
        { icon: "⚡", text: "Optimizing performance..." },
        { icon: "🔍", text: "Running final checks..." },
        { icon: "✅", text: "Portfolio complete!" }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer)
                    return 100
                }
                return prev + 2
            })
        }, 50)

        const stepTimer = setInterval(() => {
            setStep(prev => {
                if (prev >= steps.length - 1) {
                    clearInterval(stepTimer)
                    return prev
                }
                return prev + 1
            })
        }, 800)

        // Redirect after completion
        const redirectTimer = setTimeout(() => {
            navigate("/")
        }, 5000)

        return () => {
            clearInterval(timer)
            clearInterval(stepTimer)
            clearTimeout(redirectTimer)
        }
    }, [navigate])

    return (
        <div className="container-fluid vh-100 bg-dark">
            <div className="row h-100 justify-content-center align-items-center">
                <div className="col-12 col-md-6 col-lg-4 text-center text-white">
                    
                    {/* Animated Checkmark */}
                    <div className="mb-5">
                        <div className="position-relative d-inline-block">
                            <div className="completion-checkmark">
                                <svg className="checkmark" viewBox="0 0 52 52">
                                    <circle 
                                        className="checkmark__circle" 
                                        cx="26" 
                                        cy="26" 
                                        r="25" 
                                        fill="none"
                                    />
                                    <path 
                                        className="checkmark__check" 
                                        fill="none" 
                                        d="M14.1 27.2l7.1 7.2 16.7-16.8"
                                    />
                                </svg>
                            </div>
                            <div className="sparkle-1"></div>
                            <div className="sparkle-2"></div>
                            <div className="sparkle-3"></div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <div className="progress" style={{ height: '8px', backgroundColor: 'rgba(255,255,255,0.2)' }}>
                            <div 
                                className="progress-bar bg-success" 
                                role="progressbar" 
                                style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
                            ></div>
                        </div>
                        <small className="text-muted mt-2 d-block">
                            {progress}% Complete
                        </small>
                    </div>

                    {/* Current Step */}
                    <div className="mb-4">
                        <div className="step-icon mb-3" style={{ fontSize: '3rem' }}>
                            {steps[step]?.icon}
                        </div>
                        <h4 className="fw-bold text-warning">
                            {steps[step]?.text}
                        </h4>
                    </div>

                    {/* Animated Dots */}
                    <div className="loading-dots mb-4">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>

                    {/* Completion Message */}
                    {progress === 100 && (
                        <div className="completion-message animate__animated animate__fadeInUp">
                            <h5 className="text-success mb-3">
                                🎉 Portfolio Successfully Created!
                            </h5>
                            <p className="text-muted">
                                Redirecting to homepage in <span className="text-warning">3s</span>...
                            </p>
                        </div>
                    )}

                    {/* Skip Button */}
                    <div className="mt-4">
                        <button 
                            className="btn btn-outline-light btn-sm"
                            onClick={() => navigate("/")}
                        >
                            Skip Animation
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating Background Elements */}
            <div className="floating-elements">
                <div className="floating-element element-1">🌟</div>
                <div className="floating-element element-2">🚀</div>
                <div className="floating-element element-3">💫</div>
                <div className="floating-element element-4">✨</div>
                <div className="floating-element element-5">⭐</div>
            </div>
        </div>
    )
}