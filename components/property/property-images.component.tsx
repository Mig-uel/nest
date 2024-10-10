import Image from 'next/image'

const PropertyImages = ({
  images,
  name,
}: {
  images: string[]
  name: string
}) => {
  return (
    <section className='bg-blue-50 p-4'>
      <div className='container mx-auto'>
        {images.length < 2 ? (
          <Image
            alt={name}
            src={images[0]}
            width={1800}
            height={0}
            sizes='100vw'
            priority
            className='object-cover h-[400px] mx-auto rounded-xl'
          />
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
                  <Image
                    alt={name}
                    src={image}
                    width={1800}
                    height={0}
                    sizes='100vw'
                    priority
                    className='object-cover h-[400px] w-full rounded-xl'
                  />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
export default PropertyImages
