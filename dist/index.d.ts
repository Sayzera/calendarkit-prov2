import React from 'react';
import { Locale } from 'date-fns';
import { ClassValue } from 'clsx';

type LanguageCode = 'tr' | 'en' | 'fr' | 'de' | 'es' | 'it' | 'pt' | 'ar' | 'zh' | 'ja' | 'ko' | 'ru' | 'nl' | 'pl' | 'sv';
declare const LANGUAGE_META: Record<LanguageCode, {
    native: string;
    english: string;
    flag: string;
    rtl?: boolean;
}>;
declare const LOCALES: Record<LanguageCode, CalendarTranslations>;
/**
 * Returns the full translation object for a given language code,
 * merged with any custom override translations.
 */
declare function getTranslations(language?: LanguageCode, overrides?: Partial<CalendarTranslations>): CalendarTranslations;

type ViewType = 'month' | 'week' | 'day' | 'agenda' | 'resource';
/**
 * A fully custom view that extends the built-in views (month/week/day/agenda).
 * - Appears as a button in the header's view switcher (after built-in views)
 * - Also listed vertically in the sidebar's İşlemler section
 * - When active, its component replaces the main calendar area
 */
interface CustomView {
    /** Unique identifier — must not collide with built-in ViewType values. */
    id: string;
    /** Short label shown in the header button and sidebar list. */
    label: string;
    /** Optional icon for the header button and sidebar row. */
    icon?: React.ReactNode;
    /** The React node rendered in the main content area when this view is selected. */
    component: React.ReactNode;
}
/**
 * A single custom navigation item shown in the Scheduler sidebar.
 * Clicking it replaces the main calendar area with the provided component.
 */
interface SidebarMenuItem {
    /** Unique key used to track which menu is active. */
    id: string;
    /** Display label shown in the sidebar. */
    label: string;
    /** Optional icon rendered before the label. Any React node (e.g. a Lucide icon). */
    icon?: React.ReactNode;
    /** The component rendered in the main area when this menu item is selected. */
    component: React.ReactNode;
}

