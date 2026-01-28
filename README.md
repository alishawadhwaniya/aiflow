# My AI Flow App

This is a full-stack application with a React/Vite frontend and a Node.js/Express backend.

## Prerequisites

- Node.js (v14 or higher recommended)
- npm (Node Package Manager)

## Installation

This project consists of two parts: the `client` and the `server`. You need to install dependencies for both.

### 1. Server Setup

Navigate to the `server` directory and install dependencies:

```bash
cd server
npm install
```

**Environment Variables:**

Create a `.env` file in the `server` directory. You will likely need to configure the following variables (based on the project dependencies):
- `MONGODB_URI`: Connection string for your MongoDB database.
- `OPENAI_API_KEY`: API key for OpenAI.
- `PORT`: (Optional) Port for the server to run on (defaults to 5000 in this guide).

### 2. Client Setup

Navigate to the `client` directory and install dependencies:

```bash
cd client
npm install
```

## Running the Application

You need to run both the server and the client concurrently (in separate terminals).

### Start the Server

In the `server` directory:

```bash
npm start
```

The server should start running, typically on `http://localhost:5000`.

### Start the Client

In the `client` directory:

```bash
npm run dev
```

The client development server will start, typically on `http://localhost:5173`. Open this URL in your browser to use the application.

## Project Structure

- **client/**: React frontend application managed with Vite.
- **server/**: Node.js/Express backend API.
