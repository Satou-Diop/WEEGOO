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
telephone : {
    type : String,
    required :true
},
photo:
{
    type: String,
    default:""
},
note:
{
    type:[Number]
},
isVerified : {
    type : Boolean,
    default: false
},
ncni : {
    type : String,
    default:""
},
npermis: {
    type : String,
    default:""
},
nassurance : {
    type : String,
    default:""
},
visite_technique : {
    type : String,
    default:""
},
isConducteur : {
    type : Boolean,
    default: false
},
isDetailed : {
    type : Boolean,
    default: false
}
},{timestamps : true});

export default mongoose.model("User",userSchema)