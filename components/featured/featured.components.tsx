import Link from 'next/link'

import properties from '@/properties.json'
import PropertyCard from '../property/property-card.component'

type Property = {
  _id?: string
  owner: string
  name: string
  type: string
  description: string
  location: {
    street: string
    city: string
    state: string
    zipcode: string
  }
  beds: number
  baths: number
  square_feet: number
  amenities: string[]
  rates: {
    weekly?: number
    monthly?: number
    nightly?: number
  }
  seller_info: {
    name: string
    email: string
    phone: string
  }
  images: string[]
  is_featured: boolean
  createdAt?: string
  updatedAt?: string
}

const Featured = () => {
  const randomProperty = () => {
    const randInt = Math.floor(Math.random() * properties.length)

    return properties[randInt]
  }

  const featuredProperties = [
    randomProperty(),
    randomProperty(),
    randomProperty(),
  ]

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6'>
            Featured Properties
          </h2>
          {!properties.length ? (
            <p>No properties available</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {featuredProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className='m-auto max-w-lg my-6 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  )
}
export default Featured
