import mongoose from "mongoose";

const VehiculeSchema = new mongoose.Schema(
  {
    marque: {
      type: String,
      defaut:""
    },
    modele: {
      type: String,
      defaut:""
    },
    photo: {
      type: String,
      defaut:""
    },
    description: {
        type: String,
        defaut:""
      },
    conducteur: {
        type: String,
        defaut:""
    }
    
  },
  { timestamps: true }
);

export default mongoose.model("Vehicule", VehiculeSchema);
