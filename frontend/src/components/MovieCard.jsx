import { Link } from 'react-router-dom'

function MovieCard({ item }) {
  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  const title = item.title || item.name || 'Untitled'

  return (
    <Link to={`/details/${item.id}`}>
      <div className="bg-zinc-800 rounded overflow-hidden shadow hover:scale-105 transition">
        <img src={posterUrl} alt={title} className="w-full h-72 object-cover" />
        <div className="p-2 text-sm font-medium truncate">{title}</div>
      </div>
    </Link>
  )
}

export default MovieCard
