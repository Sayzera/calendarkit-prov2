"use client";

import { useState, useMemo } from "react";
import {
  Scheduler,
  CalendarEvent,
  ViewType,
  Resource,
  EventType,
  LanguageCode,
  SidebarMenuItem,
  CustomView,
} from "@/index";
import type { BuiltInEventBadgeId } from "@/index";

interface Calendar {
  id: string;
  label: string;
  color: string;
  active: boolean;
}
import { addDays, startOfWeek, addHours, differenceInMinutes, startOfMonth, endOfMonth, endOfWeek, startOfDay, endOfDay } from "date-fns";
import { DATE_FNS_LOCALES } from "@/index";

/**
 * One demo row per built-in badge — keeps samples in sync with EVENT_BADGES.
 * dayOffset: Mon=1 … Fri=5; hourStart is local hour; duration in hours.
 */
const BADGE_DEMO_SAMPLES: Record<
  BuiltInEventBadgeId,
  { title: string; dayOffset: number; hourStart: number; duration: number; color: string; resourceId?: string; calendarId: string }
> = {
  privateLesson:  { title: "Ayşe Yılmaz",        dayOffset: 1, hourStart: 9,  duration: 1,   color: "#3b82f6", resourceId: "room-a", calendarId: "work" },
  groupLesson:    { title: "A1 İngilizce",       dayOffset: 1, hourStart: 11, duration: 1.5, color: "#8b5cf6", resourceId: "room-b", calendarId: "work" },
  packageLesson:  { title: "Paket: 10. Ders",    dayOffset: 1, hourStart: 14, duration: 1,   color: "#10b981", resourceId: "room-a", calendarId: "work" },
  online:         { title: "Zoom – Mehmet K.",   dayOffset: 2, hourStart: 9,  duration: 1,   color: "#3b82f6", resourceId: "room-a", calendarId: "work" },
  inPerson:       { title: "Sınıf Dersi",        dayOffset: 2, hourStart: 11, duration: 1.5, color: "#f59e0b", resourceId: "room-b", calendarId: "work" },
  trial:          { title: "Deneme Dersi",       dayOffset: 2, hourStart: 15, duration: 1,   color: "#ec4899", calendarId: "personal" },
  workshop:       { title: "Speaking Club",      dayOffset: 3, hourStart: 10, duration: 2,   color: "#8b5cf6", resourceId: "room-c", calendarId: "work" },
  makeup:         { title: "Telafi – Elif S.",   dayOffset: 3, hourStart: 13, duration: 1,   color: "#3b82f6", resourceId: "room-a", calendarId: "work" },
  homeVisit:      { title: "Ev Dersi – Can",     dayOffset: 3, hourStart: 15, duration: 1,   color: "#14b8a6", calendarId: "work" },
  exam:           { title: "Seviye Sınavı",      dayOffset: 4, hourStart: 9,  duration: 2,   color: "#ef4444", resourceId: "room-b", calendarId: "work" },
  listening:      { title: "Listening Lab",      dayOffset: 4, hourStart: 12, duration: 1,   color: "#6366f1", resourceId: "room-c", calendarId: "work" },
  priority:       { title: "VIP – Yönetici",     dayOffset: 4, hourStart: 15, duration: 1,   color: "#f59e0b", resourceId: "room-a", calendarId: "work" },
  cancelled:      { title: "İptal Edilen Slot",  dayOffset: 5, hourStart: 10, duration: 1,   color: "#94a3b8", resourceId: "room-b", calendarId: "work" },
  holiday:        { title: "Resmi Tatil",        dayOffset: 5, hourStart: 13, duration: 2,   color: "#10b981", calendarId: "personal" },
};

