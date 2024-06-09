import React, { useEffect, useState } from 'react';
import '../styles/Contact.css';
import translations from './Translator.js';
import {Link} from "react-router-dom";


const Contact = () => {
    const [content, setContent] = useState(translations.en);
    useEffect(() => {
        const lang = localStorage.getItem('language');
        if (lang) lang === 'en' ? setContent(translations.en) : setContent(translations.ka)
    }, []);

    return (
        <div className="contact">
            <h1>{content.ContactUs}</h1>
            <div className="contact-info">
                <p><strong>{content.Phone}:</strong> +995 599 126 005</p>
                <p><strong>{content.Website}:</strong> <Link style={{textDecoration: 'none'}} to={"https://www.kiu.edu.ge"}>https://www.kiu.edu.ge</Link></p>
            </div>
            <form>
                <label htmlFor="name">{content.Name}:</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">{content.Email}:</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="message">{content.Message}:</label>
                <textarea id="message" name="message" rows="4" />
                <div className="newsletter">
                    <input type="checkbox" id="subscribe" name="subscribe" />
                    <label htmlFor="subscribe">{content.SubscribeToNewsletter}</label>
                </div>
                <button type="submit">{content.Submit}</button>
            </form>
        </div>
    );
};

export default Contact;
