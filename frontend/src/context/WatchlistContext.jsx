import { createContext, useContext, useEffect, useState } from 'react'

const WatchlistContext = createContext()

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('watchlist')
    if (stored) {
      setWatchlist(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const addToWatchlist = (item) => {
    if (!watchlist.some((i) => i.id === item.id)) {
      setWatchlist((prev) => [...prev, item])
    }
  }

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  return useContext(WatchlistContext)
}