// Generate demo events — every built-in EVENT_BADGES preset gets one sample card
const generateDemoEvents = (): CalendarEvent[] => {
  const today = new Date();
  const weekStart = startOfWeek(today);

  // Simulate backend payload: only badgeId string is sent (no JSX)
  const badgeEvents: CalendarEvent[] = (Object.keys(BADGE_DEMO_SAMPLES) as BuiltInEventBadgeId[]).map((badgeId) => {
    const sample = BADGE_DEMO_SAMPLES[badgeId];
    const start = addHours(addDays(weekStart, sample.dayOffset), sample.hourStart);
    const end = addHours(start, sample.duration);
    return {
      id: `badge-${badgeId}`,
      title: sample.title,
      start,
      end,
      calendarId: sample.calendarId,
      color: sample.color,
      resourceId: sample.resourceId,
      // WeekView resolves badgeId → icon + label via resolveEventBadge
      badgeId,
    };
  });

  // One recurring event without a badge (shows non-badge events still work)
  const gymStart = addHours(addDays(weekStart, 3), 17);
  const gym: CalendarEvent = {
    id: "gym",
    title: "Gym",
    start: gymStart,
    end: addHours(gymStart, 1),
    calendarId: "personal",
    color: "#10b981",
    recurrence: { freq: "WEEKLY", interval: 1 },
  };

  return [...badgeEvents, gym];
};

// Demo resources
const demoResources: Resource[] = [
  { id: "room-a", label: "Conference Room A", color: "#3b82f6" },
  { id: "room-b", label: "Conference Room B", color: "#10b981" },
  { id: "room-c", label: "Meeting Room C", color: "#f59e0b" },
];

// Demo event types
const demoEventTypes: EventType[] = [
  { id: "meeting", label: "Meeting", color: "#3b82f6" },
  { id: "focus", label: "Focus Time", color: "#8b5cf6" },
  { id: "personal", label: "Personal", color: "#10b981" },
];

// Translations
const translations = {
  en: {
    today: "Today",
    month: "Month",
    week: "Week",
    day: "Day",
    agenda: "Agenda",
    resource: "Resource",
    createEvent: "Create Event",
    editEvent: "Edit Event",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    title: "Title",
    start: "Start",
    end: "End",
    allDay: "All Day",
    description: "Description",
    repeat: "Repeat",
    noRepeat: "Does not repeat",
    selectCalendar: "Select Calendar",
    selectType: "Select Type",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
  },
  fr: {
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    agenda: "Agenda",
    resource: "Ressource",
    createEvent: "Créer un événement",
    editEvent: "Modifier l'événement",
    delete: "Supprimer",
    save: "Enregistrer",
    cancel: "Annuler",
    title: "Titre",
    start: "Début",
    end: "Fin",
    allDay: "Toute la journée",
    description: "Description",
    repeat: "Répéter",
    noRepeat: "Ne se répète pas",
    selectCalendar: "Sélectionner un calendrier",
    selectType: "Sélectionner un type",
    daily: "Quotidien",
    weekly: "Hebdomadaire",
    monthly: "Mensuel",
    yearly: "Annuel",
  },
};

// Demo custom views (appear in header switcher + sidebar İşlemler)
const demoCustomViews: CustomView[] = [
  {
    id: "statistics",
    label: "İstatistik",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    component: (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">İstatistikler</h2>
        <p className="text-muted-foreground">Buraya kendi istatistik bileşeninizi koyabilirsiniz.</p>
      </div>
    ),
  },
  {
    id: "team",
    label: "Ekip",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
    component: (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Ekip Görünümü</h2>
        <p className="text-muted-foreground">Buraya kendi ekip bileşeninizi koyabilirsiniz.</p>
      </div>
    ),
  },
];

// Demo custom sidebar menus
const demoSidebarMenus: SidebarMenuItem[] = [
  {
    id: "my-tasks",
    label: "Görevlerim",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
      </svg>
    ),
    component: (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Görevlerim</h2>
        <p className="text-muted-foreground">Buraya kendi görev bileşeninizi koyabilirsiniz.</p>
      </div>
    ),
  },
  {
    id: "reports",
    label: "Raporlar",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    ),
    component: (
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Raporlar</h2>
        <p className="text-muted-foreground">Buraya kendi rapor bileşeninizi koyabilirsiniz.</p>
      </div>
    ),
  },
];

