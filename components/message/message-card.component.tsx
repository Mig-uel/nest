'use client'

import { deleteMessage, markMessageAsRead } from '@/actions/message/actions'
import type { IMessage } from '@/types'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

const MessageCard = ({ message }: { message: IMessage }) => {
  const [state, formAction] = useFormState(markMessageAsRead, {
    message: '',
  })

  const [deleteState, deleteFormAction] = useFormState(deleteMessage, {
    message: '',
  })

  useEffect(() => {
    if (state.message) toast.success(state.message)
  }, [state])

  useEffect(() => {
    if (deleteState.message) toast.success(deleteState.message)
  }, [deleteState])

  return (
    <div className='relative bg-white p-4 rounded-md shadow-md border border-gray-200'>
      {!message.read && (
        <div className='absolute top-2 right-2 bg-yellow-500 text-white px-2 rounded-md py-1'>
          New!
        </div>
      )}
      <h2 className='text-xl mb-4'>
        <span className='font-bold'>Property Inquiry:</span>{' '}
        {
          // @ts-ignore
          message.property.name
        }
      </h2>
      <p className='text-gray-700'>{message.body}</p>

      <ul className='mt-4'>
        <li>
          <strong>Reply Email: </strong>
          <a href={`mailto:${message.email}`} className='text-blue-500'>
            {message.email}
          </a>
        </li>
        {message.phone && (
          <li>
            <strong>Reply Phone: </strong>
            <a href={`tel:${message.phone}`} className='text-blue-500'>
              {message.phone}
            </a>
          </li>
        )}
        <li>
          <strong>Received: </strong>
          {new Date(message?.createdAt!).toLocaleString()}
        </li>
      </ul>

      <form action={formAction} className='inline'>
        <input type='hidden' name='messageId' defaultValue={message._id} />
        <button
          type='submit'
          className='mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md'
        >
          {message.read ? 'Mark Unread' : 'Mark Read'}
        </button>
      </form>

      <form action={deleteFormAction} className='inline'>
        <input type='hidden' name='messageId' defaultValue={message._id} />

        <button
          type='submit'
          className='mt-4 bg-red-500 text-white py-1 px-3 rounded-md'
        >
          Delete
        </button>
      </form>
    </div>
  )
}
export default MessageCard
