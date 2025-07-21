import React from "react";
import "./newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row className="align-items-center">
          <Col lg="6">
            <div className="newsletter_content">
              <h2>Subscribe now to get useful traveling information.</h2>
              <div className="newsletter_input">
                <input type="email" placeholder="Enter your email" />
                <button className="btn newsletter_btn">Subscribe</button>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati adipisci sunt in, provident facere ipsam.
              </p>
            </div>
          </Col>
          <Col lg="6">
            <div className="newsletter_img text-center">
              <img src={maleTourist} alt="Male Tourist" className="img-fluid" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
