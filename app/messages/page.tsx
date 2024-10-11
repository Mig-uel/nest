import MessageCard from '@/components/message/message-card.component'
import { connectDB } from '@/config/database'
import Message from '@/models/message.model'
import '@/models/property.model'
import { IMessage } from '@/types'
import { convertToSerializableObject } from '@/utils/convertToObject'
import { getSessionUser } from '@/utils/getSessionUser'

const MessagesPage = async () => {
  await connectDB()

  const session = await getSessionUser()

  if (!session) throw new Error('Invalid session')

  const { id } = session

  const readMessages = await Message.find({ recipient: id, read: true })
    .sort({
      createdAt: -1,
    })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean()

  const unreadMessages = await Message.find({ recipient: id, read: false })
    .sort({
      createdAt: -1,
    })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean()

  const messages: IMessage[] = [...unreadMessages, ...readMessages].map(
    (messageDoc) => {
      const message = convertToSerializableObject(messageDoc)
      message.sender = convertToSerializableObject(message.sender)
      message.property = convertToSerializableObject(message.property)

      return message
    }
  )

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>

          <div className='space-y-4'>
            {!messages.length ? (
              <p>You have no messages.</p>
            ) : (
              <div>
                {messages.map((message) => {
                  return <MessageCard key={message._id} message={message} />
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
export default MessagesPage
