import { redirect } from 'next/navigation'
import { connectDB } from '@/config/database'
import Property from '@/models/property.model'

import PropertyHeaderImage from '@/components/property/property-header-image.component'
import { FaArrowLeft } from 'react-icons/fa'

import type { Types } from 'mongoose'
import type { IProperty } from '@/types'
import Link from 'next/link'

const PropertyPage = async ({
  params: { id },
}: {
  params: { id: Types.ObjectId }
}) => {
  await connectDB()

  const property = (await Property.findById(id).lean()) as IProperty

  if (!property) return redirect('/')

  return (
    <>
      <PropertyHeaderImage name={property.name} image={property.images[0]} />

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
            {/* TODO: add property info */}
          </div>
        </div>
      </section>
    </>
  )
}
export default PropertyPage
