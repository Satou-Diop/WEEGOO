import { BrowserRouter,  Routes,Route,} from "react-router-dom";
import "./index.css"
import Accueil from "./pages/Accueil.js";
import Page_connexion from "./pages/Page_connexion.js";
import Trajets from "./pages/Trajets.js";
import Inscription_passager from "./pages/Inscription_passager.js";
import Reservation from "./pages/Reservation.js";
import Annulation from "./pages/Annulation.js";
import Test from "./pages/Test.js";
import Gestion_Trajet from "./pages/Gestion_Trajet.js";
import Supprimer_Trajet from "./pages/Supprimer_Trajet.js"
import Modifier_Trajet from "./pages/Modifier_Trajet.js"
import Messages from "./pages/Messages.js";
import Notifications from "./pages/Notifications.js";
import Open_Notification from "./pages/Open_Notification.js";
import Page_profil from "./pages/Page_profil.js";
import Profil_other_user from "./pages/Profil_other_user.js";
import Page_reservation from "./pages/Page_reservation.js";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer position="bottom-left"/>
      <Routes>
      <Route path="/" element={<Accueil/>}/>
      <Route path="/Log" element={<Page_connexion/>}/>
      <Route path="/Inscription" element={<Inscription_passager/>}/>
      <Route path="/Profil" element={<Page_profil/>}/>
      <Route path="/User/:id" element={<Profil_other_user/>}/>
      <Route path="/Mes_reservations" element={<Page_reservation/>}/>
      <Route path="/annulation/:id" element={<Annulation/>}/>
      <Route path="/listes" element={<Trajets/>}/>
      <Route path="/Trajet" element={<Gestion_Trajet/>}/>
      <Route path="/Trajet/supprimer/:id" element={<Supprimer_Trajet/>}/>
      <Route path="/Trajet/modifier/:id" element={<Modifier_Trajet/>}/> 
      <Route path="/Reservation/:id" element={<Reservation/>}/>
      <Route path="/Messages" element={<Messages/>}/>
      <Route path="/Notifications" element={<Notifications/>}/>
      <Route path="/Notifications/:id" element={<Open_Notification/>}/>
      <Route path="/Test/:id" element={<Test/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
