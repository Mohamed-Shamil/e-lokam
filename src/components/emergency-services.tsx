import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  Phone, 
  AlertTriangle, 
  Ambulance, 
  Shield, 
  Flame, 
  Droplets,
  Wind,
  Search,
  MapPin,
  Clock,
  Mail,
  Globe,
  Bell,
  Radio
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface EmergencyContact {
  id: string;
  name: string;
  nameMl: string;
  type: 'police' | 'fire' | 'ambulance' | 'disaster' | 'other';
  phone: string;
  alternatePhone?: string;
  email?: string;
  address: string;
  addressMl: string;
  available24x7: boolean;
  description?: string;
}

interface EmergencyAlert {
  id: string;
  type: 'disaster' | 'weather' | 'health' | 'safety' | 'other';
  typeMl: string;
  title: string;
  titleMl: string;
  message: string;
  messageMl: string;
  severity: 'info' | 'warning' | 'critical';
  issuedAt: string;
  expiresAt?: string;
  area: string;
  areaMl: string;
  actionRequired: boolean;
  actionText?: string;
  actionTextMl?: string;
}

interface DisasterProtocol {
  id: string;
  type: 'flood' | 'earthquake' | 'fire' | 'cyclone' | 'landslide' | 'other';
  typeMl: string;
  title: string;
  titleMl: string;
  steps: Array<{
    step: string;
    stepMl: string;
    description: string;
    descriptionMl: string;
  }>;
  emergencyContacts: string[];
  resources: string[];
  resourcesMl: string[];
}

const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: 'ec1',
    name: 'Police Control Room',
    nameMl: 'പോലീസ് കൺട്രോൾ റൂം',
    type: 'police',
    phone: '100',
    alternatePhone: '+91 484 239 5000',
    address: 'Police Station, Ernakulam',
    addressMl: 'പോലീസ് സ്റ്റേഷൻ, എറണാകുളം',
    available24x7: true,
    description: 'Emergency police assistance'
  },
  {
    id: 'ec2',
    name: 'Fire & Rescue Services',
    nameMl: 'ഫയർ & റെസ്ക്യൂ സേവനങ്ങൾ',
    type: 'fire',
    phone: '101',
    alternatePhone: '+91 484 236 2000',
    address: 'Fire Station, Ernakulam',
    addressMl: 'ഫയർ സ്റ്റേഷൻ, എറണാകുളം',
    available24x7: true,
    description: 'Fire emergencies and rescue operations'
  },
  {
    id: 'ec3',
    name: 'Ambulance Services',
    nameMl: 'ആംബുലൻസ് സേവനങ്ങൾ',
    type: 'ambulance',
    phone: '108',
    alternatePhone: '+91 484 236 3000',
    address: 'Emergency Medical Services, Ernakulam',
    addressMl: 'എമർജൻസി മെഡിക്കൽ സേവനങ്ങൾ, എറണാകുളം',
    available24x7: true,
    description: 'Medical emergencies and ambulance'
  },
  {
    id: 'ec4',
    name: 'Disaster Management Control Room',
    nameMl: 'ദുരന്ത മാനേജ്മെന്റ് കൺട്രോൾ റൂം',
    type: 'disaster',
    phone: '+91 484 236 4000',
    email: 'disaster@kerala.gov.in',
    address: 'Disaster Management Office, Ernakulam',
    addressMl: 'ദുരന്ത മാനേജ്മെന്റ് ഓഫീസ്, എറണാകുളം',
    available24x7: true,
    description: 'Natural disaster response and coordination'
  },
  {
    id: 'ec5',
    name: 'Women Helpline',
    nameMl: 'സ്ത്രീ ഹെൽപ്പ്‌ലൈൻ',
    type: 'other',
    phone: '1091',
    alternatePhone: '+91 484 236 5000',
    address: 'Women Protection Cell, Ernakulam',
    addressMl: 'സ്ത്രീ സംരക്ഷണ സെൽ, എറണാകുളം',
    available24x7: true,
    description: 'Women safety and protection'
  },
  {
    id: 'ec6',
    name: 'Child Helpline',
    nameMl: 'കുട്ടികളുടെ ഹെൽപ്പ്‌ലൈൻ',
    type: 'other',
    phone: '1098',
    alternatePhone: '+91 484 236 6000',
    address: 'Child Protection Services, Ernakulam',
    addressMl: 'കുട്ടി സംരക്ഷണ സേവനങ്ങൾ, എറണാകുളം',
    available24x7: true,
    description: 'Child safety and protection'
  }
];

