import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Heart, MessageSquareText, Camera, TrendingUp, User, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface DevelopmentCard {
  id: string;
  titleEn: string;
  titleMl: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  status: 'completed' | 'in-progress' | 'planned';
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
  },
  {
    id: '2',
    titleEn: 'Community Park Development',
    titleMl: 'കമ്മ്യൂണിറ്റി പാർക്ക് വികസനം',
    location: 'Ward 3, Kochi',
    beforeImage: 'empty land',
    afterImage: 'park garden',
    status: 'in-progress',
  },
];

interface CitizenHomeProps {
  onNavigate: (screen: string) => void;
}

export function CitizenHome({ onNavigate }: CitizenHomeProps) {
  const [selectedCards, setSelectedCards] = useState<Record<string, 'before' | 'after'>>({});

  const toggleView = (id: string) => {
    setSelectedCards(prev => ({
      ...prev,
      [id]: prev[id] === 'after' ? 'before' : 'after'
    }));
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

      {/* Recent Developments */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Developments</CardTitle>
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockDevelopments.map((dev) => (
              <Card key={dev.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-base">{dev.titleEn}</h4>
                      <p className="text-sm text-muted-foreground">{dev.titleMl}</p>
                    </div>
                    <Badge 
                      variant={dev.status === 'completed' ? 'default' : 'secondary'}
                      className={dev.status === 'completed' ? 'bg-[#2D7A4F]' : ''}
                    >
                      {dev.status}
                    </Badge>
                  </div>

                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted mt-3">
                    <ImageWithFallback
                      src={`https://source.unsplash.com/600x400/?${
                        selectedCards[dev.id] === 'after' ? dev.afterImage : dev.beforeImage
                      }`}
                      alt={selectedCards[dev.id] === 'after' ? 'After' : 'Before'}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="bg-black/60 text-white border-0">
                        {selectedCards[dev.id] === 'after' ? 'After' : 'Before'}
                      </Badge>
                    </div>
                    <div className="absolute bottom-2 right-2">
                      <Button
                        size="sm"
                        onClick={() => toggleView(dev.id)}
                        className="bg-white/90 text-foreground hover:bg-white"
                      >
                        <Camera className="w-4 h-4 mr-1" />
                        Toggle
                      </Button>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mt-2">{dev.location}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
