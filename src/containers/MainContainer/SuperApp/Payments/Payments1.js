import React from 'react'
import classes from '../Payments/Payments.module.css'
import PaymentCard from './PaymentCard'
import { Products1List } from './PaymentList'

const Payments1 = () => {
  return (
   <>
   
   
   
   <div className={classes.boxs}>
    {
        Products1List.map((card,index)=>{
            return(
                <PaymentCard card={card} index={index} />
            )
        })
    }
    </div>
    
    </>
  )
}

export default Payments1
