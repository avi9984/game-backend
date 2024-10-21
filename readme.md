# Tournament Management API

This project is a **Tournament Management API** built using Node.js, Express, and MongoDB. It provides endpoints for user registration, subscription plans, and creating & managing tournaments and leagues.

## Features

- **User Authentication**: Sign up, Login, and OAuth-based login.
- **Subscription Plans**: Different plans such as Basic, Standard, Premium, and Custom for game assets.
- **Tournament Management**: Create, read, update, and delete (CRUD) tournament records.
- **Leagues & Tournaments**: Manage multiple tournaments and leagues for games like Ludo.
- **Phone Number Verification**: Phone number-based signup.

## Prerequisites

To run this project, you will need to have the following installed on your system:

- **Node.js** (v14 or higher)
- **MongoDB** (v4 or higher)
- **npm** (v6 or higher)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/avi9984/game-backend.git
cd game-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/tournamentDB
JWT_SECRET=your_jwt_secret
TWILIO_ACCOUNT_SID=twilo_account_sid
TWILIO_AUTH_TOKEN=twilo_auth_token
TWILIO_VERIFY_SERVICE_SID=twilio_verify_service_sid

```

### 4. Start the Server

```bash
npm start
```

The server will start running on `http://localhost:3000`.

### 5. API Documentation

The following API endpoints are available.

### Authentication Endpoints

#### Sign Up (POST `/users/register`)

```http
POST /users/register
```

**Request Body**:
```json
{
  "name": "exampleUser",
  "email": "example@example.com",
  "password": "yourpassword",
  "cnfPassword":"yourpassword",
  "phoneNumber": "1234567890",
}
```

**Response**:
```json
{
    "status": true,
    "message": "Your profile is under verification you will received mail shortly"
}
```

#### Login (POST `/auth/login`)

```http
POST /auth/login
```

**Request Body**:
```json
{
  "email": "example@example.com",
  "password": "yourpassword"
}
```

**Response**:
```json
{
  "status": true,
  "message": "Login successful",
  "token": "jwt-token-here"
}
```

### Subscription Endpoints

#### Get Subscription Plans (GET `/subscriptions`)

```http
GET /subscriptions
```

**Response**:
```json
{
  "plans": [
    {
      "name": "Basic",
      "price": "₹1,00,000",
      "features": [
        "Upto 4 Themes/Skins for the game",
        "Monthly Feature Slots",
        "Priority Support"
      ]
    },
  ]
}
```

### Tournament Endpoints

#### Create Tournament (POST `/tournaments`)

```http
POST /tournaments
```

**Request Body**:
```json
{
  "tournamentName": "Pro League",
  "gameType": "Ludo",
  "startDate": "2024-12-01",
  "maxParticipants": 100,
  "prizePool": "5000"
}
```

**Response**:
```json
{
  "status": true,
  "message": "Tournament created successfully"
}
```

#### Get All Tournaments (GET `/tournaments`)

```http
GET /tournaments
```

**Response**:
```json
{
  "tournaments": [
    {
      "tournamentName": "Pro League",
      "gameType": "Ludo",
      "startDate": "2024-12-01",
      "maxParticipants": 100,
      "prizePool": "5000"
    },
  ]
}
```

### League Endpoints

#### Get Leagues (GET `/leagues`)

```http
GET /leagues
```

**Response**:
```json
{
  "leagues": [
    {
      "leagueName": "Ludo Championship",
      "games": ["Ludo", "Chess"],
      "participants": 50
    },
    ...
  ]
}
```

### Phone Number Verification Endpoints

#### Send OTP on Phone Number (POST `/users/send-otp`)
```http
POST /users/verify-phone-number
```
**Request Body**:
```json
{
  "phoneNumber": "+91 1234567890",
}
```
**Response**:
```json
{
    "status": true,
    "message": "Verification code sent"
}
```

#### Start Phone Verification (POST `/users/verify-phone-number`)

```http
POST /users/verify-phone-number
```

**Request Body**:
```json
{
  "phoneNumber": "1234567890",
  "code":"1245"
}
```

**Response**:
```json
{
    "status": true,
    "message": "Phone number verified"
}
```

---

## Project Structure

```
├── controllers
│   ├── user.js
│   ├── tournament.js
│   ├── league.js
│   └── subscription.js
├── models
│   ├── user.js
│   ├── tournament.js
│   ├── league.js
│   └── subscription.js
├── routes
│   ├── user.js
│   ├── tournament.js
│   ├── league.js
│   └── subscription.js
├── services
│   ├── token.js
│   ├── twillio.js
├── utils
│   ├── validator.js
├── .env
├── index.js
└── README.md
```

## Running Tests

To run tests, use:

```bash
npm start
```

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT** for authentication
- **Mongoose** as an ORM
- **Twilio** for phone number verification

