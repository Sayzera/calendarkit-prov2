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
import { fr } from 'date-fns/locale';

export default function AdvancedCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [view, setView] = useState<ViewType>('week');
  const [date, setDate] = useState(new Date());
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState<'en' | 'fr' | 'tr'>('en');
  const [timezone, setTimezone] = useState('America/New_York');

  const calendars = [
    { id: 'work', label: 'Work', color: '#3b82f6', active: true },
    { id: 'personal', label: 'Personal', color: '#10b981', active: true },
  ];

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="h-[700px] border rounded-lg overflow-hidden">
        <ProScheduler
          events={events}
          view={view}
          onViewChange={setView}
          date={date}
          onDateChange={setDate}
          calendars={calendars}
          timezone={timezone}
          onTimezoneChange={setTimezone}
          language={language}
          onLanguageChange={setLanguage}
          locale={language === 'fr' ? fr : undefined}
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

| Prop | Type | Description |
|------|------|-------------|
| `events` | `CalendarEvent[]` | Events to display |
| `view` | `ViewType` | `'month' \| 'week' \| 'day' \| 'agenda' \| 'resource'` |
| `date` | `Date` | Focused date |
| `onViewChange` | `(view) => void` | View change handler |
| `onDateChange` | `(date) => void` | Date change handler |
| `onEventCreate` | `(event) => void` | New event |
| `onEventUpdate` | `(event) => void` | Update event |
| `onEventDelete` | `(id) => void` | Delete event |
| `onEventDrop` | `(event, start, end) => void` | Drag and drop handler |
| `onEventResize` | `(event, start, end) => void` | Resize handler |
| `calendars` | `Calendar[]` | Multi-calendar filter |
| `resources` | `Resource[]` | Resource view columns |
| `eventTypes` | `EventType[]` | Event type presets |
| `timezone` | `string` | IANA timezone |
| `onTimezoneChange` | `(tz) => void` | Timezone change |
| `language` | `LanguageCode` | UI language (15+ locales, default `tr`) |
| `onLanguageChange` | `(lang) => void` | Language change |
| `locale` | `Locale` | date-fns locale |
| `isDarkMode` | `boolean` | Dark mode state |
| `onThemeToggle` | `() => void` | Theme toggle |
| `theme` | `CalendarTheme` | Custom colors / radius |
| `customViews` | `CustomView[]` | Extra header views |
| `sidebarMenus` | `SidebarMenuItem[]` | Custom sidebar pages |
| `readOnly` | `boolean` | Disable editing |
| `isLoading` | `boolean` | Skeleton state |
| `renderEventForm` | `(props) => ReactNode` | Custom event modal |
| `renderHeader` | `(props) => ReactNode` | Custom header |

---

## Publish to npm

Repository: [github.com/Sayzera/calendarkit-prov2](https://github.com/Sayzera/calendarkit-prov2)

### First-time setup

```bash
npm login
npm view calendarkit-prov2
npm run build:lib
```

`build:lib` produces:

- `dist/index.js` (CommonJS)
- `dist/index.mjs` (ESM)
- `dist/index.d.ts` / `dist/index.d.mts` (TypeScript types)
- `dist/calendarkit.css` (theme tokens)

### Publish

```bash
npm version patch
npm publish
```

---

## Links

- [GitHub Repository](https://github.com/Sayzera/calendarkit-prov2)
- [npm Package](https://www.npmjs.com/package/calendarkit-prov2)
- [Issues](https://github.com/Sayzera/calendarkit-prov2/issues)

---

## License

MIT — see [LICENSE](LICENSE). Copyright (c) 2026 [Sayzera](https://github.com/Sayzera).
