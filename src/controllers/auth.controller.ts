import { NextFunction, Request, Response } from 'express'
import bcrypt from 'bcrypt'
import prisma from '../prisma/client'
import { generateToken } from '../utils/jwt'
import { AuthRequest } from '../middlewares/verifyToken'

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })

    const token = generateToken(user.id)
    res.status(201).json({ 
        message: 'Signup successful',
        token })
  } catch (error) {
    next(error)
  }
}


export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = generateToken(user.id)
    res.status(200).json({ 
        message: 'Login successful',
        token })
  } catch (error) {
    next(error)
  }
}


export const getCurrentUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: { id: true, name: true, email: true,},
    })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}





