import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from 'yup';

export default function EditPortfolioSection({ port, onUpdatePortfolio, onDeletePortfolio }) {
    const [isEdit, setIsEdit] = useState(false)
    const [imagePreview, setImagePreview] = useState(port?.image || null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Initialize form with port data when component mounts or port changes
    useEffect(() => {
        if (port) {
            formik.setValues({
                title: port.title || '',
                link: port.link || '',
                project_order: port.project_order || '',
                description: port.description || '',
                image: port.image || '',
                user_id: port.user_id || ''
            });
            setImagePreview(`${process.env.REACT_APP_IMAGE_URL}/${port.image}` || null);
        }
    }, [port]);

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
            .test('file-or-url', 'Project image is required', function(value) {
                // Allow existing image URL or new file
                if (port?.image || value) return true;
                return false;
            })
    });

    const formik = useFormik({
        initialValues: {
            title: port?.title || '',
            link: port?.link || '',
            project_order: port?.project_order || '',
            description: port?.description || '',
            image: port?.image || '',
            user_id: port?.user_id || ''
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                let imageUrl = port?.image; // Keep existing image by default

                // Upload new image if selected
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append("profile_img", selectedFile);

                    let uploadResponse = await fetch(`${basicUrl}/upload-profile`, {
                        method: "POST",
                        body: formData,
                    });

                    console.log("Image Response : ",uploadResponse)

                    uploadResponse = await uploadResponse.json();
                    if (uploadResponse.code == 1) {
                        imageUrl = uploadResponse.data;
                    } else {
                        alert("Failed to Upload Image");
                        setSubmitting(false);
                        return;
                    }
                }

                // Prepare data for update
                const updateData = {
                    ...values,
                    image: imageUrl,
                    id: port?.id // Include portfolio ID for update
                };

                // Use PUT for update instead of POST
                const response = await fetch(`${basicUrl}/portfolio`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
                });

                if (response.ok) {
                    const result = await response.json();
                    onUpdatePortfolio({
                        ...updateData,
                        is_active: port.is_active,
                        created_at: port.created_at,
                        updated_at: new Date()
                    })
                    console.log('Portfolio updated successfully:', result);
                    alert('Project updated successfully!');
                    setIsEdit(false); // Exit edit mode
                    // You might want to refresh the parent component's data here
                } else {
                    throw new Error('Failed to update portfolio');
                }
            } catch (error) {
                console.error('Error updating portfolio:', error);
                alert('Failed to update portfolio. Please try again.');
            } finally {
                setSubmitting(false);
            }
        }
    });

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

    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        formik.setFieldValue('image', '');
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        // Reset form to original port values
        if (port) {
            formik.setValues({
                title: port.title || '',
                link: port.link || '',
                project_order: port.project_order || '',
                description: port.description || '',
                image: port.image || '',
                user_id: port.user_id || ''
            });
            setImagePreview(port.image || null);
            setSelectedFile(null);
        }
    };

    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-0">
                {!isEdit ? (
                    // DISPLAY MODE
                    <div className="p-4">
                        <div className="row align-items-center mb-3">
                            <div className="col">
                                <h3 className="text-primary text-capitalize mb-0">{port?.title || "Untitled Project"}</h3>
                            </div>
                            <div className="col-auto">
                                <button
                                    type="button"
                                    className="btn btn-primary mx-2"
                                    onClick={() => setIsEdit(true)}
                                >
                                    <i className="bi bi-pencil me-1"></i>Edit
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger mx-2"
                                    onClick={() => onDeletePortfolio(port?.id)}
                                >
                                    <i className="bi bi-trash me-1"></i>Delete
                                </button>
                            </div>
                        </div>

                        <div className="row g-4">
                            {/* Project Image Display */}
                            <div className="col-12">
                                <div className="image-section p-4 bg-light rounded-3">
                                    <h6 className="section-title text-primary mb-3 fw-bold">
                                        <i className="bi bi-image me-2"></i>
                                        Project Image
                                    </h6>
                                    <div className="text-center">
                                        {port?.image ? (
                                            <img
                                                src={`${process.env.REACT_APP_IMAGE_URL}/${formik.values.image}`}
                                                alt="Project preview"
                                                className="img-fluid rounded shadow"
                                                style={{
                                                    maxHeight: '200px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        ) : (
                                            <div className="image-placeholder bg-white rounded p-5 border-dashed">
                                                <i className="bi bi-image display-4 text-muted mb-3"></i>
                                                <p className="text-muted mb-0">No image available</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Project Details Display */}
                            <div className="col-md-8">
                                <div className="details-section p-4 bg-white rounded-3 shadow-sm">
                                    <h6 className="section-title text-primary mb-3 fw-bold">
                                        <i className="bi bi-info-circle me-2"></i>
                                        Project Details
                                    </h6>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-muted">Project Title</label>
                                        <div className="p-3 bg-light rounded">
                                            <strong>{port?.title || "No title provided"}</strong>
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-muted">Project Link</label>
                                        <div className="p-3 bg-light rounded">
                                            {port?.link ? (
                                                <a
                                                    href={port.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-primary text-decoration-none"
                                                >
                                                    <i className="bi bi-box-arrow-up-right me-1"></i>
                                                    {port.link}
                                                </a>
                                            ) : (
                                                <span className="text-muted">No link provided</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-0">
                                        <label className="form-label fw-semibold text-muted">Project Description</label>
                                        <div className="p-3 bg-light rounded">
                                            {port?.description ? (
                                                <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                                                    {port.description}
                                                </p>
                                            ) : (
                                                <span className="text-muted">No description provided</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Project Settings Display */}
                            <div className="col-md-4">
                                <div className="settings-section p-4 bg-white rounded-3 shadow-sm">
                                    <h6 className="section-title text-primary mb-3 fw-bold">
                                        <i className="bi bi-gear me-2"></i>
                                        Project Settings
                                    </h6>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-muted">Display Order</label>
                                        <div className="p-3 bg-light rounded text-center">
                                            <span className="badge bg-primary fs-6">
                                                #{port?.project_order || "1"}
                                            </span>
                                        </div>
                                        <small className="text-muted">Lower numbers appear first</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    // EDIT MODE
                    <div className="p-4">
                        <div className="row align-items-center mb-3">
                            <div className="col">
                                <h3 className="text-primary mb-0">Edit Project</h3>
                            </div>
                            <div className="col-auto">
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={handleCancelEdit}
                                >
                                    <i className="bi bi-x-circle me-1"></i>Cancel
                                </button>
                            </div>
                        </div>

                        <form onSubmit={formik.handleSubmit}>
                            <div className="row g-4">
                                {/* Image Upload Section */}
                                <div className="col-12">
                                    <div className="image-section p-4 bg-light rounded-3">
                                        <h6 className="section-title text-primary mb-3 fw-bold">
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
                                                        className="img-fluid rounded shadow"
                                                        style={{
                                                            maxHeight: '200px',
                                                            objectFit: 'cover'
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
                                                <label htmlFor={`projectImage-${port?.id}`} className="btn btn-outline-primary">
                                                    <i className="bi bi-cloud-arrow-up me-2"></i>
                                                    {imagePreview ? 'Change Image' : 'Choose Image'}
                                                </label>
                                                <input
                                                    type="file"
                                                    id={`projectImage-${port?.id}`}
                                                    className="d-none"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                />
                                                {formik.touched.image && formik.errors.image && (
                                                    <div className="text-danger small mt-2">
                                                        <i className="bi bi-exclamation-triangle me-2"></i>
                                                        {formik.errors.image}
                                                    </div>
                                                )}
                                                <div className="mt-2">
                                                    <small className="text-muted">
                                                        Supported: JPG, PNG, GIF • Max: 5MB
                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Details Form */}
                                <div className="col-md-8">
                                    <div className="form-section p-4 bg-white rounded-3 shadow-sm">
                                        <h6 className="section-title text-primary mb-3 fw-bold">
                                            <i className="bi bi-info-circle me-2"></i>
                                            Project Details
                                        </h6>

                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label fw-semibold">Project Title *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                                                id="title"
                                                name="title"
                                                value={formik.values.title}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.title && formik.errors.title && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.title}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="link" className="form-label fw-semibold">Project Link *</label>
                                            <input
                                                type="url"
                                                className={`form-control ${formik.touched.link && formik.errors.link ? 'is-invalid' : ''}`}
                                                id="link"
                                                name="link"
                                                value={formik.values.link}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.link && formik.errors.link && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.link}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-0">
                                            <label htmlFor="description" className="form-label fw-semibold">Project Description *</label>
                                            <textarea
                                                className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                                id="description"
                                                name="description"
                                                rows="4"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
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

                                {/* Project Settings Form */}
                                <div className="col-md-4">
                                    <div className="form-section p-4 bg-white rounded-3 shadow-sm">
                                        <h6 className="section-title text-primary mb-3 fw-bold">
                                            <i className="bi bi-gear me-2"></i>
                                            Project Settings
                                        </h6>

                                        <div className="mb-4">
                                            <label htmlFor="project_order" className="form-label fw-semibold">Display Order *</label>
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
                                            />
                                            {formik.touched.project_order && formik.errors.project_order && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.project_order}
                                                </div>
                                            )}
                                            <small className="text-muted">Lower numbers appear first</small>
                                        </div>

                                        <div className="text-center mt-4">
                                            <button
                                                type="submit"
                                                className="btn btn-success w-100"
                                                disabled={formik.isSubmitting}
                                            >
                                                {formik.isSubmitting ? (
                                                    <>
                                                        <span className="spinner-border spinner-border-sm me-2"></span>
                                                        Updating...
                                                    </>
                                                ) : (
                                                    <>
                                                        <i className="bi bi-check-circle me-2"></i>
                                                        Update Project
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}