'use client'

import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share'
import type { IProperty } from '@/types'

const PropertyShareButtons = ({ _id, name, type }: IProperty) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${_id}`
  const hashtag = `${type.replaceAll(' ', '').trim()}ForRent`
  const emailBody = `Check out this property listing: ${shareUrl}`

  return (
    <>
      <h3 className='text-xl font-bold text-center pt-2'>
        Share This Property:
      </h3>
      <div className='flex gap-3 justify-center pb-5'>
        <FacebookShareButton url={shareUrl} hashtag={hashtag}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={name} hashtags={[hashtag]}>
          <TwitterIcon size={40} round />
        </TwitterShareButton>
        <EmailShareButton url={shareUrl} subject={name} body={emailBody}>
          <EmailIcon size={40} round />
        </EmailShareButton>
      </div>
    </>
  )
}
export default PropertyShareButtons
