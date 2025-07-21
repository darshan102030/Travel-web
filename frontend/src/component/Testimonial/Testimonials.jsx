import React from "react";
import Slider from "react-slick";
import ava01 from "../../assets/images/ava-1.jpg";
import ava02 from "../../assets/images/ava-2.jpg";
import ava03 from "../../assets/images/ava-3.jpg";

const testimonialsData = [
  {
    img: ava01,
    name: "John Doe",
    role: "Customer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus sit, explicabo provident hic distinctio molestias voluptates nobis alias placeat suscipit earum debitis recusandae voluptate illum expedita corrupti aliquid doloribus delectus?"
  },
  {
    img: ava02,
    name: "Jane Smith",
    role: "Customer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, nostrum? Veniam fugit adipisci labore soluta, maiores culpa deserunt consequatur? Totam."
  },
  {
    img: ava03,
    name: "Alex Johnson",
    role: "Customer",
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quia esse quisquam minima animi, id aliquid voluptatibus natus accusantium non."
  },
  {
    img: ava01,
    name: "Emily Wilson",
    role: "Customer",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus explicabo, vero ad error quas architecto distinctio fugiat."
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
              className="w-25 h-25 rounded-2"
              alt={`testimonial-${item.name}`}
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
