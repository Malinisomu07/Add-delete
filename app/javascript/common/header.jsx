import React from 'react';
import '../Styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item"><a href="#" className="nav-link">Home</a></li>
          <li className="nav-item"><a href="#" className="nav-link">About</a></li>
          <li className="nav-item"><a href="#" className="nav-link">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
