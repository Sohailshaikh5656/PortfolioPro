import './App.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Portfolio from './components/Portfolio';
import Navbar from './components/common/Navbar';
import TemplateSelect from './components/TemplateSelect';
import NewProfile from './components/NewProfile';
import UserSection from './components/UserSite/UserSection';
import EditPage from './components/EditPage';
import Footer from './components/common/Footer';
import PendingProfile from './components/pendingProfile';
import { useEffect, useState } from 'react';

// Create a separate component to handle footer logic
function FooterHandler() {
  const [footerState, setFooterState] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if current path includes '/portfolio/'
    if (!location.pathname.includes('/portfolio/')) {
      setFooterState(true);
    } else {
      setFooterState(false);
    }
  }, [location.pathname]); // Add pathname as dependency

  return footerState ? <Footer /> : null;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/select-template" element={<TemplateSelect />} />
        <Route path="/new-profile" element={<NewProfile />} />
        <Route path="/portfolio/:id" element={<UserSection />} />
        <Route path="/edit-profile/:id" element={<EditPage />} />
        <Route path="/pendingProfile/:id" element={<PendingProfile />} />
      </Routes>
      <FooterHandler />
    </BrowserRouter>
  );
}

export default App;