import { Request, Response } from 'express';
import authService from '../../auth/auth.service';
import { ValidateBody, ValidateQuery, AuthGuard } from '../../../middlewares/decorators.middleware';
import LoginDto from './dto/login.dto';
import TestQuery from './dto/testQuery.dto';

class UserController {
  constructor () { }

  /**
   * @param req Request
   * @param res Response
   * @description Login
   * @validator LoginDto
   * @returns {error:boolean, token:string, refreshToken: string} HttpStatus 200
   * @returns {error:boolean, message: string} HttpStatus 401
   */
  @ValidateBody(LoginDto)
  public login(req: Request, res: Response) {
    let { email, password } = req.body;

    if (email == 'otavioprimo@gmail.com' && password == '123456') {
      let token = authService.createToken(email);
      let response = {
        error: false,
        token,
        refreshToken: 'o2k3o1iojm2do2jdopjdpo2jipdjlsçak'
      }

      return res.send(response);
    } else {
      let response = {
        error: true,
        message: 'Invalid Credentials'
      }

      return res.status(401).send(response);
    }
  }
  @AuthGuard()
  @ValidateBody(LoginDto)
  // @ValidateParam(TestParamDto)
  @ValidateQuery(TestQuery)
  test(req: Request, res: Response) {
    return res.send({ ok: true });
  }
}

export default new UserController();