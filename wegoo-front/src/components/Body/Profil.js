import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AuthContext from "../../context/AuthProvider.js";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import "../../assets/CSS/Profil.scss"
import { Input, Tooltip } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import profil_picture from "../../assets/image/noAvatar.png"
import { Link, useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import moment, { relativeTimeRounding } from "moment"
import useFetch from '../../useFetch.js';
import VerifiedIcon from '@mui/icons-material/Verified';
import Stepper1 from './Stepper.js';
const Path= "http://localhost:8000/"
axios.defaults.withCredentials = true;

function Profil() {
  const {user} = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/vehicule/${user?._id}`);
  const [vehiculeModif,setvehiculeModif]=useState([]);
  useEffect(() => {
    if(data)
    setvehiculeModif(data)
  }, [data])
  const {dispatch } = useContext(AuthContext);
  const [img, setImg] = useState(profil_picture)
  const [img2, setImg2] = useState([])
  const [imgVehicule, setImgVehicule] = useState([])
  const initialValues ={
    nom: user?.nom,
    prenom: user?.prenom,
    date_naissance: user?.date_naissance ,
    telephone: user?.telephone ,
    login : user?.login, 
  };
  
const [modifParams,setModifParams]=useState(initialValues);
const [vehicule,setvehicule]=useState({ 
  marque : "",
  modele:"",
  photo:"",
  description:""
});
const  onImageChangeVehicule = event => {
  if (event.target.files && event.target.files[0]) {
  let image = event.target.files[0];
  setImgVehicule(image)
        }
      };
const ajouter_vehicule = ()=>{
  var FormData = require('form-data');
  var data = new FormData();
  data.append('photo', imgVehicule );
  data.append('marque', vehicule.marque);
  data.append('modele', vehicule.modele);
  data.append('description', vehicule.description);
  data.append('conducteur', user?._id);
var config = {
  method: 'post',
  url: 'http://localhost:8000/vehicule',
  headers: { 
    "Content-Type": "multipart/form-data",
  },
  data : data
};

  
  axios(config)
  .then(function (response) {
   setShow2(false)
      toast.success("Vehicule ajouté !")
      window.location.reload();
  })
  .catch(function (error) {
      console.log(error)
  });
}
const update_vehicule = ()=>{
  var FormData = require('form-data');
  var data = new FormData();
  data.append('photo', imgVehicule );
  data.append('marque', vehicule.marque);
  data.append('modele', vehicule.modele);
  data.append('description', vehicule.description);
  data.append('conducteur', user?._id);
var config = {
  method: 'put',
  url: 'http://localhost:8000/vehicule',
  headers: { 
    "Content-Type": "multipart/form-data",
  },
  data : data
};

  
  axios(config)
  .then(function (response) {
   setShow2(false)
      toast.success("Vehicule modififie !")
      window.location.reload();
  })
  .catch(function (error) {
      console.log(error)
  });
}
const navigate=useNavigate()
const [show, setShow] = useState(false);
const [show2, setShow2] = useState(false);
const [show3, setShow3] = useState(false);
const [show4, setShow4] = useState(false);
 const[visible,setVisible]=useState(true)
 useEffect(() => {
   if(user?.photo)
    setImg(Path+user?.photo)
  
 }, [user?.photo])


const modifier =()=>{
setShow(true)
}
const open_ajout =()=>{
  setShow2(true)
  }
  const open_modification =()=>{
    setShow4(true)
    }
    const close_modification =()=>{
      setShow4(false)
      }
  const open_photo =()=>{
    setShow3(true)
    }
    const close_photo =()=>{
      setShow3(false)
      }

  const close_ajout =()=>{
    setShow2(false)
    }
const annuler_modification=()=>{
  {user?.photo ? (setImg(Path+user?.photo)):(setImg(profil_picture))}
  setVisible(true)
}
const updateUser = ()=>{
  var data = JSON.stringify({
    "nom": modifParams.nom,
    "prenom": modifParams.prenom,
    "telephone" : modifParams.telephone,
    "date_naissance": modifParams.date_naissance ,
    "login" : modifParams.login,
  });

  var config = {
    method: 'put',
    url: 'http://localhost:8000/user/'+user?._id,
    headers: { 
      'Content-Type': 'application/json', 
      withCredentials : true,
      },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    dispatch({ type: "LOGIN_UPDATE", payload: response.data });
    setShow(false)
      toast.success("La modification est enregistrée ! ")
  })
  .catch(function (error) {
      console.log(error)
  });
}
const  onImageChange = event => {
  if (event.target.files && event.target.files[0]) {
  let image = event.target.files[0];
  setImg2(image)
  setImg(URL.createObjectURL(image))
  setVisible(false)
        }
      };
const update_photo = ()=>{
  var FormData = require('form-data');
  var data = new FormData();
  data.append('photo', img2 );
  
  var config = {
    method: 'post',
    url: 'http://localhost:8000/user/upload/'+user?._id,
    headers: { 
      "Content-Type": "multipart/form-data",
    },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    dispatch({ type: "LOGIN_UPDATE", payload: response.data });
    toast.success("Votre photo de profil a été mofifiée!!")
    setVisible(true)
  })
  .catch(function (error) {
    console.log(error);
  });

}

const handleClose = () =>{ 
  setModifParams(initialValues)
  setShow(false)
  };

  const  handleChange = (e) => {
    setModifParams(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };

  const  handleChange2 = (e) => {
    setvehicule(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };
  const  handleChange3 = (e) => {
    setvehiculeModif(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };
  return (
   <>
<section className='back'>
    <div class="container ">
    <div class="main-body">
       <br/>
          <div class=" row gutters-sm">
            {/* Blocs users */}
            <div class="col-md-3 mb-2">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex flex-column align-items-center text-center">
                  <div hidden={visible}  className='annuler_modif' onClick={annuler_modification}><Tooltip title="Annuler modification"><ClearRoundedIcon/></Tooltip>  </div>
                  <div class="profile-pic">
                  <label class="-label" for="file">
                    <span class="glyphicon glyphicon-camera"></span>
                    <span>Modifier Photo</span>
                  </label>
                  <input id="file" type="file" onChange={onImageChange} />
                  <img src={img} alt="Photo_user" />
                  </div>
                  <button hidden={visible} onClick={update_photo} className="btn_modif"> Save Change</button>
                    <div class="mt-3">
                      <h4>{user?.prenom} {user?.nom} {user?.isVerified ?(<><VerifiedIcon color="primary"/></>):(<></>)}</h4>
                      <p class="text-secondary mb-1">Inscrit depuis le </p>
                      <p class="text-muted font-size-sm">{moment(user?.createdAt).format("DD MMMM YYYY")} </p>
   
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            <div class="col-md-8">
                {/* Informations sur le profil */}
              <div class="card mb-3">
                <div class="card-body">
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0 textP">Nom Complet</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                     {user?.prenom} {user?.nom}
                    </div>
                  </div>
                  <br/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0 textP">Email</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                      {user?.login}
                    </div>
                  </div>
                  <br/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0 textP">Telephone</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                     {user?.telephone}
                    </div>
                  </div>
                  <br/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0 textP">Date de naissance</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    {moment(user?.date_naissance).format("DD/MM/YYYY")}
                    </div>
                  </div>
                  
                 
                  <div class="row">
                    <div className='Pbutton'>
                      <button className='ButtonP' onClick={modifier}>Modifier Profil</button>

                    </div>
                  </div>
                </div>
              </div>
               {/* Complement  profil */}
              <div class="card mb-3">
                <div class="card-body">
                <div class="row">
                      <h4>Completez votre profil conducteur</h4>
                <div class="row color">
                <Stepper1/>
                </div>
                </div>
                
                </div>
              </div>
               {/* Informations sur le vehicule */}
              <div class="card mb-3">
                <div class="card-body">
                <div class="row">
                <div >
                      <h4>Véhicule</h4>
                </div>
                </div>
                {!data.length ? (<>
                  <div class="row color">
                <button className='btn_vehicule' onClick={open_ajout} to={"/"}><AddCircleOutlineOutlinedIcon fontSize="medium"  />    Ajouter un vehicule
                </button> </div>
                </>):(<>
                 
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-3 textP">Marque</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                      {data[0]?.marque}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-3 textP">Modèle</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                      {data[0]?.modele}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-3 textP">Description</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                      {data[0]?.description}
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-3 textP"> Photo</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                      <buttton className="btn_modif" onClick={open_photo}> Voir photo</buttton>
                    </div>
                  </div>
                  <div className=' Pbutton'>
                      <button className='ButtonP' onClick={open_modification}>Modifier Vehicule</button>

                   </div>

                  
                </>)}
                </div>
              </div>
               {/* Verification profil */}
              <div class="card mb-3">
                <div class="card-body">
                <div class="row">
                      <h4>Vérification du profil</h4>
                      
                </div>
                <div class="row color">
                <Link to={"/"}><AddCircleOutlineOutlinedIcon fontSize="medium" />  Verifier par votre numero de telephone 
                </Link> </div>
                <div class="row color">
                <Link to={"/"}><AddCircleOutlineOutlinedIcon fontSize="medium" />  Verifier par votre piece d'identite
                </Link> </div>
                <div class="row color">
                <Link to={"/"}><AddCircleOutlineOutlinedIcon fontSize="medium" />  Verifier par votre adresse mail
                </Link> </div>
                </div>
              </div>
            </div>
            
          </div>

        </div>
    </div>

        <Modal show={show} onHide={handleClose} centered={true}>
          <Modal.Header closeButton>
            <Modal.Title className='modal_title'>Modifications du profil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
              <div class=" mb-3">
                <div >
                <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Nom</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange}
                    value={modifParams.nom}
                    type="text" name="nom" placeholder="nom" required/>
                    </div>
                </div>
                <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Prénom</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange}
                    value={modifParams.prenom}
                    type="text" name="prenom" placeholder="nom" required/></div>
                  </div> 
                  <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Email</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange}
                    value={modifParams.login}
                    type="text" name="login" placeholder="login" required/>
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Telephone</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange}
                    value={modifParams.telephone}
                    type="text" name="telephone" placeholder="telephone" required/>
                     
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Date de naissance</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange}
                    value={modifParams.date_naissance}
                    type="date" name="date_naissance" placeholder="date_naissance" required/>
                    </div>
                  </div>
                  <hr/>
                  
                </div>
              </div>
             
            </div>
          </Modal.Body>
          <Modal.Footer>
             <Button variant="danger" onClick={handleClose}>
              Annuler
            </Button>
            <Button variant="primary" onClick={updateUser}>
              Enregistrer modifications
            </Button>
           
          </Modal.Footer>
        </Modal> 

        <Modal show={show2} onHide={close_ajout} centered={true}>
          <Modal.Header closeButton>
            <Modal.Title className='modal_title'>Ajouter un véhicule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
              <div class=" mb-3">
                <div >
                <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Marque</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange2}
                    value={vehicule.marque}
                    type="text" name="marque" placeholder="marque " required/>
                    </div>
                </div>
                <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Modèle</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange2}
                    value={vehicule.modele}
                    type="text" name="modele" placeholder="modele" required/></div>
                  </div> 
                  <hr/>
                  
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Description</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange2}
                    value={vehicule.description}
                    type="text" name="description" placeholder="description" required/>
                     
                    </div>
                  </div> <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Photo</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input 
                    type="file" name="photo" placeholder="photo" onChange={onImageChangeVehicule}/>
                    </div>
                  </div>
                 
                  
                  
                </div>
              </div>
             
          </div>
          </Modal.Body>
          <Modal.Footer>
             <Button variant="danger" onClick={close_ajout}>
              Annuler
            </Button>
            <Button variant="primary"  onClick={ajouter_vehicule}>
              Ajouter
            </Button>
           
          </Modal.Footer>
        </Modal> 

        <Modal show={show3} onHide={close_photo} centered={true}>
          <Modal.Header closeButton >Photo de votre vehicule</Modal.Header>
          <img className='photo_vehicule' src={Path+data[0]?.photo}/>
        </Modal> 

        <Modal show={show4} onHide={close_modification} centered={true}>
          <Modal.Header closeButton>
            <Modal.Title className='modal_title'>Modifier votre véhicule</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
              <div class=" mb-3">
                <div >
                <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Marque</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange3}
                    value={vehiculeModif[0]?.marque}
                    type="text" name="marque" placeholder="marque" required/>
                    </div>
                </div>
                <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Modèle</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange3}
                    value={vehiculeModif[0]?.modele}
                    type="text" name="modele" placeholder="modele" required/></div>
                  </div> 
                  <hr/>
                  
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Description</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handleChange3}
                    value={vehiculeModif[0]?.description}
                    type="text" name="description" placeholder="description" required/>
                     
                    </div>
                  </div> <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Photo</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input 
                    type="file" name="photo" placeholder="photo" onChange={onImageChangeVehicule}/>
                    </div>
                  </div>
                 
                  
                  
                </div>
              </div>
             
          </div>
          </Modal.Body>
          <Modal.Footer>
             <Button variant="danger" onClick={close_modification}>
              Annuler
            </Button>
            <Button variant="primary"  onClick={close_modification}>
              Enregistrer Modifications
            </Button>
           
          </Modal.Footer>
        </Modal> 
</section>


   </>
  )
}

export default Profil