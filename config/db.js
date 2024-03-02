import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>
     console.log('connected'))
.catch(err=>
     console.log(err));
export default mongoose;