import "../../assets/Vendor/font-awesome/css/font-awesome.min.css";
import "../../assets/CSS/FormRegister.css"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Checkbox, Typography } from "@mui/material";
import AuthContext from '../../context/AuthProvider.js';
axios.defaults.withCredentials = true;
const FormRegister = () => {
const history = useNavigate();
const initialValues ={
  nom: "",
  prenom: "",
  date_naissance: "" ,
  telephone: "" ,
  login : "",
  password : "",
  confirmPassword : ""

};
const [inputs, setInputs] = useState(initialValues); 
const [formErrors, setFormErrors] = useState({});
const [isSubmit, setIsSubmit] = useState(false);
const [erreur, setErreur] = useState("");
useEffect(() => {
  console.log(formErrors);
  if (Object.keys(formErrors).length === 0 && isSubmit) {
    console.log(inputs);
    sendRequest()
  }
}, [formErrors]);

const sendRequest =()=>{
  var data = JSON.stringify({
    "nom": inputs.nom,
    "prenom": inputs.prenom,
    "telephone" : inputs.telephone,
    "date_naissance": inputs.date_naissance ,
    "login" : inputs.login,
    "password" : inputs.password
  });

  var config = {
    method: 'post',
    url: 'http://localhost:8000/auth/',
    headers: { 
      'Content-Type': 'application/json', 
      withCredentials : true,
      },
    data : data
  };
  
  axios(config)
  .then(function (response) {
    const Id = localStorage.getItem('Id')
    if (Id) {
      toast.success("Vous etes maintenant inscrit, finalisez votre reservation!!")
      history(`/Reservation/${Id}`)
    } else{
      toast.success("Vous etes maintenant inscrit, connectez-vous!!")
      history("/Log")
    }
  })
  .catch(function (error) {
    console.log(error)
    if(error.response.status==402)
    setErreur("Ce login appartient  déjà à un autre utilisateur");
  });
     
}


const  handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(inputs));
    if( Object.keys(formErrors).length === 0){
      setIsSubmit(true);
  }
    
    
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex2 = /^7[7,8,6,0,5]\d{7}$/;
    if (!values.nom) {
      errors.nom = "Veuillez saisir votre nom!";
    }
    if (!values.prenom) {
      errors.nom = "Veuillez saisir votre prenom!";
    }
    if (!values.login) {
      errors.login = "Veuillez saisir votre adresse mail!";
    } else if (!regex.test(values.login)) {
      errors.login = "Format du mail invalide !";
    }
    if (!values.telephone) {
      errors.telephone = "Veuillez saisir votre numero";
    }else if (!regex2.test(values.telephone.split(" ").join(""))) {
      errors.telephone = "Format du numero de telephone invalide!"}
    if (!values.date_naissance) {
      errors.nom = "Veuillez saisir votre date de naissance!";
    }
    if (!values.password) {
      errors.password = "Veuillez saisir le mot de passe";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Veuillez confirmer le mot de passe";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Mots de passe incompatibles !";
    }
    return errors;
  }; 
    return (
      <div>

      <div className="con3" >
        <form  onSubmit={handleSubmit}  novalidate>
        <div className="inner-form">
     
          <div className="icone_title" ><AppRegistrationIcon sx={{ fontSize: 30}}/></div>
          <div className="icone_title"> INSCRIPTION</div>
          <hr/>
        { erreur ?  <p className="erreur_message2">{erreur}</p> : <></>} 
        <div class="row mt-2">
        <div class="col-md-6">
        <label htmlFor="nom">Nom :</label><br/>
        <input
       
        minLength={2}
        onChange={handleChange}
        value={inputs.nom}
        type="text" name="nom" placeholder="nom" required/>
        <p className="erreur_message">{formErrors.nom}</p>
        </div>
        <div class="col-md-6">
         <label htmlFor="prenom">Prenom :</label><br/>
         <input
        
        minLength={2}
        onChange={handleChange}
        value={inputs.prenom}
        type="text" name="prenom" placeholder="prenom" required/>
        <p className="erreur_message">{formErrors.prenom}</p>
        </div>
        </div>
        <div class="row mt-1">
        <div class="col-md-6">
        <label htmlFor="date_naissance">Date de naissance :</label><br/>
          <input
         
          onChange={handleChange}
            value={inputs.date_naissance}
          type="date" name="date_naissance" placeholder="dd-mm-YYYY" required/>
          <p className="erreur_message">{formErrors.date_naissance}</p>
        </div>
        <div class="col-md-6">
          <label htmlFor="telephone">Telephone :</label><br/>
          <input
          onChange={handleChange}
            value={inputs.telephone}
          type="text" name="telephone" placeholder=" 7X XXX XX XX" required/>
          <p className="erreur_message">{formErrors.telephone}</p>
        </div>
        <div class="col-md-12">
          <label htmlFor="login">Login :</label><br/>
        <input
       
            onChange={handleChange}
            value={inputs.login}
            type="text" name="login" placeholder="XXXXX@XXXX.XX" required/>
            <p className="erreur_message">{formErrors.login}</p>
        </div>
        <div class="col-md-12">
          <label htmlFor="password">Mot de passe</label><br/>
          <input
         
          onChange={handleChange}
            value={inputs.password}
          type="password" name="password" required/>
          <p className="erreur_message">{formErrors.password}</p>
          </div>
          <div class="col-md-12">
          <label htmlFor="confirmPassword"> Confirmation mot de passe</label><br/>
          <input
         
          onChange={handleChange}
          value={inputs.confirmPassword}
          type="password" name="confirmPassword" />
          <p className="erreur_message">{formErrors.confirmPassword}</p>
  </div></div>
        <div className="div_button"> <button className="btn-search" type="submit" >S'inscrire</button></div>
        </div>
     
        </form>
        
      </div>

        </div>
    );
};

export default FormRegister
