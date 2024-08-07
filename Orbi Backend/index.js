import express from 'express';
import ConnectToDB from './db.js';
import authRoute from './routes/auth.js';
import cartRoute from './routes/cartRoute.js';
import paymentRoute from './payment routes/payment.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

ConnectToDB();

app.use(express.json());
app.use(cors());
app.use('/auth',authRoute);
app.use('/cart',cartRoute);
app.use('/payment',paymentRoute);

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.listen(port,()=>{
    console.log(`Server Running At Port http://localhost:${port}/`);
});
