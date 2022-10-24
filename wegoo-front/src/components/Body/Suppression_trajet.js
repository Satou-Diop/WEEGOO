import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

function Suppression_trajet() {
    const location = useLocation();
    const navigate=useNavigate()
    const id_trajet = location.pathname.split("/")[3];
    const [showModal, setshowModal] = useState(true);
   
const annulerSuppression=()=>{
   setshowModal(false);
   
   navigate("/Trajet")
      }
   const supprimerTrajet=()=>{
    Supprimer()
      }

const Supprimer=()=>{
var config = {
    method: 'delete',
    url: 'http://localhost:8000/trajet/'+id_trajet+'',
    headers: { 
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGFiOTMxNzI5MWQ2NDUwYzBhZDJkOSIsImlhdCI6MTY1ODUwNjgwNywiZXhwIjoxNjU4NTA2ODM3fQ.5CzOof7qmieeOPD03TsAgugWVNFrIQ3-Yyn3PjURy0I', 
    'Content-Type': 'application/json'
    }
};

axios(config)
.then(function (response) {
  toast.success("Trajet supprimé !!")
   navigate("/Trajet")
})
.catch(function (error) {
    console.log(error);
});
    
}
    
  return (
   <div>
   
       <Modal show={showModal} onHide={annulerSuppression} centered={true}>
        <Modal.Header closeButton>
          Suppression trajet
        </Modal.Header>
        <Modal.Body>Voulez-vous vraiment supprimer le trajet ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={annulerSuppression}>
            Annuler
          </Button>
          <Button variant="danger" onClick={supprimerTrajet}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  )
}

export default Suppression_trajet