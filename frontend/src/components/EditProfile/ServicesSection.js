import React from 'react'
import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'

export default function ServicesSection({ services }) {
    const [editBtn, setEditBtn] = useState(false)
    const [editingIndex, setEditingIndex] = useState(null)
    const [editId, setEditId] = useState(null)
    // Initial state for new service item
    const initialServiceItem = {
        title: '',
        description: ''
    }

    const [serviceItems, setServiceItems] = useState(() => {
        return services && Array.isArray(services) ? services : []
    })

    const validationSchema = Yup.object({
        title: Yup.string().required("Service title is required").min(3, "Title must be at least 3 characters"),
        description: Yup.string().required("Service description is required").min(10, "Description must be at least 10 characters")
    })

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this service?")) {
            try {
                let res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/services/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                })
                let response = await res.json()
                if (response.code == 1) {
                    toast.success("Deleted Successfully ")
                    alert("Deleted Successfully !")
                    let filterServices = serviceItems.filter((item) => item?.id != id);
                    setServiceItems(filterServices)
                } else {
                    toast.error("Error In Deleteing")
                    alert("ERROR In DELETING")
                    console.error("Error inn Deleting !")
                }
            } catch (error) {
                toast.error(`Error : ", ${error}`)
                console.error("Error : ", error)
            }
        }

    }

    const formik = useFormik({
        initialValues: initialServiceItem,
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;

                const serviceData = {
                    ...values,
                    id: editingIndex !== null ? serviceItems[editingIndex]?.id : null,
                    user_id: services[0].user_id || 1 // You might want to get this from props or context
                }
                const id = serviceData.id
                let newServices = serviceData;
                delete newServices?.id;
                newServices.userId = serviceData.user_id
                let newSerArr = [];
                newSerArr.push(newServices)

                const url = editingIndex !== null ? `${basicUrl}/services` : `${basicUrl}/services`;
                const method = editingIndex !== null ? "PUT" : "POST";
                let sendData
                if (editId == null) {
                    sendData = { services: newSerArr, skipSteps: true }
                } else {
                    delete serviceData?.user_id
                    delete serviceData?.userId
                    serviceData.id = id
                    sendData = serviceData
                }
                let response = await fetch(url, {
                    method: method,
                    body: JSON.stringify(sendData),
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                });

                response = await response.json();

                if (response.code == 1) {
                    alert(editingIndex !== null ? "Service Updated Successfully" : "Service Added Successfully");

                    // Update local state
                    if (editingIndex !== null) {
                        // Update existing item
                        const updatedItems = [...serviceItems];
                        updatedItems[editingIndex] = { ...serviceData, id: serviceItems[editingIndex].id };
                        setServiceItems(updatedItems);
                    } else {
                        // Add new item
                        setServiceItems(prev => [...prev, { ...serviceData, id: response.data?.id }]);
                    }

                    handleCancelEdit();
                } else {
                    alert(editingIndex !== null ? "Service Update Failed" : "Service Addition Failed");
                }

            } catch (error) {
                console.error("Error in Services Process : ", error);
            }
        }
    })

    // Edit service item
    const handleEdit = (index) => {
        const item = serviceItems[index];
        formik.setValues({
            title: item.title,
            description: item.description
        });
        setEditingIndex(index);
        setEditBtn(true);
    }

    // Add new service item
    const handleAddNew = () => {
        formik.resetForm();
        setEditingIndex(null);
        setEditBtn(true);
    }

    // Cancel editing
    const handleCancelEdit = () => {
        setEditBtn(false);
        setEditingIndex(null);
        formik.resetForm();
    }

    // Delete service item

    return (
        <>
        <ToastContainer />
            {editBtn ? (
                <div className="container-fluid mt-4">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="card edit-services-card shadow-lg border-0">
                                <div className="card-header bg-gradient-success text-white py-4">
                                    <div className="d-flex align-items-center">
                                        <i className="bi bi-gear me-3 fs-3"></i>
                                        <div>
                                            <h4 className="mb-0 fw-bold">
                                                {editingIndex !== null ? 'Edit Service' : 'Add New Service'}
                                            </h4>
                                            <small className="opacity-75">
                                                {editingIndex !== null ? 'Update your service details' : 'Add a new service to your offerings'}
                                            </small>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-body p-4">
                                    <form onSubmit={formik.handleSubmit} className="edit-services-form">
                                        <div className="row g-4">
                                            {/* Service Details */}
                                            <div className="col-12">
                                                <div className="form-section p-4 bg-white rounded-3 shadow-sm">
                                                    <h6 className="section-title text-success mb-4 fw-bold">
                                                        <i className="bi bi-info-circle me-2"></i>
                                                        Service Information
                                                    </h6>

                                                    <div className="mb-3">
                                                        <label htmlFor="title" className="form-label fw-semibold">
                                                            <i className="bi bi-tag me-1 text-success"></i>
                                                            Service Title *
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className={`form-control ${formik.touched.title && formik.errors.title ? 'is-invalid' : ''}`}
                                                            id="title"
                                                            name="title"
                                                            value={formik.values.title}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Enter service title (e.g., Web Development)"
                                                        />
                                                        {formik.touched.title && formik.errors.title && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.title}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label htmlFor="description" className="form-label fw-semibold">
                                                            <i className="bi bi-text-paragraph me-1 text-success"></i>
                                                            Service Description *
                                                        </label>
                                                        <textarea
                                                            className={`form-control ${formik.touched.description && formik.errors.description ? 'is-invalid' : ''}`}
                                                            id="description"
                                                            name="description"
                                                            rows="6"
                                                            value={formik.values.description}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            placeholder="Describe your service in detail..."
                                                        />
                                                        {formik.touched.description && formik.errors.description && (
                                                            <div className="invalid-feedback d-flex align-items-center">
                                                                <i className="bi bi-exclamation-triangle me-2"></i>
                                                                {formik.errors.description}
                                                            </div>
                                                        )}
                                                        <div className="form-text">
                                                            {formik.values.description.length}/500 characters
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="col-12">
                                                <div className="action-buttons pt-4 border-top text-center">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-success btn-lg px-5 me-3 text-white"
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
                                                                {editingIndex !== null ? 'Update Service' : 'Add Service'}
                                                            </>
                                                        )}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-secondary btn-lg px-5"
                                                        onClick={handleCancelEdit}
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
                <div className="card services-display-card shadow-lg border-0 overflow-hidden mt-4">
                    <div className="card-header bg-gradient-success text-white py-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <h4 className="mb-0 fw-bold">
                                <i className="bi bi-gear me-2"></i>
                                Services Section
                            </h4>
                            <span className="badge bg-light text-success fs-6">
                                <i className="bi bi-list-check me-1"></i>
                                {serviceItems.length} Services
                            </span>
                        </div>
                    </div>

                    <div className="card-body p-4">
                        {/* Add New Button */}
                        <div className="text-end mb-4">
                            <button
                                className="btn btn-success btn-lg px-4 py-2 fw-bold"
                                onClick={() => { handleAddNew(); setEditId(null) }}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add New Service
                            </button>
                        </div>

                        {/* Services Items Grid */}
                        {serviceItems.length > 0 ? (
                            <div className="row g-4">
                                {serviceItems.map((item, index) => (
                                    <div key={item.id || index} className="col-lg-6">
                                        <div className="service-item-card h-100 p-4 rounded-3 shadow-sm">
                                            <div className="service-header d-flex align-items-start justify-content-between mb-3">
                                                <div className="service-icon me-3">
                                                    <i className="bi bi-tools fs-2 text-success"></i>
                                                </div>
                                                <div className="service-content flex-grow-1">
                                                    <h6 className="fw-bold text-dark mb-2">{item.title}</h6>
                                                    <p className="text-muted small mb-0 service-description">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <div className="service-footer d-flex align-items-center justify-content-between mt-3 pt-3 border-top">
                                                <span className={`badge ${item.is_active ? 'bg-success' : 'bg-secondary'}`}>
                                                    <i className={`bi ${item.is_active ? 'bi-check-circle' : 'bi-pause-circle'} me-1`}></i>
                                                    {item.is_active ? 'Active' : 'Inactive'}
                                                </span>

                                                {/* Action Buttons */}
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn btn-outline-success btn-sm"
                                                        onClick={() => { handleEdit(index); setEditId(item?.id) }}
                                                    >
                                                        <i className="bi bi-pencil me-1"></i>
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() => handleDelete(item?.id)}
                                                    >
                                                        <i className="bi bi-trash me-1"></i>
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Timestamps */}
                                            <div className="service-timestamps mt-2">
                                                <small className="text-muted">
                                                    Updated: {new Date(item.updated_at).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-5">
                                <i className="bi bi-gear display-1 text-muted mb-3"></i>
                                <h5 className="text-muted">No Services Added Yet</h5>
                                <p className="text-muted">Start by adding your first service to showcase what you offer.</p>
                                <button
                                    className="btn btn-success mt-3"
                                    onClick={handleAddNew}
                                >
                                    <i className="bi bi-plus-circle me-2"></i>
                                    Add Your First Service
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <style jsx>{`
                .edit-services-card,
                .services-display-card {
                    border-radius: 20px;
                    overflow: hidden;
                }
                
                .bg-gradient-success {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%) !important;
                }
                
                .form-section {
                    border: 1px solid #e9ecef;
                    transition: all 0.3s ease;
                }
                
                .form-section:hover {
                    border-color: #28a745;
                    box-shadow: 0 4px 15px rgba(40, 167, 69, 0.1);
                }
                
                .section-title {
                    border-bottom: 2px solid #28a745;
                    padding-bottom: 0.75rem;
                }
                
                .service-item-card {
                    background: rgba(255, 255, 255, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }
                
                .service-item-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
                    border-color: #28a745;
                }
                
                .service-description {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .btn-success {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    border: none;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }
                
                .btn-success:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
                }
                
                .service-icon {
                    flex-shrink: 0;
                }
            `}</style>
        </>
    )
}