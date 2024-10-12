'use client'

import Image from 'next/image'
import { Gallery, Item } from 'react-photoswipe-gallery'

const PropertyImages = ({
  images,
  name,
}: {
  images: string[]
  name: string
}) => {
  return (
    <Gallery>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          {images.length < 2 ? (
            <Item
              width={1000}
              height={600}
              original={images[0]}
              thumbnail={images[0]}
            >
              {({ ref, open }) => (
                <Image
                  onClick={open}
                  ref={ref}
                  alt={name}
                  src={images[0]}
                  width={1800}
                  height={0}
                  sizes='100vw'
                  priority
                  className='object-cover h-[400px] mx-auto rounded-xl cursor-pointer'
                />
              )}
            </Item>
          ) : (
            <div className='grid grid-cols-2 gap-4'>
              {images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className={`${
                      images.length === 3 && index === 2
                        ? 'col-span-2'
                        : 'col-span-1'
                    }`}
                  >
                    <Item
                      width={1000}
                      height={600}
                      original={image}
                      thumbnail={image}
                    >
                      {({ ref, open }) => (
                        <Image
                          onClick={open}
                          ref={ref}
                          alt={name}
                          src={image}
                          width={1800}
                          height={0}
                          sizes='100vw'
                          priority
                          className='object-cover h-[400px] w-full rounded-xl cursor-pointer'
                        />
                      )}
                    </Item>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </Gallery>
  )
}
export default PropertyImages
