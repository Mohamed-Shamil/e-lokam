import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Globe, Heart, TrendingUp, Clock, Phone, MapPin, User, ArrowRight } from 'lucide-react';

interface PravasiHomeProps {
  onNavigate: (screen: string) => void;
}

interface ParentRequest {
  id: string;
  type: string;
  description: string;
  status: 'pending' | 'in-progress' | 'resolved';
  submittedAt: string;
}

const recentRequests: ParentRequest[] = [
  {
    id: 'PR-2024-001',
    type: 'Medical Checkup',
    description: 'Regular health checkup for elderly parents',
    status: 'resolved',
    submittedAt: '3 days ago'
  },
  {
    id: 'PR-2024-002',
    type: 'Medicine Delivery',
    description: 'Monthly medication refill',
    status: 'in-progress',
    submittedAt: '1 day ago'
  }
];

export function PravasiHome({ onNavigate }: PravasiHomeProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div 
          className="p-6 text-white relative"
          style={{
            background: 'linear-gradient(135deg, #1E5A8E 0%, #4A90D9 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 16.569-13.431 30-30 30h30V0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-8 h-8" />
              <div>
                <h2>Pravasi Dashboard</h2>
                <p className="text-white/90">പ്രവാസി ഡാഷ്‌ബോർഡ്</p>
              </div>
            </div>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              Connected from UAE
            </Badge>
          </div>
        </div>
      </Card>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
          style={{ borderLeftColor: '#2D5016', backgroundColor: '#F0F8EF' }}
          onClick={() => onNavigate('parent-tracker')}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#8B9D83' }}>
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4>Parent Care Tracker</h4>
                <p className="text-sm text-muted-foreground mt-1">മാതാപിതാക്കളുടെ പരിചരണം</p>
                <p className="text-xs text-muted-foreground mt-2">View medical visits, vitals, and care timeline</p>
                <Button size="sm" className="mt-3 bg-[#2D5016] hover:bg-[#2D5016]/90">
                  View Timeline <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card 
          className="hover:shadow-lg transition-shadow cursor-pointer border-l-4"
          style={{ borderLeftColor: '#1E5A8E' }}
          onClick={() => onNavigate('profile')}
        >
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-[#1E5A8E] rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h4>Parent Profile</h4>
                <p className="text-sm text-muted-foreground mt-1">പ്രൊഫൈൽ സജ്ജീകരണം</p>
                <p className="text-xs text-muted-foreground mt-2">Update parent details, conditions, and contacts</p>
                <Button size="sm" variant="outline" className="mt-3">
                  Manage Profile <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-[#2D7A4F]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Parent Requests</p>
                <p className="text-2xl mt-1">2</p>
                <p className="text-xs text-muted-foreground mt-1">Active</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#2D7A4F]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#1E5A8E]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Home Ward Rank</p>
                <p className="text-2xl mt-1">#2</p>
                <p className="text-xs text-muted-foreground mt-1">Panchayat Level</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#1E5A8E]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#52B788]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response</p>
                <p className="text-2xl mt-1">2.3h</p>
                <p className="text-xs text-muted-foreground mt-1">For urgent requests</p>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B7E4C7' }}>
                <Clock className="w-6 h-6" style={{ color: '#2D7A4F' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Parent Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Parent Care Requests</CardTitle>
            <Button variant="ghost" size="sm" onClick={() => onNavigate('parent-tracker')}>
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentRequests.map((request) => (
              <div
                key={request.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-base">{request.type}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{request.description}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      request.status === 'resolved'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : request.status === 'in-progress'
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>ID: {request.id}</span>
                  <span>•</span>
                  <span>{request.submittedAt}</span>
                </div>
              </div>
            ))}
          </div>

          <Button 
            className="w-full mt-4 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
            onClick={() => onNavigate('parent-tracker')}
          >
            <Heart className="w-4 h-4 mr-2" />
            Submit New Parent Care Request
          </Button>
        </CardContent>
      </Card>

      {/* Parent Info Card */}
      <Card style={{ backgroundColor: '#E8F5E9' }}>
        <CardHeader>
          <CardTitle>Connected Parent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-[#8B9D83] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h4>Krishna Kumar</h4>
              <p className="text-sm text-muted-foreground">കൃഷ്ണ കുമാർ</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline">Age: 72</Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Blood: O+
                </Badge>
              </div>
              <div className="flex gap-2 mt-3">
                <Button size="sm" className="bg-[#2D5016] hover:bg-[#2D5016]/90">
                  <Phone className="w-4 h-4 mr-1" />
                  Call Parent
                </Button>
                <Button size="sm" variant="outline" onClick={() => onNavigate('parent-tracker')}>
                  View Care Timeline
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ward Ranking Info */}
      <Card style={{ backgroundColor: '#E8F4F8' }}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-10 h-10 text-[#1E5A8E] flex-shrink-0" />
            <div>
              <h4>Your Home Ward Performance</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Ward 5 ranks #2 in elderly care efficiency with a 95% satisfaction score
              </p>
              <Button 
                size="sm" 
                variant="outline" 
                className="mt-3"
                onClick={() => onNavigate('parent-tracker')}
              >
                View Global Rankings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
