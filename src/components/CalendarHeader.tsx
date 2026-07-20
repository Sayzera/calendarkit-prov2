import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { format, Locale } from 'date-fns';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Menu, Moon, Sun, CalendarDays, CalendarRange, Calendar, ListTodo, ChevronDown, Globe, Plus, MoreHorizontal } from 'lucide-react';
import { ViewType, CustomView } from '../types';
import { LanguageCode, LANGUAGE_META } from '../locales';
import { cn } from '../utils';

const DROPDOWN_GAP = 8;
const VIEWPORT_PADDING = 8;
const LANG_DROPDOWN_WIDTH = 208; // matches w-52
const CUSTOM_VIEW_DROPDOWN_WIDTH = 160; // matches min-w-[160px]

/** Position a fixed dropdown below its trigger, clamped inside the viewport. */
function getDropdownPosition(triggerRect: DOMRect, dropdownWidth: number) {
  let left = triggerRect.left;
  const top = triggerRect.bottom + DROPDOWN_GAP;

  // If left-aligned panel overflows right, align its right edge with the trigger
  if (left + dropdownWidth > window.innerWidth - VIEWPORT_PADDING) {
    left = triggerRect.right - dropdownWidth;
  }

  // Final clamp so the panel never leaves the viewport
  left = Math.max(VIEWPORT_PADDING, Math.min(left, window.innerWidth - dropdownWidth - VIEWPORT_PADDING));

  return { top, left };
}

