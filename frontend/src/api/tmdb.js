const API_KEY = 'c13756a25f0e1371569a710927cc1553'; // This is a public key for educational purposes
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';

async function fetchAPI(endpoint) {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const fetchTrending = () => {
    return fetchAPI('/trending/all/week');
};

export const searchContent = (query) => {
    return fetchAPI(`/search/multi&query=${encodeURIComponent(query)}`);
};

export const fetchDetails = (id, type) => {
    return fetchAPI(`/${type}/${id}`);
};