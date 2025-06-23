package main

import (
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"movie-discovery-app/router"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, proceeding with system env variables")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8000"
	}

	r := router.SetupRoutes()

	log.Println("Server running on port:", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
