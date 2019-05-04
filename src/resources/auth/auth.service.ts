import Token from "./interfaces/token.interface";;
import * as jwt from 'jsonwebtoken';
import UserJWT from "./interfaces/userJWT.interface";
import * as HttpStatus from 'http-status-codes';

class AuthService {
  public createToken(email: string): Token {
    const expiresIn = 60 * 60;
    const secret = process.env.JWT_SECRET;
    const _user: UserJWT = {
      email: email
    };
    return {
      expiresIn,
      token: jwt.sign(_user, secret, { expiresIn })
    }
  }

  public verify(req, res, next) {
    if (!req['user'])
      res.status(HttpStatus.UNAUTHORIZED).send({ error: true, message: 'Invalid Token' });
    else
      next();
  }
}

export default new AuthService();