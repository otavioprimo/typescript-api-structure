import 'reflect-metadata';
import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { BAD_REQUEST } from 'http-status';

function AuthGuard() {
  return function (target: Record<string, any>, key: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const secret = process.env.JWT_SECRET;

      const res: Response = args[0].res;
      const req: Request = args[1].req;

      if (!req.user) {return res.status(HttpStatus.UNAUTHORIZED).send({ error: true, message: 'Invalid Token' });}

      const result = original.apply(this, args);
      return result;
    };

    return descriptor;
  }
}

/**
 *
 * @param type any
 * @description Validate Request Body
 * @returns HttStatus 500 If Invalid Body
 */
function ValidateBody(type: any) {
  return function (target: Record<string, any>, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
    const method = propertyDesciptor.value;

    propertyDesciptor.value = function (...args: any[]) {
      const { req } = args[1];
      const { res } = args[0];

      validate(plainToClass(type, req.body))
        .then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            const msg = errors.map((error: ValidationError) => Object.values(error.constraints));
            const response = {
              type: 'body',
              message: msg,
            }
            return res.status(BAD_REQUEST).send(response);
          }
          const result = method.apply(this, args);
          return result;
        })
    }
    return propertyDesciptor;
  }
}


/**
 *
 * @param type any
 * @description Validate Request Params
 * @returns HttStatus 500 If Invalid Params
 */
function ValidateParam(type: any) {
  return function (target: Record<string, any>, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
    const method = propertyDesciptor.value;

    propertyDesciptor.value = function (...args: any[]) {
      const { req } = args[1];
      const { res } = args[0];

      validate(plainToClass(type, req.params))
        .then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            const msg = errors.map((error: ValidationError) => Object.values(error.constraints));
            return res.status(BAD_REQUEST).send(msg);
          }
          const result = method.apply(this, args);
          return result;
        });
    }
    return propertyDesciptor;
  }
}


/**
 *
 * @param type any
 * @description Validate Request Query
 * @returns HttStatus 500 If Invalid Query
 */
function ValidateQuery(type: any) {
  return function (target: Record<string, any>, propertyName: string, propertyDesciptor: PropertyDescriptor): PropertyDescriptor {
    const method = propertyDesciptor.value;

    propertyDesciptor.value = function (...args: any[]) {
      const { req } = args[1];
      const { res } = args[0];

      validate(plainToClass(type, req.query))
        .then((errors: ValidationError[]) => {
          if (errors.length > 0) {
            const msg = errors.map((error: ValidationError) => Object.values(error.constraints));
            return res.status(BAD_REQUEST).send(msg);
          }
          const result = method.apply(this, args);
          return result;
        });
    }
    return propertyDesciptor;
  }
}

export {
  AuthGuard, ValidateBody, ValidateParam, ValidateQuery,
};
