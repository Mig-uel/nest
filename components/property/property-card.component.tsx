import Link from 'next/link'
import Image from 'next/image'

import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa'

import type { IProperty } from '@/types'

const PropertyCard = ({
  rates,
  images,
  name,
  type,
  beds,
  baths,
  square_feet,
  location,
  _id,
}: IProperty) => {
  const ratesObj = Object.entries(rates)

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

  const imageSrc = images?.length
    ? images[0]
    : 'https://placehold.co/600x400?text=Images+coming+soon'

  return (
    <div className='rounded-xl shadow-md relative'>
      <Image
        src={imageSrc}
        alt={name}
        className='w-full h-auto rounded-t-xl'
        width={0}
        height={0}
        sizes='100vw'
      />
      <div className='p-4'>
        <div className='text-left md:text-center lg:text-left mb-6'>
          <div className='text-gray-600'>{type}</div>
          <h3 className='text-xl font-bold'>{name}</h3>
        </div>
        <h3 className='absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right'>
          {availableRates[0]?.rate}
        </h3>

        <div className='flex justify-center gap-4 text-gray-500 mb-4'>
          <p>
            <FaBed className='md:hidden lg:inline' /> {beds}{' '}
            <span className='md:hidden lg:inline'>Beds</span>
          </p>
          <p>
            <FaBath className='md:hidden lg:inline' /> {baths}{' '}
            <span className='md:hidden lg:inline'>Baths</span>
          </p>
          <p>
            <FaRulerCombined className='md:hidden lg:inline' />
            {square_feet} <span className='md:hidden lg:inline'>sqft</span>
          </p>
        </div>

        <div className='flex justify-center gap-4 text-green-900 text-sm mb-4'>
          {availableRates.map((rate) => (
            <p key={rate?.rate} className='capitalize'>
              <FaMoneyBill className='md:hidden lg:inline' /> {rate?.type}
            </p>
          ))}
        </div>

        <div className='border border-gray-100 mb-5'></div>

        <div className='flex flex-col lg:flex-row justify-between mb-4'>
          <div className='flex align-middle gap-2 mb-4 lg:mb-0'>
            <FaMapMarker className='text-orange-700 mt-1' />
            <span className='text-orange-700'>
              {' '}
              {location.city.substring(0, 10).concat('...')},{' '}
              {location.state.substring(0, 10).concat('...')}{' '}
            </span>
          </div>
          <Link
            href={`/properties/${_id}`}
            className='h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm'
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}
export default PropertyCard
