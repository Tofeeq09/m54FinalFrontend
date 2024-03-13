// Path: src/components/footer/Footer.jsx

import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-copy">&copy; {new Date().getFullYear()} SQUADS</p>
      </div>
    </footer>
  );
}

export default Footer;
