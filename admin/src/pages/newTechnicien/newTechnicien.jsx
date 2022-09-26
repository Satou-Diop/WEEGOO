import { useState } from "react";
import "./newTechnicien.css";
import axios from 'axios';
import { Link, useNavigate  } from "react-router-dom";
axios.defaults.withCredentials = true;

export default function NewTechnicien() {
  const navigate=useNavigate()
  const initialValues ={
    nom: "",
    prenom: "",
    telephone: "" ,
    login : "",
    password : "",
    genre : ""
  
  };
  const [inputs, setInputs] = useState(initialValues); 
  const [selectedValue, setSelectedValue] = useState("H");
  const handleChange2 = (event) => {
    setSelectedValue(event.target.value);
  };
  const new_Technicien=async(e)=>{
    e.preventDefault()
    var data = JSON.stringify({
      "nom": inputs.nom,
      "prenom": inputs.prenom,
      "telephone" : inputs.telephone,
      "login" : inputs.login,
      "password" : inputs.password,
      "genre": selectedValue
    });
  
    var config = {
      method: 'post',
      url: 'http://localhost:8000/technicien/',
      headers: { 
        'Content-Type': 'application/json', 
        withCredentials : true,
        },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      navigate("/Technicien")
      
    })
    .catch(function (error) {
      
    });

  }
  const  handleChange = (e) => {
    setInputs(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };
  return (
    <div className="newTech">
      <h1 className="newUserTitle">Nouveau Technicien</h1>

      <form onSubmit={new_Technicien}>
          <div className="newUserForm" >
            <div className="newUserItem">
              <label>Nom</label>
              <input type="text" name="nom" value={inputs.nom}  onChange={handleChange} placeholder="nom" required />
            </div>
            <div className="newUserItem">
              <label>Prenom</label>
              <input type="text" name="prenom" value={inputs.prenom}  onChange={handleChange} placeholder="prenom" required/>
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input type="email" name="login" value={inputs.login}  onChange={handleChange} placeholder="xxx@xxx.xx" required />
            </div>
            <div className="newUserItem">
              <label>Password</label>
              <input type="password" name="password" value={inputs.password}  onChange={handleChange} placeholder="password" required/>
            </div>
            <div className="newUserItem">
              <label>Phone</label>
              <input type="text" name="telephone" value={inputs.telephone}  onChange={handleChange} placeholder="7X XXX XX XX" required/>
            </div>
          
            <div className="newUserItem">
              <label>Gender</label>
              <div className="newUserGender">

                <input type="radio" name="genre"  id="male" value="H" checked={selectedValue === "H"} onChange={handleChange2}/>
                <label for="male">Homme</label>
                <input type="radio" name="genre" id="female" value="F" checked={selectedValue === "F"} onChange={handleChange2} />
                <label for="female">Femme</label>
                
              </div>
            </div>
          </div>
          <div className="newUserFormButton">
             <button className="newUserButton" type="submit">Create</button>
          </div>
      </form>
    </div>
  );
}
