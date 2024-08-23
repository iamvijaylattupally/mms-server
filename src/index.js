import {app} from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({
    path:'./.env'
});


const port = process.env.PORT || 8001;
connectDB()
.then(()=>{
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`);
    })
})
.catch((err)=>{
    console.log("Error connecting to MongoDB", err.message);
})
