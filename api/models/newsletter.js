import mongoose from "mongoose";
const newsletterSchema= new mongoose.Schema({
    
email: {
    type : String,
 
},
},{timestamps : true});

export default mongoose.model("newsletter",newsletterSchema)