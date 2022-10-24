import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../useFetch';
axios.defaults.withCredentials = true;

function Annulation_reservation() {
    const location = useLocation();
    const navigate=useNavigate()
    const {user} = useContext(AuthContext);
    const [showModal, setshowModal] = useState(true);
    const [conducteur, setconducteur] = useState([]);
    const id_res = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`/reservation/${id_res}`);
 useEffect(() => {
   if(data)
   setconducteur(data)
 }, [data])
 
const retour=()=>{
   setshowModal(false);
   
   navigate("/Mes_reservations")
      }
   const annuler_reservation=()=>{
    Annuler()
      }

const Annuler=()=>{

var config = {
    method: 'delete',
    url: 'http://localhost:8000/reservation/'+id_res+'',
    headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGFiOTMxNzI5MWQ2NDUwYzBhZDJkOSIsImlhdCI6MTY1ODUwNjgwNywiZXhwIjoxNjU4NTA2ODM3fQ.5CzOof7qmieeOPD03TsAgugWVNFrIQ3-Yyn3PjURy0I', 
    'Content-Type': 'application/json'
    }
};

axios(config)
.then(function (response) {
  toast.success("Reservation Annulée !!")
  updatePlace()
  sendNotification()
  sendNotification2()
   navigate("/Mes_reservations")
})
.catch(function (error) {
    console.log(error);
});
    
}
const updatePlace=()=>{
    var data2 = JSON.stringify({
      "nombre_place_libre": 1, 
    });
    
    var config = {
      method: 'put',
      url: 'http://localhost:8000/trajet/annuler/'+conducteur?.id_trajet+'',
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
const sendNotification=()=>{
    var data = JSON.stringify({
      "title": "Weegoo",
      "message": "Vous venez d'annuler votre reservation",
      "origin": "systeme",
      "user": user?._id
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
      "title": "Weegoo",
      "message": `L'utilisateur ${user?.prenom}  ${user?.nom} vient d'annuler sa reservation.`,
      "origin": user?._id,
      "user": conducteur?.id_conducteur
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


  return (
   <div>
   
       <Modal show={showModal} onHide={retour} centered={true}>
        <Modal.Header closeButton>
          Annulation de reservation
        </Modal.Header>
        <Modal.Body>Voulez-vous vraiment annuler cette reservation ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={retour}>
            NON
          </Button>
          <Button variant="danger" onClick={annuler_reservation}>
            OUI
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  )
}

export default Annulation_reservation