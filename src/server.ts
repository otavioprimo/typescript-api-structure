import * as cluster from 'cluster';
import * as http from 'http';
import * as dotenv from 'dotenv';
import app from './app';
import { resolve } from 'path';

class Server {
  server: http.Server;
  private port: number = Number(process.env.PORT) || 3000;

  constructor () {
  }

  start() {
    return new Promise((resolve, reject) => {
      if (cluster.isMaster) {
        const numCPUs = require('os').cpus().length;

        for (let i = 0; i < numCPUs; i += 1) {
          cluster.fork();
        }

        cluster.on('online', function (worker) {
          console.log('Worker ' + worker.process.pid + ' is online');
        });

        cluster.on('exit', function (worker, code, signal) {
          console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
          console.log('Starting a new worker');
          cluster.fork();
        });
      } else {
        this.server = http.createServer(app);
        dotenv.config();

        this.server.listen(this.port, () => {
          console.log(`Listening on port ${this.port} with process ${process.pid}`);
          resolve();
        });
      }
    });
  }

  stop() {
    return new Promise((reolve, reject) => {
      this.server.close();
      resolve();
    });
  }
}

let exportServer = new Server();
exportServer.start();
export default exportServer;