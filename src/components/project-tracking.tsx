import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { 
  Building2, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Camera,
  Search,
  Filter,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

interface Project {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  category: 'infrastructure' | 'water' | 'road' | 'building' | 'other';
  categoryLabel: string;
  categoryLabelMl: string;
  location: string;
  locationMl: string;
  budget: number;
  spent: number;
  startDate: string;
  expectedCompletion: string;
  status: 'planned' | 'in-progress' | 'completed' | 'on-hold';
  progress: number;
  images: string[];
  milestones: Array<{
    id: string;
    title: string;
    titleMl: string;
    date: string;
    status: 'completed' | 'pending';
  }>;
  assignedTo: string;
  lastUpdate: string;
}

const mockProjects: Project[] = [
  {
    id: 'proj1',
    title: 'Road Improvement - MG Road',
    titleMl: 'റോഡ് മെച്ചപ്പെടുത്തൽ - എംജി റോഡ്',
    description: 'Complete road renovation with new asphalt and drainage system',
    descriptionMl: 'പുതിയ ആസ്ഫാൽറ്റും ഡ്രെയിനേജ് സിസ്റ്റവും ഉപയോഗിച്ച് പൂർണ്ണ റോഡ് നവീകരണം',
    category: 'road',
    categoryLabel: 'Road Infrastructure',
    categoryLabelMl: 'റോഡ് അടിസ്ഥാന സൗകര്യങ്ങൾ',
    location: 'Ward 5, MG Road',
    locationMl: 'വാർഡ് 5, എംജി റോഡ്',
    budget: 500000,
    spent: 450000,
    startDate: '2024-01-15',
    expectedCompletion: '2024-03-15',
    status: 'in-progress',
    progress: 75,
    images: [
      'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&h=450&fit=crop'
    ],
    milestones: [
      { id: 'm1', title: 'Site Preparation', titleMl: 'സൈറ്റ് തയ്യാറെടുപ്പ്', date: '2024-01-20', status: 'completed' },
      { id: 'm2', title: 'Drainage Installation', titleMl: 'ഡ്രെയിനേജ് സ്ഥാപനം', date: '2024-02-10', status: 'completed' },
      { id: 'm3', title: 'Asphalt Laying', titleMl: 'ആസ്ഫാൽറ്റ് ഇടൽ', date: '2024-02-28', status: 'in-progress' },
      { id: 'm4', title: 'Final Inspection', titleMl: 'അന്തിമ പരിശോധന', date: '2024-03-10', status: 'pending' }
    ],
    assignedTo: 'Public Works Department',
    lastUpdate: '2024-02-13'
  },
  {
    id: 'proj2',
    title: 'Community Park Development',
    titleMl: 'കമ്മ്യൂണിറ്റി പാർക്ക് വികസനം',
    description: 'New community park with playground and walking track',
    descriptionMl: 'കളിസ്ഥലവും നടത്ത സൗകര്യവും ഉള്ള പുതിയ കമ്മ്യൂണിറ്റി പാർക്ക്',
    category: 'infrastructure',
    categoryLabel: 'Infrastructure',
    categoryLabelMl: 'അടിസ്ഥാന സൗകര്യങ്ങൾ',
    location: 'Ward 3, Kochi',
    locationMl: 'വാർഡ് 3, കൊച്ചി',
    budget: 300000,
    spent: 180000,
    startDate: '2024-02-01',
    expectedCompletion: '2024-04-30',
    status: 'in-progress',
    progress: 45,
    images: [
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=450&fit=crop'
    ],
    milestones: [
      { id: 'm1', title: 'Land Preparation', titleMl: 'നിലം തയ്യാറെടുപ്പ്', date: '2024-02-05', status: 'completed' },
      { id: 'm2', title: 'Playground Setup', titleMl: 'കളിസ്ഥലം സജ്ജീകരണം', date: '2024-02-25', status: 'in-progress' },
      { id: 'm3', title: 'Walking Track', titleMl: 'നടത്ത സൗകര്യം', date: '2024-03-15', status: 'pending' },
      { id: 'm4', title: 'Final Landscaping', titleMl: 'അന്തിമ ഭൂദൃശ്യം', date: '2024-04-20', status: 'pending' }
    ],
    assignedTo: 'Horticulture Department',
    lastUpdate: '2024-02-12'
  },
  {
    id: 'proj3',
    title: 'Water Treatment Plant',
    titleMl: 'ജല ശുദ്ധീകരണ പ്ലാന്റ്',
    description: 'New water treatment facility for the district',
    descriptionMl: 'ജില്ലയ്ക്കുള്ള പുതിയ ജല ശുദ്ധീകരണ സൗകര്യം',
    category: 'water',
    categoryLabel: 'Water Supply',
    categoryLabelMl: 'ജല വിതരണം',
    location: 'Ernakulam District',
    locationMl: 'എറണാകുളം ജില്ല',
    budget: 2000000,
    spent: 2000000,
    startDate: '2023-06-01',
    expectedCompletion: '2024-01-31',
    status: 'completed',
    progress: 100,
    images: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=450&fit=crop'
    ],
    milestones: [
      { id: 'm1', title: 'Construction Started', titleMl: 'നിർമ്മാണം ആരംഭിച്ചു', date: '2023-06-15', status: 'completed' },
      { id: 'm2', title: 'Equipment Installation', titleMl: 'ഉപകരണങ്ങൾ സ്ഥാപനം', date: '2023-10-20', status: 'completed' },
      { id: 'm3', title: 'Testing & Commissioning', titleMl: 'പരിശോധനയും കമ്മീഷനും', date: '2024-01-15', status: 'completed' },
      { id: 'm4', title: 'Project Completed', titleMl: 'പദ്ധതി പൂർത്തിയായി', date: '2024-01-31', status: 'completed' }
    ],
    assignedTo: 'Water Authority',
    lastUpdate: '2024-01-31'
  }
];

