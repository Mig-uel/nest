import Link from 'next/link'

type ButtonInfo = {
  text: string
  href: string
  backgroundColor: string
}

type InfoBox = {
  children: React.ReactNode
  heading: string
  backgroundColor?: string
  textColor?: string
  buttonInfo: ButtonInfo
}

const InfoBox = ({
  children,
  heading,
  backgroundColor = 'bg-gray-100',
  textColor = 'text-gray-800',
  buttonInfo: { backgroundColor: buttonBackgroundColor, href, text },
}: InfoBox) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${backgroundColor}`}>
      <h2 className={`text-2xl font-bold ${textColor}`}>{heading}</h2>
      <p className={`mt-2 mb-4 ${textColor}`}>{children}</p>
      <Link
        href={href}
        className={`inline-block text-white rounded-lg px-4 py-2 hover:bg-gray-700 ${buttonBackgroundColor}`}
      >
        {text}
      </Link>
    </div>
  )
}
export default InfoBox
