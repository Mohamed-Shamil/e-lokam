import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Globe, MapPin, Phone, Heart, TrendingUp, Clock } from 'lucide-react';
import { useState } from 'react';
import { PravasiParentTracker } from './pravasi-parent-tracker';

interface ParentRequest {
  id: string;
  type: string;
  description: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  submittedAt: string;
}

const mockParentRequests: ParentRequest[] = [
  {
    id: 'PR-2024-001',
    type: 'Medical',
    description: 'Regular health checkup for elderly parents',
    location: 'Ward 5, MG Road',
    status: 'resolved',
    priority: 'high',
    submittedAt: '3 days ago'
  },
  {
    id: 'PR-2024-002',
    type: 'Maintenance',
    description: 'Water connection repair at home',
    location: 'Ward 5, MG Road',
    status: 'in-progress',
    priority: 'medium',
    submittedAt: '1 day ago'
  }
];

interface GlobalRanking {
  panchayat: string;
  district: string;
  state: string;
  rank: number;
  score: number;
  pravasiEngagement: number;
}

const globalRankings: GlobalRanking[] = [
  { panchayat: 'Kochi Municipal', district: 'Ernakulam', state: 'Kerala', rank: 1, score: 96, pravasiEngagement: 248 },
  { panchayat: 'Thiruvananthapuram', district: 'TVM', state: 'Kerala', rank: 2, score: 94, pravasiEngagement: 198 },
  { panchayat: 'Kozhikode', district: 'Kozhikode', state: 'Kerala', rank: 3, score: 92, pravasiEngagement: 176 },
  { panchayat: 'Thrissur', district: 'Thrissur', state: 'Kerala', rank: 4, score: 89, pravasiEngagement: 142 },
];

export function PravasiMirror() {
  const [pravasiView, setPravasiView] = useState(true);

  return (
    <div className="space-y-6">
      {/* Header with View Toggle */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6" />
                <h2>Pravasi Dashboard</h2>
              </div>
              <p className="text-white/90 mt-1">പ്രവാസി ഡാഷ്‌ബോർഡ്</p>
            </div>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              Connected from UAE
            </Badge>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-3">
            <Label htmlFor="pravasi-toggle" className="text-white cursor-pointer">
              Switch to {pravasiView ? 'Standard' : 'Pravasi'} View
            </Label>
            <Switch
              id="pravasi-toggle"
              checked={pravasiView}
              onCheckedChange={setPravasiView}
              className="data-[state=checked]:bg-white"
            />
          </div>
        </div>
      </Card>

      {pravasiView && (
        <>
          {/* Parent-Related Quick Stats */}
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
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
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

          {/* Parent-Related Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Parent-Related Services</CardTitle>
              <p className="text-sm text-muted-foreground">മാതാപിതാക്കളുമായി ബന്ധപ്പെട്ട സേവനങ്ങൾ</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockParentRequests.map((request) => (
                  <div
                    key={request.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base">{request.type}</h4>
                          <Badge
                            variant={request.priority === 'high' ? 'destructive' : 'secondary'}
                          >
                            {request.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{request.description}</p>
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

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {request.location}
                        </div>
                        <div>{request.submittedAt}</div>
                      </div>
                      <Button size="sm" variant="outline" className="border-[#2D7A4F] text-[#2D7A4F]">
                        <Phone className="w-4 h-4 mr-1" />
                        Contact Ward Member
                      </Button>
                    </div>
                  </div>
                ))}

                <Button className="w-full bg-[#2D7A4F] hover:bg-[#1B4D3E]">
                  Submit New Parent Care Request
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Global Ward Rankings */}
          <Card>
            <CardHeader>
              <CardTitle>Global Panchayat Rankings</CardTitle>
              <p className="text-sm text-muted-foreground">ആഗോള പഞ്ചായത്ത് റാങ്കിംഗുകൾ</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {globalRankings.map((ranking) => (
                  <div
                    key={ranking.rank}
                    className={`p-4 rounded-lg border ${
                      ranking.rank === 1 ? 'bg-yellow-50 border-yellow-200' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-[#2D7A4F]">#{ranking.rank}</div>
                        <div>
                          <h4 className="text-base">{ranking.panchayat}</h4>
                          <p className="text-sm text-muted-foreground">
                            {ranking.district}, {ranking.state}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg">Score: {ranking.score}</div>
                        <div className="text-sm text-muted-foreground">
                          {ranking.pravasiEngagement} Pravasi engaged
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-[#B7E4C7] to-[#D8E2DC] rounded-lg">
                <h4>Your Contribution</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your engagement helps improve your home ward's ranking. Keep monitoring and requesting services!
                </p>
                <div className="flex gap-2 mt-3">
                  <Button size="sm" className="bg-[#2D7A4F] hover:bg-[#1B4D3E]">
                    Invite Other Pravasis
                  </Button>
                  <Button size="sm" variant="outline">
                    Share Progress
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {!pravasiView && (
        <Card>
          <CardContent className="p-12 text-center">
            <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3>Standard Citizen View</h3>
            <p className="text-muted-foreground mt-2">
              Switch to Pravasi View to see parent-related services and global rankings
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}