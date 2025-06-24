import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [searchType, setSearchType] = useState('all')

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query)
    }, 600)

    return () => clearTimeout(handler)
  }, [query])

  // Fetch results when debouncedQuery changes
  useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      return
    }

    const fetchResults = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`http://localhost:8000/api/search?query=${debouncedQuery}`)
        setResults(res.data.results || [])
      } catch (err) {
        console.error('Search error:', err)
        // Mock search results for demonstration
        const mockResults = [
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
          }
        ].filter(movie => 
          movie.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        )
        setResults(mockResults)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Search <span className="text-red-500">Movies & TV Shows</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Discover your next favorite movie or TV series
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for movies, TV shows, actors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-lg bg-gray-800 text-white rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400"
            />
          </div>
        </div>

        {/* Search Filters */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-800 rounded-lg p-1">
            {['all', 'movie', 'tv'].map((type) => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  searchType === type
                    ? 'bg-red-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All' : type === 'movie' ? 'Movies' : 'TV Shows'}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {loading ? 'Searching...' : `Search Results for "${query}"`}
              {!loading && results.length > 0 && (
                <span className="text-gray-400 text-lg ml-2">({results.length} results)</span>
              )}
            </h2>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
        ) : query && results.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-gray-400">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {results.map((item) => (
              <MovieCard key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Popular Searches */}
        {!query && (
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-white mb-6">Popular Searches</h2>
            <div className="flex flex-wrap gap-3">
              {['Marvel', 'DC', 'Horror', 'Comedy', 'Action', 'Drama', 'Sci-Fi', 'Thriller'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
