import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ChevronDown, Globe, LayoutGrid, X } from 'lucide-react';
import { MiniCalendar } from './MiniCalendar';
import { cn } from '../utils';
import { toZonedTime } from 'date-fns-tz';
import { format } from 'date-fns';

import { ViewType, CalendarEvent, SidebarMenuItem } from '../types';

interface SidebarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onViewChange?: (view: ViewType) => void;
  onEventCreate?: () => void;
  timezone?: string;
  onTimezoneChange?: (timezone: string) => void;
  className?: string;
  readOnly?: boolean;
  calendars?: {
    id: string;
    label: string;
    color?: string;
    active?: boolean;
  }[];
  onCalendarToggle?: (calendarId: string, active: boolean) => void;
  translations?: any;
  events?: CalendarEvent[];
  onImport?: (events: Partial<CalendarEvent>[]) => void;
  /** date-fns locale forwarded to the built-in MiniCalendar for date formatting. */
  locale?: import('date-fns').Locale;
  /** Optional custom mini-calendar component replacing the built-in one. */
  renderMiniCalendar?: (props: {
    currentDate: Date;
    onDateChange: (date: Date) => void;
    onViewChange?: (view: ViewType) => void;
  }) => React.ReactNode;
  /** Custom navigation items; clicking one sets it as the active view. */
  sidebarMenus?: SidebarMenuItem[];
  /** The id of the currently active custom menu (null = calendar view). */
  activeCustomMenu?: string | null;
  /** Called when a custom menu item is clicked. */
  onCustomMenuChange?: (id: string | null) => void;
  /** When true, time flows 23:00 → 00:00 (bottom-to-top). */
  reverseTime?: boolean;
  /** Called when the reverse-time toggle is clicked. */
  onReverseTimeChange?: (reversed: boolean) => void;
  /** Custom views to list inside the İşlemler section. */
  customViews?: import('../types').CustomView[];
  /** The id of the currently active custom view (null = built-in). */
  activeCustomViewId?: string | null;
  /** Called when a custom view row is clicked in the sidebar. */
  onCustomViewChange?: (id: string | null) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentDate,
  onDateChange,
  onViewChange,
  onEventCreate,
  timezone,
  onTimezoneChange,
  className,
  readOnly,
  calendars,
  onCalendarToggle,
  translations,
  renderMiniCalendar,
  sidebarMenus,
  activeCustomMenu,
  onCustomMenuChange,
  reverseTime = false,
  onReverseTimeChange,
  customViews,
  activeCustomViewId,
  onCustomViewChange,
  locale,
}) => {
  const [calendarsOpen, setCalendarsOpen] = useState(true);
  const [timezoneOpen, setTimezoneOpen] = useState(false);
  const [now, setNow] = useState<Date | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  // Controls whether the menu panel is expanded (replaces the İşlemler button)
  const [menusExpanded, setMenusExpanded] = useState(false);

  // Only run on client to prevent hydration mismatch
  useEffect(() => {
    setHasMounted(true);
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);
  
  // Default demo data if no calendars provided
  const defaultCalendars = [
    { id: '1', label: 'My Calendar', color: '#3b82f6', active: true },
    { id: '2', label: 'Birthdays', color: '#10b981', active: true },
    { id: '3', label: 'Tasks', color: '#6366f1', active: true },
  ];

  const displayCalendars = calendars || defaultCalendars;

  const getAcronym = (tz: string) => {
      if (!tz || !now) return 'LOC';
      try {
        return new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' })
            .formatToParts(now)
            .find(part => part.type === 'timeZoneName')?.value || '';
      } catch (e) { return ''; }
  };

  const timezones = [
    { value: '', label: translations?.localTime ?? 'Local Time', acronym: 'LOC' },
    { value: 'UTC', label: 'UTC', acronym: 'UTC' },
    { value: 'America/New_York', label: 'New York', acronym: 'EST' },
    { value: 'America/Chicago', label: 'Chicago', acronym: 'CST' },
    { value: 'America/Denver', label: 'Denver', acronym: 'MST' },
    { value: 'America/Los_Angeles', label: 'Los Angeles', acronym: 'PST' },
    { value: 'Europe/London', label: 'London', acronym: 'GMT' },
    { value: 'Europe/Paris', label: 'Paris', acronym: 'CET' },
    { value: 'Europe/Berlin', label: 'Berlin', acronym: 'CET' },
    { value: 'Asia/Dubai', label: 'Dubai', acronym: 'GST' },
    { value: 'Asia/Tokyo', label: 'Tokyo', acronym: 'JST' },
    { value: 'Asia/Singapore', label: 'Singapore', acronym: 'SGT' },
    { value: 'Australia/Sydney', label: 'Sydney', acronym: 'AEDT' },
  ];

  // Format label with time: HH:MM (ACR)
  const formatTzLabel = (tz: { value: string, label: string, acronym: string }, showTime: boolean = true) => {
      // Don't show time if not mounted yet (SSR) to prevent hydration mismatch
      if (!hasMounted || !now || !showTime) {
          return <span>{tz.label}</span>;
      }

      let time = '';
      let acronym = tz.acronym;

      try {
          if (!tz.value) {
              time = format(now, 'HH:mm');
              // Try to get real local acronym
              try {
                  acronym = new Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
                      .formatToParts(now)
                      .find(part => part.type === 'timeZoneName')?.value || 'LOC';
              } catch (e) {}
          } else {
              const zDate = toZonedTime(now, tz.value);
              time = format(zDate, 'HH:mm');
              // Calculate dynamic acronym if needed (e.g. DST changes)
              const dynAcronym = getAcronym(tz.value);
              if (dynAcronym && !dynAcronym.includes('GMT') && !dynAcronym.includes('Time')) {
                  acronym = dynAcronym;
              }
          }
      } catch (e) {
          return <span>{tz.label}</span>;
      }

      return (
          <div className="flex justify-between w-full">
              <span>{tz.label}</span>
              <span className="text-muted-foreground ml-2 tabular-nums">
                  {time} <span className="text-xs opacity-75">({acronym})</span>
              </span>
          </div>
      );
  };
  
  const selectedTzObj = timezones.find(t => t.value === (timezone || ''));
  const selectedTimezoneLabel = selectedTzObj ? formatTzLabel(selectedTzObj) : (translations?.localTime ?? 'Local Time');



  return (
    <div className={cn("flex flex-col w-[260px] overflow-x-hidden h-full bg-gradient-to-b scrollbar-hide from-background via-background to-muted/10 pt-4 pb-4 overflow-y-auto", className)}>

      {/* ── İşlemler / Sidebar Menus ── */}
      {sidebarMenus && sidebarMenus.length > 0 && (
        <div className="px-4 mb-4">
          {/* When menus are collapsed: show the "İşlemler" button */}
          {!menusExpanded && (
            <Button
              variant="outline"
              className="w-full rounded-2xl h-11 gap-2.5 justify-start border-[0.5px] border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 font-medium text-sm"
              onClick={() => setMenusExpanded(true)}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{translations?.operations ?? 'İşlemler'}</span>
            </Button>
          )}
          

          {/* When menus are expanded: show the menu list, button disappears */}
          {menusExpanded && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Header row with close button */}
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {translations?.operations ?? 'İşlemler'}
                </span>
                <button
                  onClick={() => setMenusExpanded(false)}
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-150"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <nav className="space-y-0.5">
                {/* Calendar — returns to normal calendar view */}
                <button
                  onClick={() => { onCustomMenuChange?.(null); setMenusExpanded(false); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                    activeCustomMenu === null
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                  )}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>{translations?.calendar ?? 'Takvim'}</span>
                  {activeCustomMenu === null && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                </button>

                {/* User-defined sidebar menu items */}
                {sidebarMenus?.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { onCustomMenuChange?.(item.id); setMenusExpanded(false); }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                      activeCustomMenu === item.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                    )}
                  >
                    {item.icon && (
                      <span className="w-4 h-4 shrink-0 flex items-center justify-center">
                        {item.icon}
                      </span>
                    )}
                    <span className="truncate">{item.label}</span>
                    {activeCustomMenu === item.id && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
                  </button>
                ))}

                {/* customViews are only in the header "..." dropdown — not listed here */}
              </nav>
            </div>
          )}
        </div>
      )}

      {/* ── Mobile-only: Create Event button (desktop has it in the header) ── */}
      {onEventCreate && (
        <div className="md:hidden px-4 mb-4">
          <Button
            onClick={() => { onEventCreate(); }}
            className="w-full rounded-2xl h-11 gap-2.5 justify-center shadow-sm shadow-primary/20 transition-all duration-200 font-medium text-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"/><path d="M12 5v14"/>
            </svg>
            <span>{translations?.createEvent ?? 'Etkinlik Oluştur'}</span>
          </Button>
        </div>
      )}

      {/* ── Saat yönü toggle'ı ── */}
      {onReverseTimeChange && (
        <div className="px-4 mb-4">
          <button
            onClick={() => onReverseTimeChange(!reverseTime)}
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-[0.5px] transition-all duration-200 group",
              reverseTime
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-muted/30 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            )}
          >
            {/* Label + direction hint */}
            <div className="flex items-center gap-2.5">
              {/* Up/Down arrow icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5"/>
                <polyline points="5 12 12 5 19 12"/>
                <line x1="12" y1="5" x2="12" y2="19" className="opacity-40"/>
                <polyline points="5 12 12 19 19 12" className="opacity-40"/>
              </svg>
              <div className="text-left">
                <div className="text-xs font-semibold leading-tight">{translations?.reverseTimeLabel ?? 'Saat Yönü'}</div>
                <div className="text-[10px] leading-tight opacity-70 mt-0.5">
                  {reverseTime ? "23:00 → 00:00" : "00:00 → 23:00"}
                </div>
              </div>
            </div>

            {/* Toggle pill */}
            <div className={cn(
              "relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0",
              reverseTime ? "bg-primary" : "bg-border"
            )}>
              <span className={cn(
                "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200",
                reverseTime ? "left-4" : "left-0.5"
              )} />
            </div>
          </button>
        </div>
      )}

      {renderMiniCalendar ? (
        // Custom mini-calendar: receives the same props as the built-in one
        renderMiniCalendar({ currentDate, onDateChange, onViewChange })
      ) : (
        <MiniCalendar currentDate={currentDate} onDateChange={onDateChange} onViewChange={onViewChange} locale={locale} />
      )}

      <div className="flex-1 px-4 space-y-5 mt-5">
        {/* Calendars List */}
        <div className="bg-muted/20 rounded-2xl p-3 border-[0px] border-border/30">
          <div
            className="flex items-center justify-between cursor-pointer hover:bg-accent/50 p-2 -m-1 rounded-xl mb-2 transition-all duration-200"
            onClick={() => setCalendarsOpen(!calendarsOpen)}
          >
            <span className="text-sm font-semibold text-foreground">{translations?.calendars}</span>
            <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", calendarsOpen && "rotate-180")} />
          </div>

          {calendarsOpen && (
            <div className="space-y-1">
              {displayCalendars.map(cal => (
                <div
                    key={cal.id}
                    className="flex items-center gap-3 py-2 px-2 hover:bg-accent/60 rounded-xl cursor-pointer group transition-all duration-200"
                    onClick={() => onCalendarToggle?.(cal.id, !(cal.active ?? true))}
                >
                  <div className="relative flex items-center justify-center">
                    <input
                        type="checkbox"
                        checked={cal.active ?? true}
                        onChange={(e) => {
                             e.stopPropagation();
                             onCalendarToggle?.(cal.id, e.target.checked);
                        }}
                        className="peer h-5 w-5 rounded-md border-2 border-border/60 cursor-pointer appearance-none checked:border-transparent transition-all duration-200"
                        style={{ '--primary-color': cal.color } as React.CSSProperties}
                        data-cal-id={cal.id}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <style>{`
                      input[type="checkbox"][data-cal-id="${cal.id}"]:checked {
                        background-color: ${cal.color} !important;
                        border-color: ${cal.color} !important;
                      }
                      input[type="checkbox"][data-cal-id="${cal.id}"]:focus {
                        --tw-ring-color: ${cal.color}40 !important;
                      }
                    `}</style>
                  </div>
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-sm text-foreground/90 truncate font-medium">{cal.label}</span>
                  </div>
                  <div
                    className="w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: cal.color }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Timezone Selector - Custom UI */}
      <div className="mt-auto px-4 pt-5">
          <div className="bg-muted/20 rounded-2xl p-3">
              <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-lg">
                      <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">{translations?.timezone}</span>
              </div>

              <div className="relative">
                <button
                    onClick={() => setTimezoneOpen(!timezoneOpen)}
                    className="w-full flex items-center justify-between bg-blue-200/40  hover:bg-blue-200/80 rounded-xl py-2.5 pl-4 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200 text-left"
                >
                    <div className="flex-1 truncate mr-2 font-medium">{selectedTimezoneLabel}</div>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", timezoneOpen && "rotate-180")} />
                </button>

                {timezoneOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setTimezoneOpen(false)} />
                        <div className="absolute bottom-full left-0 w-full mb-2 bg-background rounded-xl shadow-2xl z-50 max-h-[260px] overflow-y-auto p-1.5 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-none">
                            {timezones.map(tz => (
                                <div
                                    key={tz.value}
                                    className={cn(
                                        "px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-all duration-200",
                                        (timezone || '') === tz.value
                                            ? "bg-primary text-primary-foreground font-semibold"
                                            : "text-foreground hover:bg-accent/80"
                                    )}
                                    onClick={() => {
                                        onTimezoneChange?.(tz.value);
                                        setTimezoneOpen(false);
                                    }}
                                >
                                    {formatTzLabel(tz)}
                                </div>
                            ))}
                        </div>
                    </>
                 )}
               </div>
          </div>
      </div>
    </div>
  );
};
