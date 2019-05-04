import { Request } from 'express';
import UserJWT from './userJWT.interface';

export default interface RequestWithuser extends Request {
  user: UserJWT
}