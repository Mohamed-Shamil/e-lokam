import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MapPin, Trophy, FileText, Download, TrendingUp, TrendingDown } from 'lucide-react';

interface WardPerformance {
  ward: number;
  wardName: string;
  rank: number;
  pendingTasks: number;
  resolvedTasks: number;
  avgResolutionTime: number;
  satisfaction: number;
  trend: 'up' | 'down' | 'stable';
}

const wardPerformance: WardPerformance[] = [
  { ward: 3, wardName: 'Kochi Central', rank: 1, pendingTasks: 2, resolvedTasks: 89, avgResolutionTime: 2.1, satisfaction: 96, trend: 'up' },
  { ward: 5, wardName: 'MG Road', rank: 2, pendingTasks: 7, resolvedTasks: 156, avgResolutionTime: 2.8, satisfaction: 94, trend: 'up' },
  { ward: 1, wardName: 'Marine Drive', rank: 3, pendingTasks: 5, resolvedTasks: 78, avgResolutionTime: 3.2, satisfaction: 92, trend: 'stable' },
  { ward: 8, wardName: 'Thrikkakara', rank: 4, pendingTasks: 12, resolvedTasks: 124, avgResolutionTime: 4.1, satisfaction: 88, trend: 'down' },
  { ward: 2, wardName: 'Fort Kochi', rank: 5, pendingTasks: 15, resolvedTasks: 98, avgResolutionTime: 4.5, satisfaction: 85, trend: 'down' },
];

interface IncidentPin {
  id: string;
  lat: number;
  lng: number;
  category: string;
  status: 'pending' | 'resolved';
}

const mockIncidents: IncidentPin[] = [
  { id: '1', lat: 9.9312, lng: 76.2673, category: 'Water', status: 'pending' },
  { id: '2', lat: 9.9412, lng: 76.2773, category: 'Electricity', status: 'pending' },
  { id: '3', lat: 9.9212, lng: 76.2573, category: 'Roads', status: 'resolved' },
  { id: '4', lat: 9.9512, lng: 76.2873, category: 'Water', status: 'pending' },
];

