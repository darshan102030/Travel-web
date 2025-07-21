import React from 'react';
import TourCard from '../shared/TourCard';
import { Col } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';

// Static featured tours data
const featuredTours = [
  {
    _id: '1',
    title: 'Santorini, Greece',
    city: 'Santorini',
    photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    price: 120,
    featured: true,
    reviews: [
      { rating: 5, comment: 'Amazing!' },
      { rating: 4, comment: 'Beautiful place.' }
    ]
  },
  {
    _id: '2',
    title: 'Westminster Bridge',
    city: 'London',
    photo: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    price: 99,
    featured: true,
    reviews: [
      { rating: 4, comment: 'Nice view.' }
    ]
  },
  {
    _id: '3',
    title: 'Bali, Indonesia',
    city: 'Bali',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
    price: 110,
    featured: true,
    reviews: [
      { rating: 5, comment: 'Paradise!' }
    ]
  },
  {
    _id: '4',
    title: 'Snowy Mountains',
    city: 'Switzerland',
    photo: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    price: 150,
    featured: true,
    reviews: [
      { rating: 5, comment: 'Breathtaking!' }
    ]
  },
  {
    _id: '5',
    title: 'Cherry Blossoms Spring',
    city: 'Tokyo',
    photo: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    price: 130,
    featured: true,
    reviews: [
      { rating: 4, comment: 'So pretty!' }
    ]
  },
  {
    _id: '6',
    title: 'Holmen Lofoten',
    city: 'Norway',
    photo: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    price: 140,
    featured: true,
    reviews: [
      { rating: 5, comment: 'Unique experience.' }
    ]
  }
];

const FeaturedTourList = ({ useBackend = false }) => {
  // Fetch from backend if useBackend is true
  const { data, loading, error } = useFetch(`${BASE_URL}/tours/featured`);
  const tours = useBackend ? data : featuredTours;

  return (
    <>
      {useBackend && loading && <h4>Loading...</h4>}
      {useBackend && error && <h4 className="text-danger">{error}</h4>}
      {tours && tours.map((tour) => (
        <Col
          lg="3"
          md="6"
          sm="6"
          className="mb-4"
          key={tour._id}
        >
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
