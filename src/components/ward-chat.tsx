import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Send, 
  Phone, 
  Search,
  User,
  MessageCircle,
  Paperclip,
  Image as ImageIcon,
  File,
  X
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

interface ChatUser {
  id: string;
  name: string;
  nameMl: string;
  phone: string;
  image?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

const mockUsers: ChatUser[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    nameMl: 'രാജേഷ് കുമാർ',
    phone: '+91 98765 43210',
    image: 'https://i.pravatar.cc/150?img=12',
    lastMessage: 'Thank you for your help with the water issue',
    lastMessageTime: '2 hours ago',
    unreadCount: 0
  },
  {
    id: '2',
    name: 'Sreelatha Menon',
    nameMl: 'ശ്രീലത മേനോൻ',
    phone: '+91 98765 43211',
    image: 'https://i.pravatar.cc/150?img=47',
    lastMessage: 'The street light is still not working',
    lastMessageTime: '5 hours ago',
    unreadCount: 2
  },
  {
    id: '3',
    name: 'Anil George',
    nameMl: 'അനിൽ ജോർജ്',
    phone: '+91 98765 43212',
    image: 'https://i.pravatar.cc/150?img=33',
    lastMessage: 'When will the road be repaired?',
    lastMessageTime: '1 day ago',
    unreadCount: 0
  },
  {
    id: '4',
    name: 'Priya Nair',
    nameMl: 'പ്രിയ നായർ',
    phone: '+91 98765 43213',
    image: 'https://i.pravatar.cc/150?img=45',
    lastMessage: 'Thank you for resolving the garbage issue',
    lastMessageTime: '2 days ago',
    unreadCount: 0
  }
];

const mockMessages: Record<string, ChatMessage[]> = {
  '1': [
    {
      id: '1',
      senderId: '1',
      senderName: 'Rajesh Kumar',
      message: 'Hello, I have an issue with water supply in my area',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'ward-member',
      senderName: 'Ward Member',
      message: 'Hello Rajesh, I understand your concern. Can you provide more details about the location?',
      timestamp: '10:32 AM',
      isOwn: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'Rajesh Kumar',
      message: 'It is on MG Road, near the temple',
      timestamp: '10:35 AM',
      isOwn: false
    },
    {
      id: '4',
      senderId: 'ward-member',
      senderName: 'Ward Member',
      message: 'Thank you. I will send a team to check the issue today.',
      timestamp: '10:36 AM',
      isOwn: true
    },
    {
      id: '5',
      senderId: '1',
      senderName: 'Rajesh Kumar',
      message: 'Thank you for your help with the water issue',
      timestamp: '11:00 AM',
      isOwn: false
    }
  ],
  '2': [
    {
      id: '1',
      senderId: '2',
      senderName: 'Sreelatha Menon',
      message: 'The street light on Temple Road is not working for 3 days',
      timestamp: '9:00 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'ward-member',
      senderName: 'Ward Member',
      message: 'I have noted this issue. Will assign it to the electricity department.',
      timestamp: '9:15 AM',
      isOwn: true
    },
    {
      id: '3',
      senderId: '2',
      senderName: 'Sreelatha Menon',
      message: 'The street light is still not working',
      timestamp: '2:00 PM',
      isOwn: false
    }
  ],
  '3': [
    {
      id: '1',
      senderId: '3',
      senderName: 'Anil George',
      message: 'There is a large pothole on Station Road causing traffic issues',
      timestamp: 'Yesterday',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'ward-member',
      senderName: 'Ward Member',
      message: 'I will forward this to the roads department for immediate action.',
      timestamp: 'Yesterday',
      isOwn: true
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Anil George',
      message: 'When will the road be repaired?',
      timestamp: 'Today',
      isOwn: false
    }
  ],
  '4': [
    {
      id: '1',
      senderId: '4',
      senderName: 'Priya Nair',
      message: 'Garbage collection was missed for 2 days in our area',
      timestamp: '2 days ago',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'ward-member',
      senderName: 'Ward Member',
      message: 'I apologize for the inconvenience. I have arranged for immediate collection.',
      timestamp: '2 days ago',
      isOwn: true
    },
    {
      id: '3',
      senderId: '4',
      senderName: 'Priya Nair',
      message: 'Thank you for resolving the garbage issue',
      timestamp: '1 day ago',
      isOwn: false
    }
  ]
};

export function WardChat() {
  const [selectedUserId, setSelectedUserId] = useState<string>('1');
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string; type: 'image' | 'file' } | null>(null);

  const selectedUser = mockUsers.find(u => u.id === selectedUserId);
  const messages = mockMessages[selectedUserId] || [];

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.nameMl.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      // Simulate file upload
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

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className="overflow-hidden border-0 shadow-lg rounded-xl p-6 text-white"
        style={{
          background: 'linear-gradient(135deg, #2D5016 0%, #A8D5A5 100%)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Ward Chat</h2>
            <p className="text-white/90 mt-1">വാർഡ് ചാറ്റ്</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl font-bold">{mockUsers.length}</div>
            <div className="text-sm text-white/80">Active Users</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-300px)]">
        {/* Users List */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            <div className="space-y-1">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`p-4 cursor-pointer hover:bg-muted transition-colors ${
                    selectedUserId === user.id ? 'bg-muted border-l-4 border-l-[#2D5016]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={user.image} alt={user.name} />
                      <AvatarFallback>
                        {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold text-sm truncate">{user.name}</h4>
                        {user.unreadCount && user.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {user.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{user.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{user.lastMessageTime}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedUser ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedUser.image} alt={selectedUser.name} />
                      <AvatarFallback>
                        {selectedUser.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedUser.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{selectedUser.nameMl}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCall(selectedUser.phone)}
                    className="border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016] hover:text-white"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    Call
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-0">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          msg.isOwn
                            ? 'bg-[#2D5016] text-white'
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
                      id="file-input"
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileSelect}
                    />
                    <label htmlFor="file-input">
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
                      className="bg-[#2D5016] hover:bg-[#1B3D0F]"
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a user to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}

