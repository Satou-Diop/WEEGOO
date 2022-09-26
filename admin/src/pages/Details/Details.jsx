import "./Details.css";
import {CalendarToday,MailOutline,PhoneAndroid} from "@material-ui/icons";
import moment from "moment"
import { Link, useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { Avatar } from "@material-ui/core";
axios.defaults.withCredentials = true;
const Path= "http://localhost:8000/"


export default function ProductList() {
  const [result, setResult] = useState([]);
  const location=useLocation()
  const details = location.pathname.split("/")[2];
  useEffect(() => {
  var config = {
   method: 'get',
   url: 'http://localhost:8000/signal/'+details,
   headers: { },
 };
 
 axios(config)
 .then(function (response) {
   setResult(response.data);
 })
 .catch(function (error) {
   console.log(error);
 });
   },[])
 
 
  return (
    <>
    <div className="userList">
      <Card item ={result}/>
    </div>
    
    </>
  );
}

function  Card({item}) {
  const [User, setUser] = useState([]);
  const [Conducteur, setConducteur] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:8000/user/'+item?.id_user,
      headers: { },
    };
    
    axios(config)
    .then(function (response) {
      setUser(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
      })
    
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:8000/user/'+item?.id_conducteur,
      headers: { },
    };
    
    axios(config)
    .then(function (response) {
      setConducteur(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
      })
const sendNotification=()=>{
  var data = JSON.stringify({
    "title": "Weegoo-Profil signalé",
    "message": "Bonjour "+Conducteur?.prenom+" "+Conducteur?.nom+", votre a ete signalé par un utilisateur pour '"+item.raison+"'. Merci de respecter la politique de Weegoo pour eviter que votre compte soit suspendu.",
    "origin": "systeme",
    "user": Conducteur?._id,
    
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:8000/notification/',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    toast.success("Avertissement envoyé")
    deleteSignal()
  })
  .catch(function (error) {
    console.log(error);
  });
      
}
const deleteSignal=()=>{
var config = {
  method: 'delete',
  url: 'http://localhost:8000/signal/'+item?._id,
  headers: { 
    'Content-Type': 'application/json'
  } 
};

axios(config)
.then(function (response) {
 navigate("/UserSignaler")
})
.catch(function (error) {
  console.log(error);
});

 }

          return (
            <div className="user">
      <div className="userTitleContainer2">
        <h1 className="userTitle">Utilisateur signalé</h1>
     
      </div>
      <div className="userContainer2">

        <div className="userUpdate2">
        <div className="topTitle">
        <div className="userShowTop">
            <img
              src={Path+Conducteur?.photo}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{Conducteur?.prenom} {Conducteur?.nom}</span>
            </div>
        </div>
          <div className="userShowTop">
            <button onClick={sendNotification}>Avertissement</button>
            <button>Suspendre</button>
          </div>
        </div>
          <div className="userShowBottom">
            <span className="userShowTitle"> Détails du compte</span>
           
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{moment(Conducteur?.date_naissance).format(" DD/ MM/ YYYY")}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{Conducteur?.telephone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{Conducteur?.login}</span>
            </div>
            <div className="userShowInfo">
              <u>Signalé pour </u> :
              <span className="userShowInfoTitle">{item?.raison}</span>
            </div>
            <div className="signaleur">
              Par <span > {User?.prenom} {User?.nom}</span> <Avatar sx={{fontSize: 20}} src={Path+User?.photo}/>
            </div>
          </div>
        </div>
       

        
        
      </div>
    </div>
          );
  
}