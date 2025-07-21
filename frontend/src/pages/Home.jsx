import React from 'react';
import '../styles/home.css';
import { Container, Row, Col } from 'reactstrap';

import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';

import Subtitles from '../shared/Subtitle';
import SearchBar from '../shared/SearchBar';
import ServiceList from '../Services/ServiceList';
import FeaturedTourList from '../Featured-tour/FeaturedTourList';
import experienceImg from '../assets/images/experience.png';
import MasonryImagesGallery from '../component/Image-Gallery/MasonryImagesGallery';
import Testimonials from '../component/Testimonial/Testimonials';
import Newsletter from '../shared/Newsletter';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section>
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="hero_content">
                <div className="hero_subtitle d-flex align-items-center">
                  <Subtitles subtitles="Know Before You Go" />
                  <img class="world"src={worldImg} alt="world" />
                </div>
                <h1>
                  Traveling opens the door to creating{' '}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Ready to trade the everyday for the extraordinary? Discover breathtaking landscapes,
                  vibrant cultures, and unforgettable adventures with us. 
                  Your journey begins now.. where will your wanderlust take you?
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box">
                <img src={heroImg} alt="hero-1" />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box mt-4">
                <video src={heroVideo} controls />
              </div>
            </Col>

            <Col lg="2">
              <div className="hero_img-box mt-5">
                <img src={heroImg02} alt="hero-2" />
              </div>
            </Col>

            <SearchBar />
          </Row>
        </Container>
      </section>

      {/* Services */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <h5 className="service_subtitle">What we serve</h5>
              <h2 className="service_title">We offer our best services</h2>
            </Col>
          </Row>
          <Row>

              <ServiceList />
          </Row>
        </Container>
      </section>

      {/* Featured Tours */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitles subtitle="Explore" />
              <h2 className="feature_tour-title">Our Featured Tour</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>

      {/* Experience */}
      <section>
        <Container>
          <Row className="align-items-center">
            <Col lg="6">
              <div className="experience_content">
                <Subtitles subtitle="Experience" />
                <h2>
                  With our experience <br /> we will serve you
                </h2>
                <p>
                  With over a decade of dedicated service and thousands of satisfied adventurers, 
                  we've honed our expertise in crafting seamless and enriching travel experiences. 
                  Trust us to handle every detail, ensuring your journey is nothing short of exceptional and memorable from start to finish.
                </p>
              </div>

              <div className="counter_wrapper d-flex align-items-center gap-5">
                <div className="counter_box">
                  <span>12k+</span>
                  <h6>Successful trips</h6>
                </div>

                <div className="counter_box">
                  <span>2k</span>
                  <h6>Regular clients</h6>
                </div>

                <div className="counter_box">
                  <span>15</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>

            <Col lg="6">
              <div className="experience_img">
                <img src={experienceImg} alt="experience" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitles subtitle="Gallery" />
              <h2 className="gallery_title">Visit our customers' tour gallery</h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Testimonials */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitles subtitle="Fans Love" />
              <h2 className="testimonial_title">What our customers say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonials />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </>
  );
};

export default Home;
