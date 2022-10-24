import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import "../../assets/CSS/Notifications.css"
import Card_notif from '../Card/Card_notif.js'
import axios from 'axios';
import AuthContext from '../../context/AuthProvider';
import useFetch from '../../useFetch';
import { Spinner } from 'reactstrap';

axios.defaults.withCredentials = true;

function Notification() {
  const {user} = useContext(AuthContext);
  const { data, loading, error } = useFetch(`/notification/${user._id}`);

  return (
    <>
    <section className='Nsection'>
        <br/>
    <div className='Ncontainer'>
        <div>
        <h1>Notification(s)</h1>
        </div>
     
       {
            loading ? ( <div className='noResult'><Spinner>
           
        </Spinner> 
        </div> ) :( <>
        <>{
            data.length ? (<div></div>):(<><div className='noResult'>Vous n'avez aucune encore notification !!</div></>)
        }</> 
        <>{
            !error.length ? (<div></div>):(<><div className='noResult'>connexion</div></>)
        }</>
            {   
            data.map((index,i)=>(   
                <Card_notif index={index} key={index._id}/>  
            ))
            }
            </>
            )
           }
           <div><br/></div>
    </div>
    <div><br/></div>
    </section>
    </>
  )
}

export default Notification