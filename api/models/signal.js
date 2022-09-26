import mongoose from "mongoose";
const signalSchema= new mongoose.Schema({
    
id_conducteur :{
    type :String,
    required: true
},

id_user: {
    type : String,
    required: true
},
raison : {
    type : String,
    required: true
}
},{timestamps : true});

export default mongoose.model("signal",signalSchema)