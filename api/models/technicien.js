import mongoose from "mongoose";
const technicienSchema= new mongoose.Schema({
    
nom : {
    type : String,
    required: true
},
prenom : {
    type : String,
    required: true
},
genre : {
    type : String,
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
telephone : {
    type : String,
    required :true
},
photo:
{
    type: String,
    default:""
},

isAdmin : {
    type : Boolean,
    default: false
},

},{timestamps : true});

export default mongoose.model("technicien",technicienSchema)