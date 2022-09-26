import "./UserSignaler.css";
import Box from '@mui/material/Box';
import { DataGrid  } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import moment from "moment"
import { useEffect } from "react";
axios.defaults.withCredentials = true;
const Path= "http://localhost:8000/"

export default function UserSignaler() {
 
  const [result, setResult] = useState([]);
  useEffect(() => {
 var config = {
   method: 'get',
   url: 'http://localhost:8000/signal',
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
 
  //  const Button = ({ type }) => {
  //    return <button className={"widgetLgButton " + type}>{type}</button>;
  //  };
   // const handleDelete = (id) => {
   //   setData(data.filter((item) => item.id !== id));
   // };
   
   const columns = [
    { field: "createdAt", headerName: "Date", width: 180 ,
    renderCell: (params) => {
      return (
        <>
          {moment(params.row?.createdAt).format(" DD/ MM/ YYYY")}
        </>
      );
    },},
     { field: "id_conducteur", headerName: "Conducteur ID", width: 220 },
     { field: "id_user", headerName: "USER ID", width: 220},
     { field: "raison", headerName: "SIGNALER POUR :", width: 350 },
     {
       field: "voir",
       headerName: "Action",
       width: 150,
       renderCell: (params) => {
         return (
           <>
             <Link to={"/Details/" + params.row._id}>
               <button className="userListEdit">Details</button>
             </Link>
             
           </>
         );
       },
     }
   ];
 

  return (
    <div className="Signaler">
      <h1 className="addProductTitle">Utilisateurs Signalés</h1>
        <div className="S_DIV"> 
      <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={result}
        disableSelectionOnClick
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={8}
       
      />
      
      </Box></div>
    </div>
  );
}
