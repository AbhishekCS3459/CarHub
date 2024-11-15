'use client'

import React, { useState } from "react"
import { MessageSquare, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Message {
  text: string
  sender: 'user' | 'ai'
}

export default function AiAssistant() {
  const [chatMessages, setChatMessages] = useState<Message[]>([])
  const [currentMessage, setCurrentMessage] = useState('')

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages([...chatMessages, { text: currentMessage, sender: 'user' }])
      setCurrentMessage('')
      // Simulate AI response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { text: "Thank you for your message. How can I assist you with our car services today?", sender: 'ai' }])
      }, 1000)
    }
  }

  return (
    <div className="fixed bottom-6 right-6">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" className="rounded-full h-12 w-12">
            <MessageSquare className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>AI Assistant</DialogTitle>
            <DialogDescription>How can I help you today?</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[300px] w-full pr-4">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  message.sender === 'user' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block p-2 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="flex items-center space-x-2 mt-4">
            <Input
              placeholder="Type your message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}