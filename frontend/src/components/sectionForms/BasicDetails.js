import React, { useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { ToastContainer, toast } from 'react-toastify';
export default function BasicDetails({ setForm }) {
    const [profileImage, setProfileImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const initalState = {
        companyName: "",
        name: "",
        email: "",
        phone: "",
        profession: "",
        state: "",
        city: "",
        profile_img: null,
        age : ""
    }
    const validationSchema = Yup.object({
        companyName: Yup.string("Company Name Should be a String or URL").min(5, "Company Name should be atleast 5 character long").required("Company Name Required !"),
        name: Yup.string("Name Should be a String").min(3, "Name should be atleast 3 character long").required("Name Required !"),
        email: Yup.string().email("Email should be a valid email").required("Email Required !"),
        phone: Yup.string()
            .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9")
            .required("Mobile Number Required!"),
        profession: Yup.string("Profession Should be a String").min(5, "Profession should be atleast 5 character long").required("Profession Required !"),
        state: Yup.string("State Should be a String").min(3, "State should be atleast 3 character long").required("State Required !"),
        city: Yup.string("City Should be a String").min(3, "City should be atleast 3 character long").required("City Required !"),
        age: Yup.number("Age Should be a Number").min(16, "Age should be atleast 16").required("Age Required !"),
        profile_img: Yup.string().required("Profile Image Required !")
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
                        let url = basicUrl + "/basic"
                        values.image = values.profile_img;
                        values.templateId = parseInt(localStorage.getItem("selectedTemplate")|| 1)
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
                            localStorage.setItem("userId",response?.data?.user_id);
                            resetForm()
                            toast.success("User Added Successfully")
                            alert("User Added now Forward to Next Step")
                            setTimeout(()=>{
                                setForm("Header & Hero")
                            },1000)

                        }
                    } catch (error) {
                        toast.error(`Error : `,error)
                        console.error("Error : ", error)
                        return;
                    }

                } else {
                    toast.error("There is File Uplaod Error !")
                    console.error("There is File Uplaod Error !")
                }
            } catch (error) {
                toast.error(`Error ! ${error}`)
                console.error("Error !", error)
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
            <ToastContainer/>
            <div className="row my-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
                    <form onSubmit={formik.handleSubmit} noValidate className="p-4 bg-light rounded-4 shadow-sm">
                        {/* Form Header */}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary mb-2">Basic Company Details</h2>
                            <p className="text-muted">Fill in your basic company information to get started</p>
                        </div>

                        {/* Company Name Field */}
                        <div className="mb-4">
                            <label htmlFor="companyName" className="form-label fw-semibold text-dark">
                                Company Name <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-building text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    className={`form-control border-start-0 ${formik.errors.companyName && formik.touched.companyName ? 'is-invalid' : ''}`}
                                    placeholder="Your Company name (used in URL)"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.companyName}
                                />
                            </div>
                            {formik.errors.companyName && formik.touched.companyName && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.companyName}
                                </div>
                            )}
                            <div className="form-text">This will be used in your company profile URL</div>
                        </div>

                        {/* Name Field */}
                        <div className="mb-4">
                            <label htmlFor="name" className="form-label fw-semibold text-dark">
                                Your Name <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-person text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`form-control border-start-0 ${formik.errors.name && formik.touched.name ? 'is-invalid' : ''}`}
                                    placeholder="John Doe"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                            </div>
                            {formik.errors.name && formik.touched.name && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.name}
                                </div>
                            )}
                        </div>

                        {/* Email Field */}
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
                                    placeholder="you@company.com"
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
                        <div className="mb-4">
                            <label htmlFor="age" className="form-label fw-semibold text-dark">
                                Age <span className="text-danger">*</span>
                            </label>
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0">
                                    <i className="bi bi-person text-muted"></i>
                                </span>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    className={`form-control border-start-0 ${formik.errors.age && formik.touched.age ? 'is-invalid' : ''}`}
                                    placeholder="18"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.age}
                                />
                            </div>
                            {formik.errors.age && formik.touched.age && (
                                <div className="invalid-feedback d-block mt-2">
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    {formik.errors.age}
                                </div>
                            )}
                        </div>

                        {/* Phone and Profession Field */}
                        <div className="mb-4">
                            <div className="row d-flex justify-content-center">
                                <div className="col-6">
                                    <label htmlFor="phone" className="form-label fw-semibold text-dark">
                                        Phone Number <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-telephone text-muted"></i>
                                        </span>
                                        <span className="input-group-text bg-light border-start-0 border-end-0">+91</span>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className={`form-control border-start-0 ${formik.errors.phone && formik.touched.phone ? 'is-invalid' : ''}`}
                                            placeholder="9876543210"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.phone}
                                            maxLength="10"
                                        />
                                    </div>
                                    {formik.errors.phone && formik.touched.phone && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.phone}
                                        </div>
                                    )}
                                    <div className="form-text">Enter 10-digit mobile number without country code</div>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="phone" className="form-label fw-semibold text-dark">
                                        Profession <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-telephone text-muted"></i>
                                        </span>

                                        <input
                                            type="text"
                                            id="profession"
                                            name="profession"
                                            className={`form-control border-start-0 ${formik.errors.profession && formik.touched.profession ? 'is-invalid' : ''}`}
                                            placeholder="Software Developer"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.profession}
                                        />
                                    </div>
                                    {formik.errors.profession && formik.touched.profession && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.profession}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Phone and Profession Field */}
                        <div className="mb-4">
                            <div className="row d-flex justify-content-center">
                                <div className="col-6">
                                    <label htmlFor="phone" className="form-label fw-semibold text-dark">
                                        City <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-telephone text-muted"></i>
                                        </span>
                                        <input
                                            type="text"
                                            name="city"
                                            className={`form-control border-start-0 ${formik.errors.city && formik.touched.city ? 'is-invalid' : ''}`}
                                            placeholder="Ahmedabad"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.city}
                                        />
                                    </div>
                                    {formik.errors.city && formik.touched.city && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.city}
                                        </div>
                                    )}
                                </div>
                                <div className="col-6">
                                    <label htmlFor="phone" className="form-label fw-semibold text-dark">
                                        State <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-telephone text-muted"></i>
                                        </span>

                                        <input
                                            type="text"
                                            name="state"
                                            className={`form-control border-start-0 ${formik.errors.state && formik.touched.state ? 'is-invalid' : ''}`}
                                            placeholder="Gujarat"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            value={formik.values.state}
                                        />
                                    </div>
                                    {formik.errors.state && formik.touched.state && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.state}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="profile_img" className="form-label fw-semibold text-dark">
                                Profile Image <span className="text-danger">*</span>
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
                                        Add Basic Details
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


