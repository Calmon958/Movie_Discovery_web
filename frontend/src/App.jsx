import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ContentGrid from './components/ContentGrid';
import Modal from './components/Modal';
import { fetchTrending, searchContent, fetchDetails } from './api/tmdb';
import './App.css';

function App() {
  const [content, setContent] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [activeView, setActiveView] = useState('trending');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load watchlist from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
  }, []);

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Load trending content on initial load
  useEffect(() => {
    loadTrending();
  }, []);

  const loadTrending = async () => {
    setLoading(true);
    try {
      const data = await fetchTrending();
      if (data && data.results) {
        setContent(data.results.filter(item => item.media_type !== 'person' && item.poster_path));
      }
    } catch (error) {
      console.error('Error loading trending content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    try {
      const data = await searchContent(query);
      if (data && data.results) {
        setContent(data.results.filter(item => item.media_type !== 'person' && item.poster_path));
      }
    } catch (error) {
      console.error('Error searching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (view) => {
    setActiveView(view);
    if (view === 'trending') {
      loadTrending();
    } else if (view === 'watchlist') {
      setContent(watchlist);
    }
  };

  const handleItemClick = async (id, mediaType) => {
    try {
      const details = await fetchDetails(id, mediaType);
      if (details) {
        setSelectedItem(details);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const toggleWatchlist = (item) => {
    const itemForWatchlist = {
      id: item.id,
      title: item.title || item.name,
      poster_path: item.poster_path,
      release_date: item.release_date || item.first_air_date,
      media_type: item.media_type || (item.title ? 'movie' : 'tv')
    };

    const isInWatchlist = watchlist.some(watchlistItem => watchlistItem.id === item.id);
    
    if (isInWatchlist) {
      setWatchlist(watchlist.filter(watchlistItem => watchlistItem.id !== item.id));
    } else {
      setWatchlist([...watchlist, itemForWatchlist]);
    }

    // If we're viewing watchlist, update the content
    if (activeView === 'watchlist') {
      const updatedWatchlist = isInWatchlist 
        ? watchlist.filter(watchlistItem => watchlistItem.id !== item.id)
        : [...watchlist, itemForWatchlist];
      setContent(updatedWatchlist);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const isInWatchlist = (itemId) => {
    return watchlist.some(item => item.id === itemId);
  };

  return (
    <div className="App">
      <Header 
        activeView={activeView}
        onNavigation={handleNavigation}
        onSearch={handleSearch}
      />
      
      <main className="container">
        <ContentGrid 
          content={content}
          onItemClick={handleItemClick}
          loading={loading}
          activeView={activeView}
        />
      </main>

      {isModalOpen && selectedItem && (
        <Modal 
          item={selectedItem}
          isInWatchlist={isInWatchlist(selectedItem.id)}
          onClose={closeModal}
          onToggleWatchlist={toggleWatchlist}
        />
      )}
    </div>
  );
}

export default App;