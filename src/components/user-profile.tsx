import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { User, MapPin, Phone, Heart, QrCode, Camera } from 'lucide-react';

interface UserProfileData {
  name: string;
  nameMl: string;
  photo: string;
  district: string;
  block: string;
  panchayat: string;
  ward: string;
  bloodGroup: string;
  emergencyContact: string;
  emergencyName: string;
  qrCode: string;
}

export function UserProfile() {
  const [profile, setProfile] = useState<UserProfileData>({
    name: 'Rajesh Kumar',
    nameMl: 'രാജേഷ് കുമാർ',
    photo: 'indian man professional',
    district: 'Ernakulam',
    block: 'Aluva',
    panchayat: 'Kochi Municipal',
    ward: 'Ward 5',
    bloodGroup: 'A+',
    emergencyContact: '+91 98765 43210',
    emergencyName: 'Suma Krishna (Sister)',
    qrCode: 'ELOKAM-USER-123456'
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="overflow-hidden border-0 shadow-lg">
        <div 
          className="p-6 text-white relative"
          style={{
            background: 'linear-gradient(135deg, #2D5016 0%, #8B9D83 100%)',
          }}
        >
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0c0 16.569-13.431 30-30 30h30V0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
          }} />
          
          <div className="relative z-10">
            <h2>My Profile</h2>
            <p className="text-white/90">എന്റെ പ്രൊഫൈൽ</p>
          </div>
        </div>
      </Card>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Personal Information</CardTitle>
            <Button
              variant={isEditing ? 'default' : 'outline'}
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? 'bg-[#2D5016] hover:bg-[#2D5016]/90' : ''}
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Photo and Basic Info */}
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4" style={{ borderColor: '#8B9D83' }}>
                <AvatarImage src={`https://source.unsplash.com/200x200/?${profile.photo}`} />
                <AvatarFallback><User className="w-16 h-16" /></AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-[#2D5016] hover:bg-[#2D5016]/90"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name (English)</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="nameMl">Full Name (Malayalam)</Label>
                  <Input
                    id="nameMl"
                    value={profile.nameMl}
                    onChange={(e) => setProfile({ ...profile, nameMl: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location Hierarchy */}
          <div>
            <h4 className="mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#2D5016]" />
              Location Details
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="district">District</Label>
                <Select value={profile.district} disabled={!isEditing}>
                  <SelectTrigger id="district">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ernakulam">Ernakulam</SelectItem>
                    <SelectItem value="Thiruvananthapuram">Thiruvananthapuram</SelectItem>
                    <SelectItem value="Thrissur">Thrissur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="block">Block</Label>
                <Select value={profile.block} disabled={!isEditing}>
                  <SelectTrigger id="block">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Aluva">Aluva</SelectItem>
                    <SelectItem value="Kochi">Kochi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="panchayat">Panchayat</Label>
                <Select value={profile.panchayat} disabled={!isEditing}>
                  <SelectTrigger id="panchayat">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kochi Municipal">Kochi Municipal</SelectItem>
                    <SelectItem value="Aluva Municipal">Aluva Municipal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="ward">Ward</Label>
                <Select value={profile.ward} disabled={!isEditing}>
                  <SelectTrigger id="ward">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ward 5">Ward 5</SelectItem>
                    <SelectItem value="Ward 3">Ward 3</SelectItem>
                    <SelectItem value="Ward 1">Ward 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Medical & Emergency Info */}
          <div>
            <h4 className="mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#d4183d]" />
              Medical & Emergency Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={profile.bloodGroup} disabled={!isEditing}>
                  <SelectTrigger id="bloodGroup">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="emergencyName">Emergency Contact Name</Label>
                <Input
                  id="emergencyName"
                  value={profile.emergencyName}
                  onChange={(e) => setProfile({ ...profile, emergencyName: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Name & Relationship"
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Phone</Label>
                <Input
                  id="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={(e) => setProfile({ ...profile, emergencyContact: e.target.value })}
                  disabled={!isEditing}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* QR Code Card */}
      <Card className="border-l-4" style={{ borderLeftColor: '#2D5016', backgroundColor: '#E8F5E9' }}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Quick ID for Health Workers
          </CardTitle>
          <p className="text-sm text-muted-foreground">ആരോഗ്യ പ്രവർത്തകർക്കുള്ള ദ്രുത ഐഡി</p>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-48 h-48 bg-white rounded-lg p-4 shadow-md flex items-center justify-center">
              <div className="text-center">
                <QrCode className="w-32 h-32 mx-auto text-[#2D5016]" />
                <p className="text-xs text-muted-foreground mt-2">QR Code Placeholder</p>
              </div>
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm">User ID:</span>
                <Badge className="bg-[#2D5016]">{profile.qrCode}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm">Blood Group:</span>
                <Badge className="bg-[#d4183d]">{profile.bloodGroup}</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <span className="text-sm">Ward:</span>
                <Badge className="bg-[#8B9D83]">{profile.ward}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                Health workers can scan this QR code during home visits to instantly access your 
                medical profile and emergency contacts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Auto-Connection Info */}
      <Card style={{ backgroundColor: '#FFF8E1' }}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#FFB627' }}>
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4>Your Assigned Care Team</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Based on your location ({profile.ward}), you are automatically connected to:
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="bg-white">
                  <Heart className="w-3 h-3 mr-1 text-[#2D5016]" />
                  ASHA Worker: Suma Krishna
                </Badge>
                <Badge variant="outline" className="bg-white">
                  <Phone className="w-3 h-3 mr-1 text-[#2D7A4F]" />
                  Ward Member: Anjali Nair
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