export function AdminPortal() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] rounded-xl p-6 text-white">
        <h2>Panchayat Admin Portal</h2>
        <p className="text-white/90 mt-1">പഞ്ചായത്ത് അഡ്മിൻ പോർട്ടൽ</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl">8</div>
            <div className="text-sm text-white/80">Total Wards</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl">48</div>
            <div className="text-sm text-white/80">Active Issues</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl">623</div>
            <div className="text-sm text-white/80">Total Resolved</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl">92%</div>
            <div className="text-sm text-white/80">Avg Satisfaction</div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="map" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map" className="gap-2">
            <MapPin className="w-4 h-4" />
            Geospatial Map
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="gap-2">
            <Trophy className="w-4 h-4" />
            Ward Rankings
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <FileText className="w-4 h-4" />
            Vikasana Rekha
          </TabsTrigger>
        </TabsList>

        {/* Geospatial Heatmap */}
        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Incident Heatmap</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                    Pending ({mockIncidents.filter(i => i.status === 'pending').length})
                  </Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Resolved ({mockIncidents.filter(i => i.status === 'resolved').length})
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.2573%2C9.9212%2C76.2873%2C9.9512&layer=mapnik"
                  className="w-full h-full"
                  title="Incident Map"
                />
                {/* Incident Pins Overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {mockIncidents.map((incident, idx) => (
                    <div
                      key={incident.id}
                      className="absolute"
                      style={{
                        left: `${25 + idx * 15}%`,
                        top: `${30 + idx * 10}%`,
                      }}
                    >
                      <div className={`w-4 h-4 rounded-full ${
                        incident.status === 'pending' ? 'bg-red-500' : 'bg-green-500'
                      } animate-pulse shadow-lg`} />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button variant="outline" size="sm" className="text-[#1E5A8E]">
                  Filter by Category
                </Button>
                <Button variant="outline" size="sm" className="text-[#1E5A8E]">
                  Filter by Ward
                </Button>
                <Button variant="outline" size="sm" className="text-[#1E5A8E]">
                  Time Range
                </Button>
                <Button variant="outline" size="sm" className="text-[#2D7A4F]">
                  Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leaderboard */}
        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ward Performance Rankings</CardTitle>
              <p className="text-sm text-muted-foreground">വാർഡ് പ്രകടന റാങ്കിംഗ്</p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rank</TableHead>
                    <TableHead>Ward</TableHead>
                    <TableHead className="text-right">Pending</TableHead>
                    <TableHead className="text-right">Resolved</TableHead>
                    <TableHead className="text-right">Avg Time (days)</TableHead>
                    <TableHead className="text-right">Satisfaction</TableHead>
                    <TableHead className="text-right">Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wardPerformance.map((ward) => (
                    <TableRow key={ward.ward}>
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {ward.rank === 1 && <Trophy className="w-5 h-5 text-yellow-500" />}
                          {ward.rank === 2 && <Trophy className="w-5 h-5 text-gray-400" />}
                          {ward.rank === 3 && <Trophy className="w-5 h-5 text-orange-600" />}
                          {ward.rank > 3 && <span className="text-muted-foreground">#{ward.rank}</span>}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>Ward {ward.ward}</div>
                          <div className="text-sm text-muted-foreground">{ward.wardName}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {ward.pendingTasks}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {ward.resolvedTasks}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{ward.avgResolutionTime}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-1">
                          <span>{ward.satisfaction}%</span>
                          <div className={`w-2 h-2 rounded-full ${
                            ward.satisfaction >= 90 ? 'bg-green-500' : 'bg-orange-500'
                          }`} />
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {ward.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600 ml-auto" />}
                        {ward.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600 ml-auto" />}
                        {ward.trend === 'stable' && <div className="w-5 h-0.5 bg-gray-400 ml-auto" />}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Document Generator */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vikasana Rekha - 5 Year Development Report</CardTitle>
              <p className="text-sm text-muted-foreground">വികസന രേഖ - 5 വർഷത്തെ വികസന റിപ്പോർട്ട്</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Report Preview */}
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <div className="text-center mb-6">
                  <h3 className="text-xl">Panchayat Development Report</h3>
                  <p className="text-muted-foreground">January 2020 - December 2024</p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                    <div className="text-center">
                      <div className="text-2xl text-[#2D7A4F]">248</div>
                      <div className="text-sm text-muted-foreground">Infrastructure Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-[#1E5A8E]">1,234</div>
                      <div className="text-sm text-muted-foreground">Grievances Resolved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-[#2D7A4F]">₹12.4 Cr</div>
                      <div className="text-sm text-muted-foreground">Budget Utilized</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border-l-4 border-l-[#2D7A4F] bg-green-50">
                      <div>
                        <div>Water & Sanitation</div>
                        <div className="text-sm text-muted-foreground">56 projects completed</div>
                      </div>
                      <Badge className="bg-[#2D7A4F]">23%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border-l-4 border-l-[#1E5A8E] bg-blue-50">
                      <div>
                        <div>Road Infrastructure</div>
                        <div className="text-sm text-muted-foreground">89 km renovated</div>
                      </div>
                      <Badge className="bg-[#1E5A8E]">36%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border-l-4 border-l-[#52B788] bg-green-50">
                      <div>
                        <div>Education & Health</div>
                        <div className="text-sm text-muted-foreground">12 facilities upgraded</div>
                      </div>
                      <Badge style={{ backgroundColor: '#52B788' }}>18%</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF Report
                </Button>
                <Button variant="outline" className="flex-1 border-[#1E5A8E] text-[#1E5A8E]">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Custom Report
                </Button>
              </div>

              <div className="text-sm text-muted-foreground text-center">
                Report automatically generated from system data • Last updated: Dec 27, 2025
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
