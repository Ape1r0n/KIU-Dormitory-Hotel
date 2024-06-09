import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';
import profilePic from '../assets/profile_pic.png';
import translations from "./Translator.js";


const Profile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [bookedDorms, setBookedDorms] = useState([]);
    const [content, setContent] = useState(translations.en);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = localStorage.getItem('currentUser');
        const currentUsername = localStorage.getItem('currentUsername');
        console.log(currentUser)
        console.log(currentUsername)
        if (currentUser && currentUsername) {
            setEmail(currentUser);
            setUsername(currentUsername);
            const userBookedDorms = JSON.parse(localStorage.getItem(`bookedDorms_${currentUser}`) || '[]');
            setBookedDorms(userBookedDorms);
        } else navigate('/');
    }, [navigate]);

    useEffect(() => {
        const lang = localStorage.getItem('language');
        if (lang) lang === 'en' ? setContent(translations.en) : setContent(translations.ka)
    }, [])

    const hyphenRemoved = (str) => str.replace(/-/g, '');

    return (
        <div className="profile">
            <h2>{content.Username}: {username}</h2>
            <img src={profilePic} alt="Profile" className="profile-pic" />
            <h3>{content.Email}: {email}</h3>
            {bookedDorms.length > 0 ? (
                <div className="booked-dorms">
                    <h3>{content.BookedDorms}</h3>
                    <ul>
                        {bookedDorms.map(dorm => (
                            <li key={dorm.id}>
                                <img src={dorm.image} alt={dorm.id} className="booked-dorm-image" />
                                <div>{content[hyphenRemoved(dorm.id)]} | {dorm.price.toFixed(2)} 🪙 | {content.ReservedFor} {dorm.months} {content.Months}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <h3>{content.NoDormsBookedYet}.</h3>
            )}
        </div>
    );
};

export default Profile;
