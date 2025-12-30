import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  FileText, 
  Download, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  Search,
  Filter,
  FileCheck,
  Calendar,
  User,
  Award,
  Building2
} from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Certificate {
  id: string;
  type: 'birth' | 'death' | 'income' | 'caste' | 'residence' | 'domicile' | 'other';
  typeLabel: string;
  typeLabelMl: string;
  applicantName: string;
  applicantNameMl: string;
  certificateNumber: string;
  issueDate: string;
  expiryDate?: string;
  status: 'pending' | 'approved' | 'rejected' | 'issued';
  qrCode?: string;
  downloadUrl?: string;
  issuedBy: string;
  remarks?: string;
}

const mockCertificates: Certificate[] = [
  {
    id: 'cert1',
    type: 'birth',
    typeLabel: 'Birth Certificate',
    typeLabelMl: 'ജനന സർട്ടിഫിക്കറ്റ്',
    applicantName: 'Rajesh Kumar',
    applicantNameMl: 'രാജേഷ് കുമാർ',
    certificateNumber: 'BC/2024/001234',
    issueDate: '2024-02-10',
    status: 'issued',
    qrCode: 'QR_CODE_1234',
    downloadUrl: '/certificates/birth-cert-001234.pdf',
    issuedBy: 'Panchayat Office, Ward 5',
    remarks: 'Certificate issued successfully'
  },
  {
    id: 'cert2',
    type: 'income',
    typeLabel: 'Income Certificate',
    typeLabelMl: 'വരുമാന സർട്ടിഫിക്കറ്റ്',
    applicantName: 'Sreelatha Menon',
    applicantNameMl: 'ശ്രീലത മേനോൻ',
    certificateNumber: 'IC/2024/005678',
    issueDate: '2024-02-08',
    status: 'issued',
    qrCode: 'QR_CODE_5678',
    downloadUrl: '/certificates/income-cert-005678.pdf',
    issuedBy: 'Panchayat Office, Ward 5'
  },
  {
    id: 'cert3',
    type: 'caste',
    typeLabel: 'Caste Certificate',
    typeLabelMl: 'ജാതി സർട്ടിഫിക്കറ്റ്',
    applicantName: 'Anil George',
    applicantNameMl: 'അനിൽ ജോർജ്',
    certificateNumber: 'CC/2024/009012',
    issueDate: '2024-02-12',
    status: 'approved',
    issuedBy: 'Panchayat Office, Ward 5',
    remarks: 'Pending digital signature'
  },
  {
    id: 'cert4',
    type: 'residence',
    typeLabel: 'Residence Certificate',
    typeLabelMl: 'വസതി സർട്ടിഫിക്കറ്റ്',
    applicantName: 'Priya Nair',
    applicantNameMl: 'പ്രിയ നായർ',
    certificateNumber: 'RC/2024/003456',
    issueDate: '2024-02-11',
    status: 'pending',
    issuedBy: 'Panchayat Office, Ward 5',
    remarks: 'Under verification'
  }
];

const certificateTypes = [
  { value: 'birth', label: 'Birth Certificate', labelMl: 'ജനന സർട്ടിഫിക്കറ്റ്' },
  { value: 'death', label: 'Death Certificate', labelMl: 'മരണ സർട്ടിഫിക്കറ്റ്' },
  { value: 'income', label: 'Income Certificate', labelMl: 'വരുമാന സർട്ടിഫിക്കറ്റ്' },
  { value: 'caste', label: 'Caste Certificate', labelMl: 'ജാതി സർട്ടിഫിക്കറ്റ്' },
  { value: 'residence', label: 'Residence Certificate', labelMl: 'വസതി സർട്ടിഫിക്കറ്റ്' },
  { value: 'domicile', label: 'Domicile Certificate', labelMl: 'വാസസ്ഥല സർട്ടിഫിക്കറ്റ്' }
];

