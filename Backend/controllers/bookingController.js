
import booking from "../models/booking.js"


//create new booking
export const createBooking = async (req, res)=> { 
    const newBooking = new booking(req.body); 
    try { 
    const savedBooking = await newBooking.save(); 
    res 
    .status(200) 
    .json({ 
    success: true, 
    message: "Your tour is booked", 
    data: savedBooking, 
    }); 
    } catch (err) { 
    res.status(500).json({ success: false, message: "internal server error",error: err.message  })
    }
};

// get single booking
export const getBooking = async (req, res)=> { 
   
    const id = req.params.id; 
    try { 
    const book = await booking.findById(id); 

    res.status(200).json({ 
    success: true,
     message: "successful", 
    data: book, 
    }); 
    } catch (err) { 
      res.status(404).json({ success: false, message: "not found", error: err.message }); 
    } 
};

//get all booking
export const getAllBooking = async (req, res)=> { 
   
    try { 
    const books = await booking.find(); 

    res.status(200).json({ 
    success: true,
     message: "successful", 
    data: books, 
    }); 
    } catch (err) { 
      res.status(500).json({ success: false, message: "internal server error", error: err.message }); 
    } 
};
