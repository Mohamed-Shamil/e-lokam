import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  FileText, 
  Download, 
  Share2, 
  Plus, 
  Search, 
  Eye,
  Edit,
  Trash2,
  Send,
  FileCheck,
  Calendar,
  User
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

interface Form {
  id: string;
  name: string;
  nameMl: string;
  category: string;
  categoryMl: string;
  description: string;
  descriptionMl: string;
  fileUrl: string;
  fileSize: string;
  format: 'pdf' | 'doc' | 'docx';
  downloadCount: number;
  lastUpdated: string;
  createdBy: string;
  isCommon: boolean;
}

const mockForms: Form[] = [
  {
    id: 'form1',
    name: 'Birth Certificate Application',
    nameMl: 'ജനന സർട്ടിഫിക്കറ്റ് അപേക്ഷ',
    category: 'Civil Registration',
    categoryMl: 'സിവിൽ രജിസ്ട്രേഷൻ',
    description: 'Application form for obtaining birth certificate',
    descriptionMl: 'ജനന സർട്ടിഫിക്കറ്റ് നേടുന്നതിനുള്ള അപേക്ഷ ഫോം',
    fileUrl: '/forms/birth-certificate.pdf',
    fileSize: '245 KB',
    format: 'pdf',
    downloadCount: 1250,
    lastUpdated: '2024-01-15',
    createdBy: 'Panchayat Office',
    isCommon: true
  },
  {
    id: 'form2',
    name: 'Death Certificate Application',
    nameMl: 'മരണ സർട്ടിഫിക്കറ്റ് അപേക്ഷ',
    category: 'Civil Registration',
    categoryMl: 'സിവിൽ രജിസ്ട്രേഷൻ',
    description: 'Application form for obtaining death certificate',
    descriptionMl: 'മരണ സർട്ടിഫിക്കറ്റ് നേടുന്നതിനുള്ള അപേക്ഷ ഫോം',
    fileUrl: '/forms/death-certificate.pdf',
    fileSize: '238 KB',
    format: 'pdf',
    downloadCount: 890,
    lastUpdated: '2024-01-10',
    createdBy: 'Panchayat Office',
    isCommon: true
  },
  {
    id: 'form3',
    name: 'Income Certificate Application',
    nameMl: 'വരുമാന സർട്ടിഫിക്കറ്റ് അപേക്ഷ',
    category: 'Certificates',
    categoryMl: 'സർട്ടിഫിക്കറ്റുകൾ',
    description: 'Application form for income certificate',
    descriptionMl: 'വരുമാന സർട്ടിഫിക്കറ്റിനുള്ള അപേക്ഷ ഫോം',
    fileUrl: '/forms/income-certificate.pdf',
    fileSize: '312 KB',
    format: 'pdf',
    downloadCount: 2100,
    lastUpdated: '2024-02-01',
    createdBy: 'Panchayat Office',
    isCommon: true
  },
  {
    id: 'form4',
    name: 'Caste Certificate Application',
    nameMl: 'ജാതി സർട്ടിഫിക്കറ്റ് അപേക്ഷ',
    category: 'Certificates',
    categoryMl: 'സർട്ടിഫിക്കറ്റുകൾ',
    description: 'Application form for caste certificate',
    descriptionMl: 'ജാതി സർട്ടിഫിക്കറ്റിനുള്ള അപേക്ഷ ഫോം',
    fileUrl: '/forms/caste-certificate.pdf',
    fileSize: '298 KB',
    format: 'pdf',
    downloadCount: 1560,
    lastUpdated: '2024-01-20',
    createdBy: 'Panchayat Office',
    isCommon: true
  },
  {
    id: 'form5',
    name: 'Building Permit Application',
    nameMl: 'കെട്ടിട പെർമിറ്റ് അപേക്ഷ',
    category: 'Construction',
    categoryMl: 'നിർമ്മാണം',
    description: 'Application form for building construction permit',
    descriptionMl: 'കെട്ടിട നിർമ്മാണ പെർമിറ്റിനുള്ള അപേക്ഷ ഫോം',
    fileUrl: '/forms/building-permit.pdf',
    fileSize: '456 KB',
    format: 'pdf',
    downloadCount: 980,
    lastUpdated: '2024-02-10',
    createdBy: 'Panchayat Office',
    isCommon: true
  },
  {
    id: 'form6',
    name: 'Water Connection Application',
    nameMl: 'ജല കണക്ഷൻ അപേക്ഷ',
    category: 'Utilities',
    categoryMl: 'യൂട്ടിലിറ്റികൾ',
    description: 'Application form for new water connection',
    descriptionMl: 'പുതിയ ജല കണക്ഷനിനുള്ള അപേക്ഷ ഫോം',
    fileUrl: '/forms/water-connection.pdf',
    fileSize: '234 KB',
    format: 'pdf',
    downloadCount: 1450,
    lastUpdated: '2024-01-25',
    createdBy: 'Panchayat Office',
    isCommon: true
  },
  {
    id: 'form7',
    name: 'Electricity Connection Application',
    nameMl: 'വൈദ്യുതി കണക്ഷൻ അപേക്ഷ',
    category: 'Utilities',
    categoryMl: 'യൂട്ടിലിറ്റികൾ',
    description: 'Application form for new electricity connection',
    descriptionMl: 'പുതിയ വൈദ്യുതി കണക്ഷനിനുള്ള അപേക്ഷ ഫോം',
    fileUrl: '/forms/electricity-connection.pdf',
    fileSize: '267 KB',
    format: 'pdf',
    downloadCount: 1120,
    lastUpdated: '2024-02-05',
    createdBy: 'Panchayat Office',
    isCommon: true
  },
  {
    id: 'form8',
    name: 'Ration Card Application',
    nameMl: 'റേഷൻ കാർഡ് അപേക്ഷ',
    category: 'Food & Supplies',
    categoryMl: 'ഭക്ഷണവും വിതരണവും',
    description: 'Application form for ration card',
    descriptionMl: 'റേഷൻ കാർഡിനുള്ള അപേക്ഷ ഫോം',
    fileUrl: '/forms/ration-card.pdf',
    fileSize: '289 KB',
    format: 'pdf',
    downloadCount: 1890,
    lastUpdated: '2024-01-30',
    createdBy: 'Panchayat Office',
    isCommon: true
  }
];

