import React from 'react'
import { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'

export default function AboutSection({ about, onUpdateAbout }) {
    const [editBtn, setEditBtn] = useState(false)

    // Fix: Check if about is an array and get the first item
    const aboutData = Array.isArray(about) ? about[0] : about
    const [skillSection, setSkillSection] = useState([])
    const [newSkill, setNewSkill] = useState('')

    // Initialize form values properly
    // AboutSection.js - Line 20 ke around yeh change karein:

    // Initialize form values properly
    const initialValues = {
        bio: aboutData?.bio || '',
        experience: aboutData?.experience || 0,
        projects_count: aboutData?.projects_count || 0,
        skills: (() => {
            // ✅ Pehle check karein already array toh nahi hai
            if (Array.isArray(aboutData?.skills)) {
                return aboutData.skills;
            }

            // ✅ Agar string hai toh parse karein
            if (typeof aboutData?.skills === 'string') {
                try {
                    return JSON.parse(aboutData.skills);
                } catch (error) {
                    console.error('JSON parse error:', error);
                    return [];
                }
            }

            return [];
        })()
    }

    const validationSchema = Yup.object({
        bio: Yup.string().required("Bio is required"),
        experience: Yup.number()
            .positive("Experience must be positive")
            .integer("Experience must be a whole number")
            .required("Experience Required!"),
        projects_count: Yup.number()
            .positive("Project count must be positive")
            .integer("Project count must be a whole number")
            .required("Project Count Required!"),
        skills: Yup.array()
            .min(1, "At least one skill is required")
            .required("Skills are required")
    })

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                values.id = aboutData?.id;

                // ✅ Skills ko JSON string mein convert karein
                const formattedValues = {
                    ...values,
                    skills: JSON.stringify(values.skills), // ✅ YEH LINE UNCOMMENT KAREIN
                };
                let response = await fetch(`${basicUrl}/about`, {
                    method: "PUT",
                    body: JSON.stringify(formattedValues),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                });
                response = await response.json();

                if (response.code == 1) {
                    // ✅ Frontend ke liye bhi skills ko stringify karein
                    let updateData = {
                        ...formattedValues, // ✅ Yeh already stringified skills contain karega
                        is_active: about.is_active,
                        created_at: about.created_at,
                        updated_at: new Date(),
                    };

                    onUpdateAbout(updateData);
                    toast.success("About Section Updated Successfully");
                    alert("About Section Updated Successfully");
                    setEditBtn(false);
                } else {
                    toast.error("About Update Failed");
                    alert("About Update Failed");
                }
            } catch (error) {
                toast.error(`Error in About Update Process :  ${error}`);
                console.error("Error in About Update Process : ", error);
            }
        }
    });

    // Initialize skillSection when component loads
    useEffect(() => {
        if (aboutData?.skills) {
            try {
                const parsedSkills = JSON.parse(aboutData.skills)
                setSkillSection(Array.isArray(parsedSkills) ? parsedSkills : [])
            } catch {
                setSkillSection(typeof aboutData.skills === 'string' ? [aboutData.skills] : [])
            }
        }
    }, [aboutData])

    // Sync skillSection with formik when it changes
    useEffect(() => {
        formik.setFieldValue('skills', skillSection)
    }, [skillSection])

    const handleAddSkill = () => {
        if (newSkill.trim() && !skillSection.includes(newSkill.trim())) {
            const updatedSkills = [...skillSection, newSkill.trim()]
            setSkillSection(updatedSkills)
            setNewSkill('')
        }
    }

    const handleRemoveSkill = (skillToRemove) => {
        const updatedSkills = skillSection.filter(skill => skill !== skillToRemove)
        setSkillSection(updatedSkills)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            handleAddSkill()
        }
    }
    return (
        <>
            {editBtn ? (
                <div className="container-fluid mt-4 mb-3">
                    <ToastContainer />
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card edit-profile-card shadow-lg border-0">
                                <div className="card-header bg-gradient-primary text-white py-4">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-pencil-square me-3 fs-3"></i>
                                        <div>
                                            <h4 className="mb-0 fw-bold text-dark">Edit About Section</h4>
                                            <small className="opacity-75 text-dark">Update your about section details</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body p-4">
                                    <form onSubmit={formik.handleSubmit} className="edit-profile-form">
                                        <div className="row g-4">

                                            {/* Bio Field */}
                                            <div className="col-md-6">
                                                <div className="form-section h-100 p-4 bg-white rounded-3 shadow-sm">
                                                    <h6 className="section-title text-primary mb-4 fw-bold">
                                                        <i className="bi bi-person-badge me-2"></i>
                                                        Bio
                                                    </h6>

                                                    <div className="mb-3">
                                                        <label htmlFor="bio" className="form-label fw-semibold">
                                                            <i className="bi bi-person me-1 text-primary"></i>
                                                            Bio *
                                                        </label>
                                                        <textarea
                                                            className={`form-control ${formik.touched.bio && formik.errors.bio ? 'is-invalid' : ''}`}
                                                            id="bio"
                                                            name="bio"
                                                            rows="4"
                                                            value={formik.values.bio}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter your bio"
                                                        />
                                                        {formik.touched.bio && formik.errors.bio && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.bio}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="experience" className="form-label fw-semibold">
                                                            <i className="bi bi-award me-1 text-primary"></i>
                                                            Experience (years) *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className={`form-control ${formik.touched.experience && formik.errors.experience ? 'is-invalid' : ''}`}
                                                            id="experience"
                                                            name="experience"
                                                            value={formik.values.experience}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter your experience"
                                                        />
                                                        {formik.touched.experience && formik.errors.experience && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.experience}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="projects_count" className="form-label fw-semibold">
                                                            <i className="bi bi-folder me-1 text-primary"></i>
                                                            Projects Count *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className={`form-control ${formik.touched.projects_count && formik.errors.projects_count ? 'is-invalid' : ''}`}
                                                            id="projects_count"
                                                            name="projects_count"
                                                            value={formik.values.projects_count}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter your projects count"
                                                        />
                                                        {formik.touched.projects_count && formik.errors.projects_count && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.projects_count}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Skills Information */}
                                            {/* Skills Section */}
                                            <div className="col-lg-6">
                                                <div className="info-card h-100 p-4 rounded-3">
                                                    <h6 className="section-title text-primary mb-3 fw-bold">
                                                        <i className="bi bi-tools me-2"></i>
                                                        Skills
                                                    </h6>
                                                    <div className="row g-2">
                                                        <div className="col-12">
                                                            <div className="skills-container">
                                                                {(() => {
                                                                    // ✅ Safe skills extraction
                                                                    let skillsToDisplay = [];

                                                                    if (about.skills) {
                                                                        if (Array.isArray(about.skills)) {
                                                                            skillsToDisplay = about.skills;
                                                                        } else if (typeof about.skills === 'string') {
                                                                            try {
                                                                                skillsToDisplay = JSON.parse(about.skills);
                                                                            } catch (error) {
                                                                                console.error('Error parsing skills:', error);
                                                                                // Agar parse nahi ho raha, toh comma separated string assume karein
                                                                                skillsToDisplay = about.skills.split(',').map(s => s.trim());
                                                                            }
                                                                        }
                                                                    }

                                                                    // ✅ Ensure it's an array before mapping
                                                                    if (Array.isArray(skillsToDisplay)) {
                                                                        return skillsToDisplay.map((skill, index) => (
                                                                            <span key={index} className="badge bg-primary me-2 mb-2">
                                                                                {skill}
                                                                            </span>
                                                                        ));
                                                                    }

                                                                    return <span className="text-muted">No skills available</span>;
                                                                })()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="col-12">
                                                <div className="action-buttons pt-4 border-top text-center">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-lg px-5 me-3"
                                                        disabled={!formik.isValid || formik.isSubmitting}
                                                    >
                                                        {formik.isSubmitting ? (
                                                            <>
                                                                <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                                Saving...
                                                            </>
                                                        ) : (
                                                            <>
                                                                <i className="bi bi-check-circle me-2"></i>
                                                                Save Changes
                                                            </>
                                                        )}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary btn-lg px-5"
                                                        onClick={() => setEditBtn(false)}
                                                        disabled={formik.isSubmitting}
                                                    >
                                                        <i className="bi bi-x-circle me-2"></i>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<>


                <div className="card user-profile-card shadow-lg border-0 overflow-hidden mt-4 mb-4">
                    <div className="card-header bg-gradient-primary text-white py-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 fw-bold">
                                <i className="bi bi-person-badge me-2"></i>
                                About Section
                            </h4>
                            <span className="badge bg-light text-primary fs-6">
                                <i className="bi bi-star-fill me-1"></i>
                                Professional
                            </span>
                        </div>
                    </div>

                    <div className="card-body p-4">
                        {about && (
                            <div className="row g-4">

                                <div className="col-lg-6">
                                    <div className="info-card h-100 p-4 rounded-3">
                                        <h6 className="section-title text-primary mb-3 fw-bold">
                                            <i className="bi bi-person-lines-fill me-2"></i>
                                            About Information
                                        </h6>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="d-flex align-items-start mb-3">
                                                    <i className="bi bi-card-text text-primary me-2 fs-5 mt-1"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Bio</small>
                                                        <strong className="text-dark">{about.bio}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-calendar-check text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Experience</small>
                                                        <strong className="text-dark">{about.experience} years</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-folder2-open text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Projects Count</small>
                                                        <strong className="text-dark">{about.projects_count}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Skills Section */}
                                <div className="col-lg-6">
                                    <div className="info-card h-100 p-4 rounded-3">
                                        <h6 className="section-title text-primary mb-3 fw-bold">
                                            <i className="bi bi-tools me-2"></i>
                                            Skills
                                        </h6>
                                        <div className="row g-2">
                                            <div className="col-12">
                                                <div className="skills-container">
                                                    {about.skills && (() => {
                                                        try {
                                                            // Check if skills is already an array
                                                            if (Array.isArray(about.skills)) {
                                                                return about.skills.map((skill, index) => (
                                                                    <span key={index} className="badge bg-primary me-2 mb-2">
                                                                        {skill}
                                                                    </span>
                                                                ));
                                                            }

                                                            // Try to parse if it's a string
                                                            const skillsArray = typeof about.skills === 'string'
                                                                ? JSON.parse(about.skills)
                                                                : about.skills;

                                                            // Check if parsed result is an array
                                                            if (Array.isArray(skillsArray)) {
                                                                return skillsArray.map((skill, index) => (
                                                                    <span key={index} className="badge bg-primary me-2 mb-2">
                                                                        {skill}
                                                                    </span>
                                                                ));
                                                            }

                                                            return null;
                                                        } catch (error) {
                                                            console.error('Error parsing skills:', error);
                                                            return null;
                                                        }
                                                    })()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Timestamps */}
                                <div className="col-12">
                                    <div className="status-card p-4 rounded-3">
                                        <div className="row g-4">
                                            <div className="col-md-4">
                                                <div className="text-center p-3 rounded">
                                                    <div className={`status-indicator ${about.is_active ? 'active' : 'inactive'} mb-2`}>
                                                        <i className={`bi ${about.is_active ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} fs-2`}></i>
                                                    </div>
                                                    <small className="text-muted d-block">Account Status</small>
                                                    <strong className={about.is_active ? "text-success" : "text-danger"}>
                                                        {about.is_active ? 'Active' : 'Inactive'}
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-center p-3 rounded">
                                                    <i className="bi bi-calendar-plus text-primary fs-2 mb-2"></i>
                                                    <small className="text-muted d-block">Created Date</small>
                                                    <strong className="text-dark">
                                                        {new Date(about.created_at).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-center p-3 rounded">
                                                    <i className="bi bi-arrow-clockwise text-primary fs-2 mb-2"></i>
                                                    <small className="text-muted d-block">Last Updated</small>
                                                    <strong className="text-dark">
                                                        {new Date(about.updated_at).toLocaleDateString('en-IN', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Edit Button */}
                        <div className="text-center mt-4 pt-3 border-top">
                            <button
                                className="btn btn-primary btn-lg px-5 py-3 fw-bold edit-btn"
                                onClick={() => setEditBtn(true)}
                            >
                                <i className="bi bi-pencil-square me-2"></i>
                                Edit About Information
                            </button>
                        </div>
                    </div>
                </div>
                <style jsx>{`
    .user-profile-card {
        border-radius: 20px;
        background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }
    
    .bg-gradient-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    }
    
    .bg-gradient-light {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .info-card {
        background: rgba(255, 255, 255, 0.9);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
    
    .status-card {
        background: rgba(255, 255, 255, 0.8);
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
    
    .profile-image {
        transition: transform 0.3s ease;
    }
    
    .profile-image:hover {
        transform: scale(1.05);
    }
    
    .status-indicator.active {
        color: #28a745;
    }
    
    .status-indicator.inactive {
        color: #dc3545;
    }
    
    .section-title {
        border-bottom: 2px solid #667eea;
        padding-bottom: 0.5rem;
    }
    
    .edit-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 50px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    
    .edit-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
    
    .profile-placeholder {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }
`}</style>
            </>
            )}

        </>
    )
}