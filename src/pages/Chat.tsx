import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  Send, 
  Paperclip, 
  MoreVertical, 
  Phone, 
  Video,
  Search,
  Smile
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockChatMessages } from '@/data/mockData';

const Chat = () => {
  const { user, isAuthenticated } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockChatMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Mock conversations list
  const conversations = [
    {
      id: '1',
      name: 'Kwame Asante',
      lastMessage: 'Perfect! When can you start? And what\'s your estimated timeline for the first milestone?',
      timestamp: '11:00 AM',
      unread: 2,
      online: true,
      project: 'E-commerce Platform'
    },
    {
      id: '2',
      name: 'Fatima Okonkwo',
      lastMessage: 'The designs look great! Just a few minor adjustments needed.',
      timestamp: 'Yesterday',
      unread: 0,
      online: false,
      project: 'Mobile App UI/UX'
    },
    {
      id: '3',
      name: 'Sarah Mwangi',
      lastMessage: 'Thanks for the quick response. Let me review and get back to you.',
      timestamp: '2 days ago',
      unread: 0,
      online: true,
      project: 'WordPress Website'
    }
  ];

  const [activeConversation, setActiveConversation] = useState(conversations[0]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        senderId: user?.id || '1',
        senderName: user?.name || 'You',
        message: newMessage,
        timestamp: new Date().toISOString(),
        isMe: true
      };

      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Simulate response after 2 seconds
      setTimeout(() => {
        const response = {
          id: (Date.now() + 1).toString(),
          senderId: activeConversation.id,
          senderName: activeConversation.name,
          message: "Thanks for your message! I'll review this and get back to you shortly.",
          timestamp: new Date().toISOString(),
          isMe: false
        };
        setMessages(prev => [...prev, response]);
      }, 2000);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const isToday = (timestamp: string) => {
    const messageDate = new Date(timestamp);
    const today = new Date();
    return messageDate.toDateString() === today.toDateString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Communicate with clients and manage project discussions
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full bg-gradient-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-360px)]">
                  <div className="space-y-1 p-4">
                    {conversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        onClick={() => setActiveConversation(conversation)}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-smooth hover:bg-muted/50 ${
                          activeConversation.id === conversation.id ? 'bg-primary/10 border border-primary/20' : ''
                        }`}
                      >
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-gradient-hero text-white text-sm font-medium">
                              {conversation.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-foreground truncate">
                              {conversation.name}
                            </p>
                            <span className="text-xs text-muted-foreground">
                              {conversation.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-1">
                            {conversation.lastMessage}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {conversation.project}
                            </Badge>
                            {conversation.unread > 0 && (
                              <Badge className="text-xs h-5 w-5 p-0 flex items-center justify-center bg-primary">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full bg-gradient-card flex flex-col">
              {/* Chat Header */}
              <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gradient-hero text-white font-medium">
                        {activeConversation.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {activeConversation.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{activeConversation.name}</h3>
                    <p className="text-sm text-muted-foreground">{activeConversation.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-420px)] p-4">
                  <div className="space-y-4">
                    {messages.map((message, index) => {
                      const showDate = index === 0 || !isToday(messages[index - 1].timestamp);
                      
                      return (
                        <div key={message.id}>
                          {showDate && (
                            <div className="text-center my-4">
                              <span className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                                {isToday(message.timestamp) ? 'Today' : new Date(message.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          <div className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-2 max-w-[70%] ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                              {!message.isMe && (
                                <Avatar className="h-8 w-8 mt-1">
                                  <AvatarFallback className="bg-gradient-hero text-white text-xs font-medium">
                                    {message.senderName.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              <div className={`rounded-2xl p-4 ${
                                message.isMe 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted text-foreground'
                              }`}>
                                <p className="text-sm leading-relaxed">{message.message}</p>
                                <p className={`text-xs mt-2 ${
                                  message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'
                                }`}>
                                  {formatTimestamp(message.timestamp)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="pr-10"
                    />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                    >
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-hero"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;