import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useWatchlist } from '../context/WatchlistContext'

function Details() {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const { addToWatchlist, watchlist } = useWatchlist()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/details/${id}`)
        setData(res.data)
      } catch (err) {
        console.error('Error fetching details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDetails()
  }, [id])

  if (loading) return <div className="p-4">Loading...</div>
  if (!data) return <div className="p-4">Movie not found.</div>

  const {
    title,
    name,
    overview,
    poster_path,
    vote_average,
    release_date,
    credits,
    omdb,
    videos
  } = data

  const poster = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Image'

  const cast = credits?.cast?.slice(0, 6).map((c) => c.name).join(', ') || 'N/A'
  const mediaTitle = title || name
  const isInWatchlist = watchlist.some((item) => item.id === data.id)

  const trailer = videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')

  const handleAddToWatchlist = () => {
    const item = {
      id: data.id,
      title: mediaTitle,
      poster: poster,
      media_type: data.media_type || 'movie',
      watched: false,
    }
    addToWatchlist(item)
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4">
        <img src={poster} alt={mediaTitle} className="w-full md:w-64 rounded shadow" />
        <div>
          <h1 className="text-3xl font-bold mb-2">{mediaTitle}</h1>
          <p className="text-sm text-gray-400 mb-2">{release_date}</p>
          <p className="mb-4">{overview}</p>

          <div className="mb-2">
            <strong>Cast:</strong> {cast}
          </div>

          <div className="mb-2">
            <strong>TMDB Rating:</strong> {vote_average || 'N/A'}
          </div>

          {omdb && (
            <div className="mb-2">
              <strong>IMDB Rating:</strong> {omdb.imdbRating || 'N/A'}<br />
              <strong>Rotten Tomatoes:</strong>{' '}
              {omdb.Ratings?.find(r => r.Source === 'Rotten Tomatoes')?.Value || 'N/A'}
            </div>
          )}

          {trailer && (
            <div className="mt-4">
              <h2 className="font-semibold mb-2">🎬 Trailer</h2>
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="YouTube trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded"
              ></iframe>
            </div>
          )}

          {isInWatchlist ? (
            <button className="mt-4 px-4 py-2 bg-green-600 rounded cursor-not-allowed">
              Already in Watchlist
            </button>
          ) : (
            <button
              onClick={handleAddToWatchlist}
              className="mt-4 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
            >
              Add to Watchlist
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Details
