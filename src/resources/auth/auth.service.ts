import * as jwt from 'jsonwebtoken';
import HttpStatus from 'http-status-codes';
import Token from './interfaces/token.interface';
import UserJWT from './interfaces/userJWT.interface';

class AuthService {
  public createToken(email: string): Token {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const user: UserJWT = {
      email,
    };
    return {
      expiresIn,
      token: jwt.sign(user, secret, { expiresIn }),
    };
  }

  public verify(req, res, next): void {
    if (!req.user) {
      res
        .status(HttpStatus.UNAUTHORIZED)
        .send({ error: true, message: 'Invalid Token' });
    } else {
      next();
    }
  }
}

export default new AuthService();
