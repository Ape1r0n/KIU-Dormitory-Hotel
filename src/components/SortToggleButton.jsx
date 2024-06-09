import React, {useEffect, useState} from 'react';
import '../styles/SortToggleButton.css';
import translations from "./Translator.js";


const SortToggleButton = ({ selected, setSelected }) => {
    const [content, setContent] = useState(translations.en);
    useEffect(() => {
        const lang = localStorage.getItem('language');
        if (lang) lang === 'en' ? setContent(translations.en) : setContent(translations.ka)
    }, [])

    return (
        <div className="button-group">
            <button
                className={`toggle-button ${selected === 'Lexicographic' ? 'active' : ''}`}
                onClick={() => setSelected('Default')}
            >
                {content.Lexicographic}
            </button>
            <button
                className={`toggle-button ${selected === 'Ascending' ? 'active' : ''}`}
                onClick={() => setSelected('Ascending')}
            >
                {content.Ascending}
            </button>
            <button
                className={`toggle-button ${selected === 'Descending' ? 'active' : ''}`}
                onClick={() => setSelected('Descending')}
            >
                {content.Descending}
            </button>
        </div>
    );
}

export default SortToggleButton;
