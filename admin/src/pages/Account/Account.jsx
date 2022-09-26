import {CalendarToday,MailOutline,PhoneAndroid} from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Account.css";
import axios from "axios"
import AuthContext from '../../Context/AuthProvider.js';
import { useContext } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment"
import image from "../noAvatar.png"
axios.defaults.withCredentials = true;
const Path= "http://localhost:8000/"

export default function Account() {
  const [isSubmit, setIsSubmit] = useState(false);
  const { technicien } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const [errormsg, setErrormsg] = useState();
  const [formErrors, setFormErrors] = useState({});
  const initialValues ={
    ancien: "",
    nouveau: "",
    confirmation: "" ,
  };
  const [inputs, setInputs] = useState(initialValues); 
  const  handleChange = (e) => {
    setInputs(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };
  useEffect(() => {
  
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      modifier_password()
    }
  }, [formErrors]);
const  handleSubmit = (e) => {
  e.preventDefault();
  setFormErrors(validate(inputs));
  if( Object.keys(formErrors).length === 0){
    setIsSubmit(true);
  }
}
  const modifier_password = () => {
   
    var data = JSON.stringify({
      "login" : technicien?.login,
      "password": inputs.ancien,
      "new_password": inputs.nouveau
    });
    
    var config = {
      method: 'put',
      url: 'http://localhost:8000/technicien/'+technicien?._id,
      headers: { 
        'Content-Type': 'application/json', 
        },
        withCredentials : true,
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch({ type: "LOGIN_UPDATE", payload: response.data });
      setInputs(initialValues)
      toast.success("Mot de passe modifié !!")
    }
    )
    .catch(function (error) {
     if(error.response.status == 404){
     setErrormsg("Mot de passe incorrect")
     }else{
        setErrormsg("Erreur authentification")
     
    }
    
    });

}
const validate = (values) => {
  const errors = {};
  if (!values.nouveau) {
    errors.nouveau = "Veuillez saisir le mot de passe";
  } else if (values.nouveau.length < 4) {
    errors.nouveau = "Password must be more than 4 characters";
  } else if (values.nouveau.length > 10) {
    errors.nouveau = "Password cannot exceed more than 10 characters";
  }
  if (!values.confirmation) {
    errors.confirmation = "Veuillez confirmer le mot de passe";
  } else if (values.confirmation !== values.nouveau) {
    errors.confirmation = "Mots de passe incompatibles !";
  }
   
  return errors;
};
  return (
    <div className="user">
      <div className="userTitleContainer2">
        <h1 className="userTitle">Parametres de compte</h1>
     
      </div>
      <div className="userContainer2">

        <div className="userUpdate2">
        <div className="userShowTop">
            <img
              src={image}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{technicien?.prenom} {technicien?.nom}</span>
              <span className="userShowUserTitle">Technicien</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle"> Détails du compte</span>
           
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{moment(technicien?.date_naissance).format(" DD/ MM/ YYYY")}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{technicien?.telephone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{technicien?.login}</span>
            </div>
            <div className="userShowInfo">
              Sexe :
              <span className="userShowInfoTitle">{technicien?.genre}</span>
            </div>
          </div>
        </div>
        <div className="userShow">
        
        <span className="userUpdateTitle">Modifier le mot de passe</span>
          <br/>
          <div >
            <form onSubmit={handleSubmit}>
            <div class="INFO_DIV2">
              <div class="info">
              Ancien mot de passe
              </div>
              <div >
              <input name="ancien" type="password"  onChange={handleChange} value={inputs.ancien} required/>
              {errormsg ? <p className="erreur_message">{errormsg}</p>:<></>}
              </div>
             
            </div>
            
            <div class="INFO_DIV2">
            <div class="info">
              Nouveau mot de passe
              </div>
              <div >
              <input name="nouveau" type="password"  onChange={handleChange} value={inputs.nouveau} required/>
              <p className="erreur_message">{formErrors.nouveau}</p>
              </div>
            </div>

            <div class="INFO_DIV2">
            <div class="info">
              Confirmer le nouveau mot de passe
              </div>
              <div >
              <input name="confirmation" type="password"  onChange={handleChange} value={inputs.confirmation} required/>
              <p className="erreur_message">{formErrors.confirmation}</p>
              </div>
            </div>
            
            <div class="INFO_DIV2">
            <div class="info">
            
              </div>
              <div >
            <button className="userUpdateButton" type="submit">Valider</button>
              </div>
             
            </div>
           </form>
          </div>
          <br/>
          <div className="div_update">
          {/* {Element.n1 != null &&  Element.n2 != null && Element.n3 != null && Element.n4 != null  ? (<> 
            {Element.n1 == true &&  Element.n2 == true && Element.n3 == true && Element.n4 == true  ? (<>
            <button className="userUpdateButton" onClick={decliner_conducteur}disabled>Decliner</button>
             <button className="userUpdateButton" onClick={valider_conducteur}>Valider</button> </>):(<>
              <button className="userUpdateButton" onClick={decliner_conducteur}>Decliner</button> 
              <button className="userUpdateButton" onClick={valider_conducteur} disabled>Valider</button></>)}
          </>):(<>
              <button className="userUpdateButton" onClick={decliner_conducteur} disabled>Decliner</button> 
              <button className="userUpdateButton" onClick={valider_conducteur} disabled>Valider</button></>)} */}
              
                  
          
            </div>
        </div>

        
        
      </div>
    </div>
  );
}
