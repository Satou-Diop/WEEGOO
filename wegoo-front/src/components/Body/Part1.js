import  React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faPaperPlane, faXmark} from '@fortawesome/free-solid-svg-icons'
import "../../assets/CSS/Part1.css"
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.withCredentials = true;
const fabStyle = {
  position: 'sticky ',
  left: '90%',
  bottom: 15,
  
};

export default function Part1() {
  const [isOpen,setIsOpen]=useState(false)
  const [Message, setMessage] = useState(""); 
  const changeState =()=>{
    const open = document.getElementById("card");
    if(isOpen== false){
      open.style.display="flex";
      open.style.width="300px";
      setIsOpen(true)
    }else{
      open.style.display="none";
      setIsOpen(false)
    }
    
  };
  
  const send_idee=async(e)=>{
    e.preventDefault();
    var data = JSON.stringify({
      "sender": "feedback",
      "text": Message
    });

    var config = {
      method: 'post',
      url: 'http://localhost:8000/message/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    axios(config)
    .then(function (response) {
      changeState()
    toast.success("Merci pour votre contribution !")
    })
    .catch(function (error) {
      console.log(error);
    });

    
    
  }
  return (
      <>
      <Fab sx={fabStyle} color="primary" aria-label="add" onClick={changeState}>
      <FontAwesomeIcon icon={faComments} />
     </Fab>
      <div class="card_sug" id="card">
      <form onSubmit={send_idee}>
      <div class="textarea">
        Avez-vous des idées à  partager avec notre équipe ?
        <input type="textarea" id="textarea" placeholder="Type your words here.." value={Message} onChange={(e)=>setMessage(e.target.value)} required/>
      </div>
      <div className='div_btn_idee'><button className='btn_idee' type='submit'><FontAwesomeIcon icon={faPaperPlane}  className="i" />  Envoyé</button></div>
      </form>
      <button onClick={changeState} class="close">
      <FontAwesomeIcon icon={faXmark} />
      </button>
     </div> 
    </>
  );
}
