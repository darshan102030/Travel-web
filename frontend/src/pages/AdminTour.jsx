import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/config';
import '../styles/admin-tour.css';
import { AuthContext } from '../component/context/AuthContext';

const AdminTour = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [tourData, setTourData] = useState({
    title: '',
    city: '',
    address: '',
    distance: 0,
    price: 0,
    maxGroupSize: 1,
    desc: '',
    photo: '',
    featured: false
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setTourData(prev => ({ ...prev, [e.target.id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      const requiredFields = ['title', 'city', 'address', 'desc'];
      for (const field of requiredFields) {
        if (!tourData[field]?.trim()) {
          alert(`Please fill in the ${field} field`);
          return;
        }
      }

      // Validate numeric fields
      if (tourData.distance <= 0) {
        alert('Distance must be greater than 0');
        return;
      }
      if (tourData.price <= 0) {
        alert('Price must be greater than 0');
        return;
      }
      if (tourData.maxGroupSize < 1) {
        alert('Max group size must be at least 1');
        return;
      }

      const response = await axios.post(
        `${BASE_URL}/admin/tours`,
        {
          ...tourData,
          price: Number(tourData.price),
          distance: Number(tourData.distance),
          maxGroupSize: Number(tourData.maxGroupSize)
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.data.success) {
        alert(response.data.message || 'Failed to create tour');
        return;
      }

      alert('Tour created successfully!');
      navigate('/tours');
    } catch (err) {
      console.error('Error creating tour:', err);
      alert(err.message || 'Failed to create tour. Please try again.');
    }
  };

  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return <div>Access Denied. Admin only.</div>;
  }

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="add_tour_container">
              <h2>Add New Tour</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <input 
                    type="text" 
                    placeholder="Tour Title" 
                    required 
                    id="title" 
                    value={tourData.title}
                    onChange={handleChange} 
                  />
                </FormGroup>
                <FormGroup>
                  <input 
                    type="text" 
                    placeholder="City" 
                    required 
                    id="city"
                    value={tourData.city}
                    onChange={handleChange} 
                  />
                </FormGroup>
                <FormGroup>
                  <input 
                    type="text" 
                    placeholder="Address" 
                    required 
                    id="address"
                    value={tourData.address}
                    onChange={handleChange} 
                  />
                </FormGroup>
                <FormGroup>
                  <input 
                    type="number" 
                    placeholder="Distance (km)" 
                    required 
                    id="distance"
                    value={tourData.distance}
                    onChange={handleChange} 
                  />
                </FormGroup>
                <FormGroup>
                  <input 
                    type="number" 
                    placeholder="Price" 
                    required 
                    id="price"
                    value={tourData.price}
                    onChange={handleChange} 
                  />
                </FormGroup>
                <FormGroup>
                  <input 
                    type="number" 
                    placeholder="Max Group Size" 
                    required 
                    id="maxGroupSize"
                    value={tourData.maxGroupSize}
                    onChange={handleChange} 
                  />
                </FormGroup>
                <FormGroup>
                  <textarea 
                    rows="5"
                    placeholder="Description" 
                    required 
                    id="desc"
                    value={tourData.desc}
                    onChange={handleChange} 
                  />
                </FormGroup>
                <FormGroup>
                  <input 
                    type="text" 
                    placeholder="Photo URL" 
                    required 
                    id="photo"
                    value={tourData.photo}
                    onChange={handleChange} 
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    <input 
                      type="checkbox" 
                      id="featured"
                      checked={tourData.featured}
                      onChange={handleChange} 
                    /> Featured Tour
                  </label>
                </FormGroup>
                <Button type="submit" className="btn secondary_btn">Add Tour</Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdminTour;
