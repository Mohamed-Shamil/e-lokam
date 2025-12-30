import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Users, 
  Building2, 
  GraduationCap, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Search,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Club {
  id: string;
  name: string;
  nameMl: string;
  type: 'arts' | 'sports';
  category: string;
  categoryMl: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address: string;
  addressMl: string;
  memberCount: number;
  establishedYear: string;
  description?: string;
}

interface Company {
  id: string;
  name: string;
  nameMl: string;
  type: string;
  industry: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address: string;
  addressMl: string;
  employeeCount: number;
  registrationNumber: string;
  website?: string;
}

interface School {
  id: string;
  name: string;
  nameMl: string;
  type: 'school' | 'college';
  level: string;
  levelMl: string;
  principal: string;
  phone: string;
  email?: string;
  address: string;
  addressMl: string;
  studentCount: number;
  establishedYear: string;
  website?: string;
}

interface NGO {
  id: string;
  name: string;
  nameMl: string;
  focusArea: string;
  focusAreaMl: string;
  contactPerson: string;
  phone: string;
  email?: string;
  address: string;
  addressMl: string;
  volunteerCount: number;
  registrationNumber: string;
  website?: string;
}

const mockClubs: Club[] = [
  {
    id: 'club1',
    name: 'Ward 5 Arts & Culture Club',
    nameMl: 'വാർഡ് 5 കലാ സാംസ്കാരിക കളബ്',
    type: 'arts',
    category: 'Music & Dance',
    categoryMl: 'സംഗീതവും നൃത്തവും',
    contactPerson: 'Rajesh Menon',
    phone: '+91 98765 43220',
    email: 'artsclub.ward5@example.com',
    address: 'Community Hall, Ward 5, MG Road',
    addressMl: 'കമ്മ്യൂണിറ്റി ഹാൾ, വാർഡ് 5, എംജി റോഡ്',
    memberCount: 45,
    establishedYear: '2018',
    description: 'Promoting traditional and modern arts'
  },
  {
    id: 'club2',
    name: 'Kochi Sports Club',
    nameMl: 'കൊച്ചി സ്പോർട്സ് കളബ്',
    type: 'sports',
    category: 'Football & Cricket',
    categoryMl: 'ഫുട്ബോളും ക്രിക്കറ്റും',
    contactPerson: 'Vijay Kumar',
    phone: '+91 98765 43221',
    email: 'sportsclub@example.com',
    address: 'Sports Complex, Ward 3, Kochi',
    addressMl: 'സ്പോർട്സ് കോംപ്ലക്സ്, വാർഡ് 3, കൊച്ചി',
    memberCount: 120,
    establishedYear: '2015',
    description: 'Community sports and fitness activities'
  },
  {
    id: 'club3',
    name: 'Traditional Arts Preservation Society',
    nameMl: 'പരമ്പരാഗത കലാ സംരക്ഷണ സൊസൈറ്റി',
    type: 'arts',
    category: 'Traditional Arts',
    categoryMl: 'പരമ്പരാഗത കലകൾ',
    contactPerson: 'Lakshmi Devi',
    phone: '+91 98765 43222',
    address: 'Cultural Center, Ward 7',
    addressMl: 'സാംസ്കാരിക കേന്ദ്രം, വാർഡ് 7',
    memberCount: 38,
    establishedYear: '2020'
  }
];

