import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Phone,
  CheckCircle2,
  Clock,
  AlertCircle,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  MessageSquare,
  MapPin,
  User,
  Calendar
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Complaint {
  id: string;
  title: string;
  titleMl: string;
  category: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  reportedBy: string;
  reportedByPhone: string;
  reportedAt: string;
  description?: string;
  assignedTo?: string;
  resolvedAt?: string;
}

const mockComplaints: Complaint[] = [
  {
    id: 'GRV-2024-1234',
    title: 'Broken Water Pipe',
    titleMl: 'കേടായ ജല പൈപ്പ്',
    category: 'Water',
    location: 'Ward 5, MG Road',
    status: 'pending',
    priority: 'high',
    reportedBy: 'Rajesh Kumar',
    reportedByPhone: '+91 98765 43210',
    reportedAt: '2 hours ago',
    description: 'Water pipe is broken and causing water leakage on the street'
  },
  {
    id: 'GRV-2024-1235',
    title: 'Street Light Not Working',
    titleMl: 'തെരുവ് വിളക്ക് പ്രവർത്തിക്കുന്നില്ല',
    category: 'Electricity',
    location: 'Ward 5, Temple Road',
    status: 'in-progress',
    priority: 'medium',
    reportedBy: 'Sreelatha Menon',
    reportedByPhone: '+91 98765 43211',
    reportedAt: '5 hours ago',
    description: 'Street light has been not working for 3 days',
    assignedTo: 'Electricity Department'
  },
  {
    id: 'GRV-2024-1236',
    title: 'Road Pothole',
    titleMl: 'റോഡ് കുഴി',
    category: 'Roads',
    location: 'Ward 5, Station Road',
    status: 'pending',
    priority: 'medium',
    reportedBy: 'Anil George',
    reportedByPhone: '+91 98765 43212',
    reportedAt: '1 day ago',
    description: 'Large pothole causing traffic issues'
  },
  {
    id: 'GRV-2024-1237',
    title: 'Garbage Not Collected',
    titleMl: 'കുപ്പ ശേഖരിക്കപ്പെട്ടില്ല',
    category: 'Waste Management',
    location: 'Ward 5, Market Street',
    status: 'resolved',
    priority: 'low',
    reportedBy: 'Priya Nair',
    reportedByPhone: '+91 98765 43213',
    reportedAt: '2 days ago',
    description: 'Garbage collection missed for 2 days',
    resolvedAt: '1 day ago'
  },
  {
    id: 'GRV-2024-1238',
    title: 'Drainage Blockage',
    titleMl: 'ചാലുകൾ തടയപ്പെട്ടു',
    category: 'Sanitation',
    location: 'Ward 5, Beach Road',
    status: 'in-progress',
    priority: 'high',
    reportedBy: 'Ramesh Iyer',
    reportedByPhone: '+91 98765 43214',
    reportedAt: '3 hours ago',
    description: 'Severe drainage blockage causing waterlogging',
    assignedTo: 'Public Works Department'
  },
  {
    id: 'GRV-2024-1239',
    title: 'Power Outage',
    titleMl: 'വൈദ്യുതി തടസ്സം',
    category: 'Electricity',
    location: 'Ward 5, Park Avenue',
    status: 'closed',
    priority: 'high',
    reportedBy: 'Lakshmi Devi',
    reportedByPhone: '+91 98765 43215',
    reportedAt: '1 week ago',
    description: 'Frequent power outages in the area',
    resolvedAt: '3 days ago'
  }
];

type SortField = 'date' | 'priority' | 'status' | 'category';
type SortOrder = 'asc' | 'desc';

export function ComplaintsManagement() {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleStatusUpdate = (id: string, newStatus: Complaint['status']) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { ...complaint, status: newStatus, resolvedAt: newStatus === 'resolved' || newStatus === 'closed' ? new Date().toLocaleDateString() : undefined }
        : complaint
    ));
  };

  const handlePriorityUpdate = (id: string, newPriority: Complaint['priority']) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === id 
        ? { ...complaint, priority: newPriority }
        : complaint
    ));
  };

  const filteredAndSortedComplaints = complaints
    .filter(complaint => {
      const matchesSearch = 
        complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.titleMl.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'all' || complaint.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          // Parse relative time strings to approximate dates for sorting
          const parseRelativeTime = (timeStr: string): number => {
            if (timeStr.includes('hour')) {
              const hours = parseInt(timeStr) || 0;
              return Date.now() - hours * 60 * 60 * 1000;
            } else if (timeStr.includes('day')) {
              const days = parseInt(timeStr) || 0;
              return Date.now() - days * 24 * 60 * 60 * 1000;
            } else if (timeStr.includes('week')) {
              const weeks = parseInt(timeStr) || 0;
              return Date.now() - weeks * 7 * 24 * 60 * 60 * 1000;
            }
            return Date.now();
          };
          const dateA = parseRelativeTime(a.reportedAt);
          const dateB = parseRelativeTime(b.reportedAt);
          comparison = dateA - dateB;
          break;
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'status':
          const statusOrder = { pending: 1, 'in-progress': 2, resolved: 3, closed: 4 };
          comparison = statusOrder[a.status] - statusOrder[b.status];
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setPriorityFilter('all');
    setCategoryFilter('all');
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' || categoryFilter !== 'all';

  const getStatusColor = (status: Complaint['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'in-progress':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'resolved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'closed':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

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
            <h2 className="text-2xl font-semibold">Complaints Management</h2>
            <p className="text-white/90 mt-1">പരാതി നിയന്ത്രണം</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-2xl font-bold">{filteredAndSortedComplaints.length}</div>
            <div className="text-sm text-white/80">Total Complaints</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search complaints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Water">Water</SelectItem>
                <SelectItem value="Electricity">Electricity</SelectItem>
                <SelectItem value="Roads">Roads</SelectItem>
                <SelectItem value="Waste Management">Waste Management</SelectItem>
                <SelectItem value="Sanitation">Sanitation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortField} onValueChange={(value) => setSortField(value as SortField)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Complaints List */}
      <Card>
        <CardHeader>
          <CardTitle>
            Complaints ({filteredAndSortedComplaints.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAndSortedComplaints.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No complaints found matching your criteria</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedComplaints.map((complaint) => (
                <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-base font-semibold">{complaint.title}</h4>
                          <Badge
                            variant="outline"
                            className={getPriorityColor(complaint.priority)}
                          >
                            {complaint.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{complaint.titleMl}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={getStatusColor(complaint.status)}
                      >
                        {complaint.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{complaint.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{complaint.reportedBy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{complaint.reportedAt}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Category: </span>
                        <span>{complaint.category}</span>
                      </div>
                    </div>

                    {complaint.description && (
                      <p className="text-sm text-muted-foreground mb-4">{complaint.description}</p>
                    )}

                    {complaint.assignedTo && (
                      <div className="text-sm text-muted-foreground mb-4">
                        <span>Assigned to: </span>
                        <span className="font-medium">{complaint.assignedTo}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCall(complaint.reportedByPhone)}
                          className="border-[#2D5016] text-[#2D5016] hover:bg-[#2D5016] hover:text-white"
                        >
                          <Phone className="w-4 h-4 mr-1" />
                          Call
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Priority Update */}
                        <Select
                          value={complaint.priority}
                          onValueChange={(value) => handlePriorityUpdate(complaint.id, value as Complaint['priority'])}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>

                        {/* Status Update */}
                        <Select
                          value={complaint.status}
                          onValueChange={(value) => handleStatusUpdate(complaint.id, value as Complaint['status'])}
                        >
                          <SelectTrigger className="w-36 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
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

