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
    <div className="min-h-screen bg-netflix-black">
      {/* Netflix-style Hero Section */}
      <div className="relative h-screen flex items-center justify-start overflow-hidden">
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://image.tmdb.org/t/p/original/qJ2tW6WMUDux911r6m7haRef0WH.jpg" 
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-netflix-black/80 via-transparent to-transparent"></div>
          <div className="absolute inset-0 netflix-hero-gradient"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight netflix-text-shadow">
              The Dark Knight
            </h1>
            <p className="text-lg sm:text-xl text-netflix-light-gray mb-6 leading-relaxed">
              When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.
            </p>
            
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center space-x-2 netflix-glass px-3 py-1 rounded-full netflix-glow">
                <span className="text-netflix-gold text-lg">⭐</span>
                <span className="text-white font-bold">9.0</span>
              </div>
              <span className="text-netflix-light-gray netflix-glass px-3 py-1 rounded-full">2008</span>
              <span className="text-netflix-light-gray netflix-glass px-3 py-1 rounded-full">2h 32m</span>
            </div>
            
            {/* Netflix-style action buttons */}
            <div className="flex space-x-4">
              <button className="btn-netflix flex items-center hover-lift">
                <span className="mr-2">▶</span>
                Play
              </button>
              <button className="btn-netflix-secondary flex items-center hover-lift">
                <span className="mr-2">+</span>
                My List
              </button>
              <button className="btn-netflix-outline hover-lift">
                ⓘ More Info
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Netflix-style Content Rows */}
      <div className="relative z-10 -mt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Trending Now Row */}
          <section className="animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 netflix-text-shadow">
              🔥 Trending Now
            </h2>
            
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="loading-dots">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            ) : (
              <div className="netflix-row">
                {filteredMovies.slice(0, 10).map((item, index) => (
                  <div key={item.id} className="flex-none w-48 sm:w-56 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <MovieCard item={item} />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Popular Movies Row */}
          <section className="animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 netflix-text-shadow">
              🎬 Popular Movies
            </h2>
            <div className="netflix-row">
              {popular.slice(0, 10).map((item, index) => (
                <div key={`popular-${item.id}`} className="flex-none w-48 sm:w-56 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <MovieCard item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Top Rated Row */}
          <section className="animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 netflix-text-shadow">
              ⭐ Top Rated Movies
            </h2>
            <div className="netflix-row">
              {topRated.slice(0, 10).map((item, index) => (
                <div key={`toprated-${item.id}`} className="flex-none w-48 sm:w-56 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <MovieCard item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Action Movies Row */}
          <section className="animate-fade-in">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 netflix-text-shadow">
              💥 Action Movies
            </h2>
            <div className="netflix-row">
              {trending.slice(0, 10).map((item, index) => (
                <div key={`action-${item.id}`} className="flex-none w-48 sm:w-56 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <MovieCard item={item} />
                </div>
              ))}
            </div>
          </section>

          {/* Continue Watching Row (if user has watchlist) */}
          {filteredMovies.length > 0 && (
            <section className="animate-fade-in">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 netflix-text-shadow">
                🎯 Because You Watched...
              </h2>
              <div className="netflix-row">
                {filteredMovies.slice(5, 15).map((item, index) => (
                  <div key={`recommended-${item.id}`} className="flex-none w-48 sm:w-56 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <MovieCard item={item} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home