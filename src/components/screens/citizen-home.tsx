import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Heart, MessageSquareText, Camera, TrendingUp, User, ArrowRight, Building2, Award, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { EventsBanner } from '../events-banner';
import { PollCard } from '../poll-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';

interface PollOption {
  id: string;
  text: string;
  textMl: string;
  votes: number;
  percentage: number;
}

interface Poll {
  id: string;
  question: string;
  questionMl: string;
  options: PollOption[];
  totalVotes: number;
  endDate?: Date;
  hasVoted?: boolean;
  userVote?: string;
}

interface FeedPost {
  id: string;
  titleEn: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  location: string;
  images?: string[]; // Multiple images instead of beforeImage/afterImage
  status?: 'completed' | 'in-progress' | 'planned';
  poll?: Poll; // Optional poll
  postedBy: {
    name: string;
    nameMl: string;
    role: 'ward' | 'block' | 'district';
    roleLabel: string;
    roleLabelMl: string;
    photo: string;
  };
  postedAt: string;
  likes: number;
  comments: number;
}

const mockFeedPosts: FeedPost[] = [
  {
    id: '1',
    titleEn: 'Road Improvement - MG Road',
    titleMl: 'റോഡ് മെച്ചപ്പെടുത്തൽ - എംജി റോഡ്',
    description: 'Major road renovation completed with new asphalt and proper drainage system',
    descriptionMl: 'പുതിയ ആസ്ഫാൽറ്റും ശരിയായ ഡ്രെയിനേജ് സിസ്റ്റവും ഉപയോഗിച്ച് പ്രധാന റോഡ് നവീകരണം പൂർത്തിയാക്കി',
    location: 'Ward 5, MG Road',
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=450&fit=crop&q=80', // Damaged road with potholes
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop&q=80', // Road construction workers
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=450&fit=crop&q=80', // Fresh asphalt being laid
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop&q=80' // Newly completed smooth road
    ],
    status: 'completed',
    postedBy: {
      name: 'Mohammed Shafi',
      nameMl: 'മുഹമ്മദ് ഷാഫി',
      role: 'ward',
      roleLabel: 'Ward Member',
      roleLabelMl: 'വാർഡ് മെമ്പർ',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    postedAt: '2 hours ago',
    likes: 45,
    comments: 12
  },
  {
    id: '2',
    titleEn: 'Community Park Development',
    titleMl: 'കമ്മ്യൂണിറ്റി പാർക്ക് വികസനം',
    description: 'New community park with children play area and walking track',
    descriptionMl: 'കുട്ടികളുടെ കളിസ്ഥലവും നടത്ത സൗകര്യവും ഉള്ള പുതിയ കമ്മ്യൂണിറ്റി പാർക്ക്',
    location: 'Ward 3, Kochi',
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop', // Green park with trees
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=450&fit=crop', // Community park area
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop', // Playground with children equipment
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=450&fit=crop', // Walking track in park
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=450&fit=crop' // Park benches and pathways
    ],
    status: 'in-progress',
    postedBy: {
      name: 'Fr. Thomas Varghese',
      nameMl: 'ഫാ. തോമസ് വർഗീസ്',
      role: 'ward',
      roleLabel: 'Ward Member',
      roleLabelMl: 'വാർഡ് മെമ്പർ',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop'
    },
    postedAt: '5 hours ago',
    likes: 32,
    comments: 8
  },
  {
    id: '3',
    titleEn: 'Block Level Health Camp',
    titleMl: 'ബ്ലോക്ക് തല ആരോഗ്യ ക്യാമ്പ്',
    description: 'Free health checkup camp organized for all residents in Block 2',
    descriptionMl: 'ബ്ലോക്ക് 2-ലെ എല്ലാ നിവാസികൾക്കും സൗജന്യ ആരോഗ്യ പരിശോധന ക്യാമ്പ് ആഘോഷിച്ചു',
    location: 'Block 2, Ernakulam',
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=450&fit=crop', // Health camp setup with tents
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=450&fit=crop', // Doctor performing health checkup
      'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=450&fit=crop', // Healthcare workers at camp
      'https://images.unsplash.com/photo-1512678080530-4c2e0c8a0c4e?w=800&h=450&fit=crop', // Community members at health camp
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop', // Health awareness materials
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&h=450&fit=crop' // People queue for health checkup
    ],
    status: 'completed',
    postedBy: {
      name: 'Dr. Abdul Rahman',
      nameMl: 'ഡോ. അബ്ദുൾ റഹ്മാൻ',
      role: 'block',
      roleLabel: 'Block Panchayat Member',
      roleLabelMl: 'ബ്ലോക്ക് പഞ്ചായത്ത് മെമ്പർ',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    postedAt: '1 day ago',
    likes: 78,
    comments: 23
  },
  {
    id: '4',
    titleEn: 'District Level Water Project',
    titleMl: 'ജില്ലാ തല ജല പദ്ധതി',
    description: 'New water treatment plant inaugurated to serve entire district',
    descriptionMl: 'മുഴുവൻ ജില്ലയ്ക്കും സേവനം നൽകുന്ന പുതിയ ജല ശുദ്ധീകരണ പ്ലാന്റ് ഉദ്ഘാടനം ചെയ്തു',
    location: 'Ernakulam District',
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop', // Water treatment plant facility
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop', // Water purification equipment
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=450&fit=crop', // Large water storage tanks
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=450&fit=crop', // Water pipeline infrastructure
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=450&fit=crop' // Clean water supply
    ],
    status: 'completed',
    postedBy: {
      name: 'Adv. Shamsudheen K',
      nameMl: 'അഡ്വ. ഷംസുദ്ദീൻ കെ',
      role: 'district',
      roleLabel: 'District Panchayat Member',
      roleLabelMl: 'ജില്ലാ പഞ്ചായത്ത് മെമ്പർ',
      photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
    },
    postedAt: '3 days ago',
    likes: 156,
    comments: 45
  },
  {
    id: '5',
    titleEn: 'Street Lighting Upgrade',
    titleMl: 'തെരുവ് വിളക്ക് നവീകരണം',
    description: 'LED street lights installed across all major roads in Ward 7',
    descriptionMl: 'വാർഡ് 7-ലെ എല്ലാ പ്രധാന റോഡുകളിലും LED തെരുവ് വിളക്കുകൾ സ്ഥാപിച്ചു',
    location: 'Ward 7, Thrissur',
    images: [
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=450&fit=crop', // Old traditional street lights
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop', // Workers installing LED lights
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=450&fit=crop', // Brightly lit street at night
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop', // Modern LED street light poles
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=450&fit=crop&q=80' // LED street lighting illumination
    ],
    status: 'in-progress',
    postedBy: {
      name: 'Smt. Radha Nair',
      nameMl: 'ശ്രീമതി രാധ നായർ',
      role: 'ward',
      roleLabel: 'Ward Member',
      roleLabelMl: 'വാർഡ് മെമ്പർ',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    postedAt: '4 days ago',
    likes: 28,
    comments: 6
  },
  {
    id: '6',
    titleEn: 'Block Level Education Initiative',
    titleMl: 'ബ്ലോക്ക് തല വിദ്യാഭ്യാസ പദ്ധതി',
    description: 'Digital classrooms and library facilities upgraded in all schools',
    descriptionMl: 'എല്ലാ സ്കൂളുകളിലും ഡിജിറ്റൽ ക്ലാസ്‌റൂമുകളും ലൈബ്രറി സൗകര്യങ്ങളും നവീകരിച്ചു',
    location: 'Block 2',
    images: [
      'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=450&fit=crop', // School building exterior
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=450&fit=crop', // Students in digital classroom
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&h=450&fit=crop', // Modern library with books
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=450&fit=crop', // Students using computers
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=450&fit=crop' // Educational technology setup
    ],
    status: 'completed',
    postedBy: {
      name: 'Adv. Maria Joseph',
      nameMl: 'അഡ്വ. മറിയ ജോസഫ്',
      role: 'block',
      roleLabel: 'Block Panchayat President',
      roleLabelMl: 'ബ്ലോക്ക് പഞ്ചായത്ത് പ്രസിഡന്റ്',
      photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=200&fit=crop'
    },
    postedAt: '1 week ago',
    likes: 92,
    comments: 31
  },
  {
    id: '7',
    titleEn: 'Community Decision Poll',
    titleMl: 'കമ്മ്യൂണിറ്റി തീരുമാന പോൾ',
    description: 'Help us decide on the location for the new community center',
    descriptionMl: 'പുതിയ കമ്മ്യൂണിറ്റി സെന്ററിന്റെ സ്ഥലം തീരുമാനിക്കാൻ സഹായിക്കുക',
    location: 'Ward 5',
    poll: {
      id: 'poll1',
      question: 'Where should we build the new community center?',
      questionMl: 'പുതിയ കമ്മ്യൂണിറ്റി സെന്റർ എവിടെ നിർമ്മിക്കണം?',
      options: [
        { id: 'opt1', text: 'Near the park', textMl: 'പാർക്കിന് സമീപം', votes: 145, percentage: 45 },
        { id: 'opt2', text: 'Near the school', textMl: 'സ്കൂളിന് സമീപം', votes: 98, percentage: 31 },
        { id: 'opt3', text: 'Near the temple', textMl: 'ക്ഷേത്രത്തിന് സമീപം', votes: 78, percentage: 24 }
      ],
      totalVotes: 321,
      hasVoted: false
    },
    postedBy: {
      name: 'Mohammed Shafi',
      nameMl: 'മുഹമ്മദ് ഷാഫി',
      role: 'ward',
      roleLabel: 'Ward Member',
      roleLabelMl: 'വാർഡ് മെമ്പർ',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
    },
    postedAt: '3 days ago',
    likes: 67,
    comments: 28
  },
  {
    id: '8',
    titleEn: 'Budget Allocation Poll',
    titleMl: 'ബജറ്റ് നീക്കിവയ്പ്പ് പോൾ',
    description: 'Vote on how to allocate the development budget for next year',
    descriptionMl: 'അടുത്ത വർഷത്തെ വികസന ബജറ്റ് എങ്ങനെ നീക്കിവയ്ക്കണമെന്ന് വോട്ട് ചെയ്യുക',
    location: 'Block 2',
    poll: {
      id: 'poll2',
      question: 'What should be the priority for next year\'s budget?',
      questionMl: 'അടുത്ത വർഷത്തെ ബജറ്റിന്റെ മുൻഗണന എന്തായിരിക്കണം?',
      options: [
        { id: 'opt1', text: 'Road improvements', textMl: 'റോഡ് മെച്ചപ്പെടുത്തൽ', votes: 234, percentage: 42 },
        { id: 'opt2', text: 'Health facilities', textMl: 'ആരോഗ്യ സൗകര്യങ്ങൾ', votes: 198, percentage: 36 },
        { id: 'opt3', text: 'Education infrastructure', textMl: 'വിദ്യാഭ്യാസ ഇൻഫ്രാസ്ട്രക്ചർ', votes: 123, percentage: 22 }
      ],
      totalVotes: 555,
      hasVoted: true,
      userVote: 'opt1'
    },
    postedBy: {
      name: 'Adv. Maria Joseph',
      nameMl: 'അഡ്വ. മറിയ ജോസഫ്',
      role: 'block',
      roleLabel: 'Block Panchayat President',
      roleLabelMl: 'ബ്ലോക്ക് പഞ്ചായത്ത് പ്രസിഡന്റ്',
      photo: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=200&h=200&fit=crop'
    },
    postedAt: '5 days ago',
    likes: 89,
    comments: 45
  }
];

