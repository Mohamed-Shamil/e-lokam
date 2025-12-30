import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Send, 
  Phone, 
  MessageCircle,
  User,
  Paperclip,
  File,
  X,
  Image as ImageIcon,
  Users,
  Building2,
  Award,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface ChatMember {
  id: string;
  name: string;
  nameMl: string;
  role: 'ward' | 'block' | 'district';
  roleLabel: string;
  roleLabelMl: string;
  photo: string;
  phone: string;
  isOnline: boolean;
}

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

const mockMembers: ChatMember[] = [
  {
    id: 'wm1',
    name: 'Mohammed Shafi',
    nameMl: 'മുഹമ്മദ് ഷാഫി',
    role: 'ward',
    roleLabel: 'Ward Member',
    roleLabelMl: 'വാർഡ് മെമ്പർ',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    phone: '+91 98765 43210',
    isOnline: true
  },
  {
    id: 'wm2',
    name: 'Fr. Thomas Varghese',
    nameMl: 'ഫാ. തോമസ് വർഗീസ്',
    role: 'ward',
    roleLabel: 'Ward Member',
    roleLabelMl: 'വാർഡ് മെമ്പർ',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    phone: '+91 98765 43211',
    isOnline: true
  },
  {
    id: 'bm1',
    name: 'Dr. Abdul Rahman',
    nameMl: 'ഡോ. അബ്ദുൾ റഹ്മാൻ',
    role: 'block',
    roleLabel: 'Block Panchayat Member',
    roleLabelMl: 'ബ്ലോക്ക് പഞ്ചായത്ത് മെമ്പർ',
    photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=200&fit=crop',
    phone: '+91 98765 43220',
    isOnline: false
  },
  {
    id: 'dm1',
    name: 'Adv. Shamsudheen K',
    nameMl: 'അഡ്വ. ഷംസുദ്ദീൻ കെ',
    role: 'district',
    roleLabel: 'District Panchayat Member',
    roleLabelMl: 'ജില്ലാ പഞ്ചായത്ത് മെമ്പർ',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    phone: '+91 98765 43230',
    isOnline: true
  }
];

const mockMessagesByMember: Record<string, ChatMessage[]> = {
  'wm1': [
    {
      id: '1',
      senderId: 'wm1',
      senderName: 'Mohammed Shafi',
      message: 'Hello! How can I help you today?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'wm1',
      senderName: 'Rajesh Kumar',
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
      senderId: 'wm1',
      senderName: 'Mohammed Shafi',
      message: 'I understand your concern. Can you provide more details about the location?',
      timestamp: '10:33 AM',
      isOwn: false
    }
  ],
  'wm2': [
    {
      id: '1',
      senderId: 'wm2',
      senderName: 'Sreelatha Menon',
      message: 'Hi there! What can I assist you with?',
      timestamp: '11:00 AM',
      isOwn: false
    }
  ],
  'bm1': [
    {
      id: '1',
      senderId: 'bm1',
      senderName: 'Dr. Priya Nair',
      message: 'Good morning! How may I help you?',
      timestamp: '9:00 AM',
      isOwn: false
    }
  ],
  'dm1': [
    {
      id: '1',
      senderId: 'dm1',
      senderName: 'Adv. Ramesh Pillai',
      message: 'Hello! I am here to assist with district-level concerns.',
      timestamp: '8:30 AM',
      isOwn: false
    }
  ]
};

export function CitizenChat() {
  const [selectedMemberId, setSelectedMemberId] = useState<string>(mockMembers[0].id);
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<{ file: File; preview: string; type: 'image' | 'file' } | null>(null);

  const selectedMember = mockMembers.find(m => m.id === selectedMemberId) || mockMembers[0];
  const currentMessages = mockMessagesByMember[selectedMemberId] || [];

  const getRoleIcon = (role: 'ward' | 'block' | 'district') => {
    switch (role) {
      case 'ward':
        return <Users className="w-4 h-4" />;
      case 'block':
        return <Building2 className="w-4 h-4" />;
      case 'district':
        return <Award className="w-4 h-4" />;
    }
  };

  const getRoleBadgeColor = (role: 'ward' | 'block' | 'district') => {
    switch (role) {
      case 'ward':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'block':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'district':
        return 'bg-purple-100 text-purple-700 border-purple-200';
    }
  };

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
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold">Chat with Members</h2>
            <p className="text-white/90 mt-1 text-sm md:text-base">അംഗങ്ങളുമായി ചാറ്റ് ചെയ്യുക</p>
          </div>
          
          {/* Member Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              >
                <Avatar className="w-6 h-6 mr-2">
                  <AvatarImage src={selectedMember.photo} alt={selectedMember.name} />
                  <AvatarFallback className="bg-white/20 text-white text-xs">
                    {selectedMember.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline">{selectedMember.name}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {mockMembers.map((member) => (
                <DropdownMenuItem
                  key={member.id}
                  onClick={() => setSelectedMemberId(member.id)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={member.photo} alt={member.name} />
                      <AvatarFallback className="bg-[#2D7A4F] text-white text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">{member.name}</p>
                        {member.isOnline && (
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{member.roleLabel}</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Chat Area */}
      <Card className="flex flex-col h-[calc(100vh-300px)]">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={selectedMember.photo} alt={selectedMember.name} />
                <AvatarFallback className="bg-[#2D7A4F] text-white">
                  {selectedMember.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base md:text-lg">{selectedMember.name}</CardTitle>
                  {selectedMember.isOnline && (
                    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs">
                      Online
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={`text-xs ${getRoleBadgeColor(selectedMember.role)}`}>
                    {getRoleIcon(selectedMember.role)}
                    <span className="ml-1">{selectedMember.roleLabel}</span>
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{selectedMember.nameMl}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = `tel:${selectedMember.phone}`}
              className="border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white"
            >
              <Phone className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">Call</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] md:max-w-[75%] rounded-lg p-3 ${
                    msg.isOwn
                      ? 'bg-[#2D7A4F] text-white'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  {!msg.isOwn && (
                    <p className="text-xs font-semibold mb-1 opacity-80">{msg.senderName}</p>
                  )}
                  <p className="text-sm break-words">{msg.message}</p>
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

