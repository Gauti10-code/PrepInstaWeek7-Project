require('dotenv').config();
const express=require('express');
const session = require('express-session');
const connectDB=require('./config/db');
const productRoutes = require('./routes/productRoutes'); // Import the products route
const userRoutes = require('./routes/userRoutes');
const app=express();

app.use(express.json());

connectDB();

app.use(session({
  secret: 'your-secret-key', // Replace with your own secret
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/products', productRoutes);
app.use('/users', userRoutes); 

app.get('/',(req,res)=>res.send('Api is running'));
const PORT=process.env.PORT||5000;

app.listen(PORT,()=>console.log(`Server is listening at port ${PORT}`));
