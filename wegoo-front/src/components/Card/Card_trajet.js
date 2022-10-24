import { Link } from "react-router-dom";
import {Row,Col} from "reactstrap"
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../../assets/CSS/Card_trajet.css";
import moment from "moment"
import {  faTrashCan ,faPen, faPencil} from "@fortawesome/free-solid-svg-icons";

const Card_trajet = ({ index }) => {

  return (
    <div className="Card_trajet">

        <div className="carte_trajet">

          <div className="enteteC">
            <div>
              <h5> <u>Trajet</u> : <span >{index.point_depart} -- {index.point_arrivee}</span></h5>
            </div>
            <div className="Tparams">
            <Tooltip title="Supprimer">
            <Link to={`/Trajet/supprimer/${index._id}`}><FontAwesomeIcon icon={faTrashCan} className="Tsupprimer"/></Link>
            </Tooltip>
            <Tooltip title="Modifier">
            <Link to={`/Trajet/modifier/${index._id}`}><FontAwesomeIcon icon={faPencil} className="Tmodifier" /></Link>
            </Tooltip>
            </div>
            
          </div>

          <div className="infoC">
            <Row>
            <Col><h6>Date: {moment(index.date_depart).format("DD/MM/YYYY")}<span >  </span></h6></Col>
            <Col><h6><span > Heure :{index.heure_depart} </span> </h6></Col>
            </Row>
            <Row>
            <Col><h6><span> Prix:{index.prix_place}</span> </h6></Col>
            <Col><h6><span> Nombre de place :{index.nombre_place_libre} </span></h6> </Col>
            </Row>
          </div>

       </div>

    </div>
        
  );
};

export default  Card_trajet
