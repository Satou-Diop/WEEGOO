import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import profil_picture from "../../../assets/image/noAvatar.png"
const Path= "http://localhost:8000/"
axios.defaults.withCredentials = true;

export default function Conversation({ conversation, currentUser, own1 }) {
  const [user2, setUser2] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    var config = {
      method: 'get',
      url: 'http://localhost:8000/user/'+friendId,
      headers: { }
    };
    
    axios(config)
    .then(function (response) {
      setUser2(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [currentUser, conversation]);

  return (
    <div className={own1 ? "conversation own1" : "conversation"}>
      <img
        className="conversationImg"
        src={user2?.photo ? (Path+user2?.photo):(profil_picture)}
        alt=""
      />
      <span className="conversationName">{user2?.prenom} {user2?.nom}</span>
    </div>
  );
}
