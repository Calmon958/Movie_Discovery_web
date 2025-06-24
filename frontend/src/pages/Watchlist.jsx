import { useWatchlist } from '../context/WatchlistContext'
import { Link } from 'react-router-dom'

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist()

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <span className="text-red-500 mr-3">🎬</span>
            My Watchlist
          </h1>
          <p className="text-gray-400 text-lg">
            Keep track of movies and shows you want to watch
          </p>
        </div>

        {watchlist.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">📺</div>
            <h2 className="text-3xl font-bold text-white mb-4">Your watchlist is empty</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Start building your watchlist by adding movies and TV shows you want to watch later
            </p>
            <div className="space-x-4">
              <Link 
                to="/" 
                className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Browse Movies
              </Link>
              <Link 
                to="/search" 
                className="inline-block bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Search Movies
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {watchlist.length} {watchlist.length === 1 ? 'Item' : 'Items'} in Watchlist
                  </h2>
                  <p className="text-gray-400">
                    {watchlist.filter(item => item.watched).length} watched • {' '}
                    {watchlist.filter(item => !item.watched).length} to watch
                  </p>
                </div>
                <div className="text-right">
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Watchlist Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {watchlist.map((item) => (
                <div key={item.id} className="group relative">
                  <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    {/* Poster */}
                    <div className="relative">
                      <Link to={`/details/${item.id}`}>
                        <img 
                          src={item.poster} 
                          alt={item.title} 
                          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </Link>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromWatchlist(item.id)}
                        className="absolute top-2 right-2 bg-red-600/90 hover:bg-red-700 text-white p-2 rounded-full backdrop-blur-sm transition-all duration-200 opacity-0 group-hover:opacity-100"
                        title="Remove from Watchlist"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Watched Status */}
                      {item.watched && (
                        <div className="absolute top-2 left-2 bg-green-600/90 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                          ✓ Watched
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center space-y-2">
                          <Link 
                            to={`/details/${item.id}`}
                            className="block bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => {
                              // Toggle watched status (you'd need to implement this in context)
                              console.log('Toggle watched status')
                            }}
                            className="block bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full text-sm font-semibold transition-colors w-full"
                          >
                            {item.watched ? 'Mark Unwatched' : 'Mark Watched'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Movie Info */}
                    <div className="p-4">
                      <h3 className="text-white font-semibold text-sm mb-1 line-clamp-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-xs">
                        {item.media_type === 'tv' ? 'TV Show' : 'Movie'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Watchlist
