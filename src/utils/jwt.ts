import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET!

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: '1h' })
}

export const verifyToken = (token: string) => {
  return jwt.verify(token, secret)
}

