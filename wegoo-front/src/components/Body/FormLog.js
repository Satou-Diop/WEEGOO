import "../../assets/Vendor/font-awesome/css/font-awesome.min.css";
import "../../assets/CSS/FormLog.css"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import React,  { useContext, useEffect,  useState }from 'react';
import { Link, useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Alert, Typography } from "@mui/material";
import axios from 'axios';
import AuthContext from '../../context/AuthProvider.js';
axios.defaults.withCredentials = true;
 
    
  

const FormLog = () => {
const [type, setType]=useState("password")
const [icone, setIcone]=useState(<VisibilityOffIcon/>)
const voir= ()=> {
  if (type == "password") {
      setIcone(<VisibilityIcon/>)
      setType("text")
  } else {
    setType("password")
    setIcone(<VisibilityOffIcon/>)
  }
}
const recovery= ()=> {
  history("/")
}
  const [inputs, setInputs] = useState({
    login : "",
    password : ""
  
  });
  const { loading, error, dispatch } = useContext(AuthContext);

  const [errormsg, setErrormsg] = useState();

  const history = useNavigate();
  const  handleChange = (e) => {
    setInputs(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };
  
  useEffect(() => {
    let interval; 
    if(errormsg){
      interval = setInterval(()=>{
      },1000 * 20)
      setErrormsg("");
    }
  
    
 },[]
 )
  

  const handleClick =  async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    var data = JSON.stringify({
      "login": inputs.login,
      "password": inputs.password
    });
    
    var config = {
      method: 'post',
      url: 'http://localhost:8000/auth/log',
      headers: { 
        'Content-Type': 'application/json', 
        },
        withCredentials : true,
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      
      const Id = localStorage.getItem('Id')
      if (Id) {
        toast.success("Connexion reussie, vous pouvez maintenant finaliser votre reservation !!")
        history(`/Reservation/${Id}`)
      } else{
        toast.success("Connexion reussie !!")
        history("/")
      }
      
    }
    )
    .catch(function (error) {
    if(error.response.status == 400){
      setErrormsg("Utilisateur introuvable")
    } else if(error.response.status == 404){
      setErrormsg("Login ou mot de passe incorrect")
    }else{
        setErrormsg("Erreur authentification")
     
    }
    
    });

}  
    return (
      <div>   
      <div class="con2">
        <form  onSubmit={handleClick}>
          <div class="inner-form">
            <br></br>
              <Typography className="headerC">
              <AccountCircleRoundedIcon sx={{ fontSize: 50}} /><br/>
                <h3>CONNEXION</h3>
            <p>Connectez-vous en utilisant votre login et votre mot de passe</p>
              </Typography>
              {errormsg && <p className="erreur">{errormsg}</p>}
              <hr/>
              <div class="input-field first-wrap">
                <div class="icon-wrap">
                <i class="fa fa-user" aria-hidden="true"></i>
               </div>
                <input 
                type="text"
                name="login" 
                required
                placeholder="@Login"
                value={inputs.login}
                onChange={handleChange}  />
              </div>
              <div class="input-field first-wrap" >
              <div class="icon-wrap">
                <i class="fa fa-unlock-alt" aria-hidden="true"></i>
                </div>
                <input
                type={type}
                name="password" 
                placeholder="Password"
                required
                value={inputs.password}
                onChange={handleChange} 
                />  
              </div>
              <div className="contentC">
              <div className="oublie" type="button" onClick={recovery}>Mot de passe oublié ?</div>
              <div className="voir"  type="button" onClick={voir}>{icone} </div>
              </div>
              
              <hr/>
              <div className="input-field fifth-wrap">
                <button class="btn-search" type="submit"  >Connexion</button>            
              </div>
              <br/>
              <span className="spanC"> 
               Vous n'avez pas de compte?  <Link to="/Inscription" className="linkC"> Inscrivez-vous!</Link> 
              </span> 
            <br/>
         </div>
      </form>
       </div>

      </div>
       
    );
};

export default FormLog;
