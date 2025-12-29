import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Phone, 
  User, 
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface RegisterProps {
  onRegisterSuccess: (phone: string, role: 'citizen' | 'pravasi' | 'leader' | 'admin', language: 'en' | 'ml') => void;
  onBackToLogin: () => void;
}

export function Register({ onRegisterSuccess, onBackToLogin }: RegisterProps) {
  const { t, language, setLanguage } = useLanguage();
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [formData, setFormData] = useState({
    name: '',
    nameMl: '',
    phone: '',
    email: '',
    address: '',
    role: 'citizen' as 'citizen' | 'pravasi' | 'leader' | 'admin',
    preferredLanguage: 'en' as 'en' | 'ml'
  });
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = () => {
    if (!formData.phone || formData.phone.length < 10 || !formData.name) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      const generatedOtp = generateOTP();
      setOtp(generatedOtp);
      setStep('otp');
      setIsLoading(false);
      alert(t(`OTP sent to ${formData.phone}. For demo, OTP is: ${generatedOtp}`, `OTP ${formData.phone} എന്ന നമ്പറിലേക്ക് അയച്ചു. ഡെമോയ്ക്ക്, OTP: ${generatedOtp}`));
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (enteredOtp === otp) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        // Save user data
        localStorage.setItem('user-phone', formData.phone);
        localStorage.setItem('user-name', formData.name);
        localStorage.setItem('user-role', formData.role);
        localStorage.setItem('app-language', formData.preferredLanguage);
        onRegisterSuccess(formData.phone, formData.role, formData.preferredLanguage);
      }, 1000);
    } else {
      alert(t('Invalid OTP. Please try again.', 'അസാധുവായ OTP. ദയവായി വീണ്ടും ശ്രമിക്കുക.'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #2D7A4F 0%, #8B9D83 100%)'
    }}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#2D7A4F] rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{t('Register for e-Lokam', 'e-Lokam-ലേക്ക് രജിസ്റ്റർ ചെയ്യുക')}</CardTitle>
          <CardDescription>
            {t('Create your account to get started', 'ആരംഭിക്കാൻ നിങ്ങളുടെ അക്കൗണ്ട് സൃഷ്ടിക്കുക')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 'details' ? (
            <>
              {/* Language Preference */}
              <div className="space-y-2">
                <Label>{t('Preferred Language', 'ഇഷ്ടപ്പെട്ട ഭാഷ')}</Label>
                <Select 
                  value={formData.preferredLanguage} 
                  onValueChange={(value) => {
                    setFormData(prev => ({ ...prev, preferredLanguage: value as 'en' | 'ml' }));
                    setLanguage(value as 'en' | 'ml');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ml">മലയാളം</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  {t('This will be your default language for next login', 'ഇത് അടുത്ത ലോഗിനിൽ നിങ്ങളുടെ ഡിഫോൾട്ട് ഭാഷയായിരിക്കും')}
                </p>
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label>{t('Register As', 'രജിസ്റ്റർ ചെയ്യുക')}</Label>
                <Select 
                  value={formData.role} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, role: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="citizen">{t('Citizen', 'പൗരൻ')}</SelectItem>
                    <SelectItem value="pravasi">{t('Pravasi', 'പ്രവാസി')}</SelectItem>
                    <SelectItem value="leader">{t('Ward Member', 'വാർഡ് മെമ്പർ')}</SelectItem>
                    <SelectItem value="admin">{t('Admin', 'അഡ്മിൻ')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">{t('Full Name (English)', 'പൂർണ്ണ നാമം (ഇംഗ്ലീഷ്)')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder={t('Enter your full name', 'നിങ്ങളുടെ പൂർണ്ണ നാമം നൽകുക')}
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Name in Malayalam */}
              <div className="space-y-2">
                <Label htmlFor="nameMl">{t('Full Name (Malayalam)', 'പൂർണ്ണ നാമം (മലയാളം)')} {t('(Optional)', '(ഓപ്ഷണൽ)')}</Label>
                <Input
                  id="nameMl"
                  placeholder={t('Enter your name in Malayalam', 'മലയാളത്തിൽ നിങ്ങളുടെ നാമം നൽകുക')}
                  value={formData.nameMl}
                  onChange={(e) => setFormData(prev => ({ ...prev, nameMl: e.target.value }))}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">{t('Mobile Number', 'മൊബൈൽ നമ്പർ')}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('Enter 10 digit mobile number', '10 അക്ക മൊബൈൽ നമ്പർ നൽകുക')}
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value.replace(/\D/g, '').slice(0, 10) }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="email">{t('Email', 'ഇമെയിൽ')} {t('(Optional)', '(ഓപ്ഷണൽ)')}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('Enter your email', 'നിങ്ങളുടെ ഇമെയിൽ നൽകുക')}
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <Label htmlFor="address">{t('Address', 'വിലാസം')}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="address"
                    placeholder={t('Enter your address', 'നിങ്ങളുടെ വിലാസം നൽകുക')}
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={onBackToLogin}
                  className="flex-1"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t('Back to Login', 'ലോഗിനിലേക്ക് മടങ്ങുക')}
                </Button>
                <Button
                  onClick={handleSendOTP}
                  disabled={!formData.name || formData.phone.length < 10 || isLoading}
                  className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('Sending OTP...', 'OTP അയയ്ക്കുന്നു...')}
                    </>
                  ) : (
                    <>
                      {t('Send OTP', 'OTP അയയ്ക്കുക')}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="otp">{t('Enter OTP', 'OTP നൽകുക')}</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder={t('Enter 6 digit OTP', '6 അക്ക OTP നൽകുക')}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-muted-foreground text-center">
                  {t('OTP sent to', 'OTP അയച്ചു')} {formData.phone}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep('details');
                    setEnteredOtp('');
                  }}
                  className="flex-1"
                >
                  {t('Back', 'പിന്നോട്ട്')}
                </Button>
                <Button
                  onClick={handleVerifyOTP}
                  disabled={enteredOtp.length !== 6 || isLoading}
                  className="flex-1 bg-[#2D7A4F] hover:bg-[#1B4D3E]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t('Verifying...', 'പരിശോധിക്കുന്നു...')}
                    </>
                  ) : (
                    <>
                      {t('Verify & Register', 'പരിശോധിച്ച് രജിസ്റ്റർ ചെയ്യുക')}
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </>
          )}

          <div className="text-xs text-center text-muted-foreground pt-4 border-t">
            {t('By registering, you agree to our Terms & Conditions', 'രജിസ്റ്റർ ചെയ്യുന്നതിലൂടെ, നിങ്ങൾ ഞങ്ങളുടെ നിബന്ധനകൾ സമ്മതിക്കുന്നു')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

