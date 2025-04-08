import React from 'react';
import classes from './PercentageFillCard.module.css';

const PercentageFillCard = ({ heading, subheading, data }) => {
  return (
    <div className={classes.container}>
       <div className={classes.heading}>{heading}</div>
      <div className={classes.description}>{subheading}</div>
      <div className={classes.graphContainer}>
        {data.map((item , id) => (
          <div  key={id} className={`${classes.bar} ${classes[item?.color]}`}>
            <div className={classes.barFill} style={{ width: '100%', height: `${item.percentage}%`, background: item.color }}></div>
          </div>
        ))}
      </div>
      <p className={classes.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut lobortis metus quis magna lacinia, ac dictum enim interdum.
      </p>
    </div>
  );
};

export default PercentageFillCard;
