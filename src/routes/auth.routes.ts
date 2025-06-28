import express from 'express'
import { signup, login, getCurrentUser } from '../controllers/auth.controller'
import { validateSignup, validateLogin } from '../middlewares/validateInput'
import { verifyToken } from '../middlewares/verifyToken'

const router = express.Router()

const asyncHandler = (fn: express.RequestHandler) =>
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
	Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post('/signup', validateSignup, asyncHandler(signup))
router.post('/login', validateLogin, asyncHandler(login))
router.get('/me', verifyToken, asyncHandler(getCurrentUser))

export default router
