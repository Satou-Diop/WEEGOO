import "../../assets/CSS/Banner2.scss"
import React from 'react'
import SavingsIcon from '@mui/icons-material/Savings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins, faHourglassStart,faLeaf } from '@fortawesome/free-solid-svg-icons'

function Banner3() {
  return (
    <>
 <section className='section_why'>
    <div className='why'>
      <h1>Pourquoi choisir <span>WEEGOO </span>?</h1>
      <p className='p'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
       </p>
      <div class="WDIV">
        <div class="div1">
        <div className='p Wlogo'> <FontAwesomeIcon icon={faCoins} /><br/> <span>Economisez votre argent</span></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
        </div>
        <div class="div2">
        <div className='p Wlogo'><FontAwesomeIcon icon={faHourglassStart} /><br/> <span>Gagnez du temps</span></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
        </div>
        <div class="div3">
        <div className='p Wlogo'><FontAwesomeIcon icon={faLeaf} /><br/> <span>C'est ecologique</span></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
        </div>
      </div>
    </div>
  </section>
  

    </>
  )
}

export default Banner3