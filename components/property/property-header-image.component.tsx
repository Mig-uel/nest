import Image from 'next/image'

const PropertyHeaderImage = ({
  name,
  image,
}: {
  name: string
  image: string
}) => {
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
          <Image
            alt=''
            src={`/images/properties/${image}`}
            className='object-cover h-[400px] w-full'
            width={0}
            height={0}
            sizes='100vw'
            priority
          />
        </div>
      </div>
    </section>
  )
}
export default PropertyHeaderImage
