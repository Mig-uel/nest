'use server'

import { IProperty } from '@/types'

export async function addProperty(formData: FormData) {
  // property
  const property = {} as IProperty

  for (const pair of formData.entries()) {
    if (pair[0].includes('.')) {
      const [outerKey, innerKey] = pair[0].split('.')

      if (outerKey === 'location') {
        const key: keyof IProperty['location'] = innerKey as
          | 'state'
          | 'zipcode'
          | 'street'
          | 'city'

        property.location[key] = pair[1] as string
      } else if (outerKey === 'rates') {
        const key: keyof IProperty['rates'] = innerKey as
          | 'nightly'
          | 'weekly'
          | 'monthly'

        property.rates[key] = Number(pair[1])
      } else if (outerKey === 'seller_info') {
        const key: keyof IProperty['seller_info'] = innerKey as
          | 'email'
          | 'name'
          | 'phone'

        property.seller_info[key] = pair[1] as string
      }
    } else if (pair[0] === 'amenities') {
      property[pair[0]].push(pair[1] as string)
    } else if (!pair[0].includes('ACTION')) {
      // @ts-ignore
      property[pair[0]] = pair[1] as string
    }
  }

  console.log(property)

  // images
  const images = formData.getAll('images').filter((image) => {
    if (image instanceof File) return image.name !== ''
  }) as File[]
}
