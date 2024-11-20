import React from 'react';
import './Footer.css'; // Archivo de estilos

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section">
        <h3 className="footer-logo">Eventick</h3>
        <p>
          Eventick is a global self-service ticketing platform for live
          experiences that allows anyone to create, share, find, and attend
          events that fuel their passions and enrich their lives.
        </p>
        <div className="social-icons">
          <a href="https://facebook.com" aria-label="Facebook">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h4>Plan Events</h4>
        <ul>
          <li><a href="#">Create and Set Up</a></li>
          <li><a href="#">Sell Tickets</a></li>
          <li><a href="#">Online RSVP</a></li>
          <li><a href="#">Online Events</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Eventick</h4>
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Press</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Help Center</a></li>
          <li><a href="#">How it Works</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Stay In The Loop</h4>
        <p>Join our mailing list to stay in the loop with our newest for event and concert.</p>
        <form>
          <input
            type="email"
            placeholder="Enter your email address.."
            aria-label="Email"
          />
          <button type="submit">Subscribe Now</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