export function DigitalCertificates() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [newApplication, setNewApplication] = useState({
    type: 'birth' as Certificate['type'],
    applicantName: '',
    applicantNameMl: '',
    phone: '',
    email: '',
    address: '',
    addressMl: ''
  });

  const handleDownload = (certificate: Certificate) => {
    if (certificate.downloadUrl) {
      // In a real app, this would download the actual certificate
      console.log('Downloading certificate:', certificate.certificateNumber);
      const link = document.createElement('a');
      link.href = certificate.downloadUrl;
      link.download = `${certificate.typeLabel}-${certificate.certificateNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleVerify = (qrCode: string) => {
    // In a real app, this would verify the certificate via QR code
    alert(`Verifying certificate with QR Code: ${qrCode}`);
  };

  const handleApply = () => {
    if (!newApplication.applicantName || !newApplication.type) {
      alert('Please fill in all required fields');
      return;
    }

    // In a real app, this would submit the application
    console.log('Certificate application submitted:', newApplication);
    
    // Reset form
    setNewApplication({
      type: 'birth',
      applicantName: '',
      applicantNameMl: '',
      phone: '',
      email: '',
      address: '',
      addressMl: ''
    });
    setShowApplyDialog(false);
  };

  const getStatusColor = (status: Certificate['status']) => {
    switch (status) {
      case 'issued': return 'bg-green-100 text-green-700 border-green-300';
      case 'approved': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesSearch = 
      cert.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certificateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.typeLabel.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'all' || cert.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2>Digital Certificates</h2>
              <p className="text-white/90 mt-1">ഡിജിറ്റൽ സർട്ടിഫിക്കറ്റുകൾ</p>
            </div>
            <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <FileCheck className="w-4 h-4 mr-2" />
                  Apply for Certificate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Apply for Certificate</DialogTitle>
                  <DialogDescription>Apply for a new digital certificate</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Certificate Type *</Label>
                    <Select value={newApplication.type} onValueChange={(value) => setNewApplication({ ...newApplication, type: value as Certificate['type'] })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {certificateTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label} / {type.labelMl}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Applicant Name (English) *</Label>
                    <Input
                      placeholder="Enter full name"
                      value={newApplication.applicantName}
                      onChange={(e) => setNewApplication({ ...newApplication, applicantName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Applicant Name (Malayalam) *</Label>
                    <Input
                      placeholder="പൂർണ്ണ പേര് നൽകുക"
                      value={newApplication.applicantNameMl}
                      onChange={(e) => setNewApplication({ ...newApplication, applicantNameMl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone Number *</Label>
                    <Input
                      placeholder="+91 98765 43210"
                      value={newApplication.phone}
                      onChange={(e) => setNewApplication({ ...newApplication, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={newApplication.email}
                      onChange={(e) => setNewApplication({ ...newApplication, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address (English)</Label>
                    <Input
                      placeholder="Enter address"
                      value={newApplication.address}
                      onChange={(e) => setNewApplication({ ...newApplication, address: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Address (Malayalam)</Label>
                    <Input
                      placeholder="വിലാസം നൽകുക"
                      value={newApplication.addressMl}
                      onChange={(e) => setNewApplication({ ...newApplication, addressMl: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleApply} className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]">
                      <FileCheck className="w-4 h-4 mr-2" />
                      Submit Application
                    </Button>
                    <Button variant="outline" onClick={() => setShowApplyDialog(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search certificates... / സർട്ടിഫിക്കറ്റുകൾ തിരയുക..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {certificateTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Certificates List */}
      <div className="space-y-4">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-6 h-6 text-[#2D7A4F]" />
                    <div>
                      <h4 className="font-semibold text-lg">{certificate.typeLabel}</h4>
                      <p className="text-sm text-muted-foreground">{certificate.typeLabelMl}</p>
                    </div>
                    <Badge className={getStatusColor(certificate.status)}>
                      {certificate.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Applicant:</span>
                      <span className="font-medium">{certificate.applicantName}</span>
                      <span className="text-muted-foreground">/ {certificate.applicantNameMl}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Certificate No:</span>
                      <span className="font-medium">{certificate.certificateNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Issue Date:</span>
                      <span>{certificate.issueDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Issued By:</span>
                      <span>{certificate.issuedBy}</span>
                    </div>
                    {certificate.remarks && (
                      <div className="text-xs text-muted-foreground mt-2 p-2 bg-muted rounded">
                        {certificate.remarks}
                      </div>
                    )}
                  </div>
                </div>
                
                {certificate.qrCode && (
                  <div className="flex flex-col items-center gap-2 ml-4">
                    <div className="w-20 h-20 bg-white border-2 border-gray-300 rounded flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-gray-400" />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleVerify(certificate.qrCode!)}
                      className="text-xs"
                    >
                      Verify
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-3 border-t">
                {certificate.status === 'issued' && certificate.downloadUrl && (
                  <Button
                    size="sm"
                    className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                    onClick={() => handleDownload(certificate)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                )}
                {certificate.qrCode && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVerify(certificate.qrCode!)}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Verify QR
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No certificates found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

