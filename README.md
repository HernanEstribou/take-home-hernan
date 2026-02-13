# Backend Challenge

## Notification management system for authenticated users.

The system allows each user to manage and send notifications through various channels.

## Badges

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/HernanEstribou/take-home-hernan/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/HernanEstribou/take-home-hernan/tree/master)

## Features

### 1. User Authentication

- User registration with email and password.
- Login endpoint that returns an access token.
- Endpoints require a valid access token.

### 2. Notification Management

- Create notifications (fields: **title**, **content**, **channel**).
- Edit existing notifications.
- Delete notifications.
- View all notifications created by the authenticated user.

### 3. Notification Sending

- Every time a notification is created, it is automatically sent through the selected channel.
- Supported delivery channels:
  - **Email**
  - **SMS**
  - **Push Notification**

## Techs

- Node: 18.20.7
- Express: 5.2.1
- Prisma: 6.19.2
- Postgres: 14.20-trixie

## Route

- Local: [API Swagger](http://localhost:3000/api-docs/).
