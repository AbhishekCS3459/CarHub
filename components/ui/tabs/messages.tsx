'use client';

import { useState } from 'react';
import { MessageSquare, Send, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CarLoader } from './carloader';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface MessagesPageProps {
  messages: Message[]; // Props type definition
}

export default function MessagesPage({ messages: initialMessages }: MessagesPageProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedMessage) {
      const updatedMessages = messages.map((msg) =>
        msg.id === selectedMessage.id
          ? { ...msg, content: msg.content + '\n\nReply: ' + newMessage }
          : msg
      );
      setMessages(updatedMessages);
      setNewMessage('');
    }
  };

  if (messages.length === 0) return <CarLoader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>Recent messages from customers</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-100 ${
                    selectedMessage?.id === message.id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{message.sender}</span>
                    {!message.isRead && (
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">New</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{message.content}</p>
                  <span className="text-xs text-gray-400">{message.timestamp}</span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <>
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <User className="h-6 w-6 mr-2" />
                    <span className="font-semibold">{selectedMessage.sender}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{selectedMessage.content}</p>
                  <span className="text-xs text-gray-400">{selectedMessage.timestamp}</span>
                </div>
                <div className="mt-4">
                  <Input
                    placeholder="Type your reply..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={handleSendMessage} className="w-full">
                    <Send className="h-4 w-4 mr-2" /> Send Reply
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-[400px] text-gray-400">
                <MessageSquare className="h-12 w-12 mr-4" />
                <span>Select a message to view details</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
