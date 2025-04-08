import React from 'react'
import classes from '../Payments/Payments.module.css'
import { ServiceRequestList1, ServiceRequestList2, ServiceRequestList3 } from './ServiceRequestList'
import ServiceRequestCard from './ServiceRequestCard'

const ServiceChild3 = () => {
  return (
   <>
   
   
   
   <div className={classes.boxs}>
    {
        ServiceRequestList3.map((card,index)=>{
            return(
                <ServiceRequestCard card={card} index={index} />
            )
        })
    }
    </div>
    
    </>
  )
}

export default ServiceChild3
