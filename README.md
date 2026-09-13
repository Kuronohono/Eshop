# Deloitte E-Commerce Web Application

A full-stack e-commerce platform built with React and Spring Boot, featuring secure JWT based authentication, role based access control, product catalogue management and a complete checkout flow.
Built as a collaboration between International Hellenic University(IHU) and Deloitte.

## Table of Contents
- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Getting Started]


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

# Architecture
The application contains three different services
| Service | Description | Port  |
|:--------:|:------------:|:-----:|
|Frontend |Customer-facing storefront| 5173
|Backoffice |Admin panel for management| 5174
|Backend| REST API + database| 8085
