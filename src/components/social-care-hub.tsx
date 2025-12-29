import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Phone, Heart, Ambulance, Users, MapPin, Clock, Star } from 'lucide-react';

interface HealthWorker {
  id: string;
  name: string;
  nameMl: string;
  role: string;
  roleMl: string;
  category: 'asha' | 'palliative' | 'emergency' | 'governance';
  phone: string;
  ward: string;
  photo: string;
  available: boolean;
  rating: number;
  responseTime: string;
}

const healthWorkers: HealthWorker[] = [
  {
    id: '1',
    name: 'Suma Krishna',
    nameMl: 'സുമ കൃഷ്ണ',
    role: 'ASHA Worker',
    roleMl: 'ആശാ പ്രവർത്തകൻ',
    category: 'asha',
    phone: '+91 98765 43210',
    ward: 'Ward 5',
    photo: 'healthcare worker',
    available: true,
    rating: 4.8,
    responseTime: '~15 min'
  },
  {
    id: '2',
    name: 'Dr. Lakshmi Menon',
    nameMl: 'ഡോ. ലക്ഷ്മി മേനോൻ',
    role: 'Palliative Care Nurse',
    roleMl: 'സാന്ത്വന പരിചരണ നഴ്സ്',
    category: 'palliative',
    phone: '+91 98765 43211',
    ward: 'Ward 5',
    photo: 'nurse',
    available: true,
    rating: 4.9,
    responseTime: '~30 min'
  },
  {
    id: '3',
    name: 'Ravi Kumar',
    nameMl: 'രവി കുമാർ',
    role: 'Ambulance Driver',
    roleMl: 'ആംബുലൻസ് ഡ്രൈവർ',
    category: 'emergency',
    phone: '+91 98765 43212',
    ward: 'Ward 5',
    photo: 'ambulance driver',
    available: true,
    rating: 4.7,
    responseTime: '~10 min'
  },
  {
    id: '4',
    name: 'Anjali Nair',
    nameMl: 'അഞ്ജലി നായർ',
    role: 'Ward Member - Health Committee',
    roleMl: 'വാർഡ് മെമ്പർ - ആരോഗ്യ സമിതി',
    category: 'governance',
    phone: '+91 98765 43213',
    ward: 'Ward 5',
    photo: 'woman professional',
    available: true,
    rating: 4.6,
    responseTime: '~1 hour'
  }
];

export function SocialCareHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredWorkers = selectedCategory === 'all' 
    ? healthWorkers 
    : healthWorkers.filter(w => w.category === selectedCategory);

  const handleCall = (phone: string, name: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Biophilic Design */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div 
          className="p-6 text-white relative"
          style={{
            background: 'linear-gradient(135deg, #2D5016 0%, #8B9D83 100%)',
          }}
        >
          {/* Leaf Pattern Overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 16.569-13.431 30-30 30h30V0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2>Social Care Hub</h2>
                <p className="text-white/90">സാമൂഹിക പരിചരണ കേന്ദ്രം</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl">4</div>
                <div className="text-sm text-white/80">Health Workers</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl">~15min</div>
                <div className="text-sm text-white/80">Avg Response</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl">24/7</div>
                <div className="text-sm text-white/80">Emergency</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-2xl">98%</div>
                <div className="text-sm text-white/80">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('all')}
          className={selectedCategory === 'all' ? 'bg-[#2D5016] hover:bg-[#2D5016]/90' : ''}
        >
          All Contacts
        </Button>
        <Button
          variant={selectedCategory === 'asha' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('asha')}
          className={selectedCategory === 'asha' ? 'bg-[#8B9D83] hover:bg-[#8B9D83]/90' : ''}
        >
          <Heart className="w-4 h-4 mr-2" />
          ASHA Workers
        </Button>
        <Button
          variant={selectedCategory === 'palliative' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('palliative')}
          className={selectedCategory === 'palliative' ? 'bg-[#A8D5A5] hover:bg-[#A8D5A5]/90 text-foreground' : ''}
        >
          Palliative Care
        </Button>
        <Button
          variant={selectedCategory === 'emergency' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('emergency')}
          className={selectedCategory === 'emergency' ? 'bg-[#FFB627] hover:bg-[#FFB627]/90 text-foreground' : ''}
        >
          <Ambulance className="w-4 h-4 mr-2" />
          Emergency
        </Button>
        <Button
          variant={selectedCategory === 'governance' ? 'default' : 'outline'}
          onClick={() => setSelectedCategory('governance')}
          className={selectedCategory === 'governance' ? 'bg-[#2D7A4F] hover:bg-[#2D7A4F]/90' : ''}
        >
          <Users className="w-4 h-4 mr-2" />
          Governance
        </Button>
      </div>

      {/* Emergency Contact Directory */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredWorkers.map((worker) => {
          const categoryColors = {
            asha: { bg: '#E8F5E9', border: '#8B9D83', icon: '#2D5016' },
            palliative: { bg: '#F0F8EF', border: '#A8D5A5', icon: '#2D7A4F' },
            emergency: { bg: '#FFF8E1', border: '#FFB627', icon: '#F57C00' },
            governance: { bg: '#E3F2FD', border: '#2D7A4F', icon: '#1E5A8E' }
          };

          const colors = categoryColors[worker.category];

          return (
            <Card 
              key={worker.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow border-l-4"
              style={{ borderLeftColor: colors.border }}
            >
              <CardContent className="p-4" style={{ backgroundColor: colors.bg }}>
                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <Avatar className="w-16 h-16 border-2" style={{ borderColor: colors.border }}>
                    <AvatarImage 
                      src={`https://source.unsplash.com/100x100/?${worker.photo}`} 
                      alt={worker.name} 
                    />
                    <AvatarFallback>{worker.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4 className="text-base">{worker.name}</h4>
                        <p className="text-sm text-muted-foreground">{worker.nameMl}</p>
                      </div>
                      {worker.available && (
                        <Badge className="bg-[#2D7A4F] text-white">Available</Badge>
                      )}
                    </div>

                    <div className="space-y-2 mt-2">
                      <div className="text-sm">
                        <span className="font-medium">{worker.role}</span>
                        <span className="text-muted-foreground ml-2">({worker.roleMl})</span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {worker.ward}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {worker.responseTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[#FFB627]" style={{ color: '#FFB627' }} />
                          {worker.rating}
                        </div>
                      </div>
                    </div>

                    {/* Call Button */}
                    <Button
                      onClick={() => handleCall(worker.phone, worker.name)}
                      className="w-full mt-3"
                      style={{ 
                        backgroundColor: colors.icon,
                        color: 'white'
                      }}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now - {worker.phone}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card style={{ backgroundColor: '#E8F4F8' }}>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Button className="bg-[#2D5016] hover:bg-[#2D5016]/90 h-auto py-4 flex-col gap-2">
              <Heart className="w-6 h-6" />
              <span>Request Home Visit</span>
              <span className="text-xs opacity-80">വീട്ടു സന്ദർശനം</span>
            </Button>
            <Button className="bg-[#FFB627] hover:bg-[#FFB627]/90 text-foreground h-auto py-4 flex-col gap-2">
              <Ambulance className="w-6 h-6" />
              <span>Emergency Ambulance</span>
              <span className="text-xs opacity-80">അടിയന്തിര</span>
            </Button>
            <Button className="bg-[#8B9D83] hover:bg-[#8B9D83]/90 h-auto py-4 flex-col gap-2">
              <Users className="w-6 h-6" />
              <span>Medical Chat</span>
              <span className="text-xs opacity-80">ചാറ്റ്</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
