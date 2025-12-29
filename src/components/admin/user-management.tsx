import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { 
  Users, 
  Search, 
  Filter,
  Edit,
  Trash2,
  UserPlus,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface User {
  id: string;
  name: string;
  nameMl: string;
  phone: string;
  email?: string;
  role: 'citizen' | 'pravasi' | 'leader' | 'admin';
  ward?: string;
  status: 'active' | 'inactive' | 'suspended';
  registeredAt: string;
  image?: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    nameMl: 'രാജേഷ് കുമാർ',
    phone: '+91 98765 43210',
    email: 'rajesh@example.com',
    role: 'citizen',
    ward: 'Ward 5',
    status: 'active',
    registeredAt: '2024-01-15',
    image: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '2',
    name: 'Priya Menon',
    nameMl: 'പ്രിയ മേനോൻ',
    phone: '+91 98765 43211',
    email: 'priya@example.com',
    role: 'leader',
    ward: 'Ward 5',
    status: 'active',
    registeredAt: '2024-01-10',
    image: 'https://i.pravatar.cc/150?img=20'
  }
];

export function UserManagement() {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nameMl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleStatusChange = (id: string, newStatus: User['status']) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
  };

  const handleDelete = (id: string) => {
    if (confirm(t('Are you sure you want to delete this user?', 'ഈ ഉപയോക്താവിനെ ഇല്ലാതാക്കാൻ നിങ്ങൾക്ക് ഉറപ്പാണോ?'))) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'leader':
        return 'bg-blue-100 text-blue-800';
      case 'pravasi':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div 
        className="overflow-hidden border-0 shadow-lg rounded-xl p-6 text-white"
        style={{
          background: 'linear-gradient(135deg, #1E5A8E 0%, #2D7A4F 100%)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{t('User Management', 'ഉപയോക്തൃ മാനേജ്മെന്റ്')}</h2>
            <p className="text-white/90 mt-1">{t('Manage all registered users', 'രജിസ്റ്റർ ചെയ്ത എല്ലാ ഉപയോക്താക്കളെയും നിയന്ത്രിക്കുക')}</p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            {t('Add User', 'ഉപയോക്താവ് ചേർക്കുക')}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>{t('Search & Filter', 'തിരയുകയും ഫിൽട്ടർ ചെയ്യുകയും')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('Search users...', 'ഉപയോക്താക്കളെ തിരയുക...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('Filter by Role', 'റോൾ അനുസരിച്ച് ഫിൽട്ടർ')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Roles', 'എല്ലാ റോളുകളും')}</SelectItem>
                <SelectItem value="citizen">{t('Citizen', 'പൗരൻ')}</SelectItem>
                <SelectItem value="pravasi">{t('Pravasi', 'പ്രവാസി')}</SelectItem>
                <SelectItem value="leader">{t('Ward Member', 'വാർഡ് മെമ്പർ')}</SelectItem>
                <SelectItem value="admin">{t('Admin', 'അഡ്മിൻ')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('Filter by Status', 'നില അനുസരിച്ച് ഫിൽട്ടർ')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Status', 'എല്ലാ നിലയും')}</SelectItem>
                <SelectItem value="active">{t('Active', 'സജീവം')}</SelectItem>
                <SelectItem value="inactive">{t('Inactive', 'നിഷ്ക്രിയം')}</SelectItem>
                <SelectItem value="suspended">{t('Suspended', 'സസ്പെൻഡ് ചെയ്തു')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t('Users', 'ഉപയോക്താക്കൾ')} ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('No users found', 'ഉപയോക്താക്കളൊന്നും കണ്ടെത്തിയില്ല')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold">{user.name}</h4>
                          <Badge className={getRoleColor(user.role)}>
                            {t(user.role, user.role)}
                          </Badge>
                          <Badge className={getStatusColor(user.status)}>
                            {t(user.status, user.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{user.nameMl}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{user.phone}</span>
                          </div>
                          {user.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span>{user.email}</span>
                            </div>
                          )}
                          {user.ward && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{user.ward}</span>
                            </div>
                          )}
                          <div className="text-muted-foreground">
                            {t('Registered', 'രജിസ്റ്റർ ചെയ്തത്')}: {user.registeredAt}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={user.status}
                          onValueChange={(value) => handleStatusChange(user.id, value as User['status'])}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">{t('Active', 'സജീവം')}</SelectItem>
                            <SelectItem value="inactive">{t('Inactive', 'നിഷ്ക്രിയം')}</SelectItem>
                            <SelectItem value="suspended">{t('Suspended', 'സസ്പെൻഡ് ചെയ്തു')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(user.id)}
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

