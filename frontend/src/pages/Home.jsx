import { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'

function Home() {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState('')
  const [minRating, setMinRating] = useState(0)

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/trending')
        setTrending(res.data.results)
      } catch (err) {
        console.error('Error fetching trending:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrending()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🔥 Trending Now</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="p-2 text-black rounded w-24"
        />
        <select
          value={minRating}
          onChange={(e) => setMinRating(Number(e.target.value))}
          className="p-2 text-black rounded"
        >
          <option value={0}>All Ratings</option>
          <option value={5}>5+</option>
          <option value={6}>6+</option>
          <option value={7}>7+</option>
          <option value={8}>8+</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trending
            .filter((item) => {
              const yearMatch = year ? (item.release_date || item.first_air_date || '').startsWith(year) : true
              const ratingMatch = item.vote_average >= minRating
              return yearMatch && ratingMatch
            })
            .map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
        </div>
      )}
    </div>
  )
}

export default Home
