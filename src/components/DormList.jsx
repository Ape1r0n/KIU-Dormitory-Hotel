import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DormList.css';
import SortToggleButton from "./SortToggleButton.jsx";
import BigImage from "./BigImage.jsx";
import { getDormsData } from './DormsData.jsx';
import translations from './Translator.js';


const DormList = () => {
    const [sliderValue, setSliderValue] = useState(509.99);
    const [selectedSort, setSelectedSort] = useState('Default');
    const [selectedFloor, setSelectedFloor] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [dormsData, setDormsData] = useState([]);
    const [content, setContent] = useState(translations.en);
    const [selectedSides, setSelectedSides] = useState({ 'Lake Side': true, 'Dark Side': true });

    useEffect(() => {
        setDormsData(getDormsData());
    }, []);

    useEffect(() => {
        const lang = localStorage.getItem('language');
        if (lang) lang === 'en' ? setContent(translations.en) : setContent(translations.ka);
    }, []);

    const hyphenRemoved = (str) => str.replace(/-/g, '');

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const handleFloorChange = (event) => {
        setSelectedFloor(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSideChange = (event) => {
        const side = event.target.value;
        setSelectedSides(prev => ({ ...prev, [side]: !prev[side] }));
    };

    const sortDorms = (dorms, sort) => {
        if (sort === 'Ascending') return dorms.slice().sort((a, b) => a.price - b.price);
        else if (sort === 'Descending') return dorms.slice().sort((a, b) => b.price - a.price);
        else {
            return dorms.slice().sort((a, b) => {
                const titleA = content[hyphenRemoved(a.id)];
                const titleB = content[hyphenRemoved(b.id)];
                return titleA.localeCompare(titleB);
            });
        }
    };

    const filterDormsByFloor = (dorms, floor) => {
        let floorNumber = '';
        switch (floor) {
            case 'first': floorNumber = '1'; break;
            case 'second': floorNumber = '2'; break;
            case 'third': floorNumber = '3'; break;
            case 'fourth': floorNumber = '4'; break;
            default: return dorms;
        }
        return dorms.filter(dorm => dorm.id.charAt(2) === floorNumber);
    };

    const filterDormsByPrice = (dorms, maxPrice) => {
        return dorms.filter(dorm => dorm.price <= maxPrice);
    };

    const filterDormsBySearch = (dorms, searchTerm) => {
        if (!searchTerm) return dorms;
        return dorms.filter(dorm => {
            const dormKey = hyphenRemoved(dorm.id);
            const title = content[dormKey];
            return title.toLowerCase().includes(searchTerm.toLowerCase());
        });
    };

    const filterDormsBySide = (dorms, selectedSides) => {
        if (!selectedSides['Lake Side'] && !selectedSides['Dark Side']) return [];
        if (selectedSides['Lake Side'] && !selectedSides['Dark Side']) return dorms.filter(dorm => parseInt(dorm.id.charAt(4)) % 2 === 1);
        if (!selectedSides['Lake Side'] && selectedSides['Dark Side']) return dorms.filter(dorm => parseInt(dorm.id.charAt(4)) % 2 === 0);
        return dorms;
    };


    const filteredDorms = filterDormsByFloor(dormsData, selectedFloor);
    const filteredByPriceDorms = filterDormsByPrice(filteredDorms, sliderValue);
    const filteredBySearchDorms = filterDormsBySearch(filteredByPriceDorms, searchTerm);
    const filteredBySideDorms = filterDormsBySide(filteredBySearchDorms, selectedSides);
    const sortedAndFilteredDorms = sortDorms(filteredBySideDorms, selectedSort);

    return (
        <>
            <BigImage/>
            <div className="dorm-list kode">
                <div className="filters">
                    <input type="text" id="searchbar" className="search-input" placeholder={content.SearchForRooms} value={searchTerm} onChange={handleSearchChange} />
                    <SortToggleButton selected={selectedSort} setSelected={setSelectedSort}/>
                    <select name="floor" className="kode" id="floor" onChange={handleFloorChange}>
                        <option className="kode" value="all">{content.All} 🔢</option>
                        <option className="kode" value="first">{content.Floor} 1️⃣</option>
                        <option className="kode" value="second">{content.Floor} 2️⃣</option>
                        <option className="kode" value="third">{content.Floor} 3️⃣</option>
                        <option className="kode" value="fourth">{content.Floor} 4️⃣</option>
                    </select>
                    <div className="side-filter">
                        <label>
                            <input type="checkbox" value="Lake Side" checked={selectedSides['Lake Side']} onChange={handleSideChange}/>
                            {content.LakeSide} 🌊
                        </label>
                        <label>
                            <input type="checkbox" value="Dark Side" checked={selectedSides['Dark Side']} onChange={handleSideChange} />
                            {content.DarkSide} 🌑
                        </label>
                    </div>
                    <input type="range" min="249.99" max="509.99" step={1} value={sliderValue} className="slider" onInput={handleSliderChange}/>
                    <p id="rangeValue">{sliderValue}</p>
                </div>
                <div className="dorm-grid">
                    {sortedAndFilteredDorms.map(dorm => {
                        const dormKey = hyphenRemoved(dorm.id);
                        return (
                            <Link to={`/dorm/${dorm.id}`} key={dorm.id} className={`dorm-card ${dorm.available ? '' : 'grayscale'}`} style={{ textDecoration: 'none' }}>
                                <img src={dorm.image} alt={dorm.id}/>
                                <h2>{dorm.id}</h2>
                                <div style={{fontSize: 25}}>{content[dormKey]}</div>
                                <h2>{dorm.price.toFixed(2)} 🪙</h2>
                                <div className={`availability ${dorm.available ? 'available' : 'booked'}`}>
                                    {dorm.available ? content.Available : content.Booked}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default DormList;