import React from "react";
import styles from "./Card.module.css";

const CardWithMultipleChips = () => {
  const data = [
    { subject: "Maths", percentage: 90, color: "#42a5f5" },
    { subject: "English", percentage: 20, color: "#ff8a65" },
    { subject: "History", percentage: 50, color: "#66bb6a" },
    { subject: "Physics", percentage: 70, color: "#ab47bc" },
    { subject: "Chemistry", percentage: 60, color: "#26c6da" },
    { subject: "Biology", percentage: 80, color: "#ffa726" },
    { subject: "Geography", percentage: 40, color: "#78909c" },
  ];

  return (
    <div className={styles.card}>
      {data.map(({ subject, percentage, color }) => (
        <div className={styles.row} key={subject}>
          <div className={styles.subject}>{subject}</div>
          <div className={styles.percentage} style={{ backgroundColor: color }}>
            {percentage}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardWithMultipleChips;