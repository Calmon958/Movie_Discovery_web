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
    <div className="group relative">
      <Link to={`/details/${item.id}`}>
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out">
          {/* Poster Image */}
          <div className="relative overflow-hidden">
            <img 
              src={posterUrl} 
              alt={title} 
              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            
            {/* Rating Badge */}
            <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center">
              <span className="text-yellow-400 mr-1">⭐</span>
              {rating}
            </div>

            {/* Watchlist Button */}
            <button
              onClick={handleAddToWatchlist}
              className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
                isInWatchlist 
                  ? 'bg-green-600/80 text-white' 
                  : 'bg-black/50 text-white hover:bg-red-600/80'
              }`}
              title={isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            >
              {isInWatchlist ? '✓' : '+'}
            </button>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold transition-colors">
                  View Details
                </div>
              </div>
            </div>
          </div>

          {/* Movie Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 leading-tight">
              {title}
            </h3>
            <p className="text-gray-400 text-xs">
              {year}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MovieCard
