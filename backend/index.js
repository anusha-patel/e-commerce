// 3:14:47 
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoute.js'

//configure env with dotenv.config({path:''})
// because our .env file is in root we did not use path
dotenv.config()

//database config
connectDB();


//rest object
const app = express();

//middleware
// app.use(cors());
app.use(cors({
    origin: "https://e-commerce-front-psi.vercel.app",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes)

//rest api
app.get('/', (req, res)=>{
    res.send({
        message:"welcome to mern app"
    })
})

//port
const port = process.env.PORT || 8080;


//run listen
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
    
})