import React from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast, ToastContainer } from 'react-toastify';

export default function FooterSection({ setForm }) {
    const currentYear = new Date().getFullYear();

    const validationSchema = Yup.object({
        company: Yup.string()
            .min(2, "Company name must be at least 2 characters")
            .max(50, "Company name must be less than 50 characters")
            .required("Company name is required"),
        year: Yup.number()
            .min(2000, "Year must be 2000 or later")
            .max(2100, "Year must be 2100 or earlier")
            .required("Year is required"),
        copyright_text: Yup.string()
            .max(100, "Copyright text must be less than 100 characters"),
        additional_links: Yup.array().of(
            Yup.object({
                text: Yup.string().min(1, "Link text is required"),
                url: Yup.string().url("Must be a valid URL")
            })
        )
    })

    const formik = useFormik({
        initialValues: {
            company: "",
            year: currentYear,
            copyright_text: "",
            additional_links: [
                { text: "", url: "" }
            ]
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                let url = basicUrl + "/footer"
                // Prepare the data for submission
                const submitData = {
                    company: values.company,
                    year: values.year,
                    copyright_text: values.copyright_text,
                    additional_links: values.additional_links.filter(link => link.text && link.url),
                    steps: 7, // Assuming this is the final step
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
                    toast.success("Footer Information Added successfully! Your portfolio is now complete.")
                    alert("Footer Information Added successfully! Your portfolio is now complete.")
                    setTimeout(() => {
                        // Redirect to portfolio preview or completion page
                        setForm("Completion")
                    }, 1000)
                }else{
                    toast.error("Something Went Wrong !")
                }

            } catch (error) {
                toast.error(`Error ! ${error}`)
            }
        }
    })

    // Add new link field
    const addLink = () => {
        const newLinks = [...formik.values.additional_links, { text: "", url: "" }]
        formik.setFieldValue("additional_links", newLinks)
    }

    // Remove link field
    const removeLink = (index) => {
        if (formik.values.additional_links.length > 1) {
            const newLinks = formik.values.additional_links.filter((_, i) => i !== index)
            formik.setFieldValue("additional_links", newLinks)
        }
    }

    // Handle link change
    const handleLinkChange = (index, field, value) => {
        const newLinks = formik.values.additional_links.map((link, i) => 
            i === index ? { ...link, [field]: value } : link
        )
        formik.setFieldValue("additional_links", newLinks)
    }

    return (
        <div className="container my-1">
            <ToastContainer />
            <div className="row my-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
                    <form onSubmit={formik.handleSubmit} noValidate className="p-4 bg-light rounded-4 shadow-sm">
                        {/* Form Header */}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary mb-2">Footer Information</h2>
                            <p className="text-muted">Add your company details and footer links</p>
                        </div>

                        {/* Company Name */}
                        <div className="mb-4">
                            <label htmlFor="company" className="form-label fw-semibold text-dark">
                                Company Name <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-building text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    className={`form-control border-start-0 ${formik.errors.company && formik.touched.company ? 'is-invalid' : ''}`}
                                    placeholder="TechCorp"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.company}
                                />
                            </div>
                            {formik.errors.company && formik.touched.company && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.company}
                                </div>
                            )}
                        </div>

                        {/* Year */}
                        <div className="mb-4">
                            <label htmlFor="year" className="form-label fw-semibold text-dark">
                                Copyright Year <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-calendar text-muted"></i>
                                </span>
                                <input
                                    type="number"
                                    id="year"
                                    name="year"
                                    className={`form-control border-start-0 ${formik.errors.year && formik.touched.year ? 'is-invalid' : ''}`}
                                    placeholder="2025"
                                    min="2000"
                                    max="2100"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.year}
                                />
                            </div>
                            {formik.errors.year && formik.touched.year && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.year}
                                </div>
                            )}
                            <div className="form-text">
                                Default: Current year ({currentYear})
                            </div>
                        </div>

                        {/* Copyright Text */}
                        <div className="mb-4">
                            <label htmlFor="copyright_text" className="form-label fw-semibold text-dark">
                                Additional Copyright Text
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-c-circle text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    id="copyright_text"
                                    name="copyright_text"
                                    className={`form-control border-start-0 ${formik.errors.copyright_text && formik.touched.copyright_text ? 'is-invalid' : ''}`}
                                    placeholder="All rights reserved."
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.copyright_text}
                                />
                            </div>
                            {formik.errors.copyright_text && formik.touched.copyright_text && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.copyright_text}
                                </div>
                            )}
                            <div className="form-text">
                                Optional additional text after copyright
                            </div>
                        </div>

                        {/* Additional Links */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold text-dark">
                                Additional Footer Links
                            </label>
                            <p className="text-muted mb-3">Add links for privacy policy, terms of service, etc.</p>

                            {formik.values.additional_links.map((link, index) => (
                                <div key={index} className="mb-3 p-3 border rounded bg-white position-relative">
                                    {formik.values.additional_links.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                            onClick={() => removeLink(index)}
                                            title="Remove link"
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    )}

                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold">
                                                Link Text
                                            </label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.errors.additional_links?.[index]?.text ? 'is-invalid' : ''}`}
                                                placeholder="Privacy Policy"
                                                value={link.text}
                                                onChange={(e) => handleLinkChange(index, 'text', e.target.value)}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.additional_links?.[index]?.text && (
                                                <div className="invalid-feedback d-block">
                                                    {formik.errors.additional_links[index].text}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label small fw-semibold">
                                                Link URL
                                            </label>
                                            <input
                                                type="url"
                                                className={`form-control ${formik.errors.additional_links?.[index]?.url ? 'is-invalid' : ''}`}
                                                placeholder="https://example.com/privacy"
                                                value={link.url}
                                                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.errors.additional_links?.[index]?.url && (
                                                <div className="invalid-feedback d-block">
                                                    {formik.errors.additional_links[index].url}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Add More Links Button */}
                            <button
                                type="button"
                                className="btn btn-outline-secondary btn-sm"
                                onClick={addLink}
                            >
                                <i className="bi bi-plus-circle me-1"></i>
                                Add Another Link
                            </button>

                            <div className="form-text mt-2">
                                Links with both text and URL filled will be displayed in the footer
                            </div>
                        </div>

                        {/* Preview Section */}
                        <div className="mb-4 p-3 border rounded bg-dark text-light">
                            <h6 className="fw-semibold mb-2">Footer Preview:</h6>
                            <div className="text-center">
                                <small>
                                    © {formik.values.year || currentYear} {formik.values.company || "Your Company"}. {formik.values.copyright_text}
                                </small>
                                {formik.values.additional_links.some(link => link.text && link.url) && (
                                    <div className="mt-2">
                                        {formik.values.additional_links.map((link, index) => 
                                            link.text && link.url ? (
                                                <span key={index} className="me-3">
                                                    <a href={link.url} className="text-light text-decoration-none">
                                                        {link.text}
                                                    </a>
                                                </span>
                                            ) : null
                                        )}
                                    </div>
                                )}
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
                                        Saving Footer...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-flag-fill me-2"></i>
                                        Complete Portfolio
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