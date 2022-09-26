import "./widgetLg.css";
import moment from "moment"
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"
import { useEffect } from "react";
axios.defaults.withCredentials = true;
const Path = "http://localhost:8000/"

export default function WidgetLg() {
  const [result, setResult] = useState([]);

  useEffect(() => {
 var config = {
   method: 'get',
   url: 'http://localhost:8000/reservation',
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
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Dernières réservations</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Passager</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Place(s)</th>
          {/* <th className="widgetLgTh">Status</th> */}
        </tr>
        {  
        result.map((item,i)=>( 
        <Card item={item} key={item._id}/>  
            ))
            }
       
      </table>
    </div>
  );
}

function Card({item}){

  const [Passager, setPassager] = useState([]);
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:8000/user/'+item?.id_passager,
      headers: { },
    };
    
    axios(config)
    .then(function (response) {
      setPassager(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
      })
      const Button = ({ type }) => {
        return <button className={"widgetLgButton " + type}>{type}</button>;
      };
  return (
    <>
    <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src={Path+Passager?.photo}
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">{Passager?.prenom} {Passager?.nom}</span>
          </td>
          <td className="widgetLgDate">{moment(item?.createdAt).format(" DD/ MM/ YYYY")}</td>
          <td className="widgetLgAmount">{item?.nombre_place}</td>
          {/* <td className="widgetLgStatus">{
            item?.confirmation ? <Button type="Approved" />:<Button type="Pending" />
          }
          
          </td> */}
        </tr>
      
    
    
</>
  )
}