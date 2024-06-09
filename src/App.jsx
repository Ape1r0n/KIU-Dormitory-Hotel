import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import DormList from './components/DormList.jsx';
import Profile from './components/Profile.jsx';
import DormPage from './components/DormPage.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';

function App() {
    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<DormList />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/dorm/:id" element={<DormPage />} />
                </Routes>
                <Footer />
            </Router>
        </>
    );
}

export default App;
