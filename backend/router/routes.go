package router

import (
	"net/http"
	"github.com/gorilla/mux"
	"movie-discovery-app/controllers"
)

func SetupRoutes() *mux.Router {
	r := mux.NewRouter()

	api := r.PathPrefix("/api").Subrouter()
	api.HandleFunc("/search", controllers.SearchHandler).Methods("GET")
	api.HandleFunc("/details/{id}", controllers.DetailsHandler).Methods("GET")
	api.HandleFunc("/trending", controllers.TrendingHandler).Methods("GET")
	api.HandleFunc("/watchlist", controllers.GetWatchlist).Methods("GET")
	api.HandleFunc("/watchlist", controllers.AddToWatchlist).Methods("POST")
	api.HandleFunc("/watchlist/{id}", controllers.RemoveFromWatchlist).Methods("DELETE")

	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Movie Discovery API is running!"))
	})

	return r
}
