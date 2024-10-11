'use client'

import { useEffect } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
import { addMessage } from '@/actions/message/actions'

import { FaPaperPlane } from 'react-icons/fa'
import type { IProperty } from '@/types'

const PropertyContactForm = ({ _id, owner }: IProperty) => {
  const { data: session } = useSession()

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
            disabled={!session}
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
            disabled={!session}
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
            disabled={!session}
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
            disabled={!session}
          ></textarea>
        </div>
        <div>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center'
            type='submit'
            disabled={!session}
          >
            <FaPaperPlane className='fas fa-paper-plane mr-2' /> Send Message
          </button>
        </div>
      </form>
    </div>
  )
}
export default PropertyContactForm