export default function Home() {
  const [events, setEvents] = useState<CalendarEvent[]>(generateDemoEvents());
  const [view, setView] = useState<ViewType>("week");
  const [date, setDate] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("tr");
  const [timezone, setTimezone] = useState("America/New_York");

  const [calendars, setCalendars] = useState<Calendar[]>([
    { id: "work", label: "Work", color: "#3b82f6", active: true },
    { id: "personal", label: "Personal", color: "#10b981", active: true },
  ]);



  const filteredEvents = useMemo(() => {
    const activeIds = calendars.filter((c) => c.active).map((c) => c.id);
    return events.filter((e) => !e.calendarId || activeIds.includes(e.calendarId));
  }, [events, calendars]);

  // Hour badge is fully prop-driven — compute booked hours for the current view.
  const hourCount = useMemo(() => {
    let rangeStart: Date;
    let rangeEnd: Date;
    switch (view) {
      case "month":
        rangeStart = startOfMonth(date);
        rangeEnd = endOfMonth(date);
        break;
      case "week":
        rangeStart = startOfWeek(date, { weekStartsOn: 1 });
        rangeEnd = endOfWeek(date, { weekStartsOn: 1 });
        break;
      case "day":
      case "resource":
        rangeStart = startOfDay(date);
        rangeEnd = endOfDay(date);
        break;
      case "agenda":
        rangeStart = startOfDay(date);
        rangeEnd = addDays(rangeStart, 30);
        break;
      default:
        return 0;
    }

    const minutes = filteredEvents
      .filter((e) => e.start >= rangeStart && e.start <= rangeEnd && !e.allDay)
      .reduce((sum, e) => {
        const mins = differenceInMinutes(e.end, e.start);
        return sum + (mins > 0 ? mins : 0);
      }, 0);

    return Math.round((minutes / 60) * 10) / 10;
  }, [filteredEvents, view, date]);

  const handleEventCreate = (newEvent: Partial<CalendarEvent>) => {
    const event: CalendarEvent = {
      ...newEvent,
      id: Math.random().toString(36).substr(2, 9),
      start: newEvent.start as Date,
      end: newEvent.end as Date,
      title: newEvent.title || "New Event",
      color: calendars.find((c) => c.id === newEvent.calendarId)?.color || "#3b82f6",
    };
    setEvents((prev) => [...prev, event]);
  };

  console.log(events, "events")

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
    );
  };

  const handleEventDelete = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 ${isDarkMode ? "dark" : ""}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">ProScheduler</h1>
          <p className="text-muted-foreground">
            Professional React calendar with drag-drop, timezone support, i18n, resources, and recurring events.
          </p>
        </div>

        <div className="h-[800px] border rounded-lg overflow-hidden">
          <Scheduler
            events={filteredEvents}
            view={view}
            onViewChange={setView}
            date={date}
            onDateChange={setDate}
            calendars={calendars}
            onCalendarToggle={(id, active) => {
              setCalendars((cals) =>
                cals.map((c) => (c.id === id ? { ...c, active } : c))
              );
            }}
            onEventCreate={handleEventCreate}
            onEventUpdate={handleEventUpdate}
            onEventDelete={handleEventDelete}
            resources={demoResources}
            eventTypes={demoEventTypes}
            isDarkMode={isDarkMode}
            onThemeToggle={() => setIsDarkMode(!isDarkMode)}
            timezone={timezone}
            onTimezoneChange={setTimezone}
            language={language}
            onLanguageChange={setLanguage}
            locale={DATE_FNS_LOCALES[language]}
            sidebarMenus={demoSidebarMenus}
            customViews={demoCustomViews}
            hourCount={hourCount}
          />
        </div>
      </div>
    </main>
  );
}
