import React from 'react'
import { useRouter } from 'next/router'
const ProductPage = () => {
  const router = useRouter()
  console.log(router)

  return <div>this is product page</div>
}
export default ProductPage
