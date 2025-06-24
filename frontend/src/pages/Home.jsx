import { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'

function Home() {
  const [trending, setTrending] = useState([])
  const [loading, setLoading] = useState(true)

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {trending.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
