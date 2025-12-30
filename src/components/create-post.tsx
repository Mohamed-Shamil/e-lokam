import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { 
  Image as ImageIcon, 
  X, 
  Upload, 
  BarChart3,
  CheckCircle2,
  MapPin,
  AlertCircle
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface CreatePostProps {
  onPostCreated?: () => void;
  onCancel?: () => void;
}

export function CreatePost({ onPostCreated, onCancel }: CreatePostProps) {
  const [postType, setPostType] = useState<'post' | 'poll'>('post');
  const [title, setTitle] = useState('');
  const [titleMl, setTitleMl] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionMl, setDescriptionMl] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'completed' | 'in-progress' | 'planned'>('in-progress');
  const [images, setImages] = useState<string[]>([]);
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollQuestionMl, setPollQuestionMl] = useState('');
  const [pollOptions, setPollOptions] = useState<Array<{ text: string; textMl: string }>>([
    { text: '', textMl: '' },
    { text: '', textMl: '' }
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const addPollOption = () => {
    setPollOptions(prev => [...prev, { text: '', textMl: '' }]);
  };

  const removePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updatePollOption = (index: number, field: 'text' | 'textMl', value: string) => {
    setPollOptions(prev => prev.map((opt, i) => 
      i === index ? { ...opt, [field]: value } : opt
    ));
  };

  const handleSubmit = () => {
    // Validate
    if (!title.trim() || !description.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (postType === 'poll') {
      if (!pollQuestion.trim() || pollOptions.some(opt => !opt.text.trim())) {
        alert('Please fill in poll question and all options');
        return;
      }
    }

    // In a real app, this would send to the backend
    console.log('Post created:', {
      postType,
      title,
      titleMl,
      description,
      descriptionMl,
      location,
      status,
      images,
      poll: postType === 'poll' ? {
        question: pollQuestion,
        questionMl: pollQuestionMl,
        options: pollOptions
      } : undefined
    });

    // Reset form
    setTitle('');
    setTitleMl('');
    setDescription('');
    setDescriptionMl('');
    setLocation('');
    setImages([]);
    setPollQuestion('');
    setPollQuestionMl('');
    setPollOptions([{ text: '', textMl: '' }, { text: '', textMl: '' }]);

    if (onPostCreated) {
      onPostCreated();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] p-6 text-white">
          <h2>Create Post</h2>
          <p className="text-white/90 mt-1">പോസ്റ്റ് സൃഷ്ടിക്കുക</p>
        </div>
      </Card>

      {/* Post Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Post Type / പോസ്റ്റ് തരം</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={postType} onValueChange={(value) => setPostType(value as 'post' | 'poll')}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="post" id="post" />
              <Label htmlFor="post" className="cursor-pointer">Regular Post / സാധാരണ പോസ്റ്റ്</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="poll" id="poll" />
              <Label htmlFor="poll" className="cursor-pointer">Poll / പോൾ</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Post Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            {postType === 'post' ? 'Post Details' : 'Poll Details'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title (English) *</Label>
            <Input
              id="title"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="titleMl">Title (Malayalam) *</Label>
            <Input
              id="titleMl"
              placeholder="പോസ്റ്റ് ശീർഷകം നൽകുക"
              value={titleMl}
              onChange={(e) => setTitleMl(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (English) *</Label>
            <Textarea
              id="description"
              placeholder="Enter post description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descriptionMl">Description (Malayalam) *</Label>
            <Textarea
              id="descriptionMl"
              placeholder="പോസ്റ്റ് വിവരണം നൽകുക"
              value={descriptionMl}
              onChange={(e) => setDescriptionMl(e.target.value)}
              rows={4}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="e.g., Ward 5, MG Road"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          {/* Status (for regular posts) */}
          {postType === 'post' && (
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(value) => setStatus(value as typeof status)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned / ആസൂത്രണം</SelectItem>
                  <SelectItem value="in-progress">In Progress / പുരോഗമിക്കുന്നു</SelectItem>
                  <SelectItem value="completed">Completed / പൂർത്തിയായി</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Images (for regular posts) */}
          {postType === 'post' && (
            <div className="space-y-2">
              <Label>Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                    <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
                {images.length < 10 && (
                  <label className="aspect-video border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted transition-colors">
                    <div className="text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Add Image</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Poll Options */}
          {postType === 'poll' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pollQuestion">Poll Question (English) *</Label>
                <Input
                  id="pollQuestion"
                  placeholder="Enter poll question"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pollQuestionMl">Poll Question (Malayalam) *</Label>
                <Input
                  id="pollQuestionMl"
                  placeholder="പോൾ ചോദ്യം നൽകുക"
                  value={pollQuestionMl}
                  onChange={(e) => setPollQuestionMl(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>Poll Options *</Label>
                {pollOptions.map((option, index) => (
                  <div key={index} className="space-y-2 p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Option {index + 1}</span>
                      {pollOptions.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removePollOption(index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder={`Option ${index + 1} (English)`}
                      value={option.text}
                      onChange={(e) => updatePollOption(index, 'text', e.target.value)}
                    />
                    <Input
                      placeholder={`Option ${index + 1} (Malayalam)`}
                      value={option.textMl}
                      onChange={(e) => updatePollOption(index, 'textMl', e.target.value)}
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addPollOption}
                  className="w-full"
                >
                  + Add Option
                </Button>
              </div>
            </div>
          )}

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Create Post
            </Button>
            {onCancel && (
              <Button
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

