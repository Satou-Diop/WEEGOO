import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../assets/CSS/Card_Res.css"
import { Avatar, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { format } from "timeago.js";
import moment from "moment"
import axios from 'axios';
import useFetch from '../../useFetch.js';
import profil_picture from "../../assets/image/noAvatar.png"
import { Modal } from 'reactstrap';
const Path= "http://localhost:8000/"
axios.defaults.withCredentials = true;

export const  Card_Res1= ({ index }) =>{

    const [trajet,setTrajet]=useState([])
    const [user1,setUser]=useState([])
    const { data, loading, error } = useFetch(`/trajet?_id=${index?.id_trajet}`);
    const { data2, loading2, error2 } = useFetch(`/user/${index?.id_conducteur}`);
    console.log(data2)
    useEffect(() => {
        if(data){
         setTrajet(data)
        }
    })
    
 useEffect(() => {  
     var data3 = '';
     var config = {
       method: 'get',
       url: 'http://localhost:8000/auth/user/'+index?.id_conducteur+'',
       headers: { 
         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGFiOTMxNzI5MWQ2NDUwYzBhZDJkOSIsImlhdCI6MTY1ODUwNjgwNywiZXhwIjoxNjU4NTA2ODM3fQ.5CzOof7qmieeOPD03TsAgugWVNFrIQ3-Yyn3PjURy0I'
       },
       data : data3
     };
     
     axios(config)
     .then(function (response1) {
      setUser(response1.data)
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    )
    
        
   return (
    <>
    
    <div class="GRID_RES">

        <div class="info_RES">
            <div class="info_content">
            Vous avez réserver <span>{index.nombre_place} </span>place(s)  du trajet : <span>{trajet[0]?.point_depart} - {trajet[0]?.point_arrivee} </span> 
            prévu pour le : <u>{moment(trajet[0]?.date_depart).format("DD MMMM YYYY ")}</u> à <u>{trajet[0]?.heure_depart}</u><br/> 
            </div>
            <div class="button_RES">
                
                
                    <Link className='annuler' to={`/annulation/${index._id}`}>
                    <div >
                     Annuler la réservation
                    </div>
                    </Link>
                
                
                
                
            </div>
        </div>
        
        <div class="user_RES">
            <span>Publié par :</span>
            {user1?.prenom} {user1?.nom}
            <Avatar  src={user1?.photo ? (Path+user1?.photo):(profil_picture)} sx={{ width: 35, height: 35}} />
            {user1?._id ? (<>
            <Link to={`/User/${user1?._id}`}>
            <button>Voir Profil</button>
            </Link>
            </>):(<></>)}
        </div>
        
    </div>
</>
  )
}

export const  Card_Res2= ({ index }) =>{
    const [trajet,setTrajet]=useState([])
    const [user1,setUser]=useState([])
    const { data, loading, error } = useFetch(`/trajet?_id=${index?.id_trajet}&confirmation=null`);
    const { data2, loading2, error2 } = useFetch(`/user/${index?.id_passager}`);
    
    useEffect(() => {
        if(data){
         setTrajet(data)
        }
    })
    
 useEffect(() => {  
     var data3 = '';
     var config = {
       method: 'get',
       url: 'http://localhost:8000/auth/user/'+index?.id_passager+'',
       headers: { 
         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGFiOTMxNzI5MWQ2NDUwYzBhZDJkOSIsImlhdCI6MTY1ODUwNjgwNywiZXhwIjoxNjU4NTA2ODM3fQ.5CzOof7qmieeOPD03TsAgugWVNFrIQ3-Yyn3PjURy0I'
       },
       data : data3
     };
     
     axios(config)
     .then(function (response1) {
      setUser(response1.data)
     })
     .catch(function (error) {
       console.log(error);
     });
    }
    )
    
        
   return (
    <>
    
    <div class="GRID_RES2">

        <div class="info_RES2">
            <div class="info_content2">
            Réservation pour le trajet : <span>{trajet[0]?.point_depart} - {trajet[0]?.point_arrivee}</span><br/>
            Prévu le : <u>{moment(trajet[0]?.date_depart).format("DD MMMM YYYY ")}</u> à <u>{trajet[0]?.heure_depart}</u><br/>
            Nombre de places reservées : {index?.nombre_place}
            </div>
            <div class="button_RES2">
               {index?.confirmation ? (<>
               <button disabled> Acceptée</button>
               </>):(<> 
                <Link to={"/"}>
                <Tooltip title="Refusé" className='refuser'>
                 <ClearRoundedIcon/>   
                </Tooltip></Link>
                <Link to={`/Test/${index._id}`}>
                <Tooltip title="Accepté" className='accepter' >
                <CheckRoundedIcon/>    
                </Tooltip>
                </Link></>)

               }
                
            </div>
        </div>
        
        <div class="user_RES2">
        <span>Passager :</span>
            {user1?.prenom} {user1?.nom}
            <Avatar  src={user1?.photo ? (Path+user1?.photo):(profil_picture)} sx={{ width: 40, height: 40}} />
            {user1?._id ? (<>
            <Link to={`/User/${user1?._id}`}>
            <button>Voir Profil</button>
            </Link>
            </>):(<></>)}
        </div>
        
    </div>
</>
  )
}



