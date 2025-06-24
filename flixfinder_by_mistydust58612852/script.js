import { html, render } from 'lit-html';

const API_KEY = 'c13756a25f0e1371569a710927cc1553'; // This is a public key for educational purposes
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BACKDROP_URL = 'https://image.tmdb.org/t/p/w1280';

const mainContent = document.getElementById('main-content');
const modalContainer = document.getElementById('modal-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const trendingLink = document.getElementById('trending-link');
const watchlistLink = document.getElementById('watchlist-link');

let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
let activeView = 'trending';

async function fetchAPI(endpoint) {
    const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        mainContent.innerHTML = '<p class="error-message">Could not fetch data. Please try again later.</p>';
        return null;
    }
}

const contentCard = (item) => html`
    <div class="content-card" @click=${() => showDetails(item.id, item.media_type || (item.title ? 'movie' : 'tv'))}>
        <img src=${item.poster_path ? IMG_URL + item.poster_path : './placeholder.png'} alt=${item.title || item.name}>
        <div class="content-card-info">
            <h3>${item.title || item.name}</h3>
            <p>${(item.release_date || item.first_air_date)?.substring(0, 4)}</p>
        </div>
    </div>
`;

const renderContent = (items) => {
    const template = html`
        <div class="content-grid">
            ${items.map(item => contentCard(item))}
        </div>
    `;
    render(template, mainContent);
};

async function showTrending() {
    const data = await fetchAPI('/trending/all/week');
    if (data && data.results) {
        renderContent(data.results.filter(item => item.media_type !== 'person' && item.poster_path));
    }
}

async function searchContent() {
    const query = searchInput.value.trim();
    if (!query) return;
    const data = await fetchAPI(`/search/multi&query=${encodeURIComponent(query)}`);
    if (data && data.results) {
        renderContent(data.results.filter(item => item.media_type !== 'person' && item.poster_path));
    }
}

function displayWatchlist() {
    if (watchlist.length === 0) {
        const template = html`<p class="empty-watchlist">Your watchlist is empty. Add some movies and shows!</p>`;
        render(template, mainContent);
    } else {
        renderContent(watchlist);
    }
}

async function showDetails(id, type) {
    const data = await fetchAPI(`/${type}/${id}`);
    if (!data) return;

    const isInWatchlist = watchlist.some(item => item.id === data.id);
    const itemForWatchlist = {
        id: data.id,
        title: data.title || data.name,
        poster_path: data.poster_path,
        release_date: data.release_date || data.first_air_date,
        media_type: type
    };

    const modalTemplate = html`
    <div class="modal-content">
        <span class="close-modal" @click=${() => modalContainer.style.display = 'none'}>&times;</span>
        <div class="modal-header" style="background-image: url(${data.backdrop_path ? BACKDROP_URL + data.backdrop_path : ''})">
            <div class="modal-header-content">
                <h2 class="modal-title">${data.title || data.name}</h2>
                <div class="modal-details-short">
                    <span>${(data.release_date || data.first_air_date)?.substring(0, 4)}</span>
                    <span class="rating">⭐ ${data.vote_average?.toFixed(1)}</span>
                    ${type === 'movie' ? html`<span>${data.runtime} min</span>` : html`<span>${data.number_of_seasons} seasons</span>`}
                </div>
            </div>
        </div>
        <div class="modal-body">
            <p>${data.overview}</p>
            <button class="watchlist-btn ${isInWatchlist ? 'remove' : ''}" @click=${() => toggleWatchlist(itemForWatchlist)}>
                ${isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
            </button>
        </div>
    </div>
    `;
    render(modalTemplate, modalContainer);
    modalContainer.style.display = 'flex';
}

function toggleWatchlist(item) {
    const itemIndex = watchlist.findIndex(i => i.id === item.id);
    if (itemIndex > -1) {
        watchlist.splice(itemIndex, 1);
    } else {
        watchlist.push(item);
    }
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    
    // Re-render modal to update button
    showDetails(item.id, item.media_type);
    
    // If on watchlist view, refresh it
    if(activeView === 'watchlist') {
        displayWatchlist();
    }
}

function updateActiveLink(activeLink) {
    document.querySelectorAll('header nav a').forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function handleNav(view) {
    activeView = view;
    searchInput.value = '';
    if (view === 'trending') {
        updateActiveLink(trendingLink);
        showTrending();
    } else if (view === 'watchlist') {
        updateActiveLink(watchlistLink);
        displayWatchlist();
    }
}

function init() {
    // Event Listeners
    searchButton.addEventListener('click', searchContent);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchContent();
    });

    trendingLink.addEventListener('click', (e) => {
        e.preventDefault();
        handleNav('trending');
    });

    watchlistLink.addEventListener('click', (e) => {
        e.preventDefault();
        handleNav('watchlist');
    });

    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            modalContainer.style.display = 'none';
        }
    });

    // Initial Load
    showTrending();
}

init();

