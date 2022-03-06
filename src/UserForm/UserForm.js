import React, {useRef, useEffect, useState} from "react";
import { BsSearch } from "react-icons/bs";
import classes from "./UserForm.module.css";

const UserForm = (props) => {
  const inputRef = useRef("");
 

  const submitHandler = (e) => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    props.getInputValue(value);
    inputRef.current.value = "";
  }

  return (
    <form className={classes.form} onSubmit={submitHandler} >
      <input ref={inputRef} />
      <button type="submit" className={classes.button}>
        <span>Add to list</span>
        <BsSearch />
      </button>
    </form>
  );
};

export default UserForm;
