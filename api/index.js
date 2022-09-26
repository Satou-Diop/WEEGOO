import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import trajetRoute from "./routes/trajet.js"
import reservationRoute from "./routes/reservation.js"
import messageRoute from "./routes/Message.js"
import notificationRoute from "./routes/Notification.js"
import conversationRoute from "./routes/Conversation.js"
import vehiculeRoute from "./routes/Vehicule.js"
import commentaireRoute from "./routes/commentaire.js"
import signalRoute from "./routes/signal.js"
import newsletterRoute from "./routes/newsletter.js"
import technicienRoute from "./routes/technicien.js"
import cookieParser from "cookie-parser"
import Cors from "cors"
import bodyParser from "body-parser"


const app=express();
dotenv.config();

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connecter a MONGODB !!");
    }catch(error){
        throw error;
    }
};

//API ENDPOINT
app.get('/',(req,res)=>res.status(200).send("Hello World"));


//Middlewear
app.use(cookieParser())
app.use(express.json())
app.use(Cors({credentials:true, origin :["http://localhost:3000","http://localhost:3001"]}))
app.use(bodyParser.urlencoded(
    { extended:true }
))
app.use('/Uploads',express.static('Uploads'))
// app.use(bodyParser.json())
app.set("view engine","ejs");

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'Images')},
//       filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })

// const upload = multer({ storage: storage })

// app.post("/upload", upload.single('image'),(req,res)=>{
//     res.send("Image Uploaded")
// }
// )
app.use("/auth",authRoute);
app.use("/user",userRoute);
app.use("/trajet",trajetRoute);
app.use("/reservation",reservationRoute);
app.use("/message",messageRoute);
app.use("/conversation",conversationRoute);
app.use("/notification",notificationRoute);
app.use("/vehicule",vehiculeRoute);
app.use("/commentaire",commentaireRoute);
app.use("/signal",signalRoute);
app.use("/newsletter",newsletterRoute);
app.use("/technicien",technicienRoute);
app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage=err.message || "Something Wrong"
   return res.status(errorStatus).json({
    status : err.status,
    message : errorMessage,
    succes: false
})
})


app.listen(8000,()=> {
    connect()
    console.log("Connecter au back-end !!")
})