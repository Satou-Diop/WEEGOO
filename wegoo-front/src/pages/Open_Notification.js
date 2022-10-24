import Notification from "../components/Body/Notification.js";
import Notification_Modal from "../components/Body/Notification_Modal.js";
import  Header from "../components/Entete/Header.js"

const open_Notification = () => {
  return (
    <div>
      <Header/>
      <Notification/>
      <Notification_Modal/>
    </div>
  );
};

export default open_Notification;
