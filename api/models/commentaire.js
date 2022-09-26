import mongoose from "mongoose";
const commentaireSchema= new mongoose.Schema({
    
id_conducteur :{
    type :String,
    required: true
},

id_user: {
    type : String,
    required: true
},
commentaire : {
    type : String,
    required: true
},
nom_user : {
    type : String,
},
prenom_user : {
    type : String, 
},
note:{
    type : Number,
    
}
},{timestamps : true});

export default mongoose.model("commentaire",commentaireSchema)