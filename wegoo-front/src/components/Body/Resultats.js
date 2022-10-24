import "../../assets/Vendor/font-awesome/css/font-awesome.min.css";
import "../../assets/CSS/Resultats.css"
import React, { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import useFetch from '../../useFetch.js';
import Cards from "../Card/Cards.js";
import { Spinner } from 'reactstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Radio from '@mui/material/Radio';
const Resultats = () => {
  const [Input, setInput] = useState( JSON.parse(localStorage.getItem('Search')));
  const [selectedValue, setSelectedValue] = useState("1");

  const handleChange2 = (event) => {
    setSelectedValue(event.target.value);
  };
  
  const navigate = useNavigate();
  const { data, loading, error, reFetch } = useFetch(
    `/trajet?point_depart=${Input.depart.toLowerCase()}&point_arrivee=${Input.destination.toLowerCase()}&date_depart=${Input.date}&option=${selectedValue}`
  );
  const handleSearch = () => {
  localStorage.setItem('Search', JSON.stringify(Input));
  reFetch();
  };
  const  handleChange = (e) => {
    setInput(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };
  
    return (
     <>
      <section className="sectionR">
     <div>
      <div className="breadcrumb">
      
      <div className="p2" onClick={() => navigate(-1)}><ArrowBackIcon sx={{fontSize: "medium"}}/> Home </div>
        <div className="p1">/ WEGGOO / TRAJET</div>
      </div>
      <div class="containerRes">
        
        <div class="entete" id="entete">
         Resultats
        </div>
        <div class="barre" id="barre">
          
        <div className="modification">
          <br></br>
        <h4 className="h5">Modifier Recherche</h4>
        <input
          type="text"
          name="depart"
          placeholder= {Input.depart} 
          onChange={handleChange} 
    
           
        /><br/>
        <input
          type="text"
          name="destination"
          placeholder= {Input.destination}
         onChange={handleChange}

        /><br/>
        <input
          type="date"
          name="date"
          placeholder={Input.date}
          onChange={handleChange}
          
        /> <br/>
        <button className="btn_barre"  onClick={handleSearch} >
         Rechercher
      </button> 
      <span/>
        </div>
        <br></br>
        <div className="filtre">
          <br></br>
        <h4 className="h4">Filtrer par :</h4>
        <Radio
        checked={selectedValue === "1"}
        onChange={handleChange2}
        value= "1"
        name="radio-buttons"
        
      /> Plus Recents <br/>
      <Radio
        checked={selectedValue === "2"}
        onChange={handleChange2}
        value="2"
        name="radio-buttons"
        
      />Prix le plus bas
       <br/>
      <Radio
        checked={selectedValue === "3"}
        onChange={handleChange2}
        value="3"
        name="radio-buttons"
        
      />Plus de places disponibles<br/>
        {/* <Checkbox ></Checkbox> Le plus recents
        <br/>
        <Checkbox></Checkbox> Prix le plus bas <br/>
        <Checkbox></Checkbox> Le Plus de places disponibles <br/> */}
        <button className="btn_filtre"  onClick={handleSearch} >
         Actualiser
      </button> 
     <span/><br/>
        </div>

        </div>

        <div class="resultats" >

        {
            loading ? ( <div className='Resultat1'><Spinner>
           
        </Spinner> <hr/>
        </div> ) :( <>
        <>{
            data.length ? (<div></div>):(<><div className='Resultat1'>Aucun trajet disponible pour cette recherche !!</div></>)
        }</> 
        <>{
            !error.length ? (<div></div>):(<><div className='Resultat1'>connexion</div></>)
        }</>
            {  
            
            data.map((index,i)=>(
                
                <Cards index={index} key={index._id}/>  
            ))
            }
            </>
            )
           }
        
        </div>

      </div>
     
     </div>
     </section>
     </>
    );
};

export default Resultats;
