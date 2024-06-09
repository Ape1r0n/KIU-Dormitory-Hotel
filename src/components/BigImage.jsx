import React from 'react';
import mainImage from '../assets/Main.jpg';
import '../styles/BigImage.css';

const BigImage = () => {
    return (
        <>
            <div className="bigImage" style={{ backgroundImage: `url(${mainImage})` }}>
                <h1 className="honk">Dormitory in Kutaisi</h1>
                <p className="honk">Neighborhood filled with Laughter</p>
            </div>
        </>
    );
};

export default BigImage;
