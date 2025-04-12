const express = require('express');
const connectDB = require('./db');
connectDB();
const app = express();
app.use(express.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./productRoutes'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));