const mockAlerts: EmergencyAlert[] = [
  {
    id: 'alert1',
    type: 'weather',
    typeMl: 'കാലാവസ്ഥ',
    title: 'Heavy Rainfall Warning',
    titleMl: 'കനത്ത മഴ അറിയിപ്പ്',
    message: 'Heavy rainfall expected in the next 24 hours. Stay indoors and avoid unnecessary travel.',
    messageMl: 'അടുത്ത 24 മണിക്കൂറിനുള്ളിൽ കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു. വീടിനുള്ളിൽ തുടരുകയും അനാവശ്യ യാത്രകൾ ഒഴിവാക്കുകയും ചെയ്യുക.',
    severity: 'warning',
    issuedAt: '2024-02-13 10:00 AM',
    expiresAt: '2024-02-14 10:00 AM',
    area: 'Ernakulam District',
    areaMl: 'എറണാകുളം ജില്ല',
    actionRequired: true,
    actionText: 'Stay Alert',
    actionTextMl: 'ശ്രദ്ധാലുവായിരിക്കുക'
  },
  {
    id: 'alert2',
    type: 'health',
    typeMl: 'ആരോഗ്യം',
    title: 'Health Camp Announcement',
    titleMl: 'ആരോഗ്യ ക്യാമ്പ് അറിയിപ്പ്',
    message: 'Free health checkup camp will be conducted on February 15th at Community Hall.',
    messageMl: 'ഫെബ്രുവരി 15-ന് കമ്മ്യൂണിറ്റി ഹാളിൽ സൗജന്യ ആരോഗ്യ പരിശോധന ക്യാമ്പ് നടത്തും.',
    severity: 'info',
    issuedAt: '2024-02-12 2:00 PM',
    area: 'Ward 5',
    areaMl: 'വാർഡ് 5',
    actionRequired: false
  },
  {
    id: 'alert3',
    type: 'safety',
    typeMl: 'സുരക്ഷ',
    title: 'Road Closure Notice',
    titleMl: 'റോഡ് അടയ്ക്കൽ അറിയിപ്പ്',
    message: 'MG Road will be closed for maintenance from Feb 14-16. Use alternate routes.',
    messageMl: 'ഫെബ്രുവരി 14-16 വരെ എംജി റോഡ് പരിപാലനത്തിനായി അടച്ചിരിക്കും. ബദൽ റൂട്ടുകൾ ഉപയോഗിക്കുക.',
    severity: 'warning',
    issuedAt: '2024-02-13 9:00 AM',
    expiresAt: '2024-02-16 6:00 PM',
    area: 'Ward 5, MG Road',
    areaMl: 'വാർഡ് 5, എംജി റോഡ്',
    actionRequired: true,
    actionText: 'Plan Route',
    actionTextMl: 'റൂട്ട് ആസൂത്രണം ചെയ്യുക'
  }
];

const mockProtocols: DisasterProtocol[] = [
  {
    id: 'dp1',
    type: 'flood',
    typeMl: 'വെള്ളപ്പൊക്കം',
    title: 'Flood Preparedness',
    titleMl: 'വെള്ളപ്പൊക്കം തയ്യാറെടുപ്പ്',
    steps: [
      {
        step: 'Stay Informed',
        stepMl: 'വിവരങ്ങൾ അറിയുക',
        description: 'Monitor weather updates and flood warnings',
        descriptionMl: 'കാലാവസ്ഥ അപ്ഡേറ്റുകളും വെള്ളപ്പൊക്കം അറിയിപ്പുകളും നിരീക്ഷിക്കുക'
      },
      {
        step: 'Prepare Emergency Kit',
        stepMl: 'എമർജൻസി കിറ്റ് തയ്യാറാക്കുക',
        description: 'Keep essential supplies, documents, and medicines ready',
        descriptionMl: 'ആവശ്യമായ സാധനങ്ങൾ, രേഖകൾ, മരുന്നുകൾ തയ്യാറാക്കുക'
      },
      {
        step: 'Evacuate if Needed',
        stepMl: 'ആവശ്യമെങ്കിൽ ഒഴിപ്പിക്കുക',
        description: 'Follow evacuation orders and move to higher ground',
        descriptionMl: 'ഒഴിപ്പിക്കൽ ഉത്തരവുകൾ പാലിക്കുകയും ഉയർന്ന സ്ഥലങ്ങളിലേക്ക് നീങ്ങുക'
      }
    ],
    emergencyContacts: ['100', '108', '+91 484 236 4000'],
    resources: ['Emergency Kit', 'Life Jackets', 'First Aid'],
    resourcesMl: ['എമർജൻസി കിറ്റ്', 'ലൈഫ് ജാക്കറ്റുകൾ', 'ഫസ്റ്റ് എയ്ഡ്']
  },
  {
    id: 'dp2',
    type: 'fire',
    typeMl: 'തീ',
    title: 'Fire Safety Protocol',
    titleMl: 'തീ സുരക്ഷാ പ്രോട്ടോക്കോൾ',
    steps: [
      {
        step: 'Alert Others',
        stepMl: 'മറ്റുള്ളവരെ അറിയിക്കുക',
        description: 'Shout "Fire!" and alert people in the building',
        descriptionMl: '"തീ!" എന്ന് വിളിച്ച് കെട്ടിടത്തിലെ ആളുകളെ അറിയിക്കുക'
      },
      {
        step: 'Call Fire Department',
        stepMl: 'ഫയർ ഡിപ്പാർട്ട്മെന്റിനെ വിളിക്കുക',
        description: 'Dial 101 immediately',
        descriptionMl: 'ഉടനെ 101 ഡയൽ ചെയ്യുക'
      },
      {
        step: 'Evacuate Safely',
        stepMl: 'സുരക്ഷിതമായി ഒഴിപ്പിക്കുക',
        description: 'Use stairs, not elevators. Stay low if there is smoke.',
        descriptionMl: 'ലിഫ്റ്റുകൾ അല്ല, പടികൾ ഉപയോഗിക്കുക. പുകയുണ്ടെങ്കിൽ താഴെ തുടരുക.'
      }
    ],
    emergencyContacts: ['101', '100'],
    resources: ['Fire Extinguisher', 'Emergency Exit', 'First Aid'],
    resourcesMl: ['ഫയർ എക്സ്റ്റിംഗ്വിഷർ', 'എമർജൻസി എക്സിറ്റ്', 'ഫസ്റ്റ് എയ്ഡ്']
  }
];

