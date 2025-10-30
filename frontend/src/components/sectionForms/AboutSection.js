import React, { useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify'

export default function AboutSection({ setForm }) {
    const [skillInput, setSkillInput] = useState("")
    const [skills, setSkills] = useState([])

    const initalState = {
        bio: "",
        experience: "",
        projects_count: "",
        skills: []
    }

    const validationSchema = Yup.object({
        bio: Yup.string().min(5, "Bio should be at least 5 characters long").required("Bio Required!"),
        experience: Yup.number().positive("Experience must be positive").integer("Experience must be a whole number").required("Experience Required!"),
        projects_count: Yup.number().positive("Project count must be positive").integer("Project count must be a whole number").required("Project Count Required!"),
        skills: Yup.array()
            .min(1, "At least one skill is required")
            .required("Skills are required")
    })

    const formik = useFormik({
        initialValues: initalState,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                let url = basicUrl + "/about"                
                // Prepare the data for submission
                const submitData = {
                    bio: values.bio,
                    experience: values.experience,
                    projects_count: values.projects_count,
                    skills: values.skills,
                    steps: 3, // Assuming this is step 2
                    userId: parseInt(localStorage.getItem("userId") || 1)
                }

                let response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(submitData),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                })
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                response = await response.json()                
                if (response.code == 1) {
                    resetForm()
                    setSkills([])
                    setSkillInput("")
                    toast.success("About Section Added Successfully")
                    alert("About Section Added now Forward to Next Step")
                    setTimeout(() => {
                        setForm("Services")
                    }, 1000)
                }

            } catch (error) {
                console.error("Error !", error)
                toast.error(`Error ! ${error}`)
            }
        }
    })

    // Add skill to the array
    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            const newSkills = [...skills, skillInput.trim()]
            setSkills(newSkills)
            formik.setFieldValue("skills", newSkills)
            setSkillInput("")
        }
    }

    // Remove skill from the array
    const removeSkill = (skillToRemove) => {
        const newSkills = skills.filter(skill => skill !== skillToRemove)
        setSkills(newSkills)
        formik.setFieldValue("skills", newSkills)
    }

    // Handle Enter key press in skill input
    const handleSkillKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addSkill()
        }
    }

    return (
        <div className="container my-1">
            <ToastContainer />
            <div className="row my-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
                    <form onSubmit={formik.handleSubmit} noValidate className="p-4 bg-light rounded-4 shadow-sm">
                        {/* Form Header */}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary mb-2">About Section</h2>
                            <p className="text-muted">Tell us about yourself and your skills</p>
                        </div>

                        {/* Bio Field */}
                        <div className="mb-4">
                            <label htmlFor="bio" className="form-label fw-semibold text-dark">
                                Bio <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-person-lines-fill text-muted"></i>
                                </span>
                                <textarea
                                    rows={4}
                                    id="bio"
                                    name="bio"
                                    className={`form-control border-start-0 ${formik.errors.bio && formik.touched.bio ? 'is-invalid' : ''}`}
                                    placeholder="Write a brief description about yourself..."
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.bio}
                                />
                            </div>
                            {formik.errors.bio && formik.touched.bio && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.bio}
                                </div>
                            )}
                        </div>

                        {/* Experience Field */}
                        <div className="mb-4">
                            <label htmlFor="experience" className="form-label fw-semibold text-dark">
                                Years of Experience <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-briefcase text-muted"></i>
                                </span>
                                <input
                                    type="number"
                                    id="experience"
                                    name="experience"
                                    className={`form-control border-start-0 ${formik.errors.experience && formik.touched.experience ? 'is-invalid' : ''}`}
                                    placeholder="5"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.experience}
                                    min="0"
                                />
                            </div>
                            {formik.errors.experience && formik.touched.experience && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.experience}
                                </div>
                            )}
                        </div>

                        {/* Projects Count Field */}
                        <div className="mb-4">
                            <label htmlFor="projects_count" className="form-label fw-semibold text-dark">
                                Number of Projects <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-folder-fill text-muted"></i>
                                </span>
                                <input
                                    type="number"
                                    id="projects_count"
                                    name="projects_count"
                                    className={`form-control border-start-0 ${formik.errors.projects_count && formik.touched.projects_count ? 'is-invalid' : ''}`}
                                    placeholder="50"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.projects_count}
                                    min="0"
                                />
                            </div>
                            {formik.errors.projects_count && formik.touched.projects_count && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.projects_count}
                                </div>
                            )}
                        </div>

                        {/* Skills Field */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold text-dark">
                                Skills <span className="text-danger">*</span>
                            </label>
                            
                            {/* Skill Input with Add Button */}
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter a skill (e.g., React, Node.js, Python)"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={handleSkillKeyPress}
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={addSkill}
                                    disabled={!skillInput.trim()}
                                >
                                    <i className="bi bi-plus-circle me-1"></i>
                                    Add Skill
                                </button>
                            </div>

                            {/* Skills Display */}
                            {skills.length > 0 && (
                                <div className="mt-3">
                                    <label className="form-label fw-semibold text-dark mb-3">
                                        Added Skills ({skills.length})
                                    </label>
                                    <div className="d-flex flex-wrap gap-2">
                                        {skills.map((skill, index) => (
                                            <div key={index} className="bg-primary text-white rounded-pill px-3 py-1 d-flex align-items-center">
                                                <span className="me-2">{skill}</span>
                                                <button
                                                    type="button"
                                                    className="btn-close btn-close-white"
                                                    style={{ fontSize: '0.7rem' }}
                                                    onClick={() => removeSkill(skill)}
                                                    aria-label={`Remove ${skill}`}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Skills Validation Error */}
                            {formik.errors.skills && formik.touched.skills && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.skills}
                                </div>
                            )}
                            
                            <div className="form-text">
                                Add your skills one by one. Click the "Add Skill" button or press Enter to add.
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4 pt-3 border-top">
                            <button
                                type="submit"
                                className="btn btn-success text-white w-100 py-3 fw-bold fs-5 rounded-3 shadow-sm"
                                disabled={!formik.isValid || formik.isSubmitting}
                            >
                                {formik.isSubmitting ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Add About Section
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}