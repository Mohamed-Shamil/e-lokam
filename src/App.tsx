import React, { useState, useEffect } from 'react';
import { 
  Sprout, 
  Menu, 
  Home, 
  Heart, 
  Stethoscope, 
  MessageSquare, 
  MessageSquareText, 
  User, 
  LayoutDashboard,
  Users,
  Building2,
  AlertTriangle,
  MessageCircle,
  Bell,
  Languages,
  LogOut,
  Megaphone,
  CheckSquare,
  Calendar,
  DollarSign,
  FileText,
  MapPin,
  Trash2,
  Phone
} from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from './components/ui/sidebar';

// Import all screens
import { CitizenHome } from './components/screens/citizen-home';
import { SocialCareHub } from './components/social-care-hub';
import { HealthRequest } from './components/health-request';
import { UserProfile } from './components/user-profile';
import { GrievanceWizard } from './components/grievance-wizard';
import { MyComplaints } from './components/my-complaints';
import { ComplaintStatus } from './components/complaint-status';
import { Notifications } from './components/notifications';

import { PravasiHome } from './components/screens/pravasi-home';
import { PravasiParentTracker } from './components/pravasi-parent-tracker';

import { LeaderDashboard } from './components/leader-dashboard';
import { WardUsers } from './components/ward-users';
import { ComplaintsManagement } from './components/complaints-management';
import { WardChat } from './components/ward-chat';
import { CitizenChat } from './components/citizen-chat';
import { Announcements } from './components/announcements';
import { TaskManagement } from './components/task-management';
import { MeetingManagement } from './components/meeting-management';
import { FinancialManagement } from './components/financial-management';

import { AdminPortal } from './components/admin-portal';
import { UserManagement } from './components/admin/user-management';
import { WardManagement } from './components/admin/ward-management';
import { ContentManagement } from './components/admin/content-management';

import { ElectedMembers } from './components/elected-members';
import { CreatePost } from './components/create-post';
import { WardResources } from './components/ward-resources';
import { FormsManagement } from './components/forms-management';
import { WasteManagement } from './components/waste-management';
import { EmergencyServices } from './components/emergency-services';

import { Login } from './components/auth/login';
import { Register } from './components/auth/register';

type UserRole = 'citizen' | 'pravasi' | 'leader' | 'admin';
type Screen = 
  | 'citizen-home' 
  | 'social-care' 
  | 'health-request' 
  | 'citizen-chat'
  | 'grievance'
  | 'my-complaints'
  | 'complaint-status'
  | 'notifications'
  | 'profile'
  | 'elected-members'
  | 'pravasi-home'
  | 'parent-tracker'
  | 'leader-dashboard'
  | 'ward-users'
  | 'ward-chat'
  | 'complaints-management'
  | 'announcements'
  | 'task-management'
  | 'meeting-management'
  | 'financial-management'
  | 'admin-portal'
  | 'user-management'
  | 'ward-management'
  | 'content-management'
  | 'create-post'
  | 'ward-resources'
  | 'forms-management'
  | 'waste-management'
  | 'emergency-services';

interface NavItem {
  id: Screen;
  label: string;
  labelMl: string;
  icon: React.ComponentType<{ className?: string }>;
  role: UserRole[];
}

