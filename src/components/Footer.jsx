import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import translations from "./Translator.js";

const Footer = () => {
    const [content, setContent] = useState(translations.en);
    useEffect(() => {
        const lang = localStorage.getItem('language');
        if (lang) lang === 'en' ? setContent(translations.en) : setContent(translations.ka)
    }, [])

    return (
        <div className="footer kode">
            <div className="footer-left honk">
                <p className="honk" style={ {fontSize: 40} }>Kutaisi International University Dormitory</p>
            </div>
            <div className="footer-right">
                <label htmlFor="notes" className="footer-label">{content.LeaveNotes}:</label>
                <input type="text" id="notes" className="footer-input" placeholder="Hic Scientia futurum creat!" />
                <button className="footer-button">{content.SubmitNotes}</button>
                <div className="footer-icons">
                    <Link style={{textDecoration: 'none'}} to={"https://www.facebook.com/"}><i className="fab fa-facebook"></i></Link>
                    <Link style={{textDecoration: 'none'}} to={"https://www.linkedin.com/"}><i className="fab fa-linkedin"></i></Link>
                    <Link style={{textDecoration: 'none'}} to={"https://www.youtube.com/"}><i className="fab fa-youtube"></i></Link>
                    <Link style={{textDecoration: 'none'}} to={"https://www.instagram.com/"}><i className="fab fa-instagram"></i></Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
