package server

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"meramoney/backend/infrastructure/domains"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type ListImageFromUpload struct {
	ListImage []ImageFromUpload `json:"list_image"`
}

type ImageFromUpload struct {
	ImageUrl string `json:"image_url"`
}

func (s *Server) UploadHandler(w http.ResponseWriter, r *http.Request) {
	// Parse the multipart form
	err := r.ParseMultipartForm(10 << 20) // 10 MB
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	// Retrieve the file from form data
	file, handler, err := r.FormFile("image")
	if err != nil {
		http.Error(w, "Unable to retrieve file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	// Validate file type
	ext := strings.ToLower(filepath.Ext(handler.Filename))
	if ext != ".png" && ext != ".jpg" && ext != ".jpeg" && ext != ".gif" {
		http.Error(w, "Invalid file type", http.StatusBadRequest)
		return
	}

	// Read the file content
	fileBytes, err := ioutil.ReadAll(file)
	if err != nil {
		http.Error(w, "Unable to read file", http.StatusInternalServerError)
		return
	}

	// Create a unique file name
	fileName := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
	filePath := filepath.Join("uploads", fileName)

	// Save the file
	err = ioutil.WriteFile(filePath, fileBytes, 0644)
	if err != nil {
		http.Error(w, "Unable to save file", http.StatusInternalServerError)
		return
	}

	// Generate the file URL
	baseURL := os.Getenv("BASE_URL")
	fileURL := fmt.Sprintf("%s/uploads/%s", baseURL, fileName)

	// Return the file URL
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fileURL))
}

// Get List Image from Uploads folder
func (s *Server) GetListImage(w http.ResponseWriter, r *http.Request) {
	files, err := ioutil.ReadDir("uploads")
	if err != nil {
		http.Error(w, "Unable to read directory", http.StatusInternalServerError)
		return
	}

	var listImageFromUpload ListImageFromUpload

	var listImage []ImageFromUpload

	for _, image := range files {
		listImage = append(listImage, ImageFromUpload{
			ImageUrl: image.Name(),
		})
	}

	listImageFromUpload.ListImage = listImage

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(listImageFromUpload); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}

}

func (s *Server) UploadListImageHandler(w http.ResponseWriter, r *http.Request) {
	// Parse the multipart form
	err := r.ParseMultipartForm(10 << 20) // 10 MB
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	// Retrieve the type from form data
	iconType := r.FormValue("type")
	if iconType == "" {
		http.Error(w, "Type is required", http.StatusBadRequest)
		return
	}

	// Retrieve the files from form data
	files := r.MultipartForm.File["images"]
	if len(files) == 0 {
		http.Error(w, "No files uploaded", http.StatusBadRequest)
		return
	}

	var imageUrls []string

	for _, fileHeader := range files {
		file, err := fileHeader.Open()
		if err != nil {
			http.Error(w, "Unable to open file", http.StatusInternalServerError)
			return
		}
		defer file.Close()

		// Validate file type
		ext := strings.ToLower(filepath.Ext(fileHeader.Filename))
		if ext != ".png" && ext != ".jpg" && ext != ".jpeg" && ext != ".gif" {
			http.Error(w, "Invalid file type", http.StatusBadRequest)
			return
		}

		// Read the file content
		fileBytes, err := ioutil.ReadAll(file)
		if err != nil {
			http.Error(w, "Unable to read file", http.StatusInternalServerError)
			return
		}

		// Create a unique file name
		fileName := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
		filePath := filepath.Join("uploads", fileName)

		// Save the file
		err = ioutil.WriteFile(filePath, fileBytes, 0644)
		if err != nil {
			http.Error(w, "Unable to save file", http.StatusInternalServerError)
			return
		}

		// Generate the file URL
		baseURL := os.Getenv("BASE_URL")
		fileURL := fmt.Sprintf("%s/uploads/%s", baseURL, fileName)
		imageUrls = append(imageUrls, fileURL)

		// Save to database
		iconCatalog := domains.IconCatalog{
			IconType: iconType,
			ImageUrl: fileURL,
		}
		if err := s.DB.Create(&iconCatalog).Error; err != nil {
			http.Error(w, "Failed to save to database", http.StatusInternalServerError)
			return
		}
	}

	// Return the list of image URLs
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(imageUrls); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
