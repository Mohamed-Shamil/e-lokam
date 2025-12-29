import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Send, Paperclip, Image as ImageIcon, Heart, Clock } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'worker';
  senderName: string;
  text: string;
  timestamp: string;
  type: 'text' | 'image';
  imageUrl?: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'worker',
    senderName: 'Suma Krishna (ASHA)',
    text: 'Hello! How can I help you today?',
    timestamp: '10:30 AM',
    type: 'text'
  },
  {
    id: '2',
    sender: 'worker',
    senderName: 'Suma Krishna (ASHA)',
    text: 'നമസ്കാരം! ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?',
    timestamp: '10:30 AM',
    type: 'text'
  },
  {
    id: '3',
    sender: 'user',
    senderName: 'You',
    text: 'My mother needs her diabetes medication refilled.',
    timestamp: '10:32 AM',
    type: 'text'
  },
  {
    id: '4',
    sender: 'worker',
    senderName: 'Suma Krishna (ASHA)',
    text: 'I understand. Can you share a photo of the previous prescription?',
    timestamp: '10:33 AM',
    type: 'text'
  }
];

export function MedicalChat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [activeCategory] = useState('health'); // This determines which worker sees the chat

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Simulate worker response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'worker',
        senderName: 'Suma Krishna (ASHA)',
        text: 'I will visit your home tomorrow at 10 AM to deliver the medicines.',
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const handleFileUpload = () => {
    // Simulate image upload
    const imageMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'You',
      text: 'Prescription image',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: 'image',
      imageUrl: 'https://source.unsplash.com/400x300/?prescription,medical'
    };
    setMessages([...messages, imageMessage]);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg h-[700px] flex flex-col">
        {/* Chat Header with Medical Category */}
        <CardHeader 
          className="text-white relative flex-shrink-0"
          style={{
            background: 'linear-gradient(135deg, #2D5016 0%, #8B9D83 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 16.569-13.431 30-30 30h30V0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-white">
                  <AvatarImage src="https://source.unsplash.com/100x100/?healthcare,worker" />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">Suma Krishna</CardTitle>
                  <p className="text-sm text-white/90">ASHA Worker - Ward 5</p>
                </div>
              </div>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                <Heart className="w-3 h-3 mr-1" />
                Medical Category
              </Badge>
            </div>

            {/* Category Info */}
            <div className="mt-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg">
              <p className="text-sm text-white/90">
                🔒 Secure Medical Chat - Only health workers can see this conversation
              </p>
            </div>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F0F8EF]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] ${
                  message.sender === 'user'
                    ? 'bg-[#2D5016] text-white'
                    : 'bg-white'
                } rounded-lg p-3 shadow-sm`}
              >
                {message.sender !== 'user' && (
                  <div className="text-xs font-medium mb-1" style={{ color: '#8B9D83' }}>
                    {message.senderName}
                  </div>
                )}
                
                {message.type === 'image' && message.imageUrl ? (
                  <div className="space-y-2">
                    <img
                      src={message.imageUrl}
                      alt="Uploaded"
                      className="rounded-lg max-w-full"
                    />
                    <p className="text-sm">{message.text}</p>
                  </div>
                ) : (
                  <p className="text-sm">{message.text}</p>
                )}
                
                <div className={`text-xs mt-1 flex items-center gap-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  <Clock className="w-3 h-3" />
                  {message.timestamp}
                </div>
              </div>
            </div>
          ))}
        </CardContent>

        {/* Input Area */}
        <div className="flex-shrink-0 border-t bg-white p-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleFileUpload}
              className="flex-shrink-0"
            >
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleFileUpload}
              className="flex-shrink-0"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Type your message... / നിങ്ങളുടെ സന്ദേശം ടൈപ്പ് ചെയ്യുക..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              className="flex-shrink-0 bg-[#2D5016] hover:bg-[#2D5016]/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Share prescription photos, wound images, or health concerns securely
          </p>
        </div>
      </Card>
    </div>
  );
}
