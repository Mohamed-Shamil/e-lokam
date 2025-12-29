import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { 
  Search, 
  Filter,
  Eye,
  MessageSquare,
  Calendar,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface MyComplaint {
  id: string;
  title: string;
  titleMl: string;
  category: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  reportedAt: string;
  resolvedAt?: string;
  hasComments: boolean;
  commentCount: number;
}

const mockMyComplaints: MyComplaint[] = [
  {
    id: 'GRV-2024-1234',
    title: 'Broken Water Pipe',
    titleMl: 'കേടായ ജല പൈപ്പ്',
    category: 'Water',
    location: 'Ward 5, MG Road',
    status: 'in-progress',
    priority: 'high',
    reportedAt: '2 days ago',
    hasComments: true,
    commentCount: 2
  },
  {
    id: 'GRV-2024-1235',
    title: 'Street Light Not Working',
    titleMl: 'തെരുവ് വിളക്ക് പ്രവർത്തിക്കുന്നില്ല',
    category: 'Electricity',
    location: 'Ward 5, Temple Road',
    status: 'resolved',
    priority: 'medium',
    reportedAt: '1 week ago',
    resolvedAt: '3 days ago',
    hasComments: false,
    commentCount: 0
  },
  {
    id: 'GRV-2024-1236',
    title: 'Road Pothole',
    titleMl: 'റോഡ് കുഴി',
    category: 'Roads',
    location: 'Ward 5, Station Road',
    status: 'pending',
    priority: 'medium',
    reportedAt: '3 days ago',
    hasComments: false,
    commentCount: 0
  },
  {
    id: 'GRV-2024-1237',
    title: 'Garbage Not Collected',
    titleMl: 'കുപ്പ ശേഖരിക്കപ്പെട്ടില്ല',
    category: 'Waste Management',
    location: 'Ward 5, Market Street',
    status: 'resolved',
    priority: 'low',
    reportedAt: '2 weeks ago',
    resolvedAt: '1 week ago',
    hasComments: true,
    commentCount: 1
  }
];

interface MyComplaintsProps {
  onViewComplaint: (id: string) => void;
}

export function MyComplaints({ onViewComplaint }: MyComplaintsProps) {
  const { t } = useLanguage();
  const [complaints] = useState<MyComplaint[]>(mockMyComplaints);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.titleMl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusColor = (status: MyComplaint['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'in-progress':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'resolved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'closed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
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
          background: 'linear-gradient(135deg, #2D7A4F 0%, #8B9D83 100%)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{t('My Complaints', 'എന്റെ പരാതികൾ')}</h2>
            <p className="text-white/90 mt-1">{t('View and track all your submitted complaints', 'സമർപ്പിച്ച എല്ലാ പരാതികളും കാണുകയും ട്രാക്ക് ചെയ്യുകയും ചെയ്യുക')}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl font-bold">{filteredComplaints.length}</div>
            <div className="text-sm text-white/80">{t('Total Complaints', 'ആകെ പരാതികൾ')}</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{t('Search & Filter', 'തിരയുകയും ഫിൽട്ടർ ചെയ്യുകയും')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('Search complaints...', 'പരാതികൾ തിരയുക...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('Status', 'നില')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Status', 'എല്ലാ നിലയും')}</SelectItem>
                <SelectItem value="pending">{t('Pending', 'പെൻഡിംഗ്')}</SelectItem>
                <SelectItem value="in-progress">{t('In Progress', 'പുരോഗതിയിൽ')}</SelectItem>
                <SelectItem value="resolved">{t('Resolved', 'പരിഹരിച്ചു')}</SelectItem>
                <SelectItem value="closed">{t('Closed', 'അടച്ചു')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('Category', 'വിഭാഗം')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Categories', 'എല്ലാ വിഭാഗങ്ങളും')}</SelectItem>
                <SelectItem value="Water">{t('Water', 'ജലം')}</SelectItem>
                <SelectItem value="Electricity">{t('Electricity', 'വൈദ്യുതി')}</SelectItem>
                <SelectItem value="Roads">{t('Roads', 'റോഡുകൾ')}</SelectItem>
                <SelectItem value="Waste Management">{t('Waste Management', 'മാലിന്യ സംസ്കരണം')}</SelectItem>
                <SelectItem value="Sanitation">{t('Sanitation', 'ശുചിത്വം')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t('Your Complaints', 'നിങ്ങളുടെ പരാതികൾ')} ({filteredComplaints.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredComplaints.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('No complaints found', 'പരാതികളൊന്നും കണ്ടെത്തിയില്ല')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredComplaints.map((complaint) => (
                <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-semibold">{t(complaint.title, complaint.titleMl)}</h4>
                          <Badge
                            variant="outline"
                            className={getStatusColor(complaint.status)}
                          >
                            {t(complaint.status, complaint.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{complaint.id}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{complaint.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{t('Reported', 'റിപ്പോർട്ട് ചെയ്തത്')}: {complaint.reportedAt}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">{t('Category', 'വിഭാഗം')}: </span>
                        <span>{complaint.category}</span>
                      </div>
                      {complaint.resolvedAt && (
                        <div>
                          <span className="text-muted-foreground">{t('Resolved', 'പരിഹരിച്ചു')}: </span>
                          <span>{complaint.resolvedAt}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-4">
                        {complaint.hasComments && (
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <MessageSquare className="w-4 h-4" />
                            <span>{complaint.commentCount} {t('comments', 'അഭിപ്രായങ്ങൾ')}</span>
                          </div>
                        )}
                      </div>
                      <Button
                        onClick={() => onViewComplaint(complaint.id)}
                        className="bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {t('View Details', 'വിശദാംശങ്ങൾ കാണുക')}
                      </Button>
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

