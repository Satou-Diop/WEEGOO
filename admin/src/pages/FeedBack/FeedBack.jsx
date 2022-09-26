import "./FeedBack.css";
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
   url: 'http://localhost:8000/message/feedback/all',
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
 
  return (
    <div className="newsletter"> 
     <h1>FeedBack des utilisateurs</h1><br></br>
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
    <div class="email_new">{item?.text}</div>
    </div>
    </>
  )
}