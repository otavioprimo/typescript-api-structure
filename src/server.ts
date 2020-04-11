import * as http from 'http';
import app from './app';

class Server {
  server: http.Server;

  private port: number = Number(process.env.PORT) || 3000;

  public start(): Promise<void> {
    return new Promise((resolve) => {
      this.server = http.createServer(app);

      this.server.listen(this.port, () => resolve());
    });
  }

  public stop(): Promise<void> {
    return new Promise((resolve) => {
      this.server.close();
      resolve();
    });
  }
}

const exportServer = new Server();
exportServer.start();
export default exportServer;
