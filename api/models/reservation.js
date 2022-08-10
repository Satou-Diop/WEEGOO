import mongoose from "mongoose";
const reservationSchema= new mongoose.Schema({
    
id_trajet :{
    type :String,
    required: true
},
id_passager :{ 
    type : String,
    required: true
},
nombre_place :{
    type: Number,
    required: true
},
confirmation :{
    type: Boolean,
    required: true
}
});

export default mongoose.model("Reservation",reservationSchema)