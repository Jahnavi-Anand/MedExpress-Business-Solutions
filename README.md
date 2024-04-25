# MedExpress-Business WebApp Solution
https://medexpress-pharmacy.onrender.com/

## Description
MedExpress is an online pharmacy business web application that provides a seamless experience for ordering medications online. This solution is built using Node.js, Express.js, MongoDB, and EJS templating engine.

## Features
- User registration and authentication
- Browse and purchase medications from the online shop
- User-friendly interface
- Secure payment options
- Timely medication delivery
- Responsive design for desktop and mobile devices

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your_username/MedExpress-Business-WebApp.git
   ```

2. Navigate to the project directory:
   ```bash
   cd MedExpress-Business-WebApp
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up MongoDB Atlas:
   - Create a MongoDB Atlas account and set up a cluster.
   - Obtain your MongoDB connection string.

5. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     ```

6. Start the server:
   ```bash
   npm start
   ```

7. Open a web browser and go to `http://localhost:3000` to view the application.

## Usage
- Register as a new user or login if you already have an account.
- Browse the shop and add medications to your cart.
- Proceed to checkout and make a secure payment.
- Track the status of your orders and view order history.

## Dependencies
- Node.js
- Express.js
- EJS
- Mongoose
- Body-parser
- dotenv
