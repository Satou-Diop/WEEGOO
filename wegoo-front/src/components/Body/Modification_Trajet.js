import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import "../../assets/CSS/Trajet.css"
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../useFetch.js';
import { Input } from 'reactstrap';
axios.defaults.withCredentials = true;

function Modification_trajet() {
    const location = useLocation();
    const navigate=useNavigate()
    const id_trajet = location.pathname.split("/")[3];
    const { data, loading, error } = useFetch(`/trajet/${id_trajet}`);
    const [showModal, setshowModal] = useState(true);
    const [inputs, setInputs]=useState([]);
    
    useEffect(() => {
      if(data){
        setInputs(data)
      }
    }, [data])
    
     
    const  handleChange = (e) => {
    setInputs(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };

  const annulerModification=()=>{
   setshowModal(false)
   navigate("/Trajet")
      }
   const modifierTrajet=()=>{
    Modifier()
      }

const Modifier=()=>{
    var data = JSON.stringify({
        "point_depart": inputs.point_depart,
        "point_arrivee": inputs.point_arrivee,
        "date_depart": inputs.date_depart ,
        "heure_depart" : inputs.heure_depart,
        "nombre_place_libre" : inputs.nombre_place_libre,
        "prix_place" :inputs.prix_place,
        "frequence_trajet" : inputs.frequence_trajet
      });
      
    
      var config = {
        method: 'put',
        url: 'http://localhost:8000/trajet/'+id_trajet+'',
        headers: { 
          'Content-Type': 'application/json', 
          withCredentials : true,
          },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        toast.success("Trajet modifié !!")
        navigate("/Trajet")
      
      })
      .catch(function (error) {
        toast.error("Trajet non modifié !!")
        
      }); 
}
    
  return (
   <div>
    
   
       <Modal show={showModal} onHide={annulerModification} centered={true}>
        <Modal.Header closeButton>
          <Modal.Title className='modaltitle2'>Modification trajet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         {loading ? (<></>):(<>
          <form >
          <div class="row ">
          <div class="col-md-6">
          <label className='modal_label' htmlFor="point_depart">Point de départ</label>
          <Input
          value={inputs?.point_depart}
          onChange={handleChange}
          type="text" name="point_depart" required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
            </div>
            <div class="col-md-6">
          <label className='modal_label' htmlFor="point_arrivee">Point d'arrivée :</label><br/>
          <Input
          onChange={handleChange}
          value={inputs?.point_arrivee}
          type="text" name="point_arrivee"  required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div></div>
          
          <div class="row ">
          <div class="col-md-6">
          <label className='modal_label' htmlFor="date_depart">Date :</label><br/>
          <Input
          onChange={handleChange}
          value={inputs?.date_depart}
          type="text" name="date_depart" placeholder={data.date_depart} required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div>
          <div class="col-md-6">
          <label className='modal_label' htmlFor="heure_depart">Heure :</label><br/>
          <Input
          onChange={handleChange}
          value={inputs?.heure_depart}
          type="time" name="heure_depart" placeholder={data.heure_depart} required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div></div>
         
          <div class="row mt-2">
          <div class="col-md-6">
          <label className='modal_label' htmlFor="nombre_place_libre">Nombre de place</label><br/>
          <Input
          onChange={handleChange}
          min={1}
          value={inputs?.nombre_place_libre}
          type="number" name="nombre_place_libre" placeholder={data.nombre_place_libre} required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
         </div>
         <div class="col-md-6">
          <label className='modal_label' htmlFor="prix_place">Prix : </label><br/>
          <Input
          onChange={handleChange}
          value={inputs?.prix_place}
          type="number" name="prix_place" placeholder={data.prix_place} required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div></div>
          
          <div class="col-md-6">
          <label className='modal_label' htmlFor="frequence_trajet">Frequence Trajet :</label><br/>
          <Input
          onChange={handleChange}
          value={inputs?.frequence_trajet}
          type="text" name="frequence_trajet" placeholder={data.frequence_trajet} required/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div></form>
         </>)}
      </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={annulerModification}>
            Annuler
          </Button>
          <Button variant="success" onClick={modifierTrajet}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
   </div>
  )
}

export default Modification_trajet