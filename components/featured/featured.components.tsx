import { connectDB } from '@/config/database'
import Property from '@/models/property.model'

import PropertyCard from '../property/property-card.component'
import type { IProperty } from '@/types'

const Featured = async () => {
  await connectDB()

  const featuredProperties = (await Property.find({
    is_featured: true,
  }).lean()) as IProperty[]

  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6'>
            Featured Properties
          </h2>
          {!featuredProperties.length ? (
            <p>No featured properties available</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {featuredProperties.map((property) => (
                <PropertyCard key={property.name} {...property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
export default Featured