interface EventAttachment {
    id: string;
    name: string;
    url?: string;
    type: 'file' | 'link' | 'image';
    size?: string;
}
interface EventReminder {
    id: string;
    type: 'notification' | 'email';
    time: number;
    label?: string;
}
interface CalendarEvent {
    id: string;
    title: string;
    start: Date;
    end: Date;
    description?: string;
    color?: string;
    allDay?: boolean;
    calendarId?: string;
    resourceId?: string;
    type?: string;
    icon?: string;
    attachments?: EventAttachment[];
    guests?: string[];
    reminders?: EventReminder[];
    recurrence?: {
        freq: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
        interval?: number;
        count?: number;
        until?: Date;
        byweekday?: number[];
    };
    [key: string]: any;
}
interface EventType {
    id: string;
    label: string;
    color?: string;
    icon?: React.ReactNode;
}
interface Resource {
    id: string;
    label: string;
    color?: string;
    avatar?: string;
}
interface ThemeColors {
    primary?: string;
    secondary?: string;
    background?: string;
    foreground?: string;
    border?: string;
    muted?: string;
    accent?: string;
}
interface CalendarTheme {
    colors?: ThemeColors;
    fontFamily?: string;
    borderRadius?: string;
}
/** Full set of translation strings used across all components. */
interface CalendarTranslations {
    today: string;
    month: string;
    week: string;
    day: string;
    agenda: string;
    resource: string;
    create: string;
    createEvent: string;
    editEvent: string;
    newEvent: string;
    saveChanges: string;
    delete: string;
    save: string;
    cancel: string;
    edit: string;
    duplicate: string;
    close: string;
    moreOptions: string;
    addAttachment: string;
    addReminder: string;
    title: string;
    addTitle: string;
    start: string;
    end: string;
    allDay: string;
    description: string;
    descriptionAndAttachments: string;
    addDescription: string;
    location: string;
    addLocation: string;
    locationHelpText: string;
    notes: string;
    repeat: string;
    noRepeat: string;
    doesNotRepeat: string;
    daily: string;
    weekly: string;
    monthly: string;
    yearly: string;
    repeatFor: string;
    times: string;
    until: string;
    endRepeat: string;
    never: string;
    afterOccurrences: string;
    onDate: string;
    selectCalendar: string;
    selectType: string;
    calendar: string;
    calendars: string;
    event: string;
    task: string;
    appointmentSchedule: string;
    new: string;
    guests: string;
    addGuests: string;
    guest: string;
    guestCount: string;
    guestsCount: string;
    guestAdded: string;
    guestsAdded: string;
    whosJoining: string;
    suggestedTimes: string;
    viewSuggestions: string;
    whereWillItBe: string;
    dateAndTime: string;
    reminders: string;
    dragAndDrop: string;
    attachments: string;
    reminderAtTime: string;
    reminder5min: string;
    reminder10min: string;
    reminder15min: string;
    reminder30min: string;
    reminder1hour: string;
    reminder2hours: string;
    reminder1day: string;
    reminder2days: string;
    reminder1week: string;
    tomorrow: string;
    eventCount: string;
    eventsCount: string;
    timezone: string;
    localTime: string;
    search: string;
    allTypes: string;
    noTitle: string;
    copy: string;
    clickToOpenInMaps: string;
}
interface CalendarProps {
    events?: CalendarEvent[];
    /** Partial override translations merged on top of the selected language. */
    translations?: Partial<CalendarTranslations>;
    view?: ViewType;
    onViewChange?: (view: ViewType) => void;
    date?: Date;
    onDateChange?: (date: Date) => void;
    onEventClick?: (event: CalendarEvent) => void;
    onEventDrop?: (event: CalendarEvent, start: Date, end: Date) => void;
    onEventResize?: (event: CalendarEvent, start: Date, end: Date) => void;
    onEventCreate?: (event: Partial<CalendarEvent>) => void;
    onEventUpdate?: (event: CalendarEvent) => void;
    onEventDelete?: (eventId: string) => void;
    theme?: CalendarTheme;
    locale?: Locale;
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
    resources?: Resource[];
    eventTypes?: EventType[];
    onCalendarToggle?: (calendarId: string, active: boolean) => void;
    isLoading?: boolean;
    isDarkMode?: boolean;
    onThemeToggle?: () => void;
    hideViewSwitcher?: boolean;
    /**
     * Hour (0–23) the Day and Week views initially scroll to on mount.
     * Defaults to 8 (08:00 AM).
     */
    initialScrollHour?: number;
    /**
     * When true, the time axis is reversed: 23:00 appears at the top,
     * 00:00 at the bottom. Defaults to false.
     */
    reverseTime?: boolean;
    /** BCP 47 language code. Defaults to 'tr' (Turkish). */
    language?: LanguageCode;
    onLanguageChange?: (lang: LanguageCode) => void;
    /**
     * Replace the default event form/modal with a fully custom component.
     * Receives open state, the event being edited, and save/delete handlers.
     */
    renderEventForm?: (props: {
        isOpen: boolean;
        onClose: () => void;
        event?: CalendarEvent | null;
        initialDate?: Date;
        onSave: (event: Partial<CalendarEvent>) => void;
        onDelete?: (eventId: string) => void;
    }) => React.ReactNode;
    /**
     * Replace the default CalendarHeader bar with a fully custom component.
     * All navigation state and handlers are forwarded so you have full control.
     */
    renderHeader?: (props: {
        currentDate: Date;
        view: ViewType;
        onPrev: () => void;
        onNext: () => void;
        onToday: () => void;
        onViewChange: (view: ViewType) => void;
        translations: CalendarTranslations;
        language: LanguageCode;
        onLanguageChange?: (lang: LanguageCode) => void;
        isDarkMode?: boolean;
        onThemeToggle?: () => void;
    }) => React.ReactNode;
    /**
     * Replace the default MiniCalendar in the sidebar with a custom component.
     * Receives the currently selected date and date/view change handlers.
     */
    renderMiniCalendar?: (props: {
        currentDate: Date;
        onDateChange: (date: Date) => void;
        onViewChange?: (view: ViewType) => void;
    }) => React.ReactNode;
    /**
     * Replace the default empty-state shown in the Agenda view with a custom component.
     * Receives the current view type and the create-event handler.
     */
    renderEmptyState?: (props: {
        view: ViewType;
        onCreateEvent?: () => void;
    }) => React.ReactNode;
    /**
     * Custom navigation items rendered in the sidebar.
     * Clicking an item replaces the main calendar area with its `component`.
     * The calendar itself is always accessible via the view switcher in the header.
     */
    sidebarMenus?: SidebarMenuItem[];
    /**
     * Additional views that extend the built-in ones (month / week / day / agenda).
     * Each custom view:
     *   • Gets a button in the header's view switcher (after the built-in ones)
     *   • Is also listed vertically inside the sidebar's İşlemler section
     *   • Renders its `component` in the main content area when selected
     */
    customViews?: CustomView[];
}

declare function cn(...inputs: ClassValue[]): string;

declare const Scheduler: React.FC<CalendarProps>;
/** Primary export — backward-compatible alias for v1 `@calendarkit/react` consumers. */
declare const ProScheduler: React.FC<CalendarProps>;

export { type CalendarEvent, type CalendarProps, type CalendarTheme, type CalendarTranslations, type CustomView, type EventAttachment, type EventReminder, type EventType, LANGUAGE_META, LOCALES, type LanguageCode, ProScheduler, type CalendarProps as ProSchedulerProps, type Resource, Scheduler, type SidebarMenuItem, type ThemeColors, type ViewType, cn, getTranslations };
