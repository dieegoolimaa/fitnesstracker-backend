# Fitness Tracker Backend

Welcome to the backend of our Fitness Tracker project! This part of the project handles the server-side logic, database operations, and API endpoints necessary for managing user accounts, exercise data, and personalized training programs.

## Technologies Used

- **Node.js:** A JavaScript runtime environment for executing server-side code.
- **Express.js:** A web application framework for Node.js that simplifies the process of building APIs.
- **MongoDB:** A NoSQL database used for storing user data, exercise information, and training programs.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js, providing a schema-based solution to model application data.

## Installation

1. Clone the repository: `git clone https://github.com/yourusername/fitness-tracker-backend.git`

2. Navigate to the project directory: `cd fitness-tracker-backend`

3. Install dependencies: `npm install`

4. Set up environment variables:

- Create a `.env` file in the root directory.
- Define the following variables:

  makefile

  Copy code

  `PORT=3000 MONGODB_URI=mongodb://localhost/fitness_tracker JWT_SECRET=your_jwt_secret`

5. Start the server: `npm start`

6. The backend server will be running at `http://localhost:3000`.

## API Documentation

### Authentication

The Fitness Tracker API provides user authentication functionalities including sign up and sign in. Users must sign up and sign in to access certain features of the platform.

#### User Routes / Endpoints

| HTTP Verb | URL     | Request Body           | Action               |
| --------- | ------- | ---------------------- | -------------------- |
| POST      | /signup | JSON (email, password) | Registers a new user |
| POST      | /signin | JSON (email, password) | Authenticates a user |

### Project Management API

The Project Management API returns JSON responses and is used for managing projects and tasks. It provides the following endpoints:

### Project Routes / Endpoints

| HTTP Verb | URL                  | Request Body | Action                        |
| --------- | -------------------- | ------------ | ----------------------------- |
| POST      | /projects            | JSON         | Creates a new project         |
| GET       | /projects            | (empty)      | Returns all the projects      |
| GET       | /projects/:projectId | (empty)      | Returns the specified project |
| PUT       | /projects/:projectId | JSON         | Edits the specified project   |
| DELETE    | /projects/:projectId | (empty)      | Deletes the specified project |

### Task Routes / Endpoints

| HTTP Verb | URL    | Request Body | Action             |
| --------- | ------ | ------------ | ------------------ |
| POST      | /tasks | JSON         | Creates a new task |

### API Base URL

- Base URL: `https://fitness-tracker-api.herokuapp.com`

## Contributing

We welcome contributions from the community to improve the functionality and reliability of our Fitness Tracker backend. If you'd like to contribute, please follow the steps outlined in the [CONTRIBUTING.md](https://chat.openai.com/c/CONTRIBUTING.md) file.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

If you have any questions or feedback, feel free to reach out to us at your.email@example.com.

Thank you for using our Fitness Tracker Backend! We hope it helps power your fitness journey. 🏋️‍♂️💪
