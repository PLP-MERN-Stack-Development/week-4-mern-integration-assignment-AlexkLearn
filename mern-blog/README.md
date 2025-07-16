# MERN Blog Application

A simple blog application built using the MERN stack (MongoDB, Express.js, React, Node.js). This application allows users to register, log in, create posts, and comment on posts.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and authentication
- Create, read, update, and delete blog posts
- Comment on posts
- Responsive design

## Technologies Used

- **Frontend**: React, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Bcrypt.js, JSON Web Token (JWT)
- **Development Tools**: Vite, Nodemon, Postman

## Setup Instructions

Follow these steps to set up the project locally:

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (or use a cloud service like MongoDB Atlas)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

### Clone the Repository

```bash
git clone https://github.com/PLP-MERN-Stack-Development/week-4-mern-integration-assignment-AlexkLearn.git
cd mern-blog
```

### Backend Setup
1. Navigate to the backend directory:

```bash
cd server
```

2. Install the backend dependencies:

```bash
npm install
```

3. Create a <em>`.env`</em> file in the <em>`server`</em> directory and add the following environment variables:

```plaintext
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blogr
JWT_SECRET=your_jwt_secret
```

Replace the <em>`MONGODB_URI`</em> with your custom MongoDB connection string and <em>`your_jwt_secret`</em> with a secret key for JWT.

4. Start the backend server:

```bash
npm run dev
```
### Frontend Setup
1. Navigate to the frontend directory:

```bash
cd client
```


2. Install the frontend dependencies:

```bash
npm install
```
3. Start the frontend development server:

```bash
npm run dev
```

4. Open your browser and go to <em>`http://localhost:5173`</em> to view the application.


### Usage
  - Register a new account to start using the application.  
  - Log in with your credentials.  
  - Create new blog posts and comment on existing posts.

### Contributing
Contributions are welcome! If you have suggestions for improvements or want to report a bug, please open an issue or submit a pull request.

### License
This project is licensed under the MIT License.