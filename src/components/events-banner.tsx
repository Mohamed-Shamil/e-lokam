import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar, Clock, MapPin, Users, AlertCircle } from 'lucide-react';

interface Event {
  id: string;
  titleEn: string;
  titleMl: string;
  description: string;
  descriptionMl: string;
  type: 'gramasabha' | 'meeting' | 'event' | 'announcement';
  startDate: Date;
  endDate?: Date;
  location: string;
  locationMl: string;
  organizer: string;
  organizerMl: string;
  isImportant: boolean;
  createdBy: 'member' | 'admin';
}

interface EventsBannerProps {
  events?: Event[];
}

const mockEvents: Event[] = [
  {
    id: 'evt1',
    titleEn: 'Gramasabha Meeting',
    titleMl: 'ഗ്രാമസഭാ സമ്മേളനം',
    description: 'Annual gramasabha meeting to discuss development projects and citizen concerns',
    descriptionMl: 'വികസന പദ്ധതികളും പൗര ആശങ്കകളും ചർച്ച ചെയ്യുന്ന വാർഷിക ഗ്രാമസഭാ സമ്മേളനം',
    type: 'gramasabha',
    startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 2 days 3 hours from now
    location: 'Panchayat Office, Ward 5',
    locationMl: 'പഞ്ചായത്ത് ഓഫീസ്, വാർഡ് 5',
    organizer: 'Block Panchayat',
    organizerMl: 'ബ്ലോക്ക് പഞ്ചായത്ത്',
    isImportant: true,
    createdBy: 'admin'
  },
  {
    id: 'evt2',
    titleEn: 'Health Awareness Program',
    titleMl: 'ആരോഗ്യ അവബോധന പരിപാടി',
    description: 'Free health checkup and awareness program for all residents',
    descriptionMl: 'എല്ലാ നിവാസികൾക്കും സൗജന്യ ആരോഗ്യ പരിശോധനയും അവബോധന പരിപാടിയും',
    type: 'event',
    startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // 5 days 10 hours from now
    location: 'Community Hall, Ward 3',
    locationMl: 'കമ്മ്യൂണിറ്റി ഹാൾ, വാർഡ് 3',
    organizer: 'Ward Member - Sreelatha Menon',
    organizerMl: 'വാർഡ് മെമ്പർ - ശ്രീലത മേനോൻ',
    isImportant: true,
    createdBy: 'member'
  },
  {
    id: 'evt3',
    titleEn: 'Ward Development Committee Meeting',
    titleMl: 'വാർഡ് വികസന കമ്മിറ്റി സമ്മേളനം',
    description: 'Monthly meeting to review ongoing projects and plan new initiatives',
    descriptionMl: 'നടന്നുകൊണ്ടിരിക്കുന്ന പദ്ധതികൾ അവലോകനം ചെയ്യാനും പുതിയ പദ്ധതികൾ ആസൂത്രണം ചെയ്യാനും മാസിക സമ്മേളനം',
    type: 'meeting',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // 7 days 14 hours from now
    location: 'Ward Office, Ward 5',
    locationMl: 'വാർഡ് ഓഫീസ്, വാർഡ് 5',
    organizer: 'Ward Member - Rajesh Kumar',
    organizerMl: 'വാർഡ് മെമ്പർ - രാജേഷ് കുമാർ',
    isImportant: false,
    createdBy: 'member'
  }
];

export function EventsBanner({ events = mockEvents }: EventsBannerProps) {
  const [timeRemaining, setTimeRemaining] = useState<Record<string, { days: number; hours: number; minutes: number; seconds: number }>>({});

  useEffect(() => {
    const updateTimers = () => {
      const timers: Record<string, { days: number; hours: number; minutes: number; seconds: number }> = {};
      
      events.forEach(event => {
        const now = new Date().getTime();
        const eventTime = event.startDate.getTime();
        const difference = eventTime - now;

        if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          timers[event.id] = { days, hours, minutes, seconds };
        } else {
          timers[event.id] = { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
      });

      setTimeRemaining(timers);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 1000);

    return () => clearInterval(interval);
  }, [events]);

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'gramasabha':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'meeting':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'event':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'announcement':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getEventTypeLabel = (type: Event['type']) => {
    switch (type) {
      case 'gramasabha':
        return { en: 'Gramasabha', ml: 'ഗ്രാമസഭ' };
      case 'meeting':
        return { en: 'Meeting', ml: 'സമ്മേളനം' };
      case 'event':
        return { en: 'Event', ml: 'പരിപാടി' };
      case 'announcement':
        return { en: 'Announcement', ml: 'അറിയിപ്പ്' };
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter important events and sort by date
  const importantEvents = events
    .filter(event => event.isImportant)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
    .slice(0, 1); // Show only the next upcoming event

  if (importantEvents.length === 0) return null;

  const event = importantEvents[0];
  const timer = timeRemaining[event.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const typeLabel = getEventTypeLabel(event.type);
  const isExpired = timer.days === 0 && timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0;

  if (isExpired) return null;

  // Format timer for compact display
  const formatCompactTimer = () => {
    if (timer.days > 0) return `${timer.days}d ${timer.hours}h`;
    if (timer.hours > 0) return `${timer.hours}h ${timer.minutes}m`;
    return `${timer.minutes}m ${timer.seconds}s`;
  };

  return (
    <Card className="border-2 border-orange-400 shadow-md mb-4">
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <AlertCircle className="w-5 h-5 text-orange-600 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <Badge variant="outline" className={`text-xs ${getEventTypeColor(event.type)}`}>
                  {typeLabel.en}
                </Badge>
                <span className="font-semibold text-sm md:text-base truncate">{event.titleEn}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{event.titleMl}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="flex items-center gap-1 text-orange-600">
                <Clock className="w-4 h-4" />
                <span className="font-bold text-sm md:text-base">{formatCompactTimer()}</span>
              </div>
              <p className="text-xs text-muted-foreground">Time Remaining</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50 text-xs"
            >
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

