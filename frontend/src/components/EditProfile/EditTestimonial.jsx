import { useState, useEffect } from "react"
import { useFormik } from "formik"
import * as Yup from 'yup';
export default function EditTestimonial({ test, handleDelete, onTestimonialUpdate }) {
    const [data, setData] = useState(test)
    const [isEdit, setIsEdit] = useState(false)
    const [imagePreview, setImagePreview] = useState(data?.logo || null);
    const [selectedFile, setSelectedFile] = useState(null);

    // Initialize form with port data when component mounts or port changes
    useEffect(() => {
        if (test) {
            formik.setValues({
                client_name: data.client_name || '',
                testimonial: data.testimonial || '',
                testimonial_order: data.testimonial_order || '',
                logo: data.logo || '',
                user_id: data.user_id || ''
            });
            setImagePreview(`${process.env.REACT_APP_IMAGE_URL}/${data.logo}` || null);
        }
    }, []);

    const validationSchema = Yup.object({
        client_name: Yup.string()
            .required('Client Name is required')
            .min(3, 'Client Name must be at least 3 characters')
            .max(30, 'Client Name must be less than 30 characters'),
        testimonial: Yup.string()
            .required('Testimonal is required')
            .min(16, 'Testimonal must be at least 16 characters')
            .max(128, 'Testimonal must be less than 128 characters'),
        testimonial_order: Yup.number().min(1)
            .required('Testimonal Order is required'),
        logo: Yup.mixed()
            .required('Project image is required')
    });


    const formik = useFormik({
        initialValues: {
            client_name: data?.client_name || '',
            testimonial: data?.testimonial || '',
            testimonial_order: data?.testimonial_order || '',
            logo: data?.logo || '',
            user_id: data?.user_id || ''
        },
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                let imageUrl = data?.logo; // ✅ 'logo' use karein, 'image' nahi

                // Upload new image if selected
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append("profile_img", selectedFile);

                    let uploadResponse = await fetch(`${basicUrl}/upload-profile`, {
                        method: "POST",
                        body: formData,
                    });

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
                    logo: imageUrl, // ✅ 'logo' field use karein
                    id: data?.id // Include testimonial ID for update
                };

                console.log("Update Data:", updateData);

                // Use PUT for update
                const response = await fetch(`${basicUrl}/testimonials`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updateData),
                });

                // ✅ YEH PART CHANGE KARNA HAI - Pehle response.json() call karein
                const result = await response.json();
                console.log("Updating Result:", result);

                if (result.code == 1) { // ✅ Server ka actual response code check karein
                    console.log('Testimonial updated successfully:', result);
                    alert('Testimonial updated successfully!');

                    // ✅ Parent component ko update karein
                    if (onTestimonialUpdate) {
                        onTestimonialUpdate(updateData, updateData.id)
                    }

                    setIsEdit(false); // Exit edit mode
                } else {
                    alert("Error in Updating Testimonial: " + (result.message || "Unknown error"));
                }
            } catch (error) {
                console.error('Error updating Testimonial:', error);
                alert('Failed to update Testimonial. Please try again.');
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
                formik.setFieldError('logo', 'Please select an image file'); // ✅ 'logo' field
                return;
            }

            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                formik.setFieldError('logo', 'Image size must be less than 5MB'); // ✅ 'logo' field
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                formik.setFieldValue('logo', file); // ✅ 'logo' field set karein
                formik.setFieldError('logo', ''); // ✅ 'logo' errors clear karein
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        formik.setFieldValue('logo', ''); // ✅ 'logo' field clear karein
    };

    const handleCancelEdit = () => {
        setIsEdit(false);
        // Reset form to original port values
        if (data) {
            formik.setValues({
                client_name: data.client_name || '',
                testimonial: data.testimonial || '',
                testimonial_order: data.testimonial_order || '',
                logo: data.logo || '',
                user_id: data.user_id || ''
            });
            setImagePreview(data.image || null);
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
                                <h3 className="text-primary text-capitalize mb-0">{data?.client_name || "Untitled Project"}</h3>
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
                                    onClick={() => handleDelete(data?.id)}
                                >
                                    <i className="bi bi-trash me-1"></i>Delete
                                </button>
                            </div>
                        </div>

                        <div className="row g-4">
                            {/* Project Image Display */}
                            {/* Project Image Display */}
                            <div className="col-12">
                                <div className="image-section p-4 bg-light rounded-3">
                                    <h6 className="section-title text-primary mb-3 fw-bold">
                                        <i className="bi bi-image me-2"></i>
                                        Logo
                                    </h6>
                                    <div className="text-center">
                                        {data?.logo ? (
                                            <img
                                                src={`${process.env.REACT_APP_IMAGE_URL}/${data.logo}`} // ✅ Direct data.logo use karein
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
                                        Testimonail Details
                                    </h6>

                                    <div className="mb-3">
                                        <label className="form-label fw-semibold text-muted">Client Name</label>
                                        <div className="p-3 bg-light rounded">
                                            <strong>{data?.client_name || "No title provided"}</strong>
                                        </div>
                                    </div>

                                    <div className="mb-0">
                                        <label className="form-label fw-semibold text-muted">Testimonial Description</label>
                                        <div className="p-3 bg-light rounded">
                                            {data?.testimonial ? (
                                                <p className="mb-0" style={{ whiteSpace: 'pre-wrap' }}>
                                                    {data.testimonial}
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
                                        Testimonal Setting
                                    </h6>

                                    <div className="mb-4">
                                        <label className="form-label fw-semibold text-muted">Display Order</label>
                                        <div className="p-3 bg-light rounded text-center">
                                            <span className="badge bg-primary fs-6">
                                                #{data?.testimonial_order || "1"}
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
                                <h3 className="text-primary mb-0">Edit Testimonial</h3>
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
                                            Logo
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
                                                <label htmlFor={`projectImage-${data?.id}`} className="btn btn-outline-primary">
                                                    <i className="bi bi-cloud-arrow-up me-2"></i>
                                                    {imagePreview ? 'Change Image' : 'Choose Image'}
                                                </label>
                                                <input
                                                    type="file"
                                                    id={`projectImage-${data?.id}`}
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
                                            Testimonal Details
                                        </h6>

                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label fw-semibold">Client Name *</label>
                                            <input
                                                type="text"
                                                className={`form-control ${formik.touched.client_name && formik.errors.client_name ? 'is-invalid' : ''}`}
                                                id="client_name"
                                                name="client_name"
                                                value={formik.values.client_name}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.client_name && formik.errors.client_name && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.client_name}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mb-0">
                                            <label htmlFor="testimonial" className="form-label fw-semibold">Testimonial Description *</label>
                                            <textarea
                                                className={`form-control ${formik.touched.testimonial && formik.errors.testimonial ? 'is-invalid' : ''}`}
                                                id="testimonial"
                                                name="testimonial"
                                                rows="4"
                                                value={formik.values.testimonial}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            <div className="d-flex justify-content-between mt-1">
                                                <small className="text-muted">
                                                    {formik.values.testimonial.length}/500 characters
                                                </small>
                                                {formik.touched.testimonial && formik.errors.testimonial && (
                                                    <small className="text-danger">
                                                        {formik.errors.testimonial}
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
                                            <label htmlFor="testimonial_order" className="form-label fw-semibold">Display Order *</label>
                                            <input
                                                type="number"
                                                className={`form-control ${formik.touched.testimonial_order && formik.errors.testimonial_order ? 'is-invalid' : ''}`}
                                                id="project_order"
                                                name="testimonial_order"
                                                min="1"
                                                max="100"
                                                value={formik.values.testimonial_order}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                            {formik.touched.testimonial_order && formik.errors.testimonial_order && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.testimonial_order}
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
                                                        Update Testimonial
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