import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X,
  Filter,
  Trash2
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  titleMl: string;
  message: string;
  messageMl: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Complaint Resolved',
    titleMl: 'പരാതി പരിഹരിച്ചു',
    message: 'Your complaint GRV-2024-1234 has been resolved',
    messageMl: 'നിങ്ങളുടെ പരാതി GRV-2024-1234 പരിഹരിച്ചു',
    timestamp: '2 hours ago',
    read: false,
    actionUrl: '/complaints'
  },
  {
    id: '2',
    type: 'info',
    title: 'Health Visit Scheduled',
    titleMl: 'ആരോഗ്യ സന്ദർശനം ഷെഡ്യൂൾ ചെയ്തു',
    message: 'ASHA worker will visit tomorrow at 10 AM',
    messageMl: 'ആശാ പ്രവർത്തകൻ നാളെ രാവിലെ 10 മണിക്ക് സന്ദർശിക്കും',
    timestamp: '5 hours ago',
    read: false
  },
  {
    id: '3',
    type: 'warning',
    title: 'Payment Pending',
    titleMl: 'പേയ്മെന്റ് പെൻഡിംഗ്',
    message: 'Your service payment is pending. Please complete the payment.',
    messageMl: 'നിങ്ങളുടെ സേവന പേയ്മെന്റ് പെൻഡിംഗ് ആണ്. ദയവായി പേയ്മെന്റ് പൂർത്തിയാക്കുക.',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: '4',
    type: 'info',
    title: 'New Announcement',
    titleMl: 'പുതിയ അറിയിപ്പ്',
    message: 'Ward meeting scheduled for next week',
    messageMl: 'അടുത്ത ആഴ്ച വാർഡ് മീറ്റിംഗ് ഷെഡ്യൂൾ ചെയ്തു',
    timestamp: '2 days ago',
    read: true
  },
  {
    id: '5',
    type: 'success',
    title: 'Profile Updated',
    titleMl: 'പ്രൊഫൈൽ അപ്ഡേറ്റ് ചെയ്തു',
    message: 'Your profile information has been updated successfully',
    messageMl: 'നിങ്ങളുടെ പ്രൊഫൈൽ വിവരങ്ങൾ വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു',
    timestamp: '3 days ago',
    read: true
  }
];

export function Notifications() {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notif => {
    const matchesFilter = filter === 'all' || (filter === 'unread' && !notif.read) || (filter === 'read' && notif.read);
    const matchesType = typeFilter === 'all' || notif.type === typeFilter;
    return matchesFilter && matchesType;
  });

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className="overflow-hidden border-0 shadow-lg rounded-xl p-6 text-white"
        style={{
          background: 'linear-gradient(135deg, #2D7A4F 0%, #8B9D83 100%)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{t('Notifications', 'അറിയിപ്പുകൾ')}</h2>
            <p className="text-white/90 mt-1">{t('Stay updated with latest activities', 'ഏറ്റവും പുതിയ പ്രവർത്തനങ്ങളുമായി അപ്ഡേറ്റ് ആയിരിക്കുക')}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl font-bold">{unreadCount}</div>
            <div className="text-sm text-white/80">{t('Unread', 'വായിക്കാത്തത്')}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{t('Filters', 'ഫിൽട്ടറുകൾ')}</CardTitle>
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                {t('Mark All Read', 'എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക')}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('Filter by Status', 'സ്റ്റാറ്റസ് അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All', 'എല്ലാം')}</SelectItem>
                <SelectItem value="unread">{t('Unread', 'വായിക്കാത്തത്')}</SelectItem>
                <SelectItem value="read">{t('Read', 'വായിച്ചത്')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('Filter by Type', 'തരം അനുസരിച്ച് ഫിൽട്ടർ ചെയ്യുക')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Types', 'എല്ലാ തരങ്ങളും')}</SelectItem>
                <SelectItem value="success">{t('Success', 'വിജയം')}</SelectItem>
                <SelectItem value="info">{t('Info', 'വിവരം')}</SelectItem>
                <SelectItem value="warning">{t('Warning', 'മുന്നറിയിപ്പ്')}</SelectItem>
                <SelectItem value="error">{t('Error', 'പിശക്')}</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearAll} className="gap-2">
              <Trash2 className="w-4 h-4" />
              {t('Clear All', 'എല്ലാം മായ്ക്കുക')}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t('Notifications', 'അറിയിപ്പുകൾ')} ({filteredNotifications.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('No notifications found', 'അറിയിപ്പുകളൊന്നും കണ്ടെത്തിയില്ല')}</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    notif.read ? 'bg-muted/50' : getTypeColor(notif.type)
                  } ${!notif.read ? 'border-l-4' : ''}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getTypeIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className={`font-semibold ${!notif.read ? 'font-bold' : ''}`}>
                          {t(notif.title, notif.titleMl)}
                        </h4>
                        {!notif.read && (
                          <Badge variant="default" className="bg-blue-600">
                            {t('New', 'പുതിയത്')}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {t(notif.message, notif.messageMl)}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{notif.timestamp}</span>
                        <div className="flex gap-2">
                          {!notif.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notif.id)}
                              className="h-7 text-xs"
                            >
                              {t('Mark Read', 'വായിച്ചതായി അടയാളപ്പെടുത്തുക')}
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notif.id)}
                            className="h-7 text-xs text-red-600 hover:text-red-700"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

