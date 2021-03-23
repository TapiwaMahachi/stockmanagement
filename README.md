
## Admin web-app

A basic stock management web application  


### url
Live demo [stock-management-app](https://pure-basin-41999.herokuapp.com/)


To start using the application login as admin with the details below

``` diff
name: admin
email: admin@gmail.com
password: root1234
```
### Libraries and frameworks

 - ES2017 latest features like Async/Await
 - CORS enabled 
 - Custom server with [Express.js](https://expressjs.com/)
 - NoSQL database [MongoDb](https://www.mongodb.com/) atlas
 - Uses [Mongoose](https://mongoosejs.com/docs/) an Object Data Modeling tool built on top of the MongoDb driver.
 - Implemented mordern authentication wth [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (JWT) to define a compact and self-contained way for securely transmitting information between parties as a JSON object.
 - Uses [bycrpt](https://www.npmjs.com/package/bcryptjs) to hash paswords
 - Uses [helmet](https://github.com/helmetjs/helmet) to set some HTTP headers for security
 - Load environment variables from .env files with [dotenv](https://github.com/motdotla/dotenv)
 - Request validation with [joi](https://github.com/hapijs/joi)
 - Gzip compression with [compression](https://github.com/expressjs/compression)
 - Update data in realtime with [Pusher](https://pusher.com/) 
 - Implemented client-side routing with [React-Router](https://reactrouter.com/web/guides/quick-start) to maintain the seamless UX that a typical single page application promises
 - Handle state management with [React](https://reactjs.org/) hooks with an emphasis on clean, comprehensive and declarative codebase.
 - Material based UI  with [Material-ui](https://material-ui.com/)
 - Utilized [Recharts](https://recharts.org/en-US/api) for a rich UX to display data.
 - API documentation generation with [apidoc](http://apidocjs.com)


### Deployed 

 on [Heroku](https://www.heroku.com/)


### starting the server when you clone the app

install dependencies and  run the server

### Dependencies

to install dependencies - in the root directory and  client sub-directory.

``` diff
  npm i
 ```

### running the server 
in the root directory (server) and  client subdirectory (frontend)

```diff
npm start  
```
You can run concurrently both the server and the frontend   use the following in the root directory.

```diff
 npm run dev
 ```


