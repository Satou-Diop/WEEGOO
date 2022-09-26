import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter,  Routes,Route,} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import Log from "./pages/Log/Log";
import Account from "./pages/Account/Account";
import NewTechnicien from "./pages/newTechnicien/newTechnicien";
import Newsletter from "./pages/Newsletter/Newsletter";
import FeedBack from "./pages/FeedBack/FeedBack";
import Certification from "./pages/Certification/Certification";
import UserSignaler from "./pages/UserSignaler/UserSignaler";
import Technicien from "./pages/Technicien/Technicien";
import Details from "./pages/Details/Details";
import AuthContext from "./Context/AuthProvider";
import { useContext } from "react";
import { ToastContainer } from 'react-toastify';

function App() {
  const {technicien} = useContext(AuthContext);
  return (
    <BrowserRouter>
    <ToastContainer position="bottom-right"/>
    {technicien ? (<>
      <Topbar />
    <div className="container">
       <Sidebar />
      <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/users" element={<UserList />}/>
      <Route path="/users/:userId" element={<User />}/>
      <Route path="/newTechnicien" element={ <NewTechnicien />}/>
      <Route path="/Newsletter" element={ <Newsletter />}/>
      <Route path="/FeedBack" element={ <FeedBack />}/>
      <Route path="/Certification" element={ <Certification />}/>
      <Route path="/UserSignaler" element={   <UserSignaler />}/>
      <Route path="/Technicien" element={   <Technicien />}/>
      <Route path="/Account" element={   <Account />}/>
      <Route path="/Details/:id" element={   <Details />}/>
    </Routes>
    </div>
    </>):(<><Routes>
     <Route path="/" element={<Log />}/> 
    </Routes>
    </>)}
    
    
    
  </BrowserRouter>


  );
}

export default App;
