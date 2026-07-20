import React, { useState, useEffect, useRef } from 'react';
import { Modal } from './ui/Modal';
import { CalendarEvent, EventType, EventAttachment, EventReminder } from '../types';
import { format, formatDistanceToNow, differenceInMinutes } from 'date-fns';
import { getTimeFormatFull } from '../lib/date';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Clock, MapPin, AlignLeft, Trash2, X, Edit2,
    Users, Paperclip, File, XCircle, Calendar, ChevronDown, Check, Download,
    Bell, BellRing, Plus, Repeat, Tag, Palette, ChevronRight, Mail,
    ExternalLink, Copy, Share2, MoreHorizontal
  } from 'lucide-react';
import { cn } from '../utils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  event?: CalendarEvent | null;
  initialDate?: Date;
  onSave: (event: Partial<CalendarEvent>) => void;
  onDelete?: (eventId: string) => void;
  calendars?: { id: string; label: string; color?: string }[];
  eventTypes?: EventType[];
  translations: any;
  language?: string;
}

// Reminder options are built dynamically from translations (see getReminderOptions helper below)

// Color palette for events
const COLOR_PALETTE = [
  '#3b82f6', // Blue
  '#ef4444', // Red
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
  '#f97316', // Orange
  '#6366f1', // Indigo
];

/** Build reminder options from the active translation set */
const getReminderOptions = (t: any) => [
  { value: 0,     label: t.reminderAtTime  },
  { value: 5,     label: t.reminder5min    },
  { value: 10,    label: t.reminder10min   },
  { value: 15,    label: t.reminder15min   },
  { value: 30,    label: t.reminder30min   },
  { value: 60,    label: t.reminder1hour   },
  { value: 120,   label: t.reminder2hours  },
  { value: 1440,  label: t.reminder1day    },
  { value: 2880,  label: t.reminder2days   },
  { value: 10080, label: t.reminder1week   },
];

