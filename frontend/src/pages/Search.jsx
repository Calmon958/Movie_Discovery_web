import { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard'

function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [debouncedQuery, setDebouncedQuery] = useState('')

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
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [debouncedQuery])

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search movies or shows..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 text-black rounded mb-4"
      />

      {loading ? (
        <p>Searching...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {results.map((item) => (
            <MovieCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
