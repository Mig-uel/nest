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
import PropertyBookmarkButton from '@/components/property/property-bookmark-button.component'
import PropertyShareButtons from '@/components/property/property-share-buttons.component'
import PropertyContactForm from '@/components/property/property-contact-form.component'
import { convertToSerializableObject } from '@/utils/convertToObject'
import { getSessionUser } from '@/utils/getSessionUser'

const PropertyPage = async ({
  params: { id },
}: {
  params: { id: Types.ObjectId }
}) => {
  // get current session user
  const session = await getSessionUser()

  await connectDB()

  const property = convertToSerializableObject(
    await Property.findById(id).lean()
  ) as IProperty

  if (!property) return redirect('/')

  // boolean checks if the user logged in is the owner of current property in view
  const isOwner = session?.id === property.owner.toString()

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
            <aside className='space-y-4'>
              <PropertyBookmarkButton {...property} />
              <PropertyShareButtons {...property} />

              {!isOwner && session && <PropertyContactForm {...property} />}
            </aside>
          </div>
        </div>
      </section>
      {property.images?.length ? (
        <PropertyImages name={property.name} images={property.images} />
      ) : (
        <p>Images coming soon...</p>
      )}
    </>
  )
}
export default PropertyPage
