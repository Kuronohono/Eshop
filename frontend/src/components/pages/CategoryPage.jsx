import React, { useState, useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import Breadcrumb from '../OtherComponents/Breadcrumb'
import Filters from '../OtherComponents/FilterComponents/Filters'
import ComboBox from '../OtherComponents/ComboBox'
import CardComponent from '../OtherComponents/CardComponent/CardComponent'
import Pagination from '../OtherComponents/Pagination'
import { IoMdOptions } from "react-icons/io"
import LoadingGif from "../../assets/gifs/loading_blue.gif"

const PAGE_SIZE = 9

const typeMap = {
    "t-shirts": "T_SHIRT",
    "shorts":   "SHORT",
    "shirts":   "SHIRT",
    "hoodies":  "HOODIE",
    "jeans":    "JEAN",
}

const typeIdMap = {
    1: "T_SHIRT",
    2: "SHORT",
    3: "SHIRT",
    4: "HOODIE",
    5: "JEAN",
}

const CategoryPage = () => {
    const { gender, category, status, brand } = useParams()
    const segment = category || status || brand
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const [pageHeader, setPageHeader] = useState(category)
    const [sortValue, setSortValue] = useState("popular")
    const [page, setPage] = useState(1)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [filterQuery, setFilterQuery] = useState("")

    /* Reset everything on route change */
    useEffect(() => {
        setProducts([])
        setFilterQuery("")
        setPage(1)
        setLoading(true)
    }, [gender, category, status, brand])

    /* Sort */
    const sortedProducts = useMemo(() => {
        const copy = [...products]
        switch (sortValue) {
            case "price-low-high":  return copy.sort((a, b) => a.price - b.price)
            case "price-high-low":  return copy.sort((a, b) => b.price - a.price)
            case "newest":          return copy.sort((a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate))
            case "rating":          return copy.sort((a, b) => b.productRating - a.productRating)
            default:                return copy.sort((a, b) => b.soldCount - a.soldCount)
        }
    }, [products, sortValue])

    const totalProducts = sortedProducts.length
    const totalPages = Math.max(1, Math.ceil(totalProducts / PAGE_SIZE))

    /* Clamp page */
    useEffect(() => {
        setPage((p) => Math.max(1, Math.min(p, totalPages)))
    }, [totalPages])

    /* Breadcrumbs */
    const crumbs = useMemo(() => {
        if (status) return [
            { label: "Home", to: "/" },
            { label: "Status", to: "/Status" }
        ]
        if (brand) return [
            { label: "Home", to: "/" },
            { label: "Brands", to: "/Brands" },
            { label: brand.replace(/_/g, " ") },
        ]
        return [
            { label: "Home", to: "/" },
            { label: "Shop" },
            { label: gender },
            { label: pageHeader, to: `/${gender}/${pageHeader}` },
        ]
    }, [gender, pageHeader, status, brand])

    /* Fetch */
    useEffect(() => {
        if (!segment) return

        const fetchProducts = async () => {
            setLoading(true)
            try {
                let res

                if (status) {
                    const statusEnum = status.toUpperCase().replace(/ /g, "_")
                    res = await fetch(`http://localhost:8085/products/status/${statusEnum}`)

                } else if (brand) {
                    const brandEnum = brand.replace(/ /g, "_")
                    res = await fetch(`http://localhost:8085/products/brands/${brandEnum}`)

                } else {
                    const categoryType = typeMap[category.toLowerCase()]
                    if (!categoryType) return

                    const params = new URLSearchParams(filterQuery)

                    const typeParam = params.get("type")
                    const productType = typeParam ? typeIdMap[Number(typeParam)] : categoryType
                    if(productType != null)  setPageHeader(productType)

                    const body = { gender: gender.toUpperCase(), productType }
                    if (params.get("sizes"))      body.size = params.get("sizes").split(",")
                    if (params.get("color"))      body.color = params.get("color")
                    if (params.get("minPrice"))   body.minPrice = Number(params.get("minPrice"))
                    if (params.get("maxPrice"))   body.maxPrice = Number(params.get("maxPrice"))
                    if (params.get("dressStyle")) body.dressStyle = params.get("dressStyle")

                    res = await fetch("http://localhost:8085/products/filter", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body)
                    })
                }

                const data = await res.json()
                setProducts(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [gender, category, status, brand, filterQuery])

    const startIndex = (page - 1) * PAGE_SIZE
    const pageItems = sortedProducts.slice(startIndex, startIndex + PAGE_SIZE)
    const rangeStart = totalProducts === 0 ? 0 : startIndex + 1
    const rangeEnd = Math.min(page * PAGE_SIZE, totalProducts)

    const sortOptions = [
        { value: "popular",        label: "Most Popular" },
        { value: "newest",         label: "Newest" },
        { value: "price-low-high", label: "Price ascending" },
        { value: "price-high-low", label: "Price descending" },
        { value: "rating",         label: "Top Rated" },
    ]

    const pageTitle = status?.replace(/_/g, " ")
                   || brand?.replace(/_/g, " ")
                   || pageHeader

    return (
        <div className="screen-adapt">
            <div className="flex flex-col gap-5">
                <div className="h-px bg-black opacity-10 mx-auto w-full" />
                <Breadcrumb crumbs={crumbs} />
                <div className="grid grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-8 items-start justify-center">
                    <Filters onApply={status || brand ? undefined : setFilterQuery}
                    mobileOpen={mobileFiltersOpen}
                    setMobileOpen={setMobileFiltersOpen} />
                    <div className="flex flex-col col-span-2 lg:col-span-3 2xl:col-span-3">
                        <div className="flex gap-2 justify-between items-center">
                            <div className="flex flex-col lg:flex-row items-baseline gap-2">
                                <h1 className="page_header">{pageHeader}</h1>
                                <span className="md:hidden results_span">
                                    Showing <span>{rangeStart}-{rangeEnd}</span> of <span>{totalProducts}</span> Products
                                </span>
                            </div>
                            <div className="hidden lg:flex gap-2">
                                <span className="results_span">
                                    Showing <span>{rangeStart}-{rangeEnd}</span> of <span>{totalProducts}</span> Products
                                </span>
                                <span className="results_span">Sort by:</span>
                                <ComboBox value={sortValue} onChange={setSortValue} options={sortOptions} />
                            </div>
                            <button type="button" className="filter_button_hidden"
                            onClick={() => setMobileFiltersOpen(true)}>
                                <IoMdOptions size={20} />
                            </button>
                        </div>

                        <div className={`grid ${loading ? 'grid-cols-1' : 'grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'} gap-5 lg:gap-7 mt-5`}>
                            {loading ? (
                                <div className='flex items-center justify-center w-full'>
                                    <img src={LoadingGif} />
                                </div>
                            ) : (
                                pageItems.map((product, index) => (
                                    <div key={`${startIndex + index}-${product.id}`}>
                                        <CardComponent product={product} crumbs={crumbs} />
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="h-px bg-black opacity-10 mx-auto w-full mt-10 mb-5" />
                        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryPage