import React from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast, ToastContainer } from 'react-toastify'

export default function ContactSection({ setForm }) {
    const validationSchema = Yup.object({
        email: Yup.string().email("Must be a valid email").required("Email is required"),
        phone: Yup.string().min(10, "Phone number must be at least 10 characters").required("Phone number is required"),
        address: Yup.string().min(5, "Address must be at least 5 characters").required("Address is required"),
        social_links: Yup.object({
            linkedin: Yup.string().url("Must be a valid URL"),
            github: Yup.string().url("Must be a valid URL"),
            twitter: Yup.string().url("Must be a valid URL"),
            facebook: Yup.string().url("Must be a valid URL"),
            instagram: Yup.string().url("Must be a valid URL"),
            website: Yup.string().url("Must be a valid URL")
        })
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            phone: "",
            address: "",
            social_links: {
                linkedin: "",
                github: "",
                twitter: "",
                facebook: "",
                instagram: "",
                website: ""
            }
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                let url = basicUrl + "/contact"
                
                // Prepare the data for submission
                const submitData = {
                    email: values.email,
                    phone: values.phone,
                    address: values.address,
                    social_links: values.social_links,
                    steps: 6, // Assuming this is step 6
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
                    toast.success("Contact Information Added successfully!")
                    alert("Contact Information Added successfully!")
                    setTimeout(() => {
                        setForm("Footer") // Replace with your next form component or completion page
                    }, 1000)
                }

            } catch (error) {
                console.error("Error !", error)
                toast.error(`Error ! ${error}`)
            }
        }
    })

    return (
        <div className="container my-1">
            <ToastContainer />
            <div className="row my-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-8 mx-auto">
                    <form onSubmit={formik.handleSubmit} noValidate className="p-4 bg-light rounded-4 shadow-sm">
                        {/* Form Header */}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary mb-2">Contact Information</h2>
                            <p className="text-muted">Add your contact details and social media links</p>
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label fw-semibold text-dark">
                                Email Address <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-envelope text-muted"></i>
                                </span>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`form-control border-start-0 ${formik.errors.email && formik.touched.email ? 'is-invalid' : ''}`}
                                    placeholder="john.software@email.com"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                            </div>
                            {formik.errors.email && formik.touched.email && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.email}
                                </div>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <label htmlFor="phone" className="form-label fw-semibold text-dark">
                                Phone Number <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-telephone text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    className={`form-control border-start-0 ${formik.errors.phone && formik.touched.phone ? 'is-invalid' : ''}`}
                                    placeholder="+1-555-0123"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                            </div>
                            {formik.errors.phone && formik.touched.phone && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.phone}
                                </div>
                            )}
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                            <label htmlFor="address" className="form-label fw-semibold text-dark">
                                Address <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-geo-alt text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    className={`form-control border-start-0 ${formik.errors.address && formik.touched.address ? 'is-invalid' : ''}`}
                                    placeholder="San Francisco, California"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                />
                            </div>
                            {formik.errors.address && formik.touched.address && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.address}
                                </div>
                            )}
                        </div>

                        {/* Social Links Section */}
                        <div className="mb-4">
                            <h5 className="fw-semibold text-dark mb-3">
                                <i className="bi bi-share me-2"></i>
                                Social Media Links
                            </h5>
                            <p className="text-muted mb-3">Add your social media profiles (optional)</p>

                            {/* LinkedIn */}
                            <div className="mb-3">
                                <label htmlFor="linkedin" className="form-label fw-semibold text-dark">
                                    <i className="bi bi-linkedin text-primary me-2"></i>
                                    LinkedIn
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-link-45deg text-muted"></i>
                                    </span>
                                    <input
                                        type="url"
                                        id="linkedin"
                                        name="social_links.linkedin"
                                        className={`form-control border-start-0 ${formik.errors.social_links?.linkedin && formik.touched.social_links?.linkedin ? 'is-invalid' : ''}`}
                                        placeholder="https://linkedin.com/in/yourname"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.social_links.linkedin}
                                    />
                                </div>
                                {formik.errors.social_links?.linkedin && formik.touched.social_links?.linkedin && (
                                    <div className="invalid-feedback d-block mt-2">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        {formik.errors.social_links.linkedin}
                                    </div>
                                )}
                            </div>

                            {/* GitHub */}
                            <div className="mb-3">
                                <label htmlFor="github" className="form-label fw-semibold text-dark">
                                    <i className="bi bi-github text-dark me-2"></i>
                                    GitHub
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-link-45deg text-muted"></i>
                                    </span>
                                    <input
                                        type="url"
                                        id="github"
                                        name="social_links.github"
                                        className={`form-control border-start-0 ${formik.errors.social_links?.github && formik.touched.social_links?.github ? 'is-invalid' : ''}`}
                                        placeholder="https://github.com/yourusername"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.social_links.github}
                                    />
                                </div>
                                {formik.errors.social_links?.github && formik.touched.social_links?.github && (
                                    <div className="invalid-feedback d-block mt-2">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        {formik.errors.social_links.github}
                                    </div>
                                )}
                            </div>

                            {/* Twitter */}
                            <div className="mb-3">
                                <label htmlFor="twitter" className="form-label fw-semibold text-dark">
                                    <i className="bi bi-twitter text-info me-2"></i>
                                    Twitter
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-link-45deg text-muted"></i>
                                    </span>
                                    <input
                                        type="url"
                                        id="twitter"
                                        name="social_links.twitter"
                                        className={`form-control border-start-0 ${formik.errors.social_links?.twitter && formik.touched.social_links?.twitter ? 'is-invalid' : ''}`}
                                        placeholder="https://twitter.com/yourusername"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.social_links.twitter}
                                    />
                                </div>
                                {formik.errors.social_links?.twitter && formik.touched.social_links?.twitter && (
                                    <div className="invalid-feedback d-block mt-2">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        {formik.errors.social_links.twitter}
                                    </div>
                                )}
                            </div>

                            {/* Facebook */}
                            <div className="mb-3">
                                <label htmlFor="facebook" className="form-label fw-semibold text-dark">
                                    <i className="bi bi-facebook text-primary me-2"></i>
                                    Facebook
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-link-45deg text-muted"></i>
                                    </span>
                                    <input
                                        type="url"
                                        id="facebook"
                                        name="social_links.facebook"
                                        className={`form-control border-start-0 ${formik.errors.social_links?.facebook && formik.touched.social_links?.facebook ? 'is-invalid' : ''}`}
                                        placeholder="https://facebook.com/yourprofile"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.social_links.facebook}
                                    />
                                </div>
                                {formik.errors.social_links?.facebook && formik.touched.social_links?.facebook && (
                                    <div className="invalid-feedback d-block mt-2">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        {formik.errors.social_links.facebook}
                                    </div>
                                )}
                            </div>

                            {/* Instagram */}
                            <div className="mb-3">
                                <label htmlFor="instagram" className="form-label fw-semibold text-dark">
                                    <i className="bi bi-instagram text-danger me-2"></i>
                                    Instagram
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-link-45deg text-muted"></i>
                                    </span>
                                    <input
                                        type="url"
                                        id="instagram"
                                        name="social_links.instagram"
                                        className={`form-control border-start-0 ${formik.errors.social_links?.instagram && formik.touched.social_links?.instagram ? 'is-invalid' : ''}`}
                                        placeholder="https://instagram.com/yourusername"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.social_links.instagram}
                                    />
                                </div>
                                {formik.errors.social_links?.instagram && formik.touched.social_links?.instagram && (
                                    <div className="invalid-feedback d-block mt-2">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        {formik.errors.social_links.instagram}
                                    </div>
                                )}
                            </div>

                            {/* Personal Website */}
                            <div className="mb-3">
                                <label htmlFor="website" className="form-label fw-semibold text-dark">
                                    <i className="bi bi-globe text-success me-2"></i>
                                    Personal Website
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="bi bi-link-45deg text-muted"></i>
                                    </span>
                                    <input
                                        type="url"
                                        id="website"
                                        name="social_links.website"
                                        className={`form-control border-start-0 ${formik.errors.social_links?.website && formik.touched.social_links?.website ? 'is-invalid' : ''}`}
                                        placeholder="https://yourportfolio.com"
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.social_links.website}
                                    />
                                </div>
                                {formik.errors.social_links?.website && formik.touched.social_links?.website && (
                                    <div className="invalid-feedback d-block mt-2">
                                        <i className="bi bi-exclamation-circle me-2"></i>
                                        {formik.errors.social_links.website}
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
                                        Saving Contact Information...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Save Contact Information
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