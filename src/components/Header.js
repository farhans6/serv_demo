import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    navigate("/login");
  };

  return (
    <header style={styles.header}>
      <nav>
        <ul style={styles.navList}>
          <li style={styles.navItem} onClick={() => navigate("/profile")}>
            Profile
          </li>
          <li style={styles.navItem} onClick={() => navigate("/booking")}>
            Book a Service
          </li>
          <li style={styles.navItem} onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    background: "#68a4d9",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
  },
  navList: {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 20px",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Header;