interface CalendarHeaderProps {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  view: ViewType;
  onViewChange: (view: ViewType) => void;
  onMenuClick?: () => void;
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  translations: any;
  hideViewSwitcher?: boolean;
  language?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  locale?: Locale;
  /** Called when the user clicks the "Create Event" button in the header. */
  onCreateEvent?: () => void;
  /** Custom views shown after the built-in view buttons with a divider. */
  customViews?: CustomView[];
  /** The id of the currently active custom view (null = built-in view). */
  activeCustomViewId?: string | null;
  /** Called when a custom view button is clicked. */
  onCustomViewChange?: (id: string | null) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrev,
  onNext,
  onToday,
  view,
  onViewChange,
  onMenuClick,
  isDarkMode,
  onThemeToggle,
  translations,
  hideViewSwitcher,
  language = 'tr',
  onLanguageChange,
  locale,
  onCreateEvent,
  customViews,
  activeCustomViewId,
  onCustomViewChange,
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCustomViewOpen, setIsCustomViewOpen] = useState(false);
  const langButtonRef = useRef<HTMLButtonElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const customViewDropdownRef = useRef<HTMLDivElement>(null);
  const customViewButtonRef = useRef<HTMLButtonElement>(null);

  // Measured positions for portal-rendered dropdowns
  const [langPos, setLangPos] = useState<{ top: number; left: number } | null>(null);
  const [customViewPos, setCustomViewPos] = useState<{ top: number; left: number } | null>(null);

  const updateLangPos = useCallback(() => {
    const el = langButtonRef.current;
    if (!el) return;
    setLangPos(getDropdownPosition(el.getBoundingClientRect(), LANG_DROPDOWN_WIDTH));
  }, []);

  const updateCustomViewPos = useCallback(() => {
    const el = customViewButtonRef.current;
    if (!el) return;
    setCustomViewPos(getDropdownPosition(el.getBoundingClientRect(), CUSTOM_VIEW_DROPDOWN_WIDTH));
  }, []);

  // Measure language button position using useLayoutEffect for accuracy after paint
  useLayoutEffect(() => {
    if (!isLangOpen) return;
    updateLangPos();
  }, [isLangOpen, updateLangPos]);

  // Measure custom-view button position
  useLayoutEffect(() => {
    if (!isCustomViewOpen) return;
    updateCustomViewPos();
  }, [isCustomViewOpen, updateCustomViewPos]);

  // Re-measure dropdowns on scroll/resize so they stay anchored to the trigger
  useEffect(() => {
    if (!isLangOpen) return;
    const handle = () => updateLangPos();
    window.addEventListener('resize', handle);
    window.addEventListener('scroll', handle, true);
    return () => {
      window.removeEventListener('resize', handle);
      window.removeEventListener('scroll', handle, true);
    };
  }, [isLangOpen, updateLangPos]);

  useEffect(() => {
    if (!isCustomViewOpen) return;
    const handle = () => updateCustomViewPos();
    window.addEventListener('resize', handle);
    window.addEventListener('scroll', handle, true);
    return () => {
      window.removeEventListener('resize', handle);
      window.removeEventListener('scroll', handle, true);
    };
  }, [isCustomViewOpen, updateCustomViewPos]);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideButton = langButtonRef.current?.contains(target);
      const insideDropdown = langDropdownRef.current?.contains(target);
      if (!insideButton && !insideDropdown) setIsLangOpen(false);
    };
    if (isLangOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLangOpen]);

  // Close custom-view dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideButton = customViewButtonRef.current?.contains(target);
      const insideDropdown = customViewDropdownRef.current?.contains(target);
      if (!insideButton && !insideDropdown) setIsCustomViewOpen(false);
    };
    if (isCustomViewOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCustomViewOpen]);

  const viewConfig = [
    { key: 'month', icon: CalendarDays },
    { key: 'week', icon: CalendarRange },
    { key: 'day', icon: Calendar },
    { key: 'agenda', icon: ListTodo },
  ] as const;

  const currentLang = LANGUAGE_META[language] ?? LANGUAGE_META['tr'];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-3 md:px-5 py-3 border-b-[0px] border-border/50 bg-gradient-to-r from-background via-background to-muted/20 gap-3 md:gap-0 min-h-[64px]">
      {/* ── Left Section: Menu, Navigation, Date Title ── */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
        {/* Controls group: hamburger + today + create + arrows */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Sidebar toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-xl h-10 w-10 transition-all duration-200"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Today button */}
          <Button
            variant="outline"
            onClick={onToday}
            className="h-9 px-5 rounded-xl text-sm font-medium hidden sm:inline-flex border-[0.5px] border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200"
          >
            {translations.today}
          </Button>

          {/* Create Event button — shown next to Today on desktop */}
          {onCreateEvent && (
            <Button
              onClick={onCreateEvent}
              className="h-9 px-4 rounded-xl text-sm font-medium hidden sm:inline-flex gap-1.5 shadow-sm shadow-primary/20 transition-all duration-200"
            >
              <Plus className="h-4 w-4" />
              <span>{translations.createEvent ?? translations.create}</span>
            </Button>
          )}

          {/* Navigation arrows */}
          <div className="flex items-center bg-muted/40 rounded-xl p-0.5">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPrev}
              className="rounded-lg h-8 w-8 hover:bg-background/80 transition-all duration-200"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onNext}
              className="rounded-lg h-8 w-8 hover:bg-background/80 transition-all duration-200"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>

          {/* Current month/year — inline on desktop (sm+), hidden on mobile (moved outside) */}
          <div className="ml-2 md:ml-4 hidden sm:block">
            <h2 className="text-lg md:text-xl font-semibold text-foreground whitespace-nowrap capitalize tracking-tight">
              {format(currentDate, 'MMMM yyyy', { locale })}
            </h2>
          </div>
        </div>

        {/* Current month/year — right-aligned on mobile only */}
        <div className="sm:hidden">
          <h2 className="text-lg font-semibold text-foreground whitespace-nowrap capitalize tracking-tight">
            {format(currentDate, 'MMMM yyyy', { locale })}
          </h2>
        </div>
      </div>

      {/* ── Right Section: Language Switcher, Theme Toggle, View Switcher ── */}
      <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end">

        {/* ── Language Dropdown ── */}
        {onLanguageChange && (
          <div className="relative">
            <button
              ref={langButtonRef}
              onClick={() => setIsLangOpen(!isLangOpen)}
              className={cn(
                "flex items-center gap-1.5 h-9 px-3 rounded-xl text-sm font-medium transition-all duration-200",
                "text-muted-foreground hover:text-foreground hover:bg-accent/80",
                isLangOpen && "bg-accent/80 text-foreground"
              )}
              title={currentLang.english}
            >
              <Globe className="h-3.5 w-3.5" />
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
                {language}
              </span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", isLangOpen && "rotate-180")} />
            </button>

            {/* Dropdown — portalled to body so transforms/overflow can't affect positioning */}
            {isLangOpen && langPos && createPortal(
              <div
                ref={langDropdownRef}
                className="fixed w-52 bg-background border border-border/60 rounded-2xl shadow-2xl z-[9999] overflow-hidden py-1.5"
                style={{ top: langPos.top, left: langPos.left, width: LANG_DROPDOWN_WIDTH }}
              >
                {/* Header */}
                <div className="px-3 py-2 border-b border-border/40 mb-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Language / Dil
                  </p>
                </div>

                {/* Language options */}
                <div className="max-h-72 overflow-y-auto">
                  {(Object.entries(LANGUAGE_META) as [LanguageCode, typeof LANGUAGE_META[LanguageCode]][]).map(([code, meta]) => (
                    <button
                      key={code}
                      onClick={() => { onLanguageChange(code); setIsLangOpen(false); }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150",
                        "hover:bg-accent/60",
                        language === code
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-foreground"
                      )}
                    >
                      <span className="text-lg leading-none w-6 text-center">{meta.flag}</span>
                      <div className="flex-1 text-left">
                        <div className={cn("font-medium", meta.rtl && "text-right")}>{meta.native}</div>
                        <div className="text-xs text-muted-foreground">{meta.english}</div>
                      </div>
                      {language === code && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>,
              document.body
            )}
          </div>
        )}

        {/* ── Theme Toggle ── */}
        {onThemeToggle && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-xl h-9 w-9 hover:bg-accent/80 transition-all duration-200"
            onClick={onThemeToggle}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 text-amber-500" />
            ) : (
              <Moon className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
        )}

        {/* ── View Switcher (built-in + custom views) ── */}
        {!hideViewSwitcher && (
          <div className="flex items-center bg-muted/50 backdrop-blur-sm rounded-xl p-1 gap-0.5">
            {/* Built-in views: month / week / day / agenda */}
            {viewConfig.map(({ key, icon: Icon }) => (
              <Button
                key={key}
                variant="ghost"
                size="sm"
                onClick={() => { onViewChange(key); onCustomViewChange?.(null); }}
                className={cn(
                  "h-8 px-3 text-xs rounded-lg transition-all duration-200 gap-1.5",
                  view === key && !activeCustomViewId
                    ? "bg-background shadow-sm text-foreground font-medium border-[0.5px] border-border/50"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{translations[key]}</span>
              </Button>
            ))}

            {/* Divider + "..." dropdown for custom views */}
            {customViews && customViews.length > 0 && (
              <>
                <div className="w-px h-5 bg-border/60 mx-0.5 shrink-0" />

                <div className="relative">
                  {/* Trigger button — highlighted when a custom view is active */}
                  <Button
                    ref={customViewButtonRef}
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCustomViewOpen((o) => !o)}
                    className={cn(
                      "h-8 px-2.5 text-xs rounded-lg transition-all duration-200 gap-1",
                      activeCustomViewId
                        ? "bg-background shadow-sm text-foreground font-medium border-[0.5px] border-border/50"
                        : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    )}
                    title="Daha fazla görünüm"
                  >
                    {activeCustomViewId
                      ? customViews.find((cv) => cv.id === activeCustomViewId)?.label
                      : <MoreHorizontal className="h-3.5 w-3.5" />}
                    <ChevronDown className={cn("h-3 w-3 transition-transform duration-150", isCustomViewOpen && "rotate-180")} />
                  </Button>

                  {/* Dropdown — portalled to body for correct positioning on mobile */}
                  {isCustomViewOpen && customViewPos && createPortal(
                    <div
                      ref={customViewDropdownRef}
                      className="fixed min-w-[160px] bg-background border border-border/60 rounded-2xl shadow-2xl z-[9999] overflow-hidden py-1.5"
                      style={{ top: customViewPos.top, left: customViewPos.left, minWidth: CUSTOM_VIEW_DROPDOWN_WIDTH }}
                    >
                      {customViews.map((cv) => (
                        <button
                          key={cv.id}
                          onClick={() => { onCustomViewChange?.(cv.id); setIsCustomViewOpen(false); }}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-all duration-150",
                            "hover:bg-accent/60",
                            activeCustomViewId === cv.id
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground"
                          )}
                        >
                          {cv.icon && (
                            <span className="w-4 h-4 flex items-center justify-center shrink-0">
                              {cv.icon}
                            </span>
                          )}
                          <span>{cv.label}</span>
                          {activeCustomViewId === cv.id && (
                            <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>,
                    document.body
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
