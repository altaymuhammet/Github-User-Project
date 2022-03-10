import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./CurrentUser.module.css";
import {AiFillCloseCircle} from 'react-icons/ai';

const BackDrop = (props) => {
  return <div className={classes.backDrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modaloverlay}>
      <AiFillCloseCircle className={classes.close} onClick={props.onClick}/>
      <img src={props.user[0].avatar_url} className={classes.img} />
      <ul className={classes.list}>
        <li>
          <span>Username:&nbsp; &nbsp;</span>
          {props.user[0].login}
        </li>
        <li>
          <span>Following: &nbsp; &nbsp;</span>
          {props.user[0].following}
        </li>
        <li>
          <span>Followers: &nbsp; &nbsp;</span>
          {props.user[0].followers}
        </li>
        <li>
          <span>Public Repos: &nbsp; &nbsp;</span>
          {props.user[0].public_repos}
        </li>
        <li>
          <span>Repos Link: &nbsp; &nbsp;</span>
          <a
            href={`https://github.com/${props.user[0].login}?tab=repositories`}
            target="_blank"
            style={{ color: "yellow" }}
          >
            Click here
          </a>
        </li>
        <li>
          <span>E-mail: &nbsp; &nbsp;</span>
          {props.user[0].email === null ? "Not found!" : props.user[0].email}
        </li>
      </ul>
    </div>
  );
};

const overlay = document.getElementById("currentUser");

const CurrentUser = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClick={props.onClick} />, overlay)}
      {ReactDOM.createPortal(<ModalOverlay user={props.user} onClick={props.onClick} />, overlay)}
    </Fragment>
  );
};

export default CurrentUser;
