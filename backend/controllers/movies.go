package controllers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/gorilla/mux"
)

var (
	tmdbKey = os.Getenv("TMDB_API_KEY")
	omdbKey = os.Getenv("OMDB_API_KEY")
)

func SearchHandler(w http.ResponseWriter, r *http.Request) {
	query := r.URL.Query().Get("query")
	if query == "" {
		http.Error(w, "Missing search query", http.StatusBadRequest)
		return
	}

	tmdbURL := fmt.Sprintf("https://api.themoviedb.org/3/search/multi?query=%s&api_key=%s", query, tmdbKey)

	resp, err := http.Get(tmdbURL)
	if err != nil {
		http.Error(w, "Failed to fetch TMDB results", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

func DetailsHandler(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	tmdbURL := fmt.Sprintf("https://api.themoviedb.org/3/movie/%s?api_key=%s&append_to_response=credits", id, tmdbKey)

	resp, err := http.Get(tmdbURL)
	if err != nil {
		http.Error(w, "Failed to fetch movie details from TMDB", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	var tmdbData map[string]interface{}
	body, _ := ioutil.ReadAll(resp.Body)
	json.Unmarshal(body, &tmdbData)

	if imdbID, ok := tmdbData["imdb_id"].(string); ok && imdbID != "" {
		omdbURL := fmt.Sprintf("https://www.omdbapi.com/?i=%s&apikey=%s", imdbID, omdbKey)
		omdbResp, err := http.Get(omdbURL)
		if err == nil {
			defer omdbResp.Body.Close()
			omdbBody, _ := ioutil.ReadAll(omdbResp.Body)

			var omdbData map[string]interface{}
			json.Unmarshal(omdbBody, &omdbData)

			tmdbData["omdb"] = omdbData
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(tmdbData)
}

func TrendingHandler(w http.ResponseWriter, r *http.Request) {
	url := fmt.Sprintf("https://api.themoviedb.org/3/trending/all/day?api_key=%s", tmdbKey)

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Failed to fetch trending data", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, _ := ioutil.ReadAll(resp.Body)
	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}
