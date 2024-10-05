import Link from 'next/link'
import { connectDB } from '@/config/database'
import Property from '@/models/property.model'

import PropertyCard from '../property/property-card.component'
import type { IProperty } from '@/types'

const Featured = async () => {
  await connectDB()
  const properties = (await Property.find({}).lean()) as IProperty[]

  // return random property
  const randomProperty = () => {
    const randInt = Math.floor(Math.random() * properties.length)

    return properties[randInt]
  }

  // TODO: implement better featured property mechanism
  const featuredProperties: IProperty[] = [
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
                <PropertyCard key={property.name} {...property} />
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
