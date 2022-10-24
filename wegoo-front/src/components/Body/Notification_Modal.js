import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import "../../assets/CSS/Notifications.css"
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../useFetch.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark} from '@fortawesome/free-solid-svg-icons'
import QRCode from "react-qr-code";

axios.defaults.withCredentials = true;
const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
  };

function Notification_Modal() {
    const location = useLocation();
    const [notifs, setNotifs] = useState([])
    const id_N = location.pathname.split("/")[2];
    const { data, loading, error } = useFetch(`/notification/open/${id_N}`);
    
const [showModal, setshowModal] = useState(true);
const navigate=useNavigate()
const updateNotif= (id_notif)=>{
    var data = JSON.stringify({
        "isOpen": true
      });
      
      var config = {
        method: 'put',
        url: 'http://localhost:8000/notification/'+id_notif,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        setshowModal(false)
        navigate("/Notifications")
      })
      .catch(function (error) {
        console.log(error);
      });
       
}
const annulerModification=()=>{
    updateNotif(id_N)
      }
   
  
  return (
    <>
   <div>
        <Modal
        open={showModal}
        onClose={annulerModification}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (<></>) : (<>
            <div className='close_modal' onClick={annulerModification}><FontAwesomeIcon icon={faXmark} /></div>
            <div className='mtitle' >
            {data[0]?.title}
            </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {data[0]?.message}<br/>
            {data[0]?.isReservation ? (
            <div className='code'>
            <QRCode value={`http://localhost:3000/Reservation/${data[0]?._id}`}  size={60} ></QRCode> 
            </div>
          ):(<></>)}<br/>
            {data[0]?.title == "Reservation" ? (<><Link to={`/Mes_reservations`} className="link_modal">
             <button className='aller_res' >Aller sur mes reservations</button></Link></>) :(<></>) }  
          </Typography></>)}
        </Box>
      </Modal>

       {/* <Modal show={showModal} onHide={annulerModification}>
        <div closeButton/>

        <Modal.Body>
       {loading ? (<></>):(<> Test {data[0]?.title}</>)}
      </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={annulerModification}>
            Annuler
          </Button>
          <Button variant="success" onClick={annulerModification}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal> */}
   </div>
   </>
  )
}

export default Notification_Modal