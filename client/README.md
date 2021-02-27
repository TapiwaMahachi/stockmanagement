
# Getting Started with Stock Management App

A basic stock management web application  

users can access and manage stock based on  filtering either to see all the inventory
or to see which ones are running low in stock based on a threshhold or view based on category.

## url
demo of the [stockmanagement app]( https://dry-hamlet-81052.herokuapp.com/)


To start using the application you need to login as admin

``` diff
name: admin
email: admin@gmail.com
password: root1234
```


## How to start the server 

first install the dependencies and then run the server

### Dependencies

to install all the dependencies

``` diff
  npm i
 ```

### running the server
```diff
npm start  
```
### Libraries and frameworks

- Express Node web framework for creating our  custom server to 
Write handlers for requests with different HTTP verbs at different URL paths (routes).
Set settings like the port to use for connecting,and additional request processing "middleware" 

- MongoDb Atlas cloud based  NoSQL database.

- Mongoose a object modeling tool built on top of the MongoDb driver.Allows us to perform all the database
operaions that is ccreating, reading, updating and deleting data from our database. This also allows us to define the schema of our database. 

- bycrpt for hashing the passwords this ensures our passwords are not vulnurable to attacks.
when user login  we compare the loggin password details against our hashed password stored in the database.

- JSON Web Token (JWT) to define a compact and self-contained way for securely transmitting information between parties as a JSON object. The information is digitally signed a hence secure and the information is 
signed inot the access-token that contains the loged in user information that will be accessed via cookies.

- cookie-parser - parse Cookie header and populate req.cookies with an object keyed by the cookie names - this inforamtion is accessed via the token signed by JWT.

- dotenv is a zero-dependency module that loads environment variables from a .env file into process.env this adds
security so our passwords and login details to the mongo db are not exposed.

- @hapi/joi - uses Joi which is an object schema description language and validator for JavaScript objects. Joi allows you to create blueprints or schemas for JavaScript objects to ensure validation of key information. When user inputs information it has to adhere to the schema otherwise it will be invalid and throws error. 


- Pusher to update our data instantly on the frontend if theres any changes without having to refresh the page.
 sits as a real-time layer between your servers and your clients. Pusher maintains persistent connections to the clients 

- react-router-dom - convinient for single page application this avoids page reloading 
 all the time when navigating to different page.
 
- context api -to store the user loged in a particular session in the front end 

## API

Only admin and verified users have access to all the functionalities.
User can only view the inventory 
the base API access for inventory access  is products and for users access is users 

```
Inventory

products/all                        get all the products
products/add                        add a new product
products/product/:id                get product based on id
products/product/update/:id         update product based on id
products/product/delete/:id         delete product based on id

Users

users/all                            get all users
users/add                            add a new user
users/user/:id                       get user based on id
users/user/update/:id                update user based on id
users/user/delete/:id                delete user based on id

```