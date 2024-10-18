// src/components/Footer.js
import React from 'react';
import './Footer.css';  // Importamos el archivo de estilo

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 MyApp. All rights reserved.</p>
      <p>Follow us on: 
        <a href="https://twitter.com">Twitter</a> | 
        <a href="https://facebook.com">Facebook</a>
      </p>
    </footer>
  );
};

export default Footer;
