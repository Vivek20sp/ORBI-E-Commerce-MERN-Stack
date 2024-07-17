import express from 'express';
import ConnectToDB from './db.js';
import apiRoutes from './routes/productRoute.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

ConnectToDB();

app.use(express.json());
app.use(cors());
app.use('/API',apiRoutes);

app.get('/',(req,res)=>{
    res.send({WelCome:"WelCome To Our API"});
});

app.listen(port,()=>{
    console.log(`Server Running On http://localhost:${port}/`);
});