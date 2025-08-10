# NoteApp

A simple note-taking application.

## Prerequisites

- [Node.js 22.14](https://nodejs.org/) is required.
- A SuperTokens account and Core ( hosted ). You'll need API connection details.
- A MongoDB account/cluster (MongoDB Atlas or self-hosted) with a connection URI.

## Getting Started

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside `backend` with the following keys filled from your SuperTokens and MongoDB accounts:

```
APP_NAME=NoteApp
API_DOMAIN=http://localhost:4000
WEBSITE_DOMAIN=http://localhost:5173
API_BASE_PATH=/
WEBSITE_BASE_PATH=/

# SuperTokens Core
CONNECTION_URI=YOUR_SUPERTOKENS_CORE_CONNECTION_URI
API_KEY=YOUR_SUPERTOKENS_CORE_API_KEY

# MongoDB
MONGODB_USERNAME=YOUR_MONGODB_USERNAME
MONGODB_PASSWORD=YOUR_MONGODB_PASSWORD
```

### 4. Run the Frontend

Go inside the `frontend` directory and start the development server:

```bash
cd ../frontend
npm run dev
```

Open your browser to view the frontend.

### 5. Run the Backend

In a separate terminal:

```
cd ../backend
npm run dev
```
