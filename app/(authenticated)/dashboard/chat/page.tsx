"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Send,
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
} from "lucide-react"

// Sample data for conversations
const conversations = [
  {
    id: 1,
    name: "Sarah Wilson",
    avatar: "/avatars/sarah.jpg",
    lastMessage: "That sounds great! Looking forward to...",
    time: "2m ago",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "Tech Solutions Inc.",
    avatar: "/avatars/tech.jpg",
    lastMessage: "Thank you for your application...",
    time: "1h ago",
    unread: 0,
    online: true,
  },
  {
    id: 3,
    name: "David Chen",
    avatar: "/avatars/david.jpg",
    lastMessage: "Can we schedule a call to discuss...",
    time: "3h ago",
    unread: 0,
    online: false,
  },
  // Add more conversations as needed
]

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])

  return (
    <div className="h-[calc(100vh-4rem)] flex gap-6">
      {/* Conversations Sidebar */}
      <Card className="w-80 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-9"
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-2">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`w-full p-3 flex items-start gap-3 rounded-lg transition-colors ${
                  selectedConversation.id === conversation.id
                    ? "bg-primary/10"
                    : "hover:bg-accent"
                }`}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  {conversation.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 border-2 border-background bg-green-500 rounded-full" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">{conversation.name}</span>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {conversation.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Chat Area */}
      <Card className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={selectedConversation.avatar} />
              <AvatarFallback>{selectedConversation.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{selectedConversation.name}</h3>
              {selectedConversation.online ? (
                <span className="text-sm text-green-500">Online</span>
              ) : (
                <span className="text-sm text-muted-foreground">Offline</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {/* Sample messages - replace with real messages */}
            <div className="flex gap-3 max-w-[80%]">
              <Avatar className="w-8 h-8">
                <AvatarImage src={selectedConversation.avatar} />
                <AvatarFallback>{selectedConversation.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="bg-accent p-3 rounded-lg">
                <p>Hi! I saw your profile and I think you'd be a great fit for our Senior Developer position.</p>
                <span className="text-xs text-muted-foreground mt-1">10:30 AM</span>
              </div>
            </div>
            <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/avatars/you.jpg" />
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                <p>Thank you! I'd love to learn more about the position.</p>
                <span className="text-xs text-primary-foreground/70 mt-1">10:32 AM</span>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
