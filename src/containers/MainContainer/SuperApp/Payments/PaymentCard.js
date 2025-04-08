import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import classes from '../Payments/Payments.module.css'
import { useNavigate } from 'react-router-dom'

export default function PaymentCard({ card }) {
  const navigate = useNavigate()
  const handleNavigate = (route) => {
    navigate(route)
  }
  return (

    <div sx={{ maxWidth: 450 }} className={classes.cardpage}  >
      <div className={classes.boxtitle} onClick={() => handleNavigate(card.link)}>
        {card.icon}
      </div>
      <div className={classes.boxdesc}>
        {card.desc}
      </div>


    </div>
  );
}