const mockCompanies: Company[] = [
  {
    id: 'comp1',
    name: 'Kerala Agro Products Ltd',
    nameMl: 'കേരള അഗ്രോ പ്രോഡക്റ്റ്സ് ലിമിറ്റഡ്',
    type: 'Private Limited',
    industry: 'Agriculture',
    contactPerson: 'Suresh Nair',
    phone: '+91 98765 43230',
    email: 'info@keralaagro.com',
    address: 'Industrial Area, Ward 5, Ernakulam',
    addressMl: 'വ്യാവസായിക മേഖല, വാർഡ് 5, എറണാകുളം',
    employeeCount: 150,
    registrationNumber: 'KL07AAAC1234',
    website: 'www.keralaagro.com'
  },
  {
    id: 'comp2',
    name: 'Tech Solutions Pvt Ltd',
    nameMl: 'ടെക് സൊല്യൂഷൻസ് പ്രൈവറ്റ് ലിമിറ്റഡ്',
    type: 'Private Limited',
    industry: 'Information Technology',
    contactPerson: 'Priya Menon',
    phone: '+91 98765 43231',
    email: 'contact@techsolutions.in',
    address: 'IT Park, Ward 3, Kochi',
    addressMl: 'ഐടി പാർക്ക്, വാർഡ് 3, കൊച്ചി',
    employeeCount: 85,
    registrationNumber: 'KL07AAAC5678',
    website: 'www.techsolutions.in'
  },
  {
    id: 'comp3',
    name: 'Green Energy Solutions',
    nameMl: 'ഗ്രീൻ എനർജി സൊല്യൂഷൻസ്',
    type: 'Partnership',
    industry: 'Renewable Energy',
    contactPerson: 'Anil George',
    phone: '+91 98765 43232',
    address: 'Business Park, Ward 7',
    addressMl: 'ബിസിനസ് പാർക്ക്, വാർഡ് 7',
    employeeCount: 25,
    registrationNumber: 'KL07AAAC9012'
  }
];

const mockSchools: School[] = [
  {
    id: 'school1',
    name: 'Government Higher Secondary School',
    nameMl: 'സർക്കാർ ഹയർ സെക്കൻഡറി സ്കൂൾ',
    type: 'school',
    level: 'Higher Secondary',
    levelMl: 'ഹയർ സെക്കൻഡറി',
    principal: 'Dr. Radha Pillai',
    phone: '+91 98765 43240',
    email: 'ghss.ward5@education.gov.in',
    address: 'School Road, Ward 5, MG Road',
    addressMl: 'സ്കൂൾ റോഡ്, വാർഡ് 5, എംജി റോഡ്',
    studentCount: 850,
    establishedYear: '1965',
    website: 'www.ghssward5.edu.in'
  },
  {
    id: 'school2',
    name: 'St. Mary\'s College',
    nameMl: 'സെന്റ് മേരീസ് കോളേജ്',
    type: 'college',
    level: 'Undergraduate & Postgraduate',
    levelMl: 'ബിരുദവും ബിരുദാനന്തരവും',
    principal: 'Fr. Thomas Varghese',
    phone: '+91 98765 43241',
    email: 'admin@stmaryscollege.edu',
    address: 'College Road, Ward 3, Kochi',
    addressMl: 'കോളേജ് റോഡ്, വാർഡ് 3, കൊച്ചി',
    studentCount: 1200,
    establishedYear: '1950',
    website: 'www.stmaryscollege.edu'
  },
  {
    id: 'school3',
    name: 'Little Angels Primary School',
    nameMl: 'ലിറ്റിൽ ഏഞ്ചൽസ് പ്രൈമറി സ്കൂൾ',
    type: 'school',
    level: 'Primary',
    levelMl: 'പ്രൈമറി',
    principal: 'Smt. Geetha Nair',
    phone: '+91 98765 43242',
    address: 'Near Temple, Ward 7',
    addressMl: 'ക്ഷേത്രത്തിന് സമീപം, വാർഡ് 7',
    studentCount: 320,
    establishedYear: '1995'
  }
];

