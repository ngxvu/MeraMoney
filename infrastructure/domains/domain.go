package domains

import (
	"gorm.io/gorm"
	"time"
)

type BaseInt struct {
	ID        int             `gorm:"primary_key;autoIncrement" json:"id"`
	CreatedAt *time.Time      `gorm:"column:created_at;default:CURRENT_TIMESTAMP" json:"created_at"`
	UpdatedAt *time.Time      `gorm:"column:updated_at;default:CURRENT_TIMESTAMP" json:"updated_at"`
	DeletedAt *gorm.DeletedAt `json:"deleted_at,omitempty" gorm:"index"`
}

type User struct {
	BaseInt
	UserName    string        `json:"user_name" gorm:"type:varchar(100);not null"`
	Password    string        `json:"password" gorm:"type:text;not null"`
	Category    []Category    `json:"-" gorm:"foreignKey:UserID"`
	Transaction []Transaction `json:"-" gorm:"foreignKey:UserID"`
}

type Category struct {
	BaseInt
	UserID      int    `gorm:"not null" json:"user_id"`
	Name        string `gorm:"type:varchar(100);not null" json:"name"`
	Description string `gorm:"type:text" json:"description"`
	Type        string `gorm:"type:varchar(100)" json:"type"`
	IconID      int    `gorm:"type:int" json:"icon_id"  `
}

type Transaction struct {
	BaseInt
	UserID      int     `gorm:"not null" json:"user_id"`
	CategoryID  int     `gorm:"not null" json:"category_id"`
	Amount      float64 `gorm:"not null" json:"amount"`
	Description string  `gorm:"type:text" json:"description"`
	Type        string  `gorm:"type:varchar(100);not null" json:"type"`
}

type IconCatalog struct {
	BaseInt
	IconType string     `gorm:"type:varchar(100);not null" json:"icon_type"`
	ImageUrl string     `gorm:"type:text;unique" json:"image_url"`
	Category []Category `json:"-" gorm:"foreignKey:IconID"`
}

type ListImageFromUpload struct {
	ListImage []ImageFromUpload `json:"list_image"`
}

type ImageFromUpload struct {
	ImageUrl string `json:"image_url"`
}
