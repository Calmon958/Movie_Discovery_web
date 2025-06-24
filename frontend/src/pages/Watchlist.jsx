import { useWatchlist } from '../context/WatchlistContext'
import { Link } from 'react-router-dom'

function Watchlist() {
  const { watchlist, removeFromWatchlist } = useWatchlist()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🎬 My Watchlist</h1>
      {watchlist.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {watchlist.map((item) => (
            <div key={item.id} className="bg-zinc-800 rounded shadow relative">
              <Link to={`/details/${item.id}`}>
                <img src={item.poster} alt={item.title} className="w-full h-72 object-cover" />
              </Link>
              <div className="p-2 text-sm font-medium truncate">{item.title}</div>
              <button
                onClick={() => removeFromWatchlist(item.id)}
                className="absolute top-2 right-2 bg-red-600 text-xs px-2 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Watchlist