export function EmergencyServices() {
  const [searchQuery, setSearchQuery] = useState('');

  const getContactIcon = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'police': return <Shield className="w-5 h-5" />;
      case 'fire': return <Flame className="w-5 h-5" />;
      case 'ambulance': return <Ambulance className="w-5 h-5" />;
      case 'disaster': return <AlertTriangle className="w-5 h-5" />;
      default: return <Phone className="w-5 h-5" />;
    }
  };

  const getContactColor = (type: EmergencyContact['type']) => {
    switch (type) {
      case 'police': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'fire': return 'bg-red-100 text-red-700 border-red-300';
      case 'ambulance': return 'bg-green-100 text-green-700 border-green-300';
      case 'disaster': return 'bg-orange-100 text-orange-700 border-orange-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getAlertSeverityColor = (severity: EmergencyAlert['severity']) => {
    switch (severity) {
      case 'critical': return 'bg-red-500 text-white';
      case 'warning': return 'bg-orange-500 text-white';
      case 'info': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getAlertTypeIcon = (type: EmergencyAlert['type']) => {
    switch (type) {
      case 'disaster': return <AlertTriangle className="w-4 h-4" />;
      case 'weather': return <Wind className="w-4 h-4" />;
      case 'health': return <Ambulance className="w-4 h-4" />;
      case 'safety': return <Shield className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getProtocolIcon = (type: DisasterProtocol['type']) => {
    switch (type) {
      case 'flood': return <Droplets className="w-5 h-5" />;
      case 'fire': return <Flame className="w-5 h-5" />;
      case 'earthquake': return <AlertTriangle className="w-5 h-5" />;
      case 'cyclone': return <Wind className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const filteredContacts = mockEmergencyContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.nameMl.includes(searchQuery) ||
    contact.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAlerts = mockAlerts.filter(alert =>
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.titleMl.includes(searchQuery) ||
    alert.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#DC2626] to-[#B91C1C] p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-8 h-8" />
            <div>
              <h2>Emergency Services</h2>
              <p className="text-white/90 mt-1">എമർജൻസി സേവനങ്ങൾ</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Emergency Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button
          size="lg"
          className="bg-blue-600 hover:bg-blue-700 text-white h-20 flex-col gap-2"
          onClick={() => window.location.href = 'tel:100'}
        >
          <Shield className="w-6 h-6" />
          <span className="text-sm">Police</span>
          <span className="text-xs">100</span>
        </Button>
        <Button
          size="lg"
          className="bg-red-600 hover:bg-red-700 text-white h-20 flex-col gap-2"
          onClick={() => window.location.href = 'tel:101'}
        >
          <Flame className="w-6 h-6" />
          <span className="text-sm">Fire</span>
          <span className="text-xs">101</span>
        </Button>
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white h-20 flex-col gap-2"
          onClick={() => window.location.href = 'tel:108'}
        >
          <Ambulance className="w-6 h-6" />
          <span className="text-sm">Ambulance</span>
          <span className="text-xs">108</span>
        </Button>
        <Button
          size="lg"
          className="bg-orange-600 hover:bg-orange-700 text-white h-20 flex-col gap-2"
          onClick={() => window.location.href = 'tel:1091'}
        >
          <Phone className="w-6 h-6" />
          <span className="text-sm">Women</span>
          <span className="text-xs">1091</span>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="contacts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
          <TabsTrigger value="alerts">Alerts & Warnings</TabsTrigger>
          <TabsTrigger value="protocols">Disaster Protocols</TabsTrigger>
        </TabsList>

        {/* Emergency Contacts Tab */}
        <TabsContent value="contacts" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Emergency Contacts</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search contacts... / കോൺടാക്റ്റുകൾ തിരയുക..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredContacts.map((contact) => (
                  <Card key={contact.id} className="hover:shadow-lg transition-shadow border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-3 rounded-lg ${getContactColor(contact.type)}`}>
                          {getContactIcon(contact.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{contact.name}</h4>
                          <p className="text-sm text-muted-foreground mb-2">{contact.nameMl}</p>
                          {contact.description && (
                            <p className="text-xs text-muted-foreground mb-3">{contact.description}</p>
                          )}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <a
                                href={`tel:${contact.phone}`}
                                className="text-[#2D7A4F] font-semibold hover:underline"
                              >
                                {contact.phone}
                              </a>
                              {contact.available24x7 && (
                                <Badge variant="outline" className="text-xs bg-green-50 text-green-700">
                                  24x7
                                </Badge>
                              )}
                            </div>
                            {contact.alternatePhone && (
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="w-4 h-4" />
                                <span>{contact.alternatePhone}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span className="text-xs">{contact.address}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button
                              size="sm"
                              className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                              onClick={() => window.location.href = `tel:${contact.phone}`}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              Call Now
                            </Button>
                            {contact.email && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.location.href = `mailto:${contact.email}`}
                              >
                                <Mail className="w-4 h-4" />
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

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Alerts & Warnings</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                എമർജൻസി അറിയിപ്പുകളും മുന്നറിയിപ്പുകളും
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredAlerts.map((alert) => (
                  <Card key={alert.id} className={`border-l-4 ${
                    alert.severity === 'critical' ? 'border-red-500' :
                    alert.severity === 'warning' ? 'border-orange-500' :
                    'border-blue-500'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 rounded-lg ${getAlertSeverityColor(alert.severity)}`}>
                          {getAlertTypeIcon(alert.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg">{alert.title}</h4>
                            <Badge className={getAlertSeverityColor(alert.severity)}>
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{alert.titleMl}</p>
                          <p className="text-sm mb-3">{alert.message}</p>
                          <p className="text-sm text-muted-foreground mb-3">{alert.messageMl}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{alert.area} / {alert.areaMl}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>Issued: {alert.issuedAt}</span>
                            </div>
                            {alert.expiresAt && (
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>Expires: {alert.expiresAt}</span>
                              </div>
                            )}
                          </div>
                          {alert.actionRequired && alert.actionText && (
                            <Button size="sm" variant="outline" className="mt-2">
                              {alert.actionText} / {alert.actionTextMl}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Disaster Protocols Tab */}
        <TabsContent value="protocols" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Disaster Management Protocols</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                ദുരന്ത മാനേജ്മെന്റ് പ്രോട്ടോക്കോളുകൾ
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockProtocols.map((protocol) => (
                  <Card key={protocol.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-3 rounded-lg bg-orange-100 text-orange-700">
                          {getProtocolIcon(protocol.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-1">{protocol.title}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{protocol.titleMl}</p>
                          
                          <div className="space-y-3 mb-4">
                            {protocol.steps.map((step, idx) => (
                              <div key={idx} className="flex gap-3">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#2D7A4F] text-white flex items-center justify-center font-semibold text-sm">
                                  {idx + 1}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium mb-1">{step.step} / {step.stepMl}</h5>
                                  <p className="text-sm text-muted-foreground">{step.description}</p>
                                  <p className="text-sm text-muted-foreground">{step.descriptionMl}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="border-t pt-3 space-y-2">
                            <div>
                              <p className="text-xs font-medium mb-1">Emergency Contacts:</p>
                              <div className="flex flex-wrap gap-2">
                                {protocol.emergencyContacts.map((contact, idx) => (
                                  <Button
                                    key={idx}
                                    size="sm"
                                    variant="outline"
                                    onClick={() => window.location.href = `tel:${contact}`}
                                    className="text-xs"
                                  >
                                    <Phone className="w-3 h-3 mr-1" />
                                    {contact}
                                  </Button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium mb-1">Required Resources:</p>
                              <div className="flex flex-wrap gap-2">
                                {protocol.resources.map((resource, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {resource} / {protocol.resourcesMl[idx]}
                                  </Badge>
                                ))}
                              </div>
                            </div>
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

