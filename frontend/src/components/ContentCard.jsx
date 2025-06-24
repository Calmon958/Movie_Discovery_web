import React from 'react';
import { IMG_URL } from '../api/tmdb';

const ContentCard = ({ item, onClick }) => {
  const title = item.title || item.name;
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? releaseDate.substring(0, 4) : '';
  const posterUrl = item.poster_path ? IMG_URL + item.poster_path : null;

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <div className="content-card" onClick={onClick}>
      {posterUrl ? (
        <>
          <img src={posterUrl} alt={title} onError={handleImageError} />
          <div className="placeholder-image" style={{ display: 'none' }}>
            <span>No Image</span>
          </div>
        </>
      ) : (
        <div className="placeholder-image">
          <span>No Image</span>
        </div>
      )}
      <div className="content-card-info">
        <h3>{title}</h3>
        <p>{year}</p>
      </div>
    </div>
  );
};

export default ContentCard;