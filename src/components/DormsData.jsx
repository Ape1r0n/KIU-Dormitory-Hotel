import g239 from '../assets/G239.jpg';
import g433 from '../assets/G433.jpg';
import g120 from '../assets/G120.jpg';
import g343 from '../assets/G343.jpg';
import g131 from '../assets/G131.jpg';
import g230 from '../assets/G230.jpg';

const initialDormsData = [
    { id: 'G-239', title: 'The room of the Waifu', price: 259.99, image: g239, available: true },
    { id: 'G-433', title: 'The room of the founder', price: 509.99, image: g433, available: true },
    { id: 'G-120', title: 'The Walmart version of KFC', price: 249.99, image: g120, available: true },
    { id: 'G-343', title: 'Dorm of half man, half cow', price: 504.99, image: g343, available: true },
    { id: 'G-131', title: 'The Old Gathering Place', price: 254.99, image: g131, available: true },
    { id: 'G-230', title: 'Black & White', price: 254.99, image: g230, available: false },
];

export const getDormsData = () => {
    const storedAvailability = JSON.parse(localStorage.getItem('dormsAvailability'));
    if (storedAvailability) {
        return initialDormsData.map(dorm => ({
            ...dorm,
            available: storedAvailability[dorm.id] ?? dorm.available
        }));
    }
    return initialDormsData;
};

export const setDormAvailability = (dormId, isAvailable) => {
    const storedAvailability = JSON.parse(localStorage.getItem('dormsAvailability')) || {};
    storedAvailability[dormId] = isAvailable;
    localStorage.setItem('dormsAvailability', JSON.stringify(storedAvailability));
};