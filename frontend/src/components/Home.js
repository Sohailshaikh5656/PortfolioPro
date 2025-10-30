import React, { useEffect, useState, useRef  } from 'react'
import Card from './professionalCards/card'

export default function Home() {
  const [users, setUsers] = useState(null)
  const [oldUsers, setOldUsers] = useState(null)
  const [profession, setProfession] = useState(null)
  const [location, setLocation] = useState(null)
  const [selectedProfession, setSelectedProfession] = useState('All Profession')
  const [selectedLocation, setSelectedLocation] = useState('All Location')
  const [selectSort, setSelectSort] = useState('a-z') // Changed default to match backend
  const searchValue = useRef(null)

  const fetchAllUsers = async (filters = {}) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(filters),
      })

      if (response.ok) {
        response = await response.json()
        if (response.code == 1) {
          setUsers(response.data)
          setOldUsers(response.data)
        } else if (response.code == 2) {
          setUsers(null)
        }
      }
    } catch (error) {
      console.error("Error : ", error)
    }
  }

  const fetchProfession = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/profession`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        },
      })

      if (response.ok) {
        response = await response.json()
        if (response.code == 1) {
          setProfession(response.data)
        }
      }
    } catch (error) {
      console.error("Error : ", error)
    }
  }

  const fetchCitys = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/location`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
        },
      })

      if (response.ok) {
        response = await response.json()
        if (response.code == 1) {
          setLocation(response.data)
        }
      }
    } catch (error) {
      console.error("Error : ", error)
    }
  }

  // Handle profession filter change
  const handleProfessionChange = (prof) => {
    setSelectedProfession(prof)
    const filters = {}
    if (prof !== 'All Profession') {
      filters.profession = prof
    }
    if (selectedLocation !== 'All Location') {
      filters.location = selectedLocation
    }
    filters.sort = selectSort // Use current sort value
    fetchAllUsers(filters)
  }

  // Handle location filter change
  const handleLocationChange = (location) => {
    setSelectedLocation(location)
    const filters = {}
    if (selectedProfession !== 'All Profession') {
      filters.profession = selectedProfession
    }
    if (location !== 'All Location') {
      filters.location = location
    }
    filters.sort = selectSort // Use current sort value
    fetchAllUsers(filters)
  }

  // Handle search


  // Handle sort change - FIXED
  const handleSort = (sorting) => {
    setSelectSort(sorting) // Update state first

    const filters = {}
    if (selectedProfession !== 'All Profession') {
      filters.profession = selectedProfession
    }
    if (selectedLocation !== 'All Location') {
      filters.location = selectedLocation
    }
    filters.sort = sorting // Use the new sorting value
    fetchAllUsers(filters)
  }

  useEffect(() => {
    fetchProfession()
    fetchAllUsers()
    fetchCitys()
  }, [])

  // Get display text for sort button
  const getSortDisplayText = () => {
    switch (selectSort) {
      case 'a-z': return 'Name A-Z';
      case 'z-a': return 'Name Z-A';
      case 'experience': return 'Experience';
      case 'rating': return 'Rating';
      default: return 'Sort by Name';
    }
  }
  const handleSearch = (keyword) =>{
    let searchKeyword = keyword.toLowerCase().trim()
    if(searchValue.current){
        clearTimeout(searchValue.current)
    }
    searchValue.current = setTimeout(()=>{
        if(searchKeyword == ""){
            setUsers(oldUsers)
            return;
        }
        const filterData = oldUsers.filter((item)=>item?.name.toLowerCase().includes(keyword) || 
        item?.profession.toLowerCase().includes(keyword))

        setUsers(filterData)

    },1500)
   
}

  return (
    <div className="container">
      <div className="row my-5">
        <div className="col-12 text-center">
          <h1 className='display-4 fw-bold text-primary mb-3'
            style={{
              color: '#001233',
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}>
            Meet Our Professionals
          </h1>
          <p className='lead text-muted mb-4 mx-auto'
            style={{
              maxWidth: '500px',
              fontFamily: "'Arial', 'Helvetica', sans-serif"
            }}>
            Meet the expert professionals shaping the future of technology
          </p>
          <div className="d-flex justify-content-center mb-4">
            <div className="bg-primary" style={{
              width: '80px',
              height: '4px',
              borderRadius: '2px'
            }}></div>
          </div>
        </div>
      </div>

      <div className="row my-4">
        <div className="col-12">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-stretch align-items-md-center gap-3">

            {/* Search Input */}
            <div className="flex-grow-1">
              <div className="input-group input-group-lg">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder="Enter keyword to search professionals..."

                  style={{
                    borderRadius: '0 50px 50px 0',
                    height: '60px'
                  }}
                  ref={searchValue} onChange={(e)=>{handleSearch(e.target.value)}}
                />
              </div>
            </div>

            {/* Filters Group */}
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-end" style={{ cursor: "pointer" }}>

              {/* Profession Filter */}
              <div className="dropdown">
                <button
                  className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  style={{ height: '60px', minWidth: '180px' }}
                >
                  <i className="bi bi-briefcase me-2"></i>
                  {selectedProfession}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item text-dark"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleProfessionChange('All Profession')
                      }}
                    >
                      All Profession
                    </a>
                  </li>
                  {profession && Array.isArray(profession) && profession.map((item, index) => {
                    const professionText = typeof item === 'string' ? item : item?.profession;
                    return (
                      <li key={index}>
                        <a
                          className="dropdown-item text-dark" style={{textTransform:"capitalize"}}
                          onClick={(e) => {
                            e.preventDefault()
                            handleProfessionChange(professionText)
                          }}
                        >
                          {professionText || 'Unknown Profession'}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Location Filter */}
              <div className="dropdown" style={{ cursor: "pointer" }}>
                <button
                  className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  style={{ height: '60px', minWidth: '160px' }}
                >
                  <i className="bi bi-geo-alt me-2"></i>
                  {selectedLocation}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item text-dark"
                      onClick={(e) => {
                        e.preventDefault()
                        handleLocationChange('All Location')
                      }}
                    >
                      All Location
                    </a>
                  </li>
                  {location && Array.isArray(location) && location.map((item, index) => (
                    <li key={index}>
                      <a style={{ textTransform: "capitalize" }}
                        className="dropdown-item text-dark"
                        onClick={(e) => {
                          e.preventDefault()
                          handleLocationChange(item?.city.toLowerCase())
                        }}
                      >
                        {item?.city}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sort Filter - FIXED */}
              <div className="dropdown" style={{ cursor: "pointer" }}>
                <button
                  className="btn btn-outline-secondary dropdown-toggle d-flex align-items-center"
                  type="button"
                  data-bs-toggle="dropdown"
                  style={{ height: '60px', minWidth: '160px' }}
                >
                  <i className="bi bi-sort-down me-2 text-dark"></i>
                  {getSortDisplayText()}
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item text-dark"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSort('a-z')
                      }}
                    >
                      Name A-Z
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-dark"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSort('z-a')
                      }}
                    >
                      Name Z-A
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-dark"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSort('experience')
                      }}
                    >
                      Experience
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-dark"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSort('rating')
                      }}
                    >
                      Rating
                    </a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        {Array.isArray(users) && users != null ? <Card users={users} /> :
          <>
            <div className='d-flex justify-content-center align-items-center flex-column py-4'>
              <i className="bi bi-person-x display-1 text-secondary mb-3"></i>
              <h3 className='text-secondary'>User Not Found !</h3>
            </div>
          </>}
      </div>
    </div>
  )
}