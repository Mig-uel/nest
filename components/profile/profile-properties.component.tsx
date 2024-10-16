'use client'

import Link from 'next/link'
import Image from 'next/image'
import { deleteProperty } from '@/actions/profile/action'

import type { IProperty } from '@/types'
import type { Types } from 'mongoose'
import { toast } from 'react-toastify'

const ProfileProperties = ({ properties }: { properties: IProperty[] }) => {
  const handleDelete = async (id: Types.ObjectId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this property?'
    )

    if (!confirmed) return

    await deleteProperty(id)

    toast.success('Deleted property')
  }

  if (!properties.length) return <h1>You have not listed any properties.</h1>

  return properties.map((property) => {
    const image = property.images?.length
      ? property.images[0]
      : 'https://placehold.co/600x400?text=Images+coming+soon'

    return (
      <div key={property._id?.toString()} className='mb-10'>
        <Link href={`/properties/${property._id}`}>
          <Image
            className='h-32 w-full rounded-md object-cover'
            src={image}
            alt={property.name}
            width={1000}
            height={200}
          />
        </Link>
        <div className='mt-2'>
          <p className='text-lg font-semibold'>{property.name}</p>
          <p className='text-gray-600'>Address: {property.location.street}</p>
        </div>
        <div className='mt-2'>
          <Link
            href={`/properties/${property._id}/edit`}
            className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
          >
            Edit
          </Link>

          <button
            className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
            type='button'
            onClick={() => handleDelete(property._id!)}
          >
            Delete
          </button>
        </div>
      </div>
    )
  })
}
export default ProfileProperties
