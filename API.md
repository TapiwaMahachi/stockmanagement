
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


