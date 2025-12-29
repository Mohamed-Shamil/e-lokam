import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Phone, CheckCircle2, Clock, AlertCircle, TrendingUp, Users, Award, MessageSquare } from 'lucide-react';

interface Grievance {
  id: string;
  title: string;
  titleMl: string;
  category: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  reportedBy: string;
  reportedAt: string;
  phone: string;
}

const mockGrievances: Grievance[] = [
  {
    id: 'GRV-2024-1234',
    title: 'Broken Water Pipe',
    titleMl: 'കേടായ ജല പൈപ്പ്',
    category: 'Water',
    location: 'Ward 5, MG Road',
    status: 'pending',
    priority: 'high',
    reportedBy: 'Rajesh Kumar',
    reportedAt: '2 hours ago',
    phone: '+91 98765 43210'
  },
  {
    id: 'GRV-2024-1235',
    title: 'Street Light Not Working',
    titleMl: 'തെരുവ് വിളക്ക് പ്രവർത്തിക്കുന്നില്ല',
    category: 'Electricity',
    location: 'Ward 5, Temple Road',
    status: 'in-progress',
    priority: 'medium',
    reportedBy: 'Sreelatha Menon',
    reportedAt: '5 hours ago',
    phone: '+91 98765 43211'
  },
  {
    id: 'GRV-2024-1236',
    title: 'Road Pothole',
    titleMl: 'റോഡ് കുഴി',
    category: 'Roads',
    location: 'Ward 5, Station Road',
    status: 'pending',
    priority: 'medium',
    reportedBy: 'Anil George',
    reportedAt: '1 day ago',
    phone: '+91 98765 43212'
  }
];

export function LeaderDashboard() {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="space-y-6">
      {/* Header with Rank */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2>Ward Member Dashboard</h2>
              <p className="text-white/90 mt-1">വാർഡ് മെമ്പർ ഡാഷ്‌ബോർഡ്</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                <Award className="w-5 h-5" />
                <div>
                  <div className="text-sm text-white/80">Panchayat Rank</div>
                  <div className="text-2xl">#2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-[#d4183d]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                <p className="text-2xl mt-1">7</p>
                <p className="text-xs text-muted-foreground mt-1">പെൻഡിംഗ്</p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#d4183d]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#F59E0B]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl mt-1">12</p>
                <p className="text-xs text-muted-foreground mt-1">പുരോഗമിക്കുന്നു</p>
              </div>
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#F59E0B]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#2D7A4F]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl mt-1">156</p>
                <p className="text-xs text-muted-foreground mt-1">പരിഹരിച്ചു</p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#2D7A4F]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#1E5A8E]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
                <p className="text-2xl mt-1">94%</p>
                <p className="text-xs text-muted-foreground mt-1">സംതൃപ്തി</p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#1E5A8E]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white">
              <MessageSquare className="w-4 h-4 mr-2" />
              Broadcast to WhatsApp
            </Button>
            <Button variant="outline" className="border-[#1E5A8E] text-[#1E5A8E]">
              <Users className="w-4 h-4 mr-2" />
              Send Personal Alert
            </Button>
            <Button variant="outline">
              <Award className="w-4 h-4 mr-2" />
              View Rankings
            </Button>
            <Button variant="outline">
              <TrendingUp className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Task Manager */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Grievances</CardTitle>
            <Badge variant="secondary">
              {mockGrievances.filter(g => g.status === 'pending').length} Pending
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockGrievances.map((grievance) => (
              <div
                key={grievance.id}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-base">{grievance.title}</h4>
                      <Badge
                        variant={grievance.priority === 'high' ? 'destructive' : 'secondary'}
                        className={grievance.priority === 'high' ? '' : 'bg-muted'}
                      >
                        {grievance.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{grievance.titleMl}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      grievance.status === 'resolved'
                        ? 'bg-green-50 text-green-700 border-green-200'
                        : grievance.status === 'in-progress'
                        ? 'bg-orange-50 text-orange-700 border-orange-200'
                        : 'bg-red-50 text-red-700 border-red-200'
                    }
                  >
                    {grievance.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">ID:</span> {grievance.id}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category:</span> {grievance.category}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span> {grievance.location}
                  </div>
                  <div>
                    <span className="text-muted-foreground">Reported:</span> {grievance.reportedAt}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Reported by:</span> {grievance.reportedBy}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCall(grievance.phone)}
                      className="border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[#1E5A8E] text-[#1E5A8E]"
                    >
                      Assign
                    </Button>
                    <Button
                      size="sm"
                      className="bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
