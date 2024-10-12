import Link from 'next/link'
import Image from 'next/image'
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMap,
} from 'react-icons/fa'

import type { IProperty } from '@/types'

const FeaturedPropertyCard = (property: IProperty) => {
  const ratesObj = Object.entries(property.rates)

  const availableRates = ratesObj.map((rate) => {
    if (
      rate[0] === 'weekly' ||
      rate[0] === 'nightly' ||
      rate[0] === 'monthly'
    ) {
      if (rate[0] === 'weekly')
        return {
          type: rate[0],
          rate: `$${rate[1].toLocaleString()}/wk`,
        }
      else if (rate[0] === 'monthly')
        return {
          type: rate[0],
          rate: `$${rate[1].toLocaleString()}/mo`,
        }
      else if (rate[0] === 'nightly')
        return {
          type: rate[0],
          rate: `$${rate[1].toLocaleString()}/night`,
        }
    }

    return
  })

  const imageSrc = property.images?.length
    ? property.images[0]
    : 'https://placehold.co/600x400?text=Images+coming+soon'

  return (
    <div className='bg-white rounded-xl shadow-md relative flex flex-col md:flex-row'>
      <Image
        src={imageSrc}
        sizes='100vw'
        height={0}
        width={0}
        alt=''
        className='h-auto rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5'
      />
      <div className='p-6'>
        <h3 className='text-xl font-bold'>{property.name}</h3>
        <div className='text-gray-600 mb-4'>{property.type}</div>
        <h3 className='absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {availableRates[0]?.rate}
        </h3>
        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='inline-block mr-2' /> {property.beds}{' '}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='inline-block mr-2' /> {property.baths}{' '}
            <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='inline-block mr-2' /> {property.beds}
            {property.square_feet}{' '}
            <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {availableRates.map((rate) => (
            <p key={rate?.rate} className='capitalize'>
              <FaMoneyBill className='md:hidden lg:inline' /> {rate?.type}
            </p>
          ))}
        </div>

        <div className='border border-gray-200 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <i className='fa-solid fa-location-dot text-lg text-orange-700'></i>
            <span className='text-orange-700'>
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}
export default FeaturedPropertyCard
