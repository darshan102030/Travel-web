
import express from 'express';
import {
  createTour,
  getAllTours,
  getTourById,
  updateTour,
  deleteTour,
  searchTours,
  getFeaturedTours,
  countTours
} from '../controllers/tourController.js';
import { verifyAdmin } from '../utils/verifyToken.js';


const router = express.Router();

//get tour by search
router.get('/search', searchTours);
router.get('/count', countTours);
router.get('/featured', getFeaturedTours);

//crud operation
router.get('/', getAllTours);

router.get('/:id', getTourById);

router.post('/',verifyAdmin,  createTour);

router.put('/:id',verifyAdmin,  updateTour);

router.delete('/:id',verifyAdmin,  deleteTour);


export default router;
