 # Deloitte Eshop Web Application

## Summary
This project simulates a real-world eshop platform with full stack architecture, secure authentication, and responsive design. It demonstrates modern web development by using React for frontend and Spring Boot for backend services.

## How to run (Tested in Visual Studio Code)
- Go to Application.java in backend and Run Java
- Backoffice
```bash
cd eshop-backoffice
npm run dev
```
-Frontend
```bash
cd frontend
npm run dev
```

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

## Important
- The first admin user is seeded to the code, the credentials show up in the console. If they don't show up they are  admin@eshop.com / P@ssword! ( I know this is not the most secure way to handle it).

## Product Cart Discount Codes
- SUMMER10
- HOLIDAY15
- ESHOP20

## Problems and Issues
Here are the things I didn't get to do in time.
- Wishlist -> Cart
- Re order a previous ordered item.
- Create and Upate action errors, although implemented they are showing errors in the back office.
- Order updates (Attempted but didn't have enough time)
- Product Increse Decrease Quantity in Cart ( forgot about it)
- Users and Orders in Backoffice
