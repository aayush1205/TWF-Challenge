import React from "react";
import "./ProfileCard.css";
import avatar from "./images/images-rita.jpeg";

function ProfileCard(props) {
  return (
    <div className="card-container">
      <header>
        <img src={avatar} alt={props.name} />
      </header>
      <h1 className="bold-text">
        {props.name}
      </h1>
      <h2 className="normal-text">{props.city}</h2>
      <h2 className="normal-text">{props.dob}</h2>
    </div>
  );
}

export default ProfileCard;
