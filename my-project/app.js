const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Add this line
const app = express();

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://devops:devops@cluster0.5298ya3.mongodb.net/medexpress?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Import and use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Mongoose Models
const User = mongoose.model('User', {
  firstname: String,
  lastname: String,
  dob: Date,
  age: Number,
  gender: String,
  country: String,
  city: String,
});

const Password = mongoose.model('Password', {
  username: String,
  password: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// Route to render index.ejs
app.get("/", (req, res) => {
  res.render('index');
});

// Route to render cart.ejs
app.get("/cart", (req, res) => {
  res.render('cart');
});

// Route to render login.ejs
app.get("/login", (req, res) => {
  res.render('login');
});

// Route to render shop.ejs
app.get("/shop", (req, res) => {
  res.render('shop');
});

// Route to render signup.ejs
app.get("/signup", (req, res) => {
  res.render('signup');
});

// Route to handle signup form submission
app.post("/signup", async (req, res) => {
  try {
    const { firstname, lastname, dob, gender, country, city, username, password } = req.body;
    // Calculate age
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Save user data to User collection
    const newUser = new User({
      firstname,
      lastname,
      dob,
      age,
      gender,
      country,
      city
    });
    await newUser.save();

    // Save username and password to Password collection with user reference
    const newPassword = new Password({
      username,
      password,
      user: newUser._id
    });
    await newPassword.save();

    res.redirect('/login'); // Redirect to login page after signup
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to handle login form submission
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Password.findOne({ username, password }).populate('user').exec();
    if (user) {
      res.redirect('/shop'); // Redirect to shop page if login is successful
    } else {
      res.redirect('/login'); // Redirect to login page if login fails
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// Listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
