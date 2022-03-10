import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import UserForm from "./UserForm/UserForm";
import CurrentUser from "./CurrentUser/CurrentUser";
import UsersList from "./UsersList/UsersList";

function App() {
  const [value, setValue] = useState(null);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [showCurrentUser, setShowCurrentUser] = useState(false);
  const [wrongUserName, setWrongUserName] = useState(false);
  const [detailedUser, setDetailedUser] = useState();
  const [addedUser, setAddedUser] = useState(false);

  const inputValueHandler = (v) => {
    if (v === "") {
      setError(true);
    }
    setTimeout(() => {
      setError(false);
    }, 2000);
    if (users.length > 0) {
      users.map((user) => {
        if (v === user.login.toLowerCase()) {
          setAddedUser(true);
          setTimeout(() => {
            setAddedUser(false);
          }, 2000);
        }
      });
    }
    setValue(v);
  };

  useEffect(() => {
    let newUsers = users.length > 0 ? [...users] : [];

    if (value === "" || value === undefined) {
      setWrongUserName(false);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    fetch(`https://api.github.com/users/${value}`)
      .then((response) => {
        if (response.status === 200) {
          setWrongUserName(false);
          setError(false);
          return response.json();
        } else {
          setError(false);
          setWrongUserName(true);
          setTimeout(() => {
            setWrongUserName(false);
          }, 2000);
        }
      })
      .then((data) => {
        if (data.login !== "null") {
          const checkedUsers = users.filter((user) => {
            return user.id !== data.id;
          });
          newUsers = [data, ...checkedUsers];
          setUsers(newUsers);
        }
        setUsers(newUsers);
      })
      .catch((err) => console.log(err));
  }, [value]);

  const currentUserHandler = () => {
    setShowCurrentUser(false);
  };

  const detailHandler = (id) => {
    const newDetailedUser = users.filter((user) => user.id === id);
    setDetailedUser(newDetailedUser);
    setShowCurrentUser(true);
  };

  const deleteUserHandler = (id) => {
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
    setValue(null);
  };

  const changeHandler = (v) => {
    setAddedUser(false);
    setError(v);
    setWrongUserName(v);
  };

  const warningStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: "100%",
    fontWeight: "bold",
    color: "#fff",
    padding: "1rem 1rem",
    backgroundColor: "darkred",
    textAlign: "center"
  };

  return (
    <div className="App">
      {error && <p style={warningStyles}>Please type a username!</p>}
      {wrongUserName && <p style={warningStyles}>Wrong username!</p>}
      {addedUser && (
        <p style={warningStyles}>This user already added to list!</p>
      )}
      {showCurrentUser && (
        <CurrentUser onClick={currentUserHandler} user={detailedUser} />
      )}
      <Header />
      <UserForm
        getInputValue={inputValueHandler}
        changeHandler={changeHandler}
      />
      {users.length > 0 && (
        <UsersList
          allUsers={users}
          onClick={detailHandler}
          onDelete={deleteUserHandler}
        />
      )}
    </div>
  );
}

export default App;
