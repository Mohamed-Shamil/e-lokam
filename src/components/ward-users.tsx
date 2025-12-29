import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Search, 
  Phone, 
  Mail, 
  User, 
  Filter,
  X,
  Download
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface WardUser {
  id: string;
  name: string;
  nameMl: string;
  phone: string;
  email?: string;
  voterId?: string;
  image?: string;
  address: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}

const mockWardUsers: WardUser[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    nameMl: 'രാജേഷ് കുമാർ',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@example.com',
    voterId: 'KER/2024/123456',
    address: 'MG Road, Ward 5',
    age: 42,
    gender: 'male',
    image: 'https://i.pravatar.cc/150?img=12'
  },
  {
    id: '2',
    name: 'Sreelatha Menon',
    nameMl: 'ശ്രീലത മേനോൻ',
    phone: '+91 98765 43211',
    email: 'sreelatha.m@example.com',
    voterId: 'KER/2024/123457',
    address: 'Temple Road, Ward 5',
    age: 38,
    gender: 'female',
    image: 'https://i.pravatar.cc/150?img=47'
  },
  {
    id: '3',
    name: 'Anil George',
    nameMl: 'അനിൽ ജോർജ്',
    phone: '+91 98765 43212',
    address: 'Station Road, Ward 5',
    age: 35,
    gender: 'male',
    image: 'https://i.pravatar.cc/150?img=33'
  },
  {
    id: '4',
    name: 'Priya Nair',
    nameMl: 'പ്രിയ നായർ',
    phone: '+91 98765 43213',
    email: 'priya.nair@example.com',
    address: 'Market Street, Ward 5',
    age: 29,
    gender: 'female',
    image: 'https://i.pravatar.cc/150?img=45'
  },
  {
    id: '5',
    name: 'Ramesh Iyer',
    nameMl: 'രമേഷ് അയ്യർ',
    phone: '+91 98765 43214',
    voterId: 'KER/2024/123458',
    address: 'Beach Road, Ward 5',
    age: 55,
    gender: 'male',
    image: 'https://i.pravatar.cc/150?img=51'
  },
  {
    id: '6',
    name: 'Lakshmi Devi',
    nameMl: 'ലക്ഷ്മി ദേവി',
    phone: '+91 98765 43215',
    email: 'lakshmi.devi@example.com',
    voterId: 'KER/2024/123459',
    address: 'Gandhi Nagar, Ward 5',
    age: 48,
    gender: 'female',
    image: 'https://i.pravatar.cc/150?img=20'
  },
  {
    id: '7',
    name: 'Suresh Pillai',
    nameMl: 'സുരേഷ് പിള്ള',
    phone: '+91 98765 43216',
    address: 'Main Road, Ward 5',
    age: 31,
    gender: 'male',
    image: 'https://i.pravatar.cc/150?img=15'
  },
  {
    id: '8',
    name: 'Meera Unni',
    nameMl: 'മീര ഉണ്ണി',
    phone: '+91 98765 43217',
    email: 'meera.unni@example.com',
    address: 'Park Avenue, Ward 5',
    age: 26,
    gender: 'female',
    image: 'https://i.pravatar.cc/150?img=32'
  },
];

export function WardUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [hasEmailFilter, setHasEmailFilter] = useState<string>('all');
  const [hasVoterIdFilter, setHasVoterIdFilter] = useState<string>('all');

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const filteredUsers = mockWardUsers.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nameMl.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.voterId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGender = genderFilter === 'all' || user.gender === genderFilter;
    const matchesEmail = hasEmailFilter === 'all' || 
      (hasEmailFilter === 'yes' && user.email) || 
      (hasEmailFilter === 'no' && !user.email);
    const matchesVoterId = hasVoterIdFilter === 'all' || 
      (hasVoterIdFilter === 'yes' && user.voterId) || 
      (hasVoterIdFilter === 'no' && !user.voterId);

    return matchesSearch && matchesGender && matchesEmail && matchesVoterId;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setGenderFilter('all');
    setHasEmailFilter('all');
    setHasVoterIdFilter('all');
  };

  const hasActiveFilters = searchQuery || genderFilter !== 'all' || hasEmailFilter !== 'all' || hasVoterIdFilter !== 'all';

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
            <h2 className="text-2xl font-semibold">Ward Users Directory</h2>
            <p className="text-white/90 mt-1">വാർഡ് ഉപയോക്താക്കളുടെ ഡയറക്ടറി</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl font-bold">{filteredUsers.length}</div>
            <div className="text-sm text-white/80">Total Users</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Search & Filter</CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Gender Filter */}
            <Select value={genderFilter} onValueChange={setGenderFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            {/* Email Filter */}
            <Select value={hasEmailFilter} onValueChange={setHasEmailFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Email Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="yes">With Email</SelectItem>
                <SelectItem value="no">Without Email</SelectItem>
              </SelectContent>
            </Select>

            {/* Voter ID Filter */}
            <Select value={hasVoterIdFilter} onValueChange={setHasVoterIdFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Voter ID Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="yes">With Voter ID</SelectItem>
                <SelectItem value="no">Without Voter ID</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              Users ({filteredUsers.length})
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export List
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No users found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-base truncate">{user.name}</h4>
                            <p className="text-sm text-muted-foreground truncate">{user.nameMl}</p>
                          </div>
                          <Badge variant="outline" className="ml-2 shrink-0">
                            {user.gender === 'male' ? 'M' : user.gender === 'female' ? 'F' : 'O'}
                          </Badge>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-1.5 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                            <a 
                              href={`tel:${user.phone}`}
                              className="text-[#2D5016] hover:underline truncate"
                            >
                              {user.phone}
                            </a>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0 ml-auto shrink-0"
                              onClick={() => handleCall(user.phone)}
                            >
                              <Phone className="w-3 h-3" />
                            </Button>
                          </div>

                          {user.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                              <a 
                                href={`mailto:${user.email}`}
                                className="text-[#2D5016] hover:underline truncate"
                              >
                                {user.email}
                              </a>
                            </div>
                          )}

                          {user.voterId && (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground shrink-0" />
                              <span className="text-muted-foreground truncate">
                                Voter ID: {user.voterId}
                              </span>
                            </div>
                          )}

                          <div className="text-xs text-muted-foreground truncate">
                            {user.address} • Age: {user.age}
                          </div>
                        </div>
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

