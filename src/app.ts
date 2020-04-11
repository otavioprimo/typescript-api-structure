import 'reflect-metadata';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import validator from 'express-validator';
import fileUpload from 'express-fileupload';
import dotenv from 'dotenv';

import auth from './middlewares/auth.middleware';
import errorMiddleare from './middlewares/error.middleware';
import routes from './resources/index';

class App {
  // public app: express.Application;
  public app: express.Application;

  constructor() {
    dotenv.config();
    this.app = express();
    this.middleware();
    this.routes();
  }

  private routes(): void {
    this.app.use(routes);
  }

  private middleware(): void {
    this.app.all('/*', (req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'X-Requested-With');
      next();
    });

    /* Middlewares */
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use(validator());
    this.app.use(morgan('dev'));
    this.app.use(fileUpload());
    this.app.use(errorMiddleare);
    this.app.use(auth);
  }
}

export default new App().app;
