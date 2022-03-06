import React from 'react'
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes.header}>
        <h1>Github User App</h1>
        <h2>Find users and look at repos</h2>
    </div>
  )
}

export default Header