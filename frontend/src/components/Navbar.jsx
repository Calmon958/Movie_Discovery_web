import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-zinc-900 p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-red-500">
        MovieFlix
      </div>
      <div className="space-x-4 text-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/search" className="hover:underline">Search</Link>
        <Link to="/watchlist" className="hover:underline">Watchlist</Link>
      </div>
    </nav>
  )
}

export default Navbar
