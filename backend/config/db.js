import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        const conn =await mongoose.connect(process.env.MONGO_URL);
        console.log(`connect to mongo db ${conn.connection.host}`)
    } catch (error) {
        console.log(`error in mongobd connection ${error}`)

        
    }
}
export default connectDB;
