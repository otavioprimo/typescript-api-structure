## Typescript Demo API

- ### Development
  - Build images ``docker-compose build``
  - run `` docker-compose up ``
- ### Production
  - Build the project ``npm run build``
  - Upload the ***dist*** folder

#### Project Structure
- src
    - middlewares *Custom Middlewares for express*
        - ``decorators.middleware`` *Here Stay all Decorator*
    - models *MongoDB models*
    - resources
        - ``index.ts`` *Wrapper for all routes*
        - feature
            - ``dto`` *Data Access Object, used to validate request body,params,query*
            - ``controllers`` *Business Layer*
            - ``routes`` *All routes from this feature*
            - ``services`` *Database Layer*
    - util
    - ``app.ts`` *Setup Express App*
    - ``server.ts`` *Setup the server*
    - ``.env`` *Enviroment Variables*
    - ``gulpfile.js`` *Typescript compile with Gulp Task*
    - ``package.json``
