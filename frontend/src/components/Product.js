import React, { useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"

export default function PortfolioSection({ setForm }) {
    const [projects, setProjects] = useState([
        { title: "", description: "", link: "", image: null }
    ])
    const [imagePreviews, setImagePreviews] = useState([])

    const validationSchema = Yup.object({
        projects: Yup.array().of(
            Yup.object({
                title: Yup.string().min(3, "Title must be at least 3 characters").required("Project title is required"),
                description: Yup.string().min(10, "Description must be at least 10 characters").required("Project description is required"),
                link: Yup.string().url("Must be a valid URL").required("Project link is required"),
                image: Yup.mixed().required("Project image is required")
            })
        ).min(1, "At least one project is required")
    })

    const formik = useFormik({
        initialValues: { projects },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                
                // First upload all images
                const projectsWithImages = await Promise.all(
                    values.projects.map(async (project, index) => {
                        if (project.image instanceof File) {
                            const formData = new FormData()
                            formData.append("profile_img", project.image)
                            
                            let url = basicUrl + "/upload-project"
                            let response = await fetch(url, {
                                method: "POST",
                                body: formData,
                                headers: {
                                    'Accept': 'application/json',
                                },
                            })
                            response = await response.json()
                            
                            if (response.code == 1) {
                                return {
                                    ...project,
                                    image: response.data
                                }
                            }
                        }
                        return project
                    })
                )

                // Now submit projects data
                let url = basicUrl + "/portfolio"
                const submitData = {
                    projects: projectsWithImages,
                    steps: 4, // Assuming this is step 4
                    user_id: parseInt(localStorage.getItem("userId") || 1)
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
                console.log("Response of Portfolio : ", response)
                
                if (response.code == 1) {
                    resetForm()
                    setProjects([{ title: "", description: "", link: "", image: null }])
                    setImagePreviews([])
                    alert("Projects Added successfully! Moving to next step.")
                    setTimeout(() => {
                        setForm("Clients & Testimonials") // Replace with your next form component
                    }, 1000)
                }

            } catch (error) {
                console.error("Error !", error)
            }
        }
    })

    // Add new project field
    const addProject = () => {
        const newProjects = [...projects, { title: "", description: "", link: "", image: null }]
        setProjects(newProjects)
        formik.setFieldValue("projects", newProjects)
    }

    // Remove project field
    const removeProject = (index) => {
        if (projects.length > 1) {
            const newProjects = projects.filter((_, i) => i !== index)
            const newPreviews = imagePreviews.filter((_, i) => i !== index)
            setProjects(newProjects)
            setImagePreviews(newPreviews)
            formik.setFieldValue("projects", newProjects)
        }
    }

    // Handle input change for project fields
    const handleProjectChange = (index, field, value) => {
        const newProjects = projects.map((project, i) => 
            i === index ? { ...project, [field]: value } : project
        )
        setProjects(newProjects)
        formik.setFieldValue("projects", newProjects)
    }

    // Handle image upload for project
    const handleImageUpload = (index, file) => {
        const newProjects = projects.map((project, i) => 
            i === index ? { ...project, image: file } : project
        )
        
        const newPreviews = [...imagePreviews]
        const previewUrl = URL.createObjectURL(file)
        newPreviews[index] = previewUrl
        
        setProjects(newProjects)
        setImagePreviews(newPreviews)
        formik.setFieldValue("projects", newProjects)
    }

    return (
        <div className="container my-1">
            <div className="row my-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-8 mx-auto">
                    <form onSubmit={formik.handleSubmit} noValidate className="p-4 bg-light rounded-4 shadow-sm">
                        {/* Form Header */}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary mb-2">Portfolio Projects</h2>
                            <p className="text-muted">Showcase your best work and projects</p>
                        </div>

                        {/* Projects List */}
                        {projects.map((project, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-3 bg-white position-relative">
                                {/* Remove button for additional projects */}
                                {projects.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                        onClick={() => removeProject(index)}
                                        title="Remove project"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                )}

                                <h5 className="text-secondary mb-3">
                                    Project {index + 1}
                                </h5>

                                {/* Project Title */}
                                <div className="mb-3">
                                    <label htmlFor={`project-title-${index}`} className="form-label fw-semibold text-dark">
                                        Project Title <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-laptop text-muted"></i>
                                        </span>
                                        <input
                                            type="text"
                                            id={`project-title-${index}`}
                                            className={`form-control border-start-0 ${
                                                formik.errors.projects?.[index]?.title && formik.touched.projects?.[index]?.title ? 'is-invalid' : ''
                                            }`}
                                            placeholder="e.g., E-commerce Platform, Portfolio Website"
                                            value={project.title}
                                            onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.errors.projects?.[index]?.title && formik.touched.projects?.[index]?.title && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.projects[index].title}
                                        </div>
                                    )}
                                </div>

                                {/* Project Description */}
                                <div className="mb-3">
                                    <label htmlFor={`project-description-${index}`} className="form-label fw-semibold text-dark">
                                        Project Description <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 align-items-start pt-2">
                                            <i className="bi bi-text-paragraph text-muted"></i>
                                        </span>
                                        <textarea
                                            rows={3}
                                            id={`project-description-${index}`}
                                            className={`form-control border-start-0 ${
                                                formik.errors.projects?.[index]?.description && formik.touched.projects?.[index]?.description ? 'is-invalid' : ''
                                            }`}
                                            placeholder="Describe the project, technologies used, features, etc."
                                            value={project.description}
                                            onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.errors.projects?.[index]?.description && formik.touched.projects?.[index]?.description && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.projects[index].description}
                                        </div>
                                    )}
                                </div>

                                {/* Project Link */}
                                <div className="mb-3">
                                    <label htmlFor={`project-link-${index}`} className="form-label fw-semibold text-dark">
                                        Project Link <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-link-45deg text-muted"></i>
                                        </span>
                                        <input
                                            type="url"
                                            id={`project-link-${index}`}
                                            className={`form-control border-start-0 ${
                                                formik.errors.projects?.[index]?.link && formik.touched.projects?.[index]?.link ? 'is-invalid' : ''
                                            }`}
                                            placeholder="https://example.com"
                                            value={project.link}
                                            onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.errors.projects?.[index]?.link && formik.touched.projects?.[index]?.link && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.projects[index].link}
                                        </div>
                                    )}
                                </div>

                                {/* Project Image */}
                                <div className="mb-3">
                                    <label htmlFor={`project-image-${index}`} className="form-label fw-semibold text-dark">
                                        Project Image <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-image text-muted"></i>
                                        </span>
                                        <input
                                            type="file"
                                            id={`project-image-${index}`}
                                            accept="image/*"
                                            className={`form-control border-start-0 ${
                                                formik.errors.projects?.[index]?.image && formik.touched.projects?.[index]?.image ? 'is-invalid' : ''
                                            }`}
                                            onChange={(e) => handleImageUpload(index, e.target.files[0])}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.errors.projects?.[index]?.image && formik.touched.projects?.[index]?.image && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.projects[index].image}
                                        </div>
                                    )}
                                    <div className="form-text">
                                        Supported formats: JPG, PNG, GIF. Max size: 5MB
                                    </div>

                                    {/* Image Preview */}
                                    {imagePreviews[index] && (
                                        <div className="mt-3">
                                            <label className="form-label fw-semibold text-dark">
                                                Image Preview
                                            </label>
                                            <div className='d-flex justify-content-center'>
                                                <img
                                                    src={imagePreviews[index]}
                                                    alt="Project preview"
                                                    className="img-thumbnail rounded"
                                                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Add More Projects Button */}
                        <div className="mb-4 text-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={addProject}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add More Projects
                            </button>
                            <div className="form-text mt-2">
                                Currently {projects.length} project{projects.length !== 1 ? 's' : ''} added
                            </div>
                        </div>

                        {/* Array-level validation error */}
                        {formik.errors.projects && typeof formik.errors.projects === 'string' && (
                            <div className="alert alert-warning d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {formik.errors.projects}
                            </div>
                        )}

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
                                        Adding Projects...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Save Portfolio Projects
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