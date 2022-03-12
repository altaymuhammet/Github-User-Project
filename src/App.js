import "./App.css";
import React, {useEffect, useReducer } from "react";
import Header from "./Header/Header";
import UserForm from "./UserForm/UserForm";
import CurrentUser from "./CurrentUser/CurrentUser";
import UsersList from "./UsersList/UsersList";

const stateReducer = (state, action) => {
  if (action.type === "CURRENTUSER_STATE") {
    return { ...state, showCurrentUser: action.val };
  }
  if (action.type === "VALUE_STATE") {
    return { ...state, value: action.val };
  }
  if (action.type === "SETUSERS_STATE") {
    return { ...state, users: action.val };
  }
  if (action.type === "ERROR_STATE") {
    return { ...state, error: action.val };
  }
  if (action.type === "WRONGUSERNAME_STATE") {
    return { ...state, wrongUserName: action.val };
  }
  if (action.type === "DETAILEDUSER_STATE") {
    return { ...state, detailedUser: action.val };
  }
  if (action.type === "ADDEDUSER_STATE") {
    return { ...state, addedUser: action.val };
  }
};

function App() {
  const [allStates, dispatchAllStates] = useReducer(stateReducer, {
    value: null,
    users: JSON.parse(localStorage.getItem("users")),
    error: false,
    showCurrentUser: false,
    wrongUserName: false,
    detailedUser: null,
    addedUser: false,
  });

  const inputValueHandler = (v) => {
    if (v === "") {
      dispatchAllStates({ type: "ERROR_STATE", val: true });
    }
    setTimeout(() => {
      dispatchAllStates({ type: "ERROR_STATE", val: false });
    }, 2000);
    if (allStates.users.length > 0) {
      allStates.users.map((user) => {
        if (v === user.login.toLowerCase()) {
          dispatchAllStates({ type: "ADDEDUSER_STATE", val: true });
          setTimeout(() => {
            dispatchAllStates({ type: "ADDEDUSER_STATE", val: false });
          }, 2000);
        }
      });
    }
    dispatchAllStates({ type: "VALUE_STATE", val: v });
  };

  useEffect(() => {
    let newUsers = allStates.users.length > 0 ? allStates.users : [];

    if (allStates.value === "" || allStates.value === undefined) {
      dispatchAllStates({ type: "WRONGUSERNAME_STATE", val: false });
      dispatchAllStates({ type: "ERROR_STATE", val: true });
      setTimeout(() => {
        dispatchAllStates({ type: "ERROR_STATE", val: false });
      }, 2000);
      return;
    }
    fetch(`https://api.github.com/users/${allStates.value}`)
      .then((response) => {
        if (response.status === 200) {
          dispatchAllStates({ type: "WRONGUSERNAME_STATE", val: false });
          dispatchAllStates({ type: "ERROR_STATE", val: false });
          return response.json();
        } else {
          dispatchAllStates({ type: "ERROR_STATE", val: false });
          dispatchAllStates({ type: "WRONGUSERNAME_STATE", val: true });
          setTimeout(() => {
            dispatchAllStates({ type: "WRONGUSERNAME_STATE", val: false });
          }, 2000);
        }
      })
      .then((data) => {
        if (data.login !== "null") {
          const checkedUsers = allStates.users.filter((user) => {
            return user.id !== data.id;
          });
          newUsers = [data, ...checkedUsers];
          localStorage.setItem("users", JSON.stringify(newUsers))
          dispatchAllStates({ type: "SETUSERS_STATE", val: JSON.parse(localStorage.getItem("users")) });
        }
        dispatchAllStates({ type: "SETUSERS_STATE", val: newUsers });
      })
      .catch((err) => console.log(err));
  }, [allStates.value]);
  const currentUserHandler = () => {
    dispatchAllStates({ type: "CURRENTUSER_STATE", val: false });
  };

  const detailHandler = (id) => {
    const newDetailedUser = allStates.users.filter((user) => user.id === id);
    dispatchAllStates({ type: "DETAILEDUSER_STATE", val: newDetailedUser });
    dispatchAllStates({ type: "CURRENTUSER_STATE", val: true });
  };

  const deleteUserHandler = (id) => {
    const newUsers = allStates.users.filter((user) => user.id !== id);
    localStorage.setItem("users", JSON.stringify(newUsers));
    dispatchAllStates({ type: "SETUSERS_STATE", val: JSON.parse(localStorage.getItem("users")) });
    dispatchAllStates({ type: "VALUE_STATE", val: null });
  };

  const changeHandler = (v) => {
    dispatchAllStates({ type: "ADDEDUSER_STATE", val: false });
    dispatchAllStates({ type: "ERROR_STATE", val: v });
    dispatchAllStates({ type: "WRONGUSERNAME_STATE", val: v });
  };

  const warningStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    fontWeight: "bold",
    color: "#fff",
    padding: "1rem 1rem",
    backgroundColor: "darkred",
    textAlign: "center",
  };

  return (
    <div className="App">
      {allStates.error && <p style={warningStyles}>Please type a username!</p>}
      {allStates.wrongUserName && <p style={warningStyles}>Wrong username!</p>}
      {allStates.addedUser && (
        <p style={warningStyles}>This user already added to list!</p>
      )}
      {allStates.showCurrentUser && (
        <CurrentUser
          onClick={currentUserHandler}
          user={allStates.detailedUser}
        />
      )}
      <Header />
      <UserForm
        getInputValue={inputValueHandler}
        changeHandler={changeHandler}
      />
      {allStates.users.length > 0 && (
        <UsersList
          allUsers={allStates.users}
          onClick={detailHandler}
          onDelete={deleteUserHandler}
        />
      )}
    </div>
  );
}

export default App;
