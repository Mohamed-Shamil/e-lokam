import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Heart, User, Users, Pill, Stethoscope, AlertCircle, Check } from 'lucide-react';

type RequestStep = 1 | 2 | 3;

interface RequestReason {
  id: string;
  nameEn: string;
  nameMl: string;
  icon: any;
  color: string;
}

const requestReasons: RequestReason[] = [
  { id: 'medicine', nameEn: 'Medicine Delivery', nameMl: 'മരുന്ന് വിതരണം', icon: Pill, color: '#8B9D83' },
  { id: 'checkup', nameEn: 'Health Checkup', nameMl: 'ആരോഗ്യ പരിശോധന', icon: Stethoscope, color: '#2D7A4F' },
  { id: 'emergency', nameEn: 'Medical Emergency', nameMl: 'മെഡിക്കൽ എമർജൻസി', icon: AlertCircle, color: '#FFB627' },
];

export function HealthRequest() {
  const [step, setStep] = useState<RequestStep>(1);
  const [beneficiary, setBeneficiary] = useState<'self' | 'family' | ''>('');
  const [reason, setReason] = useState<string>('');
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    setStep(3);
    // Reset after showing success
    setTimeout(() => {
      setStep(1);
      setBeneficiary('');
      setReason('');
      setDetails('');
    }, 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="overflow-hidden border-0 shadow-lg">
        {/* Biophilic Header */}
        <CardHeader 
          className="text-white relative"
          style={{
            background: 'linear-gradient(135deg, #2D5016 0%, #8B9D83 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 16.569-13.431 30-30 30h30V0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
          
          <CardTitle className="relative z-10">
            <div className="flex items-center gap-3">
              <Heart className="w-6 h-6" />
              <div>
                <div>Request a Visit</div>
                <div className="text-sm font-normal text-white/90 mt-1">സന്ദർശനം അഭ്യർത്ഥിക്കുക</div>
              </div>
            </div>
          </CardTitle>
          
          {step < 3 && (
            <div className="flex gap-2 mt-4 relative z-10">
              {[1, 2].map((s) => (
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
          {/* Step 1: Who Needs Help */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3>Who needs help?</h3>
                <p className="text-muted-foreground mt-1">ആർക്ക് സഹായം വേണം?</p>
              </div>

              <RadioGroup value={beneficiary} onValueChange={(value) => setBeneficiary(value as 'self' | 'family')}>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    htmlFor="self"
                    className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      beneficiary === 'self'
                        ? 'border-[#2D5016] bg-[#E8F5E9]'
                        : 'border-border hover:border-[#8B9D83]'
                    }`}
                  >
                    <RadioGroupItem value="self" id="self" className="sr-only" />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-[#8B9D83]/20 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-[#2D5016]" />
                      </div>
                      <div className="text-center">
                        <div>Myself</div>
                        <div className="text-sm text-muted-foreground">സ്വയം</div>
                      </div>
                    </div>
                    {beneficiary === 'self' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-[#2D5016] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </label>

                  <label
                    htmlFor="family"
                    className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      beneficiary === 'family'
                        ? 'border-[#2D5016] bg-[#E8F5E9]'
                        : 'border-border hover:border-[#8B9D83]'
                    }`}
                  >
                    <RadioGroupItem value="family" id="family" className="sr-only" />
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-[#A8D5A5]/30 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-[#2D5016]" />
                      </div>
                      <div className="text-center">
                        <div>Family Member</div>
                        <div className="text-sm text-muted-foreground">കുടുംബാംഗം</div>
                      </div>
                    </div>
                    {beneficiary === 'family' && (
                      <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 bg-[#2D5016] rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </RadioGroup>

              <Button
                onClick={() => setStep(2)}
                disabled={!beneficiary}
                className="w-full bg-[#2D5016] hover:bg-[#2D5016]/90"
              >
                Next: Select Reason
              </Button>
            </div>
          )}

          {/* Step 2: Reason */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h3>What do you need?</h3>
                <p className="text-muted-foreground mt-1">നിങ്ങൾക്ക് എന്താണ് വേണ്ടത്?</p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {requestReasons.map((item) => {
                  const Icon = item.icon;
                  const isSelected = reason === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setReason(item.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                        isSelected
                          ? 'border-[#2D5016] bg-[#E8F5E9]'
                          : 'border-border hover:border-[#8B9D83]'
                      }`}
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${item.color}20` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: item.color }} />
                      </div>
                      <div className="text-left flex-1">
                        <div>{item.nameEn}</div>
                        <div className="text-sm text-muted-foreground">{item.nameMl}</div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-[#2D5016] rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <Textarea
                placeholder="Additional details (Optional) / കൂടുതൽ വിശദാംശങ്ങൾ"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="min-h-24"
              />

              <div className="flex gap-3">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!reason}
                  className="flex-1 bg-[#2D5016] hover:bg-[#2D5016]/90"
                >
                  Submit Request
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Success */}
          {step === 3 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-[#2D5016] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3>Request Submitted!</h3>
              <p className="text-muted-foreground mt-2">അഭ്യർത്ഥന സമർപ്പിച്ചു!</p>
              <Badge className="mt-4" style={{ backgroundColor: '#8B9D83' }}>
                Request ID: HR-2024-{Math.floor(Math.random() * 10000)}
              </Badge>
              <div className="mt-6 p-4 bg-[#E8F5E9] rounded-lg">
                <p className="text-sm">
                  Your assigned health worker will contact you soon
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  നിങ്ങളുടെ ആരോഗ്യ പ്രവർത്തകൻ ഉടൻ ബന്ധപ്പെടും
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