interface FormsManagementProps {
  canAddForms?: boolean;
}

export function FormsManagement({ canAddForms = true }: FormsManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newForm, setNewForm] = useState({
    name: '',
    nameMl: '',
    category: '',
    description: '',
    descriptionMl: '',
    file: null as File | null
  });

  const categories = [
    { value: 'all', label: 'All Categories', labelMl: 'എല്ലാ വിഭാഗങ്ങളും' },
    { value: 'Civil Registration', label: 'Civil Registration', labelMl: 'സിവിൽ രജിസ്ട്രേഷൻ' },
    { value: 'Certificates', label: 'Certificates', labelMl: 'സർട്ടിഫിക്കറ്റുകൾ' },
    { value: 'Construction', label: 'Construction', labelMl: 'നിർമ്മാണം' },
    { value: 'Utilities', label: 'Utilities', labelMl: 'യൂട്ടിലിറ്റികൾ' },
    { value: 'Food & Supplies', label: 'Food & Supplies', labelMl: 'ഭക്ഷണവും വിതരണവും' }
  ];

  const handleDownload = (form: Form) => {
    // In a real app, this would download the actual file
    console.log('Downloading form:', form.name);
    // Create a download link
    const link = document.createElement('a');
    link.href = form.fileUrl;
    link.download = `${form.name}.${form.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (form: Form) => {
    if (navigator.share) {
      navigator.share({
        title: form.name,
        text: form.description,
        url: window.location.href
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${form.name} - ${window.location.origin}${form.fileUrl}`);
      alert('Link copied to clipboard!');
    }
  };

  const handleSend = (form: Form) => {
    // In a real app, this would open a dialog to send via email/WhatsApp
    const message = `Please find the ${form.name} form: ${window.location.origin}${form.fileUrl}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleExport = (form: Form) => {
    // Export as PDF or other format
    handleDownload(form);
  };

  const handleAddForm = () => {
    if (!newForm.name || !newForm.category || !newForm.file) {
      alert('Please fill in all required fields');
      return;
    }

    // In a real app, this would upload to server
    console.log('Adding new form:', newForm);
    
    // Reset form
    setNewForm({
      name: '',
      nameMl: '',
      category: '',
      description: '',
      descriptionMl: '',
      file: null
    });
    setShowAddForm(false);
  };

  const filteredForms = mockForms.filter(form => {
    const matchesSearch = 
      form.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      form.nameMl.includes(searchQuery) ||
      form.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2>{canAddForms ? 'Forms Management' : 'Panchayat Forms'}</h2>
                <p className="text-white/90 mt-1">{canAddForms ? 'ഫോം മാനേജ്മെന്റ്' : 'പഞ്ചായത്ത് ഫോമുകൾ'}</p>
              </div>
              {canAddForms && (
                <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Form
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Form</DialogTitle>
                  <DialogDescription>Upload a new panchayat form</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="formName">Form Name (English) *</Label>
                    <Input
                      id="formName"
                      placeholder="Enter form name"
                      value={newForm.name}
                      onChange={(e) => setNewForm({ ...newForm, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="formNameMl">Form Name (Malayalam) *</Label>
                    <Input
                      id="formNameMl"
                      placeholder="ഫോം പേര് നൽകുക"
                      value={newForm.nameMl}
                      onChange={(e) => setNewForm({ ...newForm, nameMl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="formCategory">Category *</Label>
                    <Select value={newForm.category} onValueChange={(value) => setNewForm({ ...newForm, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map(cat => (
                          <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="formDescription">Description (English)</Label>
                    <Textarea
                      id="formDescription"
                      placeholder="Enter form description"
                      value={newForm.description}
                      onChange={(e) => setNewForm({ ...newForm, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="formDescriptionMl">Description (Malayalam)</Label>
                    <Textarea
                      id="formDescriptionMl"
                      placeholder="ഫോം വിവരണം നൽകുക"
                      value={newForm.descriptionMl}
                      onChange={(e) => setNewForm({ ...newForm, descriptionMl: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="formFile">Form File (PDF/DOC) *</Label>
                    <Input
                      id="formFile"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setNewForm({ ...newForm, file });
                        }
                      }}
                    />
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleAddForm} className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]">
                      <FileCheck className="w-4 h-4 mr-2" />
                      Upload Form
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                  </div>
                </DialogContent>
              </Dialog>
              )}
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
                placeholder="Search forms... / ഫോമുകൾ തിരയുക..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label} / {cat.labelMl}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredForms.map((form) => (
          <Card key={form.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base mb-1">{form.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mb-2">{form.nameMl}</p>
                  <Badge variant="outline" className="text-xs">
                    {form.category}
                  </Badge>
                </div>
                <FileText className="w-8 h-8 text-[#2D7A4F] shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {form.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                <div className="flex items-center gap-1">
                  <Download className="w-3 h-3" />
                  <span>{form.downloadCount} downloads</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{form.lastUpdated}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <User className="w-3 h-3" />
                <span>{form.createdBy}</span>
                <span>•</span>
                <span>{form.fileSize}</span>
                <span>•</span>
                <span className="uppercase">{form.format}</span>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDownload(form)}
                  className="flex-1 border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white text-xs"
                >
                  <Download className="w-3 h-3 mr-1" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleShare(form)}
                  className="flex-1 text-xs"
                >
                  <Share2 className="w-3 h-3 mr-1" />
                  Share
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSend(form)}
                  className="text-xs"
                >
                  <Send className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleExport(form)}
                  className="text-xs"
                >
                  <FileText className="w-3 h-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No forms found matching your search</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

