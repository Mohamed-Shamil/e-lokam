import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { 
  Phone, 
  Lock, 
  ArrowRight,
  CheckCircle2,
  Loader2,
  Info,
  X,
  AlertCircle
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface LoginProps {
  onLoginSuccess: (phone: string, role: 'citizen' | 'pravasi' | 'leader' | 'admin') => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const { t, language, setLanguage } = useLanguage();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'citizen' | 'pravasi' | 'leader' | 'admin'>('citizen');
  const [showOtpInfo, setShowOtpInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Mock OTP - in real app, this would come from backend
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = () => {
    if (!phone || phone.length < 10) {
      return;
    }
    setIsLoading(true);
    setErrorMessage('');
    // Simulate API call
    setTimeout(() => {
      const generatedOtp = generateOTP();
      setOtp(generatedOtp);
      setStep('otp');
      setShowOtpInfo(true);
      setIsLoading(false);
      // In real app, OTP would be sent via SMS
    }, 1500);
  };

  const handleVerifyOTP = () => {
    if (enteredOtp === otp) {
      setIsLoading(true);
      setErrorMessage('');
      // Simulate verification
      setTimeout(() => {
        setIsLoading(false);
        // Save user preference
        localStorage.setItem('user-phone', phone);
        localStorage.setItem('user-role', selectedRole);
        localStorage.setItem('app-language', language);
        onLoginSuccess(phone, selectedRole);
      }, 1000);
    } else {
      setErrorMessage(t('Invalid OTP. Please try again.', 'അസാധുവായ OTP. ദയവായി വീണ്ടും ശ്രമിക്കുക.'));
    }
  };

  const handleResendOTP = () => {
    const newOtp = generateOTP();
    setOtp(newOtp);
    setEnteredOtp('');
    setErrorMessage('');
    setShowOtpInfo(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #2D7A4F 0%, #8B9D83 100%)'
    }}>
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#2D7A4F] rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">{t('Login to e-Lokam', 'e-Lokam-ലേക്ക് ലോഗിൻ ചെയ്യുക')}</CardTitle>
          <CardDescription>
            {t('Enter your mobile number to continue', 'തുടരാൻ നിങ്ങളുടെ മൊബൈൽ നമ്പർ നൽകുക')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selector */}
          <div className="space-y-2">
            <Label>{t('Language', 'ഭാഷ')}</Label>
            <Select value={language} onValueChange={(value) => setLanguage(value as 'en' | 'ml')}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ml">മലയാളം</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {step === 'phone' ? (
            <>
              {/* Role Selection */}
              <div className="space-y-2">
                <Label>{t('Login As', 'ലോഗിൻ ചെയ്യുക')}</Label>
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as any)}>
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

              {/* Phone Input */}
              <div className="space-y-2">
                <Label htmlFor="phone">{t('Mobile Number', 'മൊബൈൽ നമ്പർ')}</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder={t('Enter 10 digit mobile number', '10 അക്ക മൊബൈൽ നമ്പർ നൽകുക')}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                onClick={handleSendOTP}
                disabled={phone.length < 10 || isLoading}
                className="w-full bg-[#2D7A4F] hover:bg-[#1B4D3E]"
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
            </>
          ) : (
            <>
              {/* OTP Info Alert - Demo Only */}
              {showOtpInfo && (
                <Alert className="bg-blue-50 border-blue-200 relative">
                  <Info className="h-4 w-4 text-blue-600" />
                  <div className="flex-1">
                    <AlertTitle className="text-blue-900 mb-2">{t('OTP Sent', 'OTP അയച്ചു')}</AlertTitle>
                    <AlertDescription className="text-blue-800">
                      <div className="space-y-2">
                        <p>{t('OTP has been sent to', 'OTP അയച്ചു')} <strong>{phone}</strong></p>
                        <div className="bg-white p-4 rounded-lg border-2 border-blue-300 shadow-sm">
                          <p className="text-xs text-muted-foreground mb-2 text-center">{t('For demo purposes, your OTP is:', 'ഡെമോയ്ക്ക്, നിങ്ങളുടെ OTP:')}</p>
                          <p className="text-3xl font-bold text-blue-900 tracking-widest text-center font-mono py-2">{otp}</p>
                        </div>
                        <p className="text-xs text-blue-700 text-center">{t('In production, this will be sent via SMS', 'പ്രൊഡക്ഷനിൽ, ഇത് SMS വഴി അയയ്ക്കും')}</p>
                      </div>
                    </AlertDescription>
                  </div>
                  <button
                    onClick={() => setShowOtpInfo(false)}
                    className="absolute top-3 right-3 text-blue-600 hover:text-blue-800 transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Alert>
              )}

              {/* Error Message */}
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {/* OTP Input */}
              <div className="space-y-2">
                <Label htmlFor="otp">{t('Enter OTP', 'OTP നൽകുക')}</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder={t('Enter 6 digit OTP', '6 അക്ക OTP നൽകുക')}
                  value={enteredOtp}
                  onChange={(e) => {
                    setEnteredOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setErrorMessage('');
                  }}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                />
                <p className="text-xs text-muted-foreground text-center">
                  {t('OTP sent to', 'OTP അയച്ചു')} {phone}
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep('phone');
                    setEnteredOtp('');
                  }}
                  className="flex-1"
                >
                  {t('Change Number', 'നമ്പർ മാറ്റുക')}
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
                      {t('Verify OTP', 'OTP പരിശോധിക്കുക')}
                      <CheckCircle2 className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              <Button
                variant="ghost"
                onClick={handleResendOTP}
                className="w-full"
              >
                {t('Resend OTP', 'OTP വീണ്ടും അയയ്ക്കുക')}
              </Button>
            </>
          )}

          <div className="text-xs text-center text-muted-foreground pt-4 border-t">
            {t('By continuing, you agree to our Terms & Conditions', 'തുടരുന്നതിലൂടെ, നിങ്ങൾ ഞങ്ങളുടെ നിബന്ധനകൾ സമ്മതിക്കുന്നു')}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

