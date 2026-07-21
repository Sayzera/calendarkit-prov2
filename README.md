# CalendarKit Pro v2

Professional React calendar component with drag-and-drop, recurring events, timezone support, resource scheduling, custom views, sidebar menus, and 15+ languages.

**Author:** [Sayzera](https://github.com/Sayzera)

[![npm version](https://badge.fury.io/js/calendarkit-prov2.svg)](https://www.npmjs.com/package/calendarkit-prov2)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub](https://img.shields.io/github/stars/Sayzera/calendarkit-prov2?style=social)](https://github.com/Sayzera/calendarkit-prov2)

## Install

```bash
npm install calendarkit-prov2
```

### Peer dependencies

- `react` ^18 or ^19
- `react-dom` ^18 or ^19
- **Tailwind CSS v3+** (required for styling)

---

## Quick start

### 1. Tailwind — scan the package

```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/calendarkit-prov2/dist/**/*.{js,mjs}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
    },
  },
};
```

### 2. Import theme CSS

```tsx
// app/layout.tsx or main.tsx
import 'calendarkit-prov2/calendarkit.css';
```

### 3. Use the component

```tsx
'use client';

import { ProScheduler } from 'calendarkit-prov2';
import type { CalendarEvent, ViewType } from 'calendarkit-prov2';
import { useState } from 'react';

export default function MyCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<ViewType>('week');
  const [date, setDate] = useState(new Date());
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="h-[700px] border rounded-lg overflow-hidden">
        <ProScheduler
          events={events}
          view={view}
          onViewChange={setView}
          date={date}
          onDateChange={setDate}
          isDarkMode={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          onEventCreate={(event) => {
            setEvents((prev) => [
              ...prev,
              { ...event, id: crypto.randomUUID() } as CalendarEvent,
            ]);
          }}
          onEventUpdate={(updated) => {
            setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
          }}
          onEventDelete={(id) => {
            setEvents((prev) => prev.filter((e) => e.id !== id));
          }}
          onEventDrop={(event, newStart, newEnd) => {
            setEvents((prev) =>
              prev.map((e) =>
                e.id === event.id ? { ...e, start: newStart, end: newEnd } : e
              )
            );
          }}
        />
      </div>
    </div>
  );
}
```

> **Migration from v1 (`@calendarkit/react`):** Replace the import path with `calendarkit-prov2`. The component name `ProScheduler` and most props stay the same. `Scheduler` is also exported as an alias.

---

## Exports

```tsx
import {
  ProScheduler,
  Scheduler,
  cn,
  getTranslations,
  LANGUAGE_META,
  LOCALES,
} from 'calendarkit-prov2';

import type {
  CalendarEvent,
  ProSchedulerProps,
  ViewType,
  Resource,
  EventType,
  CustomView,
  SidebarMenuItem,
  CalendarTheme,
  LanguageCode,
} from 'calendarkit-prov2';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `events` | `CalendarEvent[]` | `[]` | Events to display |
| `view` | `ViewType` | — | `'month' \| 'week' \| 'day' \| 'agenda' \| 'resource'` |
| `date` | `Date` | — | Focused date |
| `onViewChange` | `(view) => void` | — | View change handler |
| `onDateChange` | `(date) => void` | — | Date change handler |
| `onEventCreate` | `(event) => void` | — | New event handler |
| `onEventUpdate` | `(event) => void` | — | Update event handler |
| `onEventDelete` | `(id) => void` | — | Delete event handler |
| `onEventDrop` | `(event, start, end) => void` | — | Drag and drop handler |
| `onEventResize` | `(event, start, end) => void` | — | Resize handler |
| `calendars` | `Calendar[]` | — | Multi-calendar filter list |
| `resources` | `Resource[]` | — | Resource view columns |
| `eventTypes` | `EventType[]` | — | Event type presets |
| `timezone` | `string` | — | IANA timezone string |
| `onTimezoneChange` | `(tz) => void` | — | Timezone change handler |
| `language` | `LanguageCode` | `'tr'` | UI language (15+ locales) |
| `onLanguageChange` | `(lang) => void` | — | Language change handler |
| `hideLanguageSwitcher` | `boolean` | `false` | Hide the language dropdown from the header. The `language` prop still sets the active locale. |
| `locale` | `Locale` | — | date-fns locale for date formatting |
| `isDarkMode` | `boolean` | — | Dark mode state |
| `onThemeToggle` | `() => void` | — | Theme toggle handler |
| `theme` | `CalendarTheme` | — | Custom colors / border radius |
| `customViews` | `CustomView[]` | — | Extra views shown in the header switcher |
| `sidebarMenus` | `SidebarMenuItem[]` | — | Custom sidebar pages |
| `readOnly` | `boolean` | `false` | Disable all editing interactions |
| `isLoading` | `boolean` | `false` | Show skeleton loading state |
| `hideViewSwitcher` | `boolean` | `false` | Hide the view switcher buttons from the header |
| `initialScrollHour` | `number` | `8` | Hour (0–23) the Day/Week views scroll to on mount |
| `reverseTime` | `boolean` | `false` | Reverse the time axis (23:00 at top, 00:00 at bottom) |
| `renderEventForm` | `(props) => ReactNode` | — | Replace the default event modal with a custom component |
| `renderHeader` | `(props) => ReactNode` | — | Replace the entire header with a custom component |
| `renderMiniCalendar` | `(props) => ReactNode` | — | Replace the sidebar mini calendar |
| `renderEmptyState` | `(props) => ReactNode` | — | Custom empty state for Agenda view |

---

## Header features

### Event count badge

The header automatically displays a **live event count badge** next to the view switcher. The count reflects only the events visible in the current view period:

| View | Counted range |
|------|--------------|
| Month | All events within the current month |
| Week | All events within the current week (Mon–Sun) |
| Day / Resource | Events on the current day |
| Agenda | Events in the next 30 days |

The badge updates automatically when you navigate or filter calendars.

### Create Event button

The **Create Event** button in the header displays only the `+` icon. Hovering over it reveals a tooltip with the label. On mobile, a floating action button (FAB) is shown instead.

### Language switcher

Use `hideLanguageSwitcher` to lock the UI to a specific language without exposing the dropdown to end users:

```tsx
<ProScheduler
  language="tr"
  hideLanguageSwitcher
  ...
/>
```

---

## CalendarEvent model

```ts
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
    byweekday?: number[]; // 0 = Monday, 6 = Sunday
  };
}
```

---

## Multi-calendar filtering

```tsx
const calendars = [
  { id: 'work',     label: 'Work',     color: '#3b82f6', active: true },
  { id: 'personal', label: 'Personal', color: '#10b981', active: true },
];

<ProScheduler
  calendars={calendars}
  onCalendarToggle={(id, active) => {
    // update your calendar list
  }}
  ...
/>
```

Events with a matching `calendarId` are shown/hidden based on the `active` flag. Events without a `calendarId` are always shown.

---

## Custom views

Add extra views to the header switcher:

```tsx
const customViews: CustomView[] = [
  {
    id: 'timeline',
    label: 'Timeline',
    icon: <MyIcon />,
    component: <MyTimelineView />,
  },
];

<ProScheduler customViews={customViews} ... />
```

---

## Custom sidebar menus

```tsx
const sidebarMenus: SidebarMenuItem[] = [
  {
    id: 'reports',
    label: 'Reports',
    icon: <BarChart2 />,
    component: <ReportsPanel />,
  },
];

<ProScheduler sidebarMenus={sidebarMenus} ... />
```

---

## Links

- [Documentation](https://react-calendarkit-prov2.vercel.app/)
- [GitHub Repository](https://github.com/Sayzera/calendarkit-prov2)
- [npm Package](https://www.npmjs.com/package/calendarkit-prov2)
- [Issues](https://github.com/Sayzera/calendarkit-prov2/issues)

---

## License

MIT — see [LICENSE](LICENSE).

Copyright (c) 2026 [Sayzera](https://github.com/Sayzera)  
Portions Copyright (c) 2025 CalendarKit (original project, forked and extended)
