import React, { useState, useContext } from 'react';
import './booking.css';
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { BASE_URL } from '../../utils/config';
import { AuthContext } from './../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Booking = ({ tour, avgRating }) => { 
    const { price, reviews, title } = tour;
    const { user } = useContext(AuthContext); // Get user from context
    const navigate = useNavigate();

    const [booking, setBooking] = useState({ 
        userId: user?._id || '', // Dynamic assignment
        userEmail: user?.email || '',
        tourName: title,
        fullName: '',
        phone: '', 
        guestSize: 1, 
        bookAt: '' 
    });

    const handleChange = (e) => {
        setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const serviceCharge = 10;
    const totalCharge = Number(price) * Number(booking.guestSize) + Number(serviceCharge);

    const handleClick = async (e) => {
        e.preventDefault();

        if (!user) { 
            return alert("Please sign in to book a tour."); 
        } 

        try { 
            const res = await fetch(`${BASE_URL}/booking`, { 
                method: "POST", 
                headers: { "Content-Type": "application/json" }, 
                credentials: "include", 
                body: JSON.stringify(booking), 
            }); 

            const result = await res.json();  

            if (!res.ok) { 
                return alert(result.message); 
            } 

            navigate("/thank-you"); 
        } catch (err) { 
            alert(err.message);
        }
    };    

    return (
        <div className="booking"> 
            <div className="booking_top d-flex align-items-center justify-content-between"> 
                <h3>${price} <span>/per person</span></h3>
                <span className='tour_rating d-flex align-items-center'>
                    <i className="ri-star-s-fill"></i>{avgRating === 0 ? null : avgRating} ({reviews?.length})
                </span> 
            </div> 

            <div className="booking_form"> 
                <h5>Information</h5> 
                <Form className="booking_info-form" onSubmit={handleClick}> 
                    <FormGroup> 
                        <input type="text" placeholder="Full Name" id="fullName" required onChange={handleChange} />
                    </FormGroup>

                    <FormGroup> 
                        <input type="number" placeholder="Phone" id="phone" required onChange={handleChange} />
                    </FormGroup>

                    <FormGroup className="d-flex align-items-center gap-3"> 
                        <input type="date" id="bookAt" required onChange={handleChange} />
                        <input type="number" placeholder="Guest" id="guestSize" min="1" required onChange={handleChange} />
                    </FormGroup> 
                </Form>         
            </div> 

            <div className="booking_bottom"> 
                <ListGroup> 
                    <ListGroupItem className="border-0 px-0">  
                        <h5>${price} <i className="ri-close-line"></i> for 1 person</h5> 
                        <span>${price}</span> 
                    </ListGroupItem> 

                    <ListGroupItem className="border-0 px-0">   
                        <h5>Service Charges</h5> 
                        <span>${serviceCharge}</span> 
                    </ListGroupItem>

                    <ListGroupItem className="border-0 px-0">   
                        <h5>Total</h5> 
                        <span>${totalCharge}</span> 
                    </ListGroupItem>

                    <Button className="btn primary_btn w-100 mt-4" onClick={handleClick}>Book Now</Button>
                </ListGroup> 
            </div>
        </div> 
    );  
};

export default Booking;
