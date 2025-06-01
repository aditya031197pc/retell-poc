# Retell POC API Server

A simple Node.js API server with two endpoints for address processing and appointment scheduling.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will run on http://localhost:3000

## API Endpoints

### 1. Address Processing API

**Endpoint:** `POST /api/address`

**Request Body:**
```json
{
    "address": "123 Main St, City, State",
    "waitTime": 5  // Optional: wait time in seconds (default: 5)
}
```

**Response:**
```json
{
    "avm": 200000
}
```

### 2. Appointment Scheduling API

**Endpoint:** `POST /api/appointments`

**Request Body:**
```json
{
    "name": "John Doe",
    "phoneNumber": "123-456-7890"
}
```

**Response:**
```json
{
    "availableDates": [
        "2 June",
        "5 June",
        "10 June"
    ]
}
```

## Error Handling

Both endpoints will return appropriate error messages if required fields are missing or if there's a server error. 