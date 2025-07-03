const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';

// Debug: Check if API key is loaded
console.log('API Key loaded:', API_KEY ? 'Yes' : 'No');
console.log('API Key length:', API_KEY?.length);

async function fetchAPI(endpoint) {
    // Check if endpoint already has query parameters
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`;
    
    console.log('Fetching URL:', url); // Debug log
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const fetchTrending = () => {
    return fetchAPI('/trending/all/week');
};

export const fetchMovies = (page = 1) => {
    return fetchAPI(`/movie/popular?page=${page}`);
};

export const fetchTVShows = (page = 1) => {
    return fetchAPI(`/tv/popular?page=${page}`);
};

export const fetchTopRatedMovies = (page = 1) => {
    return fetchAPI(`/movie/top_rated?page=${page}`);
};

export const fetchUpcomingMovies = (page = 1) => {
    return fetchAPI(`/movie/upcoming?page=${page}`);
};

export const fetchNowPlayingMovies = (page = 1) => {
    return fetchAPI(`/movie/now_playing?page=${page}`);
};

export const fetchGenres = (type = 'movie') => {
    return fetchAPI(`/genre/${type}/list`);
};

export const fetchMoviesByGenre = (genreId, page = 1) => {
    return fetchAPI(`/discover/movie?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`);
};

export const fetchTVByGenre = (genreId, page = 1) => {
    return fetchAPI(`/discover/tv?with_genres=${genreId}&page=${page}&sort_by=popularity.desc`);
};

export const searchContent = (query) => {
    return fetchAPI(`/search/multi?query=${encodeURIComponent(query)}`);
};

export const fetchDetails = (id, type) => {
    return fetchAPI(`/${type}/${id}`);
};