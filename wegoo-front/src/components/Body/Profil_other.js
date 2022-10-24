import React, { useContext, useEffect, useState } from 'react'
import profil_picture from "../../assets/image/noAvatar.png"
import "../../assets/CSS/Profil_other.css"
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../useFetch';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import moment from "moment"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import VerifiedIcon from '@mui/icons-material/Verified';
import Rating from '@mui/material/Rating';
import AuthContext from "../../context/AuthProvider.js";
import Card_com from '../Card/Card_com';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Spinner } from 'reactstrap';



axios.defaults.withCredentials = true;

const Path= "http://localhost:8000/"

function Profil_other() {
    
    const {user} = useContext(AuthContext);
    const navigate=useNavigate();
    const [vehicule, setvehicule] = useState([]);
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [comParams,setComParams]=useState({
        note: 0,
        text:""
    })
    const [Nbretrajet, setNbretrajet] = useState(1);
    const [value, setValue] = useState(0);
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);
    const [com,setcom]=useState([])
    const [Raison,setRaison]=useState(" ")
    const { data, loading, error } = useFetch(`/auth/user/${id}`);
    useEffect(() => {
      if(data._id)
    {
        
        var config = {
            method: 'get',
            url: 'http://localhost:8000/vehicule/'+data?._id,
            headers: { }
        };
        
        axios(config)
        .then(function (response) {
            setvehicule(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
     
    }, )

    useEffect(() => {
        if(data?._id)
      {
          
          var config = {
              method: 'get',
              url: 'http://localhost:8000/commentaire/'+data?._id,
              headers: { 
                'Content-Type': 'application/json'
              },
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data)
              setcom(response.data);
          })
          .catch(function (error) {
              console.log(error);
          });
      }
       
      }, [data])
      
      useEffect(() => {
        if(data?._id){
          var config = {
            method: 'get',
            url: 'http://localhost:8000/trajet/Number/'+data?._id,
            headers: { 
              'Content-Type': 'application/json'
            },
            data : ""
          };
          
          axios(config)
          .then(function (response) {
            setNbretrajet((response.data).length)
          })
          .catch(function (error) {
          });
        }
        
      },)
    const openChat=()=>{
        navigate("/Messages");
    }
    const close_signal=()=>{
      setShow4(false)
  }
    const open_vehicule=()=>{
        if(vehicule.length != 0)
        setShow(true)
        }
        const close_vehicule =()=>{
          setShow(false)
          }
          const open_comment=()=>{
            setShow2(true)
            }
            const close_comment =()=>{
              setShow2(false)
              }
              const open_list_comment=()=>{
                setShow3(true)
                }
                const close_list_comment =()=>{
                  setShow3(false)
                  }
    const moyenne=(tab)=>{
        const sum=0;
        var b = tab.length,
        c = 0, i;
    for (i = 0; i < b; i++){
      c += Number(tab[i]);
    }
    return c/b;
  }
  const  handleChange = (e) => {
    setComParams(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };
  const  send_com = async(e) => {
    e.preventDefault()
    sendRequest()
  };

  const  send_signal = async(e) => {
    e.preventDefault()
    var data = JSON.stringify({
      "id_conducteur": id,
      "id_user": user?._id,
      "raison": Raison
    });
  
   
  var config = {
    method: 'post',
    url: 'http://localhost:8000/signal',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

    axios(config)
    .then(function (response) {
      setRaison("")
      setShow4(false)
        toast.success("Utilisateur signalé")
    })
    .catch(function (error) {
     
      toast.error("Utilisateur non signalé")
    });
   
  };

  const sendRequest =()=>{
    var data = JSON.stringify({
      "id_conducteur": id,
      "id_user": user?._id,
      "note" : comParams?.note,
      "commentaire": comParams?.text,
      "nom_user": user?.nom,
      "prenom_user": user?.prenom
      
    });
  
    var config = {
      method: 'post',
      url: 'http://localhost:8000/commentaire/',
      headers: { 
        'Content-Type': 'application/json', 
        withCredentials : true,
        },
      data : data
    };
    
    axios(config)
    .then(function (response) {
        updateUser()
    })
    .catch(function (error) {
        alert(comParams.note)
    });
       
  }
  const updateUser = ()=>{
    var data = JSON.stringify({
      "note": comParams.note,
    });
  
    var config = {
      method: 'put',
      url: 'http://localhost:8000/user/note/'+id,
      headers: { 
        'Content-Type': 'application/json', 
        withCredentials : true,
        },
      data : data
    };
    
    axios(config)
    .then(function (response) {
        setComParams([])
        setShow2(false)
        toast.success("Votre commentaire a été posté")
        
    })
    .catch(function (error) {
        console.log(error)
    });
  }
  
  return (
    <>
    <section className='PO_section'>
    <div className='breads'>
      <p className='p1' onClick={() => navigate(-1)}><ArrowBackIcon sx={{fontSize: "medium"}}/> Retour </p>
      <p className='p2'>/Weegoo/Profil</p>
      </div>
        { loading ? (<><div className='spinner'><Spinner/></div></>):(<>
        <div class="GRID_PROFIL">
            <div class="info_user">
                <div class="content_info">
                    <br/>
                <h1>{data?.prenom} {data?.nom} {data?.isVerified ?(<><VerifiedIcon color="primary"/></>):(<></>)} </h1>
                <div><p>Membre depuis {moment(data.createdAt).format(" MMMM YYYY")}</p></div>
                </div>
                <div class="photo_user">
                <img  src={data?.photo ? ( Path+data?.photo) :(profil_picture)} alt="Admin" />
                <button onClick={openChat}>Ecrire</button>
                </div>
            </div>
            <div class="complement_profil">
                    
                <div className='Pnote'>
                    <div>  <span>{Nbretrajet}</span> trajets publiés</div>
                     {data?.note?.length ? (<>
                        <div> Note :<span> {moyenne(data?.note)}/5 - {data?.note?.length} avis</span></div>
                     </>):(<></>)}
                </div>
                
                

                <div className='PVehicule' onClick={open_vehicule}>
                    <div> 
                    <h5>Véhicule</h5>
                    {
                    vehicule.length ? (<>{vehicule[0]?.marque} {vehicule[0]?.modele}</>):(<>
                       <div> Aucun vehicule enregistré</div></>)
                   }
                    </div>
                    <div><br/>
                    <ArrowForwardIosIcon/>
                    </div>
                </div>

                <div className='Pcom' onClick={open_comment}>
                   <div><ChatBubbleOutlineIcon/> Laisser un commentaire</div>
                   <div>
                    <ArrowForwardIosIcon/>
                    </div>
                 </div>
                
                <div className='Pcom' onClick={open_list_comment}>
                   <div> Voir les avis sur ce conducteur </div>
                   <div>
                    <ArrowForwardIosIcon/>
                    </div>
                 </div>

           
                 
                 <div className='Psignaler' onClick={(e)=>setShow4(true)}>
                    <button>Signaler ce profil</button>
                 </div>
            </div>
        </div>
        </>)}
        <div><br/></div>
    </section>

    <Modal show={show} onHide={close_vehicule} centered={true}>
          <Modal.Header closeButton ><span className='text_T' >VEHICULE DU CONDUCTEUR</span></Modal.Header>
        <div class="text_v"> 
        <div class="row mt-2 ">
        <div class="col-md-6"><span className='text_span'>Marque :</span> {vehicule[0]?.marque} </div>
        <div class="col-md-6"><span className='text_span'>Modèle :</span> {vehicule[0]?.modele} </div>
        </div>
        <div class="row mt-2">
        <div class="col-md-10">
        <span className='text_span '> Description :</span>  {vehicule[0]?.description} 
          </div>
        </div>
          <div className=' div_photo'>
          <img className='photo_v' src={Path+vehicule[0]?.photo} />
          </div>
         </div>
    </Modal> 

    <Modal show={show2} onHide={close_comment} centered={true}>
          <Modal.Header  closeButton ><span className=' title'>Evaluez ce conducteur</span></Modal.Header>
            <form onSubmit={send_com}>
            <div className='comment_area'>
            <div>
            Laissez votre note<br/>
            <Rating
                name="note"
                value={comParams.note}
                onChange={handleChange}
                /> 
            </div>
            <div>
            Commentaire :<br/>
            <input type='textarea'
             name="text"
             onChange={handleChange}
             value={comParams.text}/>
            </div> 
            <div className='poster'><button type='submit'>Poster</button></div>
            </div>
            </form>
    </Modal> 

    <Modal show={show3} onHide={close_list_comment} centered={true}>
          <Modal.Header  closeButton ><span className=' title'>COMMENTAIRES</span></Modal.Header>
          <div className='COM_SECTION'>
            {com?.length == 0 ? (<> Aucun commentaire pour ce conducteur</>):(<></>)}
          {   
            com.map((index,i)=>(   
                <Card_com index={index} key={index._id}/>  
            ))
         }</div>
    </Modal> 
    
    <Modal show={show4} onHide={close_signal} centered={true}>
          <Modal.Header  closeButton ><span className=' title'>Signalement de Profil</span></Modal.Header>
            <form onSubmit={send_signal}>
            <div className='comment_area'>
            
            <div>
            Pour quelles raisons souhaitez-vous signaler cet utilisateur ?<br/>
            <input type='textarea'
             name="text"
             onChange={(e)=>setRaison(e.target.value)}
             value={Raison} required/>
            </div> 
            <div className='poster'><button type='submit'>Envoyer</button></div>
            </div>
            </form>
    </Modal> 
    </>
  )
}

export default Profil_other