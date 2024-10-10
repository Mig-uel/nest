import { connectDB } from '@/config/database'
import Property from '@/models/property.model'
import PropertyEditForm from '@/components/edit/property-edit-form.component'
import { redirect } from 'next/navigation'
import { getSessionUser } from '@/utils/getSessionUser'

import type { IProperty } from '@/types'

const EditPropertyPage = async ({ params }: { params: { id: string } }) => {
  const session = await getSessionUser()
  if (!session || !session.user) return redirect('/')

  await connectDB()

  const property = (await Property.findById(params.id).lean()) as IProperty
  if (!property || property.owner.toString() !== session.id)
    return redirect('/')

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyEditForm {...property} />
        </div>
      </div>
    </section>
  )
}
export default EditPropertyPage
