import { connectDB } from '@/config/database'
import Property from '@/models/property.model'

import PropertyCard from '../property/property-card.component'
import type { IProperty } from '@/types'
import FeaturedPropertyCard from './featured-card.component'

const Featured = async () => {
  await connectDB()

  const featuredProperties = (await Property.find({
    is_featured: true,
  })
    .limit(2)
    .lean()) as IProperty[]

  return (
    <>
      <section className='bg-blue-50 px-4 pt-6 pb-10'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold text-blue-500 mb-6'>
            Featured Properties
          </h2>
          {!featuredProperties.length ? (
            <p>No featured properties available</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {featuredProperties.map((property) => (
                // <PropertyCard key={property.name} {...property} />
                <FeaturedPropertyCard
                  key={property._id?.toString()}
                  {...property}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
export default Featured
