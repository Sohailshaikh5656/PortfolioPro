import React, { useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast, ToastContainer } from 'react-toastify'
export default function HeaderAndHero({setForm}) {
    const [profileImage, setProfileImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const initalState = {
        hero_title: "",
        hero_subtitle: "",
        hero_cta: "",
        profile_img: null
    }
    const validationSchema = Yup.object({
        hero_title: Yup.string().min(5, "Hero Title should be at least 5 characters long").required("Hero Title Required!"),
        hero_subtitle: Yup.string().min(8, "Hero Subtitle should be at least 8 characters long").required("Hero Subtitle Required!"),
        hero_cta: Yup.string().required("Hero CTA Required!"),
        profile_img: Yup.mixed().required("Hero Image Required!") // Changed to match your field name
    })

    const formik = useFormik({
        initialValues: initalState,
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (profileImage) {
                    const formData = new FormData()
                    formData.append("profile_img", profileImage)
                    let basicUrl = process.env.REACT_APP_BACKEND_URL;
                    try {
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
                            values.profile_img = response.data
                        }
                    } catch (err) {
                        console.error("Error : ", err)
                        return;
                    }

                    try {
                        let url = basicUrl + "/header"
                        values.image = values.profile_img;
                        values.userId = parseInt(localStorage.getItem("userId") || 1)
                        delete values.profile_img
                        let response = await fetch(url, {
                            method: "POST",
                            body: JSON.stringify(values),
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
                            toast.success("Hero And Header Added now Forward to Next Step")
                            alert("Hero And Header Added now Forward to Next Step")
                            setTimeout(()=>{
                                setForm("About Section")
                            },1000)
                        }else{
                            toast.error("Somnething Went Wrong !")
                        }
                    } catch (error) {
                        console.error("Error : ", error)
                        toast.error(`Error : ${error}`)
                        return;
                    }

                } else {
                    console.error("There is File Uplaod Error !")
                    toast.error("There is File Uplaod Error !")
                }
            } catch (error) {
                console.error("Error !", error)
                toast.error(`Error ! ${error}`)
            }
        }
    })

    const handleImagePreview = (e) => {
        const file = e.target.files[0]; // Fixed: files instead of file

        if (file) {
            // Update Formik value
            formik.setFieldValue("profile_img", file);

            // Store file in state
            setProfileImage(file);

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
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
                            <h2 className="fw-bold text-primary mb-2">Header & Hero</h2>
                            <p className="text-muted">Fill in your basic company information to get started</p>
                        </div>

                        {/* Company Name Field */}
                        <div className="mb-4">
                            <label htmlFor="companyName" className="form-label fw-semibold text-dark">
                                Hero Title <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-building text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    id="hero_title"
                                    name="hero_title"
                                    className={`form-control border-start-0 ${formik.errors.hero_title && formik.touched.hero_title ? 'is-invalid' : ''}`}
                                    placeholder="Your Hero title "
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.hero_title}
                                />
                            </div>
                            {formik.errors.hero_title && formik.touched.hero_title && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.hero_title}
                                </div>
                            )}
                        </div>

                        {/* Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label fw-semibold text-dark">
                                Hero Subtitle <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-person text-muted"></i>
                                </span>
                                <textarea
                                    type="text"
                                    rows={3}
                                    id="hero_subtitle"
                                    name="hero_subtitle"
                                    className={`form-control border-start-0 ${formik.errors.hero_subtitle && formik.touched.hero_subtitle ? 'is-invalid' : ''}`}
                                    placeholder="Full-stack Developer passionate about building scalable web apps"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.hero_subtitle}
                                />
                            </div>
                            {formik.errors.hero_subtitle && formik.touched.hero_subtitle && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.hero_subtitle}
                                </div>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="mb-4">
                            <label htmlFor="email" className="form-label fw-semibold text-dark">
                                Hero Cta <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-envelope text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    id="hero_cta"
                                    name="hero_cta"
                                    className={`form-control border-start-0 ${formik.errors.hero_cta && formik.touched.hero_cta ? 'is-invalid' : ''}`}
                                    placeholder="View My Work"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.hero_cta}
                                />
                            </div>
                            {formik.errors.hero_cta && formik.touched.hero_cta && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.hero_cta}
                                </div>
                            )}
                        </div>

                        <div className="mb-4">
                            <label htmlFor="profile_img" className="form-label fw-semibold text-dark">
                                Hero Image <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-image text-muted"></i> {/* Fixed icon */}
                                </span>
                                <input
                                    type="file"
                                    id="profile_img"
                                    name="profile_img"
                                    accept="image/*"
                                    className={`form-control border-start-0 ${formik.errors.profile_img && formik.touched.profile_img ? 'is-invalid' : ''}`}
                                    onBlur={formik.handleBlur}
                                    onChange={handleImagePreview}
                                />
                            </div>
                            {formik.errors.profile_img && formik.touched.profile_img && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.profile_img}
                                </div>
                            )}
                            <div className="form-text">
                                Supported formats: JPG, PNG, GIF. Max size: 5MB
                            </div>
                        </div>
                        {imagePreview && (
                            <div className="mb-4">
                                <label className="form-label fw-semibold text-dark">
                                    Profile Image Preview
                                </label>
                                <div className='d-flex justify-content-center'>
                                    <img
                                        src={imagePreview}
                                        alt="Profile preview"
                                        className="img-thumbnail rounded"
                                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                                    />
                                </div>
                                <div className="form-text text-center mt-2">
                                    Selected: {profileImage?.name}
                                </div>
                            </div>
                        )}



                        {/* Submit Button */}
                        <div className="mt-4 pt-3 border-top">
                            <button
                                type="submit"
                                className="btn btn-warning text-white w-100 py-3 fw-bold fs-5 rounded-3 shadow-sm"
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
                                        Add Hero and Header Details
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
