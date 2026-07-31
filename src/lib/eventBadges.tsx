import React from 'react';
import {
  User,
  Users,
  Package,
  Video,
  MapPin,
  Sparkles,
  RefreshCw,
  ClipboardCheck,
  Presentation,
  Star,
  PartyPopper,
  Ban,
  Home,
  Headphones,
} from 'lucide-react';
import { BuiltInEventBadgeId, CalendarEvent, EventBadge } from '../types';
import { LanguageCode } from '../locales';

/** Shared class applied to all built-in badge icons for consistent size. */
const ICON_CLASS = 'w-2.5 h-2.5';

// Re-export the id union so consumers can keep importing from this module.
export type { BuiltInEventBadgeId };

/** Icon node for each built-in badge id. */
export const EVENT_BADGE_ICONS: Record<BuiltInEventBadgeId, React.ReactNode> = {
  privateLesson: <User className={ICON_CLASS} />,
  groupLesson: <Users className={ICON_CLASS} />,
  packageLesson: <Package className={ICON_CLASS} />,
  online: <Video className={ICON_CLASS} />,
  inPerson: <MapPin className={ICON_CLASS} />,
  homeVisit: <Home className={ICON_CLASS} />,
  trial: <Sparkles className={ICON_CLASS} />,
  makeup: <RefreshCw className={ICON_CLASS} />,
  exam: <ClipboardCheck className={ICON_CLASS} />,
  workshop: <Presentation className={ICON_CLASS} />,
  priority: <Star className={ICON_CLASS} />,
  holiday: <PartyPopper className={ICON_CLASS} />,
  cancelled: <Ban className={ICON_CLASS} />,
  listening: <Headphones className={ICON_CLASS} />,
};

/** Localized short labels for built-in badges (tr + en fallbacks). */
const EVENT_BADGE_LABELS: Record<'tr' | 'en', Record<BuiltInEventBadgeId, string>> = {
  tr: {
    privateLesson: 'Özel Ders',
    groupLesson: 'Grup Ders',
    packageLesson: 'Paket Ders',
    online: 'Online',
    inPerson: 'Yüz Yüze',
    homeVisit: 'Evde',
    trial: 'Deneme',
    makeup: 'Telafi',
    exam: 'Sınav',
    workshop: 'Workshop',
    priority: 'Öncelikli',
    holiday: 'Tatil',
    cancelled: 'İptal',
    listening: 'Dinleme',
  },
  en: {
    privateLesson: 'Private',
    groupLesson: 'Group',
    packageLesson: 'Package',
    online: 'Online',
    inPerson: 'In Person',
    homeVisit: 'At Home',
    trial: 'Trial',
    makeup: 'Makeup',
    exam: 'Exam',
    workshop: 'Workshop',
    priority: 'Priority',
    holiday: 'Holiday',
    cancelled: 'Cancelled',
    listening: 'Listening',
  },
};

/** Resolve label language — unknown codes fall back to English. */
const resolveLabelLang = (language?: LanguageCode): 'tr' | 'en' =>
  language === 'tr' ? 'tr' : 'en';

/** Type guard for backend string → BuiltInEventBadgeId. */
export function isBuiltInEventBadgeId(id: string): id is BuiltInEventBadgeId {
  return Object.prototype.hasOwnProperty.call(EVENT_BADGE_ICONS, id);
}

/**
 * Build a localized EventBadge for a built-in id.
 * Optional `name` overrides the localized default label.
 */
export function getEventBadge(
  id: BuiltInEventBadgeId,
  language: LanguageCode = 'tr',
  name?: string
): EventBadge {
  const lang = resolveLabelLang(language);
  return {
    icon: EVENT_BADGE_ICONS[id],
    name: name ?? EVENT_BADGE_LABELS[lang][id],
  };
}

/**
 * Resolve the display badge for an event.
 * Priority: explicit `badge` object → `badgeId` from the backend.
 */
export function resolveEventBadge(
  event: Pick<CalendarEvent, 'badge' | 'badgeId'>,
  language: LanguageCode = 'tr'
): EventBadge | undefined {
  // Full badge object wins when both icon and name are present
  if (event.badge?.icon && event.badge?.name) return event.badge;
  // Backend JSON typically only sends a string key
  if (event.badgeId && isBuiltInEventBadgeId(event.badgeId)) {
    return getEventBadge(event.badgeId, language);
  }
  return undefined;
}

/**
 * Ready-made badges with Turkish labels (package default language).
 * Prefer `badgeId` + `resolveEventBadge` when data comes from an API.
 */
export const EVENT_BADGES: Record<BuiltInEventBadgeId, EventBadge> = {
  privateLesson: getEventBadge('privateLesson', 'tr'),
  groupLesson: getEventBadge('groupLesson', 'tr'),
  packageLesson: getEventBadge('packageLesson', 'tr'),
  online: getEventBadge('online', 'tr'),
  inPerson: getEventBadge('inPerson', 'tr'),
  homeVisit: getEventBadge('homeVisit', 'tr'),
  trial: getEventBadge('trial', 'tr'),
  makeup: getEventBadge('makeup', 'tr'),
  exam: getEventBadge('exam', 'tr'),
  workshop: getEventBadge('workshop', 'tr'),
  priority: getEventBadge('priority', 'tr'),
  holiday: getEventBadge('holiday', 'tr'),
  cancelled: getEventBadge('cancelled', 'tr'),
  listening: getEventBadge('listening', 'tr'),
};
