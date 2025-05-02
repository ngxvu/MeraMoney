import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IconCatalogList.scss';
import logo from "../../assets/images/finalcs50-meramoney.png";
import Navbar from "../../components/Navbar/Navbar";
import config from "../../config";

function IconCatalogList() {
    const [iconCatalog, setIconCatalog] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchIconCatalog = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`${config.apiBaseUrl}${config.endpoints.listIconCatalog}?page=1&page_size=1000`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setIconCatalog(data);
            } catch (error) {
                console.error('There was an error fetching the icon catalog!', error);
            }
        };

        fetchIconCatalog();
    }, [navigate]);

    const handleSelectIcon = (iconId, iconUrl) => {
        navigate(`/create-category?icon_id=${iconId}&icon_url=${iconUrl}`);
    };

    const groupedIcons = iconCatalog.reduce((acc, icon) => {
        if (!acc[icon.icon_type]) {
            acc[icon.icon_type] = [];
        }
        acc[icon.icon_type].push(icon);
        return acc;
    }, {});

    return (
        <>
        <div className="navbar-banner-container">
            <header className="navbar-banner">
                <div className="navbar-logo-container">
                    <img src={logo} alt="Logo"/>
                    <span className="navbar-logo-text">Meramoney</span>
                </div>
                <Navbar/>
            </header>
        </div>
    <div className="icon-catalog-list">
        {Object.keys(groupedIcons).map(iconType => (
            <div key={iconType} className="icon-group">
                <h3>{iconType}</h3>
                <div className="icon-items">
                    {groupedIcons[iconType].map(icon => (
                        <div key={icon.id} className="icon-item">
                        <img src={icon.image_url} alt={icon.icon_type} />
                                <button onClick={() => handleSelectIcon(icon.id, icon.image_url)}>Select</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
        </>
    );
}

export default IconCatalogList;