import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
  Done,
  Close
} from "@material-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./user.css";
import axios from "axios"
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useState } from "react";
import moment from "moment"
axios.defaults.withCredentials = true;
const Path= "http://localhost:8000/"

export default function User() {
  const [User, setUser] = useState([]);
  const [Cause, setCause] = useState([]);
  const [Element, setElement] = useState(
    {
      n1 : null,
      n2 : null,
      n3 : null,
      n4 : null,
    }
  );
  const location = useLocation();
    const navigate=useNavigate()
    const id_user = location.pathname.split("/")[2];

        useEffect(() => {
      var config = {
        method: 'get',
        url: 'http://localhost:8000/user/'+id_user,
        headers: { },
      };
      
      axios(config)
      .then(function (response) {
        setUser(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
        },[])
    
        const valider_conducteur = ()=>{
          var data = JSON.stringify({
            "isVerified": true
          });
        
          var config = {
            method: 'put',
            url: 'http://localhost:8000/user/'+User?._id,
            headers: { 
              'Content-Type': 'application/json', 
              withCredentials : true,
              },
            data : data
          };
          
          axios(config)
          .then(function (response) {
          sendNotification()
          toast.success("Vous avez verifie ce profil.")
          navigate("/users")
          })
          .catch(function (error) {
              console.log(error)
          });
        }
        const decliner_conducteur = ()=>{
          var data = JSON.stringify({
            "isVerified": false
          });
        
          var config = {
            method: 'put',
            url: 'http://localhost:8000/user/'+User?._id,
            headers: { 
              'Content-Type': 'application/json', 
              withCredentials : true,
              },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            navigate("/users")
            toast.success("Operation reussie")
            sendNotification2()
          })
          .catch(function (error) {
              console.log(error)
          });
        }
        const sendNotification=()=>{
          var data = JSON.stringify({
            "title": "Weegoo",
            "message": "Bonjour "+User?.prenom+" , votre a ete verifie par l'equipe de WeeGoo.",
            "origin": "systeme",
            "user": id_user,
            
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:8000/notification/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          });
             
        }
        const sendNotification2=()=>{
          var data = JSON.stringify({
            "title": "Weegoo",
            "message": "Bonjour "+User?.prenom+" , l'equipe de WeeGoo vous informe que votre profil n'a pas pu etre verifie por non conformite des informations. Vous pouvez soumettre a nouveau les informations pour proceder à la reverification.",
            "origin": "systeme",
            "user": id_user,
            
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:8000/notification/',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
          })
          .catch(function (error) {
            console.log(error);
          });
             
        }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Verification Documents</h1>
        {/* <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link> */}
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={Path+User?.photo}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{User?.prenom} {User?.nom}</span>
              <span className="userShowUserTitle">...</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
           
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{moment(User?.date_naissance).format(" DD/ MM/ YYYY")}</span>
            </div>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{User?.telephone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{User?.login}</span>
            </div>
            
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Informations</span>
          <br/>
          <div >
            <div class="INFO_DIV">
              <div class="info">
              Numero CNI 
              </div>
              <div class={Element.n1 == false ? ("value error") :(" value")}>
              : {User?.ncni}
              </div>
              <div class="etat">
              {Element.n1 == null ? (<><Close className="declinerU" onClick={(e)=>setElement({n1:false,n2:Element.n2,n3:Element.n3,n4:Element.n4})} /><Done className="accepterU" onClick={(e)=>setElement({n1:true,n2:Element.n2,n3:Element.n3,n4:Element.n4})} /> </>):(<></>)}
              </div>
            </div>
            
            <div class="INFO_DIV">
              <div class="info">
              Numero Permis 
              </div>
              <div class={Element.n2 == false ? ("value error") :(" value")}>
              : {User?.npermis}
              </div>
              <div class="etat">
              {Element.n2 == null ? (<><Close className="declinerU" onClick={(e)=>setElement({n2:false,n1:Element.n1,n3:Element.n3,n4:Element.n4})}/><Done className="accepterU" onClick={(e)=>setElement({n2:true,n1:Element.n1,n3:Element.n3,n4:Element.n4})}/> </>):(<></>)}
              </div>
            </div>

            <div class="INFO_DIV">
              <div class="info">
              Societe d'assurance  
              </div>
              <div class={Element.n3 == false ? ("value error") :(" value")}>
              : {User?.nassurance}
              </div>
              <div class="etat">
              {Element.n3 == null ? (<><Close className="declinerU" onClick={(e)=>setElement({n3:false,n2:Element.n2,n1:Element.n1,n4:Element.n4})} /><Done className="accepterU" onClick={(e)=>setElement({n3:true,n2:Element.n2,n1:Element.n1,n4:Element.n4})}/> </>):(<></>)}
              </div>
            </div>
            
            <div class="INFO_DIV">
              <div class="info">
              Visite Technique  
              </div>
              <div class={Element.n4 == false ? ("value error") :(" value")}>
              : {User?.visite_technique}
              </div>
              <div class="etat">
              {Element.n4 == null ? (<><Close className="declinerU" onClick={(e)=>setElement({n4:false,n2:Element.n2,n3:Element.n3,n1:Element.n1})} /><Done className="accepterU" onClick={(e)=>setElement({n4:true,n2:Element.n2,n3:Element.n3,n1:Element.n1})}/> </>):(<></>)}
               </div>
            </div>
            
          
          </div>
          <br/>
          <div className="div_update">
          {Element.n1 != null &&  Element.n2 != null && Element.n3 != null && Element.n4 != null  ? (<> 
            {Element.n1 == true &&  Element.n2 == true && Element.n3 == true && Element.n4 == true  ? (<>
            <button className="userUpdateButton" onClick={decliner_conducteur}disabled>Decliner</button>
             <button className="userUpdateButton" onClick={valider_conducteur}>Valider</button> </>):(<>
              <button className="userUpdateButton" onClick={decliner_conducteur}>Decliner</button> 
              <button className="userUpdateButton" onClick={valider_conducteur} disabled>Valider</button></>)}
          </>):(<>
              <button className="userUpdateButton" onClick={decliner_conducteur} disabled>Decliner</button> 
              <button className="userUpdateButton" onClick={valider_conducteur} disabled>Valider</button></>)}
              
                  
          
            </div>
        </div>
      </div>
    </div>
  );
}
