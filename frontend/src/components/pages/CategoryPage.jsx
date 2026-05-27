import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import Filters from '../OtherComponents/FilterComponents/Filters'
import ComboBox from '../OtherComponents/ComboBox';
import CardComponent from '../OtherComponents/CardComponent/CardComponent'
import Pagination from '../OtherComponents/Pagination';
import { IoMdOptions } from "react-icons/io";
import LoadingGif from "../../assets/gifs/loading_blue.gif"


const PAGE_SIZE = 9

const CategoryPage = () => {
    const {category} = useParams()
    const [sortValue, setSortValue] = useState("popular")
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const totalProducts = products.length
    const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))
    
    useEffect(() => {
        setPage(1)
    }, [category])

    useEffect(() => {
        setPage((p) => Math.max(1, Math.min(p, totalPages)))
    }, [totalPages])

    useEffect(() => {
        fetch("http://localhost:8085/products")
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setLoading(false)
            })
            .catch(err => {
                console.error(err)
                setLoading(false)
            })
    }, [])

    const startIndex = (page - 1) * PAGE_SIZE
    const pageItems = products.slice(startIndex, startIndex + PAGE_SIZE)
    const rangeStart = totalProducts === 0 ? 0 : startIndex + 1
    const rangeEnd = Math.min(page * PAGE_SIZE, totalProducts)
    const sortOptions = [
        { value: "popular", label: "Most Popular" },
        { value: "newest", label: "Newest" },
        { value: "price-low-high", label: "Price ascending" },
        { value: "price-high-low", label: "Price descending" },
        { value: "rating", label: "Top Rated" },
    ]

  return (
    <div className="screen-adapt">
        <div className="flex flex-col gap-5">
            <div className="h-px bg-black opacity-10 mx-auto w-full" />

            {/*Breadcrumb */}
            <Breadcrumb/>

            {/*Page Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-8 items-start justify-center">

                {/* Filters Section Column */}
                
                <Filters/>

                {/*Results Section Columns */}
                <div className="flex flex-col col-span-2 lg:col-span-3 2xl:col-span-3">

                    {/*Page Header and Sorting */}
                    <div className="flex gap-2 justify-between items-center ">

                        <div className="flex items-baseline gap-2 ">
                        <h1 className="page_header">{category}</h1>
                         <span className="md:hidden results_span">
                            Showing <span>{rangeStart}-{rangeEnd}</span> of{" "}
                            <span> {totalProducts}</span> Products
                        </span>
                        </div>


                        <div className="hidden lg:flex gap-2">
                            <span className="results_span">
                                Showing <span>{rangeStart}-{rangeEnd}</span> of{" "}
                                <span> {totalProducts}</span> Products
                            </span>
                            <span className="results_span">Sort by:</span>
                            <ComboBox 
                                value={sortValue}
                                onChange={setSortValue}
                                options={sortOptions}
                            />
                        
                        </div>
                        <button
                            type="button"
                            className="filter_button_hidden"
                        >
                            <IoMdOptions size={20} />
                        </button>
                    </div>


                    {/* Products */}
                    <div className={`grid ${loading? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'} gap-5 lg:gap-7 mt-5`}>
                       {loading ? (
                        <div className='flex items-center justify-center w-full'><img src={LoadingGif}/></div>
                       )
                       :(
                            pageItems.map((product,index) =>(
                                <div key={`${startIndex + index}-${product.id}`}>
                                    <CardComponent product={product} />
                                </div>
                            ))
                       )}

                    </div>

                    <div className="h-px bg-black opacity-10 mx-auto w-full mt-10 mb-5" />

                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={setPage}
                    />
                        
                </div>



            </div>
        </div>
    </div>
  )
}

export default CategoryPage