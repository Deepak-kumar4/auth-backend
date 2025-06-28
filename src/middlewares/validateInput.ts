import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

const signupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export function validateSignup(req: Request, res: Response, next: NextFunction) {
  try {
    signupSchema.parse(req.body)
    next()
  } catch (error) {
    res.status(400).json({ error: 'Invalid signup data' })
  }
}

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    loginSchema.parse(req.body)
    next()
  } catch (error) {
    res.status(400).json({ error: 'Invalid login data' })
  }
}


