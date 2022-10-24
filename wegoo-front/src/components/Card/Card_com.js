import React from 'react'
import { format } from "timeago.js";
import "../../assets/CSS/Card_com.css"
import Rating from '@mui/material/Rating';
function Card_com({ index }) {
   
  return (
    <>
    <div class="COM_DIV">
        <div class="COM_DATE">{format(index.createdAt)}</div>
        <div class="COM_USER"><span>{index.prenom_user} {index.nom_user}</span></div>
        <div class="COM_TEXT">{index.commentaire}</div>
        <div class="COM_NOTE"><Rating name="read-only" size="small" value={index.note} readOnly /></div>
    </div>
      
    
    
</>
  )
}

export default Card_com