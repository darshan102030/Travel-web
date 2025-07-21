import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";
import ava04 from "../../assets/images/ava-4.jpg";


const testimonialsData = [
  {
    img: ava01,
    name: "John Doe",
    role: "Customer",
    text: "Our trip organized by this team was absolutely flawless from start to finish! Every detail was meticulously handled, allowing us to truly relax and immerse ourselves in the destination. It was an unforgettable adventure, and we can't wait to book our next one!"
  },
  {
    img: ava02,
    name: "Jane Smith",
    role: "Customer",
    text: "I've used several travel agencies before, but none compare to the personalized service and expertise we received here. They listened to all our preferences and crafted a unique itinerary that exceeded every expectation. Highly recommend for anyone seeking a truly tailored experience."
  },
  {
    img: ava03,
    name: "Alex Johnson",
    role: "Customer",
    text: "From the initial planning stages to the moment we returned home, the support and guidance were exceptional. The destinations chosen were breathtaking, and the local experiences were authentic and enriching. A truly professional and passionate team!"
  },
  {
    img: ava04,
    name: "Hritik Roshan",
    role: "Customer",
    text: "They listened to all our preferences and crafted a unique itinerary that exceeded every expectation. Highly recommend for anyone seeking a truly tailored experience."
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {testimonialsData.map((item, index) => (
        <div className="testimonial py-4 px-3" key={index}>
          <p>{item.text}</p>
          <div className="d-flex align-items-center gap-4 mt-3">
            <img
              src={item.img}
              className="rounded-2"
              alt={`testimonial-${item.name}`}
              style={{ width: "60px", height: "60px", objectFit: "cover" }}
            />
            <div>
              <h6 className="mb-0 mt-3">{item.name}</h6>
              <p>{item.role}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
