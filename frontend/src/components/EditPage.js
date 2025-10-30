import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import UserInfo from "./EditProfile/UserInfo"
import AboutEditSection from "./EditProfile/AboutSection"
import FooterSection from "./EditProfile/FooterSection"
import HeroSection from "./EditProfile/HeroSection"
import PortfolioSection from "./EditProfile/ProtfolioSection"
import ServicesSection from "./EditProfile/ServicesSection"
import TestimonialSection from "./EditProfile/TestimonialSection"

export default function EditPage() {
  const [user, setUser] = useState(null)
  const [step, setStep] = useState(0)
  const { id } = useParams()
  const navigate = useNavigate()

  const checkSteps = async() => {
    try{
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/userStep/${id}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        response = await response.json()
        if (response?.code == 1) {
          setStep(response.data)
          
          // Check step here and navigate immediately if step ≤ 7
          if (response.data <= 7) {
            navigate(`/pendingProfile/${id}`);
            return; // Stop further execution
          }
        } else if (response?.code == 2) {
        }
      }
    }catch(error){
      console.error("Error : ", error)
    }
  }
  
  const fetchData = async () => {
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/${id}`, {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        response = await response.json()
        if (response?.code == 1) {
          setUser(response.data)
        } else if (response?.code == 2) {
          console.error("No User Found !")
        }
      }
    } catch (error) {
      console.error("Error : ", error)
    }
  }

  useEffect(() => {
    checkSteps()
  }, [])

  // Only fetch user data if step > 7
  useEffect(() => {
    if (step > 7) {
      fetchData()
    }
  }, [step])

  const handleUserInfo = (getData) => {
    setUser((prev) => ({
      ...prev,
      user: Array.isArray(getData) ? getData : [getData],
    }));
  };
  
  const handleAboutSection = (getData) => {
    setUser((prev) => ({
      ...prev,
      about: Array.isArray(getData) ? getData : [getData],
    }));
  };
  
  const handleHeroSection = (getData) => {
    setUser((prev) => ({
      ...prev,
      hero: Array.isArray(getData) ? getData : [getData],
    }));
  };
  
  const handleUpdatePortfolio = (getData) => {
    setUser((prev) => ({
      ...prev,
      portfolio: Array.isArray(getData) ? getData : [getData],
    }));
  };
  
  const handleUpdateFooter = (getData) => {
    setUser((prev) => ({
      ...prev,
      footer: Array.isArray(getData) ? getData : [getData],
    }));
  };

  // Show loading while checking step
  if (step <= 7) {
    return (
      <div className="container mt-4 mb-5">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to pending profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mt-4 mb-5">
      {/* Enhanced Edit Profile Header */}
      <div className="mb-5 bg-white shadow-lg rounded-2xl p-5 mb-6 border-0 transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center mb-2">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-xl shadow-md mr-4">
            <i className="bi bi-pencil-square text-white text-xl"></i>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
            <p className="text-gray-500 text-sm mt-1">
              Update your personal information and account details here
            </p>
          </div>
        </div>
        
        {/* Progress indicator */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Profile Completion</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full w-full"></div>
          </div>
        </div>
      </div>

      {user ? (
        <>
          {user?.user && Array.isArray(user?.user) && <UserInfo user={user?.user} onUpdateUser={handleUserInfo} />}
          {user?.about && Array.isArray(user?.about) && <AboutEditSection about={user?.about[0]} onUpdateAbout={handleAboutSection} />}
          {user?.hero && Array.isArray(user?.hero) && <HeroSection hero={user?.hero[0]} onUpdateHero={handleHeroSection} />}
          {user?.portfolio && Array.isArray(user?.portfolio) && <PortfolioSection portfolio={user?.portfolio} onUpdatePortfolio={handleUpdatePortfolio} />}
          {user?.services && Array.isArray(user?.services) && <ServicesSection services={user?.services} />}
          {user?.testimonial && Array.isArray(user?.testimonial) && <TestimonialSection testimonial={user?.testimonial} />}
          {user?.footer && Array.isArray(user?.footer) && <FooterSection footer={user?.footer[0]} onUpdateFooter={handleUpdateFooter} />}
        </>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      )}
    </div>
  )
}