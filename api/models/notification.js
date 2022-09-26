import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    origin: {
      type: String,
    },
    user: {
        type: String,
      },
    isOpen :{
      type: Boolean,
      default: false
    },
    isReservation :{
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
