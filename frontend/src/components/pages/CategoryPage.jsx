import React, { useState } from 'react'
import { useParams} from 'react-router-dom'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import Filters from '../OtherComponents/FilterComponents/Filters'
import ComboBox from '../OtherComponents/ComboBox';

const CategoryPage = () => {
    const {category} = useParams()
    const [sortValue, setSortValue] = useState("popular")
    const sortOptions = [
        { value: "popular", label: "Most Popular" },
        { value: "newest", label: "Newest" },
        { value: "price-low-high", label: "Price: Low to High" },
        { value: "price-high-low", label: "Price: High to Low" },
        { value: "rating", label: "Top Rated" },
    ]

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
                <div className="flex col-span-3 justify-between ">
                    

                        <h1 className="page_header">{category}</h1>

                        <div className="flex gap-2">
                            <span className="results_span">Showing <span>1-10</span> of <span> 100</span> Products</span>
                            <span className="results_span">Sort by:</span>
                            <ComboBox
                                value={sortValue}
                                onChange={setSortValue}
                                options={sortOptions}
                            />
                        </div>
                        
                </div>

            </div>
        </div>
    </div>
  )
}

export default CategoryPage