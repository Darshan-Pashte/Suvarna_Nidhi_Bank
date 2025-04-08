import React from 'react'
import classes from '../Payments/Payments.module.css'
import { ServiceRequestList1 } from './ServiceRequestList'
import ServiceRequestCard from './ServiceRequestCard'

const ServiceChild1 = () => {
  return (
   <>
   
   
   
   <div className={classes.boxs}>
    {
        ServiceRequestList1.map((card,index)=>{
            return(
                <ServiceRequestCard card={card} index={index} />
            )
        })
    }
    </div>
    
    </>
  )
}

export default ServiceChild1
