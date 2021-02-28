
## Stock Management App

A basic stock management web application  

users can access and manage stock based on filtering  to see all inventory
or to see which ones are running low in stock based on a threshhold or view based on category.

### url
Demo of the [stockmanagement app](https://pure-basin-41999.herokuapp.com/)


To start using the application you need to login as admin

``` diff
name: admin
email: admin@gmail.com
password: root1234
```


### How to start the server 

install dependencies and  run the server

### Dependencies

to install dependencies - in the root directory and   client sub-directory.

``` diff
  npm i
 ```

### running the server 
in the root directory to start the server and navigate to client subdirectory to start the frontend

```diff
npm start  
```
You can run concurrently run both the server and the frontend by using the following in the root directory.

```diff
 npm run dev
 ```
### Libraries and frameworks

- Express - a Node web framework for creating our custom server to 
Write handlers for requests with different HTTP verbs at different URL paths (routes).
Allows us to set settings like the port to use for connecting, additional request processing "middleware"
and paths for our postbuild when in production. 

- MongoDb Atlas cloud based  NoSQL database.

- Mongoose a object modeling tool built on top of the MongoDb driver.Allows us to perform all the database
operaions, that is creating, reading, updating and deleting data from our database and to define the schema of our database. 

- bycrpt for hashing the passwords, this ensures our passwords are not vulnerable to attacks.
when user login  we compare the loggin password details against our hashed password stored in the database.

- JSON Web Token (JWT) to define a compact and self-contained way for securely transmitting information between parties as a JSON object. The information is digitally signed  hence secure and the information is 
signed into the access-token that contains the logged in user information that will be accessed via cookies.

- cookie-parser - parse Cookie header and populate req.cookies with an object keyed by the cookie names

- dotenv is a zero-dependency module that loads environment variables from a .env file into process.env this adds
security so our passwords and login details for the Mongodb.

- @hapi/joi - uses Joi which is an object schema description language and validator for JavaScript objects. Joi allows us to create blueprints or schemas for JavaScript objects to ensure validation of key information. When user inputs information it has to adhere to the schema otherwise it will be invalid and throws error. 


- Pusher to update our data in realtime  without refreshing the page. It sits as a real-time layer between our server and frontend and maintains persistent connection between the server and the frontend. 

- react-router-dom - convinient for single page application this avoids page reloading when navigating to different pages.

- context api -to store the user logged in a particular session in our frontend application 

### API

Only admin and verified users have access. This adds a security layer to our API routes by using the JWT to verify users.
User can only view the inventory 
the base API access for inventory access is products/ and for users/ access is users 

```
Inventory

products/all                        get all the products
products/add                        add a new product
products/product/:id                get product based on id
products/product/update/:id         update product based on id
products/product/delete/:id         delete product based on id

Users

users/all                            get all users
users/register                       add a new user
users/login                          loggin for user
users/user/:id                       get user based on id
users/user/update/:id                update user based on id
users/user/delete/:id                delete user based on id

```

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