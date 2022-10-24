
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import "../../assets/CSS/Banner.css"
import "../../assets/Vendor/font-awesome/css/font-awesome.min.css";
import image from "../../assets/image/City_driver.gif"; 

const   Banner = () => {
  const initialValues = { 
  depart: "",
  destination: "",
  date: ""
   };
  const [Input, setInput] = useState(initialValues);
  
const navigate = useNavigate();

const  handleChange = (e) => {
  setInput(prev=>({
    ...prev,
    [e.target.name] : e.target.value
  })
  )
};

const handleSearch = () => {
  localStorage.setItem('Search', JSON.stringify(Input));
  navigate("/listes")
 
  
};
    return (
      <section className='Bsection'>
        <div >
        <div  class="Btitre" >
        <h1>Avec Weegoo, le covoiturage n'a jamais été aussi simple !</h1>
        <br/> 
        </div>
 
        <div class="s002">
        <form>
        <div class="inner-form">
          <div class="input-field first-wrap">
            <div class="icon-wrap">
            <LocationOnOutlinedIcon color="black" sx={{ fontSize: 40 }}/>
            </div>
            <input name="depart" type="text" placeholder="Point de depart" 
            onChange={handleChange}
            value={Input.depart}/>
          </div>
          <div class="input-field first-wrap">
            <div class="icon-wrap">
            <LocationOnOutlinedIcon/>
            </div>
            <input name="destination" type="text" placeholder="Destination"
            onChange={handleChange}
            value={Input.destination}/>
          </div>
          <div class="input-field second-wrap">
            
            <input class="datepicker" name="date" type="date"
            onChange={handleChange}
            value={Input.date}
            
            />
          </div>
          
          <div class="input-field fifth-wrap">
            <button class="btn-search" type="button" onClick={handleSearch}>Rechercher</button>
          </div>
        </div>
      </form>
      
        </div>
       
        </div>
      </section>
    );

    
};

export default  Banner;
