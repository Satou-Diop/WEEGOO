import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import moment from "moment"
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
axios.defaults.withCredentials = true;
const Path = "http://localhost:8000/"

export default function WidgetSm() {
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
 
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">A rejoint la newsletter :</span>
      <ul className="widgetSmList">
      {  
        result.map((item,i)=>( 
        <Card item={item} key={item._id}/>  
            ))
            }
      </ul>
    </div>
  );
}

function Card({item}){
   
  return (
    <>
   <li className="widgetSmListItem">
          
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{item?.email}</span>
            <span className="widgetSmUserTitle">{moment(item?.createdAt).format(" DD/ MM/ YYYY")}</span>
          </div>
          
  </li>
      
    
    
</>
  )
}