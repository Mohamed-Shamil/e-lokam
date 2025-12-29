import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  Plus, 
  Clock,
  Users,
  MapPin,
  Edit,
  Trash2,
  FileText
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';

interface Meeting {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  date: string;
  time: string;
  location: string;
  locationMl: string;
  attendees: string[];
  agenda: string[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  minutes?: string;
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Monthly Ward Meeting',
    titleMl: 'മാസിക വാർഡ് മീറ്റിംഗ്',
    description: 'Monthly ward meeting to discuss community issues and development plans',
    descriptionMl: 'സമൂഹ പ്രശ്നങ്ങളും വികസന പദ്ധതികളും ചർച്ച ചെയ്യുന്നതിനുള്ള മാസിക വാർഡ് മീറ്റിംഗ്',
    date: '2024-12-30',
    time: '18:00',
    location: 'Community Hall, Ward 5',
    locationMl: 'കമ്മ്യൂണിറ്റി ഹാൾ, വാർഡ് 5',
    attendees: ['Rajesh Kumar', 'Sreelatha Menon', 'Anil George'],
    agenda: ['Water supply issues', 'Road maintenance', 'Waste management'],
    status: 'scheduled'
  }
];

export function MeetingManagement() {
  const { t } = useLanguage();
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    titleMl: '',
    description: '',
    descriptionMl: '',
    date: '',
    time: '',
    location: '',
    locationMl: '',
    agenda: '',
    attendees: ''
  });

  const handleSubmit = () => {
    if (editingId) {
      setMeetings(prev => prev.map(m => 
        m.id === editingId 
          ? { 
              ...m, 
              ...formData,
              attendees: formData.attendees.split(',').map(a => a.trim()).filter(Boolean),
              agenda: formData.agenda.split(',').map(a => a.trim()).filter(Boolean)
            }
          : m
      ));
    } else {
      const newMeeting: Meeting = {
        id: Date.now().toString(),
        ...formData,
        attendees: formData.attendees.split(',').map(a => a.trim()).filter(Boolean),
        agenda: formData.agenda.split(',').map(a => a.trim()).filter(Boolean),
        status: 'scheduled'
      };
      setMeetings(prev => [newMeeting, ...prev]);
    }
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({
      title: '',
      titleMl: '',
      description: '',
      descriptionMl: '',
      date: '',
      time: '',
      location: '',
      locationMl: '',
      agenda: '',
      attendees: ''
    });
  };

  const handleStatusChange = (id: string, newStatus: Meeting['status']) => {
    setMeetings(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
  };

  const handleDelete = (id: string) => {
    if (confirm(t('Are you sure you want to delete this meeting?', 'ഈ മീറ്റിംഗ് ഇല്ലാതാക്കാൻ നിങ്ങൾക്ക് ഉറപ്പാണോ?'))) {
      setMeetings(prev => prev.filter(m => m.id !== id));
    }
  };

  const getStatusColor = (status: Meeting['status']) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'ongoing':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className="overflow-hidden border-0 shadow-lg rounded-xl p-6 text-white"
        style={{
          background: 'linear-gradient(135deg, #2D5016 0%, #A8D5A5 100%)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{t('Meeting Management', 'മീറ്റിംഗ് മാനേജ്മെന്റ്')}</h2>
            <p className="text-white/90 mt-1">{t('Schedule and manage ward meetings', 'വാർഡ് മീറ്റിംഗുകൾ ഷെഡ്യൂൾ ചെയ്യുകയും നിയന്ത്രിക്കുകയും ചെയ്യുക')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white/20 hover:bg-white/30 text-white">
                <Plus className="w-4 h-4 mr-2" />
                {t('Schedule Meeting', 'മീറ്റിംഗ് ഷെഡ്യൂൾ ചെയ്യുക')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? t('Edit Meeting', 'മീറ്റിംഗ് എഡിറ്റ് ചെയ്യുക') : t('Schedule Meeting', 'മീറ്റിംഗ് ഷെഡ്യൂൾ ചെയ്യുക')}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t('Title (English)', 'തലക്കെട്ട് (ഇംഗ്ലീഷ്)')}</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('Title (Malayalam)', 'തലക്കെട്ട് (മലയാളം)')}</Label>
                  <Input
                    value={formData.titleMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleMl: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('Description (English)', 'വിവരണം (ഇംഗ്ലീഷ്)')}</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>{t('Description (Malayalam)', 'വിവരണം (മലയാളം)')}</Label>
                  <Textarea
                    value={formData.descriptionMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, descriptionMl: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('Date', 'തീയതി')}</Label>
                    <Input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>{t('Time', 'സമയം')}</Label>
                    <Input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>{t('Location (English)', 'സ്ഥലം (ഇംഗ്ലീഷ്)')}</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('Location (Malayalam)', 'സ്ഥലം (മലയാളം)')}</Label>
                  <Input
                    value={formData.locationMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, locationMl: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('Agenda (comma separated)', 'അജണ്ട (കോമയാൽ വേർതിരിച്ചത്)')}</Label>
                  <Textarea
                    value={formData.agenda}
                    onChange={(e) => setFormData(prev => ({ ...prev, agenda: e.target.value }))}
                    placeholder="Item 1, Item 2, Item 3"
                    rows={3}
                  />
                </div>
                <div>
                  <Label>{t('Attendees (comma separated)', 'പങ്കെടുക്കുന്നവർ (കോമയാൽ വേർതിരിച്ചത്)')}</Label>
                  <Textarea
                    value={formData.attendees}
                    onChange={(e) => setFormData(prev => ({ ...prev, attendees: e.target.value }))}
                    placeholder="Name 1, Name 2, Name 3"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t('Cancel', 'റദ്ദാക്കുക')}
                  </Button>
                  <Button onClick={handleSubmit} className="bg-[#2D5016] hover:bg-[#1B3D0F]">
                    {editingId ? t('Update', 'അപ്ഡേറ്റ്') : t('Schedule', 'ഷെഡ്യൂൾ')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Meetings List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            {t('Scheduled Meetings', 'ഷെഡ്യൂൾ ചെയ്ത മീറ്റിംഗുകൾ')} ({meetings.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {meetings.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('No meetings scheduled', 'ഷെഡ്യൂൾ ചെയ്ത മീറ്റിംഗുകളൊന്നുമില്ല')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold">{t(meeting.title, meeting.titleMl)}</h4>
                          <Badge className={getStatusColor(meeting.status)}>
                            {t(meeting.status, meeting.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {t(meeting.description, meeting.descriptionMl)}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t('Date', 'തീയതി')}:</span>
                            <span>{meeting.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t('Time', 'സമയം')}:</span>
                            <span>{meeting.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t('Location', 'സ്ഥലം')}:</span>
                            <span>{t(meeting.location, meeting.locationMl)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t('Attendees', 'പങ്കെടുക്കുന്നവർ')}:</span>
                            <span>{meeting.attendees.length}</span>
                          </div>
                        </div>
                        {meeting.agenda.length > 0 && (
                          <div className="mt-3">
                            <h5 className="text-sm font-semibold mb-1">{t('Agenda', 'അജണ്ട')}:</h5>
                            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                              {meeting.agenda.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={meeting.status}
                          onChange={(e) => handleStatusChange(meeting.id, e.target.value as Meeting['status'])}
                          className="p-2 border rounded-md text-sm"
                        >
                          <option value="scheduled">{t('Scheduled', 'ഷെഡ്യൂൾ')}</option>
                          <option value="ongoing">{t('Ongoing', 'നടക്കുന്നു')}</option>
                          <option value="completed">{t('Completed', 'പൂർത്തിയാക്കി')}</option>
                          <option value="cancelled">{t('Cancelled', 'റദ്ദാക്കി')}</option>
                        </select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(meeting.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

