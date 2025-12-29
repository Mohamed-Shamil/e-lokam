import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Heart, CheckCircle2, Clock, Pill, User, Phone, MapPin, TrendingUp } from 'lucide-react';

interface ParentProfile {
  name: string;
  nameMl: string;
  age: number;
  bloodGroup: string;
  conditions: string[];
  photo: string;
  location: string;
}

interface MedicalVisit {
  id: string;
  date: string;
  time: string;
  workerName: string;
  workerRole: string;
  type: 'checkup' | 'medicine' | 'emergency';
  status: 'completed' | 'scheduled' | 'cancelled';
  notes: string;
  vitals?: {
    bp?: string;
    sugar?: string;
    temperature?: string;
  };
}

const parentProfile: ParentProfile = {
  name: 'Krishna Kumar',
  nameMl: 'കൃഷ്ണ കുമാർ',
  age: 72,
  bloodGroup: 'O+',
  conditions: ['Diabetes Type 2', 'Hypertension'],
  photo: 'elderly man',
  location: 'Ward 5, MG Road, Kochi'
};

const medicalVisits: MedicalVisit[] = [
  {
    id: '1',
    date: 'Dec 27, 2024',
    time: '10:30 AM',
    workerName: 'Suma Krishna',
    workerRole: 'ASHA Worker',
    type: 'checkup',
    status: 'completed',
    notes: 'Regular health checkup completed. Father is in stable condition.',
    vitals: {
      bp: '130/85',
      sugar: '145 mg/dL',
      temperature: '98.2°F'
    }
  },
  {
    id: '2',
    date: 'Dec 24, 2024',
    time: '3:00 PM',
    workerName: 'Dr. Lakshmi Menon',
    workerRole: 'Palliative Nurse',
    type: 'medicine',
    status: 'completed',
    notes: 'Monthly medication delivered. All prescriptions refilled for 30 days.'
  },
  {
    id: '3',
    date: 'Dec 29, 2024',
    time: '11:00 AM',
    workerName: 'Suma Krishna',
    workerRole: 'ASHA Worker',
    type: 'checkup',
    status: 'scheduled',
    notes: 'Scheduled for routine blood pressure and sugar level check.'
  }
];

interface WardHealthRanking {
  wardName: string;
  rank: number;
  score: number;
  elderCareScore: number;
}

const wardRankings: WardHealthRanking[] = [
  { wardName: 'Ward 3, Kochi Central', rank: 1, score: 96, elderCareScore: 98 },
  { wardName: 'Ward 5, MG Road', rank: 2, score: 94, elderCareScore: 95 },
  { wardName: 'Ward 1, Marine Drive', rank: 3, score: 92, elderCareScore: 93 },
];

