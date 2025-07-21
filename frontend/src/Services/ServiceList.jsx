import React from 'react';
import ServiceCard from './ServiceCard';
import { Col } from 'reactstrap';

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [
  {
    imgUrl: weatherImg,
    title: 'Weather',
    desc: 'Get real-time weather updates for your travel destinations to plan better.',
  },
  {
    imgUrl: guideImg,
    title: 'Guide',
    desc: 'We provide experienced local guides to enhance your travel experience.',
  },
  {
    imgUrl: customizationImg,
    title: 'Customization',
    desc: 'Personalize your trip packages with ease to suit your preferences.',
  }
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col lg="4" md="6" sm="12" className="mb-4" key={index}>
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
