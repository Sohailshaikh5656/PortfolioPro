import React from 'react'
import { useState, useEffect } from 'react'
import AddTestimonial from './AddTestimonial';
import EditTestimonial from './EditTestimonial';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function TestimonialSection({ testimonial }) {
    const [addTestimonial, setAddTestimonial] = useState(false);
    const [testimonialData, setTestimonialData] = useState(testimonial || []);
    const [editTestimonial, setEditTestimonial] = useState(true);
    const {id} = useParams()
    // Sync with prop changes
    useEffect(() => {
        setTestimonialData(testimonial || []);
    }, [testimonial]);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this Testimonial?")) {
            
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/testimonials/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                });
    
                const response = await res.json();
    
                if (response.code == 1) {
                    toast.success("Deleted Successfully");
                    alert("Deleted Successfully");
    
                    // ✅ YEH PART CHANGE KARNA HAI - Direct ID comparison
                    const filterData = testimonialData.filter((item) => {
                        // Check all possible ID fields
                        return (item?.id !== id && item?._id !== id && item?.testimonial_id !== id);
                    });

                    setTestimonialData(filterData);
                } else {
                    toast.error("Error in Deleting: " + (response.message || "Unknown error"));
                    alert("Error in Deleting: " + (response.message || "Unknown error"));
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Something went wrong while deleting");
                alert("Something went wrong while deleting");
            }
        }
    };

    // Handle adding new testimonial to the list
    const handleAddTestimonial = (newTestimonial) => {
        setTestimonialData(prev => [...prev, newTestimonial]);
        setAddTestimonial(false);
        setEditTestimonial(true);
    };

    // Handle testimonial update
    const handleUpdateTestimonial = (updatedTestimonial, id) => {
        const filteredArr = [...testimonialData]; // ✅ New array create karein
        for(let i = 0; i < filteredArr.length; i++) {
            if(filteredArr[i].id == id) {
                filteredArr[i] = { ...filteredArr[i], ...updatedTestimonial }; // ✅ Copy bana ke update karein
            }
        }
    
        setTestimonialData(filteredArr);
    };

    return (
        <>
            <div className="container bg-white">
                <ToastContainer />
                {addTestimonial && (
                    <div className="my-3">
                        <AddTestimonial 
                            user_id={testimonialData[0]?.user_id || id} 
                            setAddTestimonial={setAddTestimonial} 
                            setEditTestimonial={setEditTestimonial}
                            onTestimonialAdded={handleAddTestimonial}
                        />
                        <br />
                    </div>
                )}
                
                {!addTestimonial && editTestimonial && (
                    <>
                        <div className="container-fluid my-5">
                            <div className="row justify-content-center">
                                <div className="col-lg-12 my-4 col-xl-12 text-white">
                                    <div className="card add-portfolio-card shadow-lg border-0">
                                        <div className="card-header bg-gradient-primary text-white py-4">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">
                                                    <i className="bi bi-pencil-square me-3 fs-3"></i>
                                                    <div>
                                                        <h4 className="mb-0 fw-bold text-white">Edit Testimonials</h4>
                                                        <small className="opacity-75 text-white">Manage and update your client testimonials</small>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    className="btn btn-light btn-sm"
                                                    onClick={() => { setAddTestimonial(true); setEditTestimonial(false); }}
                                                >
                                                    <i className="bi bi-plus-lg me-1"></i>Add New Testimonial
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                {testimonialData && Array.isArray(testimonialData) && testimonialData.length > 0 ? (
                                    testimonialData.map((item, index) => (
                                        <div key={item?.id || item?._id || index} className="col-6 mb-4">
                                            <EditTestimonial 
                                                test={item} 
                                                setTestimonialData={setTestimonialData}
                                                onTestimonialUpdate={handleUpdateTestimonial}
                                                handleDelete={handleDelete} 
                                            />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-12 text-center py-5">
                                        <h5 className="text-muted">No testimonials found</h5>
                                        <p className="text-muted">Add your first testimonial to get started</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            <style jsx>{`
                .add-portfolio-card {
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
                
                .project-preview-image {
                    transition: transform 0.3s ease;
                }
                
                .project-preview-image:hover {
                    transform: scale(1.02);
                }
                
                .border-dashed {
                    border: 2px dashed #dee2e6 !important;
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
                
                .btn-success {
                    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                    border: none;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }
                
                .btn-success:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
                }
                
                .image-section {
                    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                }
                
                .project-info-card {
                    border-left: 4px solid #667eea;
                }
            `}</style>
        </>
    )
}