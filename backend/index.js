// 3:14:47 
import express from "express";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import morgan from "morgan";
import authRoutes from './routes/authRoute.js';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoute.js'
// import path from 'path';

//configure env with dotenv.config({path:''})
// because our .env file is in root we did not use path
dotenv.config()

//database config
connectDB();


//rest object
const app = express();

//middleware
// app.use(cors());
// app.options('*', cors({
//     origin: ["http://localhost:3000", "https://e-commerce-front-psi.vercel.app"],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
//   }));  
  
app.use(cors({
    origin: ["http://localhost:3000", "https://e-commerce-front-psi.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type','Authorization']
}));


app.use(express.json());
app.use(morgan('dev'));

// const __dirname = path.dirname("")
// const buildpath = path.join(__dirname, "./frontend/build")
// app.use(express.static(buildpath));
// app.use(express.static(path.join(__dirname, './frontend/build')))

//routes
app.use("/api/v1/auth", authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes)

// rest api
// app.use('*', function(req,res){
//     res.send(path.join(__dirname, './frontend/build/index.html'))
// })

app.get('/', (req, res)=>{
    res.send({
        message:"welcome to mern stack e-commercial app"
    })
})

//port
const port = process.env.PORT || 8080;


//run listen
app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
    
})