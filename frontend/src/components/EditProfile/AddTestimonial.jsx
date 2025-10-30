import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';

export default function AddTestimonial({ user_id, setAddTestimonial, setEditTestimonial, onTestimonialAdded }) {
    const [imagePreview, setImagePreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    const initialValues = {
        client_name: '',
        testimonial: '',
        testimonial_order: '',
        logo: '',
        userId: user_id
    };

    const validationSchema = Yup.object({
        client_name: Yup.string()
            .required('Client Name is required')
            .min(3, 'Client Name must be at least 3 characters')
            .max(30, 'Client Name must be less than 30 characters'),
        testimonial: Yup.string()
            .required('Testimonial is required')
            .min(16, 'Testimonial must be at least 16 characters')
            .max(128, 'Testimonial must be less than 128 characters'),
        testimonial_order: Yup.number()
            .min(1, 'Order number must be at least 1')
            .required('Testimonial Order is required'),
        logo: Yup.mixed()
            .required('Logo image is required')
            .test('fileType', 'Please select an image file', (value) => {
                if (!value) return false;
                if (typeof value === 'string') return true; // Already uploaded URL
                return value && value.type.startsWith('image/');
            })
            .test('fileSize', 'Image size must be less than 5MB', (value) => {
                if (!value || typeof value === 'string') return true;
                return value && value.size <= 5 * 1024 * 1024;
            })
    });

    // AddTestimonial component ke onSubmit function mein yeh change karein:

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
                    formData.append("profile_img", selectedFile);

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

                // Prepare testimonial data with uploaded image URL
                const testimonialData = {
                    client_name: values.client_name,
                    testimonial: values.testimonial,
                    testimonial_order: values.testimonial_order,
                    logo: uploadedImageUrl,
                    userId: values.userId
                };

                const testimonialArray = [testimonialData];
                // Submit testimonial data
                const response = await fetch(`${basicUrl}/testimonials`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        testimonials: testimonialArray,
                        skipUpdate: true,
                        user_id: values.userId
                    }),
                });

                // ✅ YEH PART CHANGE KARNA HAI
                const result = await response.json();
                if (result.code == 1) { // ✅ Server ka actual response cod
                    alert('Testimonial added successfully!');
                    toast.success('Testimonial added successfully!');

                    // ✅ Callback function ko call karein
                    if (onTestimonialAdded) {
                        // Agar server se created testimonial object milta hai toh use pass karein
                        const newTestimonial =  testimonialData;
                        onTestimonialAdded(newTestimonial);
                    }

                    resetForm();
                    setImagePreview(null);
                    setSelectedFile(null);

                    // Switch back to edit view
                    setAddTestimonial(false);
                    setEditTestimonial(true);
                } else {
                    console.error('Server error:', result);
                    toast.error('Failed to add testimonial: ' + (result.message || 'Unknown error'));
                    alert('Failed to add testimonial: ' + (result.message || 'Unknown error'));
                }
            } catch (error) {
                console.error('Error adding testimonial:', error);
                alert('Failed to add testimonial. Please try again.');
                toast.error('Failed to add testimonial. Please try again.');
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
                formik.setFieldError('logo', 'Please select an image file');
                return;
            }

            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                formik.setFieldError('logo', 'Image size must be less than 5MB');
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                formik.setFieldValue('logo', file); // Set logo field
                formik.setFieldError('logo', ''); // Clear any previous errors
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove selected image
    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        formik.setFieldValue('logo', ''); // Clear logo field
        formik.setFieldError('logo', ''); // Clear logo errors
    };

    const handleCancel = () => {
        setAddTestimonial(false);
        setEditTestimonial(true);
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
                                        <h4 className="mb-0 fw-bold">Add New Testimonial</h4>
                                        <small className="opacity-75">Showcase client testimonials</small>
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

                        <div className="card-body p-4 mx-auto">
                            <form onSubmit={formik.handleSubmit} className="portfolio-form">
                                <div className="row g-4">
                                    {/* Logo Upload Section */}
                                    <div className="col-12">
                                        <div className="image-section p-4 bg-light rounded-3 mb-4">
                                            <h6 className="section-title text-primary mb-4 fw-bold">
                                                <i className="bi bi-image me-2"></i>
                                                Client Logo
                                            </h6>

                                            <div className="text-center">
                                                {/* Image Preview */}
                                                {imagePreview ? (
                                                    <div className="image-preview-container position-relative d-inline-block">
                                                        <img
                                                            src={imagePreview}
                                                            alt="Logo preview"
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
                                                        <p className="text-muted mb-3">Upload client logo</p>
                                                    </div>
                                                )}

                                                {/* File Input */}
                                                <div className="mt-4">
                                                    <label htmlFor="logoUpload" className="btn btn-outline-primary btn-lg">
                                                        <i className="bi bi-cloud-arrow-up me-2"></i>
                                                        {imagePreview ? 'Change Logo' : 'Choose Logo'}
                                                    </label>
                                                    <input
                                                        type="file"
                                                        id="logoUpload"
                                                        className="d-none"
                                                        accept="image/*"
                                                        onChange={handleImageChange}
                                                        onBlur={formik.handleBlur}
                                                        name="logo"
                                                    />
                                                    {formik.touched.logo && formik.errors.logo && (
                                                        <div className="text-danger small mt-2 d-flex align-items-center justify-content-center">
                                                            <i className="bi bi-exclamation-triangle me-2"></i>
                                                            {formik.errors.logo}
                                                        </div>
                                                    )}
                                                    <div className="mt-2">
                                                        <small className="text-muted">
                                                            Supported: JPG, PNG, GIF • Max: 5MB • Recommended: 200x200px
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Testimonial Details */}
                                    <div className="col-md-8 mx-auto">
                                        <div className="form-section h-100 p-4 bg-white rounded-3 shadow-sm">
                                            <h6 className="section-title text-primary mb-4 fw-bold">
                                                <i className="bi bi-info-circle me-2"></i>
                                                Testimonial Details
                                            </h6>

                                            <div className="mb-3">
                                                <label htmlFor="client_name" className="form-label fw-semibold">
                                                    Client Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    className={`form-control ${formik.touched.client_name && formik.errors.client_name ? 'is-invalid' : ''}`}
                                                    id="client_name"
                                                    name="client_name"
                                                    value={formik.values.client_name}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="e.g., TCS, Wipro etc"
                                                />
                                                {formik.touched.client_name && formik.errors.client_name && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.client_name}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="testimonial" className="form-label fw-semibold">
                                                    Testimonial *
                                                </label>
                                                <textarea
                                                    className={`form-control ${formik.touched.testimonial && formik.errors.testimonial ? 'is-invalid' : ''}`}
                                                    id="testimonial"
                                                    name="testimonial"
                                                    rows="4"
                                                    value={formik.values.testimonial}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter the client's testimonial..."
                                                />
                                                <div className="d-flex justify-content-between mt-1">
                                                    <small className="text-muted">
                                                        {formik.values.testimonial.length}/128 characters
                                                    </small>
                                                    {formik.touched.testimonial && formik.errors.testimonial && (
                                                        <small className="text-danger">
                                                            {formik.errors.testimonial}
                                                        </small>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="testimonial_order" className="form-label fw-semibold">
                                                    Order Number *
                                                </label>
                                                <input
                                                    type="number"
                                                    className={`form-control ${formik.touched.testimonial_order && formik.errors.testimonial_order ? 'is-invalid' : ''}`}
                                                    id="testimonial_order"
                                                    name="testimonial_order"
                                                    value={formik.values.testimonial_order}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    placeholder="Enter display order number"
                                                    min="1"
                                                />
                                                {formik.touched.testimonial_order && formik.errors.testimonial_order && (
                                                    <div className="invalid-feedback">
                                                        {formik.errors.testimonial_order}
                                                    </div>
                                                )}
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
                                                        Adding Testimonial...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-plus-circle me-2"></i>
                                                        Add Testimonial
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
}