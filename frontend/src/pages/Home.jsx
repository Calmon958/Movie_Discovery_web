import { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'

function Home() {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState('')
  const [minRating, setMinRating] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock data for demonstration since backend might not be running
        const mockMovies = [
          {
            id: 1,
            title: "The Dark Knight",
            poster_path: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
            vote_average: 9.0,
            release_date: "2008-07-18"
          },
          {
            id: 2,
            title: "Inception",
            poster_path: "/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
            vote_average: 8.8,
            release_date: "2010-07-16"
          },
          {
            id: 3,
            title: "Interstellar",
            poster_path: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
            vote_average: 8.6,
            release_date: "2014-11-07"
          },
          {
            id: 4,
            title: "The Matrix",
            poster_path: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
            vote_average: 8.7,
            release_date: "1999-03-31"
          },
          {
            id: 5,
            title: "Pulp Fiction",
            poster_path: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
            vote_average: 8.9,
            release_date: "1994-10-14"
          }
        ]

        try {
          const res = await axios.get('http://localhost:8000/api/trending')
          setTrending(res.data.results || mockMovies)
          setPopular(res.data.results || mockMovies)
          setTopRated(res.data.results || mockMovies)
        } catch (err) {
          console.error('Error fetching trending:', err)
          // Use mock data if API fails
          setTrending(mockMovies)
          setPopular(mockMovies)
          setTopRated(mockMovies)
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredMovies = trending.filter((item) => {
    const yearMatch = year ? (item.release_date || item.first_air_date || '').startsWith(year) : true
    const ratingMatch = item.vote_average >= minRating
    return yearMatch && ratingMatch
  })

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 py-20">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Discover Amazing <span className="text-red-500">Movies</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore thousands of movies, create your watchlist, and never miss a great film again
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for movies, TV shows, actors..."
                className="w-full px-6 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button className="absolute right-2 top-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8">
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value={0}>All Ratings</option>
            <option value={5}>5+ Stars</option>
            <option value={6}>6+ Stars</option>
            <option value={7}>7+ Stars</option>
            <option value={8}>8+ Stars</option>
          </select>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
            Apply Filters
          </button>
        </div>

        {/* Trending Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <span className="text-red-500 mr-3">🔥</span>
              Trending Now
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredMovies.slice(0, 12).map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>

        {/* Popular Movies */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <span className="text-yellow-500 mr-3">⭐</span>
              Popular Movies
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {popular.slice(0, 12).map((item) => (
              <MovieCard key={`popular-${item.id}`} item={item} />
            ))}
          </div>
        </section>

        {/* Top Rated */}
        <section>
          <div className="flex items-center mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <span className="text-green-500 mr-3">🏆</span>
              Top Rated
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {topRated.slice(0, 12).map((item) => (
              <MovieCard key={`toprated-${item.id}`} item={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
