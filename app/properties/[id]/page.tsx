import Link from 'next/link'
import { redirect } from 'next/navigation'
import { connectDB } from '@/config/database'
import Property from '@/models/property.model'

import PropertyDetails from '@/components/property/property-details.component'
import PropertyHeaderImage from '@/components/property/property-header-image.component'
import PropertyImages from '@/components/property/property-images.component'
import { FaArrowLeft } from 'react-icons/fa'

import type { Types } from 'mongoose'
import type { IProperty } from '@/types'

const PropertyPage = async ({
  params: { id },
}: {
  params: { id: Types.ObjectId }
}) => {
  await connectDB()

  const property = (await Property.findById(id).lean()) as IProperty

  if (!property) return redirect('/')

  const imageSrc = property.images?.length
    ? property.images[0]
    : 'https://placehold.co/600x400?text=Images+coming+soon'

  return (
    <>
      <PropertyHeaderImage name={property.name} image={imageSrc} />

      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>

      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
            <PropertyDetails {...property} />
          </div>
        </div>
      </section>
      {property.images?.length ? (
        <PropertyImages images={property.images} />
      ) : (
        <p>Images coming soon...</p>
      )}
    </>
  )
}
export default PropertyPage
