import * as React from 'react';
import classes from "./AccountLimit.module.css";
import { useNavigate } from 'react-router-dom'
import { Grid } from '@mui/material';
import EnterTpin from './enterTpin';
import { useState } from 'react';

export default function BeneficiaryCard({ benelist , index, accno}) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleNavigate = (route) => {
    navigate(route, { state: {benelist, accno} })
  }

  
  
  
  

  return (
<>

    <div key={index} className={classes.uppercontainerleftcontent}>
              <div className={classes.uppercontainerleftcontenttop}>
                <div className={classes.leftcontenttopleft}>
                  Beneficiary List
                </div>

                <div className={classes.leftcontenttopright} onClick={handleOpen}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M4 7H20M10 11V17M14 11V17M5 7L6 19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19L19 7M9 7V4C9 3.73478 9.10536 3.48043 9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3H14C14.2652 3 14.5196 3.10536 14.7071 3.29289C14.8946 3.48043 15 3.73478 15 4V7"
                      stroke="#707070"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <div className={classes.uppercontainerleftcontentmiddle}>
                <div
                  className={classes.uppercontainerleftcontentmiddlecontainer}
                >
                  <div className={classes.middlecontainertitle}>
                    Account Number
                  </div>
                  <div className={classes.middlecontainerinfo}>{benelist?.accNo}</div>
                </div>
                <div
                  className={classes.uppercontainerleftcontentmiddlecontainer}
                >
                  <div className={classes.middlecontainertitle}>IFSC Code</div>
                  <div className={classes.middlecontainerinfo}>{benelist?.ifsc}</div>
                </div>
                <div
                  className={classes.uppercontainerleftcontentmiddlecontainer}
                >
                  <div className={classes.middlecontainertitle}>Full Name</div>
                  <div className={classes.middlecontainerinfo}>
                  {benelist?.name}
                  </div>
                </div>

                <div
                  className={classes.uppercontainerleftcontentmiddlecontainer}
                >
                  <div className={classes.middlecontainertitle}>Nickname</div>
                  <div className={classes.middlecontainerinfo}>{benelist?.nickname}</div>
                </div>
              </div>
            </div>
            {open ? (
                <EnterTpin
                  open={open}
                  handleClose={handleClose}
                  userId={benelist}
                />
              ) : null}        
    </>
            
  );
}