import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useWatchlist } from '../context/WatchlistContext'

function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { watchlist } = useWatchlist()

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const isActive = (path) => location.pathname === path

  return (
    <nav className="netflix-glass sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18">
          {/* Netflix-style Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="text-2xl sm:text-3xl font-black netflix-gradient group-hover:animate-pulse transition-all duration-300">
              MOVIEFLIX
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-all duration-200 hover:text-netflix-light-gray ${
                isActive('/') 
                  ? 'text-white font-bold' 
                  : 'text-netflix-light-gray'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/search" 
              className={`text-sm font-medium transition-all duration-200 hover:text-netflix-light-gray ${
                isActive('/search') 
                  ? 'text-white font-bold' 
                  : 'text-netflix-light-gray'
              }`}
            >
              Search
            </Link>
            <Link 
              to="/watchlist" 
              className={`text-sm font-medium transition-all duration-200 hover:text-netflix-light-gray relative ${
                isActive('/watchlist') 
                  ? 'text-white font-bold' 
                  : 'text-netflix-light-gray'
              }`}
            >
              My List
              {watchlist.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-netflix-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-pulse">
                  {watchlist.length > 9 ? '9+' : watchlist.length}
                </span>
              )}
            </Link>
            
            {/* Profile/Theme Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDark(!dark)}
                className="p-2 rounded-full text-netflix-light-gray hover:text-white transition-all duration-200"
                title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                <span className="text-lg">{dark ? '☀️' : '🌙'}</span>
              </button>
              
              {/* Netflix-style profile icon */}
              <div className="w-8 h-8 bg-netflix-red rounded-sm flex items-center justify-center">
                <span className="text-white text-sm font-bold">U</span>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded text-netflix-light-gray hover:text-white transition-all duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-netflix-medium-gray animate-slide-down">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive('/') 
                    ? 'text-white font-bold bg-netflix-medium-gray rounded' 
                    : 'text-netflix-light-gray hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/search" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive('/search') 
                    ? 'text-white font-bold bg-netflix-medium-gray rounded' 
                    : 'text-netflix-light-gray hover:text-white'
                }`}
              >
                Search
              </Link>
              <Link 
                to="/watchlist" 
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                  isActive('/watchlist') 
                    ? 'text-white font-bold bg-netflix-medium-gray rounded' 
                    : 'text-netflix-light-gray hover:text-white'
                }`}
              >
                <span>My List</span>
                {watchlist.length > 0 && (
                  <span className="bg-netflix-red text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {watchlist.length > 9 ? '9+' : watchlist.length}
                  </span>
                )}
              </Link>
              <button
                onClick={() => {
                  setDark(!dark)
                  setIsMenuOpen(false)
                }}
                className="px-4 py-3 text-sm font-medium text-netflix-light-gray hover:text-white transition-all duration-200 text-left"
              >
                {dark ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
