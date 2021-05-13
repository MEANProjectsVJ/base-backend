import jwt from "jsonwebtoken";

export function signToken(idUser: string, secret: string) {
  return jwt.sign({ id: idUser }, secret, { expiresIn: 60 * 60 * 24 });
}