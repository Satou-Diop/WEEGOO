import React, { useState } from 'react'
import "../../assets/CSS/Footer.css"
import "../../assets/Vendor/font-awesome/css/font-awesome.min.css";
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
axios.defaults.withCredentials = true;
function Footer() {
const [Email, setEmail] = useState(""); 

const inscription_newsletter =async(e)=>{
    e.preventDefault()
var data = JSON.stringify({
  "email": Email
});

var config = {
  method: 'post',
  url: 'http://localhost:8000/newsletter',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
    setEmail("")
  toast.success("Vous êtes maintenant inscrit au Newsletter")
})
.catch(function (error) {
  console.log(error);
});
}
  return (
    <>
  <div class="foo-section">
        <div class="container">
            <div class="foo-content pt-5 pb-5">
                <div class="row">
                    <div class="col-xl-4 col-lg-4 mb-50">
                        <div class="foo-widget">
                            <div >
                              <h4>Weegoo</h4>
                           </div>
                            <div class="foo-text">
                                <p>Lorem ipsum dolor sit amet, consec tetur adipisicing elit, sed do eiusmod tempor incididuntut consec tetur adipisicing
                                elit,Lorem ipsum dolor sit amet.</p>
                            </div>
                          
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                        <div class="foo-widget">
                            <div class="foo-widget-heading">
                                <h3>Liens Utils</h3>
                            </div>
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">About us</a></li>
                                <li><a href="#">Contact</a></li>
                                <li><a href="#">Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Nos Services</a></li>
                               
                            </ul>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                        <div class="foo-widget">
                            <div class="foo-widget-heading">
                                <h3>Rejoingnez-nous</h3>
                            </div>
                            <div class="foo-text mb-25">
                                <p>Don’t miss to subscribe to our new feeds, kindly fill the form below.</p>
                            </div>
                            <div class="subscribe-form">
                                <form onSubmit={inscription_newsletter}>
                                    <input type="email" placeholder="Email Address" name='email' value={Email} onChange={(e)=>setEmail(e.target.value)} required/>
                                    <button type='submit'><i className='fa fa-telegram'></i></button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
<footer>
<div class="footer">
<div class="copyright">
  Weegoo - Designed By: Aissatou_ 
</div>

<div className='reseau_social'>     
    <i class="fa fa-github" aria-hidden="true"></i>
    <i class="fa fa-facebook" aria-hidden="true"></i>
    <i class="fa fa-twitter" aria-hidden="true"></i>
    <i class="fa fa-instagram" aria-hidden="true"></i>
</div>
</div>
</footer>
    </>
  )
}

export default Footer