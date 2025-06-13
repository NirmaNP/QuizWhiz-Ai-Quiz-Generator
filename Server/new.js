const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const SignUpModel = require('./models/SignUpSchema');
const Results = require('./models/ResultSchema');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5174','http://localhost:5173', 'https://quizwhiz-1t5d.onrender.com','https://quizwhiz-azure-one.vercel.app'],
  credentials: true
}));


const URL = process.env.MONGODB_URL;

mongoose.connect(`${URL}/UserDetails`)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log(`Failed to connect MongoDB ${URL}`);
    });


app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/user',require('./routes/auth'));
app.use('/results',require('./routes/results'));

// const PORT = 4000;
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});