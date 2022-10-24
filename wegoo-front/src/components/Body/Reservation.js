import React, { useContext, useEffect } from 'react'
import "../../assets/CSS/Reservation.css"
import { useState } from "react";
import { Avatar } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate } from "react-router-dom";
import useFetch from '../../useFetch.js';
import AuthContext from '../../context/AuthProvider';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import VerifiedIcon from '@mui/icons-material/Verified';
import moment from "moment"
import Fab from '@mui/material/Fab';
import profil_picture from "../../assets/image/noAvatar.png"
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Typography from '@mui/material/Typography';
import Card_com from '../Card/Card_com';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
const Path= "http://localhost:8000/"
axios.defaults.withCredentials = true;

  const fabStyle = {
    position: 'sticky ',
    left: '45%',
    bottom: 20,
    color : 'white',
    background: '#005baf',
    mr : 1,
    
    
    
  };

const  Reservation_finale = () => {
  const [conducteur, setConducteur] = useState([]);
  const navigate=useNavigate()
  const {user} = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [nombre_place, setNombre_place] = useState(1);
  const { data, loading, error } = useFetch(`/trajet/${id}`);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [vehicule, setvehicule] = useState([]);
  const [Nbretrajet, setNbretrajet] = useState(1);
  const [com,setcom]=useState([])
  const { loading2, error2, dispatch } = useContext(AuthContext);

 useEffect(() => {
 if(data.conducteur_id){
  
  var data3 = '';
  var config = {
    method: 'get',
    url: 'http://localhost:8000/auth/user/'+data.conducteur_id+'',
    headers: { 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGFiOTMxNzI5MWQ2NDUwYzBhZDJkOSIsImlhdCI6MTY1ODUwNjgwNywiZXhwIjoxNjU4NTA2ODM3fQ.5CzOof7qmieeOPD03TsAgugWVNFrIQ3-Yyn3PjURy0I'
    },
    data : data3
  };
  
  axios(config)
  .then(function (response1) {
   setConducteur(response1.data)
  })
  .catch(function (error) {
    console.log(error);
  });
 }
 })
 
 useEffect(() => {
  if(conducteur?._id)
{
    
    var config = {
        method: 'get',
        url: 'http://localhost:8000/vehicule/'+conducteur?._id,
        headers: { }
    };
    
    axios(config)
    .then(function (response) {
        setvehicule(response.data);
    })
    .catch(function (error) {
        console.log(error);
    });
}
 
}, )

useEffect(() => {
  if(conducteur?._id){
    var config = {
      method: 'get',
      url: 'http://localhost:8000/trajet/Number/'+conducteur?._id,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : ""
    };
    
    axios(config)
    .then(function (response) {
      setNbretrajet((response.data).length)
    })
    .catch(function (error) {
    });
  }
  
},)

useEffect(() => {
    if(conducteur?._id)
  {
      
      var config = {
          method: 'get',
          url: 'http://localhost:8000/commentaire/'+conducteur?._id,
          headers: { 
            'Content-Type': 'application/json'
          },
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data)
          setcom(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
  }
    
  }, [conducteur])
const naviguer=()=>{
  navigate("/")
}
const open_vehicule=()=>{
  if(vehicule.length != 0)
  setShow2(true)
  }
  const close_vehicule =()=>{
    setShow2(false)
    }
const sendRequest =()=>{
    var data = JSON.stringify({
      "id_trajet": id,
      "id_passager": user._id,
      "id_conducteur":conducteur?._id,
      "nombre_place": nombre_place
    });
  
  
    var config = {
      method: 'post',
      url: 'http://localhost:8000/reservation/',
      headers: { 
        'Content-Type': 'application/json', 
        withCredentials : true,
        },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(response.data)
      toast.success("Reservation enregister") 
      updatePlace()
      sendNotification()
      sendNotification2()
      creerConversation()
      navigate("/")

    })
    .catch(function (error) {
      toast.success("Une erreur est survenue") 
    });
       
}
const updatePlace=()=>{
    var data2 = JSON.stringify({
      "nombre_place_libre": data.nombre_place_libre - nombre_place
    });
    
    var config = {
      method: 'put',
      url: 'http://localhost:8000/trajet/'+id+'',
      headers: { 
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGFiOTMxNzI5MWQ2NDUwYzBhZDJkOSIsImlhdCI6MTY1ODUwNjgwNywiZXhwIjoxNjU4NTA2ODM3fQ.5CzOof7qmieeOPD03TsAgugWVNFrIQ3-Yyn3PjURy0I', 
        'Content-Type': 'application/json'
      },
      data : data2
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
       
}
const creerConversation=()=>{
  var data = JSON.stringify({
    "senderId": user?._id,
    "receiverId": conducteur?._id
  });
  
  var config = {
    method: 'post',
    url: 'http://localhost:8000/conversation/',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
  })
  .catch(function (error) {
    console.log(error);
  });
     
}

  const sendNotification=()=>{
    var data = JSON.stringify({
      "title": "Weegoo",
      "message": "Votre réservation a été enregistrée. Vous recevrez une notification lorsque le conducteur acceptera votre demande.",
      "origin": "systeme",
      "user": user._id,
      "isReservation": true
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
    })
    .catch(function (error) {
      console.log(error);
    });
       
  }

  const sendNotification2=()=>{
    var data = JSON.stringify({
      "title": "Reservation",
      "message": `L'utilisateur ${user?.prenom} ${user?.nom} vient de reserver un de vos trajet. Vous pouvez aller sur le volet de vos reservations pour accepter ou decliner sa reservation.`,
      "origin": user?._id,
      "user": conducteur?._id
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
    })
    .catch(function (error) {
      console.log(error);
    });
       
  }

const Annuler= () =>{ 
    setShow1(false)
    };
    
const handleClose = () =>{ 
    setShow(false)
    };

const openForm = () =>{ 
  localStorage.setItem('Id', id);
    navigate("/Log")  
      };
      
const confirmerReservation = () =>{ 
  setShow(false)
  sendRequest()
   
          };
const handleClick = () =>{
    { user ? (setShow(true)) : ( setShow1(true) ) }
 
  }

  return (

    <section className='SReservation'>
       
      <div className='bread'>
      <p className='p1' onClick={() => navigate(-1)}><ArrowBackIcon sx={{fontSize: "medium"}}/> Retour </p>
      <p className='p2'>/WEEGOO/RESERVATION</p>
      </div>
      <div>

      <div class="Rcontainer">
        <div class="Rtitre">
          <h2>RESERVATION</h2> 
        </div>
        <div class="RTrajet">
          
          <div className='Rlieu'>
            <Timeline
              sx={{
                [`& .${timelineContentClasses.root}`]: {
                  flex: 15,
                },
              }}
            >
              <TimelineItem>
              
                <TimelineSeparator>
                <TimelineDot color="primary"  >
                  <LocationOnIcon sx={{ fontSize : "medium"}}/>
                  </TimelineDot>
                  <TimelineConnector sx={{ bgcolor: 'grey' }} />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '8px', px: 2 }}>
                <Typography variant="h6" >
                <span className='pointspan' >Départ :</span> <span className='span'>{data?.point_depart} </span><br/>
                </Typography>
                <Typography> </Typography>
              </TimelineContent>
              </TimelineItem>
              <TimelineItem>
              
                <TimelineSeparator>
                  <TimelineDot color="primary"  >
                  <LocationOnIcon sx={{ fontSize : "medium"}}/>
                  </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '8px', px: 2 }}>
                <Typography variant="h6">
                <span className='pointspan'>Destination :</span> <span className='span'>{data.point_arrivee}</span>
                </Typography>
                <Typography></Typography>
              </TimelineContent>
              </TimelineItem>
            </Timeline>   
          </div>
          <div className='Rdate'>
            <span> <CalendarMonthIcon/> {moment(data?.date_depart).format("DD MMMM YYYY")}</span>  à <span> {data.heure_depart}</span>mn 
          </div>
          <div className='Rplace'>
            <div><u>Prix </u> : <span className='div'>{data.prix_place} FCFA / Place</span>  </div> <div><span className='spanPlace'> {data.nombre_place_libre} Place(s) Restante(s) </span></div>
          </div>
          
        </div>
        <div class="RConducteur">
          <h5>Publié par :</h5>
          <div className='Rinfo'>
            <div className='info'>
              <div className='photo_conducteur'>  <Avatar src={conducteur?.photo ? (Path+conducteur?.photo):(profil_picture)}/>  </div>
              <div className='nom'> {conducteur?.prenom} {conducteur?.nom} {conducteur?.isVerified ?(<> <VerifiedIcon sx={{fontSize: "medium"}} color="primary"/></>):(<></>)} </div>
            </div>
          <div>
          {user? (<>
            <Link to={`/User/${conducteur?._id}`}>
          <button  >Voir profil</button>
          </Link></>):(
            <>
            
          <button onClick={handleClick} >Voir profil</button>
          
            </>
          )}
          </div>
          </div>
          <div>
            <span>
            Membre depuis le {moment(conducteur?.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
          
        </div>
        {/* <div className='Rautre'>
       
          <h3>Nombre de trajets publiés :<span> {Nbretrajet}</span></h3>
 
        </div> */}
        <div className='RVehicule' onClick={open_vehicule}>
       
          <div> <br/>
          <h3>Véhicule</h3>
          {
                    vehicule?.length ? (<>{vehicule[0]?.marque} {vehicule[0]?.modele}</>):(<>
                       <div> Aucun vehicule enregistré</div></>)
                   }
          <br/><br/>
          </div>
          <div><br/><br/>
          <ArrowForwardIosIcon/>
          </div>
        </div>
        
        
        <div className='Rautre'>
       
          <div className='avis'>
          <h4><ChatBubbleOutlineIcon/> Commentaires laissés sur ce conducteur</h4>
          <div className='Commentaires'>
            {com?.length == 0 ? (<><div className='aucun_com'> Aucun commentaire pour ce conducteur</div></>):(<></>)}
          {   
            com.map((index,i)=>(   
                <Card_com index={index} key={index._id}/>  
              
            ))
         }</div>
          </div>
        </div>
        <Fab variant="extended"  onClick={handleClick}  color="primary" sx={fabStyle} className="Rajout" >
           RESERVER
          </Fab>
      </div>
      <div><br/></div>
      </div>
    

       

     
  
      <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>CONFIRMATION DE LA RESERVATION</Modal.Title>
        </Modal.Header>
        <Modal.Body><h5>Vous allez effectuer une reservation</h5>
        <div class="row mt-2">
          Renseignez le nombre de places que vous souhaitez reserver  :
          <div class="col-md-6">
          
          <input type="number" 
          value={nombre_place}
          max={data.nombre_place_libre}
          min="1"
          onChange={(e) => setNombre_place(e.target.value)}/> 
          </div>
          <div class="col-md-5">
            <br/>
          <i> ( max. restants : {data.nombre_place_libre})</i></div>
          </div>
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={confirmerReservation}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={Annuler} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title>PAS AUTHENTIFIER</Modal.Title>
        </Modal.Header>
        <Modal.Body>Vous devez vous connecter pour pouvoir effectuer une reservation</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={Annuler}>
            Annuler
          </Button>
          <Button variant="primary" onClick={openForm}>
            Se connecter
          </Button>
        </Modal.Footer>
      </Modal>


      
    <Modal show={show2} onHide={close_vehicule} centered={true}>
          <Modal.Header closeButton ><span className='text_T' >VEHICULE DU CONDUCTEUR</span></Modal.Header>
        <div class="text_v"> 
        <div class="row mt-2 ">
        <div class="col-md-6"><span className='text_span'>Marque :</span> {vehicule[0]?.marque} </div>
        <div class="col-md-6"><span className='text_span'>Modèle :</span> {vehicule[0]?.modele} </div>
        </div>
        <div class="row mt-2">
        <div class="col-md-10">
        <span className='text_span '> Description :</span>  {vehicule[0]?.description} 
          </div>
        </div>
          <div className=' div_photo'>
          <img className='photo_v' src={Path+vehicule[0]?.photo} />
          </div>
         </div>
    </Modal> 
  </section>
  
       
  );
};

export default Reservation_finale;
