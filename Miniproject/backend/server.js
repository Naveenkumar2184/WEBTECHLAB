// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todo-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/tasks', taskRoutes);

// Serve the index.html file at the root URL
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});