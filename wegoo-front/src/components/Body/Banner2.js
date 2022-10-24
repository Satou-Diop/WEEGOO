import React from 'react'
import "../../assets/CSS/Banner2.scss"
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';

function Banner2() {
  return (
    <>
<div class="BANNER2">
  <div class="B2_text">
    <div className='iconeB2'></div>
    <h3><SentimentVerySatisfiedIcon sx={{ fontSize: 32}}/> Le covoiturage, le nouveau mode de déplacement simple et efficace !</h3><br/>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
         sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
         exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Duis aute irure dolor in reprehenderit
          in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </div>
  <div className="B2_img">
 
  </div>
</div>

    </>
  )
}

export default Banner2