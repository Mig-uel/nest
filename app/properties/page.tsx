import { connectDB } from '@/config/database'
import Property from '@/models/property.model'
import PropertyCard from '@/components/property/property-card.component'
import { IProperty } from '@/types'

const PropertiesPage = async ({
  searchParams: { page = 1, pageSize = 2 },
}: {
  searchParams: { page: number; pageSize: number }
}) => {
  await connectDB()

  const skip = (page - 1) * pageSize
  const total = await Property.estimatedDocumentCount({})

  const properties = (await Property.find({})
    .skip(skip)
    .limit(pageSize)
    .lean()) as IProperty[]

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {!properties.length ? (
          <p>No properties available</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => {
              return <PropertyCard key={property.name} {...property} />
            })}
          </div>
        )}
      </div>
    </section>
  )
}
export default PropertiesPage
