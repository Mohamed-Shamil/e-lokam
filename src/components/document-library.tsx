import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  FileText, 
  Download, 
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  FileCheck,
  Folder,
  File
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface Document {
  id: string;
  title: string;
  titleMl: string;
  category: 'circular' | 'resolution' | 'order' | 'notification' | 'report' | 'other';
  categoryLabel: string;
  categoryLabelMl: string;
  description?: string;
  descriptionMl?: string;
  fileUrl: string;
  fileSize: string;
  format: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx';
  uploadDate: string;
  uploadedBy: string;
  downloadCount: number;
  version: string;
  tags: string[];
}

const mockDocuments: Document[] = [
  {
    id: 'doc1',
    title: 'Gram Sabha Resolution - January 2024',
    titleMl: 'ഗ്രാമസഭാ പ്രമേയം - ജനുവരി 2024',
    category: 'resolution',
    categoryLabel: 'Resolution',
    categoryLabelMl: 'പ്രമേയം',
    description: 'Resolution passed in Gram Sabha meeting regarding road development',
    descriptionMl: 'റോഡ് വികസനത്തെക്കുറിച്ച് ഗ്രാമസഭാ യോഗത്തിൽ പാസാക്കിയ പ്രമേയം',
    fileUrl: '/documents/gram-sabha-resolution-jan-2024.pdf',
    fileSize: '2.5 MB',
    format: 'pdf',
    uploadDate: '2024-01-20',
    uploadedBy: 'Panchayat Secretary',
    downloadCount: 145,
    version: '1.0',
    tags: ['Gram Sabha', 'Road Development', 'Resolution']
  },
  {
    id: 'doc2',
    title: 'Circular - Water Supply Schedule',
    titleMl: 'സർക്കുലാർ - ജല വിതരണ സമയപ്പട്ടിക',
    category: 'circular',
    categoryLabel: 'Circular',
    categoryLabelMl: 'സർക്കുലാർ',
    description: 'Official circular regarding water supply schedule for February 2024',
    descriptionMl: 'ഫെബ്രുവരി 2024-നുള്ള ജല വിതരണ സമയപ്പട്ടികയെക്കുറിച്ചുള്ള ഔദ്യോഗിക സർക്കുലാർ',
    fileUrl: '/documents/water-supply-schedule-feb-2024.pdf',
    fileSize: '1.2 MB',
    format: 'pdf',
    uploadDate: '2024-02-01',
    uploadedBy: 'Water Authority',
    downloadCount: 320,
    version: '1.0',
    tags: ['Water Supply', 'Schedule', 'Circular']
  },
  {
    id: 'doc3',
    title: 'Order - Building Permit Guidelines',
    titleMl: 'ഉത്തരവ് - കെട്ടിട പെർമിറ്റ് മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    category: 'order',
    categoryLabel: 'Order',
    categoryLabelMl: 'ഉത്തരവ്',
    description: 'Official order regarding new building permit application guidelines',
    descriptionMl: 'പുതിയ കെട്ടിട പെർമിറ്റ് അപേക്ഷ മാർഗ്ഗനിർദ്ദേശങ്ങളെക്കുറിച്ചുള്ള ഔദ്യോഗിക ഉത്തരവ്',
    fileUrl: '/documents/building-permit-guidelines-2024.pdf',
    fileSize: '3.8 MB',
    format: 'pdf',
    uploadDate: '2024-02-05',
    uploadedBy: 'Planning Department',
    downloadCount: 89,
    version: '2.0',
    tags: ['Building Permit', 'Guidelines', 'Order']
  },
  {
    id: 'doc4',
    title: 'Annual Report 2023-24',
    titleMl: 'വാർഷിക റിപ്പോർട്ട് 2023-24',
    category: 'report',
    categoryLabel: 'Report',
    categoryLabelMl: 'റിപ്പോർട്ട്',
    description: 'Annual performance report of the panchayat for financial year 2023-24',
    descriptionMl: '2023-24 സാമ്പത്തിക വർഷത്തിലെ പഞ്ചായത്തിന്റെ വാർഷിക പ്രകടന റിപ്പോർട്ട്',
    fileUrl: '/documents/annual-report-2023-24.pdf',
    fileSize: '5.2 MB',
    format: 'pdf',
    uploadDate: '2024-01-31',
    uploadedBy: 'Panchayat President',
    downloadCount: 256,
    version: '1.0',
    tags: ['Annual Report', 'Performance', '2023-24']
  },
  {
    id: 'doc5',
    title: 'Notification - Property Tax Collection',
    titleMl: 'അറിയിപ്പ് - സ്വത്ത് നികുതി ശേഖരണം',
    category: 'notification',
    categoryLabel: 'Notification',
    categoryLabelMl: 'അറിയിപ്പ്',
    description: 'Public notification regarding property tax collection schedule',
    descriptionMl: 'സ്വത്ത് നികുതി ശേഖരണ സമയപ്പട്ടികയെക്കുറിച്ചുള്ള പൊതു അറിയിപ്പ്',
    fileUrl: '/documents/property-tax-notification-2024.pdf',
    fileSize: '890 KB',
    format: 'pdf',
    uploadDate: '2024-02-10',
    uploadedBy: 'Revenue Department',
    downloadCount: 412,
    version: '1.0',
    tags: ['Property Tax', 'Collection', 'Notification']
  }
];

