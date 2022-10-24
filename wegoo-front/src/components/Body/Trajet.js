import "../../assets/CSS/Trajet.css"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../../context/AuthProvider.js';
import Card_trajet from "../Card/Card_trajet";
import Button from 'react-bootstrap/Button';
import useFetch from "../../useFetch.js";
import { Input, Spinner } from "reactstrap";
import SyncIcon from '@mui/icons-material/Sync';
axios.defaults.withCredentials = true;

const Trajet = () => {
const {user} = useContext(AuthContext);
const { loading1, error1, dispatch } = useContext(AuthContext);
const history = useNavigate();
const [show, setShow] = useState(false);
const initialValues={
  point_depart: "",
  point_arrivee: "",
  date_depart: "" ,
  heure_depart : "",
  nombre_place_libre : "",
  prix_place :"",
  frequence_trajet : "",
  conducteur_id : " "

}
const [inputs, setInputs] = useState(initialValues); 
const [formErrors, setFormErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);
const { data, loading, error, reFetch } = useFetch(`/trajet?conducteur_id=${user._id}`)
const actualiser=()=>{
reFetch()
}
useEffect(() => {
  console.log(formErrors);
  if (Object.keys(formErrors).length === 0 && isSubmit) {
    console.log(inputs);
    sendRequest()
  }
}, [formErrors]);

const handleClose = () =>{ 
    setShow(false)
    };
const ajoutForm = () =>{ 
        setInputs(initialValues)
        setShow(true)
        };
const sendRequest =()=>{
  var data = JSON.stringify({
    "point_depart": inputs.point_depart.toLowerCase(),
    "point_arrivee": inputs.point_arrivee.toLowerCase(),
    "date_depart": inputs.date_depart ,
    "heure_depart" : inputs.heure_depart,
    "nombre_place_libre" : inputs.nombre_place_libre,
    "prix_place" :inputs.prix_place,
    "frequence_trajet" : inputs.frequence_trajet,
    "conducteur_id" : user._id
  });
  

  var config = {
    method: 'post',
    url: 'http://localhost:8000/trajet/',
    headers: { 
      'Content-Type': 'application/json', 
      withCredentials : true,
      },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    setShow(false)
    window.location.reload();
    toast.success("Trajet ajouté !!")
  
  })
  .catch(function (error) {
    setShow(false)
    toast.error("Trajet non ajouté !!")
    
  });
     
}

const  handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
    // setFormErrors(validate(inputs));
    // setIsSubmit(true)
  };
  const  handleChange = (e) => {
    setInputs(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };

  const validate = (values) => {
    const errors = {};
    if (!values.date_depart) {
      errors.date_depart = "Required";
    }
    if (!values.date_arrivee) {
      errors.date_arrivee = "Veuillez saisir le !";
    }
    
    return errors;
  };
  
  const location = useLocation();
  // const [id_trajet,setId]= useState(location.state.id_trajet);
  // useEffect(() => {
   
  //   // if (Object.keys(id_trajet).length === 0 ) {
  //   //  alert("modifie")
  //   // }
  // }, [id_trajet]);
    return (
    <div className="TrajetB">

      <div class="TBDIV1">
        <div class="TB_ACTUALISER">
          <div className="actualiser" onClick={actualiser}>
              <SyncIcon  sx={{ fontSize: 30 }}/>Actualiser
          </div>
        </div>
        <div class="TB_AJOUTER">
              <button className="Bajout" onClick={ajoutForm}> Nouveau Trajet</button>
        </div>
      </div>

      <div class="TBDIV2">
        <div class="TB_titre">
          <h2 className="titre">
              Trajets Publiés
          </h2>
        </div>
        <div class="TB_content">
          {
          loading ? 
          (<div className='Resultat'>
             <p ><Spinner></Spinner> </p>
            </div> ) :
          ( <>
            <>{ data.length ? (<div></div>):(<><div className='Res_trajet'>Vous n'avez encore publier aucun trajet</div></>)}</> 
            {  
            data.map((index,i)=>( 
                <Card_trajet index={index} key={index._id}/>  
            ))
            }
            </>)
           }
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered={true}>
        
         <Modal.Header closeButton>
            <Modal.Title className="modaltitle">Ajout Trajet</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <form >
          <div class="row mt-2">
          <div class="col-md-6">
          <label className="modal_label" htmlFor="point_depart">Point de départ</label>
          <Input
          onChange={handleChange}
          value={inputs.point_depart}
          type="text" name="point_depart" placeholder="point_depart" required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
            </div>
            <div class="col-md-6">
          <label className="modal_label" htmlFor="point_arrivee">Point d'arrivée :</label>
          <Input
          onChange={handleChange}
          value={inputs.point_arrivee}
          type="text" name="point_arrivee" placeholder="point_arrivee" required/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div>
          </div>
          <div class="row mt-2">
          <div class="col-md-6">
          <label className="modal_label" htmlFor="date_depart">Date :</label><br/>
          <Input
          onChange={handleChange}
          value={inputs.date_depart}
          type="date" name="date_depart" placeholder="date_depart" required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div>
          <div class="col-md-6">
          <label className="modal_label" htmlFor="heure_depart">Heure :</label><br/>
          <Input
          onChange={handleChange}
          value={inputs.heure_depart}
          type="time" name="heure_depart" placeholder="heure_depart" required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div>
          </div>
          <div class="row mt-2">
          <div class="col-md-6">
          <label className="modal_label" htmlFor="nombre_place_libre">Nombre de place</label><br/>
          <Input
          min={1}
          onChange={handleChange}
          value={inputs.nombre_place_libre}
          type="number" name="nombre_place_libre" placeholder="nombre_place_libre" required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div>
          <div class="col-md-6">
          <label className="modal_label" htmlFor="prix_place">Prix : </label><br/>
          <Input
          min={0}
          onChange={handleChange}
          value={inputs.prix_place}
          type="number" name="prix_place" placeholder="prix_place" required/><br/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div>
          </div>
          <div class="row mt-2">
          <div class="col-md-6">
          <label className="modal_label" htmlFor="frequence_trajet">Frequence Trajet :</label><br/>
          <Input
          onChange={handleChange}
          value={inputs.frequence_trajet}
          type="text" name="frequence_trajet" placeholder="frequence_trajet" required/>
          {/* <p className="erreur_message">{formErrors.nom}</p> */}
          </div></div>
      </form>
      </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Ajouter
            </Button>
          </Modal.Footer>
      </Modal>  

    </div>

    );
};

export default Trajet;
