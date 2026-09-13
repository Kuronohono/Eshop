# Deloitte E-Commerce Web Application

A full-stack e-commerce platform built with React and Spring Boot, featuring secure JWT based authentication, role based access control, product catalogue management and a complete checkout flow.
Built as a collaboration between International Hellenic University(IHU) and Deloitte.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Features](#features)
- [Project Structure](#project-structure)
- [Known Limitations](#known-limitations)


## Overview
This project simulates a production style e-commerce platform that covers browsing, filtering, cart, checkout, order history and wish list. Alongside a separate backoffice application for admin operations such as product, category, order and user management.

## Tech Stack

### Frontend
- React.js - UI development
- Tailwind CSS - Dynamic Styling
- React Router - Navigation
- Context API - State Management

### Backend
- Spring Boot - REST API development
- Spring Security - Authentication & Authorization
- JWT - Token based authentication
- Hibernate/JPA-ORM

### Database
- H2 (in memory, development)

### Architecture
The application contains three different services
| Service | Description | Port  |
|:--------:|:------------:|:-----:|
|Frontend |Customer-facing storefront| 5173
|Backoffice |Admin panel for management| 5174
|Backend| REST API + database| 8085

Guests can browse the storefront without an account. Meanwhile, authenticated users can wish list items, add them to cart, checkout and check order history. Admin accounts on the other hand, are restricted to the backoffice only, admin credentials cannot access the guest and user features and vice versa.

# Getting Started 

## Prerequisites
- Node.js and npm
- Java (JDK 17+) and a Java IDE (e.g IntelliJ)

## Backend 
Open Application.java in the `Application.java` in the backend module and run it from your IDE.

## Backoffice
```bash
cd eshop-backoffice
npm install
npm run dev
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```
Once all three services are running, the app is available at the ports listed in [Architecture](#architecture)

## Demo Credentials
An admin account is seeded on the first run. Credentials are printed to the backend console. If they are not visible, use: 
```bash
Email:    admin@eshop.com
Password: P@ssword!
```
> These are demo-only credentials for
> local evaluation and are not intended
> for production use

## Discount Codes
For testing cart discount feature:
- SUMMER10
- HOLIDAY15
- ESHOP20

# Features

## User
- Registration, Login and Logout
- Password encryption
- Email and username updates
- Wishlist management
- Order Placement
- Order status tracking

## Admin
- Quick actions for CRUD operations
- Strict authentication and access control
- Full access to all entities and fields in the database

# Project Structure

## Frontend
Built with React and Taiwlind. Handles all customer facing navigation and interaction.

### Responsibilities
- User interface and navigation
- Product browsing and filtering
- Cart and wishlist management
- Checkout flow
- API integration
- Protected routes (user/admin separation)

## Backend
Handles core business logic, security and data access.

### Responsibilities
- REST API endpoints
- Authentication & authorization (Spring Security + JWT)
- Password encryption and user security
- Order processing and tracking
- Product and user management
- Database initialization and configuration
- JSON-based data seeding for initial admin setup

## Authentication System
- JWT based authentication
- Secure login/register flow
- Role-based access control (USER/ADMIN)
- Protected API endpoints via Spring Security filters

## Database
Manages entities, services, repos and controllers. Config classes parse JSON files to seed initial data

- H2 in memory database for development
- JPA entities define the relational structure
- Repositories handle the data access layer

# Known Limitations
The following are know gaps, not yet implemented

- Moving items from wishlist to cart
- Re ordering a previously placed order
- Create/update actions in the backoffice occasionally return errors despite being implemented
- Order status updates from backoffice
- Increasing/decreasing product quantity directly in the cart
- User and order management view in the backoffice