export function ProjectTracking() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'planned': return 'bg-gray-100 text-gray-700';
      case 'on-hold': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryIcon = (category: Project['category']) => {
    switch (category) {
      case 'road': return <MapPin className="w-5 h-5" />;
      case 'water': return <Building2 className="w-5 h-5" />;
      case 'building': return <Building2 className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.titleMl.includes(searchQuery) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const totalBudget = mockProjects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = mockProjects.reduce((sum, p) => sum + p.spent, 0);
  const completedProjects = mockProjects.filter(p => p.status === 'completed').length;
  const inProgressProjects = mockProjects.filter(p => p.status === 'in-progress').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8" />
            <div>
              <h2>Project Tracking</h2>
              <p className="text-white/90 mt-1">പദ്ധതി ട്രാക്കിംഗ്</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Budget</p>
                <p className="text-2xl font-bold mt-1">₹{totalBudget.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Amount Spent</p>
                <p className="text-2xl font-bold mt-1">₹{totalSpent.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold mt-1">{inProgressProjects}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#2D7A4F]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold mt-1">{completedProjects}</p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-[#2D7A4F]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects... / പദ്ധതികൾ തിരയുക..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="road">Road</SelectItem>
                <SelectItem value="water">Water</SelectItem>
                <SelectItem value="building">Building</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getCategoryIcon(project.category)}
                    <div>
                      <h4 className="font-semibold text-lg">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.titleMl}</p>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-muted-foreground">Location:</span>
                      <p className="font-medium">{project.location}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Budget:</span>
                      <p className="font-medium">₹{project.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Spent:</span>
                      <p className="font-medium">₹{project.spent.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Progress:</span>
                      <p className="font-medium">{project.progress}%</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Start: {project.startDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Expected: {project.expectedCompletion}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      <span>{project.assignedTo}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Images */}
              {project.images && project.images.length > 0 && (
                <div className="mb-4">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {project.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                            <ImageWithFallback
                              src={image}
                              alt={`${project.title} - Image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {project.images.length > 1 && (
                      <>
                        <CarouselPrevious className="left-2 bg-white/90 hover:bg-white" />
                        <CarouselNext className="right-2 bg-white/90 hover:bg-white" />
                      </>
                    )}
                  </Carousel>
                </div>
              )}

              {/* Milestones */}
              <div className="pt-4 border-t">
                <h5 className="font-medium mb-3">Milestones / മൈൽസ്റ്റോണുകൾ</h5>
                <div className="space-y-2">
                  {project.milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded">
                      {milestone.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                      ) : (
                        <Clock className="w-4 h-4 text-yellow-600 shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{milestone.title} / {milestone.titleMl}</p>
                        <p className="text-xs text-muted-foreground">{milestone.date}</p>
                      </div>
                      <Badge variant="outline" className={milestone.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}>
                        {milestone.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No projects found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

