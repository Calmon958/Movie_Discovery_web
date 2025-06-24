import React from 'react';
import { BACKDROP_URL } from '../api/tmdb';

const Modal = ({ item, isInWatchlist, onClose, onToggleWatchlist }) => {
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? releaseDate.substring(0, 4) : '';
  const backdropUrl = item.backdrop_path ? BACKDROP_URL + item.backdrop_path : '';
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A';
  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleToggleWatchlist = () => {
    onToggleWatchlist(item);
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <div 
          className="modal-header" 
          style={{ backgroundImage: `url(${backdropUrl})` }}
        >
          <div className="modal-header-content">
            <h2 className="modal-title">{title}</h2>
            <div className="modal-details-short">
              <span>{year}</span>
              <span className="rating">⭐ {rating}</span>
              {mediaType === 'movie' && item.runtime && (
                <span>{item.runtime} min</span>
              )}
              {mediaType === 'tv' && item.number_of_seasons && (
                <span>{item.number_of_seasons} seasons</span>
              )}
            </div>
          </div>
        </div>
        <div className="modal-body">
          <p>{item.overview}</p>
          <button 
            className={`watchlist-btn ${isInWatchlist ? 'remove' : ''}`}
            onClick={handleToggleWatchlist}
          >
            {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;