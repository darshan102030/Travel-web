import React, { useRef, useEffect, useContext } from 'react';
import { Container, Row, Button } from 'reactstrap';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import './Header.css';

import { AuthContext } from './../context/AuthContext';

const nav_links = [
  { path: '/home', Display: 'Home' },
  { path: '/about', Display: 'About' },
  { path: '/tours', Display: 'Tours' },
];

const admin_link = { path: '/admin/add-tour', Display: 'Add Tour' };

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky_header');
      } else {
        headerRef.current.classList.remove('sticky_header');
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup to avoid memory leak
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    if (menuRef.current) {
      menuRef.current.classList.toggle('show_menu');
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav_wrapper d-flex align-items-center justify-content-between">

            {/* Logo */}
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="Logo" />
              </Link>
            </div>

            {/* Navigation Menu */}
            <div className="navigation" ref={menuRef}>
              <ul className="menu d-flex align-items-center gap-5">
                {nav_links.map((item, index) => (
                  <li className="nav_item" key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? 'active_link' : '')}
                    >
                      {item.Display}
                    </NavLink>
                  </li>
                ))}
                {user && user.role === 'admin' && (
                  <li className="nav_item">
                    <NavLink
                      to={admin_link.path}
                      className={({ isActive }) => (isActive ? 'active_link' : '')}
                    >
                      {admin_link.Display}
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>

            {/* User Buttons */}
            <div className="nav_right d-flex align-items-center gap-4">
              <div className="nav_btns d-flex align-items-center gap-3">
                 {user ? (
                   <>
                     <h5 className="mb-0">{user.username}</h5>
                     <Button className="btn btn-dark" onClick={handleLogout}>
                       Logout
                     </Button>
                   </>
                 ) : (
                  <>
                    <Button className="btn secondary_btn">
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="btn primary_btn">
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Mobile Menu Icon */}
              <span className="mobile_menu" onClick={toggleMenu}>
                <i className="ri-menu-line"></i>
              </span>
            </div>

          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
