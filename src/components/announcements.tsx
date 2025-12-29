import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  Megaphone, 
  Plus, 
  Calendar,
  Users,
  Edit,
  Trash2,
  Bell
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

interface Announcement {
  id: string;
  title: string;
  titleMl: string;
  content: string;
  contentMl: string;
  category: 'general' | 'meeting' | 'event' | 'important';
  targetAudience: 'all' | 'ward' | 'specific';
  createdAt: string;
  scheduledFor?: string;
  isPublished: boolean;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'Ward Meeting Scheduled',
    titleMl: 'വാർഡ് മീറ്റിംഗ് ഷെഡ്യൂൾ ചെയ്തു',
    content: 'Monthly ward meeting will be held on 30th December at 6 PM in the community hall.',
    contentMl: 'മാസിക വാർഡ് മീറ്റിംഗ് ഡിസംബർ 30 ന് വൈകുന്നേരം 6 മണിക്ക് കമ്മ്യൂണിറ്റി ഹാളിൽ നടത്തും.',
    category: 'meeting',
    targetAudience: 'ward',
    createdAt: '2 days ago',
    scheduledFor: '2024-12-30 18:00',
    isPublished: true
  },
  {
    id: '2',
    title: 'Water Supply Interruption',
    titleMl: 'ജലവിതരണം തടസ്സപ്പെട്ടു',
    content: 'Water supply will be interrupted on 28th December from 9 AM to 3 PM for maintenance work.',
    contentMl: 'റഫ്രിച്ചറി പണികൾക്കായി ഡിസംബർ 28 ന് രാവിലെ 9 മുതൽ വൈകുന്നേരം 3 വരെ ജലവിതരണം തടസ്സപ്പെടും.',
    category: 'important',
    targetAudience: 'ward',
    createdAt: '1 day ago',
    isPublished: true
  }
];