export function PravasiParentTracker() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div 
          className="p-6 text-white relative"
          style={{
            background: 'linear-gradient(135deg, #2D5016 0%, #8B9D83 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 16.569-13.431 30-30 30h30V0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-8 h-8" />
              <div>
                <h2>Parent Care Dashboard</h2>
                <p className="text-white/90">മാതാപിതാക്കളുടെ പരിചരണം</p>
              </div>
            </div>
            <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              Monitoring from UAE
            </Badge>
          </div>
        </div>
      </Card>

      {/* Parent Profile Card */}
      <Card className="border-l-4" style={{ borderLeftColor: '#2D5016', backgroundColor: '#F0F8EF' }}>
        <CardHeader>
          <CardTitle>Parent Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-4">
            <Avatar className="w-20 h-20 border-4" style={{ borderColor: '#8B9D83' }}>
              <AvatarImage src={`https://source.unsplash.com/200x200/?${parentProfile.photo}`} />
              <AvatarFallback><User className="w-10 h-10" /></AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3>{parentProfile.name}</h3>
              <p className="text-muted-foreground">{parentProfile.nameMl}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline">Age: {parentProfile.age}</Badge>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  Blood: {parentProfile.bloodGroup}
                </Badge>
                <Badge variant="outline">
                  <MapPin className="w-3 h-3 mr-1" />
                  {parentProfile.location}
                </Badge>
              </div>
              <div className="mt-3">
                <div className="text-sm font-medium mb-2">Chronic Conditions:</div>
                <div className="flex gap-2">
                  {parentProfile.conditions.map((condition, idx) => (
                    <Badge key={idx} style={{ backgroundColor: '#FFB627', color: '#000' }}>
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button className="flex-1 bg-[#2D5016] hover:bg-[#2D5016]/90">
              <Phone className="w-4 h-4 mr-2" />
              Call Parent
            </Button>
            <Button variant="outline" className="flex-1 border-[#8B9D83] text-[#2D5016]">
              <Heart className="w-4 h-4 mr-2" />
              Request Visit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Medical Visit Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Medical Visit Timeline</CardTitle>
          <p className="text-sm text-muted-foreground">മെഡിക്കൽ സന്ദർശന ടൈംലൈൻ</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 relative">
            {/* Timeline Line */}
            <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-[#A8D5A5]" />

            {medicalVisits.map((visit, index) => {
              const typeColors = {
                checkup: { bg: '#E8F5E9', border: '#8B9D83', icon: '#2D5016' },
                medicine: { bg: '#FFF8E1', border: '#FFB627', icon: '#F57C00' },
                emergency: { bg: '#FFEBEE', border: '#d4183d', icon: '#d4183d' }
              };

              const colors = typeColors[visit.type];
              const statusIcons = {
                completed: CheckCircle2,
                scheduled: Clock,
                cancelled: Clock
              };

              const StatusIcon = statusIcons[visit.status];

              return (
                <div key={visit.id} className="relative pl-16">
                  {/* Timeline Dot */}
                  <div 
                    className="absolute left-[19px] w-5 h-5 rounded-full border-4 bg-white z-10"
                    style={{ borderColor: colors.border }}
                  />

                  <Card 
                    className="border-l-4 hover:shadow-md transition-shadow"
                    style={{ borderLeftColor: colors.border, backgroundColor: colors.bg }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-base">{visit.workerName}</h4>
                            <Badge 
                              variant="outline"
                              className={
                                visit.status === 'completed'
                                  ? 'bg-green-50 text-green-700 border-green-200'
                                  : visit.status === 'scheduled'
                                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                                  : 'bg-gray-50 text-gray-700 border-gray-200'
                              }
                            >
                              <StatusIcon className="w-3 h-3 mr-1" />
                              {visit.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{visit.workerRole}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">{visit.date}</div>
                          <div className="text-sm text-muted-foreground">{visit.time}</div>
                        </div>
                      </div>

                      <p className="text-sm mt-3">{visit.notes}</p>

                      {visit.vitals && (
                        <div className="grid grid-cols-3 gap-3 mt-3 p-3 bg-white/50 rounded-lg">
                          {visit.vitals.bp && (
                            <div>
                              <div className="text-xs text-muted-foreground">Blood Pressure</div>
                              <div className="text-sm font-medium">{visit.vitals.bp}</div>
                            </div>
                          )}
                          {visit.vitals.sugar && (
                            <div>
                              <div className="text-xs text-muted-foreground">Blood Sugar</div>
                              <div className="text-sm font-medium">{visit.vitals.sugar}</div>
                            </div>
                          )}
                          {visit.vitals.temperature && (
                            <div>
                              <div className="text-xs text-muted-foreground">Temperature</div>
                              <div className="text-sm font-medium">{visit.vitals.temperature}</div>
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Global Health Ranking */}
      <Card>
        <CardHeader>
          <CardTitle>Ward Elderly Care Rankings</CardTitle>
          <p className="text-sm text-muted-foreground">വാർഡ് മുതിർന്നവരുടെ പരിചരണ റാങ്കിംഗ്</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {wardRankings.map((ward) => (
              <div
                key={ward.rank}
                className={`p-4 rounded-lg border ${
                  ward.rank === 2 ? 'bg-[#E8F5E9] border-[#8B9D83]' : 'bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold" style={{ color: '#2D5016' }}>
                      #{ward.rank}
                    </div>
                    <div>
                      <h4 className="text-base">{ward.wardName}</h4>
                      {ward.rank === 2 && (
                        <Badge variant="outline" className="mt-1 bg-white/50">
                          Your Parent's Ward
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-lg">
                      <TrendingUp className="w-5 h-5 text-[#2D5016]" />
                      {ward.elderCareScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Elder Care Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: '#E8F4F8' }}>
            <h4>How Rankings Work</h4>
            <p className="text-sm text-muted-foreground mt-2">
              Wards are ranked based on response time, visit frequency, health worker availability, 
              and satisfaction ratings from Pravasi families.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
