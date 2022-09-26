import "./Log.css"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Visibility, VisibilityOff, AccountCircleRounded,Person,Lock} from "@material-ui/icons";
import React,  { useContext, useEffect,  useState }from 'react';
import { Link, useNavigate } from "react-router-dom";
import {  Typography } from "@mui/material";
import axios from 'axios';
import AuthContext from '../../Context/AuthProvider.js';
axios.defaults.withCredentials = true;
 
  

const Log = () => {
  const tab=1;
const [type, setType]=useState("password")
const [icone, setIcone]=useState(<VisibilityOff/>)
const voir= ()=> {
  if (type == "password") {
      setIcone(<Visibility/>)
      setType("text")
  } else {
    setType("password")
    setIcone(<VisibilityOff/>)
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
      url: 'http://localhost:8000/technicien/log',
      headers: { 
        'Content-Type': 'application/json', 
        },
        withCredentials : true,
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
      localStorage.setItem('active_tab', 1 );
      history("/")
      toast.success("Vous êtes connecté!!")
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
      <h1 className="h1">ESPACE ADMIN WEEGOO</h1>
        <form  onSubmit={handleClick}>
          <div class="inner-form">
            <br></br>
              <Typography className="headerC">
              <AccountCircleRounded sx={{ fontSize: "large"}} /><br/>
                <h2>CONNEXION</h2>
            <p>Connectez-vous en utilisant votre login et votre mot de passe</p>
              </Typography>
              {errormsg && <p className="erreur">{errormsg}</p>}
              <br/>
              <hr/>
              <div class="input-field first-wrap">
                <div class="icon-wrap">
                <Person/>
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
               <Lock/>
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
              
            <br/>
         </div>
      </form>
       </div>

      </div>
       
    );
};

export default Log;
