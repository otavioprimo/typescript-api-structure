import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as HttpStatus from 'http-status-codes';
import UserJWT from '../resources/auth/interfaces/userJWT.interface';
import userService from '../resources/v1/user/user.service';
import RequestWithuser from '../resources/auth/interfaces/requestWithUser.interface';

async function auth(req: RequestWithuser, res: Response, next: NextFunction) {
  const secret = process.env.JWT_SECRET;
  let token = req.headers['authorization'];

  if (token) {
    const jwtResponse = jwt.verify(token, secret) as UserJWT;
    try {
      const email = jwtResponse.email;
      const user = await userService.findByEmail(email);
      if (user) {
        req.user = user
        next();
      }
      else {
        return res.status(HttpStatus.UNAUTHORIZED).json({ error: true, mensagem: "Invalid Token" });
      }
    } catch (err) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: true, mensagem: "Invalid Token" });
    }
  } else {
    req.user = undefined;
    next();
  }
}

export default auth;