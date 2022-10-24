import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../../assets/CSS/Card_notif.css"
import { Avatar } from '@mui/material';
import { format } from "timeago.js";
import axios from 'axios';
axios.defaults.withCredentials = true;

function Card_notif({ index }) {
   
  return (
    <>
    <Link to={`/Notifications/${index._id}`}>
    <div  class={index.isOpen ? "gridNotif openN" : "gridNotif noOpenN"}  >
    <div class="four">
    <Avatar  src=""
      sx={{ width: 54, height: 54}}
      />
    </div>
      <div class="icon">{format(index.createdAt)}</div>
      <div class="title_notif">{index.title}</div>
      <div class="tree">{index.message.split(".")[0]}{index.message.split(".")[1] ? " ...":""}</div>

    </div>
    </Link>
</>
  )
}

export default Card_notif