import {useEffect, useState} from "react";
import '../styles/About.css';
import image from '../assets/Founders.png';
import translations from "./Translator.js";


const About = () => {
    const [content, setContent] = useState(translations.en);
    useEffect(() => {
        const lang = localStorage.getItem('language');
        if (lang) lang === 'en' ? setContent(translations.en) : setContent(translations.ka)
    }, [])

    return (
        <>
            <div className="about">
                <div className="left-about">
                    <h1>{content.AboutUs}</h1>
                    <h2>{content.YourComfortIsOurGain} 🤑</h2>
                    <div style={{marginBottom: '3rem'}}></div>
                    <h3>{content.Message1}</h3>
                    <h3>{content.Message2}</h3>
                    <ul>
                        <li>{content.Floor} 1: 249.99 💵</li>
                        <li>{content.Floor} 2: 254.99 💸</li>
                        <li>{content.Floor} 3: 499.99 💰</li>
                        <li>{content.Floor} 4: 504.99 🏦</li>
                    </ul>
                    <h3>{content.Message3}</h3>
                    <div style={{marginBottom: '2rem'}}></div>
                    <h3>{content.Message4}</h3>
                    <div style={{marginBottom: '2rem'}}></div>
                    <h3>{content.Message5}</h3>
                </div>
                <div className="right-about">
                    <img src={image} alt="About" />
                </div>
            </div>
        </>
    );
};

export default About;
