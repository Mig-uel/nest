import PropertyCard from '@/components/property/property-card.component'
import properties from '@/properties.json'

const PropertiesPage = () => {
  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {!properties.length ? (
          <p>No properties available</p>
        ) : (
          <div className='grid gird-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => {
              const { _id } = property

              return <PropertyCard key={_id} property={property} />
            })}
          </div>
        )}
      </div>
    </section>
  )
}
export default PropertiesPage
