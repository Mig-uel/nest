import { bookmarkProperty } from '@/actions/property/actions'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa'

import type { IProperty, IUser } from '@/types'
import User from '@/models/user.model'
import { getSessionUser } from '@/utils/getSessionUser'
import { HydratedDocument } from 'mongoose'

const PropertyBookmarkButton = async ({ _id }: IProperty) => {
  const bookmark = bookmarkProperty.bind(null, _id?.toString()!)

  const session = await getSessionUser()
  const isDisabled = !session?.user

  const user = await User.findById<HydratedDocument<IUser>>(session?.id)

  const isBookmarked = user?.bookmarks.includes(_id!)

  return (
    // @ts-ignore
    <form action={bookmark}>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
        disabled={isDisabled}
      >
        {isBookmarked ? (
          <>
            <FaBookmark className='mr-2' /> Remove Bookmark
          </>
        ) : (
          <>
            <FaRegBookmark className='mr-2' /> Bookmark
          </>
        )}
      </button>
    </form>
  )
}
export default PropertyBookmarkButton
