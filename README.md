
## Stock Management App

A basic stock management web application  

This is a small admin page that the owner can use to add new item and add users. 
To update and delete items or users you click on the item or user you want to update or delete.
You can filter inventory based on category, supplier and view items running low in stock.

### url
Demo of the application -> [stockmanagement app](https://pure-basin-41999.herokuapp.com/)


To start using the application login as admin with the details below

``` diff
name: admin
email: admin@gmail.com
password: root1234
```


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
### Libraries and frameworks

- Express.js - a Node web framework for creating a custom server.
allows to write handlers for requests with different HTTP verbs at different URL paths (routes).
allows  to set settings like the port to use for connecting, additional request processing "middleware"
and paths for our postbuild when in production. 

- MongoDb Atlas cloud based  NoSQL database.

- Mongoose a object modeling tool built on top of the MongoDb driver.Allows us to perform all the database
operaions, that is creating, reading, updating and deleting data from our database and to define the schema of our database. 

- JSON Web Token (JWT) to define a compact and self-contained way for securely transmitting information between parties as a JSON object. The information is digitally signed  hence secure and the information is 
signed into the access-token that contains the logged in user information that will be accessed via cookies.

- bycrpt for hashing the passwords, this ensures our passwords are secure.
When user login  we compare the loggin password details against our hashed password stored in the database.

- cookie-parser - parse Cookie header and populate req.cookies with an object keyed by the cookie names - our JWT token

- dotenv  a zero-dependency module that loads environment variables from a .env file into process.env this adds
security to our passwords and login details for the Mongodb.

- @hapi/joi - uses Joi which is an object schema description language and validator for JavaScript objects. Joi allows us to create blueprints or schemas for JavaScript objects to ensure validation of key information. When user inputs information it has to adhere to the schema otherwise it will be invalid and throws error. 


- Pusher to update our data in realtime  without refreshing the page. It sits as a real-time layer between our server and frontend and maintains persistent connection between the server and the frontend. 

- react-router-dom - convinient for single page application this avoids page reloading when navigating between different pages.

- context api -for storing the logged in user in our frontend application 

### API

Only admin and verified users have access. This adds a security layer to our API routes by using the JWT to verify users and store the token for 24hours only.
Used bcrypt to make sure passwords are hashed.

### Show users

Returns json data about all users.

#### URL

- /users/all

#### Method:

- GET

#### URL Params

- None

#### Data Params

- User Details

### Login User

Returns json data about a single user.

#### URL

- /users/login

#### Method:

- POST

#### URL Params

- None

#### Data Params

- User Details

### User Update
Returns json data about a single user.

#### URL

- /users/user/update/:id

#### Method:

- PUT

#### URL Params

Required:

- id=[string]

#### Data Params

- User Details

### User Delete
Removes a single user from the database.

#### URL

- /users/user/delete/:id

#### Method:

- DELETE

#### URL Params

Required:

- id=[string]

#### Data Params

- None

### User Create
Returns json data about a single user.

#### URL

- /users/register

#### Method:

- POST

#### URL Params

- None

#### Data Params

- User Details

### Get User 
Returns json data about a single user.

#### URL

- /users/user/:id

#### Method:

- GET

#### URL Params

Required:

- id=[string]

#### Data Params

- User Detail


### Show Products

Returns json data about all products.

#### URL

- /products/all

#### Method:

- GET

#### URL Params

- None

#### Data Params

- Product details


### Product Update
Returns json data about a single product.

#### URL

- /products/product/update/:id

#### Method:

- PUT

#### URL Params

Required:

- id=[string]

#### Data Params

- Product details

### Product Delete
Removes a single product from the database.

#### URL

- /products/product/delete/:id

#### Method:

- DELETE

#### URL Params

Required:

- id=[string]

#### Data Params

- None

### Product Create
Returns json data about a single product.

#### URL

- /products/add

#### Method:

- POST

#### URL Params

- None

#### Data Params

- Product details

### Get Product 
Returns json data about a single product.

#### URL

- /products/product/:id

#### Method:

- GET

#### URL Params

Required:

- id=[string]

#### Data Params

- Product details




### deployed 

Application is deployed on Heroku

- Heroku automatically builds the application and creates a new release.
- simple to add  any Git-based workflow

I used the heroku CLI to deploy the app by pushing it to heroku Git remotes. I deployed the app by pushing its code to a special Heroku-hosted remote that’s associated with my app.
Theres a script in my main package.json file called heroku-postbuild - that will build both the backend and frontend on heroku.

#### how 
- used the **heroku create** CLI command which creates a new empty application on Heroku
- then add a remote to my local repository with the **heroku git:remote** command
- to deploy and run build used the **git push heroku main** command to build the application.
