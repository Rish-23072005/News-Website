// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define the schema for the subscribers collection
const subscriberSchema = new mongoose.Schema({
  email: String
});

// Create a model for the subscribers collection
const Subscriber = mongoose.model('Subscriber', subscriberSchema);

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Create a route for the subscribe form
app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  const subscriber = new Subscriber({ email });
  subscriber.save((err, subscriber) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error subscribing');
    } else {
      res.send('Thank you for subscribing!');
    }
  });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});