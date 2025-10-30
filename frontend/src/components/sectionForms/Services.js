import React, { useState } from 'react'
import { useFormik } from "formik"
import * as Yup from "yup"
import { toast, ToastContainer } from 'react-toastify'

export default function ServicesSection({ setForm }) {
    const [services, setServices] = useState([
        { title: "", description: "" }
    ])

    const validationSchema = Yup.object({
        services: Yup.array().of(
            Yup.object({
                title: Yup.string().min(3, "Title must be at least 3 characters").required("Service title is required"),
                description: Yup.string().min(10, "Description must be at least 10 characters").required("Service description is required")
            })
        ).min(1, "At least one service is required")
    })

    const formik = useFormik({
        initialValues: { services },
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { resetForm }) => {
            try {
                let basicUrl = process.env.REACT_APP_BACKEND_URL;
                let url = basicUrl + "/services"
                // Prepare the data for submission
                const submitData = {
                    services: values.services,
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
                    setServices([{ title: "", description: "" }])
                    toast.success("Services Added successfully! Moving to next step.")
                    alert("Services Added successfully! Moving to next step.")
                    setTimeout(() => {
                        setForm("Products") // Replace with your next form component
                    }, 1000)
                }else{
                    toast.error("Something Went Wrong !")
                }

            } catch (error) {
                console.error("Error !", error)
                toast.error(`Error !" ${error}`)
            }
        }
    })

    // Add new service field
    const addService = () => {
        const newServices = [...services, { title: "", description: "" }]
        setServices(newServices)
        formik.setFieldValue("services", newServices)
    }

    // Remove service field
    const removeService = (index) => {
        if (services.length > 1) {
            const newServices = services.filter((_, i) => i !== index)
            setServices(newServices)
            formik.setFieldValue("services", newServices)
        }
    }

    // Handle input change for service fields
    const handleServiceChange = (index, field, value) => {
        const newServices = services.map((service, i) => 
            i === index ? { ...service, [field]: value } : service
        )
        setServices(newServices)
        formik.setFieldValue("services", newServices)
    }

    return (
        <div className="container my-1">
            <ToastContainer />
            <div className="row my-3">
                <div className="col-12 col-sm-10 col-md-8 col-lg-8 mx-auto">
                    <form onSubmit={formik.handleSubmit} noValidate className="p-4 bg-light rounded-4 shadow-sm">
                        {/* Form Header */}
                        <div className="text-center mb-4">
                            <h2 className="fw-bold text-primary mb-2">Services</h2>
                            <p className="text-muted">Add the services you offer</p>
                        </div>

                        {/* Services List */}
                        {services.map((service, index) => (
                            <div key={index} className="mb-4 p-4 border rounded-3 bg-white position-relative">
                                {/* Remove button for additional services */}
                                {services.length > 1 && (
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2"
                                        onClick={() => removeService(index)}
                                        title="Remove service"
                                    >
                                        <i className="bi bi-x-lg"></i>
                                    </button>
                                )}

                                <h5 className="text-secondary mb-3">
                                    Service {index + 1}
                                </h5>

                                {/* Service Title */}
                                <div className="mb-3">
                                    <label htmlFor={`service-title-${index}`} className="form-label fw-semibold text-dark">
                                        Service Title <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0">
                                            <i className="bi bi-briefcase text-muted"></i>
                                        </span>
                                        <input
                                            type="text"
                                            id={`service-title-${index}`}
                                            className={`form-control border-start-0 ${
                                                formik.errors.services?.[index]?.title && formik.touched.services?.[index]?.title ? 'is-invalid' : ''
                                            }`}
                                            placeholder="e.g., Web Development, Mobile App Development"
                                            value={service.title}
                                            onChange={(e) => handleServiceChange(index, 'title', e.target.value)}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.errors.services?.[index]?.title && formik.touched.services?.[index]?.title && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.services[index].title}
                                        </div>
                                    )}
                                </div>

                                {/* Service Description */}
                                <div className="mb-3">
                                    <label htmlFor={`service-description-${index}`} className="form-label fw-semibold text-dark">
                                        Service Description <span className="text-danger">*</span>
                                    </label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-white border-end-0 align-items-start pt-2">
                                            <i className="bi bi-text-paragraph text-muted"></i>
                                        </span>
                                        <textarea
                                            rows={3}
                                            id={`service-description-${index}`}
                                            className={`form-control border-start-0 ${
                                                formik.errors.services?.[index]?.description && formik.touched.services?.[index]?.description ? 'is-invalid' : ''
                                            }`}
                                            placeholder="Describe what this service includes, technologies used, etc."
                                            value={service.description}
                                            onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.errors.services?.[index]?.description && formik.touched.services?.[index]?.description && (
                                        <div className="invalid-feedback d-block mt-2">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            {formik.errors.services[index].description}
                                        </div>
                                    )}
                                    <div className="form-text">
                                        Minimum 10 characters required
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Add More Services Button */}
                        <div className="mb-4 text-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={addService}
                            >
                                <i className="bi bi-plus-circle me-2"></i>
                                Add More Services
                            </button>
                            <div className="form-text mt-2">
                                Currently {services.length} service{services.length !== 1 ? 's' : ''} added
                            </div>
                        </div>

                        {/* Array-level validation error */}
                        {formik.errors.services && typeof formik.errors.services === 'string' && (
                            <div className="alert alert-warning d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle me-2"></i>
                                {formik.errors.services}
                            </div>
                        )}

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
                                        Adding Services...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Save Services
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