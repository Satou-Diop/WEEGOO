import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    
nom : {
    type : String,
    required: true
},
prenom : {
    type : String,
    required: true
},
date_naissance : {
    type : Date,
    required: true
},
login : {
    type : String,
    required: true
},
password:{
    type : String,
    required: true
},
messages:{
    type : Number,
    default: 0  
},
telephone : {
    type : String,
    required :true
}
},{timestamps : true});

export default mongoose.model("User",userSchema)