import React from 'react'

const PRODUCT_VARIANT_ACTIONS = [
    { id: 13, method: "GET",    label: "All variants",    path: "/products/{id}/variants",                  body: false },
  { id: 14, method: "POST",   label: "Add variant",     path: "/products/{id}/variants",                  body: true, defaultBody: '{\n  "size": "M",\n  "color": "red"\n}' },
  { id: 15, method: "PATCH",  label: "Update variant",  path: "/products/{id}/variants/{variantId}",      body: true, defaultBody: '{\n  "size": "L"\n}' },
  { id: 16, method: "DELETE", label: "Delete variant",  path: "/products/{id}/variants/{variantId}",      body: false },

]


export const ProductVariant = () => {
  return (
    <div>ProductVariant</div>
  )
}
