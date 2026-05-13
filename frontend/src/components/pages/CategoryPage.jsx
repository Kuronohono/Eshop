import React, { useState, useEffect } from 'react'
import { useParams} from 'react-router-dom'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import Filters from '../OtherComponents/FilterComponents/Filters'
import ComboBox from '../OtherComponents/ComboBox';
import CardComponent from '../OtherComponents/CardComponent/CardComponent'
import Img1 from "../../assets/placeholder_imgs/tapeshirt.png"
import Img2 from "../../assets/placeholder_imgs/skinnyjeans.png"
import Img3 from "../../assets/placeholder_imgs/checkered_shirt.png"
import Img4 from "../../assets/placeholder_imgs/sleevestriped.png"
import Img5 from "../../assets/placeholder_imgs/vertical_striped.png"
import Img6 from "../../assets/placeholder_imgs/courage_shirt.png"
import Img7 from "../../assets/placeholder_imgs/bermuda_shorts.png"
import Img8 from "../../assets/placeholder_imgs/faded_skinny.png"
import Pagination from '../OtherComponents/Pagination';
import { IoMdOptions } from "react-icons/io";
const ProdutsData = [
{
    id: 1,
    img: Img1,
    title: "T-shirt with Tape Details",
    rating: 4.5,
    price: 120,
    sale_per: 0,
},
{
    id: 2,
    img: Img2,
    title: "Skinny Fit Jeans",
    rating: 3.5,
    price: 260,
    sale_per: 20,
},
{
    id: 3,
    img: Img3,
    title: "Checkered Shirt",
    rating: 4.5,
    price: 180,
    sale_per: 0,
},
{
    id: 4,
    img: Img4,
    title: "Sleeve Striped T-shirt",
    rating: 4.5,
    price: 160,
    sale_per: 30,
},
{
    id: 5,
    img: Img5,
    title: "Vertical Striped Shirt",
    rating: 5.0,
    price: 232,
    sale_per: 20
},
{
    id: 6,
    img: Img6,
    title: "Courage Graphic T-shirt",
    rating: 4.0,
    price: 145,
    sale_per: 0
},
{
    id: 7,
    img: Img7,
    title: "Loose Fit Bermuda Shorts",
    rating: 3.0,
    price: 80,
    sale_per: 0
},
{
    id: 8,
    img: Img8,
    title: "Faded Skinny Jeans",
    rating: 4.5,
    price: 210,
    sale_per: 0
},
{
    id: 9,
    img: Img1,
    title: "T-shirt with Tape Details",
    rating: 4.5,
    price: 120,
    sale_per: 0,
},
{
    id: 10,
    img: Img2,
    title: "Skinny Fit Jeans",
    rating: 3.5,
    price: 260,
    sale_per: 20,
},
{
    id: 11,
    img: Img3,
    title: "Checkered Shirt",
    rating: 4.5,
    price: 180,
    sale_per: 0,
},
]

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
                            className="md:hidden inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F0F0F0] text-black rotate-90"
                            aria-label="Open filters"
                        >
                            <IoMdOptions size={20} />
                        </button>
                    </div>


                    {/* Products */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 lg:gap-7 mt-5">
                       {loading ? (
                        <p>Loading...</p>
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