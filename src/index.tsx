import React, { useId, useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { DndContext, useSensor, useSensors, PointerSensor, Modifier, DragOverlay } from '@dnd-kit/core';
import { createSnapModifier, restrictToWindowEdges } from '@dnd-kit/modifiers';
import { AnimatePresence, motion } from 'framer-motion';
import { CalendarHeader } from './components/CalendarHeader';
import { Sidebar } from './components/Sidebar';
import { MonthView } from './views/MonthView';
import { WeekView } from './views/WeekView';
import { DayView } from './views/DayView';
import { AgendaView } from './views/AgendaView';
import { ResourceView } from './views/ResourceView';
import { EventModal } from './components/EventModal';
import { MonthViewSkeleton, WeekViewSkeleton, DayViewSkeleton, AgendaViewSkeleton } from './components/Skeleton';
import { EventContextMenu, useEventContextMenu } from './components/ContextMenu';
import { CalendarProps, CalendarEvent } from './types';
import { cn } from './utils';
import { getThemeStyles } from './lib/theme';
import { useCalendarLogic } from './hooks/useCalendarLogic';
import { differenceInMinutes, format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, startOfDay, endOfDay, addDays } from 'date-fns';
import { useViewSwipe } from './hooks/useSwipeGesture';
import { getTranslations, LanguageCode } from './locales';
import { getTimeFormatFull } from './lib/date';

// Re-export types for consumers
export type {
  ViewType,
  CalendarEvent,
  CalendarProps,
  CalendarProps as ProSchedulerProps,
  CalendarTheme,
  CalendarTranslations,
  EventType,
  Resource,
  EventReminder,
  EventAttachment,
  ThemeColors,
  LanguageCode,
  SidebarMenuItem,
  CustomView,
} from './types';

// Re-export locale utilities so consumers can access language metadata
export { LANGUAGE_META, LOCALES, getTranslations } from './locales';

// Re-export utilities
export { cn } from './utils';

export const Scheduler: React.FC<CalendarProps> = ({
  events = [],
  view: controlledView,
  onViewChange: controlledOnViewChange,
  date: controlledDate,
  onDateChange: controlledOnDateChange,
  onEventClick,
  onEventDrop,
  onEventCreate,
  onEventUpdate,
  onEventDelete,
  onEventResize,
  timezone,
  onTimezoneChange,
  className,
  theme,
  renderEventForm,
  renderHeader,
  renderMiniCalendar,
  renderEmptyState,
  readOnly,
  calendars,
  resources,
  eventTypes,
  onCalendarToggle,
  isLoading,
  isDarkMode,
  onThemeToggle,
  translations,
  hideViewSwitcher,
  hideLanguageSwitcher,
  initialScrollHour = 8,
  reverseTime: reverseTimeProp = false,
  language = 'tr', // default language is Turkish
  onLanguageChange,
  locale,
  sidebarMenus,
  customViews,
}) => {
  // Tracks which custom sidebar menu is active (null = normal calendar view)
  const [activeCustomMenu, setActiveCustomMenu] = useState<string | null>(null);

  // Tracks which custom view is active (null = built-in view)
  const [activeCustomViewId, setActiveCustomViewId] = useState<string | null>(null);

  // Internal reverse-time state; can be toggled from the Sidebar switch
  const [reverseTime, setReverseTime] = useState(reverseTimeProp);

  const [activeDragEvent, setActiveDragEvent] = useState<CalendarEvent | null>(null);

  // Ref to scheduler root — used to copy resolved theme CSS vars onto the portaled FAB
  const schedulerRef = useRef<HTMLDivElement>(null);
  const [fabCssVars, setFabCssVars] = useState<React.CSSProperties>({});

  // SSR guard — document.body is unavailable during server render
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  // JS media query — more reliable than md:hidden when viewport meta or breakpoints differ
  useEffect(() => {
    if (!isMounted) return;
    const mq = window.matchMedia('(max-width: 767px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [isMounted]);

  // Copy computed theme tokens from scheduler root so portaled FAB inherits the same palette
  const syncFabTheme = useCallback(() => {
    const root = schedulerRef.current;
    if (!root) return;
    const cs = getComputedStyle(root);
    const vars = ['--primary', '--primary-foreground'] as const;
    const next: Record<string, string> = {};
    vars.forEach((name) => {
      const value = cs.getPropertyValue(name).trim();
      if (value) next[name] = value;
    });
    setFabCssVars(next as React.CSSProperties);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    syncFabTheme();
  }, [isMounted, theme, isDarkMode, syncFabTheme]);

  // Context menu state
  const {
    contextMenuEvent,
    contextMenuPosition,
    openContextMenu,
    closeContextMenu,
  } = useEventContextMenu();

  const {
    view,
    currentDate,
    isSidebarOpen,
    setIsSidebarOpen,
    isModalOpen,
    setIsModalOpen,
    selectedEvent,
    modalInitialDate,
    handleViewChange,
    handleDateChange,
    handlePrev,
    handleNext,
    handleToday,
    handleDateClick,
    handleTimeSlotClick,
    handleEventClickInternal,
    handleCreateEvent,
    handleModalSave,
    handleModalDelete,
    handleDragEnd,
    expandedEvents // New export
  } = useCalendarLogic({
    events,
    view: controlledView,
    onViewChange: controlledOnViewChange,
    date: controlledDate,
    onDateChange: controlledOnDateChange,
    onEventClick,
    onEventDrop,
    onEventUpdate,
    onEventCreate,
    onEventDelete,
    readOnly,
    timezone
  });

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const gridSize = 15; // 15px snap (15 minutes if 60px/hr)
  const snapToGrid = createSnapModifier(gridSize);
  const modifiers: Modifier[] = [snapToGrid, restrictToWindowEdges];

  // Disable DnD if readOnly
  const dndSensors = readOnly ? [] : sensors;

  // Handle event resize
  const handleEventResize = (event: CalendarEvent, newEnd: Date) => {
    if (readOnly) return;

    // Call the external callback if provided
    if (onEventResize) {
      onEventResize(event, event.start, newEnd);
    }

    // Also update via onEventUpdate for internal state management
    if (onEventUpdate) {
      onEventUpdate({
        ...event,
        end: newEnd
      });
    }
  };
  
  const id = useId();

  // Mobile swipe gesture support
  const swipeRef = useViewSwipe<HTMLDivElement>(handlePrev, handleNext, true);

  // Build full translation object: base locale + custom overrides
  const t = getTranslations(language as LanguageCode, translations ?? {});

  const handleDragStart = (event: any) => {
    const { active } = event;
    const draggedEvent = expandedEvents.find(e => e.id === active.id);
    if (draggedEvent) {
        setActiveDragEvent(draggedEvent);
    }
  };

  const onDragEndWrapper = (event: any) => {
      setActiveDragEvent(null);
      handleDragEnd(event);
  };
  
  // Calculate height for week/day view drag overlay
  const getDragHeight = () => {
      if (!activeDragEvent) return undefined;
      
      if (view === 'resource') {
        return 80; // Approximate height for resource view events
      }

      if (view !== 'week' && view !== 'day') return undefined;
      const duration = differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
      // 60px per hour
      const height = (duration / 60) * 60; // 60px height base
      // If DayView uses 80px, we should account for that. 
      // Current implementation: WeekView = 60px, DayView = 80px.
      // But DayView uses 80px in DayView.tsx.
      // Let's assume 60px for now as default or pass a prop.
      // Or check view state.
      const hourHeight = view === 'day' ? 80 : 60;
      return (duration / 60) * hourHeight;
  };

  const getDragWidth = () => {
      if (view === 'month') return '100%';
      
      if (view === 'resource' && activeDragEvent) {
          const duration = differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
          const width = (duration / 60) * 100; // 100px per hour in ResourceView
          return `${Math.max(width, 4)}px`;
      }

      // For Week/Day views, use a fixed width that looks like a column
      // Ideally we would measure the column width, but a fixed reasonable width works for the ghost
      return '150px'; 
  };

  // Filter events based on active calendars
  const filteredEvents = useMemo(() => {
      if (!calendars) return expandedEvents;
      const activeCalendarIds = calendars.filter(c => c.active !== false).map(c => c.id);
      return expandedEvents.filter(e => {
          // If event has no calendarId, show it by default OR hide it? 
          // Usually events belong to a calendar. If undefined, maybe show it.
          if (!e.calendarId) return true; 
          return activeCalendarIds.includes(e.calendarId);
      });
  }, [expandedEvents, calendars]);

  // Count events only within the currently visible date range so the badge reflects
  // what the user actually sees (month / week / day / agenda next-30-days).
  const viewEventCount = useMemo(() => {
    let rangeStart: Date;
    let rangeEnd: Date;

    switch (view) {
      case 'month':
        rangeStart = startOfMonth(currentDate);
        rangeEnd = endOfMonth(currentDate);
        break;
      case 'week':
        rangeStart = startOfWeek(currentDate, { weekStartsOn: 1 });
        rangeEnd = endOfWeek(currentDate, { weekStartsOn: 1 });
        break;
      case 'day':
      case 'resource':
        rangeStart = startOfDay(currentDate);
        rangeEnd = endOfDay(currentDate);
        break;
      case 'agenda':
        rangeStart = startOfDay(currentDate);
        rangeEnd = addDays(rangeStart, 30);
        break;
      default:
        return filteredEvents.length;
    }

    return filteredEvents.filter(
      (e) => e.start >= rangeStart && e.start <= rangeEnd
    ).length;
  }, [filteredEvents, view, currentDate]);

  return (
  <>
    <DndContext 
        id={id} 
        sensors={dndSensors} 
        onDragStart={handleDragStart}
        onDragEnd={onDragEndWrapper} 
        modifiers={modifiers}
    >
      <div
        ref={schedulerRef}
        className={cn("flex flex-col h-full bg-background text-foreground relative", className)}
        style={getThemeStyles(theme)}
      >
        {renderHeader ? (
          // Custom header: consumer gets full navigation/state props
          renderHeader({
            currentDate,
            view,
            onPrev: handlePrev,
            onNext: handleNext,
            onToday: handleToday,
            onViewChange: handleViewChange,
            translations: t,
            language: language as LanguageCode,
            onLanguageChange,
            isDarkMode,
            onThemeToggle,
          })
        ) : (
          <CalendarHeader
            currentDate={currentDate}
            onPrev={handlePrev}
            onNext={handleNext}
            onToday={handleToday}
            view={view}
            onViewChange={handleViewChange}
            onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
            isDarkMode={isDarkMode}
            onThemeToggle={onThemeToggle}
            translations={t}
            hideViewSwitcher={hideViewSwitcher}
            language={language}
            onLanguageChange={onLanguageChange}
            locale={locale}
            onCreateEvent={handleCreateEvent}
            customViews={customViews}
            activeCustomViewId={activeCustomViewId}
            onCustomViewChange={(id) => { setActiveCustomViewId(id); setActiveCustomMenu(null); }}
            eventCount={viewEventCount}
            hideLanguageSwitcher={hideLanguageSwitcher}
          />
        )}
        
        <div className="flex flex-1 overflow-hidden">
            {/* ── Desktop Sidebar (md+) — pushes the main content ── */}
            <motion.div
                className="hidden md:block overflow-hidden shrink-0"
                initial={false}
                animate={{
                  width: isSidebarOpen ? 256 : 0,
                  opacity: isSidebarOpen ? 1 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1],
                }}
            >
                <Sidebar
                    currentDate={currentDate}
                    onDateChange={handleDateChange}
                    onViewChange={handleViewChange}
                    onEventCreate={handleCreateEvent}
                    timezone={timezone}
                    onTimezoneChange={onTimezoneChange}
                    className="w-full h-full"
                    readOnly={readOnly}
                    calendars={calendars}
                    onCalendarToggle={onCalendarToggle}
                    translations={t}
                    renderMiniCalendar={renderMiniCalendar}
                    sidebarMenus={sidebarMenus}
                    activeCustomMenu={activeCustomMenu}
                    onCustomMenuChange={(id) => { setActiveCustomMenu(id); setActiveCustomViewId(null); }}
                    reverseTime={reverseTime}
                    onReverseTimeChange={setReverseTime}
                    customViews={customViews}
                    activeCustomViewId={activeCustomViewId}
                    onCustomViewChange={(id) => { setActiveCustomViewId(id); setActiveCustomMenu(null); }}
                />
            </motion.div>

            {/* ── Mobile Sidebar Overlay (below md) — fixed drawer + backdrop ── */}
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.div
                    key="mobile-sidebar-overlay"
                    className="md:hidden fixed inset-0 z-[100] flex"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Sidebar drawer — slides in from left */}
                    <motion.div
                        className="w-[280px] h-full bg-background shadow-2xl overflow-hidden"
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <Sidebar
                            currentDate={currentDate}
                            onDateChange={handleDateChange}
                            onViewChange={handleViewChange}
                            onEventCreate={() => { setIsSidebarOpen(false); handleCreateEvent(); }}
                            timezone={timezone}
                            onTimezoneChange={onTimezoneChange}
                            className="w-full h-full"
                            readOnly={readOnly}
                            calendars={calendars}
                            onCalendarToggle={onCalendarToggle}
                            translations={t}
                            renderMiniCalendar={renderMiniCalendar}
                            sidebarMenus={sidebarMenus}
                            activeCustomMenu={activeCustomMenu}
                            onCustomMenuChange={(id) => { setActiveCustomMenu(id); setActiveCustomViewId(null); setIsSidebarOpen(false); }}
                            reverseTime={reverseTime}
                            onReverseTimeChange={setReverseTime}
                            customViews={customViews}
                            activeCustomViewId={activeCustomViewId}
                            onCustomViewChange={(id) => { setActiveCustomViewId(id); setActiveCustomMenu(null); setIsSidebarOpen(false); }}
                        />
                    </motion.div>
                    {/* Backdrop — tap to close */}
                    <motion.div
                        className="flex-1 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                </motion.div>
              )}
            </AnimatePresence>

            {/* min-h-0 breaks the flex implicit min-height so inner views can scroll */}
            <div className="flex-1 flex flex-col overflow-hidden relative min-h-0">
                {/* ── Custom Sidebar Menu Content ── */}
                {activeCustomMenu !== null && sidebarMenus && (
                  <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    {sidebarMenus.find((m) => m.id === activeCustomMenu)?.component}
                  </div>
                )}

                {/* ── Custom View Content (from header switcher or sidebar İşlemler) ── */}
                {activeCustomViewId !== null && activeCustomMenu === null && customViews && (
                  <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    {customViews.find((v) => v.id === activeCustomViewId)?.component}
                  </div>
                )}

                {/* ── Calendar Views (hidden when a custom menu or custom view is active) ── */}
                {activeCustomMenu === null && activeCustomViewId === null && (isLoading ? (
                    <div className="flex-1 overflow-auto p-0 md:p-4 min-h-0">
                      <div className="h-full min-w-full">
                        {view === 'month' && <MonthViewSkeleton />}
                        {view === 'week' && <WeekViewSkeleton />}
                        {view === 'day' && <DayViewSkeleton />}
                        {view === 'agenda' && <AgendaViewSkeleton />}
                        {view === 'resource' && <WeekViewSkeleton />}
                      </div>
                    </div>
                ) : (
                /* overflow-hidden here: each view owns its own scroll container */
                <div ref={swipeRef} className="flex-1 overflow-hidden p-0 md:p-4 touch-pan-y min-h-0">
                  {/* Use flex column so the child view fills the full padded area */}
                  <div className="flex flex-col h-full min-w-full min-h-0">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={`${view}-${currentDate.toISOString()}-${timezone || 'local'}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: {
                                duration: 0.2,
                                ease: [0.25, 0.1, 0.25, 1],
                              }
                            }}
                            exit={{
                              opacity: 0,
                              y: -8,
                              transition: {
                                duration: 0.15,
                                ease: [0.25, 0.1, 0.25, 1],
                              }
                            }}
                            className="flex-1 min-h-0 flex flex-col"
                            style={{ height: '100%' }}
                        >
                            {view === 'month' && (
                                <MonthView
                                currentDate={currentDate}
                                events={filteredEvents}
                                onEventClick={handleEventClickInternal}
                                onDateClick={handleDateClick}
                                timezone={timezone}
                                locale={locale}
                                />
                            )}
                            {view === 'week' && (
                                <WeekView
                                currentDate={currentDate}
                                events={filteredEvents}
                                onEventClick={handleEventClickInternal}
                                onTimeSlotClick={handleTimeSlotClick}
                                onEventResize={handleEventResize}
                                timezone={timezone}
                                locale={locale}
                                readonly={readOnly}
                                language={language}
                                initialScrollHour={initialScrollHour}
                                reverseTime={reverseTime}
                                />
                            )}
                            {view === 'day' && (
                                <DayView
                                    currentDate={currentDate}
                                    events={filteredEvents}
                                    onEventClick={handleEventClickInternal}
                                    onTimeSlotClick={handleTimeSlotClick}
                                    onEventResize={handleEventResize}
                                    timezone={timezone}
                                    locale={locale}
                                    readonly={readOnly}
                                    language={language}
                                    initialScrollHour={initialScrollHour}
                                    reverseTime={reverseTime}
                                />
                            )}
                            {view === 'agenda' && (
                                <AgendaView
                                    currentDate={currentDate}
                                    events={filteredEvents}
                                    onEventClick={handleEventClickInternal}
                                    onCreateEvent={handleCreateEvent}
                                    translations={t}
                                    language={language}
                                    renderEmptyState={renderEmptyState}
                                />
                            )}
                            {view === 'resource' && resources && (
                                <ResourceView
                                    currentDate={currentDate}
                                    events={filteredEvents}
                                    resources={resources}
                                    onEventClick={handleEventClickInternal}
                                    onTimeSlotClick={(date) => {
                                        if (readOnly) return;
                                        handleTimeSlotClick(date);
                                    }}
                                    locale={locale}
                                    language={language}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                ))}

            </div>
        </div>

        
        {renderEventForm ? (
            renderEventForm({
                isOpen: isModalOpen,
                onClose: () => setIsModalOpen(false),
                event: selectedEvent,
                initialDate: modalInitialDate,
                onSave: handleModalSave,
                onDelete: handleModalDelete
            })
        ) : (
            <EventModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                event={selectedEvent}
                initialDate={modalInitialDate}
                onSave={handleModalSave}
                onDelete={handleModalDelete}
                calendars={calendars}
                eventTypes={eventTypes}
                translations={t}
                language={language}
            />
        )}

        {/* Context Menu */}
        <EventContextMenu
          event={contextMenuEvent}
          position={contextMenuPosition}
          onClose={closeContextMenu}
          onEdit={(event) => {
            handleEventClickInternal(event);
            closeContextMenu();
          }}
          onDelete={(eventId) => {
            onEventDelete?.(eventId);
            closeContextMenu();
          }}
          onDuplicate={(event) => {
            // Create a duplicate with a new ID and slightly shifted time
            const duplicatedEvent: Partial<CalendarEvent> = {
              ...event,
              id: `${event.id}-copy-${Date.now()}`,
              title: `${event.title} ${t.copy}`,
              start: new Date(event.start.getTime() + 24 * 60 * 60 * 1000), // +1 day
              end: new Date(event.end.getTime() + 24 * 60 * 60 * 1000),
            };
            onEventCreate?.(duplicatedEvent);
            closeContextMenu();
          }}
          translations={{
            edit: t.edit,
            delete: t.delete,
            duplicate: t.duplicate,
          }}
        />

        <DragOverlay dropAnimation={null}>
            {activeDragEvent ? (
                <div
                    className={cn(
                      "rounded-lg shadow-2xl border-2 overflow-hidden cursor-grabbing transition-transform",
                      "backdrop-blur-sm",
                      !activeDragEvent.color && "bg-primary/90 border-primary/60 text-primary-foreground",
                    )}
                    style={{
                        backgroundColor: activeDragEvent.color ? `${activeDragEvent.color}e0` : undefined,
                        borderColor: activeDragEvent.color ? `${activeDragEvent.color}80` : undefined,
                        color: activeDragEvent.color ? '#fff' : undefined,
                        width: getDragWidth(),
                        height: getDragHeight() ? `${getDragHeight()}px` : undefined,
                        boxShadow: `0 20px 40px -15px ${activeDragEvent.color || 'var(--primary)'}40, 0 10px 20px -10px rgba(0,0,0,0.2)`,
                        transform: 'rotate(-2deg) scale(1.02)',
                    }}
                >
                    <div className="p-2.5 h-full flex flex-col">
                        {/* Event color accent bar */}
                        <div
                          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg"
                          style={{ backgroundColor: activeDragEvent.color || 'var(--primary)' }}
                        />

                        {/* Content */}
                        <div className="pl-2">
                          <div className="font-semibold truncate text-sm">{activeDragEvent.title}</div>
                          {(view === 'week' || view === 'day') && getDragHeight() && getDragHeight()! > 40 && (
                            <div className="text-xs opacity-80 mt-0.5 flex items-center gap-1">
                              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 6v6l4 2"/>
                              </svg>
                              {format(activeDragEvent.start, getTimeFormatFull(language))} - {format(activeDragEvent.end, getTimeFormatFull(language))}
                            </div>
                          )}
                        </div>

                        {/* Drag indicator */}
                        <div className="absolute bottom-1.5 right-1.5 opacity-60">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="9" cy="5" r="1.5"/>
                            <circle cx="15" cy="5" r="1.5"/>
                            <circle cx="9" cy="12" r="1.5"/>
                            <circle cx="15" cy="12" r="1.5"/>
                            <circle cx="9" cy="19" r="1.5"/>
                            <circle cx="15" cy="19" r="1.5"/>
                          </svg>
                        </div>
                    </div>
                </div>
            ) : null}
        </DragOverlay>

      </div>
    </DndContext>

    {/* Mobile FAB — portaled + inline styles so it stays visible outside overflow-hidden parents */}
    {isMounted && isMobile && !readOnly && createPortal(
      <div
        style={{
          position: 'fixed',
          bottom: 'max(1.5rem, env(safe-area-inset-bottom, 0px))',
          right: 'max(1.5rem, env(safe-area-inset-right, 0px))',
          zIndex: 9999,
          pointerEvents: 'none',
          ...fabCssVars,
        }}
      >
        <button
          type="button"
          aria-label={t.createEvent ?? t.create ?? 'Create event'}
          onClick={handleCreateEvent}
          style={{
            pointerEvents: 'auto',
            width: 48,
            height: 48,
            borderRadius: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'hsl(var(--primary, 221.2 83.2% 53.3%))',
            color: 'hsl(var(--primary-foreground, 210 40% 98%))',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14"/><path d="M12 5v14"/>
          </svg>
        </button>
      </div>,
      document.body
    )}
  </>
  );
};

/** Primary export — backward-compatible alias for v1 `@calendarkit/react` consumers. */
export const ProScheduler = Scheduler;
