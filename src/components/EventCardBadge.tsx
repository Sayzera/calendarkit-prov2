import React from 'react';
import { EventBadge } from '../types';
import { cn } from '../utils';

interface EventCardBadgeProps {
  badge: EventBadge;
  /**
   * When true (short events), only the icon is shown to save space.
   * The full name remains available via the native title tooltip.
   */
  compact?: boolean;
  className?: string;
}

/**
 * Renders an event badge in the top-left corner of a timed event card.
 * Expects `badge.icon` (JSX) and `badge.name` (label).
 */
export const EventCardBadge: React.FC<EventCardBadgeProps> = ({
  badge,
  compact = false,
  className,
}) => {
  // Skip render when required fields are missing
  if (!badge?.icon || !badge?.name) return null;

  return (
    <div
      className={cn(
        // Pin to the card's top-left corner above content
        'absolute top-0 left-0 z-10 flex items-center gap-0.5 max-w-[calc(100%-4px)]',
        'rounded-br-md bg-background/85 backdrop-blur-sm border-b border-r border-border/40',
        'px-1 py-0.5 text-[9px] font-semibold leading-none text-foreground/80',
        'pointer-events-none select-none',
        className
      )}
      title={badge.name}
    >
      {/* Icon slot — normalize child SVG size for consistent badge height */}
      <span className="shrink-0 flex items-center justify-center [&>svg]:w-2.5 [&>svg]:h-2.5">
        {badge.icon}
      </span>
      {/* Hide label on compact (short) cards; keep icon only */}
      {!compact && (
        <span className="truncate max-w-[72px]">{badge.name}</span>
      )}
    </div>
  );
};
