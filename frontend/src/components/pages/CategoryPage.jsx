import React, { useState, useEffect, useMemo } from 'react'
import { useParams} from 'react-router-dom'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import Filters from '../OtherComponents/FilterComponents/Filters'
import ComboBox from '../OtherComponents/ComboBox';
import CardComponent from '../OtherComponents/CardComponent/CardComponent'
import Pagination from '../OtherComponents/Pagination';
import { IoMdOptions } from "react-icons/io";
import LoadingGif from "../../assets/gifs/loading_blue.gif"
import { fetchFilteredProducts } from "../../utils/productsApi";

const PAGE_SIZE = 9

const CategoryPage = () => {
    const { gender, category } = useParams()
    const [sortValue, setSortValue] = useState("popular")
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeFilter, setActiveFilter] = useState({})
    const totalProducts = products.length
    const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))
    
    useEffect(() => {
        setPage(1)
    }, [category])

    useEffect(() => {
        setPage((p) => Math.max(1, Math.min(p, totalPages)))
    }, [totalPages])

    const sortByMap = {
        popular: "soldCount",
        newest: "arrivalDate",
        "price-low-high": "price",
        "price-high-low": "price",
        rating: "productRating",
    }

    const baseFilter = useMemo(() => {
        const g = gender ? gender.toUpperCase() : undefined
        const typeMap = {
            "t-shirts": "T_SHIRT",
            "shorts": "SHORT",
            "shirts": "SHIRT",
            "hoodie": "HOODIE",
            "jeans": "JEAN",
        }
        const typeFromRoute = category ? typeMap[String(category).toLowerCase()] : undefined
        return {
            gender: g,
            productTypes: typeFromRoute ? [typeFromRoute] : undefined,
        }
    }, [gender, category])

    useEffect(() => {
        setLoading(true)
        fetchFilteredProducts(
            { ...baseFilter, ...activeFilter },
            { page, pageSize: PAGE_SIZE, sortBy: sortByMap[sortValue] ?? "name" }
        )
            .then((data) => {
                // backend returns Page<Product>
                setProducts(Array.isArray(data?.content) ? data.content : [])
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setProducts([])
                setLoading(false)
            })
    }, [baseFilter, activeFilter, page, sortValue])

    const rangeStart = totalProducts === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
    const rangeEnd = Math.min(page * PAGE_SIZE, totalProducts)
    const sortOptions = [
        { value: "popular", label: "Most Popular" },
        { value: "newest", label: "Newest" },
        { value: "price-low-high", label: "Price ascending" },
        { value: "price-high-low", label: "Price descending" },
        { value: "rating", label: "Top Rated" },
    ]

    const crumbs = useMemo(() => {
        const g = gender ? gender.charAt(0).toUpperCase() + gender.slice(1) : null
        const c = category ? String(category).replace(/-/g, " ") : null
        const list = [{ label: "Home", to: "/home" }]
        if (g) list.push({ label: g, to: `/${gender}` })
        if (c) list.push({ label: c, to: `/${gender}/${category}` })
        return list
    }, [gender, category])

  return (
    <div className="screen-adapt">
        <div className="flex flex-col gap-5">
            <div className="h-px bg-black opacity-10 mx-auto w-full" />

            {/*Breadcrumb */}
            <Breadcrumb/>

            {/*Page Section */}
            <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-8 items-start justify-center">

                {/* Filters Section Column */}
                
                <Filters
                    initial={activeFilter}
                    onApply={(payload) => {
                        setPage(1)
                        setActiveFilter(payload)
                    }}
                />

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
                            products.map((product,index) =>(
                                <div key={`${index}-${product.id}`}>
                                    <CardComponent product={product} crumbs={crumbs} />
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