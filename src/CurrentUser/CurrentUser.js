import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./CurrentUser.module.css";

const BackDrop = (props) => {
  return <div className={classes.backDrop} onClick={props.onClick}></div>;
};

const ModalOverlay = (props) => {
  return <div className={classes.modaloverlay}>
      {props.user[0].login}
  </div>;
};

const overlay = document.getElementById("currentUser");

const CurrentUser = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onClick={props.onClick} />, overlay)}
      {ReactDOM.createPortal(<ModalOverlay user={props.user} />, overlay)}
    </Fragment>
  );
};

export default CurrentUser;
