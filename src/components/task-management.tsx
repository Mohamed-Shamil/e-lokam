import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  CheckSquare, 
  Plus, 
  Calendar,
  User,
  Edit,
  Trash2,
  Filter
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Task {
  id: string;
  title: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  createdAt: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Inspect Water Pipeline',
    titleMl: 'ജല പൈപ്പ് ലൈൻ പരിശോധിക്കുക',
    description: 'Inspect the broken water pipeline on MG Road and prepare repair estimate',
    descriptionMl: 'എംജി റോഡിലെ തകർന്ന ജല പൈപ്പ് ലൈൻ പരിശോധിച്ച് റിപ്പയർ എസ്റ്റിമേറ്റ് തയ്യാറാക്കുക',
    assignedTo: 'Public Works Team',
    priority: 'high',
    status: 'in-progress',
    dueDate: '2024-12-30',
    createdAt: '2 days ago'
  },
  {
    id: '2',
    title: 'Organize Ward Meeting',
    titleMl: 'വാർഡ് മീറ്റിംഗ് ഓർഗനൈസ് ചെയ്യുക',
    description: 'Organize monthly ward meeting and send invitations to all members',
    descriptionMl: 'മാസിക വാർഡ് മീറ്റിംഗ് ഓർഗനൈസ് ചെയ്ത് എല്ലാ അംഗങ്ങൾക്കും ക്ഷണം അയയ്ക്കുക',
    assignedTo: 'Ward Secretary',
    priority: 'medium',
    status: 'pending',
    dueDate: '2024-12-28',
    createdAt: '1 day ago'
  }
];

export function TaskManagement() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [formData, setFormData] = useState({
    title: '',
    titleMl: '',
    description: '',
    descriptionMl: '',
    assignedTo: '',
    priority: 'medium' as Task['priority'],
    dueDate: ''
  });

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesStatus && matchesPriority;
  });

  const handleSubmit = () => {
    if (editingId) {
      setTasks(prev => prev.map(t => 
        t.id === editingId 
          ? { ...t, ...formData, createdAt: t.createdAt }
          : t
      ));
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        ...formData,
        status: 'pending',
        createdAt: 'Just now'
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData({
      title: '',
      titleMl: '',
      description: '',
      descriptionMl: '',
      assignedTo: '',
      priority: 'medium',
      dueDate: ''
    });
  };

  const handleStatusChange = (id: string, newStatus: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const handleDelete = (id: string) => {
    if (confirm(t('Are you sure you want to delete this task?', 'ഈ ടാസ്ക് ഇല്ലാതാക്കാൻ നിങ്ങൾക്ക് ഉറപ്പാണോ?'))) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
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
            <h2 className="text-2xl font-semibold">{t('Task Management', 'ടാസ്ക് മാനേജ്മെന്റ്')}</h2>
            <p className="text-white/90 mt-1">{t('Create and track ward tasks', 'വാർഡ് ടാസ്കുകൾ സൃഷ്ടിക്കുകയും ട്രാക്ക് ചെയ്യുകയും ചെയ്യുക')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white/20 hover:bg-white/30 text-white">
                <Plus className="w-4 h-4 mr-2" />
                {t('New Task', 'പുതിയ ടാസ്ക്')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? t('Edit Task', 'ടാസ്ക് എഡിറ്റ് ചെയ്യുക') : t('Create Task', 'ടാസ്ക് സൃഷ്ടിക്കുക')}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t('Title (English)', 'തലക്കെട്ട് (ഇംഗ്ലീഷ്)')}</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('Title (Malayalam)', 'തലക്കെട്ട് (മലയാളം)')}</Label>
                  <Input
                    value={formData.titleMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, titleMl: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>{t('Description (English)', 'വിവരണം (ഇംഗ്ലീഷ്)')}</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div>
                  <Label>{t('Description (Malayalam)', 'വിവരണം (മലയാളം)')}</Label>
                  <Textarea
                    value={formData.descriptionMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, descriptionMl: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{t('Assign To', 'നിയോഗിക്കുക')}</Label>
                    <Input
                      value={formData.assignedTo}
                      onChange={(e) => setFormData(prev => ({ ...prev, assignedTo: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label>{t('Priority', 'പ്രാധാന്യം')}</Label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">{t('High', 'ഉയർന്ന')}</SelectItem>
                        <SelectItem value="medium">{t('Medium', 'ഇടത്തരം')}</SelectItem>
                        <SelectItem value="low">{t('Low', 'കുറഞ്ഞ')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>{t('Due Date', 'അവസാന തീയതി')}</Label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t('Cancel', 'റദ്ദാക്കുക')}
                  </Button>
                  <Button onClick={handleSubmit} className="bg-[#2D5016] hover:bg-[#1B3D0F]">
                    {editingId ? t('Update', 'അപ്ഡേറ്റ്') : t('Create', 'സൃഷ്ടിക്കുക')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            {t('Filters', 'ഫിൽട്ടറുകൾ')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('Filter by Status', 'നില അനുസരിച്ച് ഫിൽട്ടർ')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Status', 'എല്ലാ നിലയും')}</SelectItem>
                <SelectItem value="pending">{t('Pending', 'പെൻഡിംഗ്')}</SelectItem>
                <SelectItem value="in-progress">{t('In Progress', 'പുരോഗതിയിൽ')}</SelectItem>
                <SelectItem value="completed">{t('Completed', 'പൂർത്തിയാക്കി')}</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder={t('Filter by Priority', 'പ്രാധാന്യം അനുസരിച്ച് ഫിൽട്ടർ')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('All Priorities', 'എല്ലാ പ്രാധാന്യങ്ങളും')}</SelectItem>
                <SelectItem value="high">{t('High', 'ഉയർന്ന')}</SelectItem>
                <SelectItem value="medium">{t('Medium', 'ഇടത്തരം')}</SelectItem>
                <SelectItem value="low">{t('Low', 'കുറഞ്ഞ')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t('Tasks', 'ടാസ്കുകൾ')} ({filteredTasks.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <CheckSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('No tasks found', 'ടാസ്കുകളൊന്നും കണ്ടെത്തിയില്ല')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold">{t(task.title, task.titleMl)}</h4>
                          <Badge className={getStatusColor(task.status)}>
                            {t(task.status, task.status)}
                          </Badge>
                          <Badge className={getPriorityColor(task.priority)}>
                            {t(task.priority, task.priority)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {t(task.description, task.descriptionMl)}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{t('Assigned to', 'നിയോഗിച്ചത്')}: {task.assignedTo}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{t('Due', 'അവസാനം')}: {task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Select
                          value={task.status}
                          onValueChange={(value) => handleStatusChange(task.id, value as Task['status'])}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">{t('Pending', 'പെൻഡിംഗ്')}</SelectItem>
                            <SelectItem value="in-progress">{t('In Progress', 'പുരോഗതിയിൽ')}</SelectItem>
                            <SelectItem value="completed">{t('Completed', 'പൂർത്തിയാക്കി')}</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(task.id)}
                          className="text-red-600 hover:text-red-700"
                        >
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

