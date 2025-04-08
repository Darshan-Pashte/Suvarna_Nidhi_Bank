import React from 'react';
import classes from '../Table.module.css';
const TopBar = ({ leftContent, rightContent }) => {
  return (
    <div className={classes.TableTopBar}>
      <div className={classes.leftContent}>{leftContent}</div>
      <div className={classes.rightContent}>{rightContent}</div>
    </div>
  );
};

export default TopBar;
