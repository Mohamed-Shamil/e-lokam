import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Camera, Droplets, Zap, Construction, Building2, Trees, MapPin, Check } from 'lucide-react';

type WizardStep = 1 | 2 | 3 | 4;

interface Category {
  id: string;
  nameEn: string;
  nameMl: string;
  icon: any;
  color: string;
}

const categories: Category[] = [
  { id: 'water', nameEn: 'Water Supply', nameMl: 'ജലവിതരണം', icon: Droplets, color: '#1E5A8E' },
  { id: 'electricity', nameEn: 'Electricity', nameMl: 'വൈദ്യുതി', icon: Zap, color: '#F59E0B' },
  { id: 'roads', nameEn: 'Roads', nameMl: 'റോഡുകൾ', icon: Construction, color: '#6B7280' },
  { id: 'sanitation', nameEn: 'Sanitation', nameMl: 'ശുചിത്വം', icon: Building2, color: '#8B5CF6' },
  { id: 'waste', nameEn: 'Waste Management', nameMl: 'മാലിന്യ സംസ്കരണം', icon: Trees, color: '#10B981' },
];

export function GrievanceWizard() {
  const [step, setStep] = useState<WizardStep>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [location, setLocation] = useState('Kochi, Ward 5');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    setStep(4);
    // Reset after 2 seconds
    setTimeout(() => {
      setStep(1);
      setSelectedCategory(null);
      setDescription('');
      setUploadedImage(null);
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#2D7A4F] to-[#1E5A8E] text-white">
          <CardTitle>
            <div>Report an Issue</div>
            <div className="text-sm font-normal text-white/90 mt-1">പ്രശ്നം റിപ്പോർട്ട് ചെയ്യുക</div>
          </CardTitle>
          {step < 4 && (
            <div className="flex gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    s <= step ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </CardHeader>

        <CardContent className="p-6">
          {/* Step 1: Upload Image */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3>Upload Photo</h3>
                <p className="text-muted-foreground mt-1">ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക</p>
              </div>

              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-[#2D7A4F] transition-colors cursor-pointer">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-h-64 mx-auto rounded-lg"
                      />
                      <Button variant="outline" size="sm">Change Photo</Button>
                    </div>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-[#B7E4C7] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-10 h-10 text-[#2D7A4F]" />
                      </div>
                      <h4>Take or Upload a Photo</h4>
                      <p className="text-muted-foreground mt-2">Click to select an image</p>
                    </>
                  )}
                </label>
              </div>

              <Textarea
                placeholder="Describe the issue (Optional) / പ്രശ്നം വിവരിക്കുക"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24"
              />

              <Button
                onClick={() => setStep(2)}
                className="w-full bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                disabled={!uploadedImage}
              >
                Next: Select Category
              </Button>
            </div>
          )}

          {/* Step 2: Select Category */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3>Select Category</h3>
                <p className="text-muted-foreground mt-1">വിഭാഗം തിരഞ്ഞെടുക്കുക</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isSelected = selectedCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`relative p-6 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-[#2D7A4F] bg-[#B7E4C7]/30'
                          : 'border-border hover:border-[#2D7A4F]/50'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: category.color }} />
                      </div>
                      <div className="text-sm">{category.nameEn}</div>
                      <div className="text-xs text-muted-foreground mt-1">{category.nameMl}</div>
                      {isSelected && (
                        <div className="absolute top-2 right-2">
                          <div className="w-6 h-6 bg-[#2D7A4F] rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                  disabled={!selectedCategory}
                >
                  Next: Confirm Location
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Location Confirmation */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3>Confirm Location</h3>
                <p className="text-muted-foreground mt-1">സ്ഥാനം സ്ഥിരീകരിക്കുക</p>
              </div>

              <div className="relative h-64 bg-muted rounded-xl overflow-hidden">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=76.2673%2C9.9312%2C76.2873%2C9.9512&layer=mapnik"
                  className="w-full h-full"
                  title="Location Map"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                  <MapPin className="w-10 h-10 text-[#d4183d]" fill="#d4183d" />
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                <MapPin className="w-5 h-5 text-[#2D7A4F]" />
                <div className="flex-1">
                  <div className="text-sm">Current Location</div>
                  <div className="text-muted-foreground">{location}</div>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                >
                  Submit Grievance
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#2D7A4F] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3>Grievance Submitted!</h3>
              <p className="text-muted-foreground mt-2">പരാതി സമർപ്പിച്ചു!</p>
              <Badge className="mt-4 bg-[#1E5A8E]">Tracking ID: GRV-2024-{Math.floor(Math.random() * 10000)}</Badge>
              <p className="text-sm text-muted-foreground mt-4">
                You will receive updates via SMS and WhatsApp
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}