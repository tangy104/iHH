import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

import logo from "../../assets/images/logo.png";
import ham from "../../assets/images/ham.png";

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  console.log("Current path:", currentPath);
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleNavLinkClick = () => {
    setShowNavbar(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img
            src={logo}
            style={{ resizeMode: "contain", height: "2rem" }}
            alt="menu"
          />
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.4rem",
              fontStyle: "italic",
            }}
          >
            intelligent Health Index
          </div>
        </div>
        <div className={styles.menuIcon} onClick={handleShowNavbar}>
          <img
            src={ham}
            style={{ resizeMode: "contain", height: "2rem" }}
            alt="menu"
          />
        </div>
        <div
          className={`${styles.navElements} ${showNavbar ? styles.active : ""}`}
        >
          <ul>
            {/* <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                Home
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/form"
                className={({ isActive }) =>
                  isActive || currentPath === "/" ? styles.activeLink : ""
                }
                onClick={handleNavLinkClick}
              >
                Form
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
                onClick={handleNavLinkClick}
              >
                Analytics
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                About
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? styles.activeLink : ""
                }
              >
                Contact
              </NavLink>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
