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

function Accepter() {
    const {user}=useContext(AuthContext)
    const location = useLocation();
    const navigate=useNavigate()
    const [showModal, setshowModal] = useState(true);
    const [result, setResult] = useState([]);
    const id_res = location.pathname.split("/")[2];
    const {data,loading} =useFetch("/reservation/"+id_res)
   useEffect(() => {
     if(data)
     setResult(data)
   },)
   
  const sendNotification=()=>{
    var data = JSON.stringify({
      "title": "Acceptation - Weegoo",
      "message": `${user?.prenom} ${user.nom} vient d'accepter la reservation effectuee sur son trajet.  `,
      "origin": "systeme",
      "user": result?.id_passager,
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
  
    });
       
  }
    const accepter=()=>{
        var data2 = JSON.stringify({
          "confirmation": true, 
        });
        
        var config = {
          method: 'put',
          url: 'http://localhost:8000/reservation/'+id_res+'',
          headers: { 
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGFiOTMxNzI5MWQ2NDUwYzBhZDJkOSIsImlhdCI6MTY1ODUwNjgwNywiZXhwIjoxNjU4NTA2ODM3fQ.5CzOof7qmieeOPD03TsAgugWVNFrIQ3-Yyn3PjURy0I', 
            'Content-Type': 'application/json'
          },
          data : data2
        };
        
        axios(config)
        .then(function (response) {
          sendNotification()
          toast.success("Reservation acceptée")
          navigate("/Mes_reservations")
        })
        .catch(function (error) {
          console.log(error);
        });
           
    }
    const retour=()=>{
        setshowModal(false);
        
        navigate("/Mes_reservations")
           }

  return (
    <>
     <Modal show={showModal} onHide={retour} centered={true}>
        <Modal.Header closeButton>
          Acceptation
        </Modal.Header>
        <Modal.Body>Vous allez accepter la demande de reservation de ce passager ...</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={retour}>
           Annuler
          </Button>
          <Button variant="success" onClick={accepter}>
            Accepter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Accepter