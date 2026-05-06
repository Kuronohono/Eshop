import React from 'react'
import { useParams} from 'react-router-dom'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import Filters from '../OtherComponents/Filters'

const CategoryPage = () => {
    const {category} = useParams()

  return (
    <div className="screen-adapt">
        <div className="flex flex-col gap-5">
            <div className="h-px bg-black opacity-10 mx-auto w-full" />

            {/*Breadcrumb */}
            <Breadcrumb/>

            {/*Page Section */}
            <div className="grid grid-cols-4 gap-10 ">

                {/* Filters Section Column */}
                
                <Filters/>

                {/*Results Section Columns */}
                <div className="col-span-3">
                    <h1 className="font-satoshibold text-[24px] md:text-[32px]">{category}</h1>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CategoryPage