import React from "react";
import classes from "./UsersList.module.css";

const UsersList = (props) => {

  const clickHandler = (e) => {
    props.onClick(Number(e.target.parentElement.parentElement.id));
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
                  {user.login}
                </p>
                <button className={classes.button} onClick={clickHandler} >See Details</button>
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
