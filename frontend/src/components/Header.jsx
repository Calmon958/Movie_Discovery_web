import React, { useState } from 'react';

const Header = ({ activeView, onNavigation, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleNavClick = (view) => {
    setSearchQuery('');
    onNavigation(view);
  };

  return (
    <header className="header">
      <div className="container header-container">
        <h1>FlixFinder</h1>
        <nav>
          <a 
            className={activeView === 'trending' ? 'active' : ''}
            onClick={() => handleNavClick('trending')}
          >
            Trending
          </a>
          <a 
            className={activeView === 'watchlist' ? 'active' : ''}
            onClick={() => handleNavClick('watchlist')}
          >
            My Watchlist
          </a>
        </nav>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for movies & TV shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;