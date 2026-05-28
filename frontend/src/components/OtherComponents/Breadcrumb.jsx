import React, { useMemo } from 'react'
import { useLocation, Link } from "react-router-dom"

const Breadcrumb = () => {
    const location = useLocation()
    const pathnames = useMemo(
      () => location.pathname.split('/').filter(x => x),
      [location.pathname]
    )

    // Optional crumb trail passed via Link state.
    // Example: [{ label: "Home", to: "/home" }, { label: "Men", to: "/men" }, ...]
    const stateCrumbs = location.state?.crumbs
    const productName = location.state?.product?.name

  return (
    <nav className="text-blackmy-4 truncate">
        <ul className="flex">
            {Array.isArray(stateCrumbs) && stateCrumbs.length > 0 ? (
              stateCrumbs.map((c, idx) => {
                const last = idx === stateCrumbs.length - 1
                return (
                  <li key={c.to ?? `${c.label}-${idx}`}>
                    {idx !== 0 && <span className="mx-2 text-black opacity-60">{'>'}</span>}
                    {last ? (
                      <span className="font-satoshi text-black opacity-90">{c.label}</span>
                    ) : (
                      <Link to={c.to} className="font-satoshi text-black opacity-60 hover:underline">
                        {c.label}
                      </Link>
                    )}
                  </li>
                )
              })
            ) : (
              <>
                <li>
                  <Link to="/home" className="font-satoshi text-black opacity-60 hover:underline">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                  const last = index === pathnames.length - 1
                  const to = `/${pathnames.slice(0, index + 1).join('/')}`
                  const title = last && productName ? productName : value

                  return (
                    <li key={to}>
                      <span className="mx-2 text-black opacity-60">{'>'}</span>
                      {last ? (
                        <span className="font-satoshi text-black opacity-90">{title}</span>
                      ) : (
                        <Link to={to} className="font-satoshi text-black opacity-60 hover:underline">
                          {value}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </>
            )}
        </ul>
    </nav>
  )
}

export default Breadcrumb