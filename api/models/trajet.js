import mongoose from "mongoose";
const trajetSchema= new mongoose.Schema({
    

point_depart : {
    type : String,
    required: true
},
point_arrivee : {
    type : String,
    required: true
},
date_depart : {
    type : Date,
    required: true
},
heure_depart : {
    type : Date,
    required: true
},
nombre_place_libre:{
    type : Number,
    required: true
},
prix_place:{
    type : Number,
    required: true
},
frequence_trajet : {
    type : String,
    required: true
},
conducteur_id : {
    type : String,
    required: true
}
});

export default mongoose.model("Trajet",trajetSchema)