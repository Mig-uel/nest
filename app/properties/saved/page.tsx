import PropertyCard from '@/components/property/property-card.component'
import { connectDB } from '@/config/database'
import { getSessionUser } from '@/utils/getSessionUser'
import User from '@/models/user.model'
import { redirect } from 'next/navigation'
import { HydratedDocument } from 'mongoose'
import { IProperty, IUser } from '@/types'

const SavedPropertiesPage = async () => {
  const session = await getSessionUser()

  if (!session || !session.user) return redirect('/')

  const { id } = session

  const user = await User.findById<HydratedDocument<IUser>>(id)
    .populate('bookmarks')
    .lean()

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container mx-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {!user?.bookmarks.length ? (
          <p>No saved properties</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {user.bookmarks.map((bookmark: IProperty, index: number) => (
              <PropertyCard key={bookmark._id?.toString()} {...bookmark} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
export default SavedPropertiesPage
