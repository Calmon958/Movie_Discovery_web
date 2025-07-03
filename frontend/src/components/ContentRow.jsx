import React, { useRef } from 'react';
import ContentCard from './ContentCard';

const ContentRow = ({ title, content, onItemClick }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className="content-row">
      <h2 className="content-row-title">{title}</h2>
      <div className="content-row-container">
        <button 
          className="scroll-button scroll-button-left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          &#8249;
        </button>
        
        <div className="content-row-scroll" ref={scrollContainerRef}>
          <div className="content-row-items">
            {content.map((item) => (
              <div key={item.id} className="content-row-item">
                <ContentCard
                  item={item}
                  onClick={() => onItemClick(item.id, item.media_type || (item.title ? 'movie' : 'tv'))}
                />
              </div>
            ))}
          </div>
        </div>
        
        <button 
          className="scroll-button scroll-button-right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
};

export default ContentRow;