import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import translations from "./Translator.js";


const Header = () => {
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [content, setContent] = useState(translations.en);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    setIsLoggedIn(!!currentUser);
    setEmail(currentUser || '');
  }, []);

  useEffect(() => {
    const lang = localStorage.getItem('language');
    if (lang) lang === 'en' ? setContent(translations.en) : setContent(translations.ka)
  }, [])

  const toggleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('currentUser', email);
    localStorage.setItem('currentUsername', username);
    setIsLoggedIn(true);
    setShowLoginMenu(false);
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(`bookedDorms_${email}`);
    setEmail('');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleFacebookLogin = () => {
    window.location.href = 'https://www.facebook.com/login';
  };

  const handleCloseLoginMenu = () => {
    setShowLoginMenu(false);
  };

  const handleLanguageChange = () => {
    const currentLanguage = localStorage.getItem('language');
    localStorage.setItem('language', currentLanguage === 'en' ? 'ka' : 'en');
    window.location.reload();
  }

  const handleProfileClick = () => {
    if (!isLoggedIn) {
      alert(content.ProfileAlert);
      return;
    }
    navigate('/profile');
  };


  return (
      <header>
        <nav>
          <div className="left-section">
            <Link className="honk p0" href="/">KIU Dormitory Hotel</Link>
          </div>
          <div className="right-section">
            <div className="dropdown">
              <button className="kode" id="menu-button">{content.Menu}</button>
              <div className="dropdown-content">
                <Link className="kode" to="/">{content.Home}</Link>
                <Link className="kode" to="/about">{content.About}</Link>
                <Link className="kode" to="/contact">{content.ContactUs}</Link>
                <Link className="kode" to="/profile" onClick={handleProfileClick}>{content.Profile}</Link>
              </div>
            </div>
            {isLoggedIn ? (
                <button className="kode" id="logOut" onClick={handleLogout}>{content.LogOut}</button>
            ) : (
                <button className="kode" id="logIn" onClick={toggleLoginMenu}>{content.LogIn}</button>
            )}
            <button className="kode" id="change-language" onClick={handleLanguageChange}>👅</button>
          </div>
        </nav>
        {showLoginMenu && (
            <div className="login-menu">
              <div className="upper-login">
                <h2>{content.LogIn}</h2>
                <h2 onClick={handleCloseLoginMenu} id="close-button"><i className="fas fa-window-close"></i></h2>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div>
                  <label id="email-label">{content.Email}</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label id="username-label">{content.Username}</label>
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                  <label>{content.Password}</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">{content.LogIn}</button>
              </form>
              <button id="facebook-login" onClick={handleFacebookLogin}> {content.LogInWithFacebook} <a href="#"><i className="fab fa-facebook" style={{ color: '#FFF' }}></i></a>
              </button>
            </div>
        )}
      </header>
  );

};

export default Header;
