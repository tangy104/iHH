import { useState, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../states/AuthContext";
import styles from "./Navbar.module.css";

import logo from "../../assets/images/logo.png";
import ham from "../../assets/images/ham.png";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { isAuthenticated, userRole } = useContext(AuthContext);

  const [showNavbar, setShowNavbar] = useState(false);
  const [showDropdownSignUp, setShowDropdownSignUp] = useState(false);
  const [showDropdownSignIn, setShowDropdownSignIn] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleNavLinkClick = () => {
    setShowNavbar(false);
  };

  const handleMouseEnterSignUp = () => {
    setShowDropdownSignUp(true);
  };

  const handleMouseLeaveSignUp = () => {
    setShowDropdownSignUp(false);
  };
  const handleMouseEnterSignIn = () => {
    setShowDropdownSignIn(true);
  };

  const handleMouseLeaveSignIn = () => {
    setShowDropdownSignIn(false);
  };

  const handleRoleSelectSignUp = (role) => {
    setShowDropdownSignUp(false);
    navigate(`/signUp/${role}`);
  };
  const handleRoleSelectSignIn = (role) => {
    setShowDropdownSignIn(false);
    navigate(`/signIn/${role}`);
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
            Intelligent Health Index
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
            <li
              onMouseEnter={handleMouseEnterSignUp}
              onMouseLeave={handleMouseLeaveSignUp}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <span className={styles.signupLink}>SignUp</span>
              {showDropdownSignUp && (
                <div className={styles.dropdown}>
                  <ul>
                    <li onClick={() => handleRoleSelectSignUp("employee")}>
                      Employee
                    </li>
                    <li onClick={() => handleRoleSelectSignUp("doctor")}>
                      Doctor
                    </li>
                    <li onClick={() => handleRoleSelectSignUp("admin")}>
                      Admin
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li
              onMouseEnter={handleMouseEnterSignIn}
              onMouseLeave={handleMouseLeaveSignIn}
              style={{ position: "relative", cursor: "pointer" }}
            >
              <span className={styles.signupLink}>SignIn</span>
              {showDropdownSignIn && (
                <div className={styles.dropdown}>
                  <ul>
                    <li onClick={() => handleRoleSelectSignIn("employee")}>
                      Employee
                    </li>
                    <li onClick={() => handleRoleSelectSignIn("doctor")}>
                      Doctor
                    </li>
                    <li onClick={() => handleRoleSelectSignIn("admin")}>
                      Admin
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