const mockNGOs: NGO[] = [
  {
    id: 'ngo1',
    name: 'Community Development Foundation',
    nameMl: 'കമ്മ്യൂണിറ്റി വികസന ഫൗണ്ടേഷൻ',
    focusArea: 'Rural Development & Education',
    focusAreaMl: 'ഗ്രാമീണ വികസനവും വിദ്യാഭ്യാസവും',
    contactPerson: 'Adv. Maria Joseph',
    phone: '+91 98765 43250',
    email: 'info@cdf.org',
    address: 'NGO Complex, Ward 5, Ernakulam',
    addressMl: 'എൻജിഒ കോംപ്ലക്സ്, വാർഡ് 5, എറണാകുളം',
    volunteerCount: 200,
    registrationNumber: 'KL/2020/12345',
    website: 'www.cdf.org'
  },
  {
    id: 'ngo2',
    name: 'Women Empowerment Society',
    nameMl: 'സ്ത്രീ സശക്തീകരണ സൊസൈറ്റി',
    focusArea: 'Women\'s Rights & Empowerment',
    focusAreaMl: 'സ്ത്രീ അവകാശങ്ങളും സശക്തീകരണവും',
    contactPerson: 'Smt. Ayesha Begum',
    phone: '+91 98765 43251',
    email: 'contact@wes.org',
    address: 'Community Center, Ward 3',
    addressMl: 'കമ്മ്യൂണിറ്റി സെന്റർ, വാർഡ് 3',
    volunteerCount: 150,
    registrationNumber: 'KL/2018/67890'
  },
  {
    id: 'ngo3',
    name: 'Environmental Protection Group',
    nameMl: 'പരിസ്ഥിതി സംരക്ഷണ ഗ്രൂപ്പ്',
    focusArea: 'Environment & Sustainability',
    focusAreaMl: 'പരിസ്ഥിതിയും സുസ്ഥിരതയും',
    contactPerson: 'Dr. Abdul Rahman',
    phone: '+91 98765 43252',
    address: 'Green Office, Ward 7',
    addressMl: 'ഗ്രീൻ ഓഫീസ്, വാർഡ് 7',
    volunteerCount: 95,
    registrationNumber: 'KL/2019/11111'
  }
];

