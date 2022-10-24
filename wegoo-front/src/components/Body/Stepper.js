import  React, { useContext, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Input } from '@mui/material';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import AuthContext from "../../context/AuthProvider.js";
axios.defaults.withCredentials = true;
const steps = ['Soumettre les documents pour verifier votre profil ', 'Ajoutez les détails personnels et vos préferences'];
const steps2 = 
['Vous devez soumettre les documents (CIN, Assurance, Visite technique etc…) qui seront vérifiés et validés par l’équipe WeGoo pour attester leur conformité.',
 'Cela permettra à vos futurs passagers de mieux vous connaitre afin de rendre vos trajets plus agreables.',
  ];

export default function Stepper1() {
  const {user} = useContext(AuthContext);
  const {dispatch } = useContext(AuthContext);
  const [activeStep, setActiveStep] = useState(0);
  useEffect(() => {
    if(user?.isConducteur)
    {
      setActiveStep(1)
      if(user?.isDetailed){
        setActiveStep(2)
      }
    }
  }, [])
  
  const [showm, setshowm] =useState(false);
  const [isCompleted, setisCompleted] =useState(false);
  const [skipped, setSkipped] =useState(new Set());
  const initialValues ={
    ncni: user?.ncni,
    npermis: user?.npermis,
    nassurance: user?.nassurance ,
    visite_technique: user?.visite_technique
  };
  const [Info, setInfo] =useState(initialValues);
  const  handlechange = (e) => {
    setInfo(prev=>({
      ...prev,
      [e.target.name] : e.target.value
    })
    )
  };
  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };
  
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      // newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
    updateUser2()
  };

 
  const openModal = () => {
    setshowm(true);
  };
  const closeModal = () => {
    setshowm(false);
  };
  const soumettre = (e) => {
    e.preventDefault();
    updateUser()
    setshowm(false);
    setisCompleted(true);
  };
  const updateUser = ()=>{
    var data = JSON.stringify({
      "ncni": Info.ncni,
      "npermis": Info.npermis,
      "nassurance" : Info.nassurance,
      "visite_technique": Info.visite_technique ,
      "isConducteur": true,
      "isVerified":null
    });
  
    var config = {
      method: 'put',
      url: 'http://localhost:8000/user/'+user?._id,
      headers: { 
        'Content-Type': 'application/json', 
        withCredentials : true,
        },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch({ type: "LOGIN_UPDATE", payload: response.data });
        toast.success("La modification est enregistrée ! ")
    })
    .catch(function (error) {
        console.log(error)
    });
  }
  const updateUser2 = ()=>{
    var data = JSON.stringify({
      "isDetailed": true
    });
  
    var config = {
      method: 'put',
      url: 'http://localhost:8000/user/'+user?._id,
      headers: { 
        'Content-Type': 'application/json', 
        withCredentials : true,
        },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      dispatch({ type: "LOGIN_UPDATE", payload: response.data });
        toast.success("La modification est enregistrée ! ")
    })
    .catch(function (error) {
        console.log(error)
    });
  }
  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label} </StepLabel>
            </Step>
          
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
           Profil completé !
          </Typography>
          {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box> */}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 1, mb: 1 }}>
            {steps2[activeStep]}<br/>
            {activeStep == 0 ? (<>
           <button className='btn_stepper' onClick={openModal}> Soumettre les documents </button></>):(<> <button className='btn_stepper' onClick={updateUser2}> Completer</button></>)}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            {user?.isConducteur ? (<>
              
              {activeStep === steps.length - 1 ? (<></>) : (<><Button onClick={handleNext}>Next </Button></>)}
           
              {
              user?.isDetailed ? (<>
               {!activeStep === steps.length - 1 ? (<></>) : (<><Button onClick={handleNext}>FINISH </Button></>)}
              </>):(<>
                <Button
              color="inherit"
              disabled
             
              sx={{ mr: 1 }}
            >
              FINISH
            </Button>
              </>)
            }
            </>):(<>
              <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Next
            </Button>
            </>)}
            
          </Box>
        </React.Fragment>
      )}
    </Box>

    <Modal show={showm} onHide={closeModal} centered={true}>
          <Modal.Header closeButton>
            <Modal.Title className='modal_title'> Informations Complementaires</Modal.Title>
          </Modal.Header>
          <form onSubmit={soumettre} >
          <Modal.Body>
          <div>
              <div class=" mb-3">
                <div >
                <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">N° CNI</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handlechange}
                    value={Info.ncni}
                    type="text" name="ncni" placeholder="x xxx xxxx xxxxx" required/>
                    </div>
                </div>
                <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Societe d'assurance</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handlechange}
                    value={Info.nassurance}
                    type="text" name="nassurance" placeholder="assurance" required/></div>
                  </div> 
                  <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">N° Permis de conduire</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handlechange}
                    value={Info.npermis}
                    type="text" name="npermis" placeholder="xxx xxx xxx" required/>
                    </div>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-sm-4">
                      <h6 class="mb-0">Visite Technique</h6>
                    </div>
                    <div class="col-sm-8 text-secondary">
                    <Input
                    minLength={2}
                    onChange={handlechange}
                    value={Info.visite_technique}
                    type="text" name="visite_technique" placeholder="xxx xxx" required/>
                     
                    </div>
                  </div>
                
                  
                  
                </div>
              </div>
             
          </div>
          </Modal.Body>
          <Modal.Footer>
             <Button variant="danger" onClick={closeModal}>
              Annuler
            </Button>
            <Button variant="primary" type="submit">
              Enregistrer modifications
            </Button>
           
          </Modal.Footer>
          </form>
    </Modal> 

    </>
    
  );
}
