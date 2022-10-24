import { Link } from "react-router-dom";
import { format } from "timeago.js";
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import moment from "moment"
import "../../assets/CSS/Cards.css";
import { Avatar } from "@mui/material";
import useFetch from "../../useFetch";
import profil_picture from "../../assets/image/noAvatar.png"
import VerifiedIcon from '@mui/icons-material/Verified';
const Path= "http://localhost:8000/"

const Cards = ({ index }) => {
  const { data, loading, error } = useFetch(`/auth/user/${index.conducteur_id}`);

  return (
    <>
    

    <div class="containerT">

      <div class="Tdate">
        {format(index.createdAt)}
      </div>

      <div class="Ttitre">
        <div className="date"><u>Date</u> : {moment(index.date_depart).format("DD MMMM YYYY ")}  à {index.heure_depart} </div>
        
      </div>

      <div class="Tinformations">
        <div className="Tpoint">
        <div className="Tdepart"> {index.point_depart}</div>
        <div className=""><ArrowForwardIcon/></div>
        <div className="Tdestination">{index.point_arrivee}</div>
        </div>
         
        <div className="prix"> 
           {index.prix_place} FCFA / Place
           <div className="nb_place">
          ({index.nombre_place_libre} <EventSeatIcon className="icone" sx={{fontSize: 17}}/>)
        </div>
        </div> 
         
      </div>
      
      <div class="TConducteur">
      <Avatar src={data?.photo ? (Path+data?.photo):(profil_picture)}/>
      <div className="Inf_Con">
        <div>{data?.prenom} {data?.nom} {data?.isVerified ?(<><VerifiedIcon color="primary"/></>):(<></>)} <br/></div>
        {/* <div className="note">4/5 <StarIcon className="icone"  sx={{fontSize: 16}} /></div> */}
        
      </div>
      
      </div>

      <div class="Tbouton">
        <Link to={`/Reservation/${index._id}`} >
          <button className="Tlink_b"  >Voir details</button>
        </Link>
      </div>
      
      
    </div>
    </>   
  );
};

export default  Cards
