import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  Lightbulb, 
  Search,
  Plus,
  ThumbsUp,
  MessageSquare,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  AlertCircle,
  Filter
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

interface Suggestion {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  category: 'infrastructure' | 'welfare' | 'education' | 'health' | 'environment' | 'other';
  categoryLabel: string;
  categoryLabelMl: string;
  submittedBy: string;
  submittedByMl: string;
  submittedAt: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected' | 'implemented';
  upvotes: number;
  comments: number;
  response?: string;
  responseMl?: string;
  respondedBy?: string;
  respondedAt?: string;
  priority: 'low' | 'medium' | 'high';
}

const mockSuggestions: Suggestion[] = [
  {
    id: 'sug1',
    title: 'Install Street Lights in Ward 5',
    titleMl: 'വാർഡ് 5-ൽ തെരുവ് വിളക്കുകൾ സ്ഥാപിക്കുക',
    description: 'Request to install LED street lights in the dark areas of Ward 5 for better safety and security.',
    descriptionMl: 'സുരക്ഷയ്ക്കും സുരക്ഷയ്ക്കും വാർഡ് 5-ലെ ഇരുണ്ട പ്രദേശങ്ങളിൽ LED തെരുവ് വിളക്കുകൾ സ്ഥാപിക്കാൻ അഭ്യർത്ഥിക്കുന്നു.',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure',
    categoryLabelMl: 'അടിസ്ഥാന സൗകര്യങ്ങൾ',
    submittedBy: 'Rajesh Kumar',
    submittedByMl: 'രാജേഷ് കുമാർ',
    submittedAt: '2024-02-10',
    status: 'under-review',
    upvotes: 45,
    comments: 12,
    priority: 'high',
    response: 'Under consideration by the panchayat committee',
    responseMl: 'പഞ്ചായത്ത് കമ്മിറ്റിയുടെ പരിഗണനയിലാണ്',
    respondedBy: 'Ward Member',
    respondedAt: '2024-02-12'
  },
  {
    id: 'sug2',
    title: 'Weekly Health Checkup Camp',
    titleMl: 'വാരാന്തര ആരോഗ്യ പരിശോധന ക്യാമ്പ്',
    description: 'Suggest organizing weekly health checkup camps for senior citizens in the ward.',
    descriptionMl: 'വാർഡിലെ വൃദ്ധരുടെ വാരാന്തര ആരോഗ്യ പരിശോധന ക്യാമ്പുകൾ ആഘോഷിക്കാൻ നിർദ്ദേശിക്കുന്നു.',
    category: 'health',
    categoryLabel: 'Health',
    categoryLabelMl: 'ആരോഗ്യം',
    submittedBy: 'Sreelatha Menon',
    submittedByMl: 'ശ്രീലത മേനോൻ',
    submittedAt: '2024-02-08',
    status: 'approved',
    upvotes: 78,
    comments: 23,
    priority: 'medium',
    response: 'Approved. Health camp will be organized every Saturday starting from March 2024.',
    responseMl: 'അംഗീകരിച്ചു. 2024 മാർച്ച് മുതൽ എല്ലാ ശനിയാഴ്ചയും ആരോഗ്യ ക്യാമ്പ് ആഘോഷിക്കും.',
    respondedBy: 'Block Panchayat Member',
    respondedAt: '2024-02-11'
  },
  {
    id: 'sug3',
    title: 'Waste Segregation Awareness Program',
    titleMl: 'മാലിന്യ വേർതിരിച്ചെടുക്കൽ അവബോധ പദ്ധതി',
    description: 'Conduct awareness programs about waste segregation and recycling in the community.',
    descriptionMl: 'കമ്മ്യൂണിറ്റിയിൽ മാലിന്യ വേർതിരിച്ചെടുക്കലും റീസൈക്ലിംഗും സംബന്ധിച്ച അവബോധ പരിപാടികൾ നടത്താൻ നിർദ്ദേശിക്കുന്നു.',
    category: 'environment',
    categoryLabel: 'Environment',
    categoryLabelMl: 'പരിസ്ഥിതി',
    submittedBy: 'Anil George',
    submittedByMl: 'അനിൽ ജോർജ്',
    submittedAt: '2024-02-12',
    status: 'pending',
    upvotes: 32,
    comments: 8,
    priority: 'medium'
  },
  {
    id: 'sug4',
    title: 'Digital Library for Students',
    titleMl: 'വിദ്യാർത്ഥികൾക്കുള്ള ഡിജിറ്റൽ ലൈബ്രറി',
    description: 'Set up a digital library with computers and internet access for students in the community center.',
    descriptionMl: 'കമ്മ്യൂണിറ്റി സെന്ററിൽ വിദ്യാർത്ഥികൾക്കായി കമ്പ്യൂട്ടറുകളും ഇന്റർനെറ്റ് ആക്സസും ഉള്ള ഡിജിറ്റൽ ലൈബ്രറി സ്ഥാപിക്കാൻ നിർദ്ദേശിക്കുന്നു.',
    category: 'education',
    categoryLabel: 'Education',
    categoryLabelMl: 'വിദ്യാഭ്യാസം',
    submittedBy: 'Priya Nair',
    submittedByMl: 'പ്രിയ നായർ',
    submittedAt: '2024-02-11',
    status: 'implemented',
    upvotes: 156,
    comments: 45,
    priority: 'high',
    response: 'Digital library has been set up and is now operational at the community center.',
    responseMl: 'ഡിജിറ്റൽ ലൈബ്രറി സ്ഥാപിച്ച് കമ്മ്യൂണിറ്റി സെന്ററിൽ ഇപ്പോൾ പ്രവർത്തനക്ഷമമാണ്.',
    respondedBy: 'District Panchayat Member',
    respondedAt: '2024-02-13'
  }
];