export const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  event,
  initialDate,
  onSave,
  onDelete,
  calendars,
  eventTypes,
  translations,
  language = 'tr',
}) => {
  // Full time format string derived from the active language
  const timeFmt = getTimeFormatFull(language);
  const [mode, setMode] = useState<'view' | 'edit' | 'create'>('create');
  const [activeTab, setActiveTab] = useState<'details' | 'guests' | 'options'>('details');

  const [formData, setFormData] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    location: '',
    start: new Date(),
    end: new Date(),
    allDay: false,
    color: '#3b82f6',
    calendarId: calendars?.[0]?.id,
    type: undefined,
    recurrence: undefined,
    attachments: [],
    reminders: [{ id: '1', type: 'notification', time: 30, label: '30 minutes before' }],
  });

  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isReminderDropdownOpen, setIsReminderDropdownOpen] = useState(false);
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = useState(false);

  const fakeGuests = [
    'alice@example.com',
    'bob@example.com',
    'charlie@example.com',
    'diana@example.com',
    'evan@example.com'
  ];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedGuests, setSelectedGuests] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen) {
      if (event) {
        setMode('view');
        setFormData({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          attachments: event.attachments || [],
          reminders: event.reminders || [{ id: '1', type: 'notification', time: 30, label: '30 minutes before' }],
        });
        setSelectedGuests(event.guests || []);
      } else {
        setMode('create');
        const start = initialDate || new Date();
        const end = new Date(start);
        end.setHours(start.getHours() + 1);

        setFormData({
          title: '',
          description: '',
          location: '',
          start,
          end,
          allDay: false,
          color: '#3b82f6',
          calendarId: calendars?.[0]?.id,
          attachments: [],
          reminders: [{ id: '1', type: 'notification', time: 30, label: '30 minutes before' }],
        });
        setSelectedGuests([]);
        setActiveTab('details');
      }
    }
  }, [isOpen, event, initialDate, calendars]);

  const toggleGuest = (email: string) => {
    setSelectedGuests(prev => {
        const newGuests = prev.includes(email)
            ? prev.filter(e => e !== email)
            : [...prev, email];
        setFormData(curr => ({ ...curr, guests: newGuests }));
        return newGuests;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let eventColor = formData.color;
    if (formData.calendarId && calendars) {
        const selectedCal = calendars.find(c => c.id === formData.calendarId);
        if (selectedCal?.color) {
            eventColor = selectedCal.color;
        }
    }

    onSave({
      ...formData,
      color: eventColor,
      id: event?.id,
    });
    onClose();
  };

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };

  const formatDateForInput = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, "yyyy-MM-dd'T'HH:mm");
  };

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return;

    if (field === 'start') {
        const duration = formData.end!.getTime() - formData.start!.getTime();
        setFormData(prev => ({
            ...prev,
            start: date,
            end: new Date(date.getTime() + duration)
        }));
    } else {
        if (date < formData.start!) {
             setFormData(prev => ({ ...prev, start: date, end: date }));
        } else {
             setFormData(prev => ({ ...prev, end: date }));
        }
    }
  };

  const addReminder = (minutes: number, label: string) => {
    const newReminder: EventReminder = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'notification',
      time: minutes,
      label
    };
    setFormData(prev => ({
      ...prev,
      reminders: [...(prev.reminders || []), newReminder]
    }));
    setIsReminderDropdownOpen(false);
  };

  const removeReminder = (id: string) => {
    setFormData(prev => ({
      ...prev,
      reminders: prev.reminders?.filter(r => r.id !== id)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newAttachments: EventAttachment[] = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: 'file',
        size: `${(file.size / 1024).toFixed(1)} KB`
      }));
      setFormData(prev => ({
        ...prev,
        attachments: [...(prev.attachments || []), ...newAttachments]
      }));
    }
  };

  const removeAttachment = (id: string) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments?.filter(a => a.id !== id)
    }));
  };

  const handleDownload = (attachment: EventAttachment) => {
    const element = document.createElement("a");
    const file = new Blob(['Dummy content for ' + attachment.name], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = attachment.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getDurationText = () => {
    if (!formData.start || !formData.end) return '';
    const mins = differenceInMinutes(formData.end, formData.start);
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (remainingMins === 0) return `${hours} hr`;
    return `${hours} hr ${remainingMins} min`;
  };

  // ========== VIEW MODE ==========
  const renderViewMode = () => (
    <div className="flex flex-col bg-background overflow-hidden w-full max-h-[90vh]">
      {/* Hero Header with Color */}
      <div
        className="relative px-6 pt-6 pb-8"
        style={{
          background: `linear-gradient(135deg, ${event?.color || '#3b82f6'}15 0%, transparent 100%)`
        }}
      >
        {/* Top Actions Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: event?.color || '#3b82f6' }}
            />
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {calendars?.find(c => c.id === event?.calendarId)?.label || 'Event'}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMode('edit')}
              className="p-2 hover:bg-background/80 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              title="Edit"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-destructive/10 rounded-lg transition-all text-muted-foreground hover:text-destructive"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-background/80 rounded-lg transition-all text-muted-foreground hover:text-foreground"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-3 leading-tight">
          {event?.title || translations.noTitle}
        </h1>

        {/* Date & Time */}
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded-lg border border-border/30">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">
              {event?.start && format(new Date(event.start), 'EEE, MMM d')}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded-lg border border-border/30">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="font-medium">
              {event?.start && format(new Date(event.start), timeFmt)} – {event?.end && format(new Date(event.end), timeFmt)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 pb-6 space-y-4 overflow-y-auto flex-1">
        {/* Location */}
        {event?.location && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/30 group hover:bg-muted/50 transition-all cursor-pointer"
          >
            <div className="p-2 bg-primary/10 rounded-xl">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{event.location}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{translations.clickToOpenInMaps}</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        )}

        {/* Guests */}
        {event?.guests && event.guests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {event.guests.length} {event.guests.length > 1 ? translations.guestsCount : translations.guestCount}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {event.guests.map((email, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 transition-all cursor-pointer group"
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white"
                    style={{ backgroundColor: `hsl(${index * 60}, 70%, 50%)` }}
                  >
                    {email[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{email.split('@')[0]}</p>
                    <p className="text-xs text-muted-foreground truncate">{email}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Reminders */}
        {event?.reminders && event.reminders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="p-2 bg-amber-500/10 rounded-xl">
              <Bell className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex flex-wrap gap-2">
              {event.reminders.map(reminder => (
                <span
                  key={reminder.id}
                  className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400"
                >
                  {reminder.label || `${reminder.time} min before`}
                </span>
              ))}
            </div>
          </motion.div>
        )}

        {/* Description */}
        {event?.description && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{translations.notes}</span>
            </div>
            <div className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed pl-6 p-3 rounded-xl bg-muted/20 border border-border/30">
              {event.description}
            </div>
          </motion.div>
        )}

        {/* Attachments */}
        {event?.attachments && event.attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2">
              <Paperclip className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{translations.attachments}</span>
            </div>
            <div className="grid gap-2">
              {event.attachments.map(att => (
                <div
                  key={att.id}
                  onClick={() => handleDownload(att)}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <File className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{att.name}</p>
                    <p className="text-xs text-muted-foreground">{att.size}</p>
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );

  // ========== EDIT/CREATE MODE ==========
  const renderEditMode = () => (
    <form onSubmit={handleSubmit} className="flex flex-col bg-background overflow-hidden w-full max-h-[85vh]">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
            className="relative p-1"
          >
            <div
              className="w-5 h-5 rounded-full cursor-pointer hover:scale-110 transition-transform"
              style={{
                backgroundColor: formData.color,
                boxShadow: `0 0 0 2px var(--background), 0 0 0 4px ${formData.color}60`
              }}
            />
            {isColorPickerOpen && (
              <div className="absolute top-full left-0 mt-2 p-2 bg-background border border-border rounded-xl shadow-xl z-50 flex flex-wrap gap-1.5 w-[180px]">
                {COLOR_PALETTE.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, color }));
                      setIsColorPickerOpen(false);
                    }}
                    className={cn(
                      "w-7 h-7 rounded-full transition-all hover:scale-110",
                      formData.color === color && "ring-2 ring-offset-2 ring-offset-background ring-current"
                    )}
                    style={{ backgroundColor: color, color: color }}
                  />
                ))}
              </div>
            )}
          </button>
          <h2 className="text-lg font-semibold text-foreground">
            {mode === 'edit' ? translations.editEvent : translations.newEvent}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 hover:bg-accent rounded-xl transition-all text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-5 py-4 space-y-5">
          {/* Title */}
          <div>
            <input
              type="text"
              required
              autoFocus
              className="w-full text-xl font-semibold border-0 border-b-2 border-transparent focus:border-primary bg-transparent px-0 py-2 placeholder-muted-foreground/50 transition-all text-foreground focus:outline-none"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              placeholder={translations.addTitle}
            />
          </div>

          {/* Date & Time Row */}
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/20 border border-border/30">
            <div className="p-2 bg-primary/10 rounded-xl shrink-0">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">{translations.start}</label>
                <input
                  type="datetime-local"
                  className="w-full bg-background border border-border/50 rounded-xl px-3 py-2 text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={formatDateForInput(formData.start)}
                  onChange={e => handleDateChange('start', e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">{translations.end}</label>
                <input
                  type="datetime-local"
                  className="w-full bg-background border border-border/50 rounded-xl px-3 py-2 text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  value={formatDateForInput(formData.end)}
                  onChange={e => handleDateChange('end', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Duration Badge */}
          {getDurationText() && (
            <div className="flex justify-center">
              <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                {getDurationText()}
              </span>
            </div>
          )}

          {/* Reminders */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{translations.reminders}</span>
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsReminderDropdownOpen(!isReminderDropdownOpen)}
                  className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {translations.addReminder}
                </button>
                {isReminderDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsReminderDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-xl shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
                      {getReminderOptions(translations).map(option => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => addReminder(option.value, option.label)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            {formData.reminders && formData.reminders.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.reminders.map(reminder => (
                  <div
                    key={reminder.id}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20"
                  >
                    <BellRing className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                      {reminder.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeReminder(reminder.id)}
                      className="p-0.5 hover:bg-amber-500/20 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3 text-amber-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{translations.guests}</span>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsGuestsDropdownOpen(!isGuestsDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-muted/20 border border-border/30 rounded-xl text-sm text-left hover:bg-muted/30 transition-all"
              >
                <span className={selectedGuests.length > 0 ? "text-foreground font-medium" : "text-muted-foreground"}>
                  {selectedGuests.length > 0
                    ? `${selectedGuests.length} ${selectedGuests.length > 1 ? translations.guestsAdded : translations.guestAdded}`
                    : translations.addGuests}
                </span>
                <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isGuestsDropdownOpen && "rotate-180")} />
              </button>

              {isGuestsDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsGuestsDropdownOpen(false)} />
                  <div className="absolute z-50 w-full mt-2 bg-background border border-border rounded-xl shadow-xl max-h-48 overflow-y-auto">
                    {fakeGuests.map(email => (
                      <div
                        key={email}
                        className="px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-3 transition-colors"
                        onClick={() => toggleGuest(email)}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
                          selectedGuests.includes(email) ? 'bg-primary border-primary' : 'border-border'
                        )}>
                          {selectedGuests.includes(email) && <Check className="w-3 h-3 text-primary-foreground" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                            style={{ backgroundColor: `hsl(${fakeGuests.indexOf(email) * 60}, 70%, 50%)` }}
                          >
                            {email[0].toUpperCase()}
                          </div>
                          <span className="text-sm">{email}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {selectedGuests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedGuests.map(email => (
                  <div
                    key={email}
                    className="flex items-center gap-2 pl-1 pr-2 py-1 bg-muted/30 border border-border/30 rounded-full"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
                      style={{ backgroundColor: `hsl(${fakeGuests.indexOf(email) * 60}, 70%, 50%)` }}
                    >
                      {email[0].toUpperCase()}
                    </div>
                    <span className="text-xs font-medium text-foreground">{email.split('@')[0]}</span>
                    <button
                      type="button"
                      onClick={() => toggleGuest(email)}
                      className="p-0.5 hover:bg-destructive/10 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3 text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30">
            <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              className="flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none"
              placeholder={translations.addLocation}
              value={formData.location || ''}
              onChange={e => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{translations.notes}</span>
            </div>
            <textarea
              className="w-full bg-muted/20 border border-border/30 rounded-xl px-4 py-3 text-sm min-h-[100px] resize-none text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              placeholder={translations.addDescription}
              value={formData.description || ''}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Recurrence */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30">
            <Repeat className="w-5 h-5 text-muted-foreground shrink-0" />
            <select
              className="flex-1 bg-transparent text-sm text-foreground focus:outline-none cursor-pointer"
              value={formData.recurrence?.freq || ''}
              onChange={e => {
                if (e.target.value === '') {
                  setFormData({ ...formData, recurrence: undefined });
                } else {
                  setFormData({
                    ...formData,
                    recurrence: {
                      freq: e.target.value as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY',
                      interval: 1
                    }
                  });
                }
              }}
            >
              <option value="">{translations.doesNotRepeat}</option>
              <option value="DAILY">{translations.daily}</option>
              <option value="WEEKLY">{translations.weekly}</option>
              <option value="MONTHLY">{translations.monthly}</option>
              <option value="YEARLY">{translations.yearly}</option>
            </select>
          </div>

          {/* Calendar Selector */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/30">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-foreground">{translations.calendar}</span>
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCalendarDropdownOpen(!isCalendarDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 bg-background border border-border/50 rounded-lg text-sm hover:bg-accent/50 transition-all"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: calendars?.find(c => c.id === formData.calendarId)?.color || '#3b82f6' }}
                />
                <span className="font-medium">{calendars?.find(c => c.id === formData.calendarId)?.label || 'Select'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
              </button>

              {isCalendarDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsCalendarDropdownOpen(false)} />
                  <div className="absolute right-0 bottom-full mb-2 w-48 bg-background border border-border rounded-xl shadow-xl z-50 py-1">
                    {calendars?.map(cal => (
                      <button
                        key={cal.id}
                        type="button"
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-accent transition-colors text-left"
                        onClick={() => {
                          setFormData({
                            ...formData,
                            calendarId: cal.id,
                            color: cal.color || formData.color
                          });
                          setIsCalendarDropdownOpen(false);
                        }}
                      >
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cal.color }} />
                        <span className="flex-1 text-sm">{cal.label}</span>
                        {formData.calendarId === cal.id && <Check className="w-4 h-4 text-primary" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border/50 flex items-center justify-between bg-muted/10 shrink-0">
        {mode === 'edit' && (
          <button
            type="button"
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-xl transition-all text-sm font-medium"
          >
            <Trash2 className="w-4 h-4" />
            {translations.delete}
          </button>
        )}
        {mode === 'create' && <div />}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-muted-foreground hover:text-foreground font-medium text-sm rounded-xl transition-all hover:bg-accent"
          >
            {translations.cancel}
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl shadow-md transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            {mode === 'edit' ? translations.saveChanges : translations.createEvent}
          </button>
        </div>
      </div>
    </form>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} hideHeader className="p-0 overflow-hidden max-w-lg rounded-2xl shadow-2xl">
      <AnimatePresence mode="wait">
        {mode === 'view' && event ? (
          <motion.div
            key="view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {renderViewMode()}
          </motion.div>
        ) : (
          <motion.div
            key="edit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {renderEditMode()}
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
};
