import "./Newsletter.css";
import moment from "moment"
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
axios.defaults.withCredentials = true;
const Path= "http://localhost:8000/"

export default function UserSignaler() {

  const [result, setResult] = useState([]);
  useEffect(() => {
 var config = {
   method: 'get',
   url: 'http://localhost:8000/newsletter',
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
    { field: "createdAt", headerName: "Date", width: 200 },
     { field: "email", headerName: "Email de l'utilisateur", width: 300 },
     {
       field: "voir",
       headerName: "Action",
       width: 200,
       renderCell: (params) => {
         return (
           <>
             <Link to={"/user/" + params.row._id}>
               <button className="userListEdit">Voir documents</button>
             </Link>
             <DeleteOutline
               className="userListDelete"
               // onClick={() => handleDelete(params.row.id)
               // }
             />
           </>
         );
       },
     }
   ];
 

  return (
    <div className="newsletter"> 
     <h1>Utilisateurs inscrits au newsletter</h1><br></br>
      <div className="NEWSLETTER_SECTION">
    
      {  
        result.map((item,i)=>( 
        <Card item={item} key={item._id}/>  
            ))
            }
      </div>
    </div>
  );
}

function Card({item}){

  return (
    <>
    <div class="NEWSLETTER">
    <div class="date_new">{moment(item?.createdAt).format(" DD/ MM/ YYYY")}</div>
    <div class="email_new"><u>E-mail </u> : {item?.email}</div>
    </div>
    </>
  )
}