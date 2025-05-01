package database

import (
	"fmt"
	"os"
	"sync"

	_ "github.com/joho/godotenv/autoload"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// ConnectDatabase initializes and returns a GORM DB instance.
var dbInstance *gorm.DB
var dbOnce sync.Once

// ConnectDatabase initializes and returns a GORM DB instance using the singleton pattern.
func ConnectDatabase() (*gorm.DB, error) {
	var err error
	dbOnce.Do(func() {
		// Load environment variables
		database := os.Getenv("DB_DATABASE")
		password := os.Getenv("DB_PASSWORD")
		username := os.Getenv("DB_USERNAME")
		port := os.Getenv("DB_PORT")
		host := os.Getenv("DB_HOST")
		sslmode := os.Getenv("DB_SSLMODE")

		// Create the DSN (Data Source Name)
		dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=%s",
			host, username, password, database, port, sslmode)

		dbInstance, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
		if err != nil {
			err = fmt.Errorf("Error connecting to database: %w", err)
		}
	})
	return dbInstance, err
}
