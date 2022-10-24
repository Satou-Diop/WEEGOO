import "./message.css";
import { format } from "timeago.js";
import profil_picture from "../../../assets/image/noAvatar.png"
const Path= "http://localhost:8000/"

export default function Messages({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
