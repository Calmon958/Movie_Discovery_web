import React from 'react';
import ContentCard from './ContentCard';

const ContentGrid = ({ content, onItemClick, loading, activeView }) => {
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (activeView === 'watchlist' && content.length === 0) {
    return (
      <div className="empty-watchlist">
        Your watchlist is empty. Add some movies and shows!
      </div>
    );
  }

  if (content.length === 0) {
    return (
      <div className="empty-watchlist">
        No content found. Try searching for something else.
      </div>
    );
  }

  return (
    <div className="content-grid">
      {content.map((item) => (
        <ContentCard
          key={`${item.id}-${item.media_type || (item.title ? 'movie' : 'tv')}`}
          item={item}
          onClick={() => onItemClick(item.id, item.media_type || (item.title ? 'movie' : 'tv'))}
        />
      ))}
    </div>
  );
};

export default ContentGrid;