import React, { useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast, ToastContainer } from 'react-toastify'

export default function TestimonialsSection({ setForm }) {
    const [testimonials, setTestimonials] = useState([
        { client_name: "", testimonial: "", logo: null }
    ])
    const [logoPreviews, setLogoPreviews] = useState([])

    const validationSchema = Yup.object({
        testimonials: Yup.array().of(
            Yup.object({
                client_name: Yup.string().min(2, "Client name must be at least 2 characters").required("Client name is required"),
                testimonial: Yup.string().min(10, "Testimonial must be at least 10 characters").required("Testimonial is required"),
                logo: Yup.mixed().required("Client logo is required")
            })
        ).min(1, "At least one testimonial is required")
    })

    const formik = useFormik({
        initialValues: { testimonials },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                
                // First upload all logos
                const testimonialsWithLogos = await Promise.all(
                    values.testimonials.map(async (testimonial, index) => {
                        if (testimonial.logo instanceof File) {
                            const formData = new FormData()
                            formData.append("profile_img", testimonial.logo)
                            
                            let url = basicUrl + "/upload-profile"
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
                                    ...testimonial,
                                    logo: response.data
                                }
                            }
                        }
                        return testimonial
                    })
                )

                // Now submit testimonials data
                let url = basicUrl + "/testimonials"
                const submitData = {
                    testimonials: testimonialsWithLogos,
                    steps: 5, // Assuming this is step 5
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
                    setTestimonials([{ client_name: "", testimonial: "", logo: null }])
                    setLogoPreviews([])
                    toast.success("Testimonials Added successfully! Moving to next step.")
                    alert("Testimonials Added successfully! Moving to next step.")
                    setTimeout(() => {
                        setForm("Contact") // Replace with your next form component
                    }, 1000)
                }else{
                    toast.error("Something Went Wrong !")
                }

            } catch (error) {
                console.error("Error !", error)
                toast.error(`Error !", ${error}`)
            }
        }
    })

    // Add new testimonial field
    const addTestimonial = () => {
        const newTestimonials = [...testimonials, { client_name: "", testimonial: "", logo: null }]
        setTestimonials(newTestimonials)
        formik.setFieldValue("testimonials", newTestimonials)
    }

    // Remove testimonial field
    const removeTestimonial = (index) => {
        if (testimonials.length > 1) {
            const newTestimonials = testimonials.filter((_, i) => i !== index)
            const newPreviews = logoPreviews.filter((_, i) => i !== index)
            setTestimonials(newTestimonials)
            setLogoPreviews(newPreviews)
            formik.setFieldValue("testimonials", newTestimonials)
        }
    }

    // Handle input change for testimonial fields
    const handleTestimonialChange = (index, field, value) => {
        const newTestimonials = testimonials.map((testimonial, i) => 
            i === index ? { ...testimonial, [field]: value } : testimonial
        )
        setTestimonials(newTestimonials)
        formik.setFieldValue("testimonials", newTestimonials)
    }

    // Handle logo upload for testimonial
    const handleLogoUpload = (index, file) => {
        const newTestimonials = testimonials.map((testimonial, i) => 
            i === index ? { ...testimonial, logo: file } : testimonial
        )
        
        const newPreviews = [...logoPreviews]
        const previewUrl = URL.createObjectURL(file)
        newPreviews[index] = previewUrl
        
        setTestimonials(newTestimonials)
        setLogoPreviews(newPreviews)
        formik.setFieldValue("testimonials", newTestimonials)
    }

    return (
        <div className="container my-1">
            <ToastContainer />
            <div className="row my-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-8 mx-auto">
                    <form onSubmit={formik.handleSubmit} noValidate className="p-4 bg-light rounded-4 shadow-sm">
                        {/* Form Header */}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary mb-2">Clients & Testimonials</h2>
                            <p className="text-muted">Showcase client feedback and company logos</p>
                        </div>

                        {/* Testimonials List */}
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-3 bg-white position-relative">
                                {/* Remove button for additional testimonials */}
                                {testimonials.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                        onClick={() => removeTestimonial(index)}
                                        title="Remove testimonial"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                )}

                                <h5 className="text-secondary mb-3">
                                    Testimonial {index + 1}
                                </h5>

                                {/* Client Name */}
                                <div className="mb-3">
                                    <label htmlFor={`client-name-${index}`} className="form-label fw-semibold text-dark">
                                        Client/Company Name <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-building text-muted"></i>
                                        </span>
                                        <input
                                            type="text"
                                            id={`client-name-${index}`}
                                            className={`form-control border-start-0 ${
                                                formik.errors.testimonials?.[index]?.client_name && formik.touched.testimonials?.[index]?.client_name ? 'is-invalid' : ''
                                            }`}
                                            placeholder="e.g., Company A, Tech Corp Inc"
                                            value={testimonial.client_name}
                                            onChange={(e) => handleTestimonialChange(index, 'client_name', e.target.value)}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.errors.testimonials?.[index]?.client_name && formik.touched.testimonials?.[index]?.client_name && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.testimonials[index].client_name}
                                        </div>
                                    )}
                                </div>

                                {/* Testimonial Text */}
                                <div className="mb-3">
                                    <label htmlFor={`testimonial-text-${index}`} className="form-label fw-semibold text-dark">
                                        Testimonial <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 align-items-start pt-2">
                                            <i className="bi bi-chat-quote text-muted"></i>
                                        </span>
                                        <textarea
                                            rows={4}
                                            id={`testimonial-text-${index}`}
                                            className={`form-control border-start-0 ${
                                                formik.errors.testimonials?.[index]?.testimonial && formik.touched.testimonials?.[index]?.testimonial ? 'is-invalid' : ''
                                            }`}
                                            placeholder="What did the client say about your work? e.g., John delivered our project on time with great quality..."
                                            value={testimonial.testimonial}
                                            onChange={(e) => handleTestimonialChange(index, 'testimonial', e.target.value)}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.errors.testimonials?.[index]?.testimonial && formik.touched.testimonials?.[index]?.testimonial && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.testimonials[index].testimonial}
                                        </div>
                                    )}
                                    <div className="form-text">
                                        Minimum 20 characters required. Write what the client said about your work.
                                    </div>
                                </div>

                                {/* Client Logo */}
                                <div className="mb-3">
                                    <label htmlFor={`client-logo-${index}`} className="form-label fw-semibold text-dark">
                                        Client Logo <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-image text-muted"></i>
                                        </span>
                                        <input
                                            type="file"
                                            id={`client-logo-${index}`}
                                            accept="image/*"
                                            className={`form-control border-start-0 ${
                                                formik.errors.testimonials?.[index]?.logo && formik.touched.testimonials?.[index]?.logo ? 'is-invalid' : ''
                                            }`}
                                            onChange={(e) => handleLogoUpload(index, e.target.files[0])}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.errors.testimonials?.[index]?.logo && formik.touched.testimonials?.[index]?.logo && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.testimonials[index].logo}
                                        </div>
                                    )}
                                    <div className="form-text">
                                        Supported formats: JPG, PNG, SVG. Max size: 2MB. Square logos work best.
                                    </div>

                                    {/* Logo Preview */}
                                    {logoPreviews[index] && (
                                        <div className="mt-3">
                                            <label className="form-label fw-semibold text-dark">
                                                Logo Preview
                                            </label>
                                            <div className='d-flex justify-content-center'>
                                                <img
                                                    src={logoPreviews[index]}
                                                    alt="Client logo preview"
                                                    className="img-thumbnail rounded"
                                                    style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain' }}
                                                />
                                            </div>
                                            <div className="form-text text-center mt-2">
                                                Selected: {testimonials[index]?.logo?.name}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        {/* Add More Testimonials Button */}
                        <div className="mb-4 text-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={addTestimonial}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add More Testimonials
                            </button>
                            <div className="form-text mt-2">
                                Currently {testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''} added
                            </div>
                        </div>

                        {/* Array-level validation error */}
                        {formik.errors.testimonials && typeof formik.errors.testimonials === 'string' && (
                            <div className="alert alert-warning d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {formik.errors.testimonials}
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
                                        Adding Testimonials...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Save Testimonials
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