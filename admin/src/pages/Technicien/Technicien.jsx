import "./Technicien.css";
import Fab from '@mui/material/Fab';
import { DataGrid  } from "@material-ui/data-grid";
import { Add, Close} from "@material-ui/icons";
import { Link, useNavigate  } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useEffect } from "react";
import image from "../noAvatar.png"
import AuthContext from '../../Context/AuthProvider.js';
import { useContext } from "react";

axios.defaults.withCredentials = true;
const Path= "http://localhost:8000/"
const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
  
};
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
export default function UserList() {
  const {technicien}=useContext(AuthContext)
 const [result, setResult] = useState([]);
 const [show,setShow]=useState(false)
 const navigate=useNavigate()
 useEffect(() => {
var config = {
  method: 'get',
  url: 'http://localhost:8000/technicien',
  headers: { },
};

axios(config)
.then(function (response) {
  setResult(response.data);
})
.catch(function (error) {
  console.log(error);
});
  },[])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const verifier=()=>{
   if(technicien?.isAdmin){
    navigate("/newTechnicien")
   }
   else{
    setShow(true)
   }
  }

  const handleClose = () => setShow(false);
  const columns = [
    {
      field: "nom",
      headerName: "Technicien",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={image} alt="" />
            {params.row.prenom}  {params.row.nom} 
          </div>
        );
      },
    },
    { field: "login", headerName: "Email", width: 250 },
    
    {
      field: "telephone",
      headerName: "Numero de telephone",
      width: 230,
    },
    {
      field: "genre",
      headerName: "Sexe",
      width: 120,
    },
   
    // {
    //   field: "voir",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/user/" + params.row._id}>
    //           <button className="userListEdit">Voir documents</button>
    //         </Link>
    //         {/* <DeleteOutline
    //           className="userListDelete"
    //           // onClick={() => handleDelete(params.row.id)
    //           // }
    //         /> */}
    //       </>
    //     );
    //   },
    // },
  ];

  return (
    <div className="T_List">
      <h1>Liste des techniciens</h1>
      <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        className="T_DIV"
        rows={result}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={6}
        
      />
      <Fab  color="primary" sx={fabStyle} onClick={verifier} >
      <Add/>
          </Fab>
    </Box>

    <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="btn_close">
            <Close onClick={handleClose}/>
          </div>
          <div className="desc" sx={{ mt: 1 }}>
            Seul l'administrateur est autorisé à ajouter de nouveaux techniciens. 
          </div>
        </Box>
      </Modal>
    </div>
  );
}
