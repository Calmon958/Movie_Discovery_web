import { Link } from 'react-router-dom'
import { useWatchlist } from '../context/WatchlistContext'

function MovieCard({ item }) {
  const { addToWatchlist, watchlist } = useWatchlist()
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  const title = item.title || item.name || 'Untitled'
  const year = item.release_date ? new Date(item.release_date).getFullYear() : 
               item.first_air_date ? new Date(item.first_air_date).getFullYear() : 'N/A'
  const rating = item.vote_average ? item.vote_average.toFixed(1) : 'N/A'
  
  const isInWatchlist = watchlist.some((watchItem) => watchItem.id === item.id)

  const handleAddToWatchlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isInWatchlist) {
      const watchlistItem = {
        id: item.id,
        title: title,
        poster: posterUrl,
        media_type: item.media_type || 'movie',
        watched: false,
      }
      addToWatchlist(watchlistItem)
    }
  }

  return (
    <div className="group relative animate-fade-in">
      <Link to={`/details/${item.id}`}>
        <div className="netflix-card-hover rounded-sm overflow-hidden shadow-lg">
          {/* Poster Image */}
          <div className="relative overflow-hidden aspect-[2/3]">
            <img 
              src={posterUrl} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            
            {/* Netflix-style overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4">
              {/* Top section with rating and watchlist */}
              <div className="flex justify-between items-start">
                <div className="bg-netflix-black/90 text-white px-2 py-1 rounded text-xs font-bold flex items-center netflix-glow">
                  <span className="text-netflix-gold mr-1">★</span>
                  {rating}
                </div>
                
                <button
                  onClick={handleAddToWatchlist}
                  className={`p-2 rounded-full transition-all duration-300 hover-lift ${
                    isInWatchlist 
                      ? 'bg-netflix-gold text-netflix-black netflix-glow' 
                      : 'bg-netflix-black/60 text-white hover:bg-netflix-red hover:text-white netflix-border-glow'
                  }`}
                  title={isInWatchlist ? 'Remove from My List' : 'Add to My List'}
                >
                  <span className="text-sm font-bold">
                    {isInWatchlist ? '✓' : '+'}
                  </span>
                </button>
              </div>

              {/* Bottom section with title and actions */}
              <div className="space-y-3">
                <div>
                  <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">
                    {title}
                  </h3>
                  <p className="text-netflix-light-gray text-xs">
                    {year}
                  </p>
                </div>
                
                {/* Netflix-style action buttons */}
                <div className="flex space-x-2">
                  <button className="bg-white text-netflix-black px-4 py-1.5 rounded-sm text-xs font-bold hover:bg-netflix-light-gray transition-all duration-300 flex items-center hover-lift netflix-glow">
                    <span className="mr-1">▶</span>
                    Play
                  </button>
                  <button className="bg-netflix-medium-gray text-white px-3 py-1.5 rounded-sm text-xs font-bold hover:bg-netflix-red transition-all duration-300 hover-lift">
                    ⓘ Info
                  </button>
                </div>
              </div>
            </div>

            {/* Subtle gradient overlay for better text readability */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-300"></div>
          </div>

          {/* Movie Info (visible when not hovering) */}
          <div className="p-3 group-hover:opacity-0 transition-opacity duration-300">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
              {title}
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-netflix-light-gray text-xs">
                {year}
              </p>
              <div className="flex items-center space-x-1">
                <span className="text-netflix-gold text-xs">★</span>
                <span className="text-netflix-light-gray text-xs">{rating}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
