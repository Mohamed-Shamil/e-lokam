import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { 
  MapPin, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Users,
  Building2
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface Ward {
  id: string;
  number: number;
  name: string;
  nameMl: string;
  area: string;
  population: number;
  memberName: string;
  memberPhone: string;
  status: 'active' | 'inactive';
}

const mockWards: Ward[] = [
  {
    id: '1',
    number: 1,
    name: 'Marine Drive',
    nameMl: 'മാരിൻ ഡ്രൈവ്',
    area: '2.5 sq km',
    population: 5000,
    memberName: 'Rajesh Kumar',
    memberPhone: '+91 98765 43210',
    status: 'active'
  },
  {
    id: '2',
    number: 5,
    name: 'MG Road',
    nameMl: 'എംജി റോഡ്',
    area: '3.2 sq km',
    population: 7500,
    memberName: 'Priya Menon',
    memberPhone: '+91 98765 43211',
    status: 'active'
  }
];

export function WardManagement() {
  const { t } = useLanguage();
  const [wards, setWards] = useState<Ward[]>(mockWards);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredWards = wards.filter(ward =>
    ward.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ward.nameMl.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ward.number.toString().includes(searchQuery) ||
    ward.memberName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <h2 className="text-2xl font-semibold">{t('Ward Management', 'വാർഡ് മാനേജ്മെന്റ്')}</h2>
            <p className="text-white/90 mt-1">{t('Manage all wards in the panchayat', 'പഞ്ചായത്തിലെ എല്ലാ വാർഡുകളും നിയന്ത്രിക്കുക')}</p>
          </div>
          <Button className="bg-white/20 hover:bg-white/30 text-white">
            <Plus className="w-4 h-4 mr-2" />
            {t('Add Ward', 'വാർഡ് ചേർക്കുക')}
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>{t('Search Wards', 'വാർഡുകൾ തിരയുക')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('Search by ward name, number, or member...', 'വാർഡ് പേര്, നമ്പർ അല്ലെങ്കിൽ അംഗം അനുസരിച്ച് തിരയുക...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Wards List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t('Wards', 'വാർഡുകൾ')} ({filteredWards.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredWards.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('No wards found', 'വാർഡുകളൊന്നും കണ്ടെത്തിയില്ല')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredWards.map((ward) => (
                <Card key={ward.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold">
                            {t('Ward', 'വാർഡ്')} {ward.number}: {t(ward.name, ward.nameMl)}
                          </h4>
                          <Badge variant={ward.status === 'active' ? 'default' : 'secondary'}>
                            {t(ward.status, ward.status)}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t('Area', 'വിസ്തീർണ്ണം')}:</span>
                            <span>{ward.area}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t('Population', 'ജനസംഖ്യ')}:</span>
                            <span>{ward.population.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{t('Member', 'അംഗം')}:</span>
                            <span>{ward.memberName}</span>
                          </div>
                          <div className="text-muted-foreground">
                            {t('Phone', 'ഫോൺ')}: {ward.memberPhone}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
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

