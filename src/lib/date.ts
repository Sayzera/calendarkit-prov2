import { 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  eachDayOfInterval, 
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
  format,
  Locale,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDays as addDaysFns,
  subDays
} from 'date-fns';

export const getMonthGrid = (date: Date, weekStartOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0): Date[] => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(monthStart);
  
  const startDate = startOfWeek(monthStart, { weekStartsOn: weekStartOn });
  const endDate = endOfWeek(monthEnd, { weekStartsOn: weekStartOn });

  const dateFormat = 'd';
  const rows = [];
  let days = [];
  let day = startDate;
  let formattedDate = '';

  const grid: Date[] = [];

  // If the grid needs to always show 6 weeks (42 days) to be consistent
  // const totalDays = 42; 
  // But eachDayOfInterval is easier.
  
  return eachDayOfInterval({
    start: startDate,
    end: endDate
  });
};

export const getWeekDays = (date: Date, weekStartOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = 0): Date[] => {
  const start = startOfWeek(date, { weekStartsOn: weekStartOn });
  const end = endOfWeek(date, { weekStartsOn: weekStartOn });
  return eachDayOfInterval({ start, end });
};

export const getTimeSlots = (startHour: number = 0, endHour: number = 24, intervalMinutes: number = 30): Date[] => {
  // This might return just simple objects or dates relative to a base
  // For rendering the y-axis, we just need the labels usually.
  // But for the grid, we might need slots.
  
  // Simplified for now: return strings or just numbers
  return []; 
};

// ─── Time-format helpers ──────────────────────────────────────────────────────

/**
 * Languages that conventionally use 12-hour AM/PM clock.
 * All others default to 24-hour format.
 */
const AMPM_LANGUAGES = new Set(['en']);

/** Returns true when the given language uses AM/PM (12-hour) clock. */
export const uses12Hour = (language: string): boolean =>
  AMPM_LANGUAGES.has(language);

/**
 * Short hour label used on time-axis columns (e.g. "2 PM" vs "14:00").
 *  - 12h: 'h a'  → "2 PM"
 *  - 24h: 'H:mm' → "14:00"  (omits leading zero and colon when on the hour: use 'H' not 'HH')
 */
export const getTimeFormat = (language: string): string =>
  uses12Hour(language) ? 'h a' : 'H:mm';

/**
 * Full time string including minutes (e.g. "2:30 PM" vs "14:30").
 *  - 12h: 'h:mm a'  → "2:30 PM"
 *  - 24h: 'HH:mm'   → "14:30"
 */
export const getTimeFormatFull = (language: string): string =>
  uses12Hour(language) ? 'h:mm a' : 'HH:mm';

// ─────────────────────────────────────────────────────────────────────────────

export {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  isToday,
  format,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks,
  addDaysFns,
  subDays
};
