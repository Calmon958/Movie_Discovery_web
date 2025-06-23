package controllers

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type WatchlistItem struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	Poster   string `json:"poster"`
	Watched  bool   `json:"watched"`
	MediaType string `json:"media_type"`
}

var watchlist = make(map[string]WatchlistItem)

func GetWatchlist(w http.ResponseWriter, r *http.Request) {
	items := []WatchlistItem{}
	for _, item := range watchlist {
		items = append(items, item)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(items)
}

func AddToWatchlist(w http.ResponseWriter, r *http.Request) {
	var item WatchlistItem
	if err := json.NewDecoder(r.Body).Decode(&item); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	item.ID = strings.TrimSpace(item.ID)
	if item.ID == "" {
		http.Error(w, "Missing item ID", http.StatusBadRequest)
		return
	}

	watchlist[item.ID] = item
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(item)
}

func RemoveFromWatchlist(w http.ResponseWriter, r *http.Request) {
	id := mux.Vars(r)["id"]

	if _, exists := watchlist[id]; !exists {
		http.Error(w, "Item not found in watchlist", http.StatusNotFound)
		return
	}

	delete(watchlist, id)
	w.WriteHeader(http.StatusNoContent)
}
