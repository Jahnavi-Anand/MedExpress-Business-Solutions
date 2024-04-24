// Establish connection to MongoDB
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

// Function to validate login form
async function validateForm() {
    // Retrieve username and password from form inputs
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    // Validate username and password format
    if (!username) {
        alert("Username cannot be empty.");
        return false;
    }

    if (!/^[a-zA-Z]/.test(username)) {
        alert("Username must start with an alphabet.");
        return false;
    }

    if (!password) {
        alert("Password cannot be empty.");
        return false;
    }

    if (password.length < 8) {
        alert("Password must be at least 8 characters long.");
        return false;
    }

    if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$&])/.test(password)) {
        alert("Password must contain at least one uppercase letter, one lowercase letter, one digit, and one of the following special characters: @, #, $, &.");
        return false;
    }

    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Select the database and collection
        const db = client.db('medexpress');
        const passwordCollection = db.collection('password');

        // Find user by username and password
        const user = await passwordCollection.findOne({ username, password });

        // Check if user exists
        if (!user) {
            alert('Invalid username or password');
            return false;
        }

        // Authentication successful
        console.log('User authenticated');
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

// Example of calling the validateForm function when the login form is submitted
const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission
    if (await validateForm()) {
        // Redirect or perform further actions on successful login
        console.log('Login successful');
    } else {
        // Handle failed login
        console.log('Login failed');
    }
});
