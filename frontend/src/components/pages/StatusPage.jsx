import React from 'react'
import new_ArrivalsImg from '../../assets/status_images/new_arrivals.jpg' 
import on_SaleImg from '../../assets/status_images/on_sale.jpg' 
import {Link} from "react-router-dom"
import { motion } from "framer-motion"
import { FadeIn } from '../../utils/animation'

const Status_Data = [
{
    id: 1,
    name: "New_Arrivals",
    img: new_ArrivalsImg
},
{
    id: 2,
    name: "On_Sale",
    img: on_SaleImg
},
]

const StatusPage = () => {
   return (
    <div className="screen-adapt gap-5">
      <h1 className="page_header">Status</h1>
      <div className="flex flex-wrap gap-5 items-center justify-center lg:justify-start">
        {
        Status_Data.map( (status, index) => (
          <motion.div
            key={status.id}
                variants={FadeIn(0 + index * 0.3)}
                initial="hidden"
                animate = "visible">
              <Link to={`/Status/${status.name}`} className="flex flex-col items-center hover:scale-104 active:scale-100 transition-all" >
                <img className="brand_image" src={status.img}/>
                <h2 className="font-satoshibold text-[22px]">{status.name}</h2>
            </Link>
          </motion.div>
        ))
        } 
      </div>
    </div>
  )
}

export default StatusPage