import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Phone, MessageCircle, Mail, MapPin, Award, Building2, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ElectedMember {
  id: string;
  name: string;
  nameMl: string;
  role: 'ward' | 'block' | 'district';
  roleLabel: string;
  roleLabelMl: string;
  ward?: string;
  block?: string;
  district?: string;
  phone: string;
  email?: string;
  photo: string;
  isCurrentUser?: boolean;
  party?: string;
  experience?: string;
}

const getWardMembers = (currentUserRole?: 'citizen' | 'pravasi' | 'leader'): ElectedMember[] => {
  const members: ElectedMember[] = [
    {
      id: 'wm1',
      name: 'Mohammed Shafi',
      nameMl: 'മുഹമ്മദ് ഷാഫി',
      role: 'ward',
      roleLabel: 'Ward Member',
      roleLabelMl: 'വാർഡ് മെമ്പർ',
      ward: 'Ward 5',
      phone: '+91 98765 43210',
      email: 'shafi.ward5@panchayat.in',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      isCurrentUser: currentUserRole === 'leader',
      party: 'Independent',
      experience: '5 years'
    },
  {
    id: 'wm2',
    name: 'Fr. Thomas Varghese',
    nameMl: 'ഫാ. തോമസ് വർഗീസ്',
    role: 'ward',
    roleLabel: 'Ward Member',
    roleLabelMl: 'വാർഡ് മെമ്പർ',
    ward: 'Ward 3',
    phone: '+91 98765 43211',
    email: 'thomas.ward3@panchayat.in',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    isCurrentUser: false,
    party: 'CPM',
    experience: '3 years'
  },
  {
    id: 'wm3',
    name: 'Smt. Radha Nair',
    nameMl: 'ശ്രീമതി രാധ നായർ',
    role: 'ward',
    roleLabel: 'Ward Member',
    roleLabelMl: 'വാർഡ് മെമ്പർ',
    ward: 'Ward 7',
    phone: '+91 98765 43212',
    email: 'radha.ward7@panchayat.in',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    isCurrentUser: false,
    party: 'Congress',
    experience: '7 years'
  },
  {
    id: 'wm4',
    name: 'Ayesha Begum',
    nameMl: 'ആയിഷ ബീഗം',
    role: 'ward',
    roleLabel: 'Ward Member',
    roleLabelMl: 'വാർഡ് മെമ്പർ',
    ward: 'Ward 2',
    phone: '+91 98765 43213',
    email: 'ayesha.ward2@panchayat.in',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    isCurrentUser: false,
    party: 'IUML',
    experience: '4 years'
  }
  ];
  
  return members;
};

const mockBlockMembers: ElectedMember[] = [
  {
    id: 'bm1',
    name: 'Dr. Abdul Rahman',
    nameMl: 'ഡോ. അബ്ദുൾ റഹ്മാൻ',
    role: 'block',
    roleLabel: 'Block Panchayat Member',
    roleLabelMl: 'ബ്ലോക്ക് പഞ്ചായത്ത് മെമ്പർ',
    block: 'Block 2',
    district: 'Ernakulam',
    phone: '+91 98765 43220',
    email: 'abdul.block2@panchayat.in',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    party: 'IUML',
    experience: '10 years'
  },
  {
    id: 'bm2',
    name: 'Adv. Maria Joseph',
    nameMl: 'അഡ്വ. മറിയ ജോസഫ്',
    role: 'block',
    roleLabel: 'Block Panchayat President',
    roleLabelMl: 'ബ്ലോക്ക് പഞ്ചായത്ത് പ്രസിഡന്റ്',
    block: 'Block 2',
    district: 'Ernakulam',
    phone: '+91 98765 43221',
    email: 'maria.block2@panchayat.in',
    photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=200&fit=crop',
    party: 'Congress',
    experience: '12 years'
  }
];

const mockDistrictMembers: ElectedMember[] = [
  {
    id: 'dm1',
    name: 'Adv. Shamsudheen K',
    nameMl: 'അഡ്വ. ഷംസുദ്ദീൻ കെ',
    role: 'district',
    roleLabel: 'District Panchayat Member',
    roleLabelMl: 'ജില്ലാ പഞ്ചായത്ത് മെമ്പർ',
    district: 'Ernakulam',
    phone: '+91 98765 43230',
    email: 'shamsudheen.district@panchayat.in',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    party: 'IUML',
    experience: '15 years'
  },
  {
    id: 'dm2',
    name: 'Smt. Rosamma Chacko',
    nameMl: 'ശ്രീമതി റോസമ്മ ചാക്കോ',
    role: 'district',
    roleLabel: 'District Panchayat President',
    roleLabelMl: 'ജില്ലാ പഞ്ചായത്ത് പ്രസിഡന്റ്',
    district: 'Ernakulam',
    phone: '+91 98765 43231',
    email: 'rosamma.district@panchayat.in',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    party: 'CPM',
    experience: '18 years'
  }
];

interface ElectedMembersProps {
  currentUserRole?: 'citizen' | 'pravasi' | 'leader';
  onChat?: (memberId: string) => void;
}

export function ElectedMembers({ currentUserRole, onChat }: ElectedMembersProps) {
  const wardMembers = getWardMembers(currentUserRole);
  
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleChat = (memberId: string) => {
    if (onChat) {
      onChat(memberId);
    }
  };

  const renderMemberCard = (member: ElectedMember) => (
    <Card key={member.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={member.photo} alt={member.name} />
            <AvatarFallback className="bg-[#2D7A4F] text-white">
              {member.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-base">{member.name}</h4>
                <p className="text-sm text-muted-foreground">{member.nameMl}</p>
              </div>
              {member.isCurrentUser && (
                <Badge className="bg-[#2D7A4F]">You</Badge>
              )}
            </div>
            
            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{member.roleLabel}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{member.roleLabelMl}</span>
              </div>
              
              {member.ward && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{member.ward}</span>
                </div>
              )}
              
              {member.block && (
                <div className="flex items-center gap-2 text-sm">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{member.block}</span>
                </div>
              )}
              
              {member.district && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{member.district} District</span>
                </div>
              )}
              
              {member.party && (
                <Badge variant="outline" className="text-xs">
                  {member.party}
                </Badge>
              )}
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleCall(member.phone)}
                className="border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white text-xs"
              >
                <Phone className="w-3 h-3 mr-1" />
                Call
              </Button>
              
              {(currentUserRole === 'citizen' || currentUserRole === 'pravasi') && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleChat(member.id)}
                  className="border-[#1E5A8E] text-[#1E5A8E] hover:bg-[#1E5A8E] hover:text-white text-xs"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Chat
                </Button>
              )}
              
              {member.email && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.location.href = `mailto:${member.email}`}
                  className="text-xs"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Email
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <h2>Elected Members</h2>
          <p className="text-white/90 mt-1">തെരഞ്ഞെടുക്കപ്പെട്ട അംഗങ്ങൾ</p>
        </div>
      </Card>

      {/* Tabs for different levels */}
      <Tabs defaultValue="ward" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ward" className="text-sm md:text-base">
            <Users className="w-4 h-4 mr-2" />
            Ward Members
          </TabsTrigger>
          <TabsTrigger value="block" className="text-sm md:text-base">
            <Building2 className="w-4 h-4 mr-2" />
            Block Members
          </TabsTrigger>
          <TabsTrigger value="district" className="text-sm md:text-base">
            <Award className="w-4 h-4 mr-2" />
            District Members
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="ward" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {wardMembers.map(renderMemberCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="block" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockBlockMembers.map(renderMemberCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="district" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockDistrictMembers.map(renderMemberCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

