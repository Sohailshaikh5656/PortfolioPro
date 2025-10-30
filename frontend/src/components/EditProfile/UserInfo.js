import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
export default function UserInfo({ user, onUpdateUser }) {
    const [editBtn, setEditBtn] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const initalState = {
        name: user[0].name,
        email: user[0].email,
        profession: user[0].profession,
        company_name: user[0].company_name,
        city: user[0].city,
        state: user[0].state,
        image: user[0].image,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        profession: Yup.string().required("Profession is required"),
        company_name: Yup.string().required("Company Name is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        image: Yup.string().required("Image is required"),
    });

    const formik = useFormik({
        initialValues: initalState,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                values.id = user[0].id;
        
                // Upload image only if a new file was selected
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append("profile_img", selectedFile);
        
                    let uploadResponse = await fetch(`${basicUrl}/upload-profile`, {
                        method: "POST",
                        body: formData, // No JSON.stringify
                        headers: {
                            "Accept": "application/json",
                            // ❌ DO NOT SET 'Content-Type' for FormData
                        },
                    });
        
                    uploadResponse = await uploadResponse.json();
                    if (uploadResponse.code == 1) {
                        toast.success("New Image Uploaded!");
                        alert("New Image Uploaded!");
                        values.image = uploadResponse.data; // Use new uploaded file name
                    } else {
                        toast.error("Failed to Upload Image");
                        alert("Failed to Upload Image");
                    }
                }
        
                // Now update user info
                let response = await fetch(`${basicUrl}/user`, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                });
                response = await response.json();
        
                if (response.code == 1) {
                    let updateData = values;
                    updateData.is_active = user[0].is_active;
                    updateData.created_at = user[0].created_at;
                    updateData.updated_at = new Date();
                    updateData.template_id = user[0].template_id == 1?"Light":"Dark"; 

                    onUpdateUser(values)
                    alert("User Updated Successfully");
                    toast.success("User Updated Successfully");
                    setEditBtn(false);
                } else {
                    alert("User Update Failed");
                    toast.error("User Update Failed");
                }
        
            } catch (error) {
                console.error("Error : ", error);
                toast.error(`Error : , ${error}`);
            }
        }
    });

    // Handle image file input for preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                formik.setFieldValue('image', file); // Set the file object
            };
            reader.readAsDataURL(file);
        }
    };

    // Get current image URL
    const getCurrentImage = () => {
        if (imagePreview) {
            return imagePreview;
        }
        if (formik.values.image && typeof formik.values.image === 'string') {
            return `${process.env.REACT_APP_IMAGE_URL}/${formik.values.image}`;
        }
        return null;
    };

    return (
        <>
        <ToastContainer />
            {editBtn ? (<>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="card edit-profile-card shadow-lg border-0">
                                <div className="card-header bg-gradient-primary text-white py-4">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-pencil-square me-3 fs-3"></i>
                                        <div>
                                            <h4 className="mb-0 fw-bold">Edit Profile Information</h4>
                                            <small className="opacity-75">Update your personal and professional details</small>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body p-4">
                                    <form onSubmit={formik.handleSubmit} className="edit-profile-form">
                                        <div className="row g-4">
                                            {/* Image Preview Section */}
                                            <div className="col-12">
                                                <div className="image-section text-center mb-4 p-4 bg-light rounded-3">
                                                    <div className="current-image-container mb-4">
                                                        <h6 className="text-muted mb-3">
                                                            <i className="bi bi-image me-2"></i>
                                                            Current Profile Image
                                                        </h6>
                                                        <div className="image-preview-wrapper position-relative d-inline-block">
                                                            <img
                                                                src={getCurrentImage()}
                                                                alt="Profile Preview"
                                                                className="img-fluid rounded-circle shadow profile-preview-image"
                                                                style={{
                                                                    width: '180px',
                                                                    height: '180px',
                                                                    objectFit: 'cover',
                                                                    border: '4px solid #fff',
                                                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                                                                }}
                                                                onError={(e) => {
                                                                    e.target.src = 'https://via.placeholder.com/180x180/667eea/ffffff?text=No+Image';
                                                                }}
                                                            />
                                                            {imagePreview && (
                                                                <span className="position-absolute top-0 start-100 translate-middle badge bg-success rounded-pill">
                                                                    New
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="image-upload-section">
                                                        <label htmlFor="imageUpload" className="btn btn-outline-primary btn-lg">
                                                            <i className="bi bi-cloud-arrow-up me-2"></i>
                                                            Choose New Image
                                                        </label>
                                                        <input
                                                            type="file"
                                                            id="imageUpload"
                                                            className="d-none"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                        <div className="mt-2">
                                                            <small className="text-muted">
                                                                Supported formats: JPG, PNG, GIF • Max size: 5MB
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Personal Information */}
                                            <div className="col-md-6">
                                                <div className="form-section h-100 p-4 bg-white rounded-3 shadow-sm">
                                                    <h6 className="section-title text-primary mb-4 fw-bold">
                                                        <i className="bi bi-person-badge me-2"></i>
                                                        Personal Information
                                                    </h6>

                                                    <div className="mb-3">
                                                        <label htmlFor="name" className="form-label fw-semibold">
                                                            <i className="bi bi-person me-1 text-primary"></i>
                                                            Full Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control form-control-lg ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                                                            id="name"
                                                            name="name"
                                                            value={formik.values.name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter your full name"
                                                        />
                                                        {formik.touched.name && formik.errors.name && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.name}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="email" className="form-label fw-semibold">
                                                            <i className="bi bi-envelope me-1 text-primary"></i>
                                                            Email Address *
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                                            id="email"
                                                            name="email"
                                                            value={formik.values.email}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="your.email@example.com"
                                                        />
                                                        {formik.touched.email && formik.errors.email && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.email}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="profession" className="form-label fw-semibold">
                                                            <i className="bi bi-briefcase me-1 text-primary"></i>
                                                            Profession *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control form-control-lg ${formik.touched.profession && formik.errors.profession ? 'is-invalid' : ''}`}
                                                            id="profession"
                                                            name="profession"
                                                            value={formik.values.profession}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="e.g., Software Developer"
                                                        />
                                                        {formik.touched.profession && formik.errors.profession && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.profession}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Professional Information */}
                                            <div className="col-md-6">
                                                <div className="form-section h-100 p-4 bg-white rounded-3 shadow-sm">
                                                    <h6 className="section-title text-primary mb-4 fw-bold">
                                                        <i className="bi bi-building me-2"></i>
                                                        Professional Details
                                                    </h6>

                                                    <div className="mb-3">
                                                        <label htmlFor="company_name" className="form-label fw-semibold">
                                                            <i className="bi bi-building me-1 text-primary"></i>
                                                            Company Name *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control form-control-lg ${formik.touched.company_name && formik.errors.company_name ? 'is-invalid' : ''}`}
                                                            id="company_name"
                                                            name="company_name"
                                                            value={formik.values.company_name}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Your company name"
                                                        />
                                                        {formik.touched.company_name && formik.errors.company_name && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.company_name}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="row g-3">
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="city" className="form-label fw-semibold">
                                                                    <i className="bi bi-geo-alt me-1 text-primary"></i>
                                                                    City *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${formik.touched.city && formik.errors.city ? 'is-invalid' : ''}`}
                                                                    id="city"
                                                                    name="city"
                                                                    value={formik.values.city}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    placeholder="Your city"
                                                                />
                                                                {formik.touched.city && formik.errors.city && (
                                                                    <div className="invalid-feedback">{formik.errors.city}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="mb-3">
                                                                <label htmlFor="state" className="form-label fw-semibold">
                                                                    <i className="bi bi-globe me-1 text-primary"></i>
                                                                    State *
                                                                </label>
                                                                <input
                                                                    type="text"
                                                                    className={`form-control ${formik.touched.state && formik.errors.state ? 'is-invalid' : ''}`}
                                                                    id="state"
                                                                    name="state"
                                                                    value={formik.values.state}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    placeholder="Your state"
                                                                />
                                                                {formik.touched.state && formik.errors.state && (
                                                                    <div className="invalid-feedback">{formik.errors.state}</div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Hidden image URL field for form submission */}
                                                    <input
                                                        type="hidden"
                                                        name="image"
                                                        value={typeof formik.values.image === 'string' ? formik.values.image : ''}
                                                    />
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

                    <style jsx>{`
                .edit-profile-card {
                    border-radius: 20px;
                    overflow: hidden;
                }
                
                .bg-gradient-primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                }
                
                .form-section {
                    border: 1px solid #e9ecef;
                    transition: all 0.3s ease;
                }
                
                .form-section:hover {
                    border-color: #667eea;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
                }
                
                .section-title {
                    border-bottom: 2px solid #667eea;
                    padding-bottom: 0.75rem;
                }
                
                .profile-preview-image {
                    transition: transform 0.3s ease;
                }
                
                .profile-preview-image:hover {
                    transform: scale(1.05);
                }
                
                .form-control {
                    border-radius: 10px;
                    border: 2px solid #e9ecef;
                    transition: all 0.3s ease;
                }
                
                .form-control:focus {
                    border-color: #667eea;
                    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
                }
                
                .form-control-lg {
                    padding: 0.75rem 1rem;
                    font-size: 1rem;
                }
                
                .btn-primary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }
                
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
                }
                
                .image-section {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                }
            `}</style>
                </div>
            </>
            ) : (<>


                <div className="card user-profile-card shadow-lg border-0 overflow-hidden">
                    <div className="card-header bg-gradient-primary text-white py-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 fw-bold">
                                <i className="bi bi-person-badge me-2"></i>
                                User Profile
                            </h4>
                            <span className="badge bg-light text-primary fs-6">
                                <i className="bi bi-star-fill me-1"></i>
                                Professional
                            </span>
                        </div>
                    </div>

                    <div className="card-body p-4">
                        {user && user[0] && (
                            <div className="row g-4">
                                {/* Profile Image Section */}
                                <div className="col-lg-3 text-center">
                                    <div className="position-relative">
                                        {user[0].image ? (
                                            <img
                                                src={`${process.env.REACT_APP_IMAGE_URL}/${user[0].image}`}
                                                alt="Profile"
                                                className="img-fluid rounded-circle shadow profile-image"
                                                style={{
                                                    width: '160px',
                                                    height: '160px',
                                                    objectFit: 'cover',
                                                    border: '4px solid #fff',
                                                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                                                }}
                                            />
                                        ) : (
                                            <div className="bg-gradient-light rounded-circle d-flex align-items-center justify-content-center mx-auto profile-placeholder"
                                                style={{
                                                    width: '160px',
                                                    height: '160px',
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                }}>
                                                <i className="bi bi-person-fill text-white" style={{ fontSize: '3.5rem' }}></i>
                                            </div>
                                        )}
                                        <div className="mt-3">
                                            <span className="badge bg-primary rounded-pill px-3 py-2">
                                                <i className="bi bi-image me-1"></i>
                                                Profile Image
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div className="col-lg-5">
                                    <div className="info-card h-100 p-4 rounded-3">
                                        <h6 className="section-title text-primary mb-3 fw-bold">
                                            <i className="bi bi-person-lines-fill me-2"></i>
                                            Personal Information
                                        </h6>
                                        <div className="row g-3">
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-person-circle text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Full Name</small>
                                                        <strong className="text-dark">{user[0].name}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-envelope text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Email Address</small>
                                                        <strong className="text-dark">{user[0].email}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-briefcase text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Profession</small>
                                                        <strong className="text-dark">{user[0].profession}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-building text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Company</small>
                                                        <strong className="text-dark">{user[0].company_name}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Location & Details */}
                                <div className="col-lg-4">
                                    <div className="info-card h-100 p-4 rounded-3">
                                        <h6 className="section-title text-primary mb-3 fw-bold">
                                            <i className="bi bi-geo-alt me-2"></i>
                                            Location & Details
                                        </h6>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-pin-map text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">City</small>
                                                        <strong className="text-dark">{user[0].city}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-globe text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">State</small>
                                                        <strong className="text-dark">{user[0].state}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-list-ol text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Progress Steps</small>
                                                        <strong className="text-dark">{user[0].steps} Completed</strong>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-flex align-items-center mb-3">
                                                    <i className="bi bi-layers text-primary me-2 fs-5"></i>
                                                    <div>
                                                        <small className="text-muted d-block">Template</small>
                                                        <strong className="text-dark">#{user[0].template_id}</strong>
                                                    </div>
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
                                                    <div className={`status-indicator ${user[0].is_active ? 'active' : 'inactive'} mb-2`}>
                                                        <i className={`bi ${user[0].is_active ? 'bi-check-circle-fill' : 'bi-x-circle-fill'} fs-2`}></i>
                                                    </div>
                                                    <small className="text-muted d-block">Account Status</small>
                                                    <strong className={user[0].is_active ? "text-success" : "text-danger"}>
                                                        {user[0].is_active ? 'Active' : 'Inactive'}
                                                    </strong>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="text-center p-3 rounded">
                                                    <i className="bi bi-calendar-plus text-primary fs-2 mb-2"></i>
                                                    <small className="text-muted d-block">Created Date</small>
                                                    <strong className="text-dark">
                                                        {new Date(user[0].created_at).toLocaleDateString('en-IN', {
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
                                                        {new Date(user[0].updated_at).toLocaleDateString('en-IN', {
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
                                Edit Profile Information
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