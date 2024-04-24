async function validateForm() {
    // Assuming you have already established a connection to MongoDB
    const db = client.db('medexpress');

    // Validate form fields
    const isValid = validateFields();
    if (!isValid) {
        return;
    }

    // Insert user data into MongoDB
    try {
        // Insert user data into 'user' collection
        await db.collection('user').insertOne(getUserData());
        console.log('User data inserted into "user" collection');

        // Insert password data into 'password' collection
        await db.collection('password').insertOne(getPasswordData());
        console.log('Password data inserted into "password" collection');

        // Redirect user or show success message
    } catch (err) {
        console.error('Error inserting data into MongoDB:', err);
        // Handle error
    }
}

function validateFields() {
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    // Validate first name and last name
    if (!/^[A-Za-z]+$/.test(firstname)) {
        alert("First name should contain only alphabets.");
        return false;
    }
    if (!/^[A-Za-z]+$/.test(lastname)) {
        alert("Last name should contain only alphabets.");
        return false;
    }

    // Calculate age
    calculateAge();

    // Validate country and city
    if (!validateCountry(country)) {
        return false;
    }
    if (!validateCity(city)) {
        return false;
    }

    // Validate username
    if (!username) {
        alert("Username cannot be empty.");
        return false;
    }
    if (!/^[A-Za-z]/.test(username)) {
        alert("Username must start with an alphabet.");
        return false;
    }

    // Validate password
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

    // Validate password match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    return true;
}

function calculateAge() {
    const dob = document.getElementById("dob").value;
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    document.getElementById("age").value = age;
}

function validateCountry(country) {
    if (!country) {
        alert("Please enter a country.");
        return false;
    }
    // Check if the input contains only letters and spaces
    if (!/^[A-Za-z\s]+$/.test(country)) {
        alert("Country name should contain only letters and spaces.");
        return false;
    }
    return true;
}

function validateCity(city) {
    if (!city) {
        alert("Please enter a city.");
        return false;
    }
    // Allow a wider range of characters for city names
    // You can customize this regex based on your requirements
    // Example regex to allow letters, spaces, and some special characters:
    if (!/^[A-Za-z\s\-',.()&]+$/.test(city)) {
        alert("Invalid city name.");
        return false;
    }
    return true;
}

function getUserData() {
    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const country = document.getElementById("country").value.trim();
    const city = document.getElementById("city").value.trim();
    const username = document.getElementById("username").value.trim();

    return {
        firstname: firstname,
        lastname: lastname,
        dob: dob,
        gender: gender,
        country: country,
        city: city,
        username: username
    };
}

function getPasswordData() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    return {
        username: username,
        password: password
    };
}

// Bind event listener to date of birth input
document.getElementById("dob").addEventListener("change", calculateAge);