const navItems: NavItem[] = [
  { id: 'citizen-home', label: 'Home', labelMl: 'ഹോം', icon: Home, role: ['citizen', 'pravasi'] },
  { id: 'notifications', label: 'Notifications', labelMl: 'അറിയിപ്പുകൾ', icon: Bell, role: ['citizen', 'pravasi', 'leader', 'admin'] },
  { id: 'social-care', label: 'Social Care Hub', labelMl: 'സാമൂഹിക പരിചരണം', icon: Heart, role: ['citizen', 'pravasi'] },
  { id: 'health-request', label: 'Request Visit', labelMl: 'സന്ദർശനം', icon: Stethoscope, role: ['citizen', 'pravasi'] },
  { id: 'citizen-chat', label: 'Chat', labelMl: 'ചാറ്റ്', icon: MessageCircle, role: ['citizen', 'pravasi'] },
  { id: 'elected-members', label: 'Elected Members', labelMl: 'തെരഞ്ഞെടുക്കപ്പെട്ട അംഗങ്ങൾ', icon: Users, role: ['citizen', 'pravasi', 'leader'] },
  { id: 'forms-management', label: 'Forms', labelMl: 'ഫോമുകൾ', icon: FileText, role: ['citizen', 'pravasi', 'leader', 'admin'] },
  { id: 'waste-management', label: 'Waste Management', labelMl: 'മാലിന്യ മാനേജ്മെന്റ്', icon: Trash2, role: ['citizen', 'pravasi', 'leader'] },
  { id: 'emergency-services', label: 'Emergency Services', labelMl: 'എമർജൻസി സേവനങ്ങൾ', icon: Phone, role: ['citizen', 'pravasi', 'leader', 'admin'] },
  { id: 'grievance', label: 'Report Issue', labelMl: 'പരാതി', icon: MessageSquareText, role: ['citizen', 'pravasi'] },
  { id: 'my-complaints', label: 'My Complaints', labelMl: 'എന്റെ പരാതികൾ', icon: AlertTriangle, role: ['citizen', 'pravasi'] },
  { id: 'profile', label: 'My Profile', labelMl: 'പ്രൊഫൈൽ', icon: User, role: ['citizen', 'pravasi'] },
  
  { id: 'pravasi-home', label: 'Dashboard', labelMl: 'ഡാഷ്‌ബോർഡ്', icon: LayoutDashboard, role: ['pravasi'] },
  { id: 'parent-tracker', label: 'Parent Care', labelMl: 'മാതാപിതാക്കൾ', icon: Heart, role: ['pravasi'] },
  
  { id: 'leader-dashboard', label: 'Dashboard', labelMl: 'ഡാഷ്‌ബോർഡ്', icon: LayoutDashboard, role: ['leader'] },
  { id: 'citizen-home', label: 'Community Feed', labelMl: 'കമ്മ്യൂണിറ്റി ഫീഡ്', icon: Home, role: ['leader'] },
  { id: 'create-post', label: 'Create Post', labelMl: 'പോസ്റ്റ് സൃഷ്ടിക്കുക', icon: FileText, role: ['leader'] },
  { id: 'ward-resources', label: 'Ward Resources', labelMl: 'വാർഡ് വിഭവങ്ങൾ', icon: Building2, role: ['leader'] },
  { id: 'ward-users', label: 'Citizens', labelMl: 'പൗരൻമാർ', icon: Users, role: ['leader'] },
  { id: 'ward-chat', label: 'Chat', labelMl: 'ചാറ്റ്', icon: MessageCircle, role: ['leader'] },
  { id: 'complaints-management', label: 'Complaints', labelMl: 'പരാതികൾ', icon: AlertTriangle, role: ['leader', 'admin'] },
  { id: 'announcements', label: 'Announcements', labelMl: 'അറിയിപ്പുകൾ', icon: Megaphone, role: ['leader'] },
  { id: 'task-management', label: 'Tasks', labelMl: 'ടാസ്കുകൾ', icon: CheckSquare, role: ['leader'] },
  { id: 'meeting-management', label: 'Meetings', labelMl: 'മീറ്റിംഗുകൾ', icon: Calendar, role: ['leader'] },
  { id: 'financial-management', label: 'Finance', labelMl: 'ധനകാര്യം', icon: DollarSign, role: ['leader'] },
  { id: 'social-care', label: 'Social Care Hub', labelMl: 'സാമൂഹിക പരിചരണം', icon: Heart, role: ['leader'] },
  
  { id: 'admin-portal', label: 'Admin Portal', labelMl: 'അഡ്മിൻ', icon: Building2, role: ['admin'] },
  { id: 'user-management', label: 'User Management', labelMl: 'ഉപയോക്തൃ മാനേജ്മെന്റ്', icon: Users, role: ['admin'] },
  { id: 'ward-management', label: 'Ward Management', labelMl: 'വാർഡ് മാനേജ്മെന്റ്', icon: MapPin, role: ['admin'] },
  { id: 'content-management', label: 'Content Management', labelMl: 'ഉള്ളടക്ക മാനേജ്മെന്റ്', icon: FileText, role: ['admin'] },
];

