 # Deloitte Eshop Web Application

## Summary
This project simulates a real-world eshop platform with full stack architecture, secure authentication, and responsive design. It demonstrates modern web development by using React for frontend and Spring Boot for backend services.

 ## Key Technologies

### Frontend
- React.js (UI development)
- Tailwind CSS (styling)
- React Router (navigation)

### Backend
- Spring Boot (REST API development)
- Spring Security (authentication & authorization)
- JWT (secure token-based authentication)
- -Hibernate / JPA (ORM)

### Database
- H2 Database (development storage)

## Features
### User Features
1) User Authentication: Register, Login and Logout Functionalities.
2) Password Encryption.
3) Email and username change availability.
4) Wishlist
5) Ordering Products
6) Checking Order Status

### Admin Features
1) Quick Actions for CRUD actions.
2) Strict Authentication and Security
3) Full access to all the entitites and fields in the Database.
   
## Project Structure

### Frontend
The frontend was created with the use of React js and Tailwind. Here is where the client/user has accesss and navigates through the appliication. It can be accessed by non-verified users ( Guests ) for navigation only and by authenticated users that have access to all of its Features. Admins are NOT authorized to access the User Features with their credentials.

#### Main responsibilities
- User interface and navigation
- Product browsing and filtering
- Cart and wishlist management
- Checkout flow
- API integration
- Protected routes (user/admin separation)

### Backend
The Backend is responsible for most of the heavylifting. 

#### Core responsibilities
- REST API endpoints
- Authentication & authorization (Spring Security + JWT)
- Password encryption and user security
- Order processing and tracking
- Product and user management
- Database initialization and configuration
- JSON-based data seeding (for initial data setup)

### Authentication System
The core principles and methods of the authentication system.
- JWT-based authentication
- Secure login/register flow
- Role-based access control (USER / ADMIN)
- Password hashing using BCrypt
- Protected API endpoints using Spring Security filters

### Database 
It is in charge of creating and handling the databaase, its entities, services, repositories and controllers. There are also some config classes that parse json files in order to load objects into the database.

- H2 in-memory database used for development
- JPA entities manage relational structure
- Repositories handle data access layer
- Services encapsulate business logic

## Future Improvements 
- Integration with a persistent database (PostgreSQL / MySQL)
- Payment gateway integration (Stripe / PayPal)
- Order invoice generation (PDF)
- Performance optimization & caching
