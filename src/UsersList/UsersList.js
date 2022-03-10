import React from "react";
import classes from "./UsersList.module.css";

const UsersList = (props) => {

  const clickHandler = (e) => {
    props.onClick(Number(e.target.parentNode.parentNode.parentNode.id));
  };

  const deleteHandler = (e) => {
    props.onDelete(Number(e.target.parentNode.parentNode.parentNode.id));
  };

  return (
    <ul className={classes.list}>
      {props.allUsers.length > 0 ? (
        props.allUsers.map((user) => {
          return (
            <li key={user.id} id={user.id}>
              <img src={user.avatar_url} />
              <div className={classes.infos} >
                <p>
                  <span style={{ fontWeight: "bold", color: "darkcyan"}}>
                    Username: &nbsp; &nbsp;
                  </span>
                  {user.login.toLowerCase()}
                </p>
                <div className={classes.buttoncontainer}>
                <button className={classes.button} onClick={clickHandler} >Details</button>
                <button className={classes.deletebutton} onClick={deleteHandler}>Delete</button>
                </div>
              </div>
            </li>
          );
        })
      ) : (
        <p>No user found!</p>
      )}
    </ul>
  );
};

export default UsersList;
