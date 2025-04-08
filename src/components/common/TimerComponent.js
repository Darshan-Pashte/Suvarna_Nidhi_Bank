import React, { useEffect, useState, useMemo } from "react";
import Countdown from "react-countdown";
import SweetAlertPopup from "./sweetAlertPopup";
import classes from "./common.module.css";

const MTimerComponent = ({ id, Time, Case, setOtp }) => {
  const [timerDuration, setTimerDuration] = useState(60000);

  useEffect(() => {
  

    if (Time !== undefined && Case) {
      let newTimerDuration;

      switch (Case) {
        case "Minutes":
          newTimerDuration = Number(Time) * 60 * 1000;
          break;
        case "Seconds":
          newTimerDuration = Number(Time) * 1000;
          break;
        case "Milliseconds":
          newTimerDuration = Number(Time);
          break;
        default:
          newTimerDuration = 10000;
          break;
      }

      setTimerDuration(newTimerDuration);
    }
  }, [id, Time, Case]);

  const renderer = useMemo(() => {
    return ({ minutes, seconds, completed }) => {
      if (completed) {
        SweetAlertPopup("Otp Expired", "Error", "error");
        setOtp();
      } else {
        return (
          <div className={classes.TimerStyle}>
            Otp will expire in :
            <span className={classes.TimerStyle}>
              {minutes}:{seconds}
            </span>
          </div>
        );
      }
    };
  }, [setOtp]);


  return <Countdown key={id} date={Date.now() + timerDuration} renderer={renderer} />;
};

const TimerComponent = React.memo(MTimerComponent, (prevProps, nextProps) => {
  return prevProps?.id === nextProps?.id;
});

export default TimerComponent;
