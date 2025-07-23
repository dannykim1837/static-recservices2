import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { text: "Home", link: "/dashboard", icon: "home" },
  { text: "Announcements", link: "/", icon: "notifications" },
  { text: "Time Clock", link: "/time-clock", icon: "schedule" },
  { text: "Calendar", link: "/calendar", icon: "calendar_today" },
  { text: "Create Event", link: "/create-event", icon: "add_circle" },
  { text: "Settings", link: "/settings", icon: "settings" },
  { text: "User Profile", link: "/user-profile", icon: "account_circle" },
];

const iconStyle = {
  color: 'white',
  marginRight: '10px',
  fontSize: '24px',
  verticalAlign: 'middle',
};

const linkStyle = {
  textDecoration: 'none',
  color: 'white',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleMenuToggle = (e) => {
    e.stopPropagation();
    setMenuOpen((open) => !open);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.menu-list') && !e.target.closest('#menu-toggle')) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Ensure Google Material Icons font is loaded
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <nav>
      <div id="menu-container" className={menuOpen ? 'open' : ''}>
        <ul className="menu-list" style={{ listStyle: 'none' }}>
          {menuItems.map(item => (
            <li key={item.text} className={location.pathname === item.link ? 'active' : ''}>
              <Link to={item.link} style={linkStyle}>
                <span className="material-icons" style={iconStyle}>{item.icon}</span>
                <span className="menu-text">{item.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
