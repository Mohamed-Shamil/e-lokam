import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  MessageSquare,
  Star,
  MapPin,
  Calendar,
  User,
  Phone,
  FileText,
  Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ComplaintComment {
  id: string;
  author: string;
  authorRole: 'citizen' | 'ward-member' | 'admin';
  comment: string;
  timestamp: string;
  attachments?: string[];
}

interface Complaint {
  id: string;
  title: string;
  titleMl: string;
  category: string;
  location: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  description: string;
  descriptionMl: string;
  reportedAt: string;
  resolvedAt?: string;
  assignedTo?: string;
  images?: string[];
  comments: ComplaintComment[];
  rating?: number;
  feedback?: string;
}

const mockComplaint: Complaint = {
  id: 'GRV-2024-1234',
  title: 'Broken Water Pipe',
  titleMl: 'കേടായ ജല പൈപ്പ്',
  category: 'Water',
  location: 'Ward 5, MG Road, Kochi',
  status: 'in-progress',
  priority: 'high',
  description: 'Water pipe is broken and causing water leakage on the street. This is affecting daily activities of residents.',
  descriptionMl: 'ജല പൈപ്പ് തകർന്ന് തെരുവിൽ ജല ചോർച്ചയുണ്ടാക്കുന്നു. ഇത് നിവാസികളുടെ ദൈനംദിന പ്രവർത്തനങ്ങളെ ബാധിക്കുന്നു.',
  reportedAt: '2024-12-26 10:30 AM',
  assignedTo: 'Public Works Department',
  images: [
    'https://source.unsplash.com/400x300/?water,pipe,broken',
    'https://source.unsplash.com/400x300/?leak,water'
  ],
  comments: [
    {
      id: '1',
      author: 'Ward Member',
      authorRole: 'ward-member',
      comment: 'I have assigned this to the Public Works Department. They will inspect and fix it within 2 days.',
      timestamp: '2024-12-26 11:00 AM'
    },
    {
      id: '2',
      author: 'You',
      authorRole: 'citizen',
      comment: 'Thank you for the quick response. The leakage is increasing day by day.',
      timestamp: '2024-12-27 09:15 AM'
    }
  ]
};

