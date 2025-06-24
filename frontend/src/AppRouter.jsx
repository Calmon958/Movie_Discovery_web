import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WatchlistProvider } from './context/WatchlistContext'
import Navbar from './components/Navbar'
import Search from './pages/Search'
import SearchSimple from './pages/SearchSimple'
import Watchlist from './pages/Watchlist'
import Details from './pages/Details'

function AppRouter() {
  return (
    <WatchlistProvider>
      <Router>
        <div className="min-h-screen bg-netflix-dark">
          <Navbar />
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search-simple" element={<SearchSimple />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/details/:id" element={<Details />} />
          </Routes>
        </div>
      </Router>
    </WatchlistProvider>
  )
}

export default AppRouter