export function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const handleDownload = (document: Document) => {
    // In a real app, this would download the actual document
    console.log('Downloading document:', document.title);
    const link = document.createElement('a');
    link.href = document.fileUrl;
    link.download = `${document.title}.${document.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (document: Document) => {
    // In a real app, this would open the document in a viewer
    window.open(document.fileUrl, '_blank');
  };

  const getCategoryColor = (category: Document['category']) => {
    switch (category) {
      case 'circular': return 'bg-blue-100 text-blue-700';
      case 'resolution': return 'bg-green-100 text-green-700';
      case 'order': return 'bg-purple-100 text-purple-700';
      case 'notification': return 'bg-orange-100 text-orange-700';
      case 'report': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.titleMl.includes(searchQuery) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesFormat = selectedFormat === 'all' || doc.format === selectedFormat;
    
    return matchesSearch && matchesCategory && matchesFormat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Folder className="w-8 h-8" />
            <div>
              <h2>Document Library</h2>
              <p className="text-white/90 mt-1">രേഖാ ലൈബ്രറി</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents... / രേഖകൾ തിരയുക..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="circular">Circular / സർക്കുലാർ</SelectItem>
                <SelectItem value="resolution">Resolution / പ്രമേയം</SelectItem>
                <SelectItem value="order">Order / ഉത്തരവ്</SelectItem>
                <SelectItem value="notification">Notification / അറിയിപ്പ്</SelectItem>
                <SelectItem value="report">Report / റിപ്പോർട്ട്</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="doc">DOC</SelectItem>
                <SelectItem value="docx">DOCX</SelectItem>
                <SelectItem value="xls">XLS</SelectItem>
                <SelectItem value="xlsx">XLSX</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-6 h-6 text-[#2D7A4F]" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{document.title}</h4>
                      <p className="text-sm text-muted-foreground">{document.titleMl}</p>
                    </div>
                    <Badge className={getCategoryColor(document.category)}>
                      {document.categoryLabel}
                    </Badge>
                  </div>
                  
                  {document.description && (
                    <p className="text-sm text-muted-foreground mb-3">
                      {document.description} / {document.descriptionMl}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-3">
                    {document.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Upload Date</p>
                        <p className="font-medium">{document.uploadDate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Uploaded By</p>
                        <p className="font-medium">{document.uploadedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Downloads</p>
                        <p className="font-medium">{document.downloadCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <File className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-muted-foreground text-xs">Size / Format</p>
                        <p className="font-medium">{document.fileSize} • {document.format.toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleView(document)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
                <Button
                  className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                  onClick={() => handleDownload(document)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Folder className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No documents found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

