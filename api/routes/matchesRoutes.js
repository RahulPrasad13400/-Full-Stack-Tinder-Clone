import express from 'express'
import { getMatches, swipeLeft, swipeRight } from '../controllers/matchesController.js'
import { protectRoute } from '../middleware/auth.js'

const router = express.Router()

router.post('swipe-right/:likedUserId', protectRoute, swipeRight)
router.post('swipe-left/:dislikedUserId', protectRoute, swipeLeft)

router.get('/', protectRoute, getMatches)
router.get('/user-profiles', protectRoute, getMatches)

export default router