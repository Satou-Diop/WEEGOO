import React, { useContext, useEffect, useState } from "react";
import "../../assets/Vendor/font-awesome/css/font-awesome.min.css";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/CSS/Header.css";
import AppBar from '@mui/material/AppBar';
import Modal from 'react-bootstrap/Modal';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from 'react-bootstrap/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Col, Row } from 'reactstrap';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import AuthContext from "../../context/AuthProvider.js";
import { Badge } from "@mui/material";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {stringAvatar} from "../../assets/JS/main.js"
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import useFetch from "../../useFetch";
import axios from 'axios';
import logo from "../../assets/image/logo.png"
import profil_picture from "../../assets/image/noAvatar.png"
const Path= "http://localhost:8000/"
axios.defaults.withCredentials = true;
const pages = ['Home', 'About', 'Contact'];
const settings = ['Profile', 'Messages', 'Trajets', 'Logout'];


const  Header=() =>{
const {user} = useContext(AuthContext);
const { loading, error, dispatch } = useContext(AuthContext);
const navigate = useNavigate();

const logOut = ()=>{
  setShow(false)
  localStorage.clear();
  dispatch({ type: "LOGOUT" });
  navigate("/");
  toast.success("Vous êtes déconnecté!!")
  
}
const [anchorElNav, setAnchorElNav] = React.useState(null);
const [anchorElUser, setAnchorElUser] = React.useState(null);
const [show, setShow] = useState(false);
const[notifs,setNotifs]=useState(0);

useEffect(() => {
  if(user != null){
    var config = {
      method: 'get',
      url: 'http://localhost:8000/notification/number/'+user._id,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : ""
    };
    
    axios(config)
    .then(function (response) {
      setNotifs((response.data).length)
    })
    .catch(function (error) {
    });
  }
  
},[])


const handleOpenNavMenu = (event) => {
  setAnchorElNav(event.currentTarget);
};

const handleOpenUserMenu = (event) => {
  setAnchorElUser(event.currentTarget);
};

const handleCloseNavMenu = () => {
  setAnchorElNav(null);
};
const handleClick = () =>{
  setAnchorElUser(null)
  setShow(true)
}
const handleClose = () =>{ 
  setShow(false)
  };
const handleCloseUserMenu = () => {
  setAnchorElUser(null);
};



  return (
    <>
<AppBar position="relative"  style={{ background: 'rgba(255, 255, 255, 255)' }}
    >
      <Container className='Hcontainer' >
        <Toolbar disableGutters>
          <Typography 
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 500,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to={"/"}> <img className="logo" src={logo}/> WEEGOO</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton 
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon className="Hlog" />
            </IconButton>
            <Menu 
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link className="a" to={"/"}>Home</Link> </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link className="a" to={"/"}>About</Link>  </Typography>
                </MenuItem>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center"><Link className="a" to={"#contact"}>Contact</Link>  </Typography>
                </MenuItem>
              
            </Menu>
          </Box>

          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           <Link to={"/"}>WEEGOO</Link>
          </Typography>
          <Box  className="Hmenu" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Row >   
              <Col ><Link className="a" to={"/"}>Home</Link> </Col> <Col></Col> 
              <Col ><Link className="a" to={"/"}>About</Link> </Col> <Col></Col> 
              <Col ><Link className="a" to={{ pathname: "/", hash: "#contact" }}>Contact</Link> </Col>  <Col></Col>
              <Col></Col><Col></Col>
              <Col > </Col> 
              <Col > </Col> 
              <Col ></Col>  
          </Row>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user?
            (<>
              <Tooltip  title="notifications">
                
              <Link to={"/Notifications"} className="notif">
              <Badge anchorOrigin={{ vertical: 'top',horizontal: 'right',}}  badgeContent={notifs}  color="error">
              <NotificationsNoneOutlinedIcon color="black" fontSize="medium"/>
              </Badge>
              </Link>
              </Tooltip> 
            <IconButton className='Hlog' onClick={handleOpenUserMenu} sx={{ p: 0 }}>
             
              <Avatar src={user?.photo ? (Path+user?.photo):(profil_picture)}/>
             
              {/* <p className="Hicone">{user.nom}</p> */}
             <ArrowDropDownIcon/>
            </IconButton>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

   
                  <Link to={`/Profil`} textAlign="center">
                    <MenuItem> <i class="fa fa-user"/> Profil </MenuItem></Link >
                  
                  <Link  to={"/Mes_reservations"} textAlign="center">
                    <MenuItem ><i class="fa fa-calendar"/>Mes reservations </MenuItem></Link >
                  

                  <Link  to={"/Messages"} textAlign="center">
                    <MenuItem ><i class="fa fa-comments"/> Messages  </MenuItem></Link >
                  

                  <Link  to={"/Trajet"} textAlign="center" divider>
                    <MenuItem ><i class="fa fa-car"/>Trajets </MenuItem>
                    </Link >
                  
                 

                 <MenuItem>
                 <button className="boutton" onClick={handleClick}> DECONNEXION</button>
                 </MenuItem>
                  
 
            </Menu>
            
            </>):

            (<>
            <IconButton  onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <p className='Hlog' ><AccountCircleOutlinedIcon  />LogIn/SignUp </p>
              </IconButton>
            
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Link to={"/Log"} textAlign="center">
              <MenuItem >
                  Se Connecter
                </MenuItem>
                </Link >
                
                  <Link  to={"/Inscription"} textAlign="center"><MenuItem >Creer un compte
                </MenuItem> </Link >
            </Menu>
            </>)}
              
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

    <Modal show={show} onHide={handleClose} centered={true}>
        <Modal.Header closeButton>
          DECONNEXION
        </Modal.Header>
        <Modal.Body>Voulez-vous vraiment vous deconnecter ?</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={logOut}>
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default Header