export function Suggestions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [newSuggestion, setNewSuggestion] = useState({
    title: '',
    titleMl: '',
    description: '',
    descriptionMl: '',
    category: 'infrastructure' as Suggestion['category'],
    priority: 'medium' as Suggestion['priority']
  });

  const handleSubmit = () => {
    if (!newSuggestion.title || !newSuggestion.description) {
      alert('Please fill in all required fields');
      return;
    }

    // In a real app, this would submit to the backend
    console.log('Suggestion submitted:', newSuggestion);
    
    // Reset form
    setNewSuggestion({
      title: '',
      titleMl: '',
      description: '',
      descriptionMl: '',
      category: 'infrastructure',
      priority: 'medium'
    });
    setShowSubmitDialog(false);
    alert('Suggestion submitted successfully!');
  };

  const handleUpvote = (suggestionId: string) => {
    // In a real app, this would update the upvote count
    console.log('Upvoted suggestion:', suggestionId);
  };

  const getStatusColor = (status: Suggestion['status']) => {
    switch (status) {
      case 'implemented': return 'bg-green-100 text-green-700 border-green-300';
      case 'approved': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'under-review': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'pending': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority: Suggestion['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredSuggestions = mockSuggestions.filter(suggestion => {
    const matchesSearch = 
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.titleMl.includes(searchQuery) ||
      suggestion.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || suggestion.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || suggestion.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-8 h-8" />
              <div>
                <h2>Suggestions & Feedback</h2>
                <p className="text-white/90 mt-1">നിർദ്ദേശങ്ങളും ഫീഡ്‌ബാക്കും</p>
              </div>
            </div>
            <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
              <DialogTrigger asChild>
                <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit Suggestion
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Submit a Suggestion</DialogTitle>
                  <DialogDescription>Share your ideas and suggestions for community improvement</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title (English) *</Label>
                    <Input
                      placeholder="Enter suggestion title"
                      value={newSuggestion.title}
                      onChange={(e) => setNewSuggestion({ ...newSuggestion, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Title (Malayalam) *</Label>
                    <Input
                      placeholder="നിർദ്ദേശ ശീർഷകം നൽകുക"
                      value={newSuggestion.titleMl}
                      onChange={(e) => setNewSuggestion({ ...newSuggestion, titleMl: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category *</Label>
                    <Select value={newSuggestion.category} onValueChange={(value) => setNewSuggestion({ ...newSuggestion, category: value as Suggestion['category'] })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infrastructure">Infrastructure / അടിസ്ഥാന സൗകര്യങ്ങൾ</SelectItem>
                        <SelectItem value="welfare">Welfare / ക്ഷേമം</SelectItem>
                        <SelectItem value="education">Education / വിദ്യാഭ്യാസം</SelectItem>
                        <SelectItem value="health">Health / ആരോഗ്യം</SelectItem>
                        <SelectItem value="environment">Environment / പരിസ്ഥിതി</SelectItem>
                        <SelectItem value="other">Other / മറ്റുള്ളവ</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Description (English) *</Label>
                    <Textarea
                      placeholder="Describe your suggestion in detail"
                      value={newSuggestion.description}
                      onChange={(e) => setNewSuggestion({ ...newSuggestion, description: e.target.value })}
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description (Malayalam) *</Label>
                    <Textarea
                      placeholder="നിർദ്ദേശം വിശദമായി വിവരിക്കുക"
                      value={newSuggestion.descriptionMl}
                      onChange={(e) => setNewSuggestion({ ...newSuggestion, descriptionMl: e.target.value })}
                      rows={5}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select value={newSuggestion.priority} onValueChange={(value) => setNewSuggestion({ ...newSuggestion, priority: value as Suggestion['priority'] })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <Button onClick={handleSubmit} className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Submit Suggestion
                    </Button>
                    <Button variant="outline" onClick={() => setShowSubmitDialog(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
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
                placeholder="Search suggestions... / നിർദ്ദേശങ്ങൾ തിരയുക..."
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
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="welfare">Welfare</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="implemented">Implemented</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions List */}
      <div className="space-y-4">
        {filteredSuggestions.map((suggestion) => (
          <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="w-6 h-6 text-yellow-500" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{suggestion.title}</h4>
                      <p className="text-sm text-muted-foreground">{suggestion.titleMl}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(suggestion.priority)}`} />
                      <Badge className={getStatusColor(suggestion.status)}>
                        {suggestion.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {suggestion.description} / {suggestion.descriptionMl}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">By:</span>
                      <span className="font-medium">{suggestion.submittedBy}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{suggestion.submittedAt}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {suggestion.categoryLabel}
                    </Badge>
                  </div>

                  {suggestion.response && (
                    <div className="p-3 bg-blue-50 border-l-4 border-blue-500 rounded mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Official Response</span>
                      </div>
                      <p className="text-sm text-blue-800">{suggestion.response}</p>
                      <p className="text-sm text-blue-700 mt-1">{suggestion.responseMl}</p>
                      {suggestion.respondedBy && (
                        <p className="text-xs text-blue-600 mt-2">
                          - {suggestion.respondedBy} on {suggestion.respondedAt}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpvote(suggestion.id)}
                    className="border-[#2D7A4F] text-[#2D7A4F] hover:bg-[#2D7A4F] hover:text-white"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" />
                    {suggestion.upvotes}
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageSquare className="w-4 h-4" />
                    <span>{suggestion.comments} comments</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSuggestions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No suggestions found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

