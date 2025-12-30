import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  Trash2, 
  Calendar, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Truck,
  Recycle,
  Search,
  Plus,
  Phone,
  Mail,
  Image as ImageIcon
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface CollectionSchedule {
  id: string;
  area: string;
  areaMl: string;
  day: string;
  dayMl: string;
  time: string;
  type: 'waste' | 'recyclable' | 'organic';
  frequency: 'daily' | 'weekly' | 'bi-weekly';
  nextCollection: string;
  status: 'active' | 'suspended';
}

interface WasteComplaint {
  id: string;
  type: 'missed-collection' | 'overflowing-bin' | 'illegal-dumping' | 'broken-bin' | 'other';
  typeMl: string;
  location: string;
  locationMl: string;
  description: string;
  descriptionMl: string;
  images?: string[];
  status: 'pending' | 'in-progress' | 'resolved' | 'rejected';
  submittedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface RecyclingCenter {
  id: string;
  name: string;
  nameMl: string;
  address: string;
  addressMl: string;
  phone: string;
  email?: string;
  accepts: string[];
  acceptsMl: string[];
  hours: string;
  location: {
    lat: number;
    lng: number;
  };
}

const mockSchedules: CollectionSchedule[] = [
  {
    id: '1',
    area: 'Ward 5, MG Road',
    areaMl: 'വാർഡ് 5, എംജി റോഡ്',
    day: 'Monday & Thursday',
    dayMl: 'തിങ്കളാഴ്ചയും വ്യാഴാഴ്ചയും',
    time: '7:00 AM - 10:00 AM',
    type: 'waste',
    frequency: 'bi-weekly',
    nextCollection: '2024-02-15',
    status: 'active'
  },
  {
    id: '2',
    area: 'Ward 3, Kochi',
    areaMl: 'വാർഡ് 3, കൊച്ചി',
    day: 'Tuesday & Friday',
    dayMl: 'ചൊവ്വാഴ്ചയും വെള്ളിയാഴ്ചയും',
    time: '8:00 AM - 11:00 AM',
    type: 'recyclable',
    frequency: 'weekly',
    nextCollection: '2024-02-13',
    status: 'active'
  },
  {
    id: '3',
    area: 'Ward 7, Thrissur',
    areaMl: 'വാർഡ് 7, തൃശൂർ',
    day: 'Wednesday & Saturday',
    dayMl: 'ബുധനാഴ്ചയും ശനിയാഴ്ചയും',
    time: '6:00 AM - 9:00 AM',
    type: 'organic',
    frequency: 'weekly',
    nextCollection: '2024-02-14',
    status: 'active'
  }
];

const mockComplaints: WasteComplaint[] = [
  {
    id: 'comp1',
    type: 'missed-collection',
    typeMl: 'ശേഖരണം നഷ്ടപ്പെട്ടു',
    location: 'Ward 5, MG Road, House No. 123',
    locationMl: 'വാർഡ് 5, എംജി റോഡ്, വീട് നമ്പർ 123',
    description: 'Waste collection was missed on Monday. Bin is overflowing.',
    descriptionMl: 'തിങ്കളാഴ്ച ചവർ ശേഖരണം നഷ്ടപ്പെട്ടു. ബിൻ ഓവർഫ്ലോ ആയി.',
    status: 'resolved',
    submittedAt: '2024-02-10',
    resolvedAt: '2024-02-11',
    assignedTo: 'Waste Collection Team A',
    priority: 'high'
  },
  {
    id: 'comp2',
    type: 'illegal-dumping',
    typeMl: 'അനധികൃത ഡംപ്പിംഗ്',
    location: 'Near Park, Ward 3',
    locationMl: 'പാർക്കിന് സമീപം, വാർഡ് 3',
    description: 'Large amount of construction waste dumped illegally near the park.',
    descriptionMl: 'പാർക്കിന് സമീപം വലിയ അളവിൽ നിർമ്മാണ മാലിന്യങ്ങൾ അനധികൃതമായി ഡംപ് ചെയ്തിരിക്കുന്നു.',
    status: 'in-progress',
    submittedAt: '2024-02-12',
    assignedTo: 'Sanitation Team B',
    priority: 'urgent'
  },
  {
    id: 'comp3',
    type: 'broken-bin',
    typeMl: 'തകർന്ന ബിൻ',
    location: 'Street Corner, Ward 7',
    locationMl: 'തെരുവ് മൂല, വാർഡ് 7',
    description: 'Public waste bin is broken and needs replacement.',
    descriptionMl: 'പൊതു മാലിന്യ ബിൻ തകർന്നിരിക്കുന്നു, മാറ്റിസ്ഥാപിക്കേണ്ടതുണ്ട്.',
    status: 'pending',
    submittedAt: '2024-02-13',
    priority: 'medium'
  }
];

const mockRecyclingCenters: RecyclingCenter[] = [
  {
    id: 'rc1',
    name: 'Green Recycling Center',
    nameMl: 'ഗ്രീൻ റീസൈക്ലിംഗ് സെന്റർ',
    address: 'Industrial Area, Ward 5, Ernakulam',
    addressMl: 'വ്യാവസായിക മേഖല, വാർഡ് 5, എറണാകുളം',
    phone: '+91 98765 43260',
    email: 'recycle@greencenter.in',
    accepts: ['Plastic', 'Paper', 'Metal', 'Glass', 'E-waste'],
    acceptsMl: ['പ്ലാസ്റ്റിക്', 'പേപ്പർ', 'മെറ്റൽ', 'ഗ്ലാസ്', 'ഇ-വേസ്റ്റ്'],
    hours: '9:00 AM - 6:00 PM (Mon-Sat)',
    location: { lat: 9.9312, lng: 76.2673 }
  },
  {
    id: 'rc2',
    name: 'Eco Waste Solutions',
    nameMl: 'ഇക്കോ വേസ്റ്റ് സൊല്യൂഷൻസ്',
    address: 'Recycling Park, Ward 3, Kochi',
    addressMl: 'റീസൈക്ലിംഗ് പാർക്ക്, വാർഡ് 3, കൊച്ചി',
    phone: '+91 98765 43261',
    accepts: ['Plastic', 'Paper', 'Cardboard', 'Organic Waste'],
    acceptsMl: ['പ്ലാസ്റ്റിക്', 'പേപ്പർ', 'കാർഡ്ബോർഡ്', 'ജൈവ മാലിന്യം'],
    hours: '8:00 AM - 7:00 PM (Mon-Sat)',
    location: { lat: 9.9312, lng: 76.2673 }
  }
];

export function WasteManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showComplaintDialog, setShowComplaintDialog] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    type: 'missed-collection' as WasteComplaint['type'],
    location: '',
    locationMl: '',
    description: '',
    descriptionMl: '',
    priority: 'medium' as WasteComplaint['priority'],
    images: [] as string[]
  });

  const handleSubmitComplaint = () => {
    if (!newComplaint.location || !newComplaint.description) {
      alert('Please fill in all required fields');
      return;
    }

    // In a real app, this would submit to the backend
    console.log('Complaint submitted:', newComplaint);
    
    // Reset form
    setNewComplaint({
      type: 'missed-collection',
      location: '',
      locationMl: '',
      description: '',
      descriptionMl: '',
      priority: 'medium',
      images: []
    });
    setShowComplaintDialog(false);
  };

  const getStatusColor = (status: WasteComplaint['status']) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority: WasteComplaint['priority']) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredComplaints = mockComplaints.filter(complaint =>
    complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    complaint.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <h2>Waste Management</h2>
          <p className="text-white/90 mt-1">മാലിന്യ മാനേജ്മെന്റ്</p>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="schedule">Collection Schedule</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
          <TabsTrigger value="recycling">Recycling Centers</TabsTrigger>
        </TabsList>

        {/* Collection Schedule Tab */}
        <TabsContent value="schedule" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Waste Collection Schedule</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                ചവർ ശേഖരണ സമയപ്പട്ടിക
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockSchedules.map((schedule) => (
                  <Card key={schedule.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <h4 className="font-semibold">{schedule.area}</h4>
                            <Badge variant="outline" className={
                              schedule.type === 'waste' ? 'bg-gray-100' :
                              schedule.type === 'recyclable' ? 'bg-blue-100' :
                              'bg-green-100'
                            }>
                              {schedule.type === 'waste' ? 'General' :
                               schedule.type === 'recyclable' ? 'Recyclable' :
                               'Organic'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{schedule.areaMl}</p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{schedule.day} / {schedule.dayMl}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{schedule.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Truck className="w-4 h-4 text-muted-foreground" />
                              <span>Next: {schedule.nextCollection}</span>
                            </div>
                          </div>
                        </div>
                        <Badge className={schedule.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
                          {schedule.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Complaints Tab */}
        <TabsContent value="complaints" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Waste Complaints</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    മാലിന്യ പരാതികൾ
                  </p>
                </div>
                <Dialog open={showComplaintDialog} onOpenChange={setShowComplaintDialog}>
                  <DialogTrigger asChild>
                    <Button className="bg-[#2D7A4F] hover:bg-[#1B4D3E]">
                      <Plus className="w-4 h-4 mr-2" />
                      File Complaint
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>File Waste Complaint</DialogTitle>
                      <DialogDescription>Report waste management issues</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Complaint Type *</Label>
                        <Select value={newComplaint.type} onValueChange={(value) => setNewComplaint({ ...newComplaint, type: value as WasteComplaint['type'] })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="missed-collection">Missed Collection / ശേഖരണം നഷ്ടപ്പെട്ടു</SelectItem>
                            <SelectItem value="overflowing-bin">Overflowing Bin / ഓവർഫ്ലോ ബിൻ</SelectItem>
                            <SelectItem value="illegal-dumping">Illegal Dumping / അനധികൃത ഡംപ്പിംഗ്</SelectItem>
                            <SelectItem value="broken-bin">Broken Bin / തകർന്ന ബിൻ</SelectItem>
                            <SelectItem value="other">Other / മറ്റുള്ളവ</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Location (English) *</Label>
                        <Input
                          placeholder="Enter location"
                          value={newComplaint.location}
                          onChange={(e) => setNewComplaint({ ...newComplaint, location: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location (Malayalam) *</Label>
                        <Input
                          placeholder="സ്ഥലം നൽകുക"
                          value={newComplaint.locationMl}
                          onChange={(e) => setNewComplaint({ ...newComplaint, locationMl: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description (English) *</Label>
                        <Textarea
                          placeholder="Describe the issue"
                          value={newComplaint.description}
                          onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description (Malayalam) *</Label>
                        <Textarea
                          placeholder="പ്രശ്നം വിവരിക്കുക"
                          value={newComplaint.descriptionMl}
                          onChange={(e) => setNewComplaint({ ...newComplaint, descriptionMl: e.target.value })}
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select value={newComplaint.priority} onValueChange={(value) => setNewComplaint({ ...newComplaint, priority: value as WasteComplaint['priority'] })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleSubmitComplaint} className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]">
                          <CheckCircle2 className="w-4 h-4 mr-2" />
                          Submit Complaint
                        </Button>
                        <Button variant="outline" onClick={() => setShowComplaintDialog(false)} className="flex-1">
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search complaints... / പരാതികൾ തിരയുക..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {filteredComplaints.map((complaint) => (
                  <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{complaint.typeMl}</h4>
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(complaint.priority)}`} />
                            <Badge className={getStatusColor(complaint.status)}>
                              {complaint.status}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-sm mb-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{complaint.location}</span>
                            </div>
                            <p className="text-muted-foreground">{complaint.description}</p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Submitted: {complaint.submittedAt}
                            {complaint.resolvedAt && ` • Resolved: ${complaint.resolvedAt}`}
                            {complaint.assignedTo && ` • Assigned to: ${complaint.assignedTo}`}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recycling Centers Tab */}
        <TabsContent value="recycling" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recycling Centers</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                റീസൈക്ലിംഗ് സെന്ററുകൾ
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRecyclingCenters.map((center) => (
                  <Card key={center.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Recycle className="w-5 h-5 text-[#2D7A4F]" />
                            <h4 className="font-semibold">{center.name}</h4>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{center.nameMl}</p>
                          <div className="space-y-2 text-sm mb-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{center.address}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">{center.hours}</span>
                            </div>
                            <div className="mt-2">
                              <p className="text-xs font-medium mb-1">Accepts / സ്വീകരിക്കുന്നു:</p>
                              <div className="flex flex-wrap gap-2">
                                {center.accepts.map((item, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {item} / {center.acceptsMl[idx]}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 pt-3 border-t">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.location.href = `tel:${center.phone}`}
                              className="flex-1 border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white text-xs"
                            >
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </Button>
                            {center.email && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.location.href = `mailto:${center.email}`}
                                className="flex-1 text-xs"
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
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

