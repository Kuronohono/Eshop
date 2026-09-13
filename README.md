# Deloitte E-Commerce Web Application

A full-stack e-commerce platform built with React and Spring Boot, featuring secure JWT based authentication, role based access control, product catalogue management and a complete checkout flow.
Built as a collaboration between International Hellenic University(IHU) and Deloitte.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)


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
