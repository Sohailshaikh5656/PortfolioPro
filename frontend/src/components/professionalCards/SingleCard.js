import React from 'react';
import { useNavigate } from 'react-router-dom'

export default function SingleCard({ user }) {
  // Default image if user image fails to load
  const defaultImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face";
  
  // Handle image error
  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };
  
  const navigate = useNavigate()

  // Generate star rating - KEEP ONLY THIS ONE
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="bi bi-star-fill text-warning"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="bi bi-star-half text-warning"></i>);
      } else {
        stars.push(<i key={i} className="bi bi-star text-warning"></i>);
      }
    }

    return stars;
  };

  return (
    <div className="card user-card h-100 shadow-sm border-0">
      {/* Card Header with Image and Badges */}
      <div className="card-header position-relative border-0 p-0">
        <div className="image-container position-relative">
          <img
            src={`${process.env.REACT_APP_IMAGE_URL}/${user?.image}` || defaultImage}
            className="card-img-top user-image rounded-circle mx-auto mt-4"
            alt={user?.name}
            style={{
              height: '180px',
              width: '180px',
              objectFit: 'cover',
              border: '6px solid #FFD700',
              boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)'
            }}
            onError={handleImageError}
          />

          {/* Rating Badge with Stars */}
          <span className="position-absolute top-0 end-0 m-3">
            <span className="badge bg-white text-dark fs-6 shadow rating-badge p-2">
              <div className="d-flex align-items-center">
                <span className="me-2 fw-bold">{user?.rating || '5.0'}</span> {/* Added fallback */}
                <div className="star-rating">
                 {renderStarRating(Math.floor(Math.random() * 5) + 1)}
                </div>
              </div>
            </span>
          </span>

          {/* Experience Badge */}
          <span className="position-absolute top-0 start-0 m-3">
            <span className="badge bg-info text-white fs-6 shadow experience-badge">
              <i className="bi bi-award me-1"></i>
              {user?.experience || '5'} years {/* Added fallback */}
            </span>
          </span>

          {/* Projects Badge */}
          <span className="position-absolute bottom-0 start-0 m-3">
            <span className="badge bg-success text-white fs-6 shadow projects-badge">
              <i className="bi bi-briefcase me-1"></i>
              {user?.projects_count || '25'} Projects {/* Added fallback */}
            </span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        {/* Name and Profession */}
        <div className="text-center mb-3">
          <h4 className="card-title fw-bold text-dark mb-1">{user?.name}</h4>
          <h6 className="card-subtitle text-primary fw-semibold profession-text">
            <i className="bi bi-briefcase me-2"></i>
            {user?.profession}
          </h6>
        </div>

        {/* Location and Age */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge bg-light text-dark border location-badge">
            <i className="bi bi-geo-alt-fill me-1 text-primary"></i>
            {user?.city}, {user?.state}
          </span>
          <span className="badge bg-light text-dark border age-badge">
            <i className="bi bi-person-fill me-1 text-primary"></i>
            {user?.age || '35'} years
          </span>
        </div>

        {/* Description */}
        <p className="card-text flex-grow-1 text-muted mb-3 description-text">
          <i className="bi bi-quote me-1 text-primary opacity-50"></i>
          {user?.bio?.length>128?user?.bio.slice(0,128)+"..." : user?.bio}
        </p>

        {/* Skills Section */}
        <div className="mb-3">
          <h6 className="fw-semibold mb-2 text-dark skills-title">
            <i className="bi bi-tools me-2"></i>
            Professional Skills:
          </h6>
          <div className="d-flex flex-wrap gap-2">
            {user?.skills ? JSON.parse(user?.skills)?.map((skill, index) => (
              <span
                key={index}
                className="badge skill-badge fw-medium"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  fontSize: '0.8rem',
                  padding: '0.5em 0.8em'
                }}
              >
                {skill}
              </span>
            )) : (
              <span className="badge bg-secondary">No skills listed</span>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="contact-info mb-3">
          <h6 className="fw-semibold mb-2 text-dark">
            <i className="bi bi-telephone-outbound me-2"></i>
            Contact Information:
          </h6>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center contact-item">
              <i className="bi bi-envelope-fill me-2 text-primary contact-icon"></i>
              <small className="text-truncate contact-text">{user?.email}</small>
            </div>
            <div className="d-flex align-items-center contact-item">
              <i className="bi bi-telephone-fill me-2 text-primary contact-icon"></i>
              <small className="contact-text">{user?.phone}</small>
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="mt-auto">
          <hr className="my-2 border-primary opacity-25" />
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted timestamp created-date">
              <i className="bi bi-plus-circle me-1"></i>
              Created: {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
            </small>
            <small className="text-muted timestamp updated-date">
              <i className="bi bi-arrow-clockwise me-1"></i>
              Updated: {user?.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
            </small>
          </div>
        </div>
      </div>

      {/* Card Footer with Action Buttons */}
      <div className="card-footer bg-transparent border-0 pt-0">
        <div className="d-grid gap-2 d-md-flex justify-content-md-between">
          <button className="btn btn-primary btn-sm profile-btn text-light" onClick={() => {
            navigate(`/portfolio/${user?.id}`) // Dynamic routing based on user ID
          }}>
            <i className="bi bi-person-badge me-1"></i>View Profile
          </button>
          <button className="btn btn-success btn-sm profile-btn text-light" onClick={() => {
            navigate(`/edit-profile/${user?.id}`) // Dynamic routing based on user ID
          }}>
            <i className="bi bi-person-badge me-1"></i>Edit
          </button>
        </div>
      </div>
    </div>
  );
}