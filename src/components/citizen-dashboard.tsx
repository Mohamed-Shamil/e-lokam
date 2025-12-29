import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Camera, MapPin, Calendar, TrendingUp, Heart, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { SocialCareHub } from './social-care-hub';
import { HealthRequest } from './health-request';
import { MedicalChat } from './medical-chat';
import { UserProfile } from './user-profile';

interface DevelopmentCard {
  id: string;
  titleEn: string;
  titleMl: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  status: 'completed' | 'in-progress' | 'planned';
  date: string;
  category: string;
}

const mockDevelopments: DevelopmentCard[] = [
  {
    id: '1',
    titleEn: 'Road Improvement - MG Road',
    titleMl: 'റോഡ് മെച്ചപ്പെടുത്തൽ - എംജി റോഡ്',
    location: 'Ward 5, MG Road',
    beforeImage: 'damaged road',
    afterImage: 'new road construction',
    status: 'completed',
    date: 'Dec 2024',
    category: 'Infrastructure'
  },
  {
    id: '2',
    titleEn: 'Community Park Development',
    titleMl: 'കമ്മ്യൂണിറ്റി പാർക്ക് വികസനം',
    location: 'Ward 3, Kochi',
    beforeImage: 'empty land',
    afterImage: 'park garden',
    status: 'in-progress',
    date: 'Jan 2025',
    category: 'Parks'
  },
  {
    id: '3',
    titleEn: 'Water Supply Enhancement',
    titleMl: 'ജലവിതരണ മെച്ചപ്പെടുത്തൽ',
    location: 'Ward 7, Thrissur',
    beforeImage: 'old water tank',
    afterImage: 'water treatment facility',
    status: 'planned',
    date: 'Feb 2025',
    category: 'Water'
  }
];

export function CitizenDashboard() {
  const [selectedCards, setSelectedCards] = useState<Record<string, 'before' | 'after'>>({});

  const toggleView = (id: string) => {
    setSelectedCards(prev => ({
      ...prev,
      [id]: prev[id] === 'after' ? 'before' : 'after'
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] rounded-xl p-6 text-white">
        <h2>Development Dashboard</h2>
        <p className="text-white/90 mt-1">വികസന ഡാഷ്‌ബോർഡ്</p>
        <div className="flex gap-4 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl">24</div>
            <div className="text-sm text-white/80">Active Projects</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl">156</div>
            <div className="text-sm text-white/80">Completed</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl">12</div>
            <div className="text-sm text-white/80">My Ward</div>
          </div>
        </div>
      </div>

      {/* Development Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Recent Developments</h3>
          <Button variant="ghost" className="gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {mockDevelopments.map((dev) => (
          <Card key={dev.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{dev.titleEn}</CardTitle>
                  <p className="text-muted-foreground mt-1">{dev.titleMl}</p>
                </div>
                <Badge 
                  variant={dev.status === 'completed' ? 'default' : 'secondary'}
                  className={dev.status === 'completed' ? 'bg-[#2D7A4F]' : ''}
                >
                  {dev.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Before/After Image Toggle */}
              <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                <ImageWithFallback
                  src={`https://source.unsplash.com/800x450/?${
                    selectedCards[dev.id] === 'after' ? dev.afterImage : dev.beforeImage
                  }`}
                  alt={selectedCards[dev.id] === 'after' ? 'After' : 'Before'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-black/60 text-white border-0">
                    {selectedCards[dev.id] === 'after' ? 'After / ശേഷം' : 'Before / മുമ്പ്'}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3">
                  <Button
                    size="sm"
                    onClick={() => toggleView(dev.id)}
                    className="bg-white/90 text-foreground hover:bg-white"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Toggle View
                  </Button>
                </div>
              </div>

              {/* Details */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {dev.location}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {dev.date}
                </div>
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  {dev.category}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Social Care Hub */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Social Care Hub</h3>
          <Button variant="ghost" className="gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <SocialCareHub />
      </div>

      {/* Health Request */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Health Request</h3>
          <Button variant="ghost" className="gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <HealthRequest />
      </div>

      {/* Medical Chat */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>Medical Chat</h3>
          <Button variant="ghost" className="gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <MedicalChat />
      </div>

      {/* User Profile */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3>User Profile</h3>
          <Button variant="ghost" className="gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <UserProfile />
      </div>
    </div>
  );
}