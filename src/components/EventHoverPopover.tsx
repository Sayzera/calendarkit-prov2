import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CalendarEvent } from '../types';
import { cn } from '../utils';

interface EventHoverPopoverProps {
  /** When false, children render as-is with no hover popover. */
  enabled: boolean;
  event: CalendarEvent;
  /** Pre-formatted time range, e.g. "09:00 - 09:30". */
  timeRange: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Wraps a short event card: shows only children (title) in place,
 * and on hover opens a portaled popover with details (no badge — badges are disabled on short events).
 */
export const EventHoverPopover: React.FC<EventHoverPopoverProps> = ({
  enabled,
  event,
  timeRange,
  children,
  className,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, placeAbove: true });
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Position popover above the card when possible; flip below if near top edge
  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const placeAbove = rect.top > 160;
    setCoords({
      top: placeAbove ? rect.top - 8 : rect.bottom + 8,
      left: Math.min(
        Math.max(rect.left + rect.width / 2, 120),
        window.innerWidth - 120
      ),
      placeAbove,
    });
  }, []);

  const show = useCallback(() => {
    if (!enabled) return;
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    updatePosition();
    setOpen(true);
  }, [enabled, updatePosition]);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setOpen(false), 80);
  }, []);

  // Keep popover aligned while scrolling / resizing
  useEffect(() => {
    if (!open) return;
    const onMove = () => updatePosition();
    window.addEventListener('scroll', onMove, true);
    window.addEventListener('resize', onMove);
    return () => {
      window.removeEventListener('scroll', onMove, true);
      window.removeEventListener('resize', onMove);
    };
  }, [open, updatePosition]);

  useEffect(() => () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  if (!enabled) {
    return <>{children}</>;
  }

  const accent = event.color || 'hsl(var(--primary))';

  return (
    <>
      <div
        ref={triggerRef}
        className={cn('h-full w-full', className)}
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
      >
        {children}
      </div>

      {open &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="tooltip"
            className={cn(
              'fixed z-[10000] w-64 max-w-[min(16rem,calc(100vw-1.5rem))]',
              'rounded-xl border border-border/60 bg-popover text-popover-foreground',
              'shadow-xl shadow-black/10 backdrop-blur-md',
              'pointer-events-none transition-opacity duration-150'
            )}
            style={{
              top: coords.top,
              left: coords.left,
              transform: coords.placeAbove
                ? 'translate(-50%, -100%)'
                : 'translate(-50%, 0)',
            }}
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
          >
            {/* Color accent bar */}
            <div
              className="h-1 rounded-t-xl"
              style={{ backgroundColor: accent }}
            />

            <div className="p-3 space-y-2">
              <div className="text-sm font-semibold leading-snug text-foreground">
                {event.title}
              </div>

              <div className="text-xs font-medium text-muted-foreground tabular-nums">
                {timeRange}
              </div>

              {event.description && (
                <p className="text-xs text-muted-foreground/90 leading-relaxed line-clamp-4">
                  {event.description}
                </p>
              )}

              {/* Meta chips */}
              {(event.guests?.length || event.attachments?.length || event.reminders?.length) ? (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {event.guests && event.guests.length > 0 && (
                    <span className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {event.guests.length} guest{event.guests.length !== 1 ? 's' : ''}
                    </span>
                  )}
                  {event.attachments && event.attachments.length > 0 && (
                    <span className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {event.attachments.length} file{event.attachments.length !== 1 ? 's' : ''}
                    </span>
                  )}
                  {event.reminders && event.reminders.length > 0 && (
                    <span className="rounded-md bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                      {event.reminders.length} reminder{event.reminders.length !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>
              ) : null}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
