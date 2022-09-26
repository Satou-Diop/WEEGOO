import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  VerifiedUser
} from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

export default function Sidebar() {
  const location = useLocation()
  const loc = location.pathname.split("/")[1];
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link" >
            <li className={loc == "" ? "sidebarListItem active" : "sidebarListItem "}>
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/users" className="link" >
              <li  className={loc== "users" ? "sidebarListItem active" : "sidebarListItem"}>
              <VerifiedUser className="sidebarIcon" />
              Verification Conducteur
              </li>
            </Link>
            <Link to="/Certification" className="link">
              <li  className={loc== "Certification" ? "sidebarListItem active" : "sidebarListItem"}>
              <PermIdentity className="sidebarIcon" />
                
              Certifications
              </li>
            </Link>
            
          </ul>
        </div>
       
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/Newsletter" className="link">
              <li  className={loc== "Newsletter" ? "sidebarListItem active" : "sidebarListItem"}>
              <MailOutline className="sidebarIcon" />
              Newsletter
              </li>
            </Link>
            <Link to="/FeedBack" className="link">
              <li  className={loc== "FeedBack" ? "sidebarListItem active" : "sidebarListItem"}>
                <DynamicFeed className="sidebarIcon" />
                Feedback
              </li>
            </Link>
            
            {/* <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li> */}
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
      
            <Link to="/Technicien" className="link">
            <li  className={loc== "Technicien" ? "sidebarListItem active" : "sidebarListItem"}>
              <Timeline className="sidebarIcon" />
              Techniciens
            </li>
            </Link>
            <Link to="/UserSignaler" className="link">
            <li  className={loc== "UserSignaler" ? "sidebarListItem active" : "sidebarListItem"}>
              <Report className="sidebarIcon" />
              Utilisateurs Signalés
            </li>
            </Link>
            
          </ul>
        </div>
      </div>
    </div>
  );
}
