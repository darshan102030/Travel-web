import React from 'react';
import './footer.css';

import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const quick_links = [
  { path: '/home', Display: 'Home' },
  { path: '/about', Display: 'About' },
  { path: '/tours', Display: 'Tours' },
];

const quick_links2 = [
  { path: '/gallery', Display: 'Gallery' },
  { path: '/login', Display: 'Login' },
  { path: '/register', Display: 'Register' },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="Site Logo" />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Commodi, enim.
              </p>
              <div className="social_links d-flex align-items-center gap-4">
                <span>
                  <Link to="#" aria-label="YouTube">
                    <i className="ri-youtube-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#" aria-label="GitHub">
                    <i className="ri-github-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#" aria-label="Facebook">
                    <i className="ri-facebook-line"></i>
                  </Link>
                </span>
                <span>
                  <Link to="#" aria-label="Instagram">
                    <i className="ri-instagram-line"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer_link-title">Discover</h5>
            <ListGroup className="footer_quick-links">
              {quick_links.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.Display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer_link-title">Quick Links</h5>
            <ListGroup className="footer_quick-links">
              {quick_links2.map((item, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={item.path}>{item.Display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer_link-title">Contact</h5>
            <ListGroup className="footer_quick-links">
              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-map-pin-line"></i></span>
                  Address:
                </h6>
                <p className="mb-0">Pune, Maharashtra</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-mail-line"></i></span>
                  Email:
                </h6>
                <p className="mb-0">gosavidarshan024@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span><i className="ri-phone-line"></i></span>
                  Phone:
                </h6>
                <p className="mb-0">+91 98505 930XX</p>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="copyright">
              Copyright {year}, design and developed by <u><i>Darshan Gosavi</i></u> & <u><i>Abhishek Kaware</i></u> .
              All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
