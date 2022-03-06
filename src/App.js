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

  const inputValueHandler = (value) => {
    setValue(value);
  };

  useEffect(() => {
    let newUsers = [];

    if (value === "") {
      setWrongUserName(false);
      setError(true);
      return;
    }

    fetch(` https://api.github.com/users/${value}`)
      .then((response) => {
        if (response.status === 200) {
          setWrongUserName(false);
          setError(false);
          return response.json();
        } else {
          setError(false);
          setWrongUserName(true);
        }
      })
      .then(data => {
        console.log(data)
        if (data.login !== "null") {
          newUsers = [data, ...users];
        }
        setUsers(newUsers);
      })
      .catch((err) => console.log(err));
  }, [value]);

  const currentUserHandler = () => {
    setShowCurrentUser(false);
  };

  const detailHandler = (id) => {
    const newDetailedUser = users.filter( user => user.id === id)
    setDetailedUser(newDetailedUser);
    setShowCurrentUser(true);
  };

  return (
    <div className="App">
      <Header />
      <UserForm getInputValue={inputValueHandler} />
      {error &&  (
        <p
          style={{
            fontWeight: "bold",
            color: "#fff",
            padding: ".5rem 1rem",
            backgroundColor: "darkred",
            borderRadius: ".5rem",
          }}
        >
          Please type a username!
        </p>
      )}
      {wrongUserName && (
        <p
          style={{
            fontWeight: "bold",
            color: "#fff",
            padding: ".5rem 1rem",
            backgroundColor: "darkred",
            borderRadius: ".5rem",
          }}
        >
          Wrong username!
        </p>
      )}
      {showCurrentUser && <CurrentUser onClick={currentUserHandler} user={detailedUser} />}
      {users.length > 0 && <UsersList allUsers={users} onClick={detailHandler} />}
    </div>
  );
}

export default App;