export function ComplaintStatus() {
  const { t } = useLanguage();
  const [complaint] = useState<Complaint>(mockComplaint);
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState<number | null>(complaint.rating || null);
  const [feedback, setFeedback] = useState(complaint.feedback || '');
  const [showRating, setShowRating] = useState(complaint.status === 'resolved' && !complaint.rating);

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    // In real app, this would send to backend
    const comment: ComplaintComment = {
      id: Date.now().toString(),
      author: 'You',
      authorRole: 'citizen',
      comment: newComment,
      timestamp: new Date().toLocaleString()
    };
    complaint.comments.push(comment);
    setNewComment('');
  };

  const handleSubmitRating = () => {
    if (rating && feedback) {
      // In real app, this would save to backend
      complaint.rating = rating;
      complaint.feedback = feedback;
      setShowRating(false);
      alert(t('Thank you for your feedback!', 'നിങ്ങളുടെ ഫീഡ്ബാക്കിന് നന്ദി!'));
    }
  };

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
          background: 'linear-gradient(135deg, #2D7A4F 0%, #8B9D83 100%)'
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{t('Complaint Status', 'പരാതി നില')}</h2>
            <p className="text-white/90 mt-1">{t('Track your complaint updates', 'നിങ്ങളുടെ പരാതി അപ്ഡേറ്റുകൾ ട്രാക്ക് ചെയ്യുക')}</p>
          </div>
          <Badge
            variant="outline"
            className={`${getStatusColor(complaint.status)} border-2`}
          >
            {t(complaint.status, complaint.status)}
          </Badge>
        </div>
      </div>

      {/* Complaint Details */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl mb-2">{t(complaint.title, complaint.titleMl)}</CardTitle>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={getPriorityColor(complaint.priority)}>
                  {t(complaint.priority, complaint.priority)}
                </Badge>
                <Badge variant="outline">
                  {complaint.category}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t('Location', 'സ്ഥലം')}:</span>
              <span>{complaint.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">{t('Reported', 'റിപ്പോർട്ട് ചെയ്തത്')}:</span>
              <span>{complaint.reportedAt}</span>
            </div>
            {complaint.assignedTo && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('Assigned to', 'നിയോഗിച്ചത്')}:</span>
                <span>{complaint.assignedTo}</span>
              </div>
            )}
            {complaint.resolvedAt && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('Resolved', 'പരിഹരിച്ചു')}:</span>
                <span>{complaint.resolvedAt}</span>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-2">{t('Description', 'വിവരണം')}</h4>
            <p className="text-sm text-muted-foreground">
              {t(complaint.description, complaint.descriptionMl)}
            </p>
          </div>

          {complaint.images && complaint.images.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">{t('Attached Images', 'അറ്റാച്ച് ചെയ്ത ചിത്രങ്ങൾ')}</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {complaint.images.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={img} 
                      alt={`Attachment ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            {t('Comments & Updates', 'അഭിപ്രായങ്ങളും അപ്ഡേറ്റുകളും')} ({complaint.comments.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Comments List */}
          <div className="space-y-4">
            {complaint.comments.map((comment) => (
              <div
                key={comment.id}
                className={`p-4 rounded-lg border ${
                  comment.authorRole === 'citizen'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-muted border-border'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-semibold text-sm">{comment.author}</h5>
                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                  </div>
                  {comment.authorRole !== 'citizen' && (
                    <Badge variant="outline" className="text-xs">
                      {t('Official', 'ഔദ്യോഗികം')}
                    </Badge>
                  )}
                </div>
                <p className="text-sm">{comment.comment}</p>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-2">{t('Add Comment', 'അഭിപ്രായം ചേർക്കുക')}</h4>
            <div className="space-y-2">
              <Textarea
                placeholder={t('Type your comment or update...', 'നിങ്ങളുടെ അഭിപ്രായം അല്ലെങ്കിൽ അപ്ഡേറ്റ് ടൈപ്പ് ചെയ്യുക...')}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="bg-[#2D7A4F] hover:bg-[#1B4D3E]"
              >
                {t('Add Comment', 'അഭിപ്രായം ചേർക്കുക')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rating & Feedback (if resolved) */}
      {complaint.status === 'resolved' && showRating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              {t('Rate Your Experience', 'നിങ്ങളുടെ അനുഭവം റേറ്റ് ചെയ്യുക')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="mb-2 block">{t('Rating', 'റേറ്റിംഗ്')}</Label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-colors ${
                      rating && star <= rating
                        ? 'text-yellow-500'
                        : 'text-gray-300 hover:text-yellow-300'
                    }`}
                  >
                    <Star className="w-8 h-8 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="feedback" className="mb-2 block">{t('Feedback', 'ഫീഡ്ബാക്ക്')}</Label>
              <Textarea
                id="feedback"
                placeholder={t('Share your experience...', 'നിങ്ങളുടെ അനുഭവം പങ്കിടുക...')}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
              />
            </div>
            <Button
              onClick={handleSubmitRating}
              disabled={!rating || !feedback.trim()}
              className="w-full bg-[#2D7A4F] hover:bg-[#1B4D3E]"
            >
              {t('Submit Feedback', 'ഫീഡ്ബാക്ക് സമർപ്പിക്കുക')}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Show Rating if already submitted */}
      {complaint.status === 'resolved' && complaint.rating && !showRating && (
        <Card>
          <CardHeader>
            <CardTitle>{t('Your Feedback', 'നിങ്ങളുടെ ഫീഡ്ബാക്ക്')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold">{t('Rating', 'റേറ്റിംഗ്')}:</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= complaint.rating!
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            {complaint.feedback && (
              <p className="text-sm text-muted-foreground">{complaint.feedback}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

