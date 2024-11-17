package server

import (
	"encoding/json"
	"meramoney/backend/infrastructure/domains"
	"net/http"
	"strconv"
)

func (s *Server) GetListIconCatalog(w http.ResponseWriter, r *http.Request) {
	// Parse query parameters for pagination
	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil || page < 1 {
		page = 1
	}

	pageSize, err := strconv.Atoi(r.URL.Query().Get("page_size"))
	if err != nil || pageSize < 1 {
		pageSize = 10
	}

	// Calculate offset
	offset := (page - 1) * pageSize

	// Retrieve icon catalogs with pagination
	var iconCatalogs []domains.IconCatalog
	if err := s.DB.Limit(pageSize).Offset(offset).Find(&iconCatalogs).Error; err != nil {
		http.Error(w, "Failed to retrieve icon catalogs", http.StatusInternalServerError)
		return
	}

	// Set response header to application/json
	w.Header().Set("Content-Type", "application/json")

	// Encode the list of icon catalogs to JSON and send the response
	if err := json.NewEncoder(w).Encode(iconCatalogs); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}
