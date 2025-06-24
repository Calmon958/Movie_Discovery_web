import { useState, useEffect } from 'react'
import { searchContent } from '../api/tmdb'
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
        const data = await searchContent(debouncedQuery)
        if (data && data.results) {
          // Filter results based on searchType and remove people
          let filteredResults = data.results.filter(item => 
            item.media_type !== 'person' && item.poster_path
          )
          
          if (searchType !== 'all') {
            filteredResults = filteredResults.filter(item => 
              item.media_type === searchType
            )
          }
          
          setResults(filteredResults)
        } else {
          setResults([])
        }
      } catch (err) {
        console.error('Search error:', err)
        setResults([])
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery, searchType])

return (
  <div className="min-h-screen py-8 sm:py-12 lg:py-16 netflix-hero-gradient">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 netflix-text-shadow">
            Search <span className="gradient-text">Movies & TV Shows</span>
          </h1>
          <p className="text-netflix-light-gray text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Discover your next favorite movie or TV series from our vast collection
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 animate-slide-up">
          <div className="relative netflix-glass rounded-2xl p-2 shadow-2xl netflix-border-glow hover-lift">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-netflix-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for movies, TV shows, actors..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-14 pr-4 py-4 sm:py-5 text-base sm:text-lg bg-transparent text-white rounded-xl netflix-focus placeholder-netflix-light-gray"
            />
          </div>
        </div>

        {/* Search Filters */}
        <div className="flex justify-center mb-8 sm:mb-12 animate-slide-up">
          <div className="netflix-glass rounded-2xl p-1.5 shadow-lg netflix-glow">
            {['all', 'movie', 'tv'].map((type) => (
              <button
                key={type}
                onClick={() => setSearchType(type)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
                  searchType === type
                    ? 'bg-gradient-to-r from-netflix-red to-netflix-red-light text-white shadow-lg netflix-glow'
                    : 'text-netflix-light-gray hover:text-white hover:bg-netflix-red/20 hover:text-netflix-gold'
                }`}
              >
                {type === 'all' ? 'All' : type === 'movie' ? 'Movies' : 'TV Shows'}
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-6 sm:mb-8 animate-fade-in">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4">
              {loading ? (
                <span className="flex items-center">
                  <div className="loading-dots mr-4">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                  Searching...
                </span>
              ) : (
                `Search Results for "${query}"`
              )}
              {!loading && results.length > 0 && (
                <span className="text-netflix-gold text-base sm:text-lg ml-2 font-normal">
                  ({results.length} results)
                </span>
              )}
            </h2>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loading-dots">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : query && results.length === 0 ? (
          <div className="text-center py-20 animate-fade-in">
            <div className="text-6xl sm:text-8xl mb-6 animate-bounce-subtle">🔍</div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">No results found</h3>
            <p className="text-netflix-light-gray text-base sm:text-lg max-w-md mx-auto">
              Try searching with different keywords or check your spelling
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {results.map((item, index) => (
              <div key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <MovieCard item={item} />
              </div>
            ))}
          </div>
        )}

        {/* Popular Searches */}
        {!query && (
          <div className="mt-12 sm:mt-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">
              🔥 Popular Searches
            </h2>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {['Marvel', 'DC', 'Horror', 'Comedy', 'Action', 'Drama', 'Sci-Fi', 'Thriller'].map((tag, index) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 netflix-glass hover:netflix-glow text-netflix-light-gray hover:text-white rounded-xl transition-all duration-300 hover:scale-105 font-semibold text-sm sm:text-base ${
                    index % 2 === 0 ? 'hover:bg-netflix-red/20' : 'hover:bg-netflix-gold/20'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
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
