import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  Plus, 
  Edit,
  Trash2,
  Search,
  Globe,
  Eye,
  EyeOff
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Label } from '../ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';

interface Content {
  id: string;
  title: string;
  titleMl: string;
  content: string;
  contentMl: string;
  type: 'page' | 'announcement' | 'faq' | 'policy';
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

const mockContent: Content[] = [
  {
    id: '1',
    title: 'About e-Lokam',
    titleMl: 'e-Lokam-നെക്കുറിച്ച്',
    content: 'e-Lokam is a digital platform for Kerala Panchayat Raj...',
    contentMl: 'e-Lokam കേരള പഞ്ചായത്ത് രാജിനുള്ള ഒരു ഡിജിറ്റൽ പ്ലാറ്റ്ഫോമാണ്...',
    type: 'page',
    status: 'published',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15'
  }
];

export function ContentManagement() {
  const { t } = useLanguage();
  const [contents, setContents] = useState<Content[]>(mockContent);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    titleMl: '',
    content: '',
    contentMl: '',
    type: 'page' as Content['type'],
    status: 'draft' as Content['status']
  });

  const filteredContents = contents.filter(content =>
    content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    content.titleMl.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = () => {
    const newContent: Content = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setContents(prev => [newContent, ...prev]);
    setIsDialogOpen(false);
    setFormData({
      title: '',
      titleMl: '',
      content: '',
      contentMl: '',
      type: 'page',
      status: 'draft'
    });
  };

  const handleToggleStatus = (id: string) => {
    setContents(prev => prev.map(c => 
      c.id === id 
        ? { ...c, status: c.status === 'published' ? 'draft' : 'published', updatedAt: new Date().toISOString().split('T')[0] }
        : c
    ));
  };

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
            <h2 className="text-2xl font-semibold">{t('Content Management', 'ഉള്ളടക്ക മാനേജ്മെന്റ്')}</h2>
            <p className="text-white/90 mt-1">{t('Manage website content and pages', 'വെബ്‌സൈറ്റ് ഉള്ളടക്കവും പേജുകളും നിയന്ത്രിക്കുക')}</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white/20 hover:bg-white/30 text-white">
                <Plus className="w-4 h-4 mr-2" />
                {t('New Content', 'പുതിയ ഉള്ളടക്കം')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{t('Create Content', 'ഉള്ളടക്കം സൃഷ്ടിക്കുക')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>{t('Type', 'തരം')}</Label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="page">{t('Page', 'പേജ്')}</option>
                    <option value="announcement">{t('Announcement', 'അറിയിപ്പ്')}</option>
                    <option value="faq">{t('FAQ', 'പതിവ് ചോദ്യങ്ങൾ')}</option>
                    <option value="policy">{t('Policy', 'നയം')}</option>
                  </select>
                </div>
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
                  <Label>{t('Content (English)', 'ഉള്ളടക്കം (ഇംഗ്ലീഷ്)')}</Label>
                  <Textarea
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    rows={6}
                  />
                </div>
                <div>
                  <Label>{t('Content (Malayalam)', 'ഉള്ളടക്കം (മലയാളം)')}</Label>
                  <Textarea
                    value={formData.contentMl}
                    onChange={(e) => setFormData(prev => ({ ...prev, contentMl: e.target.value }))}
                    rows={6}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    {t('Cancel', 'റദ്ദാക്കുക')}
                  </Button>
                  <Button onClick={handleSubmit} className="bg-[#1E5A8E] hover:bg-[#154A7A]">
                    {t('Create', 'സൃഷ്ടിക്കുക')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>{t('Search Content', 'ഉള്ളടക്കം തിരയുക')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={t('Search content...', 'ഉള്ളടക്കം തിരയുക...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle>
            {t('Content', 'ഉള്ളടക്കം')} ({filteredContents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredContents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t('No content found', 'ഉള്ളടക്കമൊന്നും കണ്ടെത്തിയില്ല')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContents.map((content) => (
                <Card key={content.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold">{t(content.title, content.titleMl)}</h4>
                          <Badge variant="outline">{t(content.type, content.type)}</Badge>
                          <Badge variant={content.status === 'published' ? 'default' : 'secondary'}>
                            {t(content.status, content.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {t(content.content, content.contentMl)}
                        </p>
                        <div className="text-xs text-muted-foreground">
                          {t('Updated', 'അപ്ഡേറ്റ് ചെയ്തത്')}: {content.updatedAt}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleStatus(content.id)}
                          title={content.status === 'published' ? t('Unpublish', 'പ്രസിദ്ധീകരിക്കാത്തത്') : t('Publish', 'പ്രസിദ്ധീകരിക്കുക')}
                        >
                          {content.status === 'published' ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
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

