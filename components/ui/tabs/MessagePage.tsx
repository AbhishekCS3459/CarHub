'use client'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: string
  isRead: boolean
}

interface MessagesPageProps {
  messages: Message[]
}

export default function MessagesPage({ messages }: MessagesPageProps) {
  return (
    <div className="messages-page">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      <ul>
        {messages.map((message) => (
          <li key={message.id} className={`p-4 mb-2 ${message.isRead ? "bg-gray-100" : "bg-white"}`}>
            <p>
              <strong>{message.sender}:</strong> {message.content}
            </p>
            <span className="text-sm text-gray-500">{message.timestamp}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
