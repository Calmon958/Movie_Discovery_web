import React, { useState, useEffect } from 'react';
import ContentRow from './ContentRow';
import { 
  fetchTrending, 
  fetchMovies, 
  fetchTVShows, 
  fetchTopRatedMovies, 
  fetchUpcomingMovies, 
  fetchNowPlayingMovies,
  fetchGenres,
  fetchMoviesByGenre,
  fetchTVByGenre
} from '../api/tmdb';

const NetflixStyleGrid = ({ onItemClick, activeView }) => {
  const [contentRows, setContentRows] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNetflixStyleContent();
  }, [activeView]);

  const loadNetflixStyleContent = async () => {
    setLoading(true);
    try {
      const rows = [];

      if (activeView === 'trending' || activeView === 'home') {
        // Trending content
        const trendingData = await fetchTrending();
        if (trendingData?.results) {
          rows.push({
            title: '🔥 Trending Now',
            content: trendingData.results.filter(item => item.media_type !== 'person' && item.poster_path)
          });
        }

        // Popular Movies
        const popularMoviesData = await fetchMovies();
        if (popularMoviesData?.results) {
          rows.push({
            title: '🎬 Popular Movies',
            content: popularMoviesData.results.filter(item => item.poster_path)
          });
        }

        // Popular TV Shows
        const popularTVData = await fetchTVShows();
        if (popularTVData?.results) {
          rows.push({
            title: '📺 Popular TV Shows',
            content: popularTVData.results.filter(item => item.poster_path)
          });
        }

        // Top Rated Movies
        const topRatedData = await fetchTopRatedMovies();
        if (topRatedData?.results) {
          rows.push({
            title: '⭐ Top Rated Movies',
            content: topRatedData.results.filter(item => item.poster_path)
          });
        }

        // Now Playing Movies
        const nowPlayingData = await fetchNowPlayingMovies();
        if (nowPlayingData?.results) {
          rows.push({
            title: '🎭 Now Playing',
            content: nowPlayingData.results.filter(item => item.poster_path)
          });
        }

        // Upcoming Movies
        const upcomingData = await fetchUpcomingMovies();
        if (upcomingData?.results) {
          rows.push({
            title: '🔜 Coming Soon',
            content: upcomingData.results.filter(item => item.poster_path)
          });
        }

        // Load movies by genres
        await loadGenreRows(rows, 'movie');

      } else if (activeView === 'movies') {
        // Movies-focused view
        const popularMoviesData = await fetchMovies();
        if (popularMoviesData?.results) {
          rows.push({
            title: '🎬 Popular Movies',
            content: popularMoviesData.results.filter(item => item.poster_path)
          });
        }

        const topRatedData = await fetchTopRatedMovies();
        if (topRatedData?.results) {
          rows.push({
            title: '⭐ Top Rated Movies',
            content: topRatedData.results.filter(item => item.poster_path)
          });
        }

        const nowPlayingData = await fetchNowPlayingMovies();
        if (nowPlayingData?.results) {
          rows.push({
            title: '🎭 Now Playing',
            content: nowPlayingData.results.filter(item => item.poster_path)
          });
        }

        const upcomingData = await fetchUpcomingMovies();
        if (upcomingData?.results) {
          rows.push({
            title: '🔜 Coming Soon',
            content: upcomingData.results.filter(item => item.poster_path)
          });
        }

        // Load movie genres
        await loadGenreRows(rows, 'movie');

      } else if (activeView === 'tv') {
        // TV Shows-focused view
        const popularTVData = await fetchTVShows();
        if (popularTVData?.results) {
          rows.push({
            title: '📺 Popular TV Shows',
            content: popularTVData.results.filter(item => item.poster_path)
          });
        }

        // Load TV show genres
        await loadGenreRows(rows, 'tv');
      }

      setContentRows(rows);
    } catch (error) {
      console.error('Error loading Netflix-style content:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadGenreRows = async (rows, type) => {
    try {
      const genresData = await fetchGenres(type);
      if (genresData?.genres) {
        // Get the first 8 genres to avoid too many API calls
        const topGenres = genresData.genres.slice(0, 8);
        
        for (const genre of topGenres) {
          try {
            const genreContent = type === 'movie' 
              ? await fetchMoviesByGenre(genre.id)
              : await fetchTVByGenre(genre.id);
            
            if (genreContent?.results && genreContent.results.length > 0) {
              rows.push({
                title: `${genre.name} ${type === 'movie' ? 'Movies' : 'TV Shows'}`,
                content: genreContent.results.filter(item => item.poster_path)
              });
            }
          } catch (error) {
            console.error(`Error loading ${genre.name} content:`, error);
          }
        }
      }
    } catch (error) {
      console.error('Error loading genres:', error);
    }
  };

  if (loading) {
    return (
      <div className="netflix-grid-loading">
        <div className="loading-spinner">Loading amazing content...</div>
      </div>
    );
  }

  return (
    <div className="netflix-style-grid">
      {contentRows.map((row, index) => (
        <ContentRow
          key={`${row.title}-${index}`}
          title={row.title}
          content={row.content}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
};

export default NetflixStyleGrid;