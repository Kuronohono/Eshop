 # Deloitte Eshop Web Application

 ## Key Technologies
 - React Js frontend development.
 - Tailwindcss for styling.
 - Spring Boot backend development.
 - Spring Security for user authentication and encryption.
 - H2 database for storing data.

## Features
### User Related
1) User Authentication: Register, Login and Logout Functionalities.
2) Password Encryption.
3) Email and username change availability.
4) Wishlist
5) Ordering Products
6) Checking Order Status

### Admin Related
1) Quick Actions for CRUD actions.
2) Strict Authentication and Security
3) Full access to all the entitites and fields in the Database.

###
   
## Key Folders

### Frontend
The frontend was created with the use of React js and Tailwind. Here is where the client/user has accesss and navigates through the appliication. It can be accessed by non-verified users ( Guests ) for navigation only and by authenticated users that have access to all of its Features. Admins are NOT authorized to access the User Features with their credentials.


### Backend
The Backend is responsible for most of the heavylifting. 

#### Database 
It is in charge of creating and handling the databaase, its entities, services, repositories and controllers. There are also some config classes that parse json files in order to load objects into the database.

#### Authentication
Furthermore, it also handles all authentication actions. Including JWT Service, Security Configurations, Token Generation, Authentication credentials check, sending emails, hashing fields, such as passwords and more.