interface CitizenHomeProps {
  onNavigate: (screen: string) => void;
  currentUserRole?: 'citizen' | 'pravasi' | 'leader' | 'admin';
}

export function CitizenHome({ onNavigate, currentUserRole }: CitizenHomeProps) {
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

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div 
          className="p-6 text-white relative"
          style={{
            background: 'linear-gradient(135deg, #2D7A4F 0%, #8B9D83 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 16.569-13.431 30-30 30h30V0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
          
          <div className="relative z-10">
            <h2>Welcome to e-Lokam</h2>
            <p className="text-white/90 mt-1">ഇ-ലോകത്തിലേക്ക് സ്വാഗതം</p>
            <p className="text-sm text-white/80 mt-2">Ward 5, MG Road, Kochi</p>
          </div>
        </div>
      </Card>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
          style={{ borderLeftColor: '#2D5016', backgroundColor: '#F0F8EF' }}
          onClick={() => onNavigate('social-care')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8B9D83' }}>
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h4>Social Care Hub</h4>
            <p className="text-sm text-muted-foreground mt-1">സാമൂഹിക പരിചരണം</p>
            <p className="text-xs text-muted-foreground mt-2">ASHA, Palliative, Emergency</p>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
          style={{ borderLeftColor: '#FFB627', backgroundColor: '#FFF8E1' }}
          onClick={() => onNavigate('health-request')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#FFB627' }}>
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h4>Request Visit</h4>
            <p className="text-sm text-muted-foreground mt-1">സന്ദർശനം അഭ്യർത്ഥിക്കുക</p>
            <p className="text-xs text-muted-foreground mt-2">Medical, Checkup, Emergency</p>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
          style={{ borderLeftColor: '#2D7A4F' }}
          onClick={() => onNavigate('grievance')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#2D7A4F] rounded-full flex items-center justify-center">
              <MessageSquareText className="w-8 h-8 text-white" />
            </div>
            <h4>Report Issue</h4>
            <p className="text-sm text-muted-foreground mt-1">പരാതി റിപ്പോർട്ട് ചെയ്യുക</p>
            <p className="text-xs text-muted-foreground mt-2">Water, Roads, Electricity</p>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
          style={{ borderLeftColor: '#1E5A8E' }}
          onClick={() => onNavigate('profile')}
        >
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-[#1E5A8E] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <h4>My Profile</h4>
            <p className="text-sm text-muted-foreground mt-1">എന്റെ പ്രൊഫൈൽ</p>
            <p className="text-xs text-muted-foreground mt-2">Settings & Information</p>
          </CardContent>
        </Card>
      </div>

      {/* Elected Members Quick Access */}
      <Card 
        className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
        style={{ borderLeftColor: '#8B4513', backgroundColor: '#FFF8F0' }}
        onClick={() => onNavigate('elected-members')}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#8B4513' }}>
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base">Elected Members</h4>
              <p className="text-xs text-muted-foreground">തെരഞ്ഞെടുക്കപ്പെട്ട അംഗങ്ങൾ</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </div>
          
          {/* Member Images - Ward, Block, District (User's Representatives) */}
          <div className="flex items-center gap-3 pt-3 border-t">
            {/* Ward Member - Ward 5 (User's Ward) */}
            <div className="flex flex-col items-center flex-1">
              <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Mohammed Shafi" />
                <AvatarFallback className="bg-[#2D7A4F] text-white text-xs">MS</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium">Ward</p>
              <p className="text-xs text-muted-foreground">Ward 5</p>
            </div>
            
            {/* Block Member - Block 2 (User's Block) */}
            <div className="flex flex-col items-center flex-1">
              <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" alt="Dr. Abdul Rahman" />
                <AvatarFallback className="bg-[#1E5A8E] text-white text-xs">AR</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium">Block</p>
              <p className="text-xs text-muted-foreground">Block 2</p>
            </div>
            
            {/* District Member - Ernakulam (User's District) */}
            <div className="flex flex-col items-center flex-1">
              <Avatar className="w-12 h-12 border-2 border-white shadow-md">
                <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" alt="Adv. Shamsudheen K" />
                <AvatarFallback className="bg-[#8B4513] text-white text-xs">SK</AvatarFallback>
              </Avatar>
              <p className="text-xs text-muted-foreground mt-1.5 font-medium">District</p>
              <p className="text-xs text-muted-foreground">Ernakulam</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl text-[#2D7A4F]">24</div>
            <div className="text-sm text-muted-foreground">Active Projects</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl text-[#1E5A8E]">156</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl text-[#2D5016]">4</div>
            <div className="text-sm text-muted-foreground">Health Workers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl text-[#FFB627]">~15min</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </CardContent>
        </Card>
      </div>

      {/* Events Banner - Important Meetings/Events */}
      <EventsBanner />

      {/* Feed - Posts from Ward, Block, and District Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <CardTitle>Community Feed</CardTitle>
            <div className="flex items-center gap-2">
              {(currentUserRole === 'leader' || currentUserRole === 'admin') && (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => onNavigate('create-post')}
                  className="bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                >
                  <MessageSquareText className="w-4 h-4 mr-1" />
                  Create Post
                </Button>
              )}
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockFeedPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-6">
                  {/* Post Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.postedBy.photo} alt={post.postedBy.name} />
                      <AvatarFallback className="bg-[#2D7A4F] text-white">
                        {post.postedBy.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-sm md:text-base">{post.postedBy.name}</h4>
                        <Badge variant="outline" className="text-xs">
                          {getRoleIcon(post.postedBy.role)}
                          <span className="ml-1 hidden sm:inline">{post.postedBy.roleLabel}</span>
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{post.postedBy.nameMl}</p>
                      <p className="text-xs text-muted-foreground mt-1">{post.postedAt}</p>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <h3 className="font-semibold text-base md:text-lg mb-1">{post.titleEn}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{post.titleMl}</p>
                    <p className="text-sm text-foreground">{post.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{post.descriptionMl}</p>
                  </div>

                  {/* Poll */}
                  {post.poll && (
                    <div className="mb-4">
                      <PollCard 
                        poll={post.poll}
                        onVote={(pollId, optionId) => {
                          console.log('Vote submitted:', pollId, optionId);
                          // In a real app, this would update the poll via API
                        }}
                      />
                    </div>
                  )}

                  {/* Multiple Images Carousel */}
                  {post.images && post.images.length > 0 && (
                    <div className="relative mb-4">
                      <Carousel className="w-full">
                        <CarouselContent>
                          {post.images.map((image, index) => (
                            <CarouselItem key={index}>
                              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                                <ImageWithFallback
                                  src={image}
                                  alt={`${post.titleEn} - Image ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                                {index === 0 && post.status && (
                                  <div className="absolute top-2 right-2">
                                    <Badge 
                                      variant={post.status === 'completed' ? 'default' : 'secondary'}
                                      className={post.status === 'completed' ? 'bg-[#2D7A4F]' : 'bg-orange-500 text-xs'}
                                    >
                                      {post.status}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        {post.images.length > 1 && (
                          <>
                            <CarouselPrevious className="left-2 bg-white/90 hover:bg-white" />
                            <CarouselNext className="right-2 bg-white/90 hover:bg-white" />
                          </>
                        )}
                      </Carousel>
                      {post.images.length > 1 && (
                        <div className="absolute bottom-2 left-2">
                          <Badge variant="secondary" className="bg-black/60 text-white border-0 text-xs">
                            {post.images.length} Photos
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Post Footer */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquareText className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{post.location}</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigate('citizen-chat')}
                      className="text-xs"
                    >
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
