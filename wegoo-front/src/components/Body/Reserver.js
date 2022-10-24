import React, { useEffect, useState } from 'react'
import useFetch from "../../useFetch.js";
import "../../assets/CSS/Reserver.css"
import AuthContext from '../../context/AuthProvider.js';
import { useContext } from 'react';
import axios from 'axios';
import { Spinner } from "reactstrap";
import {Card_Res1,Card_Res2} from '../Card/Card_Res.js';
axios.defaults.withCredentials = true;
function Reserver() {
const {user} = useContext(AuthContext);


  const [currentTab, setCurrentTab] = useState('1');
  const tabs = [{
          id: 1,
          tabTitle: 'Reservations sur mes trajets',
          content: <Content2 user_id={user?._id}/>
      },
      {
          id: 2,
          tabTitle: 'Mes reservations',
          content: <Content1 user_id={user?._id}/>
      }
      
  ];

  const handleTabClick = (e) => {
      setCurrentTab(e.target.id);
  }

  return (
   <>
   {user ?(<>
   
   <section className='ReSection'>
    <div><br/></div>
    <div className='containerRE'>
      <div className='tabs'>
        {tabs.map((tab, i) =>
          <button className='button' key={i} id={tab.id} disabled={currentTab === `${tab.id}`} onClick={(handleTabClick)}>{tab.tabTitle}</button>
        )}
      </div>
      <div className='content'>
        {tabs.map((tab, i) =>
          <div key={i}>
            {currentTab === `${tab.id}` && <>{tab.content}</> }
          </div>
        )}
      </div>


    </div>
    <div><br/></div>
   </section>
  </>):
  (<>Impossible d'acceder a cette page. Il faut vous connecter</>)  
}
   
   </>

  )
}

const Content1=({user_id})=>{
  const { data, loading, error,reFetch } = useFetch(`/reservation?id_passager=${user_id}&`);
  
  return(<>
  {
          loading ? 
          (<div >
            
            <p className='noRes'><Spinner/> </p>
            </div> ) :
          ( <>
            <>{ data?.length ? (<div>{}</div>):(<><div className='noRes'>Vous n'avez encore effectuer aucune reservation </div></>)}</> 
            {  
            data?.map((item,i)=>( 
                <Card_Res1 index={item} key={item._id}/>
            ))
            }
            </>)
  }
  </>)
}

const Content2=({user_id})=>{
  const { data, loading, error,reFetch } = useFetch(`/reservation?id_conducteur=${user_id}&confirmation!=false`);
  


  return(<>
  {
          loading ? 
          (<div >
             <p className='noRes'><Spinner/> </p>
            </div> ) :
          ( <>
            <>{ data.length ? (<div>{}</div>):(<><div className='noRes'>Aucun de vos trajets publiés n'a été réservé </div></>)}</> 
            {  
            data.map((item)=>( 
              <Card_Res2 index={item} key={item._id}/> 
            ))
            }
            </>)
  }
  </>)
}

export default Reserver