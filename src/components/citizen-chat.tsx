import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { 
  Send, 
  Phone, 
  MessageCircle,
  User,
  Paperclip,
  File,
  X,
  Image as ImageIcon
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  isOwn: boolean;
  type?: 'text' | 'image' | 'file';
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'ward-member',
    senderName: 'Ward Member',
    message: 'Hello! How can I help you today?',
    timestamp: '10:30 AM',
    isOwn: false
  },
  {
    id: '2',
    senderId: 'ward-member',
    senderName: 'Ward Member',
    message: 'നമസ്കാരം! ഇന്ന് ഞാൻ നിങ്ങളെ എങ്ങനെ സഹായിക്കും?',
    timestamp: '10:30 AM',
    isOwn: false
  },
  {
    id: '3',
    senderId: 'user',
    senderName: 'You',
    message: 'I have an issue with water supply in my area',
    timestamp: '10:32 AM',
    isOwn: true
  },
  {
    id: '4',
    senderId: 'ward-member',
    senderName: 'Ward Member',
    message: 'I understand your concern. Can you provide more details about the location?',
    timestamp: '10:33 AM',
    isOwn: false
  },
  {
    id: '5',
    senderId: 'user',
    senderName: 'You',
    message: 'It is on MG Road, near the temple',
    timestamp: '10:35 AM',
    isOwn: true
  },
  {
    id: '6',
    senderId: 'ward-member',
    senderName: 'Ward Member',
    message: 'Thank you. I will send a team to check the issue today.',
    timestamp: '10:36 AM',
    isOwn: false
  }
];

export function CitizenChat() {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string; type: 'image' | 'file' } | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith('image/');
      const preview = isImage ? URL.createObjectURL(file) : '';
      setSelectedFile({ file, preview, type: isImage ? 'image' : 'file' });
    }
  };

  const handleSend = () => {
    if (!message.trim() && !selectedFile) return;
    
    // In a real app, this would send the message/file to the backend
    if (selectedFile) {
      console.log('File sent:', selectedFile.file.name);
    }
    
    setMessage('');
    setSelectedFile(null);
  };

  const removeFile = () => {
    if (selectedFile?.preview) {
      URL.revokeObjectURL(selectedFile.preview);
    }
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className="overflow-hidden border-0 shadow-lg rounded-xl p-6 text-white"
        style={{
          background: 'linear-gradient(135deg, #2D7A4F 0%, #8B9D83 100%)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Chat with Ward Member</h2>
            <p className="text-white/90 mt-1">വാർഡ് മെമ്പറുമായി ചാറ്റ് ചെയ്യുക</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <div>
                <div className="text-sm font-semibold">Ward Member</div>
                <div className="text-xs text-white/80">Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex flex-col h-[calc(100vh-300px)]">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-[#2D7A4F] text-white">
                  <User className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Ward Member</CardTitle>
                <p className="text-xs text-muted-foreground">വാർഡ് മെമ്പർ</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = 'tel:+911234567890'}
              className="border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white"
            >
              <Phone className="w-4 h-4 mr-1" />
              Call
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.isOwn
                      ? 'bg-[#2D7A4F] text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {!msg.isOwn && (
                    <p className="text-xs font-semibold mb-1 opacity-80">{msg.senderName}</p>
                  )}
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.isOwn ? 'text-white/70' : 'text-muted-foreground'}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t p-4 space-y-2">
            {selectedFile && (
              <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                {selectedFile.type === 'image' ? (
                  <div className="relative">
                    <img src={selectedFile.preview} alt="Preview" className="w-16 h-16 object-cover rounded" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 hover:bg-red-600 text-white"
                      onClick={removeFile}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-1">
                    <File className="w-8 h-8 text-muted-foreground" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{selectedFile.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.file.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={removeFile}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-2">
              <input
                type="file"
                id="file-input-citizen"
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
              />
              <label htmlFor="file-input-citizen">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                >
                  <Paperclip className="w-4 h-4" />
                </Button>
              </label>
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                className="flex-1"
              />
              <Button
                onClick={handleSend}
                disabled={!message.trim() && !selectedFile}
                className="bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

