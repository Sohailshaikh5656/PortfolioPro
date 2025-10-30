import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';

export default function FooterSection({ footer , onUpdateFooter}) {
    // State for edit mode and additional links management
    const [editBtn, setEditBtn] = useState(false);
    
    // Parse initial additional links from footer prop
    const parseAdditionalLinks = () => {
        try {
            if (footer?.additional_links) {
                const links = JSON.parse(footer.additional_links);
                // Ensure it's an array and has proper structure
                if (Array.isArray(links)) {
                    return links.map(link => 
                        typeof link === 'string' 
                            ? { text: link, url: '' } 
                            : { text: link.text || '', url: link.url || '' }
                    );
                }
            }
        } catch (error) {
            console.error("Error parsing additional links:", error);
        }
        // Return default empty link if parsing fails
        return [{ text: '', url: '' }];
    };

    // Initial state with proper fallbacks
    const initialState = {
        company: footer?.company || '',
        copyright_text: footer?.copyright_text || '',
        year: footer?.year || new Date().getFullYear(),
        additional_links: parseAdditionalLinks(),
    };
    // Validation schema
    const validationSchema = Yup.object({
        company: Yup.string().required("Company name is required"),
        copyright_text: Yup.string().required("Copyright text is required"),
        year: Yup.number()
            .positive("Year must be positive")
            .integer("Year must be a whole number")
            .min(2000, "Year must be after 2000")
            .max(new Date().getFullYear() + 1, "Year cannot be in the future")
            .required("Year is required"),
        additional_links: Yup.array()
            .of(
                Yup.object({
                    text: Yup.string().required("Link text is required"),
                    url: Yup.string().url("Must be a valid URL").required("URL is required")
                })
            )
            .min(1, "At least one additional link is required")
    });

    // Formik setup
    const formik = useFormik({
        initialValues: initialState,
        validationSchema: validationSchema,
        enableReinitialize: true, // Important for when initialValues change
        onSubmit: async (values) => {
            try {
                const basicUrl = process.env.REACT_APP_BACKEND_URL;
                
                // Prepare data for submission
                const submitData = {
                    id: footer?.id,
                    company: values.company,
                    copyright_text: values.copyright_text,
                    year: values.year,
                    additional_links: JSON.stringify(values.additional_links)
                };

                // Update footer info
                let response = await fetch(`${basicUrl}/footer`, {
                    method: "PUT",
                    body: JSON.stringify(submitData),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                });
                
                response = await response.json();

                if (response.code == 1) {
                    onUpdateFooter({
                        ...submitData,
                        is_active: footer.is_active,
                        created_at: footer.created_at,
                        updated_at: new Date()
                    })
                    toast.success("Footer Updated Successfully");
                    alert("Footer Updated Successfully");
                    setEditBtn(false);
                } else {
                    toast.error("Footer Update Failed");
                    alert("Footer Update Failed");
                }

            } catch (error) {
                console.error("Error in Footer Update Process:", error);
                toast.error("Error updating footer");
                alert("Error updating footer");
            }
        }
    });

    // Handler functions for additional links
    const handleAddLink = () => {
        // Add new empty link to the array
        const newLinks = [...formik.values.additional_links, { text: '', url: '' }];
        formik.setFieldValue('additional_links', newLinks);
    };

    const handleRemoveLink = (index) => {
        // Remove link at specified index, but keep at least one link
        if (formik.values.additional_links.length > 1) {
            const newLinks = formik.values.additional_links.filter((_, i) => i !== index);
            formik.setFieldValue('additional_links', newLinks);
        } else {
            alert("At least one link is required");
        }
    };

    const handleLinkTextChange = (value, index) => {
        // Update text of specific link
        const newLinks = formik.values.additional_links.map((link, i) =>
            i === index ? { ...link, text: value } : link
        );
        formik.setFieldValue('additional_links', newLinks);
    };

    const handleLinkUrlChange = (value, index) => {
        // Update URL of specific link
        const newLinks = formik.values.additional_links.map((link, i) =>
            i === index ? { ...link, url: value } : link
        );
        formik.setFieldValue('additional_links', newLinks);
    };

    return (
        <>
            {editBtn ? (
                // EDIT MODE
                <div className="container-fluid mt-4">
                    <ToastContainer />
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card edit-profile-card shadow-lg border-0">
                                <div className="card-header bg-gradient-primary text-white py-4">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-pencil-square me-3 fs-3"></i>
                                        <div>
                                            <h4 className="mb-0 fw-bold">Edit Footer Section</h4>
                                            <small className="opacity-75">Update your footer section details</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body p-4">
                                    <form onSubmit={formik.handleSubmit} className="edit-profile-form">
                                        <div className="row g-4">

                                            {/* Company Information Section */}
                                            <div className="col-md-6">
                                                <div className="form-section h-100 p-4 bg-white rounded-3 shadow-sm">
                                                    <h6 className="section-title text-primary mb-4 fw-bold">
                                                        <i className="bi bi-building me-2"></i>
                                                        Company Information
                                                    </h6>

                                                    {/* Company Name Field */}
                                                    <div className="mb-3">
                                                        <label htmlFor="company" className="form-label fw-semibold">
                                                            <i className="bi bi-building me-1 text-primary"></i>
                                                            Company *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control form-control-lg ${formik.touched.company && formik.errors.company ? 'is-invalid' : ''}`}
                                                            id="company"
                                                            name="company"
                                                            value={formik.values.company}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter company name"
                                                        />
                                                        {formik.touched.company && formik.errors.company && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.company}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Copyright Text Field */}
                                                    <div className="mb-3">
                                                        <label htmlFor="copyright_text" className="form-label fw-semibold">
                                                            <i className="bi bi-c-circle me-1 text-primary"></i>
                                                            Copyright Text *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control form-control-lg ${formik.touched.copyright_text && formik.errors.copyright_text ? 'is-invalid' : ''}`}
                                                            id="copyright_text"
                                                            name="copyright_text"
                                                            value={formik.values.copyright_text}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter copyright text"
                                                        />
                                                        {formik.touched.copyright_text && formik.errors.copyright_text && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.copyright_text}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Year Field */}
                                                    <div className="mb-3">
                                                        <label htmlFor="year" className="form-label fw-semibold">
                                                            <i className="bi bi-calendar me-1 text-primary"></i>
                                                            Year *
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className={`form-control form-control-lg ${formik.touched.year && formik.errors.year ? 'is-invalid' : ''}`}
                                                            id="year"
                                                            name="year"
                                                            value={formik.values.year}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter year"
                                                        />
                                                        {formik.touched.year && formik.errors.year && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.year}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Additional Links Section */}
                                            <div className="col-md-6">
                                                <div className="form-section h-100 p-4 bg-white rounded-3 shadow-sm">
                                                    <h6 className="section-title text-primary mb-4 fw-bold">
                                                        <i className="bi bi-link-45deg me-2"></i>
                                                        Additional Links
                                                    </h6>

                                                    <div className="mb-3">
                                                        <label className="form-label fw-semibold">
                                                            <i className="bi bi-links me-1 text-primary"></i>
                                                            Additional Links *
                                                        </label>
                                                        
                                                        {/* Render each additional link */}
                                                        {formik.values.additional_links.map((link, index) => (
                                                            <div key={index} className="link-field-group mb-3 p-3 border rounded">
                                                                <div className="d-flex justify-content-between align-items-center mb-2">
                                                                    <small className="text-muted">Link {index + 1}</small>
                                                                    {formik.values.additional_links.length > 1 && (
                                                                        <button
                                                                            type="button"
                                                                            className="btn btn-danger btn-sm"
                                                                            onClick={() => handleRemoveLink(index)}
                                                                        >
                                                                            <i className="bi bi-trash"></i> Remove
                                                                        </button>
                                                                    )}
                                                                </div>

                                                                {/* Link Text Input */}
                                                                <div className='d-flex mb-2'>
                                                                    <input
                                                                        type="text"
                                                                        className={`form-control ${formik.touched.additional_links?.[index]?.text && formik.errors.additional_links?.[index]?.text ? 'is-invalid' : ''}`}
                                                                        value={link.text}
                                                                        onChange={(e) => handleLinkTextChange(e.target.value, index)}
                                                                        onBlur={formik.handleBlur}
                                                                        placeholder="Enter link text (e.g., Portfolio, LinkedIn)"
                                                                    />
                                                                </div>

                                                                {/* Link URL Input */}
                                                                <div className='d-flex'>
                                                                    <input
                                                                        type="text"
                                                                        className={`form-control ${formik.touched.additional_links?.[index]?.url && formik.errors.additional_links?.[index]?.url ? 'is-invalid' : ''}`}
                                                                        value={link.url}
                                                                        onChange={(e) => handleLinkUrlChange(e.target.value, index)}
                                                                        onBlur={formik.handleBlur}
                                                                        placeholder="Enter URL (e.g., https://example.com)"
                                                                    />
                                                                </div>

                                                                {/* Field-specific error messages */}
                                                                {formik.touched.additional_links?.[index]?.text && formik.errors.additional_links?.[index]?.text && (
                                                                    <div className="text-danger small mt-1">
                                                                        {formik.errors.additional_links[index].text}
                                                                    </div>
                                                                )}
                                                                {formik.touched.additional_links?.[index]?.url && formik.errors.additional_links?.[index]?.url && (
                                                                    <div className="text-danger small mt-1">
                                                                        {formik.errors.additional_links[index].url}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}

                                                        {/* Array-level error message */}
                                                        {formik.touched.additional_links && formik.errors.additional_links && typeof formik.errors.additional_links === 'string' && (
                                                            <div className="invalid-feedback d-block">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.additional_links}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Add More Links Button */}
                                                    <div className='d-flex'>
                                                        <button 
                                                            type="button" 
                                                            className='btn btn-primary'
                                                            onClick={handleAddLink}
                                                        >
                                                            <i className="bi bi-plus-circle me-2"></i>
                                                            Add Another Link
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="col-12">
                                                <div className="action-buttons pt-4 border-top text-center">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary btn-lg px-5 me-3"
                                                        disabled={formik.isSubmitting}
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
            ) : (
                // VIEW MODE
                <div className="card user-profile-card shadow-lg border-0 overflow-hidden mt-4">
                    <div className="card-header bg-gradient-primary text-white py-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 fw-bold">
                                <i className="bi bi-person-badge me-2"></i>
                                Footer Section
                            </h4>
                            <span className="badge bg-light text-primary fs-6">
                                <i className="bi bi-star-fill me-1"></i>
                                Professional
                            </span>
                        </div>
                    </div>

                    <div className="card-body p-4">
                        {footer && (
                            <div className="row g-4">
                                {/* Company Information */}
                                <div className="col-lg-6">
                                    <div className="info-card h-100 p-4 rounded-3">
                                        <h6 className="section-title text-primary mb-3 fw-bold">
                                            <i className="bi bi-building me-2"></i>
                                            Company Information
                                        </h6>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="d-flex align-items-start mb-3">
                                                    <i className="bi bi-building text-primary me-2 fs-5 mt-1"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Company</small>
                                                        <strong className="text-dark">{footer.company}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-c-circle text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Copyright Text</small>
                                                        <strong className="text-dark">{footer.copyright_text}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-calendar text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Year</small>
                                                        <strong className="text-dark">{footer.year}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Links Section */}
                                <div className="col-lg-6">
                                    <div className="info-card h-100 p-4 rounded-3">
                                        <h6 className="section-title text-primary mb-3 fw-bold">
                                            <i className="bi bi-link-45deg me-2"></i>
                                            Additional Links
                                        </h6>
                                        <div className="row g-2">
                                            <div className="col-12">
                                                <div className="links-container">
                                                    {footer.additional_links && 
                                                        JSON.parse(footer.additional_links).map((link, index) => (
                                                        <div key={index} className="mb-2">
                                                            {typeof link === 'object' ? (
                                                                <>
                                                                    <span className="badge bg-primary me-2 mb-1 d-inline-block">
                                                                        {link.text}
                                                                    </span>
                                                                    <br />
                                                                    <small>
                                                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-success">
                                                                            {link.url}
                                                                        </a>
                                                                    </small>
                                                                </>
                                                            ) : (
                                                                <span className="badge bg-secondary me-2 mb-2">
                                                                    {link}
                                                                </span>
                                                            )}
                                                        </div>
                                                    ))}
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
                                                    <div className={`status-indicator ${footer.is_active ? 'active' : 'inactive'} mb-2`}>
                                                        <i className={`bi ${footer.is_active ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} fs-2`}></i>
                                                    </div>
                                                    <small className="text-muted d-block">Account Status</small>
                                                    <strong className={footer.is_active ? "text-success" : "text-danger"}>
                                                        {footer.is_active ? 'Active' : 'Inactive'}
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-center p-3 rounded">
                                                    <i className="bi bi-calendar-plus text-primary fs-2 mb-2"></i>
                                                    <small className="text-muted d-block">Created Date</small>
                                                    <strong className="text-dark">
                                                        {new Date(footer.created_at).toLocaleDateString('en-IN', {
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
                                                        {new Date(footer.updated_at).toLocaleDateString('en-IN', {
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
                                Edit Footer Information
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}