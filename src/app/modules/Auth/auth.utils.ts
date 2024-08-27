import jwt, { JwtPayload } from 'jsonwebtoken'

export const createToken = (
  jwtPayload: { username: string; password: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  })
}
export const varifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret as string) as JwtPayload
}
