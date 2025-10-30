import React, { useState } from 'react'
import BasicDetails from './sectionForms/BasicDetails'
import HeaderAndHero from './sectionForms/HeaderAndHero'
import AboutSection from './sectionForms/AboutSection'
import ServicesSection from './sectionForms/Services'
import PortfolioSection from './Product'
import TestimonialsSection from './sectionForms/TestimonialsSection'
import ContactSection from './sectionForms/ContactSection'
import FooterSection from './sectionForms/FooterSection'
import ProfileCompletionAnimation from './sectionForms/ProfileCompletionAnimation'

export default function NewProfile() {
    const SectionArray = [
        "Basic Details", "Header & Hero", "About Section", "Services", "Products", "Clients & Testimonials", "Contact", "Footer", "Completion"
    ]
    const [form, setForm] = useState(SectionArray[0])

    return (
        <div className="container my-4">
            <div className='my-4'>
                <div className="dots-tracker">
                    {SectionArray.map((item, index) => (
                        <React.Fragment key={index}>
                            <div
                                className={`tracker-dot ${form === item ? 'active' : ''} ${index < SectionArray.findIndex(section => section === form) ? 'completed' : ''}`}
                            >
                                {index < SectionArray.findIndex(section => section === form) && (
                                    <i className="bi bi-check"></i>
                                )}
                            </div>
                            {index < SectionArray.length - 1 && (
                                <div className={`dot-connector ${index < SectionArray.findIndex(section => section === form) ? 'completed' : ''}`}></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <div className="text-center mt-2">
                    <small className="text-muted">
                        Step {SectionArray.findIndex(section => section === form) + 1} of {SectionArray.length}: {form.replace('Section', '')}
                    </small>
                </div>
            </div>
            {form === SectionArray[0] && <BasicDetails setForm={setForm} />}
            {form === SectionArray[1] && <HeaderAndHero setForm={setForm} />}
            {form === SectionArray[2] && <AboutSection setForm={setForm} />}
            {form === SectionArray[3] && <ServicesSection setForm={setForm} />}
            {form === SectionArray[4] && <PortfolioSection setForm={setForm} />}
            {form === SectionArray[5] && <TestimonialsSection setForm={setForm} />}
            {form === SectionArray[6] && <ContactSection setForm={setForm} />}
            {form === SectionArray[7] && <FooterSection setForm={setForm} />}
            {form === SectionArray[8] && <ProfileCompletionAnimation setForm={setForm} />}
        </div>
    )
}
