'use client'

import { useFormState } from 'react-dom'
import { addMessage } from '@/actions/message/actions'

import type { IProperty } from '@/types'
import SubmitButton from '../submit-button.component'

const PropertyContactForm = ({ _id, owner }: IProperty) => {
  const [state, formAction] = useFormState(addMessage, {
    message: '',
    submitted: false,
  })

  const ownerId = owner.toString()
  const propertyId = _id?.toString()

  if (state.submitted) {
    return <p className='text-green-500 mb-4'>{state.message}</p>
  }

  return (
    <div className='bg-white p-6 rounded-lg shadow-md'>
      <h3 className='text-xl font-bold mb-6'>Contact Property Manager</h3>
      <form action={formAction}>
        <input type='hidden' name='propertyId' defaultValue={propertyId} />
        <input type='hidden' name='recipientId' defaultValue={ownerId} />
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Name:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='email'
          >
            Email:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            required
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='phone'
          >
            Phone:
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='phone'
            name='phone'
            type='text'
            placeholder='Enter your phone number'
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='message'
          >
            Message:
          </label>
          <textarea
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline'
            id='body'
            name='body'
            placeholder='Enter your message'
          ></textarea>
        </div>
        <div>
          <SubmitButton />
        </div>
      </form>
    </div>
  )
}
export default PropertyContactForm
