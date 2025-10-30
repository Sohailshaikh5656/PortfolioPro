import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';

const AddPortfolioForm = ({ user_id, setAddProject, setEditProject }) => {
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const initialValues = {
        title: '',
        link: '',
        project_order: '',
        description: '',
        image: '',
        userId: user_id
    };                                                    

    const validationSchema = Yup.object({
        title: Yup.string()
            .required('Project title is required')
            .min(3, 'Title must be at least 3 characters')
            .max(100, 'Title must be less than 100 characters'),
        link: Yup.string()
            .url('Please enter a valid URL')
            .required('Project link is required'),
        project_order: Yup.number()
            .required('Project order is required')
            .min(1, 'Order must be at least 1')
            .max(100, 'Order must be less than 100'),
        description: Yup.string()
            .required('Description is required')
            .min(10, 'Description must be at least 10 characters')
            .max(500, 'Description must be less than 500 characters'),
        image: Yup.mixed()
            .required('Project image is required')
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                let uploadedImageUrl = '';
                
                // Upload image first if selected
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append("profile_img", selectedFile); // Changed field name

                    let uploadResponse = await fetch(`${basicUrl}/upload-profile`, {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json",
                        },
                    });

                    uploadResponse = await uploadResponse.json();
                    
                    if (uploadResponse.code == 1) {
                        toast.success("Image Uploaded Successfully!");
                        alert("Image Uploaded Successfully!");

                        uploadedImageUrl = uploadResponse.data;
                    } else {
                        toast.error("Failed to Upload Image");
                        alert("Failed to Upload Image");
                        setSubmitting(false);
                        return;
                    }
                } else {
                    toast.error("Please select an image");
                    alert("Please select an image");
                    setSubmitting(false);
                    return;
                }

                // Prepare portfolio data with uploaded image URL
                const portfolioData = {
                    title: values.title,
                    link: values.link,
                    project_order: values.project_order,
                    description: values.description,
                    image: uploadedImageUrl, // Use the uploaded image URL
                    userId: values.userId
                };

                const projects = []
                projects.push(portfolioData)


                // Submit portfolio data
                const response = await fetch(`${basicUrl}/portfolio`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({projects : projects, skipUpdate:true, user_id : values.userId}),
                });

                if (response.ok) {
                    const result = await response.json();
                    toast.success('Project added successfully!');
                    alert('Project added successfully!');
                    toast.success('Project added successfully!');
                    resetForm();
                    setImagePreview(null);
                    setSelectedFile(null);
                    
                    // Optionally switch back to edit view
                    setAddProject(false);
                    setEditProject(true);
                } else {
                    const errorData = await response.json();
                    console.error('Server error:', errorData);
                    toast.error(`Server error:' ${errorData}`);
                    throw new Error('Failed to add portfolio');
                }
            } catch (error) {
                console.error('Error adding portfolio:', error);
                toast.error(`Error adding portfolio: ${error}`);
                alert('Failed to add portfolio. Please try again.');
            } finally {
                setSubmitting(false);
            }
        }
    });

    // Handle image file input for preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                formik.setFieldError('image', 'Please select an image file');
                return;
            }

            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                formik.setFieldError('image', 'Image size must be less than 5MB');
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                formik.setFieldValue('image', file);
                formik.setFieldError('image', ''); // Clear any previous errors
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        formik.setFieldValue('image', '');
    };

    const handleCancel = () => {
        setAddProject(false);
        setEditProject(true);
    };

    return (
        <div className="container-fluid">
            <ToastContainer />
            <div className="row justify-content-center">
                <div className="col-lg-8 col-xl-8 col-12 my-4 mb-4">
                    <div className="card add-portfolio-card shadow-lg border-0">
                        <div className="card-header bg-gradient-primary text-white py-4">
                            <div className="d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center">
                                    <i className="bi bi-plus-circle me-3 fs-3"></i>
                                    <div>
                                        <h4 className="mb-0 fw-bold">Add New Project</h4>
                                        <small className="opacity-75">Showcase your work in your portfolio</small>
                                    </div>
                                </div>
                                <button 
                                    type="button" 
                                    className="btn btn-light btn-sm"
                                    onClick={handleCancel}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            </div>
                        </div>

                        <div className="card-body p-4">
                            <form onSubmit={formik.handleSubmit} className="portfolio-form">
                                <div className="row g-4">
                                    {/* Image Upload Section */}
                                    <div className="col-12">
                                        <div className="image-section p-4 bg-light rounded-3 mb-4">
                                            <h6 className="section-title text-primary mb-4 fw-bold">
                                                <i className="bi bi-image me-2"></i>
                                                Project Image
                                            </h6>
                                            
                                            <div className="text-center">
                                                {/* Image Preview */}
                                                {imagePreview ? (
                                                    <div className="image-preview-container position-relative d-inline-block">
                                                        <img 
                                                            src={imagePreview} 
                                                            alt="Project preview" 
                                                            className="img-fluid rounded shadow project-preview-image"
                                                            style={{
                                                                maxHeight: '200px',
                                                                objectFit: 'cover',
                                                                border: '3px solid #fff'
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
                                                            onClick={handleRemoveImage}
                                                            style={{ width: '30px', height: '30px' }}
                                                        >
                                                            <i className="bi bi-x"></i>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="image-placeholder bg-white rounded p-5 border-dashed">
                                                        <i className="bi bi-cloud-arrow-up display-4 text-muted mb-3"></i>
                                                        <p className="text-muted mb-3">Upload project screenshot or image</p>
                                                    </div>
                                                )}

                                                {/* File Input */}
                                                <div className="mt-4">
                                                    <label htmlFor="projectImage" className="btn btn-outline-primary btn-lg">
                                                        <i className="bi bi-cloud-arrow-up me-2"></i>
                                                        {imagePreview ? 'Change Image' : 'Choose Image'}
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="projectImage"
                                                        className="d-none"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        onBlur={formik.handleBlur}
                                                        name="image"
                                                    />
                                                    {formik.touched.image && formik.errors.image && (
                                                        <div className="text-danger small mt-2 d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                                            {formik.errors.image}
                                                        </div>
                                                    )}
                                                    <div className="mt-2">
                                                        <small className="text-muted">
                                                            Supported: JPG, PNG, GIF • Max: 5MB • Recommended: 800x600px
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Details */}
                                    <div className="col-md-8">
                                        <div className="form-section h-100 p-4 bg-white rounded-3 shadow-sm">
                                            <h6 className="section-title text-primary mb-4 fw-bold">
                                                <i className="bi bi-info-circle me-2"></i>
                                                Project Details
                                            </h6>
                                            
                                            <div className="mb-3">
                                                <label htmlFor="title" className="form-label fw-semibold">
                                                    Project Title *
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                                                    id="title"
                                                    name="title"
                                                    value={formik.values.title}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="e.g., E-commerce Website, Mobile App"
                                                />
                                                {formik.touched.title && formik.errors.title && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.title}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="link" className="form-label fw-semibold">
                                                    Project Link *
                                                </label>
                                                <input
                                                    type="url"
                                                    className={`form-control ${formik.touched.link && formik.errors.link ? 'is-invalid' : ''}`}
                                                    id="link"
                                                    name="link"
                                                    value={formik.values.link}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="https://example.com"
                                                />
                                                {formik.touched.link && formik.errors.link && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.link}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="description" className="form-label fw-semibold">
                                                    Project Description *
                                                </label>
                                                <textarea
                                                    className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                                    id="description"
                                                    name="description"
                                                    rows="4"
                                                    value={formik.values.description}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Describe your project, technologies used, features, etc."
                                                />
                                                <div className="d-flex justify-content-between mt-1">
                                                    <small className="text-muted">
                                                        {formik.values.description.length}/500 characters
                                                    </small>
                                                    {formik.touched.description && formik.errors.description && (
                                                        <small className="text-danger">
                                                            {formik.errors.description}
                                                        </small>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Project Settings */}
                                    <div className="col-md-4">
                                        <div className="form-section h-100 p-4 bg-white rounded-3 shadow-sm">
                                            <h6 className="section-title text-primary mb-4 fw-bold">
                                                Project Settings
                                            </h6>

                                            <div className="mb-3">
                                                <label htmlFor="project_order" className="form-label fw-semibold">
                                                    Display Order *
                                                </label>
                                                <input
                                                    type="number"
                                                    className={`form-control ${formik.touched.project_order && formik.errors.project_order ? 'is-invalid' : ''}`}
                                                    id="project_order"
                                                    name="project_order"
                                                    min="1"
                                                    max="100"
                                                    value={formik.values.project_order}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="1"
                                                />
                                                {formik.touched.project_order && formik.errors.project_order && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.project_order}
                                                    </div>
                                                )}
                                                <small className="text-muted">
                                                    Lower numbers appear first
                                                </small>
                                            </div>

                                            <div className="project-info-card p-3 bg-light rounded mt-4">
                                                <h6 className="fw-bold text-dark mb-2">
                                                    <i className="bi bi-lightbulb me-2"></i>
                                                    Tips
                                                </h6>
                                                <ul className="small text-muted mb-0 ps-3">
                                                    <li>Use high-quality images</li>
                                                    <li>Write clear descriptions</li>
                                                    <li>Include live demo links</li>
                                                    <li>Order projects by importance</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="col-12">
                                        <div className="action-buttons pt-4 border-top text-center">
                                            <button 
                                                type="submit" 
                                                className="btn btn-success btn-lg px-5 me-3"
                                                disabled={formik.isSubmitting || !formik.isValid}
                                            >
                                                {formik.isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                                        Adding Project...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Add to Portfolio
                                                    </>
                                                )}
                                            </button>
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary btn-lg px-5"
                                                onClick={handleCancel}
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
    );
};

export default AddPortfolioForm;