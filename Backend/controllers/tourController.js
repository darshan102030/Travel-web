
import Tour from '../models/Tour.js';

// 1. Create a new tour
export const createTour = async (req, res) => {
  try {
    const newTour = new Tour(req.body);
    const savedTour = await newTour.save();
    res.status(201).json({
      success: true,
      message: "Tour created successfully!",
      data: savedTour,
    });
  } catch (err) {
    console.error("Error creating tour:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to create tour. Please try again.",
      error: err.message,
    });
  }
};

// 2. Get all tours with pagination
export const getAllTours = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  
  try {
    const tours = await Tour.find({})
      .populate('reviews')
      .skip((page - 1) * limit)
      .limit(limit);

    const totalTours = await Tour.countDocuments();
    const totalPages = Math.ceil(totalTours / limit);

    res.status(200).json({
      success: true,
      message: "Tours fetched successfully.",
      data: tours,
      pagination: {
        totalTours,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    console.error("Error fetching tours:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tours. Please try again.",
      error: err.message,
    });
  }
};

// 3. Get a single tour by ID
export const getTourById = async (req, res) => {
  const { id } = req.params;
  try {
    // Populate the 'reviews' field so that review details are included
    const tour = await Tour.findById(id).populate('reviews');
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour fetched successfully.",
      data: tour,
    });
  } catch (err) {
    console.error("Error fetching tour:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch tour. Please try again.",
      error: err.message,
    });
  }
};


// 4. Update a tour by ID
export const updateTour = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour updated successfully.",
      data: updatedTour,
    });
  } catch (err) {
    console.error("Error updating tour:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to update tour. Please try again.",
      error: err.message,
    });
  }
};

// 5. Delete a tour by ID
export const deleteTour = async (req, res) => {
  const { id } = req.params;
  
  try {
    const deletedTour = await Tour.findByIdAndDelete(id);
    if (!deletedTour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully.",
      data: deletedTour,
    });
  } catch (err) {
    console.error("Error deleting tour:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete tour. Please try again.",
      error: err.message,
    });
  }
};

// 6. Search for tours by title or city
export const searchTours = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const tours = await Tour.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { city: { $regex: searchQuery, $options: 'i' } },
        { distance: { $regex: searchQuery, $options: 'i' } },
      ],
    }).populate('reviews');;

    res.status(200).json({
      success: true,
      message: "Search results fetched successfully.",
      data: tours,
    });
  } catch (err) {
    console.error("Error searching tours:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to search tours. Please try again.",
      error: err.message,
    });
  }
};

// 7. Get featured tours
export const getFeaturedTours = async (req, res) => {
  try {
    const featuredTours = await Tour.find({ featured: true }).populate('reviews');;

    res.status(200).json({
      success: true,
      message: "Featured tours fetched successfully.",
      data: featuredTours,
    });
  } catch (err) {
    console.error("Error fetching featured tours:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured tours. Please try again.",
      error: err.message,
    });
  }
};

// 8. Count the total number of tours
export const countTours = async (req, res) => {
  try {
    const totalTours = await Tour.countDocuments();
    res.status(200).json({
      success: true,
      message: "Total tours count fetched successfully.",
      count: totalTours,
    });
  } catch (err) {
    console.error("Error fetching total tours count:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to count tours. Please try again.",
      error: err.message,
    });
  }
};
