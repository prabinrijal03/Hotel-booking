import mongoose from "mongoose";
const mongodb = 'mongodb+srv://prabinrijal03:Project52@cluster1.eqbpjtu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>
     console.log('connected'))
.catch(err=>
     console.log(err));
export default mongoose;