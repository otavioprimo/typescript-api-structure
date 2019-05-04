import "reflect-metadata";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as validator from 'express-validator';
import * as fileUpload from 'express-fileupload';
import auth from './middlewares/auth.middleware';
import errorMiddleare from './middlewares/error.middleware';
import routes from './resources/index';

class App {
  public app: express.Application;

  constructor () {
    this.app = express();
    this.middleware();
    this.routes();
  }

  routes() {
    this.app.use(routes);
  }
  middleware() {
    this.app.all('/*', (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
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