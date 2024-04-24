// Assuming you have already established a connection to MongoDB
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.json());

// Connection URI
const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

// Define route to handle add-to-cart requests
app.post('/add-to-cart', async (req, res) => {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Select the database and collection
        const db = client.db('medexpress');
        const cartCollection = db.collection('cart');

        // Extract product information from request body
        const { productId, productName, productPrice, quantity } = req.body;

        // Create document to insert into cart collection
        const cartItem = {
            productId: productId,
            productName: productName,
            productPrice: productPrice,
            quantity: quantity
        };

        // Insert cart item into cart collection
        await cartCollection.insertOne(cartItem);
        console.log('Item added to cart:', cartItem);

        // Send response
        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        res.status(500).json({ error: 'Failed to add item to cart' });
    } finally {
        // Close the MongoDB connection
        await client.close();
        console.log('Disconnected from MongoDB');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