function AppContent() {
  const { t, language, setLanguage } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('user-phone');
  });
  const [showRegister, setShowRegister] = useState(false);
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('user-role');
    return (saved as UserRole) || 'citizen';
  });
  const [currentScreen, setCurrentScreen] = useState<Screen>('citizen-home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedComplaintId, setSelectedComplaintId] = useState<string | null>(null);

  useEffect(() => {
    // Set default screen based on role
    if (currentRole === 'citizen' || currentRole === 'pravasi') setCurrentScreen('citizen-home');
    if (currentRole === 'leader') setCurrentScreen('leader-dashboard');
    if (currentRole === 'admin') setCurrentScreen('admin-portal');
  }, [currentRole]);

  const handleLoginSuccess = (phone: string, role: UserRole) => {
    setIsAuthenticated(true);
    setCurrentRole(role);
    localStorage.setItem('user-phone', phone);
    localStorage.setItem('user-role', role);
  };

  const handleRegisterSuccess = (phone: string, role: UserRole, lang: 'en' | 'ml') => {
    setIsAuthenticated(true);
    setCurrentRole(role);
    setLanguage(lang);
    localStorage.setItem('user-phone', phone);
    localStorage.setItem('user-role', role);
    localStorage.setItem('app-language', lang);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user-phone');
    localStorage.removeItem('user-role');
    setCurrentScreen('citizen-home');
  };

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem('user-role', role);
    setMobileMenuOpen(false);
  };

  const handleViewComplaint = (id: string) => {
    setSelectedComplaintId(id);
    setCurrentScreen('complaint-status');
  };

  const handleNavigation = (screen: Screen) => {
    setCurrentScreen(screen);
    setMobileMenuOpen(false);
  };

  const handleStringNavigation = (screen: string) => {
    // Convert string to Screen type for components that use string
    const validScreen = screen as Screen;
    const validScreens: Screen[] = navItems.map(n => n.id);
    if (validScreens.includes(validScreen)) {
      handleNavigation(validScreen);
    }
  };

  const currentNavItems = navItems.filter(item => item.role.includes(currentRole));

  const renderScreen = () => {
    switch (currentScreen) {
      case 'citizen-home':
        return <CitizenHome onNavigate={handleStringNavigation} currentUserRole={currentRole} />;
      case 'social-care':
        return <SocialCareHub />;
      case 'health-request':
        return <HealthRequest />;
      case 'citizen-chat':
        return <CitizenChat />;
      case 'grievance':
        return <GrievanceWizard />;
      case 'my-complaints':
        return <MyComplaints onViewComplaint={handleViewComplaint} />;
      case 'complaint-status':
        return <ComplaintStatus />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <UserProfile />;
      case 'elected-members':
        return <ElectedMembers 
          currentUserRole={currentRole} 
          onChat={(memberId) => {
            setCurrentScreen('citizen-chat');
          }} 
        />;
      case 'pravasi-home':
        return <PravasiHome onNavigate={handleStringNavigation} />;
      case 'parent-tracker':
        return <PravasiParentTracker />;
      case 'leader-dashboard':
        return <LeaderDashboard />;
      case 'create-post':
        return <CreatePost 
          onPostCreated={() => {
            setCurrentScreen('citizen-home');
          }}
          onCancel={() => {
            setCurrentScreen('citizen-home');
          }}
        />;
      case 'ward-resources':
        return <WardResources />;
      case 'forms-management':
        return <FormsManagement canAddForms={currentRole === 'leader' || currentRole === 'admin'} />;
      case 'waste-management':
        return <WasteManagement />;
      case 'emergency-services':
        return <EmergencyServices />;
      case 'ward-users':
        return <WardUsers />;
      case 'ward-chat':
        return <WardChat />;
      case 'complaints-management':
        return <ComplaintsManagement />;
      case 'announcements':
        return <Announcements />;
      case 'task-management':
        return <TaskManagement />;
      case 'meeting-management':
        return <MeetingManagement />;
      case 'financial-management':
        return <FinancialManagement />;
      case 'admin-portal':
        return <AdminPortal />;
      case 'user-management':
        return <UserManagement />;
      case 'ward-management':
        return <WardManagement />;
      case 'content-management':
        return <ContentManagement />;
      default:
        return <CitizenHome onNavigate={handleStringNavigation} />;
    }
  };

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    if (showRegister) {
      return <Register onRegisterSuccess={handleRegisterSuccess} onBackToLogin={() => setShowRegister(false)} />;
    }
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  const roleColors = {
    citizen: { primary: '#2D7A4F', secondary: '#8B9D83' },
    pravasi: { primary: '#1E5A8E', secondary: '#4A90D9' },
    leader: { primary: '#2D5016', secondary: '#A8D5A5' },
    admin: { primary: '#1E5A8E', secondary: '#2D7A4F' },
  };

  const currentColor = roleColors[currentRole];

  return (
    <SidebarProvider defaultOpen={true}>
      <style>{`
        [data-sidebar="sidebar"] {
          background-color: ${currentColor.primary} !important;
          color: white !important;
        }
        [data-sidebar="sidebar"] [data-sidebar="header"],
        [data-sidebar="sidebar"] [data-sidebar="content"],
        [data-sidebar="sidebar"] [data-sidebar="footer"] {
          color: white;
        }
        [data-sidebar="sidebar"] [data-sidebar="group-label"] {
          color: rgba(255, 255, 255, 0.7);
        }
        /* Hide text when sidebar is collapsed */
        [data-slot="sidebar"][data-collapsible="icon"] [data-sidebar="header"] > div > div:last-child,
        [data-slot="sidebar"][data-collapsible="icon"] [data-sidebar="footer"] {
          display: none;
        }
        [data-slot="sidebar"][data-collapsible="icon"] [data-sidebar="menu-button"] > div:last-child {
          display: none;
        }
        /* Override wrapper to use column layout for navbar + sidebar/content */
        [data-slot="sidebar-wrapper"] {
          display: flex !important;
          flex-direction: column !important;
          width: 100% !important;
          min-height: 100vh !important;
          overflow: hidden !important;
        }
        /* Navbar should be full width at top */
        [data-slot="sidebar-wrapper"] > header {
          width: 100% !important;
          flex-shrink: 0 !important;
        }
        /* Create a flex row container for sidebar and content - this wraps Sidebar and SidebarInset */
        [data-slot="sidebar-wrapper"] > .sidebar-content-row {
          display: flex !important;
          flex-direction: row !important;
          flex: 1 1 auto !important;
          min-height: 0 !important;
          overflow: hidden !important;
          width: 100% !important;
          position: relative !important;
        }
        /* Sidebar gap creates the space - must not shrink and must be visible */
        [data-slot="sidebar-gap"] {
          flex-shrink: 0 !important;
          flex-grow: 0 !important;
          display: block !important;
          visibility: visible !important;
          height: 100% !important;
        }
        /* Sidebar container is fixed, so gap handles spacing */
        [data-slot="sidebar-container"] {
          position: fixed !important;
        }
        /* SidebarInset must start after the gap and take remaining space */
        [data-slot="sidebar-inset"] {
          flex: 1 1 auto !important;
          min-width: 0 !important;
          width: auto !important;
          max-width: 100% !important;
          overflow-x: hidden !important;
          overflow-y: auto !important;
          position: relative !important;
          box-sizing: border-box !important;
          display: flex !important;
          flex-direction: column !important;
          margin-left: 0 !important;
        }
        /* Ensure the sidebar component (which contains gap) doesn't shrink and has proper width */
        [data-slot="sidebar"] {
          flex-shrink: 0 !important;
          width: auto !important;
          min-width: 0 !important;
        }
        /* The gap div inside sidebar must have proper width */
        [data-slot="sidebar"] [data-slot="sidebar-gap"] {
          width: var(--sidebar-width) !important;
          min-width: var(--sidebar-width) !important;
        }
        /* When collapsed, gap should be icon width */
        [data-slot="sidebar"][data-collapsible="icon"] [data-slot="sidebar-gap"] {
          width: var(--sidebar-width-icon) !important;
          min-width: var(--sidebar-width-icon) !important;
        }
        /* Ensure all content respects boundaries */
        [data-slot="sidebar-inset"] > * {
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        [data-slot="sidebar-inset"] > main {
          flex: 1 1 auto !important;
          overflow-y: auto !important;
        }
        [data-slot="sidebar-inset"] * {
          max-width: 100% !important;
          box-sizing: border-box !important;
        }
        /* Make sidebar content scrollable on mobile */
        [data-sidebar="content"] {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          flex: 1 1 auto !important;
          min-height: 0 !important;
        }
        /* Ensure sidebar itself is scrollable on mobile */
        @media (max-width: 768px) {
          [data-sidebar="sidebar"] {
            overflow-y: auto !important;
            overflow-x: hidden !important;
            max-height: calc(100vh - 80px) !important;
          }
          [data-sidebar="content"] {
            max-height: calc(100vh - 160px) !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
          }
        }
      `}</style>
      
      {/* Top Navbar - Full Width */}
      <header 
        className="sticky top-0 z-50 text-white shadow-lg w-full flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${currentColor.primary} 0%, ${currentColor.secondary} 100%)`,
        }}
      >
        <div className="w-full px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0 flex-shrink">
              <SidebarTrigger className="text-white hover:bg-white/20 md:block hidden shrink-0" />
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="e-Lokam Logo" 
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    // Fallback to icon if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = '<svg class="w-6 h-6 text-[#2D7A4F]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>';
                    }
                  }}
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-xl truncate">e-Lokam</h1>
                <p className="text-sm text-white/90 truncate">{t('Kerala Panchayat Raj', 'കേരള പഞ്ചായത്ത് രാജ്')}</p>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-2 shrink-0">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
                className="text-white hover:bg-white/20"
                title={t('Toggle Language', 'ഭാഷ മാറ്റുക')}
              >
                <Languages className="w-5 h-5" />
              </Button>
              
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleNavigation('notifications')}
                className="text-white hover:bg-white/20 relative"
                title={t('Notifications', 'അറിയിപ്പുകൾ')}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* Role Switcher */}
              <Button
                variant={currentRole === 'citizen' ? 'secondary' : 'ghost'}
                onClick={() => handleRoleChange('citizen')}
                className={currentRole === 'citizen' ? '' : 'text-white hover:bg-white/20'}
                size="sm"
              >
                {t('Citizen', 'പൗരൻ')}
              </Button>
              <Button
                variant={currentRole === 'pravasi' ? 'secondary' : 'ghost'}
                onClick={() => handleRoleChange('pravasi')}
                className={currentRole === 'pravasi' ? '' : 'text-white hover:bg-white/20'}
                size="sm"
              >
                {t('Pravasi', 'പ്രവാസി')}
              </Button>
              <Button
                variant={currentRole === 'leader' ? 'secondary' : 'ghost'}
                onClick={() => handleRoleChange('leader')}
                className={currentRole === 'leader' ? '' : 'text-white hover:bg-white/20'}
                size="sm"
              >
                {t('Ward Member', 'വാർഡ് മെമ്പർ')}
              </Button>
              <Button
                variant={currentRole === 'admin' ? 'secondary' : 'ghost'}
                onClick={() => handleRoleChange('admin')}
                className={currentRole === 'admin' ? '' : 'text-white hover:bg-white/20'}
                size="sm"
              >
                {t('Admin', 'അഡ്മിൻ')}
              </Button>

              {/* Logout */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-white hover:bg-white/20"
                title={t('Logout', 'ലോഗൗട്ട്')}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 overflow-y-auto">
                <div className="py-6 space-y-6">
                  <div>
                    <h3 className="mb-3">Select Role</h3>
                    <div className="space-y-2">
                      <Button
                        variant={currentRole === 'citizen' ? 'default' : 'outline'}
                        onClick={() => handleRoleChange('citizen')}
                        className="w-full justify-start"
                      >
                        Citizen / പൗരൻ
                      </Button>
                      <Button
                        variant={currentRole === 'pravasi' ? 'default' : 'outline'}
                        onClick={() => handleRoleChange('pravasi')}
                        className="w-full justify-start"
                      >
                        Pravasi / പ്രവാസി
                      </Button>
                      <Button
                        variant={currentRole === 'leader' ? 'default' : 'outline'}
                        onClick={() => handleRoleChange('leader')}
                        className="w-full justify-start"
                      >
                        Ward Member / നേതാവ്
                      </Button>
                      <Button
                        variant={currentRole === 'admin' ? 'default' : 'outline'}
                        onClick={() => handleRoleChange('admin')}
                        className="w-full justify-start"
                      >
                        Admin / അഡ്മിൻ
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-3">Navigation</h3>
                    <div className="space-y-2">
                      {currentNavItems.map(item => (
                        <Button
                          key={item.id}
                          variant={currentScreen === item.id ? 'default' : 'outline'}
                          onClick={() => handleNavigation(item.id)}
                          className="w-full justify-start"
                        >
                          <div>
                            <div>{t(item.label, item.labelMl)}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Sidebar and Content Area - Below Navbar */}
      <div className="sidebar-content-row">
        {/* Sidebar */}
        <Sidebar 
          collapsible="icon"
          className="border-r border-white/20"
        >
          <SidebarHeader className="p-4 border-b border-white/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 overflow-hidden">
                <img 
                  src="/logo.png" 
                  alt="e-Lokam Logo" 
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    // Fallback to icon if image not found
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = '<svg class="w-6 h-6 text-[#2D7A4F]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/></svg>';
                    }
                  }}
                />
              </div>
              <div className="peer-data-[collapsible=icon]:hidden">
                <h1 className="text-lg font-semibold text-white">e-Lokam</h1>
                <p className="text-xs text-white/90">{t('Kerala Panchayat Raj', 'കേരള പഞ്ചായത്ത് രാജ്')}</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="overflow-y-auto overflow-x-hidden flex-1 min-h-0">
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {currentNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => handleNavigation(item.id)}
                          isActive={currentScreen === item.id}
                          className="text-white hover:bg-white/20 data-[active=true]:bg-white/30"
                          tooltip={t(item.label, item.labelMl)}
                        >
                          <Icon className="w-4 h-4" />
                          <div className="flex flex-col items-start">
                            <span>{t(item.label, item.labelMl)}</span>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="p-4 border-t border-white/20 peer-data-[collapsible=icon]:hidden">
            <div className="text-xs text-white/70 text-center">
              <div>{t('Kerala Panchayat Raj', 'കേരള പഞ്ചായത്ത് രാജ്')}</div>
              <div className="mt-1">{t('Version 1.0', 'പതിപ്പ് 1.0')}</div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content Area */}
        <SidebarInset className="flex flex-col min-w-0">
          {/* Main Content */}
          <main className="flex-1 w-full min-w-0 overflow-x-hidden px-4 py-6">
            <div className="w-full">
              {renderScreen()}
            </div>
          </main>

          {/* Footer */}
          <footer className="mt-12 border-t bg-muted/30 w-full flex-shrink-0">
            <div className="w-full px-4 py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sprout className="w-4 h-4 text-[#2D7A4F]" />
                  <span>{t('Powered by e-Lokam', 'e-Lokam പവർ ചെയ്തത്')}</span>
                </div>
                <div className="flex gap-4">
                  <span>{t('Kerala Panchayat Raj Department', 'കേരള പഞ്ചായത്ത് രാജ് വകുപ്പ്')}</span>
                  <span>•</span>
                  <span>{t('Version 1.0', 'പതിപ്പ് 1.0')}</span>
                </div>
              </div>
            </div>
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider children={<AppContent />} />
  );
}
