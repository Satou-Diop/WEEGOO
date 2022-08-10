import mongoose from "mongoose";
const conducteurSchema= new mongoose.Schema({
    
id_conducteur :{
    type :Number,
    required: true
},
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
sexe:{
    type : String,
    required: true
},
profession:{
    type : String,
    required: true
},
num_cni:{
    type : Number,
    required: true
},
num_permis:{
    type : Number,
    required: true
},
societe_assurance:{
    type : String,
    required: true
},
adresse:{
    type : String,
    required: true
},
photo:{
    data:Buffer,
    contentType: String},
note:{
    type : [Number],
},
},{timestamps : true});

export default mongoose.model("conducteur",conducteurSchema)