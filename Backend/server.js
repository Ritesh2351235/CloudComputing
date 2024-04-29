// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors(
  {
    origin: [""],
    methods: ["POST", "GET"],
    credentials: true
  }

));

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:admin@cluster0.4qg9b2z.mongodb.net/Cloud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Student Model
const Student = mongoose.model('Student', {
  name: String,
  age: Number,
  grade: String,
  address: String,
  phoneNumber: String
});

// Routes
app.post('/api/students', async (req, res) => {
  try {
    const { name, age, grade, address, phoneNumber } = req.body;
    const student = new Student({ name, age, grade, address, phoneNumber });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
