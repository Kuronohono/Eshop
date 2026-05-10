import React from 'react'
import { useParams} from 'react-router-dom'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import Filters from '../OtherComponents/FilterComponents/Filters'

const CategoryPage = () => {
    const {category} = useParams()

  return (
    <div className="screen-adapt">
        <div className="flex flex-col gap-5">
            <div className="h-px bg-black opacity-10 mx-auto w-full" />

            {/*Breadcrumb */}
            <Breadcrumb/>

            {/*Page Section */}
            <div className="grid grid-cols-4 2xl:grid-cols-5 gap-10 ">

                {/* Filters Section Column */}
                
                <Filters/>

                {/*Results Section Columns */}
                <div className="flex col-span-3 ">
                    
                    <div className="flex justify-between">
                        <h1 className="page_header">{category}</h1>

                        <div>
                            <span>Showing<span>1-10</span> of <span> 100</span> Products</span>
                        </div>
                        </div>
                    </div>

            </div>
        </div>
    </div>
  )
}

export default CategoryPage