import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <nav className="bg-zinc-900 p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-red-500">MovieFlix</div>
      <div className="space-x-4 text-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/search" className="hover:underline">Search</Link>
        <Link to="/watchlist" className="hover:underline">Watchlist</Link>
        <button
          onClick={() => setDark(!dark)}
          className="ml-4 text-xs border px-2 py-1 rounded"
        >
          {dark ? '☀️ Light Mode' : '🌒 Dark Mode'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