export function Announcements() {
  const { t } = useLanguage();
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    titleMl: '',
    content: '',
    contentMl: '',
    category: 'general' as Announcement['category'],
    targetAudience: 'ward' as Announcement['targetAudience'],
    scheduledFor: ''
  });

  const handleSubmit = () => {
    if (editingId) {
      setAnnouncements(prev => prev.map(a => 
        a.id === editingId 
          ? { ...a, ...formData, createdAt: a.createdAt }
          : a
      ));
    } else {
      const newAnnouncement: Announcement = {
        id: Date.now().toString(),
        ...formData,
        createdAt: 'Just now',
        isPublished: true
      };
      setAnnouncements(prev => [newAnnouncement, ...prev]);
    }
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({
      title: '',
      titleMl: '',
      content: '',
      contentMl: '',
      category: 'general',
      targetAudience: 'ward',
      scheduledFor: ''
    });
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setFormData({
      title: announcement.title,
      titleMl: announcement.titleMl,
      content: announcement.content,
      contentMl: announcement.contentMl,
      category: announcement.category,
      targetAudience: announcement.targetAudience,
      scheduledFor: announcement.scheduledFor || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm(t('Are you sure you want to delete this announcement?', 'ഈ അറിയിപ്പ് ഇല്ലാതാക്കാൻ നിങ്ങൾക്ക് ഉറപ്പാണോ?'))) {
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    }
  };

  const getCategoryColor = (category: Announcement['category']) => {
    switch (category) {
      case 'important':
        return 'bg-red-100 text-red-800';
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'event':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            <h2 className="text-2xl font-semibold">{t('Announcements', 'അറിയിപ്പുകൾ')}</h2>
            <p className="text-white/90 mt-1">{t('Create and manage ward announcements', 'വാർഡ് അറിയിപ്പുകൾ സൃഷ്ടിക്കുകയും നിയന്ത്രിക്കുകയും ചെയ്യുക')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white/20 hover:bg-white/30 text-white">
                <Plus className="w-4 h-4 mr-2" />
                {t('New Announcement', 'പുതിയ അറിയിപ്പ്')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? t('Edit Announcement', 'അറിയിപ്പ് എഡിറ്റ് ചെയ്യുക') : t('Create Announcement', 'അറിയിപ്പ് സൃഷ്ടിക്കുക')}
                </DialogTitle>
                <DialogDescription>
                  {t('Share important information with ward members', 'വാർഡ് അംഗങ്ങളുമായി പ്രധാന വിവരങ്ങൾ പങ്കിടുക')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t('Title (English)', 'തലക്കെട്ട് (ഇംഗ്ലീഷ്)')}</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder={t('Enter announcement title', 'അറിയിപ്പ് തലക്കെട്ട് നൽകുക')}
                  />
                </div>
                <div>
                  <Label>{t('Title (Malayalam)', 'തലക്കെട്ട് (മലയാളം)')}</Label>
                  <Input
                    value={formData.titleMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleMl: e.target.value }))}
                    placeholder={t('Enter announcement title in Malayalam', 'മലയാളത്തിൽ അറിയിപ്പ് തലക്കെട്ട് നൽകുക')}
                  />
                </div>
                <div>
                  <Label>{t('Content (English)', 'ഉള്ളടക്കം (ഇംഗ്ലീഷ്)')}</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder={t('Enter announcement content', 'അറിയിപ്പ് ഉള്ളടക്കം നൽകുക')}
                    rows={4}
                  />
                </div>
                <div>
                  <Label>{t('Content (Malayalam)', 'ഉള്ളടക്കം (മലയാളം)')}</Label>
                  <Textarea
                    value={formData.contentMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, contentMl: e.target.value }))}
                    placeholder={t('Enter announcement content in Malayalam', 'മലയാളത്തിൽ അറിയിപ്പ് ഉള്ളടക്കം നൽകുക')}
                    rows={4}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('Category', 'വിഭാഗം')}</Label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="general">{t('General', 'പൊതു')}</option>
                      <option value="meeting">{t('Meeting', 'മീറ്റിംഗ്')}</option>
                      <option value="event">{t('Event', 'ഇവന്റ്')}</option>
                      <option value="important">{t('Important', 'പ്രധാനം')}</option>
                    </select>
                  </div>
                  <div>
                    <Label>{t('Target Audience', 'ലക്ഷ്യം')}</Label>
                    <select
                      value={formData.targetAudience}
                      onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value as any }))}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="all">{t('All', 'എല്ലാം')}</option>
                      <option value="ward">{t('Ward', 'വാർഡ്')}</option>
                      <option value="specific">{t('Specific', 'നിർദ്ദിഷ്ടം')}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label>{t('Schedule For (Optional)', 'ഷെഡ്യൂൾ (ഓപ്ഷണൽ)')}</Label>
                  <Input
                    type="datetime-local"
                    value={formData.scheduledFor}
                    onChange={(e) => setFormData(prev => ({ ...prev, scheduledFor: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t('Cancel', 'റദ്ദാക്കുക')}
                  </Button>
                  <Button onClick={handleSubmit} className="bg-[#2D5016] hover:bg-[#1B3D0F]">
                    {editingId ? t('Update', 'അപ്ഡേറ്റ്') : t('Publish', 'പ്രസിദ്ധീകരിക്കുക')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Announcements List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="w-5 h-5" />
            {t('Published Announcements', 'പ്രസിദ്ധീകരിച്ച അറിയിപ്പുകൾ')} ({announcements.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('No announcements yet', 'ഇതുവരെ അറിയിപ്പുകളൊന്നുമില്ല')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold">{t(announcement.title, announcement.titleMl)}</h4>
                          <Badge className={getCategoryColor(announcement.category)}>
                            {t(announcement.category, announcement.category)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {t(announcement.content, announcement.contentMl)}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{announcement.createdAt}</span>
                          </div>
                          {announcement.scheduledFor && (
                            <div className="flex items-center gap-1">
                              <Bell className="w-3 h-3" />
                              <span>{t('Scheduled', 'ഷെഡ്യൂൾ')}: {announcement.scheduledFor}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(announcement)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(announcement.id)}
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

