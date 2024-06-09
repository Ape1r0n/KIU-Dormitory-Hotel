import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/DormPage.css';
import { getDormsData, setDormAvailability } from './DormsData.jsx';
import translations from "./Translator.js";


const DormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dorms = getDormsData();
    const dorm = dorms.find(d => d.id === id);
    const [monthsToBook, setMonthsToBook] = useState(1);
    const [content, setContent] = useState(translations.en);

    useEffect(() => {
        const lang = localStorage.getItem('language');
        if (lang) lang === 'en' ? setContent(translations.en) : setContent(translations.ka)
    }, [])

    const availableDorms = dorms.filter(d => d.available && d.id !== dorm.id).slice(0, 3);

    const hyphenRemoved = (str) => str.replace(/-/g, '');

    const handleBookNow = () => {
        if (monthsToBook <= 0) {
            alert(content.MoreThanAMonth);
            return;
        }

        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const userBookedDorms = JSON.parse(localStorage.getItem(`bookedDorms_${currentUser}`) || '[]');

            if (userBookedDorms.some(d => d.id === dorm.id)) {
                alert(content.AlreadyBooked);
                return;
            }

            userBookedDorms.push({ ...dorm, available: false, months: monthsToBook });
            localStorage.setItem(`bookedDorms_${currentUser}`, JSON.stringify(userBookedDorms));

            setDormAvailability(dorm.id, false);
            navigate('/profile');
        } else alert(content.AlertMessage);
    };

    if (!dorm) return <p>Dorm not found</p>;

    return (
        <div className="dorm-page">
            <img src={dorm.image} alt={dorm.id} className="dorm-image" />
            <h2>{dorm.id}</h2>
            <p>{content[hyphenRemoved(dorm.id)]}</p> {/* Replace dorm.title with translated title */}
            <h3>{dorm.price.toFixed(2)} 🪙</h3>
            <div>
                <button style={{fontSize: 25}} onClick={() => setMonthsToBook(Math.max(0, monthsToBook - 1))}>-</button>
                <span style={{fontSize: 30}}>{monthsToBook}</span>
                <button style={{fontSize: 25}} onClick={() => setMonthsToBook(Math.min(10, monthsToBook + 1))}>+</button>
            </div>
            <button
                onClick={handleBookNow}
                className={`book-button ${!dorm.available ? 'grayscale' : ''}`}
                disabled={!dorm.available}
            >
                {dorm.available ? content.BookNow : content.Booked}
            </button>
            <div className="available-dorms dorm-grid">
                {availableDorms.map(availDorm => (
                    <div key={availDorm.id} className={`dorm-card ${availDorm.available ? '' : 'grayscale'}`} style={{ textDecoration: 'none' }}>
                        <img src={availDorm.image} alt={availDorm.id}/>
                        <h2>{availDorm.id}</h2>
                        <div style={{fontSize: 25}}>{content[hyphenRemoved(availDorm.id)]}</div>
                        <h2>{availDorm.price.toFixed(2)} 🪙</h2>
                        <div className={`availability ${availDorm.available ? 'available' : 'booked'}`}>
                            {availDorm.available ? content.Available : content.Booked}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default DormPage;