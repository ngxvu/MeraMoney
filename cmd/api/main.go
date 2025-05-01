package main

import (
	"fmt"
	"gorm.io/gorm"
	"log"
	"meramoney/backend/infrastructure/middlewares"
	"meramoney/backend/internal/database"
	"meramoney/backend/internal/server"
	"net/http"
	"os"

	"github.com/joho/godotenv"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	// Load environment variables
	loadEnv()

	// Initialize the database connection
	db := initDatabase()
	defer closeDatabase(db)

	// Initialize the server
	srv := &server.Server{DB: db}

	// Set up the router
	r := initRouter(srv)

	// Ensure uploads directory exists
	ensureUploadsDir("uploads")

	// Start the server
	startServer(r)
}

func loadEnv() {
	err := godotenv.Load("internal/database/.env")
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}
}

func initDatabase() *gorm.DB {
	db, err := database.ConnectDatabase()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}
	return db
}

func closeDatabase(db *gorm.DB) {
	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalf("Failed to get sql.DB from GORM DB: %v", err)
	}
	sqlDB.Close()
}

func initRouter(srv *server.Server) *mux.Router {
	r := mux.NewRouter()
	r.Use(middlewares.LoggingMiddleware)
	srv.Routes(r)
	r.PathPrefix("/uploads/").Handler(http.StripPrefix("/uploads/", http.FileServer(http.Dir("uploads"))))
	return r
}

func ensureUploadsDir(dir string) {
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		err := os.Mkdir(dir, os.ModePerm)
		if err != nil {
			log.Fatalf("Failed to create uploads directory: %v", err)
		}
	}
}

func startServer(r *mux.Router) {
	corsOptions := handlers.AllowedOrigins([]string{"*"})
	corsHeaders := handlers.AllowedHeaders([]string{"Content-Type", "Authorization"})
	corsMethods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"})

	httpServer := server.NewServer(handlers.CORS(corsOptions, corsHeaders, corsMethods)(r))
	httpServer.Addr = ":8080"

	log.Println("Server started on port 8080")
	err := httpServer.ListenAndServe()
	if err != nil {
		panic(fmt.Sprintf("cannot start server: %s", err))
	}
}
