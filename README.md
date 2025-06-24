# Movie Discovery Web Application

A modern, Netflix-inspired movie and TV show discovery platform built with React and Go. Discover trending content, search for your favorite movies and shows, and manage your personal watchlist.

## 🎬 Features

- **Search Functionality**: Search for movies, TV shows, and actors with real-time results
- **Trending Content**: Discover what's popular right now
- **Personal Watchlist**: Save movies and shows to watch later
- **Detailed Information**: Get comprehensive details about movies and TV shows
- **Responsive Design**: Netflix-inspired UI that works on all devices
- **Filter Options**: Filter search results by movies, TV shows, or view all
- **Real-time Search**: Debounced search with instant results

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - Modern React with hooks
- **React Router DOM 7.6.2** - Client-side routing
- **Vite 6.3.5** - Fast build tool and dev server
- **Tailwind CSS 4.1.10** - Utility-first CSS framework
- **Axios 1.10.0** - HTTP client for API requests

### Backend
- **Go 1.24.2** - High-performance backend server
- **Gorilla Mux** - HTTP router and URL matcher
- **godotenv** - Environment variable management

### APIs
- **TMDB API** - The Movie Database for movie/TV data
- **OMDB API** - Open Movie Database for additional movie information

## 📁 Project Structure

```
Movie_Discovery_web/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── api/             # API service functions
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # React context providers
│   │   ├── pages/           # Page components
│   │   ├── assets/          # Static assets
│   │   └── main.jsx         # Application entry point
│   ├── public/              # Public static files
│   ├── package.json         # Frontend dependencies
│   └── .env                 # Environment variables
├── backend/                 # Go backend server
│   ├── controllers/         # HTTP request handlers
│   ├── router/              # Route definitions
│   ├── main.go              # Server entry point
│   └── go.mod               # Go module dependencies
└── README.md                # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Go** (v1.24 or higher)
- **TMDB API Key** - Get one from [TMDB](https://www.themoviedb.org/settings/api)
- **OMDB API Key** - Get one from [OMDB](http://www.omdbapi.com/apikey.aspx)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Movie_Discovery_web
   ```

2. **Set up the Frontend**
   ```bash
   cd frontend
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_TMDB_API_KEY=your_tmdb_api_key_here
   VITE_OMDB_API_KEY=your_omdb_api_key_here
   ```

   Create a `.env` file in the `backend` directory:
   ```env
   TMDB_API_KEY=your_tmdb_api_key_here
   OMDB_API_KEY=your_omdb_api_key_here
   PORT=8000
   ```

4. **Install Go Dependencies**
   ```bash
   cd ../backend
   go mod tidy
   ```

### Running the Application

#### Option 1: Frontend Only (Recommended for Development)
The frontend can run independently using the TMDB API directly:

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

#### Option 2: Full Stack (Frontend + Backend)

1. **Start the Backend Server**
   ```bash
   cd backend
   go run main.go
   ```
   Backend will run on `http://localhost:8000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📱 Usage

### Search for Content
1. Use the search bar on the main page
2. Type the name of a movie, TV show, or actor
3. Results appear in real-time as you type
4. Use the filter buttons to narrow results by type

### Manage Your Watchlist
1. Click the "+" button on any movie/TV show card
2. Access your watchlist from the navigation menu
3. Remove items by clicking the "✓" button

### View Details
1. Click on any movie or TV show card
2. View comprehensive information including cast, ratings, and synopsis

## 🎨 Features in Detail

### Netflix-Inspired Design
- Dark theme with red accent colors
- Smooth animations and hover effects
- Card-based layout with overlay information
- Responsive grid system

### Search Functionality
- **Debounced Search**: 600ms delay to prevent excessive API calls
- **Real-time Results**: Updates as you type
- **Filter Options**: Movies, TV Shows, or All content
- **Popular Searches**: Quick access to trending search terms

### Watchlist Management
- **Local Storage**: Persists across browser sessions
- **Add/Remove**: Simple toggle functionality
- **Visual Indicators**: Clear indication of watchlist status

## 🔧 Development

### Available Scripts

#### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

#### Backend
- `go run main.go` - Start development server
- `go build` - Build executable
- `go mod tidy` - Clean up dependencies

### Code Structure

#### Frontend Components
- **AppRouter.jsx** - Main routing configuration
- **Search.jsx** - Main search page with filters
- **MovieCard.jsx** - Individual movie/show card component
- **Navbar.jsx** - Navigation component
- **WatchlistContext.jsx** - Global state management for watchlist

#### Backend Controllers
- **movies.go** - Handles movie/TV show search and details
- **watchlist.go** - Manages watchlist operations

## 🌐 API Endpoints

### Frontend API (TMDB Direct)
- Search: `https://api.themoviedb.org/3/search/multi`
- Trending: `https://api.themoviedb.org/3/trending/all/week`
- Details: `https://api.themoviedb.org/3/{type}/{id}`

### Backend API (Optional)
- `GET /api/search?query={query}` - Search content
- `GET /api/trending` - Get trending content
- `GET /api/details/{id}` - Get detailed information
- `GET /api/watchlist` - Get user watchlist
- `POST /api/watchlist` - Add to watchlist
- `DELETE /api/watchlist/{id}` - Remove from watchlist

## 🚀 Deployment

### Frontend Deployment
```bash
cd frontend
npm run build
# Deploy the 'dist' folder to your hosting service
```

### Backend Deployment
```bash
cd backend
go build -o movie-discovery-server
# Deploy the binary to your server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing comprehensive movie and TV data
- [OMDB](http://www.omdbapi.com/) for additional movie information
- Netflix for design inspiration
- React and Go communities for excellent documentation and tools

## 🐛 Troubleshooting

### Common Issues

1. **Search not working**
   - Check if TMDB API key is correctly set in `.env`
   - Ensure the API key is valid and has proper permissions

2. **Watchlist not persisting**
   - Check browser's local storage permissions
   - Ensure WatchlistContext is properly wrapped around the app

3. **Images not loading**
   - TMDB image URLs might be blocked by CORS in some environments
   - Check network tab for failed image requests

4. **Backend connection issues**
   - Ensure backend server is running on the correct port
   - Check CORS settings if running frontend and backend separately

### Getting Help

If you encounter any issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check the network tab for failed API requests

---

**Happy movie discovering! 🍿**