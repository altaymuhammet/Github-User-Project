import React, {useRef, useState} from "react";
import { BsSearch } from "react-icons/bs";
import classes from "./UserForm.module.css";

const UserForm = (props) => {
  const inputRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    props.getInputValue(inputRef.current.value.trim());
    inputRef.current.value = "";
  }

  const changeHandler = (e) => {
    props.changeHandler(false)
  }

  return (
    <form className={classes.form} >
      <input ref={inputRef} onChange={changeHandler} />
      <button type="submit" className={classes.button} onClick={submitHandler}>
        <span>Add to list</span>
        <BsSearch />
      </button>
    </form>
  );
};

export default UserForm;
