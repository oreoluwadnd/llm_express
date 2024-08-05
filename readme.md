This is an Express.js application built with TypeScript and MongoDB. It provides an API for submitting queries to a Python program, retrieving conversation history, and getting conversation details.

## Prerequisites

- Docker: Make sure you have Docker installed on your machine. You can download and install Docker from the official website: [https://www.docker.com](https://www.docker.com)

## Getting Started

1. Clone the repository

2. Navigate to the project directory

3. Build the Docker image

Replace `your-app-name` with a suitable name for your application.

4. Run the Docker container

This command maps port 3000 from the container to port 3000 on your host machine. Adjust the port mapping if necessary.

5. The application should now be running inside the Docker container. You can access it by opening a web browser and visiting `http://localhost:3000`.

## Configuration

The application requires the following environment variables to be set:

- `MONGO_URI`: The connection URI for your MongoDB database.
- `PYTHON_API_URL`: The URL of the Python Flask API endpoint.

You can set these environment variables by creating a `.env` file in the project root directory and providing the necessary values.

Example `.env` file

Make sure to replace the values with your actual MongoDB connection URI and Python Flask API URL.

## API Endpoints

The following API endpoints are available:

- `POST /api/query`: Submit a query to the Python program.
  - Request body:
    ```json
    {
      "model": "selected-model",
      "question": "your-question"
    }
    ```

- `GET /api/conversations`: Retrieve the conversation history.

- `GET /api/conversations/:id`: Get the details of a specific conversation.