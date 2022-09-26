import React, { useState } from "react";
import "./topbar.css";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Close} from "@material-ui/icons";
import AuthContext from '../../Context/AuthProvider.js';
import { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import image from "./noAvatar.png"
import 'react-toastify/dist/ReactToastify.css';
const style = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '1px solid grey',
  boxShadow: 24,
  p: 2,
};
export default function Topbar() {
  const { technicien } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [show, setShow] = useState(false);
  const open = Boolean(anchorEl); 

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setShow(false)
    setAnchorEl(null);
  };

  const logOut = ()=>{
    setShow(false)
    setAnchorEl(null);
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    navigate("/");
    toast.success("Vous êtes déconnecté!!")
    
  }

  const go_account = ()=>{
    setAnchorEl(null);
    navigate("/Account");
  }
  return (
   <>
   <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">WEEGOO-ADMIN</span>
        </div>
        <div className="topRight">
          {/* <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div> */}
          
         
          <div>
     <span className="info_user"> {technicien?.prenom} {technicien?.nom}</span>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <img src={image} alt="" className="topAvatar" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        
        <MenuItem onClick={go_account}>Compte</MenuItem>
        <MenuItem onClick={(e)=>{setShow(true) 
          setAnchorEl(null)}}>Déconnexion</MenuItem>
      </Menu>
    </div>
        </div>
      </div>
    </div>
    <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="Mbtn" >
            <Close onClick={handleClose}/>
          </div>
          <div className="des" sx={{ mt: 1 }}>
          Voulez-vous vraiment vous deconnecter ?  
          </div>
          <div className="Mbtn"><button onClick={handleClose}>ANNULER</button><button onClick={logOut}>OUI</button></div>
        </Box>
        
      </Modal>

    </>
  );
}
