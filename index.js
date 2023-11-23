const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const productRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const cartRouter = require('./routes/cart')
const orderRouter = require('./routes/cart')
const cors = require('cors'); // Import the cors middleware

dotenv.config()
mongoose.connect(process.env.DATABASE_URL).then(()=> console.log('db connected')).catch((e) => console.log(e));

app.use(cors());

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: '10mb', extended: true}));

app.use('/api/products', productRouter); 
app.use('/api/', authRouter); 
app.use('/api/users', userRouter); 
app.use('/api/cart', cartRouter); 
app.use('/api/order', orderRouter); 

app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT}!`))