export function WardResources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('clubs');

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const renderClubCard = (club: Club) => (
    <Card key={club.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-base">{club.name}</h4>
              <Badge variant="outline" className={club.type === 'arts' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}>
                {club.type === 'arts' ? 'Arts' : 'Sports'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{club.nameMl}</p>
            <p className="text-xs text-muted-foreground">{club.category} / {club.categoryMl}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Contact:</span>
            <span>{club.contactPerson}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">{club.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{club.memberCount} members</span>
          </div>
        </div>

        <div className="flex gap-2 pt-3 border-t">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCall(club.phone)}
            className="flex-1 border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white text-xs"
          >
            <Phone className="w-3 h-3 mr-1" />
            Call
          </Button>
          {club.email && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEmail(club.email!)}
              className="flex-1 text-xs"
            >
              <Mail className="w-3 h-3 mr-1" />
              Email
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderCompanyCard = (company: Company) => (
    <Card key={company.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-base mb-1">{company.name}</h4>
            <p className="text-sm text-muted-foreground mb-2">{company.nameMl}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="outline" className="text-xs">{company.type}</Badge>
              <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">{company.industry}</Badge>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 text-sm mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Contact:</span>
            <span>{company.contactPerson}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">{company.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{company.employeeCount} employees</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Reg: {company.registrationNumber}
          </div>
        </div>

        <div className="flex gap-2 pt-3 border-t">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCall(company.phone)}
            className="flex-1 border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white text-xs"
          >
            <Phone className="w-3 h-3 mr-1" />
            Call
          </Button>
          {company.email && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEmail(company.email!)}
              className="flex-1 text-xs"
            >
              <Mail className="w-3 h-3 mr-1" />
              Email
            </Button>
          )}
          {company.website && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(`https://${company.website}`, '_blank')}
              className="text-xs"
            >
              <Globe className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderSchoolCard = (school: School) => (
    <Card key={school.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-base">{school.name}</h4>
              <Badge variant="outline" className={school.type === 'school' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}>
                {school.type === 'school' ? 'School' : 'College'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{school.nameMl}</p>
            <p className="text-xs text-muted-foreground">{school.level} / {school.levelMl}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Principal:</span>
            <span>{school.principal}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">{school.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{school.studentCount} students</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Established: {school.establishedYear}
          </div>
        </div>

        <div className="flex gap-2 pt-3 border-t">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCall(school.phone)}
            className="flex-1 border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white text-xs"
          >
            <Phone className="w-3 h-3 mr-1" />
            Call
          </Button>
          {school.email && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEmail(school.email!)}
              className="flex-1 text-xs"
            >
              <Mail className="w-3 h-3 mr-1" />
              Email
            </Button>
          )}
          {school.website && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(`https://${school.website}`, '_blank')}
              className="text-xs"
            >
              <Globe className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderNGOCard = (ngo: NGO) => (
    <Card key={ngo.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-base">{ngo.name}</h4>
              <Badge variant="outline" className="bg-pink-100 text-pink-700">
                NGO
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{ngo.nameMl}</p>
            <p className="text-xs text-muted-foreground">{ngo.focusArea} / {ngo.focusAreaMl}</p>
          </div>
        </div>
        
        <div className="space-y-2 text-sm mb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Contact:</span>
            <span>{ngo.contactPerson}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">{ngo.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">{ngo.volunteerCount} volunteers</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Reg: {ngo.registrationNumber}
          </div>
        </div>

        <div className="flex gap-2 pt-3 border-t">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCall(ngo.phone)}
            className="flex-1 border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white text-xs"
          >
            <Phone className="w-3 h-3 mr-1" />
            Call
          </Button>
          {ngo.email && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEmail(ngo.email!)}
              className="flex-1 text-xs"
            >
              <Mail className="w-3 h-3 mr-1" />
              Email
            </Button>
          )}
          {ngo.website && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(`https://${ngo.website}`, '_blank')}
              className="text-xs"
            >
              <Globe className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const filteredClubs = mockClubs.filter(club => 
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.nameMl.includes(searchQuery) ||
    club.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredCompanies = mockCompanies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.nameMl.includes(searchQuery) ||
    company.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSchools = mockSchools.filter(school => 
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.nameMl.includes(searchQuery)
  );

  const filteredNGOs = mockNGOs.filter(ngo => 
    ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ngo.nameMl.includes(searchQuery) ||
    ngo.focusArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <h2>Ward Resources</h2>
          <p className="text-white/90 mt-1">വാർഡ് വിഭവങ്ങൾ</p>
        </div>
      </Card>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search resources... / വിഭവങ്ങൾ തിരയുക..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Resource Type Selector - Dropdown */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Label className="text-sm font-medium whitespace-nowrap">Resource Type:</Label>
            <Select value={activeTab} onValueChange={setActiveTab}>
              <SelectTrigger className="w-full md:w-[280px]">
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clubs">
                  Arts & Sports Clubs
                </SelectItem>
                <SelectItem value="companies">
                  Companies & Businesses
                </SelectItem>
                <SelectItem value="schools">
                  Schools & Colleges
                </SelectItem>
                <SelectItem value="ngos">
                  NGOs
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for content switching */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="hidden">
          <TabsTrigger value="clubs">Clubs</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="ngos">NGOs</TabsTrigger>
        </TabsList>
        
        <TabsContent value="clubs" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Arts & Sports Clubs</h3>
            <Button size="sm" className="bg-[#2D7A4F] hover:bg-[#1B4D3E]">
              <Plus className="w-4 h-4 mr-1" />
              Add Club
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClubs.map(renderClubCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="companies" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Companies & Businesses</h3>
            <Button size="sm" className="bg-[#2D7A4F] hover:bg-[#1B4D3E]">
              <Plus className="w-4 h-4 mr-1" />
              Add Company
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCompanies.map(renderCompanyCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="schools" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Schools & Colleges</h3>
            <Button size="sm" className="bg-[#2D7A4F] hover:bg-[#1B4D3E]">
              <Plus className="w-4 h-4 mr-1" />
              Add School
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchools.map(renderSchoolCard)}
          </div>
        </TabsContent>
        
        <TabsContent value="ngos" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">NGOs</h3>
            <Button size="sm" className="bg-[#2D7A4F] hover:bg-[#1B4D3E]">
              <Plus className="w-4 h-4 mr-1" />
              Add NGO
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNGOs.map(renderNGOCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

