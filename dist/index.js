'use strict';

var React15 = require('react');
var reactDom = require('react-dom');
var core = require('@dnd-kit/core');
var modifiers = require('@dnd-kit/modifiers');
var framerMotion = require('framer-motion');
var dateFns = require('date-fns');
var classVarianceAuthority = require('class-variance-authority');
var clsx = require('clsx');
var tailwindMerge = require('tailwind-merge');
var lucideReact = require('lucide-react');
var dateFnsTz = require('date-fns-tz');
var utilities = require('@dnd-kit/utilities');
var rrule = require('rrule');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var React15__namespace = /*#__PURE__*/_interopNamespace(React15);

function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}

// src/components/ui/button.tsx
var buttonVariants = classVarianceAuthority.cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React15__namespace.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = "button";
    return /* @__PURE__ */ React15__namespace.createElement(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/locales/index.ts
var LANGUAGE_META = {
  tr: { native: "T\xFCrk\xE7e", english: "Turkish", flag: "\u{1F1F9}\u{1F1F7}" },
  en: { native: "English", english: "English", flag: "\u{1F1EC}\u{1F1E7}" },
  fr: { native: "Fran\xE7ais", english: "French", flag: "\u{1F1EB}\u{1F1F7}" },
  de: { native: "Deutsch", english: "German", flag: "\u{1F1E9}\u{1F1EA}" },
  es: { native: "Espa\xF1ol", english: "Spanish", flag: "\u{1F1EA}\u{1F1F8}" },
  it: { native: "Italiano", english: "Italian", flag: "\u{1F1EE}\u{1F1F9}" },
  pt: { native: "Portugu\xEAs", english: "Portuguese", flag: "\u{1F1E7}\u{1F1F7}" },
  ar: { native: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629", english: "Arabic", flag: "\u{1F1F8}\u{1F1E6}", rtl: true },
  zh: { native: "\u4E2D\u6587", english: "Chinese", flag: "\u{1F1E8}\u{1F1F3}" },
  ja: { native: "\u65E5\u672C\u8A9E", english: "Japanese", flag: "\u{1F1EF}\u{1F1F5}" },
  ko: { native: "\uD55C\uAD6D\uC5B4", english: "Korean", flag: "\u{1F1F0}\u{1F1F7}" },
  ru: { native: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439", english: "Russian", flag: "\u{1F1F7}\u{1F1FA}" },
  nl: { native: "Nederlands", english: "Dutch", flag: "\u{1F1F3}\u{1F1F1}" },
  pl: { native: "Polski", english: "Polish", flag: "\u{1F1F5}\u{1F1F1}" },
  sv: { native: "Svenska", english: "Swedish", flag: "\u{1F1F8}\u{1F1EA}" }
};
var tr = {
  today: "Bug\xFCn",
  month: "Ay",
  week: "Hafta",
  day: "G\xFCn",
  agenda: "Ajanda",
  resource: "Kaynaklar",
  create: "Olu\u015Ftur",
  createEvent: "Etkinlik Olu\u015Ftur",
  editEvent: "Etkinli\u011Fi D\xFCzenle",
  newEvent: "Yeni Etkinlik",
  saveChanges: "De\u011Fi\u015Fiklikleri Kaydet",
  delete: "Sil",
  save: "Kaydet",
  cancel: "\u0130ptal",
  edit: "D\xFCzenle",
  duplicate: "\xC7o\u011Falt",
  close: "Kapat",
  moreOptions: "Daha Fazla Se\xE7enek",
  addAttachment: "Dosya Y\xFCkle",
  addReminder: "Ekle",
  title: "Ba\u015Fl\u0131k Ekle",
  addTitle: "Ba\u015Fl\u0131k Ekle",
  start: "Ba\u015Flang\u0131\xE7",
  end: "Biti\u015F",
  allDay: "T\xFCm G\xFCn",
  description: "A\xE7\u0131klama",
  descriptionAndAttachments: "A\xE7\u0131klama",
  addDescription: "A\xE7\u0131klama veya not ekle...",
  location: "Adres Gir",
  addLocation: "Konum Ekle",
  locationHelpText: 'Harita olu\u015Fturmak i\xE7in fiziksel adres girin (\xF6rn. "Ba\u011Fc\u0131lar Mah. No:1").',
  notes: "Notlar",
  repeat: "Tekrarla",
  noRepeat: "Tekrarlanm\u0131yor",
  doesNotRepeat: "Tekrarlanm\u0131yor",
  daily: "G\xFCnl\xFCk",
  weekly: "Haftal\u0131k",
  monthly: "Ayl\u0131k",
  yearly: "Y\u0131ll\u0131k",
  repeatFor: "Tekrar Say\u0131s\u0131",
  times: "kez",
  until: "\u015Eu tarihe kadar",
  endRepeat: "Tekrar Biti\u015Fi",
  never: "Hi\xE7bir Zaman",
  afterOccurrences: "Tekrardan Sonra",
  onDate: "Tarihte",
  selectCalendar: "Takvim Se\xE7",
  selectType: "T\xFCr Se\xE7",
  calendar: "Takvim",
  calendars: "Takvimler",
  event: "Etkinlik",
  task: "G\xF6rev",
  appointmentSchedule: "Randevu Program\u0131",
  new: "Yeni",
  guests: "Kat\u0131l\u0131mc\u0131lar",
  addGuests: "Kat\u0131l\u0131mc\u0131 Ekle",
  guest: "kat\u0131l\u0131mc\u0131",
  guestCount: "kat\u0131l\u0131mc\u0131",
  guestsCount: "kat\u0131l\u0131mc\u0131",
  guestAdded: "kat\u0131l\u0131mc\u0131 eklendi",
  guestsAdded: "kat\u0131l\u0131mc\u0131 eklendi",
  whosJoining: "Kim kat\u0131l\u0131yor?",
  suggestedTimes: "Misafirler i\xE7in \xF6nerilen saatler",
  viewSuggestions: "\xD6nerileri G\xF6r",
  whereWillItBe: "Nerede olacak?",
  dateAndTime: "Tarih ve Saat",
  reminders: "Hat\u0131rlat\u0131c\u0131lar",
  dragAndDrop: "Dosyalar\u0131 s\xFCr\xFCkle & b\u0131rak ya da",
  attachments: "Ekler",
  reminderAtTime: "Etkinlik saatinde",
  reminder5min: "5 dakika \xF6nce",
  reminder10min: "10 dakika \xF6nce",
  reminder15min: "15 dakika \xF6nce",
  reminder30min: "30 dakika \xF6nce",
  reminder1hour: "1 saat \xF6nce",
  reminder2hours: "2 saat \xF6nce",
  reminder1day: "1 g\xFCn \xF6nce",
  reminder2days: "2 g\xFCn \xF6nce",
  reminder1week: "1 hafta \xF6nce",
  tomorrow: "Yar\u0131n",
  eventCount: "etkinlik",
  eventsCount: "etkinlik",
  timezone: "Zaman Dilimi",
  localTime: "Yerel Saat",
  search: "Etkinlik ara...",
  allTypes: "T\xFCm T\xFCrler",
  noTitle: "(Ba\u015Fl\u0131ks\u0131z)",
  copy: "(Kopya)",
  clickToOpenInMaps: "Haritada a\xE7mak i\xE7in t\u0131klay\u0131n"
};
var en = {
  today: "Today",
  month: "Month",
  week: "Week",
  day: "Day",
  agenda: "Agenda",
  resource: "Resources",
  create: "Create",
  createEvent: "Create Event",
  editEvent: "Edit Event",
  newEvent: "New Event",
  saveChanges: "Save Changes",
  delete: "Delete",
  save: "Save",
  cancel: "Cancel",
  edit: "Edit",
  duplicate: "Duplicate",
  close: "Close",
  moreOptions: "More options",
  addAttachment: "Upload files",
  addReminder: "Add",
  title: "Add title",
  addTitle: "Add title",
  start: "Start",
  end: "End",
  allDay: "All Day",
  description: "Description",
  descriptionAndAttachments: "Description",
  addDescription: "Add description or notes...",
  location: "Enter address",
  addLocation: "Add location",
  locationHelpText: 'Enter a physical address (e.g. "123 Main St") to generate the map.',
  notes: "Notes",
  repeat: "Repeat",
  noRepeat: "Does not repeat",
  doesNotRepeat: "Does not repeat",
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  yearly: "Yearly",
  repeatFor: "Repeat for",
  times: "times",
  until: "Until",
  endRepeat: "End repeat",
  never: "Never",
  afterOccurrences: "After occurrences",
  onDate: "On date",
  selectCalendar: "Select Calendar",
  selectType: "Select Type",
  calendar: "Calendar",
  calendars: "Calendars",
  event: "Event",
  task: "Task",
  appointmentSchedule: "Appointment schedule",
  new: "New",
  guests: "Guests",
  addGuests: "Add guests",
  guest: "guest",
  guestCount: "guest",
  guestsCount: "guests",
  guestAdded: "guest added",
  guestsAdded: "guests added",
  whosJoining: "Who's joining?",
  suggestedTimes: "Suggested times for guests",
  viewSuggestions: "View suggestions",
  whereWillItBe: "Where will it be?",
  dateAndTime: "Date & Time",
  reminders: "Reminders",
  dragAndDrop: "Drag & drop files or",
  attachments: "Attachments",
  reminderAtTime: "At time of event",
  reminder5min: "5 minutes before",
  reminder10min: "10 minutes before",
  reminder15min: "15 minutes before",
  reminder30min: "30 minutes before",
  reminder1hour: "1 hour before",
  reminder2hours: "2 hours before",
  reminder1day: "1 day before",
  reminder2days: "2 days before",
  reminder1week: "1 week before",
  tomorrow: "Tomorrow",
  eventCount: "event",
  eventsCount: "events",
  timezone: "Time zone",
  localTime: "Local Time",
  search: "Search events...",
  allTypes: "All Types",
  noTitle: "(No title)",
  copy: "(Copy)",
  clickToOpenInMaps: "Click to open in maps"
};
var fr = {
  today: "Aujourd'hui",
  month: "Mois",
  week: "Semaine",
  day: "Jour",
  agenda: "Agenda",
  resource: "Ressources",
  create: "Cr\xE9er",
  createEvent: "Cr\xE9er un \xE9v\xE9nement",
  editEvent: "Modifier l'\xE9v\xE9nement",
  newEvent: "Nouvel \xE9v\xE9nement",
  saveChanges: "Enregistrer les modifications",
  delete: "Supprimer",
  save: "Enregistrer",
  cancel: "Annuler",
  edit: "Modifier",
  duplicate: "Dupliquer",
  close: "Fermer",
  moreOptions: "Plus d'options",
  addAttachment: "T\xE9l\xE9charger des fichiers",
  addReminder: "Ajouter",
  title: "Ajouter un titre",
  addTitle: "Ajouter un titre",
  start: "D\xE9but",
  end: "Fin",
  allDay: "Toute la journ\xE9e",
  description: "Description",
  descriptionAndAttachments: "Description",
  addDescription: "Ajouter une description ou des notes...",
  location: "Entrer une adresse",
  addLocation: "Ajouter un lieu",
  locationHelpText: 'Entrez une adresse physique (ex: "123 Rue Principale") pour g\xE9n\xE9rer la carte.',
  notes: "Notes",
  repeat: "R\xE9p\xE9ter",
  noRepeat: "Ne se r\xE9p\xE8te pas",
  doesNotRepeat: "Ne se r\xE9p\xE8te pas",
  daily: "Quotidien",
  weekly: "Hebdomadaire",
  monthly: "Mensuel",
  yearly: "Annuel",
  repeatFor: "R\xE9p\xE9ter pendant",
  times: "fois",
  until: "Jusqu'au",
  endRepeat: "Fin de r\xE9p\xE9tition",
  never: "Jamais",
  afterOccurrences: "Apr\xE8s occurrences",
  onDate: "\xC0 la date",
  selectCalendar: "S\xE9lectionner un calendrier",
  selectType: "S\xE9lectionner un type",
  calendar: "Calendrier",
  calendars: "Calendriers",
  event: "\xC9v\xE9nement",
  task: "T\xE2che",
  appointmentSchedule: "Planning de rendez-vous",
  new: "Nouveau",
  guests: "Invit\xE9s",
  addGuests: "Ajouter des invit\xE9s",
  guest: "invit\xE9",
  guestCount: "invit\xE9",
  guestsCount: "invit\xE9s",
  guestAdded: "invit\xE9 ajout\xE9",
  guestsAdded: "invit\xE9s ajout\xE9s",
  whosJoining: "Qui participe ?",
  suggestedTimes: "Horaires sugg\xE9r\xE9s pour les invit\xE9s",
  viewSuggestions: "Voir les suggestions",
  whereWillItBe: "O\xF9 aura lieu ?",
  dateAndTime: "Date et heure",
  reminders: "Rappels",
  dragAndDrop: "Glisser-d\xE9poser des fichiers ou",
  attachments: "Pi\xE8ces jointes",
  reminderAtTime: "\xC0 l'heure de l'\xE9v\xE9nement",
  reminder5min: "5 minutes avant",
  reminder10min: "10 minutes avant",
  reminder15min: "15 minutes avant",
  reminder30min: "30 minutes avant",
  reminder1hour: "1 heure avant",
  reminder2hours: "2 heures avant",
  reminder1day: "1 jour avant",
  reminder2days: "2 jours avant",
  reminder1week: "1 semaine avant",
  tomorrow: "Demain",
  eventCount: "\xE9v\xE9nement",
  eventsCount: "\xE9v\xE9nements",
  timezone: "Fuseau horaire",
  localTime: "Heure locale",
  search: "Rechercher des \xE9v\xE9nements...",
  allTypes: "Tous les types",
  noTitle: "(Sans titre)",
  copy: "(Copie)",
  clickToOpenInMaps: "Cliquer pour ouvrir dans la carte"
};
var de = {
  today: "Heute",
  month: "Monat",
  week: "Woche",
  day: "Tag",
  agenda: "Agenda",
  resource: "Ressourcen",
  create: "Erstellen",
  createEvent: "Termin erstellen",
  editEvent: "Termin bearbeiten",
  newEvent: "Neuer Termin",
  saveChanges: "\xC4nderungen speichern",
  delete: "L\xF6schen",
  save: "Speichern",
  cancel: "Abbrechen",
  edit: "Bearbeiten",
  duplicate: "Duplizieren",
  close: "Schlie\xDFen",
  moreOptions: "Weitere Optionen",
  addAttachment: "Dateien hochladen",
  addReminder: "Hinzuf\xFCgen",
  title: "Titel hinzuf\xFCgen",
  addTitle: "Titel hinzuf\xFCgen",
  start: "Beginn",
  end: "Ende",
  allDay: "Ganzt\xE4gig",
  description: "Beschreibung",
  descriptionAndAttachments: "Beschreibung",
  addDescription: "Beschreibung oder Notizen hinzuf\xFCgen...",
  location: "Adresse eingeben",
  addLocation: "Ort hinzuf\xFCgen",
  locationHelpText: 'Geben Sie eine physische Adresse ein (z.B. "Musterstra\xDFe 1"), um die Karte zu generieren.',
  notes: "Notizen",
  repeat: "Wiederholen",
  noRepeat: "Wiederholt sich nicht",
  doesNotRepeat: "Wiederholt sich nicht",
  daily: "T\xE4glich",
  weekly: "W\xF6chentlich",
  monthly: "Monatlich",
  yearly: "J\xE4hrlich",
  repeatFor: "Wiederholen f\xFCr",
  times: "Mal",
  until: "Bis",
  endRepeat: "Wiederholung beenden",
  never: "Nie",
  afterOccurrences: "Nach Wiederholungen",
  onDate: "Am Datum",
  selectCalendar: "Kalender ausw\xE4hlen",
  selectType: "Typ ausw\xE4hlen",
  calendar: "Kalender",
  calendars: "Kalender",
  event: "Termin",
  task: "Aufgabe",
  appointmentSchedule: "Terminplan",
  new: "Neu",
  guests: "G\xE4ste",
  addGuests: "G\xE4ste hinzuf\xFCgen",
  guest: "Gast",
  guestCount: "Gast",
  guestsCount: "G\xE4ste",
  guestAdded: "Gast hinzugef\xFCgt",
  guestsAdded: "G\xE4ste hinzugef\xFCgt",
  whosJoining: "Wer nimmt teil?",
  suggestedTimes: "Vorgeschlagene Zeiten f\xFCr G\xE4ste",
  viewSuggestions: "Vorschl\xE4ge anzeigen",
  whereWillItBe: "Wo findet es statt?",
  dateAndTime: "Datum und Uhrzeit",
  reminders: "Erinnerungen",
  dragAndDrop: "Dateien hineinziehen oder",
  attachments: "Anh\xE4nge",
  reminderAtTime: "Zum Zeitpunkt des Termins",
  reminder5min: "5 Minuten vorher",
  reminder10min: "10 Minuten vorher",
  reminder15min: "15 Minuten vorher",
  reminder30min: "30 Minuten vorher",
  reminder1hour: "1 Stunde vorher",
  reminder2hours: "2 Stunden vorher",
  reminder1day: "1 Tag vorher",
  reminder2days: "2 Tage vorher",
  reminder1week: "1 Woche vorher",
  tomorrow: "Morgen",
  eventCount: "Termin",
  eventsCount: "Termine",
  timezone: "Zeitzone",
  localTime: "Ortszeit",
  search: "Termine suchen...",
  allTypes: "Alle Typen",
  noTitle: "(Kein Titel)",
  copy: "(Kopie)",
  clickToOpenInMaps: "Klicken, um in der Karte zu \xF6ffnen"
};
var es = {
  today: "Hoy",
  month: "Mes",
  week: "Semana",
  day: "D\xEDa",
  agenda: "Agenda",
  resource: "Recursos",
  create: "Crear",
  createEvent: "Crear evento",
  editEvent: "Editar evento",
  newEvent: "Nuevo evento",
  saveChanges: "Guardar cambios",
  delete: "Eliminar",
  save: "Guardar",
  cancel: "Cancelar",
  edit: "Editar",
  duplicate: "Duplicar",
  close: "Cerrar",
  moreOptions: "M\xE1s opciones",
  addAttachment: "Subir archivos",
  addReminder: "Agregar",
  title: "Agregar t\xEDtulo",
  addTitle: "Agregar t\xEDtulo",
  start: "Inicio",
  end: "Fin",
  allDay: "Todo el d\xEDa",
  description: "Descripci\xF3n",
  descriptionAndAttachments: "Descripci\xF3n",
  addDescription: "Agregar descripci\xF3n o notas...",
  location: "Ingresar direcci\xF3n",
  addLocation: "Agregar ubicaci\xF3n",
  locationHelpText: 'Ingrese una direcci\xF3n f\xEDsica (ej. "Calle Principal 123") para generar el mapa.',
  notes: "Notas",
  repeat: "Repetir",
  noRepeat: "No se repite",
  doesNotRepeat: "No se repite",
  daily: "Diario",
  weekly: "Semanal",
  monthly: "Mensual",
  yearly: "Anual",
  repeatFor: "Repetir por",
  times: "veces",
  until: "Hasta",
  endRepeat: "Fin de repetici\xF3n",
  never: "Nunca",
  afterOccurrences: "Despu\xE9s de ocurrencias",
  onDate: "En fecha",
  selectCalendar: "Seleccionar calendario",
  selectType: "Seleccionar tipo",
  calendar: "Calendario",
  calendars: "Calendarios",
  event: "Evento",
  task: "Tarea",
  appointmentSchedule: "Horario de citas",
  new: "Nuevo",
  guests: "Invitados",
  addGuests: "Agregar invitados",
  guest: "invitado",
  guestCount: "invitado",
  guestsCount: "invitados",
  guestAdded: "invitado agregado",
  guestsAdded: "invitados agregados",
  whosJoining: "\xBFQui\xE9n se une?",
  suggestedTimes: "Horarios sugeridos para invitados",
  viewSuggestions: "Ver sugerencias",
  whereWillItBe: "\xBFD\xF3nde ser\xE1?",
  dateAndTime: "Fecha y hora",
  reminders: "Recordatorios",
  dragAndDrop: "Arrastra y suelta archivos o",
  attachments: "Adjuntos",
  reminderAtTime: "A la hora del evento",
  reminder5min: "5 minutos antes",
  reminder10min: "10 minutos antes",
  reminder15min: "15 minutos antes",
  reminder30min: "30 minutos antes",
  reminder1hour: "1 hora antes",
  reminder2hours: "2 horas antes",
  reminder1day: "1 d\xEDa antes",
  reminder2days: "2 d\xEDas antes",
  reminder1week: "1 semana antes",
  tomorrow: "Ma\xF1ana",
  eventCount: "evento",
  eventsCount: "eventos",
  timezone: "Zona horaria",
  localTime: "Hora local",
  search: "Buscar eventos...",
  allTypes: "Todos los tipos",
  noTitle: "(Sin t\xEDtulo)",
  copy: "(Copia)",
  clickToOpenInMaps: "Haga clic para abrir en el mapa"
};
var it = {
  today: "Oggi",
  month: "Mese",
  week: "Settimana",
  day: "Giorno",
  agenda: "Agenda",
  resource: "Risorse",
  create: "Crea",
  createEvent: "Crea evento",
  editEvent: "Modifica evento",
  newEvent: "Nuovo evento",
  saveChanges: "Salva modifiche",
  delete: "Elimina",
  save: "Salva",
  cancel: "Annulla",
  edit: "Modifica",
  duplicate: "Duplica",
  close: "Chiudi",
  moreOptions: "Altre opzioni",
  addAttachment: "Carica file",
  addReminder: "Aggiungi",
  title: "Aggiungi titolo",
  addTitle: "Aggiungi titolo",
  start: "Inizio",
  end: "Fine",
  allDay: "Tutto il giorno",
  description: "Descrizione",
  descriptionAndAttachments: "Descrizione",
  addDescription: "Aggiungi descrizione o note...",
  location: "Inserisci indirizzo",
  addLocation: "Aggiungi luogo",
  locationHelpText: 'Inserire un indirizzo fisico (es. "Via Roma 1") per generare la mappa.',
  notes: "Note",
  repeat: "Ripeti",
  noRepeat: "Non si ripete",
  doesNotRepeat: "Non si ripete",
  daily: "Giornaliero",
  weekly: "Settimanale",
  monthly: "Mensile",
  yearly: "Annuale",
  repeatFor: "Ripeti per",
  times: "volte",
  until: "Fino a",
  endRepeat: "Fine ripetizione",
  never: "Mai",
  afterOccurrences: "Dopo occorrenze",
  onDate: "Alla data",
  selectCalendar: "Seleziona calendario",
  selectType: "Seleziona tipo",
  calendar: "Calendario",
  calendars: "Calendari",
  event: "Evento",
  task: "Attivit\xE0",
  appointmentSchedule: "Programma appuntamenti",
  new: "Nuovo",
  guests: "Ospiti",
  addGuests: "Aggiungi ospiti",
  guest: "ospite",
  guestCount: "ospite",
  guestsCount: "ospiti",
  guestAdded: "ospite aggiunto",
  guestsAdded: "ospiti aggiunti",
  whosJoining: "Chi partecipa?",
  suggestedTimes: "Orari suggeriti per gli ospiti",
  viewSuggestions: "Vedi suggerimenti",
  whereWillItBe: "Dove si terr\xE0?",
  dateAndTime: "Data e ora",
  reminders: "Promemoria",
  dragAndDrop: "Trascina e rilascia i file o",
  attachments: "Allegati",
  reminderAtTime: "All'ora dell'evento",
  reminder5min: "5 minuti prima",
  reminder10min: "10 minuti prima",
  reminder15min: "15 minuti prima",
  reminder30min: "30 minuti prima",
  reminder1hour: "1 ora prima",
  reminder2hours: "2 ore prima",
  reminder1day: "1 giorno prima",
  reminder2days: "2 giorni prima",
  reminder1week: "1 settimana prima",
  tomorrow: "Domani",
  eventCount: "evento",
  eventsCount: "eventi",
  timezone: "Fuso orario",
  localTime: "Ora locale",
  search: "Cerca eventi...",
  allTypes: "Tutti i tipi",
  noTitle: "(Senza titolo)",
  copy: "(Copia)",
  clickToOpenInMaps: "Clicca per aprire nella mappa"
};
var pt = {
  today: "Hoje",
  month: "M\xEAs",
  week: "Semana",
  day: "Dia",
  agenda: "Agenda",
  resource: "Recursos",
  create: "Criar",
  createEvent: "Criar evento",
  editEvent: "Editar evento",
  newEvent: "Novo evento",
  saveChanges: "Salvar altera\xE7\xF5es",
  delete: "Excluir",
  save: "Salvar",
  cancel: "Cancelar",
  edit: "Editar",
  duplicate: "Duplicar",
  close: "Fechar",
  moreOptions: "Mais op\xE7\xF5es",
  addAttachment: "Enviar arquivos",
  addReminder: "Adicionar",
  title: "Adicionar t\xEDtulo",
  addTitle: "Adicionar t\xEDtulo",
  start: "In\xEDcio",
  end: "Fim",
  allDay: "Dia inteiro",
  description: "Descri\xE7\xE3o",
  descriptionAndAttachments: "Descri\xE7\xE3o",
  addDescription: "Adicionar descri\xE7\xE3o ou notas...",
  location: "Inserir endere\xE7o",
  addLocation: "Adicionar local",
  locationHelpText: 'Insira um endere\xE7o f\xEDsico (ex. "Rua Principal, 123") para gerar o mapa.',
  notes: "Notas",
  repeat: "Repetir",
  noRepeat: "N\xE3o se repete",
  doesNotRepeat: "N\xE3o se repete",
  daily: "Di\xE1rio",
  weekly: "Semanal",
  monthly: "Mensal",
  yearly: "Anual",
  repeatFor: "Repetir por",
  times: "vezes",
  until: "At\xE9",
  endRepeat: "Fim da repeti\xE7\xE3o",
  never: "Nunca",
  afterOccurrences: "Ap\xF3s ocorr\xEAncias",
  onDate: "Na data",
  selectCalendar: "Selecionar calend\xE1rio",
  selectType: "Selecionar tipo",
  calendar: "Calend\xE1rio",
  calendars: "Calend\xE1rios",
  event: "Evento",
  task: "Tarefa",
  appointmentSchedule: "Agenda de compromissos",
  new: "Novo",
  guests: "Convidados",
  addGuests: "Adicionar convidados",
  guest: "convidado",
  guestCount: "convidado",
  guestsCount: "convidados",
  guestAdded: "convidado adicionado",
  guestsAdded: "convidados adicionados",
  whosJoining: "Quem vai participar?",
  suggestedTimes: "Hor\xE1rios sugeridos para convidados",
  viewSuggestions: "Ver sugest\xF5es",
  whereWillItBe: "Onde ser\xE1?",
  dateAndTime: "Data e hora",
  reminders: "Lembretes",
  dragAndDrop: "Arraste e solte arquivos ou",
  attachments: "Anexos",
  reminderAtTime: "No hor\xE1rio do evento",
  reminder5min: "5 minutos antes",
  reminder10min: "10 minutos antes",
  reminder15min: "15 minutos antes",
  reminder30min: "30 minutos antes",
  reminder1hour: "1 hora antes",
  reminder2hours: "2 horas antes",
  reminder1day: "1 dia antes",
  reminder2days: "2 dias antes",
  reminder1week: "1 semana antes",
  tomorrow: "Amanh\xE3",
  eventCount: "evento",
  eventsCount: "eventos",
  timezone: "Fuso hor\xE1rio",
  localTime: "Hora local",
  search: "Buscar eventos...",
  allTypes: "Todos os tipos",
  noTitle: "(Sem t\xEDtulo)",
  copy: "(C\xF3pia)",
  clickToOpenInMaps: "Clique para abrir no mapa"
};
var ar = {
  today: "\u0627\u0644\u064A\u0648\u0645",
  month: "\u0634\u0647\u0631",
  week: "\u0623\u0633\u0628\u0648\u0639",
  day: "\u064A\u0648\u0645",
  agenda: "\u062C\u062F\u0648\u0644 \u0627\u0644\u0623\u0639\u0645\u0627\u0644",
  resource: "\u0627\u0644\u0645\u0648\u0627\u0631\u062F",
  create: "\u0625\u0646\u0634\u0627\u0621",
  createEvent: "\u0625\u0646\u0634\u0627\u0621 \u062D\u062F\u062B",
  editEvent: "\u062A\u0639\u062F\u064A\u0644 \u0627\u0644\u062D\u062F\u062B",
  newEvent: "\u062D\u062F\u062B \u062C\u062F\u064A\u062F",
  saveChanges: "\u062D\u0641\u0638 \u0627\u0644\u062A\u063A\u064A\u064A\u0631\u0627\u062A",
  delete: "\u062D\u0630\u0641",
  save: "\u062D\u0641\u0638",
  cancel: "\u0625\u0644\u063A\u0627\u0621",
  edit: "\u062A\u0639\u062F\u064A\u0644",
  duplicate: "\u062A\u0643\u0631\u0627\u0631",
  close: "\u0625\u063A\u0644\u0627\u0642",
  moreOptions: "\u0627\u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u062E\u064A\u0627\u0631\u0627\u062A",
  addAttachment: "\u0631\u0641\u0639 \u0645\u0644\u0641\u0627\u062A",
  addReminder: "\u0625\u0636\u0627\u0641\u0629",
  title: "\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0648\u0627\u0646",
  addTitle: "\u0625\u0636\u0627\u0641\u0629 \u0639\u0646\u0648\u0627\u0646",
  start: "\u0627\u0644\u0628\u062F\u0627\u064A\u0629",
  end: "\u0627\u0644\u0646\u0647\u0627\u064A\u0629",
  allDay: "\u0637\u0648\u0627\u0644 \u0627\u0644\u064A\u0648\u0645",
  description: "\u0627\u0644\u0648\u0635\u0641",
  descriptionAndAttachments: "\u0627\u0644\u0648\u0635\u0641",
  addDescription: "\u0625\u0636\u0627\u0641\u0629 \u0648\u0635\u0641 \u0623\u0648 \u0645\u0644\u0627\u062D\u0638\u0627\u062A...",
  location: "\u0625\u062F\u062E\u0627\u0644 \u0627\u0644\u0639\u0646\u0648\u0627\u0646",
  addLocation: "\u0625\u0636\u0627\u0641\u0629 \u0645\u0648\u0642\u0639",
  locationHelpText: '\u0623\u062F\u062E\u0644 \u0639\u0646\u0648\u0627\u0646\u064B\u0627 \u0641\u0639\u0644\u064A\u064B\u0627 (\u0645\u062B\u0644 "\u0634\u0627\u0631\u0639 \u0627\u0644\u0645\u0644\u0643 \u0641\u0647\u062F 1") \u0644\u0625\u0646\u0634\u0627\u0621 \u0627\u0644\u062E\u0631\u064A\u0637\u0629.',
  notes: "\u0645\u0644\u0627\u062D\u0638\u0627\u062A",
  repeat: "\u062A\u0643\u0631\u0627\u0631",
  noRepeat: "\u0644\u0627 \u064A\u062A\u0643\u0631\u0631",
  doesNotRepeat: "\u0644\u0627 \u064A\u062A\u0643\u0631\u0631",
  daily: "\u064A\u0648\u0645\u064A",
  weekly: "\u0623\u0633\u0628\u0648\u0639\u064A",
  monthly: "\u0634\u0647\u0631\u064A",
  yearly: "\u0633\u0646\u0648\u064A",
  repeatFor: "\u062A\u0643\u0631\u0627\u0631 \u0644\u0640",
  times: "\u0645\u0631\u0627\u062A",
  until: "\u062D\u062A\u0649",
  endRepeat: "\u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u062A\u0643\u0631\u0627\u0631",
  never: "\u0623\u0628\u062F\u064B\u0627",
  afterOccurrences: "\u0628\u0639\u062F \u0627\u0644\u062A\u0643\u0631\u0627\u0631\u0627\u062A",
  onDate: "\u0641\u064A \u0627\u0644\u062A\u0627\u0631\u064A\u062E",
  selectCalendar: "\u0627\u062E\u062A\u0631 \u0627\u0644\u062A\u0642\u0648\u064A\u0645",
  selectType: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0646\u0648\u0639",
  calendar: "\u0627\u0644\u062A\u0642\u0648\u064A\u0645",
  calendars: "\u0627\u0644\u062A\u0642\u0627\u0648\u064A\u0645",
  event: "\u062D\u062F\u062B",
  task: "\u0645\u0647\u0645\u0629",
  appointmentSchedule: "\u062C\u062F\u0648\u0644 \u0627\u0644\u0645\u0648\u0627\u0639\u064A\u062F",
  new: "\u062C\u062F\u064A\u062F",
  guests: "\u0627\u0644\u0636\u064A\u0648\u0641",
  addGuests: "\u0625\u0636\u0627\u0641\u0629 \u0636\u064A\u0648\u0641",
  guest: "\u0636\u064A\u0641",
  guestCount: "\u0636\u064A\u0641",
  guestsCount: "\u0636\u064A\u0648\u0641",
  guestAdded: "\u0636\u064A\u0641 \u0645\u0636\u0627\u0641",
  guestsAdded: "\u0636\u064A\u0648\u0641 \u0645\u0636\u0627\u0641\u0648\u0646",
  whosJoining: "\u0645\u0646 \u0633\u064A\u0646\u0636\u0645\u061F",
  suggestedTimes: "\u0627\u0644\u0623\u0648\u0642\u0627\u062A \u0627\u0644\u0645\u0642\u062A\u0631\u062D\u0629 \u0644\u0644\u0636\u064A\u0648\u0641",
  viewSuggestions: "\u0639\u0631\u0636 \u0627\u0644\u0627\u0642\u062A\u0631\u0627\u062D\u0627\u062A",
  whereWillItBe: "\u0623\u064A\u0646 \u0633\u064A\u0643\u0648\u0646\u061F",
  dateAndTime: "\u0627\u0644\u062A\u0627\u0631\u064A\u062E \u0648\u0627\u0644\u0648\u0642\u062A",
  reminders: "\u0627\u0644\u062A\u0630\u0643\u064A\u0631\u0627\u062A",
  dragAndDrop: "\u0627\u0633\u062D\u0628 \u0648\u0623\u0641\u0644\u062A \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0623\u0648",
  attachments: "\u0627\u0644\u0645\u0631\u0641\u0642\u0627\u062A",
  reminderAtTime: "\u0639\u0646\u062F \u0648\u0642\u062A \u0627\u0644\u062D\u062F\u062B",
  reminder5min: "\u0642\u0628\u0644 5 \u062F\u0642\u0627\u0626\u0642",
  reminder10min: "\u0642\u0628\u0644 10 \u062F\u0642\u0627\u0626\u0642",
  reminder15min: "\u0642\u0628\u0644 15 \u062F\u0642\u064A\u0642\u0629",
  reminder30min: "\u0642\u0628\u0644 30 \u062F\u0642\u064A\u0642\u0629",
  reminder1hour: "\u0642\u0628\u0644 \u0633\u0627\u0639\u0629",
  reminder2hours: "\u0642\u0628\u0644 \u0633\u0627\u0639\u062A\u064A\u0646",
  reminder1day: "\u0642\u0628\u0644 \u064A\u0648\u0645",
  reminder2days: "\u0642\u0628\u0644 \u064A\u0648\u0645\u064A\u0646",
  reminder1week: "\u0642\u0628\u0644 \u0623\u0633\u0628\u0648\u0639",
  tomorrow: "\u063A\u062F\u064B\u0627",
  eventCount: "\u062D\u062F\u062B",
  eventsCount: "\u0623\u062D\u062F\u0627\u062B",
  timezone: "\u0627\u0644\u0645\u0646\u0637\u0642\u0629 \u0627\u0644\u0632\u0645\u0646\u064A\u0629",
  localTime: "\u0627\u0644\u062A\u0648\u0642\u064A\u062A \u0627\u0644\u0645\u062D\u0644\u064A",
  search: "\u0627\u0644\u0628\u062D\u062B \u0639\u0646 \u0623\u062D\u062F\u0627\u062B...",
  allTypes: "\u062C\u0645\u064A\u0639 \u0627\u0644\u0623\u0646\u0648\u0627\u0639",
  noTitle: "(\u0628\u062F\u0648\u0646 \u0639\u0646\u0648\u0627\u0646)",
  copy: "(\u0646\u0633\u062E\u0629)",
  clickToOpenInMaps: "\u0627\u0646\u0642\u0631 \u0644\u0644\u0641\u062A\u062D \u0641\u064A \u0627\u0644\u062E\u0631\u064A\u0637\u0629"
};
var zh = {
  today: "\u4ECA\u5929",
  month: "\u6708",
  week: "\u5468",
  day: "\u5929",
  agenda: "\u8BAE\u7A0B",
  resource: "\u8D44\u6E90",
  create: "\u521B\u5EFA",
  createEvent: "\u521B\u5EFA\u6D3B\u52A8",
  editEvent: "\u7F16\u8F91\u6D3B\u52A8",
  newEvent: "\u65B0\u6D3B\u52A8",
  saveChanges: "\u4FDD\u5B58\u66F4\u6539",
  delete: "\u5220\u9664",
  save: "\u4FDD\u5B58",
  cancel: "\u53D6\u6D88",
  edit: "\u7F16\u8F91",
  duplicate: "\u590D\u5236",
  close: "\u5173\u95ED",
  moreOptions: "\u66F4\u591A\u9009\u9879",
  addAttachment: "\u4E0A\u4F20\u6587\u4EF6",
  addReminder: "\u6DFB\u52A0",
  title: "\u6DFB\u52A0\u6807\u9898",
  addTitle: "\u6DFB\u52A0\u6807\u9898",
  start: "\u5F00\u59CB",
  end: "\u7ED3\u675F",
  allDay: "\u5168\u5929",
  description: "\u63CF\u8FF0",
  descriptionAndAttachments: "\u63CF\u8FF0",
  addDescription: "\u6DFB\u52A0\u63CF\u8FF0\u6216\u5907\u6CE8...",
  location: "\u8F93\u5165\u5730\u5740",
  addLocation: "\u6DFB\u52A0\u5730\u70B9",
  locationHelpText: '\u8F93\u5165\u5B9E\u9645\u5730\u5740\uFF08\u4F8B\u5982"\u5317\u4EAC\u5E02\u671D\u9633\u533A1\u53F7"\uFF09\u4EE5\u751F\u6210\u5730\u56FE\u3002',
  notes: "\u5907\u6CE8",
  repeat: "\u91CD\u590D",
  noRepeat: "\u4E0D\u91CD\u590D",
  doesNotRepeat: "\u4E0D\u91CD\u590D",
  daily: "\u6BCF\u5929",
  weekly: "\u6BCF\u5468",
  monthly: "\u6BCF\u6708",
  yearly: "\u6BCF\u5E74",
  repeatFor: "\u91CD\u590D",
  times: "\u6B21",
  until: "\u76F4\u5230",
  endRepeat: "\u7ED3\u675F\u91CD\u590D",
  never: "\u6C38\u4E0D",
  afterOccurrences: "\u6B21\u540E",
  onDate: "\u5728\u65E5\u671F",
  selectCalendar: "\u9009\u62E9\u65E5\u5386",
  selectType: "\u9009\u62E9\u7C7B\u578B",
  calendar: "\u65E5\u5386",
  calendars: "\u65E5\u5386",
  event: "\u6D3B\u52A8",
  task: "\u4EFB\u52A1",
  appointmentSchedule: "\u9884\u7EA6\u65E5\u7A0B",
  new: "\u65B0\u5EFA",
  guests: "\u53C2\u4E0E\u8005",
  addGuests: "\u6DFB\u52A0\u53C2\u4E0E\u8005",
  guest: "\u4F4D\u53C2\u4E0E\u8005",
  guestCount: "\u4F4D\u53C2\u4E0E\u8005",
  guestsCount: "\u4F4D\u53C2\u4E0E\u8005",
  guestAdded: "\u4F4D\u53C2\u4E0E\u8005\u5DF2\u6DFB\u52A0",
  guestsAdded: "\u4F4D\u53C2\u4E0E\u8005\u5DF2\u6DFB\u52A0",
  whosJoining: "\u8C01\u8981\u53C2\u52A0\uFF1F",
  suggestedTimes: "\u4E3A\u6765\u5BBE\u63A8\u8350\u7684\u65F6\u95F4",
  viewSuggestions: "\u67E5\u770B\u5EFA\u8BAE",
  whereWillItBe: "\u5728\u54EA\u91CC\u4E3E\u529E\uFF1F",
  dateAndTime: "\u65E5\u671F\u548C\u65F6\u95F4",
  reminders: "\u63D0\u9192",
  dragAndDrop: "\u62D6\u653E\u6587\u4EF6\u6216",
  attachments: "\u9644\u4EF6",
  reminderAtTime: "\u6D3B\u52A8\u65F6\u95F4\u65F6",
  reminder5min: "\u63D0\u524D5\u5206\u949F",
  reminder10min: "\u63D0\u524D10\u5206\u949F",
  reminder15min: "\u63D0\u524D15\u5206\u949F",
  reminder30min: "\u63D0\u524D30\u5206\u949F",
  reminder1hour: "\u63D0\u524D1\u5C0F\u65F6",
  reminder2hours: "\u63D0\u524D2\u5C0F\u65F6",
  reminder1day: "\u63D0\u524D1\u5929",
  reminder2days: "\u63D0\u524D2\u5929",
  reminder1week: "\u63D0\u524D1\u5468",
  tomorrow: "\u660E\u5929",
  eventCount: "\u4E2A\u6D3B\u52A8",
  eventsCount: "\u4E2A\u6D3B\u52A8",
  timezone: "\u65F6\u533A",
  localTime: "\u672C\u5730\u65F6\u95F4",
  search: "\u641C\u7D22\u6D3B\u52A8...",
  allTypes: "\u6240\u6709\u7C7B\u578B",
  noTitle: "\uFF08\u65E0\u6807\u9898\uFF09",
  copy: "\uFF08\u526F\u672C\uFF09",
  clickToOpenInMaps: "\u70B9\u51FB\u5728\u5730\u56FE\u4E2D\u6253\u5F00"
};
var ja = {
  today: "\u4ECA\u65E5",
  month: "\u6708",
  week: "\u9031",
  day: "\u65E5",
  agenda: "\u30A2\u30B8\u30A7\u30F3\u30C0",
  resource: "\u30EA\u30BD\u30FC\u30B9",
  create: "\u4F5C\u6210",
  createEvent: "\u30A4\u30D9\u30F3\u30C8\u3092\u4F5C\u6210",
  editEvent: "\u30A4\u30D9\u30F3\u30C8\u3092\u7DE8\u96C6",
  newEvent: "\u65B0\u3057\u3044\u30A4\u30D9\u30F3\u30C8",
  saveChanges: "\u5909\u66F4\u3092\u4FDD\u5B58",
  delete: "\u524A\u9664",
  save: "\u4FDD\u5B58",
  cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB",
  edit: "\u7DE8\u96C6",
  duplicate: "\u8907\u88FD",
  close: "\u9589\u3058\u308B",
  moreOptions: "\u305D\u306E\u4ED6\u306E\u30AA\u30D7\u30B7\u30E7\u30F3",
  addAttachment: "\u30D5\u30A1\u30A4\u30EB\u3092\u30A2\u30C3\u30D7\u30ED\u30FC\u30C9",
  addReminder: "\u8FFD\u52A0",
  title: "\u30BF\u30A4\u30C8\u30EB\u3092\u8FFD\u52A0",
  addTitle: "\u30BF\u30A4\u30C8\u30EB\u3092\u8FFD\u52A0",
  start: "\u958B\u59CB",
  end: "\u7D42\u4E86",
  allDay: "\u7D42\u65E5",
  description: "\u8AAC\u660E",
  descriptionAndAttachments: "\u8AAC\u660E",
  addDescription: "\u8AAC\u660E\u307E\u305F\u306F\u30E1\u30E2\u3092\u8FFD\u52A0...",
  location: "\u4F4F\u6240\u3092\u5165\u529B",
  addLocation: "\u5834\u6240\u3092\u8FFD\u52A0",
  locationHelpText: "\u5730\u56F3\u3092\u751F\u6210\u3059\u308B\u306B\u306F\u5B9F\u969B\u306E\u4F4F\u6240\uFF08\u4F8B\uFF1A\u300C\u6771\u4EAC\u90FD\u6E0B\u8C37\u533A1-1-1\u300D\uFF09\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  notes: "\u30E1\u30E2",
  repeat: "\u7E70\u308A\u8FD4\u3057",
  noRepeat: "\u7E70\u308A\u8FD4\u3057\u306A\u3057",
  doesNotRepeat: "\u7E70\u308A\u8FD4\u3057\u306A\u3057",
  daily: "\u6BCE\u65E5",
  weekly: "\u6BCE\u9031",
  monthly: "\u6BCE\u6708",
  yearly: "\u6BCE\u5E74",
  repeatFor: "\u7E70\u308A\u8FD4\u3057\u56DE\u6570",
  times: "\u56DE",
  until: "\u307E\u3067",
  endRepeat: "\u7E70\u308A\u8FD4\u3057\u7D42\u4E86",
  never: "\u306A\u3057",
  afterOccurrences: "\u56DE\u5F8C\u306B\u7D42\u4E86",
  onDate: "\u65E5\u4ED8\u306B",
  selectCalendar: "\u30AB\u30EC\u30F3\u30C0\u30FC\u3092\u9078\u629E",
  selectType: "\u30BF\u30A4\u30D7\u3092\u9078\u629E",
  calendar: "\u30AB\u30EC\u30F3\u30C0\u30FC",
  calendars: "\u30AB\u30EC\u30F3\u30C0\u30FC",
  event: "\u30A4\u30D9\u30F3\u30C8",
  task: "\u30BF\u30B9\u30AF",
  appointmentSchedule: "\u4E88\u7D04\u30B9\u30B1\u30B8\u30E5\u30FC\u30EB",
  new: "\u65B0\u898F",
  guests: "\u30B2\u30B9\u30C8",
  addGuests: "\u30B2\u30B9\u30C8\u3092\u8FFD\u52A0",
  guest: "\u4EBA\u306E\u30B2\u30B9\u30C8",
  guestCount: "\u4EBA\u306E\u30B2\u30B9\u30C8",
  guestsCount: "\u4EBA\u306E\u30B2\u30B9\u30C8",
  guestAdded: "\u4EBA\u306E\u30B2\u30B9\u30C8\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F",
  guestsAdded: "\u4EBA\u306E\u30B2\u30B9\u30C8\u3092\u8FFD\u52A0\u3057\u307E\u3057\u305F",
  whosJoining: "\u8AB0\u304C\u53C2\u52A0\u3057\u307E\u3059\u304B\uFF1F",
  suggestedTimes: "\u30B2\u30B9\u30C8\u3078\u306E\u63D0\u6848\u6642\u9593",
  viewSuggestions: "\u63D0\u6848\u3092\u898B\u308B",
  whereWillItBe: "\u3069\u3053\u3067\u958B\u50AC\u3055\u308C\u307E\u3059\u304B\uFF1F",
  dateAndTime: "\u65E5\u6642",
  reminders: "\u30EA\u30DE\u30A4\u30F3\u30C0\u30FC",
  dragAndDrop: "\u30D5\u30A1\u30A4\u30EB\u3092\u30C9\u30E9\u30C3\u30B0\uFF06\u30C9\u30ED\u30C3\u30D7\u307E\u305F\u306F",
  attachments: "\u6DFB\u4ED8\u30D5\u30A1\u30A4\u30EB",
  reminderAtTime: "\u30A4\u30D9\u30F3\u30C8\u6642\u9593\u306B",
  reminder5min: "5\u5206\u524D",
  reminder10min: "10\u5206\u524D",
  reminder15min: "15\u5206\u524D",
  reminder30min: "30\u5206\u524D",
  reminder1hour: "1\u6642\u9593\u524D",
  reminder2hours: "2\u6642\u9593\u524D",
  reminder1day: "1\u65E5\u524D",
  reminder2days: "2\u65E5\u524D",
  reminder1week: "1\u9031\u9593\u524D",
  tomorrow: "\u660E\u65E5",
  eventCount: "\u4EF6\u306E\u30A4\u30D9\u30F3\u30C8",
  eventsCount: "\u4EF6\u306E\u30A4\u30D9\u30F3\u30C8",
  timezone: "\u30BF\u30A4\u30E0\u30BE\u30FC\u30F3",
  localTime: "\u30ED\u30FC\u30AB\u30EB\u6642\u9593",
  search: "\u30A4\u30D9\u30F3\u30C8\u3092\u691C\u7D22...",
  allTypes: "\u3059\u3079\u3066\u306E\u30BF\u30A4\u30D7",
  noTitle: "\uFF08\u30BF\u30A4\u30C8\u30EB\u306A\u3057\uFF09",
  copy: "\uFF08\u30B3\u30D4\u30FC\uFF09",
  clickToOpenInMaps: "\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u5730\u56F3\u3067\u958B\u304F"
};
var ko = {
  today: "\uC624\uB298",
  month: "\uC6D4",
  week: "\uC8FC",
  day: "\uC77C",
  agenda: "\uC77C\uC815",
  resource: "\uB9AC\uC18C\uC2A4",
  create: "\uB9CC\uB4E4\uAE30",
  createEvent: "\uC77C\uC815 \uB9CC\uB4E4\uAE30",
  editEvent: "\uC77C\uC815 \uD3B8\uC9D1",
  newEvent: "\uC0C8 \uC77C\uC815",
  saveChanges: "\uBCC0\uACBD\uC0AC\uD56D \uC800\uC7A5",
  delete: "\uC0AD\uC81C",
  save: "\uC800\uC7A5",
  cancel: "\uCDE8\uC18C",
  edit: "\uD3B8\uC9D1",
  duplicate: "\uBCF5\uC81C",
  close: "\uB2EB\uAE30",
  moreOptions: "\uB354 \uBCF4\uAE30",
  addAttachment: "\uD30C\uC77C \uC5C5\uB85C\uB4DC",
  addReminder: "\uCD94\uAC00",
  title: "\uC81C\uBAA9 \uCD94\uAC00",
  addTitle: "\uC81C\uBAA9 \uCD94\uAC00",
  start: "\uC2DC\uC791",
  end: "\uC885\uB8CC",
  allDay: "\uC885\uC77C",
  description: "\uC124\uBA85",
  descriptionAndAttachments: "\uC124\uBA85",
  addDescription: "\uC124\uBA85 \uB610\uB294 \uBA54\uBAA8 \uCD94\uAC00...",
  location: "\uC8FC\uC18C \uC785\uB825",
  addLocation: "\uC7A5\uC18C \uCD94\uAC00",
  locationHelpText: '\uC9C0\uB3C4\uB97C \uC0DD\uC131\uD558\uB824\uBA74 \uC2E4\uC81C \uC8FC\uC18C(\uC608: "\uC11C\uC6B8\uC2DC \uAC15\uB0A8\uAD6C 1\uBC88\uC9C0")\uB97C \uC785\uB825\uD558\uC138\uC694.',
  notes: "\uBA54\uBAA8",
  repeat: "\uBC18\uBCF5",
  noRepeat: "\uBC18\uBCF5 \uC5C6\uC74C",
  doesNotRepeat: "\uBC18\uBCF5 \uC5C6\uC74C",
  daily: "\uB9E4\uC77C",
  weekly: "\uB9E4\uC8FC",
  monthly: "\uB9E4\uC6D4",
  yearly: "\uB9E4\uB144",
  repeatFor: "\uBC18\uBCF5 \uD69F\uC218",
  times: "\uBC88",
  until: "\uAE4C\uC9C0",
  endRepeat: "\uBC18\uBCF5 \uC885\uB8CC",
  never: "\uC5C6\uC74C",
  afterOccurrences: "\uBC88 \uD6C4 \uC885\uB8CC",
  onDate: "\uB0A0\uC9DC\uC5D0",
  selectCalendar: "\uCE98\uB9B0\uB354 \uC120\uD0DD",
  selectType: "\uC720\uD615 \uC120\uD0DD",
  calendar: "\uCE98\uB9B0\uB354",
  calendars: "\uCE98\uB9B0\uB354",
  event: "\uC77C\uC815",
  task: "\uC791\uC5C5",
  appointmentSchedule: "\uC608\uC57D \uC77C\uC815",
  new: "\uC0C8\uB85C \uB9CC\uB4E4\uAE30",
  guests: "\uCC38\uC11D\uC790",
  addGuests: "\uCC38\uC11D\uC790 \uCD94\uAC00",
  guest: "\uBA85 \uCC38\uC11D\uC790",
  guestCount: "\uBA85 \uCC38\uC11D\uC790",
  guestsCount: "\uBA85 \uCC38\uC11D\uC790",
  guestAdded: "\uBA85 \uCC38\uC11D\uC790 \uCD94\uAC00\uB428",
  guestsAdded: "\uBA85 \uCC38\uC11D\uC790 \uCD94\uAC00\uB428",
  whosJoining: "\uB204\uAC00 \uCC38\uAC00\uD558\uB098\uC694?",
  suggestedTimes: "\uCC38\uC11D\uC790\uB97C \uC704\uD55C \uCD94\uCC9C \uC2DC\uAC04",
  viewSuggestions: "\uC81C\uC548 \uBCF4\uAE30",
  whereWillItBe: "\uC5B4\uB514\uC11C \uC5F4\uB9AC\uB098\uC694?",
  dateAndTime: "\uB0A0\uC9DC \uBC0F \uC2DC\uAC04",
  reminders: "\uC54C\uB9BC",
  dragAndDrop: "\uD30C\uC77C\uC744 \uB4DC\uB798\uADF8 \uC564 \uB4DC\uB86D\uD558\uAC70\uB098",
  attachments: "\uCCA8\uBD80\uD30C\uC77C",
  reminderAtTime: "\uC77C\uC815 \uC2DC\uAC04\uC5D0",
  reminder5min: "5\uBD84 \uC804",
  reminder10min: "10\uBD84 \uC804",
  reminder15min: "15\uBD84 \uC804",
  reminder30min: "30\uBD84 \uC804",
  reminder1hour: "1\uC2DC\uAC04 \uC804",
  reminder2hours: "2\uC2DC\uAC04 \uC804",
  reminder1day: "1\uC77C \uC804",
  reminder2days: "2\uC77C \uC804",
  reminder1week: "1\uC8FC\uC77C \uC804",
  tomorrow: "\uB0B4\uC77C",
  eventCount: "\uAC1C \uC77C\uC815",
  eventsCount: "\uAC1C \uC77C\uC815",
  timezone: "\uC2DC\uAC04\uB300",
  localTime: "\uB85C\uCEEC \uC2DC\uAC04",
  search: "\uC77C\uC815 \uAC80\uC0C9...",
  allTypes: "\uBAA8\uB4E0 \uC720\uD615",
  noTitle: "(\uC81C\uBAA9 \uC5C6\uC74C)",
  copy: "(\uBCF5\uC0AC)",
  clickToOpenInMaps: "\uC9C0\uB3C4\uC5D0\uC11C \uC5F4\uB824\uBA74 \uD074\uB9AD\uD558\uC138\uC694"
};
var ru = {
  today: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F",
  month: "\u041C\u0435\u0441\u044F\u0446",
  week: "\u041D\u0435\u0434\u0435\u043B\u044F",
  day: "\u0414\u0435\u043D\u044C",
  agenda: "\u041F\u043E\u0432\u0435\u0441\u0442\u043A\u0430",
  resource: "\u0420\u0435\u0441\u0443\u0440\u0441\u044B",
  create: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C",
  createEvent: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u043E\u0431\u044B\u0442\u0438\u0435",
  editEvent: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0441\u043E\u0431\u044B\u0442\u0438\u0435",
  newEvent: "\u041D\u043E\u0432\u043E\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u0435",
  saveChanges: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
  delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
  edit: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C",
  duplicate: "\u0414\u0443\u0431\u043B\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
  close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
  moreOptions: "\u0415\u0449\u0451 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B",
  addAttachment: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u0430\u0439\u043B\u044B",
  addReminder: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C",
  title: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
  addTitle: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A",
  start: "\u041D\u0430\u0447\u0430\u043B\u043E",
  end: "\u041A\u043E\u043D\u0435\u0446",
  allDay: "\u0412\u0435\u0441\u044C \u0434\u0435\u043D\u044C",
  description: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
  descriptionAndAttachments: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435",
  addDescription: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0438\u043B\u0438 \u0437\u0430\u043C\u0435\u0442\u043A\u0438...",
  location: "\u0412\u0432\u0435\u0441\u0442\u0438 \u0430\u0434\u0440\u0435\u0441",
  addLocation: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043C\u0435\u0441\u0442\u043E",
  locationHelpText: '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0430\u0434\u0440\u0435\u0441 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, "\u0443\u043B. \u041B\u0435\u043D\u0438\u043D\u0430, 1") \u0434\u043B\u044F \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u043A\u0430\u0440\u0442\u044B.',
  notes: "\u0417\u0430\u043C\u0435\u0442\u043A\u0438",
  repeat: "\u041F\u043E\u0432\u0442\u043E\u0440",
  noRepeat: "\u0411\u0435\u0437 \u043F\u043E\u0432\u0442\u043E\u0440\u0430",
  doesNotRepeat: "\u0411\u0435\u0437 \u043F\u043E\u0432\u0442\u043E\u0440\u0430",
  daily: "\u0415\u0436\u0435\u0434\u043D\u0435\u0432\u043D\u043E",
  weekly: "\u0415\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E",
  monthly: "\u0415\u0436\u0435\u043C\u0435\u0441\u044F\u0447\u043D\u043E",
  yearly: "\u0415\u0436\u0435\u0433\u043E\u0434\u043D\u043E",
  repeatFor: "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0442\u044C",
  times: "\u0440\u0430\u0437",
  until: "\u0414\u043E",
  endRepeat: "\u041A\u043E\u043D\u0435\u0446 \u043F\u043E\u0432\u0442\u043E\u0440\u0430",
  never: "\u041D\u0438\u043A\u043E\u0433\u0434\u0430",
  afterOccurrences: "\u041F\u043E\u0441\u043B\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u0435\u043D\u0438\u0439",
  onDate: "\u041D\u0430 \u0434\u0430\u0442\u0443",
  selectCalendar: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C",
  selectType: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u0438\u043F",
  calendar: "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C",
  calendars: "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u0438",
  event: "\u0421\u043E\u0431\u044B\u0442\u0438\u0435",
  task: "\u0417\u0430\u0434\u0430\u0447\u0430",
  appointmentSchedule: "\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0432\u0441\u0442\u0440\u0435\u0447",
  new: "\u041D\u043E\u0432\u044B\u0439",
  guests: "\u0413\u043E\u0441\u0442\u0438",
  addGuests: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0433\u043E\u0441\u0442\u0435\u0439",
  guest: "\u0433\u043E\u0441\u0442\u044C",
  guestCount: "\u0433\u043E\u0441\u0442\u044C",
  guestsCount: "\u0433\u043E\u0441\u0442\u0435\u0439",
  guestAdded: "\u0433\u043E\u0441\u0442\u044C \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D",
  guestsAdded: "\u0433\u043E\u0441\u0442\u0435\u0439 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u043E",
  whosJoining: "\u041A\u0442\u043E \u043F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u0441\u044F?",
  suggestedTimes: "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u043C\u043E\u0435 \u0432\u0440\u0435\u043C\u044F \u0434\u043B\u044F \u0433\u043E\u0441\u0442\u0435\u0439",
  viewSuggestions: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F",
  whereWillItBe: "\u0413\u0434\u0435 \u044D\u0442\u043E \u0431\u0443\u0434\u0435\u0442?",
  dateAndTime: "\u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043C\u044F",
  reminders: "\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u044F",
  dragAndDrop: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0438\u043B\u0438",
  attachments: "\u0412\u043B\u043E\u0436\u0435\u043D\u0438\u044F",
  reminderAtTime: "\u0412\u043E \u0432\u0440\u0435\u043C\u044F \u0441\u043E\u0431\u044B\u0442\u0438\u044F",
  reminder5min: "\u0417\u0430 5 \u043C\u0438\u043D\u0443\u0442",
  reminder10min: "\u0417\u0430 10 \u043C\u0438\u043D\u0443\u0442",
  reminder15min: "\u0417\u0430 15 \u043C\u0438\u043D\u0443\u0442",
  reminder30min: "\u0417\u0430 30 \u043C\u0438\u043D\u0443\u0442",
  reminder1hour: "\u0417\u0430 1 \u0447\u0430\u0441",
  reminder2hours: "\u0417\u0430 2 \u0447\u0430\u0441\u0430",
  reminder1day: "\u0417\u0430 1 \u0434\u0435\u043D\u044C",
  reminder2days: "\u0417\u0430 2 \u0434\u043D\u044F",
  reminder1week: "\u0417\u0430 1 \u043D\u0435\u0434\u0435\u043B\u044E",
  tomorrow: "\u0417\u0430\u0432\u0442\u0440\u0430",
  eventCount: "\u0441\u043E\u0431\u044B\u0442\u0438\u0435",
  eventsCount: "\u0441\u043E\u0431\u044B\u0442\u0438\u0439",
  timezone: "\u0427\u0430\u0441\u043E\u0432\u043E\u0439 \u043F\u043E\u044F\u0441",
  localTime: "\u041C\u0435\u0441\u0442\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F",
  search: "\u041F\u043E\u0438\u0441\u043A \u0441\u043E\u0431\u044B\u0442\u0438\u0439...",
  allTypes: "\u0412\u0441\u0435 \u0442\u0438\u043F\u044B",
  noTitle: "(\u0411\u0435\u0437 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430)",
  copy: "(\u041A\u043E\u043F\u0438\u044F)",
  clickToOpenInMaps: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435"
};
var nl = {
  today: "Vandaag",
  month: "Maand",
  week: "Week",
  day: "Dag",
  agenda: "Agenda",
  resource: "Bronnen",
  create: "Aanmaken",
  createEvent: "Evenement aanmaken",
  editEvent: "Evenement bewerken",
  newEvent: "Nieuw evenement",
  saveChanges: "Wijzigingen opslaan",
  delete: "Verwijderen",
  save: "Opslaan",
  cancel: "Annuleren",
  edit: "Bewerken",
  duplicate: "Dupliceren",
  close: "Sluiten",
  moreOptions: "Meer opties",
  addAttachment: "Bestanden uploaden",
  addReminder: "Toevoegen",
  title: "Titel toevoegen",
  addTitle: "Titel toevoegen",
  start: "Begin",
  end: "Einde",
  allDay: "De hele dag",
  description: "Beschrijving",
  descriptionAndAttachments: "Beschrijving",
  addDescription: "Beschrijving of notities toevoegen...",
  location: "Adres invoeren",
  addLocation: "Locatie toevoegen",
  locationHelpText: 'Voer een fysiek adres in (bijv. "Hoofdstraat 1") om de kaart te genereren.',
  notes: "Notities",
  repeat: "Herhalen",
  noRepeat: "Geen herhaling",
  doesNotRepeat: "Geen herhaling",
  daily: "Dagelijks",
  weekly: "Wekelijks",
  monthly: "Maandelijks",
  yearly: "Jaarlijks",
  repeatFor: "Herhalen voor",
  times: "keer",
  until: "Tot",
  endRepeat: "Herhaling be\xEBindigen",
  never: "Nooit",
  afterOccurrences: "Na herhalingen",
  onDate: "Op datum",
  selectCalendar: "Kalender selecteren",
  selectType: "Type selecteren",
  calendar: "Kalender",
  calendars: "Kalenders",
  event: "Evenement",
  task: "Taak",
  appointmentSchedule: "Afspraakschema",
  new: "Nieuw",
  guests: "Gasten",
  addGuests: "Gasten toevoegen",
  guest: "gast",
  guestCount: "gast",
  guestsCount: "gasten",
  guestAdded: "gast toegevoegd",
  guestsAdded: "gasten toegevoegd",
  whosJoining: "Wie doet er mee?",
  suggestedTimes: "Voorgestelde tijden voor gasten",
  viewSuggestions: "Suggesties bekijken",
  whereWillItBe: "Waar zal het zijn?",
  dateAndTime: "Datum en tijd",
  reminders: "Herinneringen",
  dragAndDrop: "Sleep bestanden of",
  attachments: "Bijlagen",
  reminderAtTime: "Op het moment van het evenement",
  reminder5min: "5 minuten van tevoren",
  reminder10min: "10 minuten van tevoren",
  reminder15min: "15 minuten van tevoren",
  reminder30min: "30 minuten van tevoren",
  reminder1hour: "1 uur van tevoren",
  reminder2hours: "2 uur van tevoren",
  reminder1day: "1 dag van tevoren",
  reminder2days: "2 dagen van tevoren",
  reminder1week: "1 week van tevoren",
  tomorrow: "Morgen",
  eventCount: "evenement",
  eventsCount: "evenementen",
  timezone: "Tijdzone",
  localTime: "Lokale tijd",
  search: "Evenementen zoeken...",
  allTypes: "Alle typen",
  noTitle: "(Geen titel)",
  copy: "(Kopie)",
  clickToOpenInMaps: "Klik om op de kaart te openen"
};
var pl = {
  today: "Dzi\u015B",
  month: "Miesi\u0105c",
  week: "Tydzie\u0144",
  day: "Dzie\u0144",
  agenda: "Agenda",
  resource: "Zasoby",
  create: "Utw\xF3rz",
  createEvent: "Utw\xF3rz wydarzenie",
  editEvent: "Edytuj wydarzenie",
  newEvent: "Nowe wydarzenie",
  saveChanges: "Zapisz zmiany",
  delete: "Usu\u0144",
  save: "Zapisz",
  cancel: "Anuluj",
  edit: "Edytuj",
  duplicate: "Duplikuj",
  close: "Zamknij",
  moreOptions: "Wi\u0119cej opcji",
  addAttachment: "Prze\u015Blij pliki",
  addReminder: "Dodaj",
  title: "Dodaj tytu\u0142",
  addTitle: "Dodaj tytu\u0142",
  start: "Pocz\u0105tek",
  end: "Koniec",
  allDay: "Ca\u0142y dzie\u0144",
  description: "Opis",
  descriptionAndAttachments: "Opis",
  addDescription: "Dodaj opis lub notatki...",
  location: "Wprowad\u017A adres",
  addLocation: "Dodaj lokalizacj\u0119",
  locationHelpText: 'Wprowad\u017A adres fizyczny (np. "ul. G\u0142\xF3wna 1") aby wygenerowa\u0107 map\u0119.',
  notes: "Notatki",
  repeat: "Powtarzaj",
  noRepeat: "Nie powtarza si\u0119",
  doesNotRepeat: "Nie powtarza si\u0119",
  daily: "Codziennie",
  weekly: "Co tydzie\u0144",
  monthly: "Co miesi\u0105c",
  yearly: "Co rok",
  repeatFor: "Powtarzaj przez",
  times: "razy",
  until: "Do",
  endRepeat: "Koniec powtarzania",
  never: "Nigdy",
  afterOccurrences: "Po powt\xF3rzeniach",
  onDate: "W dniu",
  selectCalendar: "Wybierz kalendarz",
  selectType: "Wybierz typ",
  calendar: "Kalendarz",
  calendars: "Kalendarze",
  event: "Wydarzenie",
  task: "Zadanie",
  appointmentSchedule: "Harmonogram spotka\u0144",
  new: "Nowy",
  guests: "Go\u015Bcie",
  addGuests: "Dodaj go\u015Bci",
  guest: "go\u015B\u0107",
  guestCount: "go\u015B\u0107",
  guestsCount: "go\u015Bci",
  guestAdded: "go\u015B\u0107 dodany",
  guestsAdded: "go\u015Bci dodanych",
  whosJoining: "Kto do\u0142\u0105cza?",
  suggestedTimes: "Proponowane godziny dla go\u015Bci",
  viewSuggestions: "Zobacz sugestie",
  whereWillItBe: "Gdzie si\u0119 odb\u0119dzie?",
  dateAndTime: "Data i godzina",
  reminders: "Przypomnienia",
  dragAndDrop: "Przeci\u0105gnij i upu\u015B\u0107 pliki lub",
  attachments: "Za\u0142\u0105czniki",
  reminderAtTime: "O czasie wydarzenia",
  reminder5min: "5 minut wcze\u015Bniej",
  reminder10min: "10 minut wcze\u015Bniej",
  reminder15min: "15 minut wcze\u015Bniej",
  reminder30min: "30 minut wcze\u015Bniej",
  reminder1hour: "1 godzin\u0119 wcze\u015Bniej",
  reminder2hours: "2 godziny wcze\u015Bniej",
  reminder1day: "1 dzie\u0144 wcze\u015Bniej",
  reminder2days: "2 dni wcze\u015Bniej",
  reminder1week: "1 tydzie\u0144 wcze\u015Bniej",
  tomorrow: "Jutro",
  eventCount: "wydarzenie",
  eventsCount: "wydarze\u0144",
  timezone: "Strefa czasowa",
  localTime: "Czas lokalny",
  search: "Szukaj wydarze\u0144...",
  allTypes: "Wszystkie typy",
  noTitle: "(Bez tytu\u0142u)",
  copy: "(Kopia)",
  clickToOpenInMaps: "Kliknij, aby otworzy\u0107 na mapie"
};
var sv = {
  today: "Idag",
  month: "M\xE5nad",
  week: "Vecka",
  day: "Dag",
  agenda: "Agenda",
  resource: "Resurser",
  create: "Skapa",
  createEvent: "Skapa h\xE4ndelse",
  editEvent: "Redigera h\xE4ndelse",
  newEvent: "Ny h\xE4ndelse",
  saveChanges: "Spara \xE4ndringar",
  delete: "Ta bort",
  save: "Spara",
  cancel: "Avbryt",
  edit: "Redigera",
  duplicate: "Duplicera",
  close: "St\xE4ng",
  moreOptions: "Fler alternativ",
  addAttachment: "Ladda upp filer",
  addReminder: "L\xE4gg till",
  title: "L\xE4gg till titel",
  addTitle: "L\xE4gg till titel",
  start: "Start",
  end: "Slut",
  allDay: "Hela dagen",
  description: "Beskrivning",
  descriptionAndAttachments: "Beskrivning",
  addDescription: "L\xE4gg till beskrivning eller anteckningar...",
  location: "Ange adress",
  addLocation: "L\xE4gg till plats",
  locationHelpText: 'Ange en fysisk adress (t.ex. "Storgatan 1") f\xF6r att generera kartan.',
  notes: "Anteckningar",
  repeat: "Upprepa",
  noRepeat: "Upprepas inte",
  doesNotRepeat: "Upprepas inte",
  daily: "Dagligen",
  weekly: "Varje vecka",
  monthly: "Varje m\xE5nad",
  yearly: "Varje \xE5r",
  repeatFor: "Upprepa",
  times: "g\xE5nger",
  until: "Till",
  endRepeat: "Avsluta upprepning",
  never: "Aldrig",
  afterOccurrences: "Efter upprepningar",
  onDate: "P\xE5 datum",
  selectCalendar: "V\xE4lj kalender",
  selectType: "V\xE4lj typ",
  calendar: "Kalender",
  calendars: "Kalendrar",
  event: "H\xE4ndelse",
  task: "Uppgift",
  appointmentSchedule: "Bokningsschema",
  new: "Ny",
  guests: "G\xE4ster",
  addGuests: "L\xE4gg till g\xE4ster",
  guest: "g\xE4st",
  guestCount: "g\xE4st",
  guestsCount: "g\xE4ster",
  guestAdded: "g\xE4st tillagd",
  guestsAdded: "g\xE4ster tillagda",
  whosJoining: "Vem deltar?",
  suggestedTimes: "F\xF6reslagna tider f\xF6r g\xE4ster",
  viewSuggestions: "Visa f\xF6rslag",
  whereWillItBe: "Var ska det vara?",
  dateAndTime: "Datum och tid",
  reminders: "P\xE5minnelser",
  dragAndDrop: "Dra och sl\xE4pp filer eller",
  attachments: "Bilagor",
  reminderAtTime: "Vid h\xE4ndelsens tid",
  reminder5min: "5 minuter innan",
  reminder10min: "10 minuter innan",
  reminder15min: "15 minuter innan",
  reminder30min: "30 minuter innan",
  reminder1hour: "1 timme innan",
  reminder2hours: "2 timmar innan",
  reminder1day: "1 dag innan",
  reminder2days: "2 dagar innan",
  reminder1week: "1 vecka innan",
  tomorrow: "Imorgon",
  eventCount: "h\xE4ndelse",
  eventsCount: "h\xE4ndelser",
  timezone: "Tidszon",
  localTime: "Lokal tid",
  search: "S\xF6k h\xE4ndelser...",
  allTypes: "Alla typer",
  noTitle: "(Ingen titel)",
  copy: "(Kopia)",
  clickToOpenInMaps: "Klicka f\xF6r att \xF6ppna i karta"
};
var LOCALES = {
  tr,
  en,
  fr,
  de,
  es,
  it,
  pt,
  ar,
  zh,
  ja,
  ko,
  ru,
  nl,
  pl,
  sv
};
function getTranslations(language = "tr", overrides = {}) {
  return { ...LOCALES[language], ...overrides };
}

// src/components/CalendarHeader.tsx
var DROPDOWN_GAP = 8;
var VIEWPORT_PADDING = 8;
var LANG_DROPDOWN_WIDTH = 208;
var CUSTOM_VIEW_DROPDOWN_WIDTH = 160;
function getDropdownPosition(triggerRect, dropdownWidth) {
  let left = triggerRect.left;
  const top = triggerRect.bottom + DROPDOWN_GAP;
  if (left + dropdownWidth > window.innerWidth - VIEWPORT_PADDING) {
    left = triggerRect.right - dropdownWidth;
  }
  left = Math.max(VIEWPORT_PADDING, Math.min(left, window.innerWidth - dropdownWidth - VIEWPORT_PADDING));
  return { top, left };
}
var CalendarHeader = ({
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
  language = "tr",
  onLanguageChange,
  locale,
  onCreateEvent,
  customViews,
  activeCustomViewId,
  onCustomViewChange,
  eventCount,
  hideLanguageSwitcher = false
}) => {
  const [isLangOpen, setIsLangOpen] = React15.useState(false);
  const [isCustomViewOpen, setIsCustomViewOpen] = React15.useState(false);
  const langButtonRef = React15.useRef(null);
  const langDropdownRef = React15.useRef(null);
  const customViewDropdownRef = React15.useRef(null);
  const customViewButtonRef = React15.useRef(null);
  const [langPos, setLangPos] = React15.useState(null);
  const [customViewPos, setCustomViewPos] = React15.useState(null);
  const updateLangPos = React15.useCallback(() => {
    const el = langButtonRef.current;
    if (!el) return;
    setLangPos(getDropdownPosition(el.getBoundingClientRect(), LANG_DROPDOWN_WIDTH));
  }, []);
  const updateCustomViewPos = React15.useCallback(() => {
    const el = customViewButtonRef.current;
    if (!el) return;
    setCustomViewPos(getDropdownPosition(el.getBoundingClientRect(), CUSTOM_VIEW_DROPDOWN_WIDTH));
  }, []);
  React15.useLayoutEffect(() => {
    if (!isLangOpen) return;
    updateLangPos();
  }, [isLangOpen, updateLangPos]);
  React15.useLayoutEffect(() => {
    if (!isCustomViewOpen) return;
    updateCustomViewPos();
  }, [isCustomViewOpen, updateCustomViewPos]);
  React15.useEffect(() => {
    if (!isLangOpen) return;
    const handle = () => updateLangPos();
    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle, true);
    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle, true);
    };
  }, [isLangOpen, updateLangPos]);
  React15.useEffect(() => {
    if (!isCustomViewOpen) return;
    const handle = () => updateCustomViewPos();
    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle, true);
    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle, true);
    };
  }, [isCustomViewOpen, updateCustomViewPos]);
  React15.useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      const insideButton = langButtonRef.current?.contains(target);
      const insideDropdown = langDropdownRef.current?.contains(target);
      if (!insideButton && !insideDropdown) setIsLangOpen(false);
    };
    if (isLangOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);
  React15.useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
      const insideButton = customViewButtonRef.current?.contains(target);
      const insideDropdown = customViewDropdownRef.current?.contains(target);
      if (!insideButton && !insideDropdown) setIsCustomViewOpen(false);
    };
    if (isCustomViewOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCustomViewOpen]);
  const viewConfig = [
    { key: "month", icon: lucideReact.CalendarDays },
    { key: "week", icon: lucideReact.CalendarRange },
    { key: "day", icon: lucideReact.Calendar },
    { key: "agenda", icon: lucideReact.ListTodo }
  ];
  const currentLang = LANGUAGE_META[language] ?? LANGUAGE_META["tr"];
  return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col md:flex-row items-center justify-between px-3 md:px-5 py-3 border-b-[0px] border-border/50 bg-gradient-to-r from-background via-background to-muted/20 gap-3 md:gap-0 min-h-[64px]" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2 w-full md:w-auto justify-between md:justify-start" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2 md:gap-3" }, /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "text-muted-foreground hover:text-foreground hover:bg-accent/80 rounded-xl h-10 w-10 transition-all duration-200",
      onClick: onMenuClick
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Menu, { className: "h-5 w-5" })
  ), /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      variant: "outline",
      onClick: onToday,
      className: "h-9 px-5 rounded-xl text-sm font-medium hidden sm:inline-flex border-[0.5px] border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200"
    },
    translations.today
  ), onCreateEvent && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative group hidden sm:block" }, /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      onClick: onCreateEvent,
      size: "icon",
      className: "h-9 w-9 rounded-xl shadow-sm shadow-primary/20 transition-all duration-200"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Plus, { className: "h-4 w-4" })
  ), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "bg-popover text-popover-foreground text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-md border border-border/60 whitespace-nowrap" }, translations.createEvent ?? translations.create), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-popover border-l border-t border-border/60 rotate-45" }))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center bg-muted/40 rounded-xl p-0.5" }, /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: onPrev,
      className: "rounded-lg h-8 w-8 hover:bg-background/80 transition-all duration-200"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronLeft, { className: "h-4 w-4 text-muted-foreground" })
  ), /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      onClick: onNext,
      className: "rounded-lg h-8 w-8 hover:bg-background/80 transition-all duration-200"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronRight, { className: "h-4 w-4 text-muted-foreground" })
  )), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "ml-2 md:ml-4 hidden sm:block" }, /* @__PURE__ */ React15__namespace.default.createElement("h2", { className: "text-lg md:text-xl font-semibold text-foreground whitespace-nowrap capitalize tracking-tight" }, dateFns.format(currentDate, "MMMM yyyy", { locale })))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "sm:hidden" }, /* @__PURE__ */ React15__namespace.default.createElement("h2", { className: "text-lg font-semibold text-foreground whitespace-nowrap capitalize tracking-tight" }, dateFns.format(currentDate, "MMMM yyyy", { locale })))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2 md:gap-3 w-full md:w-auto justify-end" }, onLanguageChange && !hideLanguageSwitcher && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      ref: langButtonRef,
      onClick: () => setIsLangOpen(!isLangOpen),
      className: cn(
        "flex items-center gap-1.5 h-9 px-3 rounded-xl text-sm font-medium transition-all duration-200",
        "text-muted-foreground hover:text-foreground hover:bg-accent/80",
        isLangOpen && "bg-accent/80 text-foreground"
      ),
      title: currentLang.english
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Globe, { className: "h-3.5 w-3.5" }),
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-base leading-none" }, currentLang.flag),
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "hidden sm:inline text-xs font-semibold uppercase tracking-wider" }, language),
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronDown, { className: cn("h-3.5 w-3.5 transition-transform duration-200", isLangOpen && "rotate-180") })
  ), isLangOpen && langPos && reactDom.createPortal(
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        ref: langDropdownRef,
        className: "fixed w-52 bg-background border border-border/60 rounded-2xl shadow-2xl z-[9999] overflow-hidden py-1.5",
        style: { top: langPos.top, left: langPos.left, width: LANG_DROPDOWN_WIDTH }
      },
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "px-3 py-2 border-b border-border/40 mb-1" }, /* @__PURE__ */ React15__namespace.default.createElement("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider" }, "Language / Dil")),
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "max-h-72 overflow-y-auto" }, Object.entries(LANGUAGE_META).map(([code, meta]) => /* @__PURE__ */ React15__namespace.default.createElement(
        "button",
        {
          key: code,
          onClick: () => {
            onLanguageChange(code);
            setIsLangOpen(false);
          },
          className: cn(
            "w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-all duration-150",
            "hover:bg-accent/60",
            language === code ? "bg-primary/10 text-primary font-semibold" : "text-foreground"
          )
        },
        /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-lg leading-none w-6 text-center" }, meta.flag),
        /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 text-left" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn("font-medium", meta.rtl && "text-right") }, meta.native), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-xs text-muted-foreground" }, meta.english)),
        language === code && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-2 h-2 rounded-full bg-primary shrink-0" })
      )))
    ),
    document.body
  )), onThemeToggle && /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "rounded-xl h-9 w-9 hover:bg-accent/80 transition-all duration-200",
      onClick: onThemeToggle
    },
    isDarkMode ? /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Sun, { className: "h-4 w-4 text-amber-500" }) : /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Moon, { className: "h-4 w-4 text-muted-foreground" })
  ), typeof eventCount === "number" && !hideViewSwitcher && /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      className: "flex items-center gap-1.5 h-8 px-3 rounded-xl bg-primary/10 text-primary text-xs font-semibold tabular-nums select-none border border-primary/20 shadow-sm shadow-primary/10",
      title: `${eventCount} event${eventCount !== 1 ? "s" : ""}`
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.CalendarCheck2, { className: "w-3.5 h-3.5 shrink-0" }),
    /* @__PURE__ */ React15__namespace.default.createElement("span", null, eventCount)
  ), !hideViewSwitcher && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center bg-muted/50 backdrop-blur-sm rounded-xl p-1 gap-0.5" }, viewConfig.map(({ key, icon: Icon }) => /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      key,
      variant: "ghost",
      size: "sm",
      onClick: () => {
        onViewChange(key);
        onCustomViewChange?.(null);
      },
      className: cn(
        "h-8 px-3 text-xs rounded-lg transition-all duration-200 gap-1.5",
        view === key && !activeCustomViewId ? "bg-background shadow-sm text-foreground font-medium border-[0.5px] border-border/50" : "text-muted-foreground hover:text-foreground hover:bg-background/50"
      )
    },
    /* @__PURE__ */ React15__namespace.default.createElement(Icon, { className: "h-3.5 w-3.5" }),
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "hidden sm:inline" }, translations[key])
  )), customViews && customViews.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement(React15__namespace.default.Fragment, null, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-px h-5 bg-border/60 mx-0.5 shrink-0" }), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative" }, /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      ref: customViewButtonRef,
      variant: "ghost",
      size: "sm",
      onClick: () => setIsCustomViewOpen((o) => !o),
      className: cn(
        "h-8 px-2.5 text-xs rounded-lg transition-all duration-200 gap-1",
        activeCustomViewId ? "bg-background shadow-sm text-foreground font-medium border-[0.5px] border-border/50" : "text-muted-foreground hover:text-foreground hover:bg-background/50"
      ),
      title: "Daha fazla g\xF6r\xFCn\xFCm"
    },
    activeCustomViewId ? customViews.find((cv) => cv.id === activeCustomViewId)?.label : /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.MoreHorizontal, { className: "h-3.5 w-3.5" }),
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronDown, { className: cn("h-3 w-3 transition-transform duration-150", isCustomViewOpen && "rotate-180") })
  ), isCustomViewOpen && customViewPos && reactDom.createPortal(
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        ref: customViewDropdownRef,
        className: "fixed min-w-[160px] bg-background border border-border/60 rounded-2xl shadow-2xl z-[9999] overflow-hidden py-1.5",
        style: { top: customViewPos.top, left: customViewPos.left, minWidth: CUSTOM_VIEW_DROPDOWN_WIDTH }
      },
      customViews.map((cv) => /* @__PURE__ */ React15__namespace.default.createElement(
        "button",
        {
          key: cv.id,
          onClick: () => {
            onCustomViewChange?.(cv.id);
            setIsCustomViewOpen(false);
          },
          className: cn(
            "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm transition-all duration-150",
            "hover:bg-accent/60",
            activeCustomViewId === cv.id ? "bg-primary/10 text-primary font-semibold" : "text-foreground"
          )
        },
        cv.icon && /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "w-4 h-4 flex items-center justify-center shrink-0" }, cv.icon),
        /* @__PURE__ */ React15__namespace.default.createElement("span", null, cv.label),
        activeCustomViewId === cv.id && /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "ml-auto w-1.5 h-1.5 rounded-full bg-primary shrink-0" })
      ))
    ),
    document.body
  ))))));
};
var getMonthGrid = (date, weekStartOn = 0) => {
  const monthStart = dateFns.startOfMonth(date);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart, { weekStartsOn: weekStartOn });
  const endDate = dateFns.endOfWeek(monthEnd, { weekStartsOn: weekStartOn });
  return dateFns.eachDayOfInterval({
    start: startDate,
    end: endDate
  });
};
var AMPM_LANGUAGES = /* @__PURE__ */ new Set(["en"]);
var uses12Hour = (language) => AMPM_LANGUAGES.has(language);
var getTimeFormat = (language) => uses12Hour(language) ? "h a" : "H:mm";
var getTimeFormatFull = (language) => uses12Hour(language) ? "h:mm a" : "HH:mm";
var MiniCalendar = ({
  currentDate,
  onDateChange,
  onViewChange,
  className
}) => {
  const [viewDate, setViewDate] = React15__namespace.default.useState(currentDate);
  React15__namespace.default.useEffect(() => {
    setViewDate(currentDate);
  }, [currentDate]);
  const days = React15__namespace.default.useMemo(() => getMonthGrid(viewDate), [viewDate]);
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const handlePrev = () => {
    const newDate = dateFns.subMonths(viewDate, 1);
    setViewDate(newDate);
    onDateChange(newDate);
    if (onViewChange) onViewChange("month");
  };
  const handleNext = () => {
    const newDate = dateFns.addMonths(viewDate, 1);
    setViewDate(newDate);
    onDateChange(newDate);
    if (onViewChange) onViewChange("month");
  };
  const handleDateClick = (day) => {
    onDateChange(day);
    if (onViewChange) onViewChange("day");
  };
  return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn("px-4 w-[260px]", className) }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center justify-between mb-4" }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-semibold text-foreground capitalize" }, dateFns.format(viewDate, "MMMM yyyy")), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center bg-muted/40 rounded-lg p-0.5" }, /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "h-7 w-7 rounded-md hover:bg-background/80 transition-all",
      onClick: handlePrev,
      "aria-label": "Previous month"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronLeft, { className: "h-4 w-4" })
  ), /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      variant: "ghost",
      size: "icon",
      className: "h-7 w-7 rounded-md hover:bg-background/80 transition-all",
      onClick: handleNext,
      "aria-label": "Next month"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronRight, { className: "h-4 w-4" })
  ))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "grid grid-cols-7 gap-y-2 text-center mb-2" }, weekDays.map((day, i) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: `${day}-${i}`, className: "text-[10px] text-muted-foreground/70 font-semibold uppercase" }, day))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "grid grid-cols-7 gap-y-1 text-center" }, days.map((day) => {
    const isSelected = dateFns.isSameDay(day, currentDate);
    const isCurrentMonth = dateFns.isSameMonth(day, viewDate);
    const isTodayDate = dateFns.isToday(day);
    return /* @__PURE__ */ React15__namespace.default.createElement(
      "button",
      {
        key: day.toISOString(),
        onClick: () => handleDateClick(day),
        className: cn(
          "h-8 w-8 mx-auto flex items-center justify-center text-xs rounded-xl transition-all duration-200 font-medium",
          !isCurrentMonth && "text-muted-foreground/30",
          isCurrentMonth && !isSelected && !isTodayDate && "text-foreground hover:bg-accent/80",
          isSelected && "bg-primary text-primary-foreground shadow-md shadow-primary/30 scale-105",
          !isSelected && isTodayDate && "bg-primary/10 text-primary ring-1 ring-primary/30"
        )
      },
      dateFns.format(day, "d")
    );
  })));
};
var Sidebar = ({
  currentDate,
  onDateChange,
  onViewChange,
  onEventCreate,
  timezone,
  onTimezoneChange,
  className,
  readOnly,
  calendars,
  onCalendarToggle,
  translations,
  renderMiniCalendar,
  sidebarMenus,
  activeCustomMenu,
  onCustomMenuChange,
  reverseTime = false,
  onReverseTimeChange,
  customViews,
  activeCustomViewId,
  onCustomViewChange
}) => {
  const [calendarsOpen, setCalendarsOpen] = React15.useState(true);
  const [timezoneOpen, setTimezoneOpen] = React15.useState(false);
  const [now, setNow] = React15.useState(null);
  const [hasMounted, setHasMounted] = React15.useState(false);
  const [menusExpanded, setMenusExpanded] = React15.useState(false);
  React15.useEffect(() => {
    setHasMounted(true);
    setNow(/* @__PURE__ */ new Date());
    const timer = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(timer);
  }, []);
  const defaultCalendars = [
    { id: "1", label: "My Calendar", color: "#3b82f6", active: true },
    { id: "2", label: "Birthdays", color: "#10b981", active: true },
    { id: "3", label: "Tasks", color: "#6366f1", active: true }
  ];
  const displayCalendars = calendars || defaultCalendars;
  const getAcronym = (tz) => {
    if (!tz || !now) return "LOC";
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" }).formatToParts(now).find((part) => part.type === "timeZoneName")?.value || "";
    } catch (e) {
      return "";
    }
  };
  const timezones = [
    { value: "", label: "Local Time", acronym: "LOC" },
    { value: "UTC", label: "UTC", acronym: "UTC" },
    { value: "America/New_York", label: "New York", acronym: "EST" },
    { value: "America/Chicago", label: "Chicago", acronym: "CST" },
    { value: "America/Denver", label: "Denver", acronym: "MST" },
    { value: "America/Los_Angeles", label: "Los Angeles", acronym: "PST" },
    { value: "Europe/London", label: "London", acronym: "GMT" },
    { value: "Europe/Paris", label: "Paris", acronym: "CET" },
    { value: "Europe/Berlin", label: "Berlin", acronym: "CET" },
    { value: "Asia/Dubai", label: "Dubai", acronym: "GST" },
    { value: "Asia/Tokyo", label: "Tokyo", acronym: "JST" },
    { value: "Asia/Singapore", label: "Singapore", acronym: "SGT" },
    { value: "Australia/Sydney", label: "Sydney", acronym: "AEDT" }
  ];
  const formatTzLabel = (tz, showTime = true) => {
    if (!hasMounted || !now || !showTime) {
      return /* @__PURE__ */ React15__namespace.default.createElement("span", null, tz.label);
    }
    let time = "";
    let acronym = tz.acronym;
    try {
      if (!tz.value) {
        time = dateFns.format(now, "HH:mm");
        try {
          acronym = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(now).find((part) => part.type === "timeZoneName")?.value || "LOC";
        } catch (e) {
        }
      } else {
        const zDate = dateFnsTz.toZonedTime(now, tz.value);
        time = dateFns.format(zDate, "HH:mm");
        const dynAcronym = getAcronym(tz.value);
        if (dynAcronym && !dynAcronym.includes("GMT") && !dynAcronym.includes("Time")) {
          acronym = dynAcronym;
        }
      }
    } catch (e) {
      return /* @__PURE__ */ React15__namespace.default.createElement("span", null, tz.label);
    }
    return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex justify-between w-full" }, /* @__PURE__ */ React15__namespace.default.createElement("span", null, tz.label), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-muted-foreground ml-2 tabular-nums" }, time, " ", /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs opacity-75" }, "(", acronym, ")")));
  };
  const selectedTzObj = timezones.find((t) => t.value === (timezone || ""));
  const selectedTimezoneLabel = selectedTzObj ? formatTzLabel(selectedTzObj) : translations?.localTime ?? "Local Time";
  return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn("flex flex-col w-[260px] overflow-x-hidden h-full bg-gradient-to-b scrollbar-hide from-background via-background to-muted/10 pt-4 pb-4 overflow-y-auto", className) }, sidebarMenus && sidebarMenus.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "px-4 mb-4" }, !menusExpanded && /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      variant: "outline",
      className: "w-full rounded-2xl h-11 gap-2.5 justify-start border-[0.5px] border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all duration-200 font-medium text-sm",
      onClick: () => setMenusExpanded(true)
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.LayoutGrid, { className: "w-4 h-4" }),
    /* @__PURE__ */ React15__namespace.default.createElement("span", null, "\u0130\u015Flemler")
  ), menusExpanded && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "animate-in fade-in slide-in-from-top-2 duration-200" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center justify-between mb-2 px-1" }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider" }, "\u0130\u015Flemler"), /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      onClick: () => setMenusExpanded(false),
      className: "w-6 h-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent/60 transition-all duration-150"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.X, { className: "w-3.5 h-3.5" })
  )), /* @__PURE__ */ React15__namespace.default.createElement("nav", { className: "space-y-0.5" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      onClick: () => {
        onCustomMenuChange?.(null);
        setMenusExpanded(false);
      },
      className: cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
        activeCustomMenu === null ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
      )
    },
    /* @__PURE__ */ React15__namespace.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4 shrink-0", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React15__namespace.default.createElement("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }), /* @__PURE__ */ React15__namespace.default.createElement("line", { x1: "16", y1: "2", x2: "16", y2: "6" }), /* @__PURE__ */ React15__namespace.default.createElement("line", { x1: "8", y1: "2", x2: "8", y2: "6" }), /* @__PURE__ */ React15__namespace.default.createElement("line", { x1: "3", y1: "10", x2: "21", y2: "10" })),
    /* @__PURE__ */ React15__namespace.default.createElement("span", null, "Takvim"),
    activeCustomMenu === null && /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "ml-auto w-1.5 h-1.5 rounded-full bg-primary" })
  ), sidebarMenus?.map((item) => /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      key: item.id,
      onClick: () => {
        onCustomMenuChange?.(item.id);
        setMenusExpanded(false);
      },
      className: cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
        activeCustomMenu === item.id ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
      )
    },
    item.icon && /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "w-4 h-4 shrink-0 flex items-center justify-center" }, item.icon),
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "truncate" }, item.label),
    activeCustomMenu === item.id && /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "ml-auto w-1.5 h-1.5 rounded-full bg-primary" })
  ))))), onEventCreate && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "md:hidden px-4 mb-4" }, /* @__PURE__ */ React15__namespace.default.createElement(
    Button,
    {
      onClick: () => {
        onEventCreate();
      },
      className: "w-full rounded-2xl h-11 gap-2.5 justify-center shadow-sm shadow-primary/20 transition-all duration-200 font-medium text-sm"
    },
    /* @__PURE__ */ React15__namespace.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4 shrink-0", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React15__namespace.default.createElement("path", { d: "M5 12h14" }), /* @__PURE__ */ React15__namespace.default.createElement("path", { d: "M12 5v14" })),
    /* @__PURE__ */ React15__namespace.default.createElement("span", null, translations?.createEvent ?? "Etkinlik Olu\u015Ftur")
  )), onReverseTimeChange && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "px-4 mb-4" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      onClick: () => onReverseTimeChange(!reverseTime),
      className: cn(
        "w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-[0.5px] transition-all duration-200 group",
        reverseTime ? "bg-primary/10 border-primary/30 text-primary" : "bg-muted/30 border-border/50 text-muted-foreground hover:border-primary/30 hover:text-foreground"
      )
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2.5" }, /* @__PURE__ */ React15__namespace.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "w-4 h-4 shrink-0", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React15__namespace.default.createElement("line", { x1: "12", y1: "19", x2: "12", y2: "5" }), /* @__PURE__ */ React15__namespace.default.createElement("polyline", { points: "5 12 12 5 19 12" }), /* @__PURE__ */ React15__namespace.default.createElement("line", { x1: "12", y1: "5", x2: "12", y2: "19", className: "opacity-40" }), /* @__PURE__ */ React15__namespace.default.createElement("polyline", { points: "5 12 12 19 19 12", className: "opacity-40" })), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-left" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-xs font-semibold leading-tight" }, "Saat Y\xF6n\xFC"), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-[10px] leading-tight opacity-70 mt-0.5" }, reverseTime ? "23:00 \u2192 00:00" : "00:00 \u2192 23:00"))),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn(
      "relative w-9 h-5 rounded-full transition-colors duration-200 shrink-0",
      reverseTime ? "bg-primary" : "bg-border"
    ) }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: cn(
      "absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200",
      reverseTime ? "left-4" : "left-0.5"
    ) }))
  )), renderMiniCalendar ? (
    // Custom mini-calendar: receives the same props as the built-in one
    renderMiniCalendar({ currentDate, onDateChange, onViewChange })
  ) : /* @__PURE__ */ React15__namespace.default.createElement(MiniCalendar, { currentDate, onDateChange, onViewChange }), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 px-4 space-y-5 mt-5" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "bg-muted/20 rounded-2xl p-3 border-[0px] border-border/30" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      className: "flex items-center justify-between cursor-pointer hover:bg-accent/50 p-2 -m-1 rounded-xl mb-2 transition-all duration-200",
      onClick: () => setCalendarsOpen(!calendarsOpen)
    },
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-semibold text-foreground" }, translations?.calendars),
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronDown, { className: cn("w-4 h-4 text-muted-foreground transition-transform duration-200", calendarsOpen && "rotate-180") })
  ), calendarsOpen && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "space-y-1" }, displayCalendars.map((cal) => /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      key: cal.id,
      className: "flex items-center gap-3 py-2 px-2 hover:bg-accent/60 rounded-xl cursor-pointer group transition-all duration-200",
      onClick: () => onCalendarToggle?.(cal.id, !(cal.active ?? true))
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative flex items-center justify-center" }, /* @__PURE__ */ React15__namespace.default.createElement(
      "input",
      {
        type: "checkbox",
        checked: cal.active ?? true,
        onChange: (e) => {
          e.stopPropagation();
          onCalendarToggle?.(cal.id, e.target.checked);
        },
        className: "peer h-5 w-5 rounded-md border-2 border-border/60 cursor-pointer appearance-none checked:border-transparent transition-all duration-200",
        style: { "--primary-color": cal.color },
        "data-cal-id": cal.id
      }
    ), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" }, /* @__PURE__ */ React15__namespace.default.createElement("svg", { className: "w-3.5 h-3.5 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 3 }, /* @__PURE__ */ React15__namespace.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }))), /* @__PURE__ */ React15__namespace.default.createElement("style", null, `
                      input[type="checkbox"][data-cal-id="${cal.id}"]:checked {
                        background-color: ${cal.color} !important;
                        border-color: ${cal.color} !important;
                      }
                      input[type="checkbox"][data-cal-id="${cal.id}"]:focus {
                        --tw-ring-color: ${cal.color}40 !important;
                      }
                    `)),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2 flex-1 min-w-0" }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm text-foreground/90 truncate font-medium" }, cal.label)),
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: "w-2 h-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity",
        style: { backgroundColor: cal.color }
      }
    )
  ))))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "mt-auto px-4 pt-5" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "bg-muted/20 rounded-2xl p-3" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2 mb-3" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "p-1.5 bg-primary/10 rounded-lg" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Globe, { className: "w-4 h-4 text-primary" })), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-semibold text-foreground" }, translations?.timezone)), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      onClick: () => setTimezoneOpen(!timezoneOpen),
      className: "w-full flex items-center justify-between bg-blue-200/40  hover:bg-blue-200/80 rounded-xl py-2.5 pl-4 pr-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all duration-200 text-left"
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 truncate mr-2 font-medium" }, selectedTimezoneLabel),
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronDown, { className: cn("w-4 h-4 text-muted-foreground transition-transform duration-200", timezoneOpen && "rotate-180") })
  ), timezoneOpen && /* @__PURE__ */ React15__namespace.default.createElement(React15__namespace.default.Fragment, null, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "fixed inset-0 z-40", onClick: () => setTimezoneOpen(false) }), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute bottom-full left-0 w-full mb-2 bg-background rounded-xl shadow-2xl z-50 max-h-[260px] overflow-y-auto p-1.5 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-none" }, timezones.map((tz) => /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      key: tz.value,
      className: cn(
        "px-3 py-2.5 text-sm rounded-lg cursor-pointer transition-all duration-200",
        (timezone || "") === tz.value ? "bg-primary text-primary-foreground font-semibold" : "text-foreground hover:bg-accent/80"
      ),
      onClick: () => {
        onTimezoneChange?.(tz.value);
        setTimezoneOpen(false);
      }
    },
    formatTzLabel(tz)
  ))))))));
};
var DraggableEvent = ({ event, children, className, style: propStyle, ...props }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = core.useDraggable({
    id: event.id,
    data: { event }
  });
  const style = {
    ...propStyle,
    transform: utilities.CSS.Translate.toString(transform),
    zIndex: isDragging ? 100 : propStyle?.zIndex,
    // When dragging, we want the ORIGINAL element to be almost invisible (or fully invisible)
    // so that the DragOverlay (the "ghost") is the only thing the user focuses on.
    // If we set opacity: 0, it disappears. If 0.1, it's a faint placeholder.
    // The user asked for "Make the entire dragged item transparent". 
    // Usually this means the original item should be faded out while the drag overlay is moving.
    opacity: isDragging ? 0 : propStyle?.opacity
    // Hiding original element completely
  };
  return /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      ref: setNodeRef,
      style,
      ...listeners,
      ...attributes,
      ...props,
      className: cn("touch-none", className)
    },
    children
  );
};
var DroppableCell = ({ id, date, resourceId, children, className, style, onClick }) => {
  const { isOver, setNodeRef } = core.useDroppable({
    id,
    data: { date, resourceId }
  });
  const minutes = date.getMinutes();
  const quarterClass = minutes === 0 ? "hover:bg-blue-50/50 dark:hover:bg-blue-900/10" : minutes === 15 ? "hover:bg-blue-50/80 dark:hover:bg-blue-900/20" : minutes === 30 ? "hover:bg-blue-100/50 dark:hover:bg-blue-900/30" : "hover:bg-blue-100/80 dark:hover:bg-blue-900/40";
  const activeQuarterClass = minutes === 0 ? "bg-blue-50/50 dark:bg-blue-900/10 ring-2 ring-primary ring-inset" : minutes === 15 ? "bg-blue-50/80 dark:bg-blue-900/20 ring-2 ring-primary ring-inset" : minutes === 30 ? "bg-blue-100/50 dark:bg-blue-900/30 ring-2 ring-primary ring-inset" : "bg-blue-100/80 dark:bg-blue-900/40 ring-2 ring-primary ring-inset";
  return /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      ref: setNodeRef,
      className: cn(
        className,
        quarterClass,
        isOver && activeQuarterClass
      ),
      style,
      onClick
    },
    children
  );
};

// src/views/MonthView.tsx
var EventItem = React15__namespace.default.memo(({ event, onEventClick }) => /* @__PURE__ */ React15__namespace.default.createElement(DraggableEvent, { event }, /* @__PURE__ */ React15__namespace.default.createElement(
  "div",
  {
    className: cn(
      "text-xs px-2.5 py-1.5 rounded-lg truncate cursor-pointer shadow-sm transition-all duration-200",
      "hover:shadow-md hover:scale-[1.02] hover:z-10",
      !event.color && "bg-primary/10 text-primary hover:bg-primary/15 border-[0.5px] border-primary/20"
    ),
    style: event.color ? {
      backgroundColor: `${event.color}20`,
      color: event.color,
      borderLeft: `3px solid ${event.color}`
    } : void 0,
    onClick: (e) => {
      e.stopPropagation();
      onEventClick?.(event);
    }
  },
  /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "font-medium" }, event.title)
)));
EventItem.displayName = "EventItem";
var MonthView = ({
  currentDate,
  events,
  onEventClick,
  onDateClick,
  timezone,
  locale
}) => {
  const days = React15.useMemo(() => getMonthGrid(currentDate), [currentDate]);
  const weekDays = React15.useMemo(() => {
    const start = dateFns.startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = dateFns.endOfWeek(currentDate, { weekStartsOn: 1 });
    return dateFns.eachDayOfInterval({ start, end });
  }, [currentDate]);
  const getZonedDate = React15.useCallback((date) => {
    return timezone ? dateFnsTz.toZonedTime(date, timezone) : date;
  }, [timezone]);
  const eventsByDay = React15.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    events.forEach((event) => {
      const zonedStart = getZonedDate(event.start);
      const key = dateFns.format(zonedStart, "yyyy-MM-dd");
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(event);
    });
    return map;
  }, [events, getZonedDate]);
  return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col h-full min-h-0 bg-background border-[0.5px] scrollbar-hide border-border/50 rounded-2xl overflow-hidden min-w-[800px] md:min-w-0 shadow-sm" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "overflow-y-auto flex-1 min-h-0 relative" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "grid grid-cols-7 border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/30 via-muted/40 to-muted/30 sticky top-0 z-20 backdrop-blur-sm" }, weekDays.map((day) => /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      key: day.toISOString(),
      className: "py-3 text-center text-xs font-semibold text-muted-foreground border-r-[0.5px] border-border/30 last:border-r-0 uppercase tracking-wider"
    },
    dateFns.format(day, "EEE", { locale })
  ))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "grid grid-cols-7", style: { gridAutoRows: "130px" } }, days.map((day) => {
    const dayKey = dateFns.format(day, "yyyy-MM-dd");
    const dayEvents = eventsByDay.get(dayKey) || [];
    const isCurrentMonth = dateFns.isSameMonth(day, currentDate);
    const cellId = day.toISOString();
    return /* @__PURE__ */ React15__namespace.default.createElement(
      DroppableCell,
      {
        key: cellId,
        id: cellId,
        date: day,
        className: cn(
          "h-[130px] p-2 border-b-[0.5px] border-r-[0.5px] border-border/30 last:border-r-0 relative transition-all duration-200 hover:bg-accent/5 flex flex-col gap-1.5 overflow-hidden group",
          !isCurrentMonth && "bg-muted/5 text-muted-foreground/60",
          dateFns.isToday(day) && "bg-primary/5 ring-1 ring-inset ring-primary/20"
        ),
        onClick: () => onDateClick?.(day)
      },
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex justify-between items-start" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn(
        "text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full transition-all duration-200",
        dateFns.isToday(day) ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "group-hover:bg-accent"
      ) }, dateFns.format(day, "d", { locale })), dayEvents.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-[10px] font-medium text-muted-foreground/60 bg-muted/50 px-1.5 py-0.5 rounded-full" }, dayEvents.length)),
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 flex flex-col gap-1 scrollbar-hide overflow-y-auto overflow-x-hidden" }, dayEvents.slice(0, 4).map((event) => /* @__PURE__ */ React15__namespace.default.createElement(EventItem, { key: `${event.id}-${dayKey}`, event, onEventClick })), dayEvents.length > 4 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-[10px] text-primary font-semibold text-center py-1 px-2 rounded-md bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors" }, "+", dayEvents.length - 4, " more"))
    );
  }))));
};
var ResizableEvent = ({
  event,
  hourHeight,
  minDuration = 15,
  onResize,
  children,
  className,
  style,
  readonly
}) => {
  const [isResizing, setIsResizing] = React15.useState(false);
  const [resizeHeight, setResizeHeight] = React15.useState(null);
  const containerRef = React15.useRef(null);
  const startYRef = React15.useRef(0);
  const startHeightRef = React15.useRef(0);
  const handleResizeStart = React15.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    startYRef.current = clientY;
    startHeightRef.current = containerRef.current?.offsetHeight || 0;
    setIsResizing(true);
    const handleMove = (moveEvent) => {
      const moveClientY = "touches" in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;
      const deltaY = moveClientY - startYRef.current;
      const snapInterval = hourHeight / 4;
      const snappedDelta = Math.round(deltaY / snapInterval) * snapInterval;
      const newHeight = Math.max(
        minDuration / 60 * hourHeight,
        // Minimum height based on minDuration
        startHeightRef.current + snappedDelta
      );
      setResizeHeight(newHeight);
    };
    const handleEnd = () => {
      setIsResizing(false);
      if (resizeHeight !== null && containerRef.current && onResize) {
        const originalHeight = startHeightRef.current;
        const heightDiff = (resizeHeight || originalHeight) - originalHeight;
        const minutesDiff = heightDiff / hourHeight * 60;
        const newEnd = new Date(event.end);
        newEnd.setMinutes(newEnd.getMinutes() + minutesDiff);
        if (newEnd > event.start) {
          onResize(event, newEnd);
        }
      }
      setResizeHeight(null);
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove, { passive: false });
    document.addEventListener("touchend", handleEnd);
  }, [event, hourHeight, minDuration, onResize, resizeHeight]);
  return /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      ref: containerRef,
      className: cn("relative group", className),
      style: {
        ...style,
        height: resizeHeight !== null ? `${resizeHeight}px` : style?.height
      }
    },
    children,
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: cn(
          readonly ? "cursor-default" : "cursor-ns-resize group-hover:opacity-100",
          "absolute bottom-0 left-0 right-0 h-3 z-20 flex items-center justify-center",
          "opacity-0 transition-opacity",
          isResizing && "opacity-100"
        ),
        onMouseDown: readonly ? void 0 : handleResizeStart,
        onTouchStart: readonly ? void 0 : handleResizeStart
      },
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn(
        "w-8 h-1 rounded-full transition-all",
        isResizing ? "bg-primary" : "bg-muted-foreground/30 group-hover:bg-primary/50"
      ) })
    ),
    isResizing && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute inset-0 border-2 border-primary border-dashed rounded-md pointer-events-none bg-primary/5" })
  );
};

// src/views/WeekView.tsx
var WeekView = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
  onEventResize,
  timezone,
  locale,
  readonly,
  language = "tr",
  initialScrollHour = 8,
  reverseTime = false
}) => {
  const start = dateFns.startOfWeek(currentDate, { weekStartsOn: 1 });
  const end = dateFns.endOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = dateFns.eachDayOfInterval({ start, end });
  const hours = reverseTime ? Array.from({ length: 24 }, (_, i) => 23 - i) : Array.from({ length: 24 }, (_, i) => i);
  const hourHeight = 60;
  const scrollContainerRef = React15__namespace.default.useRef(null);
  const [now, setNow] = React15__namespace.default.useState(/* @__PURE__ */ new Date());
  React15__namespace.default.useEffect(() => {
    const interval = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(interval);
  }, []);
  React15__namespace.default.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = reverseTime ? (23 - initialScrollHour) * hourHeight : initialScrollHour * hourHeight;
    }
  }, []);
  const getZonedDate = (date) => {
    return timezone ? dateFnsTz.toZonedTime(date, timezone) : date;
  };
  const zonedNow = getZonedDate(/* @__PURE__ */ new Date());
  const getTimezoneDisplay = (tz) => {
    const date = now;
    let displayTime = "";
    let acronym = "";
    if (!tz) {
      displayTime = dateFns.format(date, "HH:mm");
      try {
        acronym = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value || "";
      } catch (e) {
        acronym = "LOC";
      }
    } else {
      try {
        const zDate = dateFnsTz.toZonedTime(date, tz);
        displayTime = dateFns.format(zDate, "HH:mm");
        acronym = new Intl.DateTimeFormat("en-US", { timeZone: tz, timeZoneName: "short" }).formatToParts(date).find((part) => part.type === "timeZoneName")?.value || "";
      } catch (e) {
        displayTime = dateFns.format(date, "HH:mm");
        acronym = tz;
      }
    }
    return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col items-center justify-center leading-tight" }, /* @__PURE__ */ React15__namespace.default.createElement("span", null, displayTime), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-[10px] opacity-75" }, "(", acronym, ")"));
  };
  const timeFormat = getTimeFormat(language);
  const eventTimeFormat = getTimeFormatFull(language);
  const nowFormat = getTimeFormatFull(language);
  return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col h-full min-h-0 bg-background border-[0.5px] border-border/50 rounded-2xl overflow-hidden min-w-[800px] md:min-w-0 shadow-sm" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      ref: scrollContainerRef,
      className: "flex-1 min-h-0 overflow-y-auto scrollbar-hide relative bg-background scroll-smooth",
      style: { scrollbarGutter: "stable" }
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/20 via-background to-muted/20 z-20 sticky top-0 backdrop-blur-sm" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-none p-3 text-center text-xs font-semibold text-muted-foreground w-16 flex items-center justify-center border-r-[0.5px] border-border/30 bg-muted/10" }, getTimezoneDisplay(timezone)), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 grid grid-cols-7" }, weekDays.map((day, index) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: day.toISOString(), className: cn("py-3 px-2 text-center", index > 0 && "border-l-[0.5px] border-border/30") }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5" }, dateFns.format(day, "EEE", { locale })), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn(
      "w-9 h-9 flex items-center justify-center rounded-xl mx-auto text-sm font-semibold transition-all duration-200",
      dateFns.isToday(day) ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110" : "text-foreground hover:bg-accent/80"
    ) }, dateFns.format(day, "d", { locale })))))),
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: "flex min-w-full relative",
        style: { height: hours.length * hourHeight }
      },
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-none w-16 border-r-[0.5px] border-border/30 relative bg-muted/5" }, hours.map((hour) => /* @__PURE__ */ React15__namespace.default.createElement(
        "div",
        {
          key: hour,
          className: "relative w-full text-[11px] text-muted-foreground/80 text-right pr-3 font-medium tabular-nums box-border",
          style: { height: hourHeight }
        },
        /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "block -translate-y-1/2" }, hour !== 0 && dateFns.format((/* @__PURE__ */ new Date()).setHours(hour, 0, 0, 0), timeFormat, { locale }))
      ))),
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 grid grid-cols-7 relative" }, weekDays.map((day, dayIndex) => {
        const dayEvents = events.filter((e) => {
          const zonedStart = getZonedDate(e.start);
          return dateFns.isSameDay(zonedStart, day);
        });
        return /* @__PURE__ */ React15__namespace.default.createElement("div", { key: day.toISOString(), className: cn("relative h-full", dayIndex > 0 && "border-l-[0.5px] border-border/30") }, hours.map((hour) => {
          return /* @__PURE__ */ React15__namespace.default.createElement(
            "div",
            {
              key: hour,
              className: "w-full border-b-[0.5px] border-dashed border-border/20 box-border relative hover:bg-accent/5 transition-colors",
              style: { height: hourHeight }
            },
            [0, 15, 30, 45].map((minute) => {
              const cellDate = new Date(day);
              cellDate.setHours(hour, minute, 0, 0);
              const cellId = cellDate.toISOString();
              return /* @__PURE__ */ React15__namespace.default.createElement(
                DroppableCell,
                {
                  key: minute,
                  id: cellId,
                  date: cellDate,
                  className: "w-full absolute left-0 right-0 z-0 transition-colors",
                  style: {
                    height: "25%",
                    top: `${minute / 60 * 100}%`
                  }
                },
                /* @__PURE__ */ React15__namespace.default.createElement(
                  "div",
                  {
                    className: "w-full h-full bg-transparent cursor-pointer",
                    onClick: () => onTimeSlotClick?.(cellDate)
                  }
                )
              );
            })
          );
        }), dayEvents.map((event) => {
          const overlappingEvents = dayEvents.filter((e) => {
            if (e.id === event.id) return false;
            const s1 = getZonedDate(event.start).getTime();
            const e1 = getZonedDate(event.end).getTime();
            const s2 = getZonedDate(e.start).getTime();
            const e2 = getZonedDate(e.end).getTime();
            return s1 < e2 && e1 > s2;
          });
          const group = [event, ...overlappingEvents].sort(
            (a, b) => getZonedDate(a.start).getTime() - getZonedDate(b.start).getTime() || (a.id > b.id ? 1 : -1)
            // stable sort
          );
          const index = group.findIndex((e) => e.id === event.id);
          const count = group.length;
          const widthPercent = 100 / count;
          const leftPercent = index * widthPercent;
          const zonedEventStart = getZonedDate(event.start);
          const zonedEventEnd = getZonedDate(event.end);
          const startMinutes = zonedEventStart.getHours() * 60 + zonedEventStart.getMinutes();
          const durationMinutes = dateFns.differenceInMinutes(zonedEventEnd, zonedEventStart);
          const height = durationMinutes / 60 * hourHeight;
          const top = reverseTime ? (1440 - startMinutes - durationMinutes) / 60 * hourHeight : startMinutes / 60 * hourHeight;
          const isShortEvent = durationMinutes < 60;
          return /* @__PURE__ */ React15__namespace.default.createElement(
            DraggableEvent,
            {
              key: `${event.id}-${day.toISOString()}`,
              event,
              className: `absolute z-10 transition-all ${readonly ? "cursor-default" : ""}`,
              style: {
                top: `${top}px`,
                height: `${Math.max(height, 20)}px`,
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
                // Add minimal spacing between overlapping events
                paddingRight: count > 1 ? "2px" : "0"
              }
            },
            /* @__PURE__ */ React15__namespace.default.createElement(
              ResizableEvent,
              {
                readonly,
                event,
                hourHeight,
                onResize: onEventResize,
                className: "h-full",
                style: { height: "100%" }
              },
              /* @__PURE__ */ React15__namespace.default.createElement(
                "div",
                {
                  className: cn(
                    "rounded-md border shadow-sm transition-all hover:shadow-md group overflow-hidden relative",
                    "glass",
                    readonly ? "cursor-default" : "cursor-grab active:cursor-grabbing",
                    !event.color && "border-primary/20 bg-primary/10",
                    isShortEvent ? "px-1 flex items-center justify-center" : "p-2",
                    // Add active border for overlapped events to distinguish them
                    count > 1 && "border-l-4 border-l-primary/50"
                  ),
                  style: {
                    height: "100%",
                    backgroundColor: event.color ? `${event.color}15` : void 0,
                    borderColor: event.color ? `${event.color}40` : void 0,
                    borderLeftWidth: "3px",
                    borderLeftColor: event.color || "var(--primary)"
                  },
                  onClick: (e) => {
                    e.stopPropagation();
                    onEventClick?.(event);
                  },
                  title: count > 1 ? `${event.title} (${index + 1}/${count})` : void 0
                },
                /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col h-full overflow-hidden w-full" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn(
                  "font-semibold truncate text-foreground/90 leading-tight",
                  isShortEvent ? "text-xs text-center" : "text-xs"
                ) }, event.title), !isShortEvent && /* @__PURE__ */ React15__namespace.default.createElement(React15__namespace.default.Fragment, null, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-[10px] text-muted-foreground truncate mt-0.5 font-medium leading-tight" }, dateFns.format(zonedEventStart, eventTimeFormat, { locale }), " - ", dateFns.format(zonedEventEnd, eventTimeFormat, { locale })), event.description && height > 50 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-[10px] text-muted-foreground/80 truncate mt-1 leading-tight opacity-80" }, event.description)), count > 1 && !isShortEvent && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute top-1 right-1 bg-background/80 backdrop-blur-sm rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold text-muted-foreground border border-border shadow-sm" }, count))
              )
            )
          );
        }), dateFns.isToday(day) && /* @__PURE__ */ React15__namespace.default.createElement(
          "div",
          {
            className: "absolute left-0 right-0 z-20 pointer-events-none flex items-center",
            style: {
              top: reverseTime ? `${(1440 - (zonedNow.getHours() * 60 + zonedNow.getMinutes())) / 60 * hourHeight}px` : `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
            }
          },
          /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "h-[2px] w-full bg-gradient-to-r from-primary via-primary to-primary/50" }),
          /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute -left-1.5 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/40 ring-2 ring-background animate-pulse" })
        ));
      }))
    ),
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: "absolute left-0 w-16 pointer-events-none z-30 flex justify-end pr-2",
        style: {
          top: reverseTime ? `${(1440 - (zonedNow.getHours() * 60 + zonedNow.getMinutes())) / 60 * hourHeight + 80}px` : `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight + 80}px`
        }
      },
      /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-[10px] font-bold text-primary-foreground bg-primary px-1.5 py-0.5 rounded-md shadow-md -translate-y-1/2 backdrop-blur-none" }, dateFns.format(zonedNow, nowFormat, { locale }))
    )
  ));
};
var DayView = ({
  currentDate,
  events,
  onEventClick,
  onTimeSlotClick,
  onEventResize,
  timezone,
  locale,
  readonly,
  language = "tr",
  initialScrollHour = 8,
  reverseTime = false
}) => {
  const hours = reverseTime ? Array.from({ length: 24 }, (_, i) => 23 - i) : Array.from({ length: 24 }, (_, i) => i);
  const hourHeight = 80;
  const scrollContainerRef = React15__namespace.default.useRef(null);
  const [now, setNow] = React15__namespace.default.useState(/* @__PURE__ */ new Date());
  React15__namespace.default.useEffect(() => {
    const interval = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(interval);
  }, []);
  React15__namespace.default.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = reverseTime ? (23 - initialScrollHour) * hourHeight : initialScrollHour * hourHeight;
    }
  }, []);
  const getZonedDate = (date) => {
    return timezone ? dateFnsTz.toZonedTime(date, timezone) : date;
  };
  const zonedNow = getZonedDate(now);
  const dayEvents = events.filter((e) => {
    const zonedStart = getZonedDate(e.start);
    return dateFns.isSameDay(zonedStart, currentDate);
  });
  const timeFormat = getTimeFormat(language);
  const eventTimeFormat = getTimeFormatFull(language);
  const nowFormat = getTimeFormatFull(language);
  return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col h-full min-h-0 bg-background border-[0.5px] border-border/50 rounded-2xl overflow-hidden shadow-sm" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "px-6 py-4 border-b-[0.5px] border-border/50 bg-gradient-to-r from-muted/20 via-background to-muted/20 text-center shrink-0" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center justify-center gap-3" }, /* @__PURE__ */ React15__namespace.default.createElement("h2", { className: "text-xl font-semibold capitalize text-foreground" }, dateFns.format(currentDate, "EEEE, MMMM d, yyyy", { locale })), dateFns.isToday(currentDate) && /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs font-semibold bg-primary text-primary-foreground px-3 py-1 rounded-full shadow-md shadow-primary/20" }, "Today"))), /* @__PURE__ */ React15__namespace.default.createElement("div", { ref: scrollContainerRef, className: "flex-1 min-h-0 overflow-y-auto relative" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex relative", style: { height: hours.length * hourHeight } }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-20 bg-muted/5 border-r-[0.5px] border-border/30 relative" }, hours.map((hour) => /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      key: hour,
      className: "relative w-full",
      style: { height: hourHeight }
    },
    hour !== 0 && /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "absolute w-full text-center -top-3 left-1/2 -translate-x-1/2 text-[11px] text-muted-foreground/80 font-medium tabular-nums bg-background px-1.5 py-0.5 rounded-md" }, dateFns.format((/* @__PURE__ */ new Date()).setHours(hour, 0, 0, 0), timeFormat, { locale }))
  )), dateFns.isToday(currentDate) && /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      className: "absolute left-0 w-full pointer-events-none z-30 flex justify-end pr-2",
      style: {
        top: reverseTime ? `${(1440 - (zonedNow.getHours() * 60 + zonedNow.getMinutes())) / 60 * hourHeight}px` : `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
      }
    },
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-[10px] font-bold text-white bg-primary px-2 py-1 rounded-lg shadow-md shadow-primary/30 -translate-y-1/2" }, dateFns.format(zonedNow, nowFormat, { locale }))
  )), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 relative" }, hours.map((hour) => {
    return /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        key: hour,
        className: "border-b-[0.5px] border-dashed border-border/20 box-border relative hover:bg-accent/5 transition-colors",
        style: { height: hourHeight }
      },
      [0, 15, 30, 45].map((minute) => {
        const cellDate = new Date(currentDate);
        cellDate.setHours(hour, minute, 0, 0);
        const cellId = cellDate.toISOString();
        return /* @__PURE__ */ React15__namespace.default.createElement(
          DroppableCell,
          {
            key: minute,
            id: cellId,
            date: cellDate,
            className: "w-full absolute left-0 right-0 z-0 transition-colors",
            style: {
              height: "25%",
              top: `${minute / 60 * 100}%`
            }
          },
          /* @__PURE__ */ React15__namespace.default.createElement(
            "div",
            {
              className: "h-full w-full bg-transparent cursor-pointer",
              onClick: () => onTimeSlotClick?.(cellDate)
            }
          )
        );
      })
    );
  }), dayEvents.map((event) => {
    const overlappingEvents = dayEvents.filter((e) => {
      if (e.id === event.id) return false;
      const s1 = getZonedDate(event.start).getTime();
      const e1 = getZonedDate(event.end).getTime();
      const s2 = getZonedDate(e.start).getTime();
      const e2 = getZonedDate(e.end).getTime();
      return s1 < e2 && e1 > s2;
    });
    const group = [event, ...overlappingEvents].sort(
      (a, b) => getZonedDate(a.start).getTime() - getZonedDate(b.start).getTime() || (a.id > b.id ? 1 : -1)
    );
    const index = group.findIndex((e) => e.id === event.id);
    const count = group.length;
    const widthPercent = 100 / count;
    const leftPercent = index * widthPercent;
    const zonedStart = getZonedDate(event.start);
    const zonedEnd = getZonedDate(event.end);
    const startMinutes = zonedStart.getHours() * 60 + zonedStart.getMinutes();
    const durationMinutes = dateFns.differenceInMinutes(zonedEnd, zonedStart);
    const height = durationMinutes / 60 * hourHeight;
    const top = reverseTime ? (1440 - startMinutes - durationMinutes) / 60 * hourHeight : startMinutes / 60 * hourHeight;
    const isShortEvent = durationMinutes < 45;
    return /* @__PURE__ */ React15__namespace.default.createElement(
      DraggableEvent,
      {
        key: `${event.id}-${currentDate.toISOString()}`,
        event,
        className: `absolute z-10 transition-all ${readonly ? "cursor-default" : ""}`,
        style: {
          top: `${top}px`,
          height: `${Math.max(height, 28)}px`,
          left: `calc(${leftPercent}% + 4px)`,
          width: `calc(${widthPercent}% - 8px)`,
          paddingRight: count > 1 ? "2px" : "0"
        }
      },
      /* @__PURE__ */ React15__namespace.default.createElement(
        ResizableEvent,
        {
          readonly,
          event,
          hourHeight,
          onResize: onEventResize,
          className: "h-full",
          style: { height: "100%" }
        },
        /* @__PURE__ */ React15__namespace.default.createElement(
          "div",
          {
            className: cn(
              "h-full rounded-lg border-[0.5px] shadow-sm overflow-hidden transition-all hover:shadow-lg hover:z-20 group",
              "glass backdrop-blur-sm",
              readonly ? "cursor-default" : "cursor-grab active:cursor-grabbing",
              !event.color && "bg-primary/10 border-primary/20",
              isShortEvent ? "px-2 flex items-center" : "px-3 py-2",
              count > 1 && "border-l-4"
            ),
            style: {
              backgroundColor: event.color ? `${event.color}15` : void 0,
              borderColor: event.color ? `${event.color}30` : void 0,
              borderLeftColor: event.color || "var(--primary)",
              borderLeftWidth: count > 1 ? "4px" : "3px"
            },
            onClick: (e) => {
              e.stopPropagation();
              onEventClick?.(event);
            },
            title: count > 1 ? `${event.title} (${index + 1}/${count})` : void 0
          },
          /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col h-full overflow-hidden w-full" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn(
            "font-semibold truncate leading-tight",
            isShortEvent ? "text-xs" : "text-sm",
            event.color ? "text-foreground" : "text-foreground/90"
          ) }, event.title), !isShortEvent && /* @__PURE__ */ React15__namespace.default.createElement(React15__namespace.default.Fragment, null, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-xs text-muted-foreground mt-0.5 font-medium" }, dateFns.format(zonedStart, eventTimeFormat, { locale }), " - ", dateFns.format(zonedEnd, eventTimeFormat, { locale })), event.description && height > 60 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-xs text-muted-foreground/80 mt-1 line-clamp-2" }, event.description)), count > 1 && !isShortEvent && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute top-1.5 right-1.5 bg-background/90 backdrop-blur-sm rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold text-muted-foreground border border-border shadow-sm" }, count))
        )
      )
    );
  }), dateFns.isToday(currentDate) && /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      className: "absolute left-0 right-0 z-20 pointer-events-none flex items-center",
      style: {
        top: reverseTime ? `${(1440 - (zonedNow.getHours() * 60 + zonedNow.getMinutes())) / 60 * hourHeight}px` : `${(zonedNow.getHours() * 60 + zonedNow.getMinutes()) / 60 * hourHeight}px`
      }
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "h-[2px] w-full bg-gradient-to-r from-primary via-primary to-primary/50" }),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute -left-1.5 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/40 ring-2 ring-background animate-pulse" })
  )))));
};
var AgendaEmptyState = ({ onCreateEvent, translations }) => /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col items-center justify-center h-full min-h-[400px] py-12" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative mb-8" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 rounded-3xl border border-border/30" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-12 h-12 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center" }, /* @__PURE__ */ React15__namespace.default.createElement("svg", { className: "w-6 h-6 text-green-600 dark:text-green-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 }, /* @__PURE__ */ React15__namespace.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-left" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "font-medium text-foreground" }, "All caught up!"), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-sm text-muted-foreground" }, "No events scheduled"))))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-center max-w-sm" }, /* @__PURE__ */ React15__namespace.default.createElement("h3", { className: "text-lg font-semibold text-foreground mb-2" }, translations?.noUpcoming || "Your schedule is clear"), /* @__PURE__ */ React15__namespace.default.createElement("p", { className: "text-sm text-muted-foreground mb-6" }, "No upcoming events to show. Create a new event to start planning."), onCreateEvent && /* @__PURE__ */ React15__namespace.default.createElement(
  "button",
  {
    onClick: onCreateEvent,
    className: "inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-200"
  },
  /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Plus, { className: "w-4 h-4" }),
  translations?.createEvent || "Create Event"
)));
var formatDuration = (start, end) => {
  const minutes = dateFns.differenceInMinutes(end, start);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
};
var getDateLabel = (date, todayLabel, tomorrowLabel) => {
  if (dateFns.isToday(date)) return todayLabel;
  if (dateFns.isTomorrow(date)) return tomorrowLabel;
  return dateFns.format(date, "EEEE");
};
var AgendaView = ({
  currentDate,
  events,
  onEventClick,
  onCreateEvent,
  translations,
  language = "tr",
  renderEmptyState
}) => {
  const timeFmt = getTimeFormatFull(language);
  const groupedEvents = React15.useMemo(() => {
    const startDate = dateFns.startOfDay(currentDate);
    const groups = [];
    const sortedEvents = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
    for (let i = 0; i < 30; i++) {
      const day = dateFns.addDays(startDate, i);
      const dayEvents = sortedEvents.filter((event) => dateFns.isSameDay(event.start, day));
      if (dayEvents.length > 0) {
        groups.push({ date: day, events: dayEvents });
      }
    }
    return groups;
  }, [currentDate, events]);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };
  return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col h-full min-h-0 bg-background overflow-y-auto" }, groupedEvents.length === 0 ? renderEmptyState ? renderEmptyState({ view: "agenda", onCreateEvent }) : /* @__PURE__ */ React15__namespace.default.createElement(AgendaEmptyState, { onCreateEvent }) : /* @__PURE__ */ React15__namespace.default.createElement(
    framerMotion.motion.div,
    {
      className: "max-w-3xl mx-auto w-full pb-10 px-4 md:px-6",
      variants: container,
      initial: "hidden",
      animate: "show"
    },
    groupedEvents.map((group, groupIndex) => /* @__PURE__ */ React15__namespace.default.createElement(
      framerMotion.motion.div,
      {
        key: group.date.toISOString(),
        className: "relative",
        variants: item
      },
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "sticky top-0 bg-background/95 backdrop-blur-md py-4 z-10 border-b border-border/50" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn(
        "flex flex-col items-center justify-center w-16 h-16 rounded-2xl transition-all",
        dateFns.isToday(group.date) ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" : "bg-muted/50 text-foreground"
      ) }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-2xl font-bold leading-none" }, dateFns.format(group.date, "d")), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs font-medium uppercase tracking-wide opacity-80" }, dateFns.format(group.date, "MMM"))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: cn(
        "text-lg font-semibold",
        dateFns.isToday(group.date) && "text-primary"
      ) }, getDateLabel(group.date, translations?.today ?? "Today", translations?.tomorrow ?? "Tomorrow")), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm text-muted-foreground" }, group.events.length, " ", group.events.length !== 1 ? translations?.eventsCount ?? "events" : translations?.eventCount ?? "event")))),
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "py-4 space-y-3" }, group.events.map((event, eventIndex) => /* @__PURE__ */ React15__namespace.default.createElement(
        framerMotion.motion.div,
        {
          key: event.id,
          onClick: () => onEventClick?.(event),
          className: cn(
            "group relative flex gap-4 p-4 rounded-2xl border border-border/40",
            "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
            "transition-all duration-200 cursor-pointer",
            "bg-gradient-to-br from-card via-card to-card/80"
          ),
          whileHover: { scale: 1.01, y: -2 },
          transition: { duration: 0.2 }
        },
        /* @__PURE__ */ React15__namespace.default.createElement(
          "div",
          {
            className: "absolute left-0 top-3 bottom-3 w-1 rounded-full",
            style: { backgroundColor: event.color || "var(--primary)" }
          }
        ),
        /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col items-center min-w-[70px] pl-2" }, event.allDay ? /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs font-semibold text-muted-foreground bg-muted/80 px-2.5 py-1 rounded-full" }, translations?.allDay ?? "All Day")) : /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-base font-semibold text-foreground" }, dateFns.format(event.start, timeFmt)), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-px h-3 bg-border my-1" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs text-muted-foreground/70 font-medium" }, formatDuration(event.start, event.end)))),
        /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 min-w-0 space-y-2" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-start justify-between gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement("h4", { className: "text-base font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1" }, event.title), /* @__PURE__ */ React15__namespace.default.createElement(
          "div",
          {
            className: "w-3 h-3 rounded-full shrink-0 mt-1.5",
            style: { backgroundColor: event.color || "var(--primary)" }
          }
        )), event.description && /* @__PURE__ */ React15__namespace.default.createElement("p", { className: "text-sm text-muted-foreground line-clamp-2 leading-relaxed" }, event.description), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-wrap items-center gap-3 pt-1" }, !event.allDay && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Clock, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React15__namespace.default.createElement("span", null, dateFns.format(event.start, timeFmt), " - ", dateFns.format(event.end, timeFmt))), event.guests && event.guests.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Users, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React15__namespace.default.createElement("span", null, event.guests.length, " ", event.guests.length !== 1 ? translations?.guestsCount ?? "guests" : translations?.guestCount ?? "guest")), event.attachments && event.attachments.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Paperclip, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React15__namespace.default.createElement("span", null, event.attachments.length)), event.reminders && event.reminders.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Bell, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React15__namespace.default.createElement("span", null, event.reminders.length)))),
        /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity" }, /* @__PURE__ */ React15__namespace.default.createElement("svg", { className: "w-5 h-5 text-muted-foreground", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React15__namespace.default.createElement("path", { d: "M9 18l6-6-6-6" })))
      )))
    ))
  ));
};
var ResourceView = ({
  currentDate,
  events,
  resources,
  onEventClick,
  onTimeSlotClick,
  locale,
  language = "tr"
}) => {
  const containerRef = React15.useRef(null);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const hourWidth = 100;
  const timeFormat = getTimeFormat(language);
  const getEventStyle = (event) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const dayStart = dateFns.startOfDay(currentDate);
    const startMinutes = dateFns.differenceInMinutes(start, dayStart);
    const durationMinutes = dateFns.differenceInMinutes(end, start);
    const left = startMinutes / 60 * hourWidth;
    const width = durationMinutes / 60 * hourWidth;
    return {
      left: `${left}px`,
      width: `${Math.max(width, 4)}px`
      // Min width for visibility
    };
  };
  return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col h-full min-h-0 bg-background overflow-hidden" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex border-b border-border bg-muted/20" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-48 shrink-0 border-r border-border p-4 font-semibold text-sm bg-background sticky left-0 z-20" }, "Resources"), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex overflow-hidden" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex relative", style: { width: hours.length * hourWidth } }, hours.map((hour) => /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      key: hour,
      className: "border-r border-border/50 text-xs text-muted-foreground p-2 font-medium shrink-0",
      style: { width: hourWidth }
    },
    dateFns.format((/* @__PURE__ */ new Date()).setHours(hour, 0, 0, 0), timeFormat, { locale })
  ))))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 min-h-0 overflow-auto relative", ref: containerRef }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "min-w-fit" }, resources.map((resource) => {
    const resourceEvents = events.filter(
      (e) => e.resourceId === resource.id && dateFns.isSameDay(new Date(e.start), currentDate)
    );
    return /* @__PURE__ */ React15__namespace.default.createElement("div", { key: resource.id, className: "flex border-b border-border min-h-[100px]" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-48 shrink-0 border-r border-border p-4 bg-background sticky left-0 z-10 flex items-center gap-3" }, resource.avatar ? /* @__PURE__ */ React15__namespace.default.createElement("img", { src: resource.avatar, alt: resource.label, className: "w-8 h-8 rounded-full object-cover" }) : /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary" }, resource.label.substring(0, 2).toUpperCase()), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-medium" }, resource.label), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs text-muted-foreground" }, "ID: ", resource.id))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative flex", style: { width: hours.length * hourWidth } }, hours.map((hour) => /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        key: hour,
        className: "flex h-full shrink-0",
        style: { width: hourWidth }
      },
      [0, 15, 30, 45].map((minute) => {
        const slotDate = new Date(currentDate);
        slotDate.setHours(hour, minute, 0, 0);
        const slotId = `${resource.id}-${slotDate.toISOString()}`;
        return /* @__PURE__ */ React15__namespace.default.createElement(
          DroppableCell,
          {
            key: minute,
            id: slotId,
            date: slotDate,
            resourceId: resource.id,
            className: "h-full flex-1 border-r border-border/10 last:border-border/30 hover:bg-accent/10 transition-colors",
            onClick: () => {
              onTimeSlotClick?.(slotDate, resource.id);
            }
          }
        );
      })
    )), resourceEvents.map((event) => /* @__PURE__ */ React15__namespace.default.createElement(
      DraggableEvent,
      {
        key: event.id,
        event,
        onClick: (e) => {
          e.stopPropagation();
          onEventClick?.(event);
        },
        className: "absolute top-2 bottom-2 rounded-md px-2 py-1 text-xs font-medium border shadow-sm cursor-pointer overflow-hidden hover:brightness-95 transition-all z-10",
        style: {
          ...getEventStyle(event),
          backgroundColor: event.color || resource.color || "var(--primary)",
          borderColor: "rgba(0,0,0,0.1)",
          color: "#fff"
        }
      },
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "truncate" }, event.title)
    ))));
  }))));
};
var Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  hideHeader = false
}) => {
  const overlayRef = React15.useRef(null);
  React15.useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      ref: overlayRef,
      className: "absolute inset-0",
      onClick: onClose
    }
  ), /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      className: cn(
        "relative bg-background rounded-2xl shadow-2xl w-full max-w-md flex flex-col max-h-[70vh] sm:max-h-[80vh] animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 border border-border/50",
        className
      )
    },
    !hideHeader && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center justify-between px-6 py-4 border-b border-border/50 shrink-0 bg-gradient-to-r from-muted/20 to-background" }, /* @__PURE__ */ React15__namespace.default.createElement("h3", { className: "text-lg font-semibold text-foreground" }, title), /* @__PURE__ */ React15__namespace.default.createElement(
      Button,
      {
        variant: "ghost",
        size: "sm",
        onClick: onClose,
        className: "h-9 w-9 p-0 rounded-xl hover:bg-accent/80 transition-all duration-200"
      },
      /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.X, { className: "h-4 w-4" }),
      /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "sr-only" }, "Close")
    )),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn("overflow-y-auto flex-1", !hideHeader && "p-6") }, children)
  ));
};
var COLOR_PALETTE = [
  "#3b82f6",
  // Blue
  "#ef4444",
  // Red
  "#10b981",
  // Emerald
  "#f59e0b",
  // Amber
  "#8b5cf6",
  // Violet
  "#ec4899",
  // Pink
  "#06b6d4",
  // Cyan
  "#84cc16",
  // Lime
  "#f97316",
  // Orange
  "#6366f1"
  // Indigo
];
var getReminderOptions = (t) => [
  { value: 0, label: t.reminderAtTime },
  { value: 5, label: t.reminder5min },
  { value: 10, label: t.reminder10min },
  { value: 15, label: t.reminder15min },
  { value: 30, label: t.reminder30min },
  { value: 60, label: t.reminder1hour },
  { value: 120, label: t.reminder2hours },
  { value: 1440, label: t.reminder1day },
  { value: 2880, label: t.reminder2days },
  { value: 10080, label: t.reminder1week }
];
var EventModal = ({
  isOpen,
  onClose,
  event,
  initialDate,
  onSave,
  onDelete,
  calendars,
  eventTypes,
  translations,
  language = "tr"
}) => {
  const timeFmt = getTimeFormatFull(language);
  const [mode, setMode] = React15.useState("create");
  const [activeTab, setActiveTab] = React15.useState("details");
  const [formData, setFormData] = React15.useState({
    title: "",
    description: "",
    location: "",
    start: /* @__PURE__ */ new Date(),
    end: /* @__PURE__ */ new Date(),
    allDay: false,
    color: "#3b82f6",
    calendarId: calendars?.[0]?.id,
    type: void 0,
    recurrence: void 0,
    attachments: [],
    reminders: [{ id: "1", type: "notification", time: 30, label: "30 minutes before" }]
  });
  const [isCalendarDropdownOpen, setIsCalendarDropdownOpen] = React15.useState(false);
  const [isColorPickerOpen, setIsColorPickerOpen] = React15.useState(false);
  const [isReminderDropdownOpen, setIsReminderDropdownOpen] = React15.useState(false);
  const [isGuestsDropdownOpen, setIsGuestsDropdownOpen] = React15.useState(false);
  const fakeGuests = [
    "alice@example.com",
    "bob@example.com",
    "charlie@example.com",
    "diana@example.com",
    "evan@example.com"
  ];
  React15.useRef(null);
  const [selectedGuests, setSelectedGuests] = React15.useState([]);
  React15.useEffect(() => {
    if (isOpen) {
      if (event) {
        setMode("view");
        setFormData({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
          attachments: event.attachments || [],
          reminders: event.reminders || [{ id: "1", type: "notification", time: 30, label: "30 minutes before" }]
        });
        setSelectedGuests(event.guests || []);
      } else {
        setMode("create");
        const start = initialDate || /* @__PURE__ */ new Date();
        const end = new Date(start);
        end.setHours(start.getHours() + 1);
        setFormData({
          title: "",
          description: "",
          location: "",
          start,
          end,
          allDay: false,
          color: "#3b82f6",
          calendarId: calendars?.[0]?.id,
          attachments: [],
          reminders: [{ id: "1", type: "notification", time: 30, label: "30 minutes before" }]
        });
        setSelectedGuests([]);
        setActiveTab("details");
      }
    }
  }, [isOpen, event, initialDate, calendars]);
  const toggleGuest = (email) => {
    setSelectedGuests((prev) => {
      const newGuests = prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email];
      setFormData((curr) => ({ ...curr, guests: newGuests }));
      return newGuests;
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let eventColor = formData.color;
    if (formData.calendarId && calendars) {
      const selectedCal = calendars.find((c) => c.id === formData.calendarId);
      if (selectedCal?.color) {
        eventColor = selectedCal.color;
      }
    }
    onSave({
      ...formData,
      color: eventColor,
      id: event?.id
    });
    onClose();
  };
  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id);
      onClose();
    }
  };
  const formatDateForInput = (date) => {
    if (!date) return "";
    return dateFns.format(date, "yyyy-MM-dd'T'HH:mm");
  };
  const handleDateChange = (field, value) => {
    const date = new Date(value);
    if (isNaN(date.getTime())) return;
    if (field === "start") {
      const duration = formData.end.getTime() - formData.start.getTime();
      setFormData((prev) => ({
        ...prev,
        start: date,
        end: new Date(date.getTime() + duration)
      }));
    } else {
      if (date < formData.start) {
        setFormData((prev) => ({ ...prev, start: date, end: date }));
      } else {
        setFormData((prev) => ({ ...prev, end: date }));
      }
    }
  };
  const addReminder = (minutes, label) => {
    const newReminder = {
      id: Math.random().toString(36).substr(2, 9),
      type: "notification",
      time: minutes,
      label
    };
    setFormData((prev) => ({
      ...prev,
      reminders: [...prev.reminders || [], newReminder]
    }));
    setIsReminderDropdownOpen(false);
  };
  const removeReminder = (id) => {
    setFormData((prev) => ({
      ...prev,
      reminders: prev.reminders?.filter((r) => r.id !== id)
    }));
  };
  const handleDownload = (attachment) => {
    const element = document.createElement("a");
    const file = new Blob(["Dummy content for " + attachment.name], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = attachment.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  const getDurationText = () => {
    if (!formData.start || !formData.end) return "";
    const mins = dateFns.differenceInMinutes(formData.end, formData.start);
    if (mins < 60) return `${mins} min`;
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    if (remainingMins === 0) return `${hours} hr`;
    return `${hours} hr ${remainingMins} min`;
  };
  const renderViewMode = () => /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col bg-background overflow-hidden w-full max-h-[90vh]" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      className: "relative px-6 pt-6 pb-8",
      style: {
        background: `linear-gradient(135deg, ${event?.color || "#3b82f6"}15 0%, transparent 100%)`
      }
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center justify-between mb-6" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: "w-3 h-3 rounded-full",
        style: { backgroundColor: event?.color || "#3b82f6" }
      }
    ), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider" }, calendars?.find((c) => c.id === event?.calendarId)?.label || "Event")), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-1" }, /* @__PURE__ */ React15__namespace.default.createElement(
      "button",
      {
        onClick: () => setMode("edit"),
        className: "p-2 hover:bg-background/80 rounded-lg transition-all text-muted-foreground hover:text-foreground",
        title: "Edit"
      },
      /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Edit2, { className: "w-4 h-4" })
    ), /* @__PURE__ */ React15__namespace.default.createElement(
      "button",
      {
        onClick: handleDelete,
        className: "p-2 hover:bg-destructive/10 rounded-lg transition-all text-muted-foreground hover:text-destructive",
        title: "Delete"
      },
      /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Trash2, { className: "w-4 h-4" })
    ), /* @__PURE__ */ React15__namespace.default.createElement(
      "button",
      {
        onClick: onClose,
        className: "p-2 hover:bg-background/80 rounded-lg transition-all text-muted-foreground hover:text-foreground",
        title: "Close"
      },
      /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.X, { className: "w-4 h-4" })
    ))),
    /* @__PURE__ */ React15__namespace.default.createElement("h1", { className: "text-2xl font-bold text-foreground mb-3 leading-tight" }, event?.title || translations.noTitle),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-3 text-sm" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2 px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded-lg border border-border/30" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Calendar, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "font-medium" }, event?.start && dateFns.format(new Date(event.start), "EEE, MMM d"))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2 px-3 py-1.5 bg-background/60 backdrop-blur-sm rounded-lg border border-border/30" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Clock, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "font-medium" }, event?.start && dateFns.format(new Date(event.start), timeFmt), " \u2013 ", event?.end && dateFns.format(new Date(event.end), timeFmt))))
  ), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "px-6 pb-6 space-y-4 overflow-y-auto flex-1" }, event?.location && /* @__PURE__ */ React15__namespace.default.createElement(
    framerMotion.motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      className: "flex items-start gap-3 p-4 rounded-2xl bg-muted/30 border border-border/30 group hover:bg-muted/50 transition-all cursor-pointer"
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "p-2 bg-primary/10 rounded-xl" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.MapPin, { className: "w-5 h-5 text-primary" })),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1" }, /* @__PURE__ */ React15__namespace.default.createElement("p", { className: "text-sm font-medium text-foreground" }, event.location), /* @__PURE__ */ React15__namespace.default.createElement("p", { className: "text-xs text-muted-foreground mt-0.5" }, translations.clickToOpenInMaps)),
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ExternalLink, { className: "w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" })
  ), event?.guests && event.guests.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement(
    framerMotion.motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.05 },
      className: "space-y-3"
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Users, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-medium text-foreground" }, event.guests.length, " ", event.guests.length > 1 ? translations.guestsCount : translations.guestCount))),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-wrap gap-2" }, event.guests.map((email, index) => /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        key: index,
        className: "flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 transition-all cursor-pointer group"
      },
      /* @__PURE__ */ React15__namespace.default.createElement(
        "div",
        {
          className: "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white",
          style: { backgroundColor: `hsl(${index * 60}, 70%, 50%)` }
        },
        email[0].toUpperCase()
      ),
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React15__namespace.default.createElement("p", { className: "text-sm font-medium text-foreground" }, email.split("@")[0]), /* @__PURE__ */ React15__namespace.default.createElement("p", { className: "text-xs text-muted-foreground truncate" }, email))
    )))
  ), event?.reminders && event.reminders.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement(
    framerMotion.motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.1 },
      className: "flex items-center gap-3"
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "p-2 bg-amber-500/10 rounded-xl" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Bell, { className: "w-4 h-4 text-amber-500" })),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-wrap gap-2" }, event.reminders.map((reminder) => /* @__PURE__ */ React15__namespace.default.createElement(
      "span",
      {
        key: reminder.id,
        className: "text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400"
      },
      reminder.label || `${reminder.time} min before`
    )))
  ), event?.description && /* @__PURE__ */ React15__namespace.default.createElement(
    framerMotion.motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.15 },
      className: "space-y-2"
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.AlignLeft, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-medium text-foreground" }, translations.notes)),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed pl-6 p-3 rounded-xl bg-muted/20 border border-border/30" }, event.description)
  ), event?.attachments && event.attachments.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement(
    framerMotion.motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.2 },
      className: "space-y-2"
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Paperclip, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-medium text-foreground" }, translations.attachments)),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "grid gap-2" }, event.attachments.map((att) => /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        key: att.id,
        onClick: () => handleDownload(att),
        className: "flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer group"
      },
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "p-2 bg-primary/10 rounded-lg" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.File, { className: "w-4 h-4 text-primary" })),
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React15__namespace.default.createElement("p", { className: "text-sm font-medium text-foreground truncate" }, att.name), /* @__PURE__ */ React15__namespace.default.createElement("p", { className: "text-xs text-muted-foreground" }, att.size)),
      /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Download, { className: "w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" })
    )))
  )));
  const renderEditMode = () => /* @__PURE__ */ React15__namespace.default.createElement("form", { onSubmit: handleSubmit, className: "flex flex-col bg-background overflow-hidden w-full max-h-[85vh]" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border/50 shrink-0" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setIsColorPickerOpen(!isColorPickerOpen),
      className: "relative p-1"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: "w-5 h-5 rounded-full cursor-pointer hover:scale-110 transition-transform",
        style: {
          backgroundColor: formData.color,
          boxShadow: `0 0 0 2px var(--background), 0 0 0 4px ${formData.color}60`
        }
      }
    ),
    isColorPickerOpen && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute top-full left-0 mt-2 p-2 bg-background border border-border rounded-xl shadow-xl z-50 flex flex-wrap gap-1.5 w-[180px]" }, COLOR_PALETTE.map((color) => /* @__PURE__ */ React15__namespace.default.createElement(
      "button",
      {
        key: color,
        type: "button",
        onClick: () => {
          setFormData((prev) => ({ ...prev, color }));
          setIsColorPickerOpen(false);
        },
        className: cn(
          "w-7 h-7 rounded-full transition-all hover:scale-110",
          formData.color === color && "ring-2 ring-offset-2 ring-offset-background ring-current"
        ),
        style: { backgroundColor: color, color }
      }
    )))
  ), /* @__PURE__ */ React15__namespace.default.createElement("h2", { className: "text-lg font-semibold text-foreground" }, mode === "edit" ? translations.editEvent : translations.newEvent)), /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      type: "button",
      onClick: onClose,
      className: "p-2 hover:bg-accent rounded-xl transition-all text-muted-foreground hover:text-foreground"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.X, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 overflow-y-auto" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "px-5 py-4 space-y-5" }, /* @__PURE__ */ React15__namespace.default.createElement("div", null, /* @__PURE__ */ React15__namespace.default.createElement(
    "input",
    {
      type: "text",
      required: true,
      autoFocus: true,
      className: "w-full text-xl font-semibold border-0 border-b-2 border-transparent focus:border-primary bg-transparent px-0 py-2 placeholder-muted-foreground/50 transition-all text-foreground focus:outline-none",
      value: formData.title,
      onChange: (e) => setFormData({ ...formData, title: e.target.value }),
      placeholder: translations.addTitle
    }
  )), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-3 p-4 rounded-2xl bg-muted/20 border border-border/30" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "p-2 bg-primary/10 rounded-xl shrink-0" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Clock, { className: "w-5 h-5 text-primary" })), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 grid grid-cols-2 gap-3" }, /* @__PURE__ */ React15__namespace.default.createElement("div", null, /* @__PURE__ */ React15__namespace.default.createElement("label", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block" }, translations.start), /* @__PURE__ */ React15__namespace.default.createElement(
    "input",
    {
      type: "datetime-local",
      className: "w-full bg-background border border-border/50 rounded-xl px-3 py-2 text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
      value: formatDateForInput(formData.start),
      onChange: (e) => handleDateChange("start", e.target.value)
    }
  )), /* @__PURE__ */ React15__namespace.default.createElement("div", null, /* @__PURE__ */ React15__namespace.default.createElement("label", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1 block" }, translations.end), /* @__PURE__ */ React15__namespace.default.createElement(
    "input",
    {
      type: "datetime-local",
      className: "w-full bg-background border border-border/50 rounded-xl px-3 py-2 text-sm font-medium text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
      value: formatDateForInput(formData.end),
      onChange: (e) => handleDateChange("end", e.target.value)
    }
  )))), getDurationText() && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex justify-center" }, /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary" }, getDurationText())), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Bell, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-medium text-foreground" }, translations.reminders)), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setIsReminderDropdownOpen(!isReminderDropdownOpen),
      className: "flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Plus, { className: "w-3.5 h-3.5" }),
    translations.addReminder
  ), isReminderDropdownOpen && /* @__PURE__ */ React15__namespace.default.createElement(React15__namespace.default.Fragment, null, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "fixed inset-0 z-40", onClick: () => setIsReminderDropdownOpen(false) }), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-xl shadow-xl z-50 py-1 max-h-60 overflow-y-auto" }, getReminderOptions(translations).map((option) => /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      key: option.value,
      type: "button",
      onClick: () => addReminder(option.value, option.label),
      className: "w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
    },
    option.label
  )))))), formData.reminders && formData.reminders.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-wrap gap-2" }, formData.reminders.map((reminder) => /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      key: reminder.id,
      className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.BellRing, { className: "w-3.5 h-3.5 text-amber-500" }),
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs font-medium text-amber-600 dark:text-amber-400" }, reminder.label),
    /* @__PURE__ */ React15__namespace.default.createElement(
      "button",
      {
        type: "button",
        onClick: () => removeReminder(reminder.id),
        className: "p-0.5 hover:bg-amber-500/20 rounded-full transition-colors"
      },
      /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.X, { className: "w-3 h-3 text-amber-500" })
    )
  )))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Users, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-medium text-foreground" }, translations.guests)), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setIsGuestsDropdownOpen(!isGuestsDropdownOpen),
      className: "w-full flex items-center justify-between px-4 py-3 bg-muted/20 border border-border/30 rounded-xl text-sm text-left hover:bg-muted/30 transition-all"
    },
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: selectedGuests.length > 0 ? "text-foreground font-medium" : "text-muted-foreground" }, selectedGuests.length > 0 ? `${selectedGuests.length} ${selectedGuests.length > 1 ? translations.guestsAdded : translations.guestAdded}` : translations.addGuests),
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronDown, { className: cn("w-4 h-4 text-muted-foreground transition-transform", isGuestsDropdownOpen && "rotate-180") })
  ), isGuestsDropdownOpen && /* @__PURE__ */ React15__namespace.default.createElement(React15__namespace.default.Fragment, null, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "fixed inset-0 z-40", onClick: () => setIsGuestsDropdownOpen(false) }), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute z-50 w-full mt-2 bg-background border border-border rounded-xl shadow-xl max-h-48 overflow-y-auto" }, fakeGuests.map((email) => /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      key: email,
      className: "px-4 py-3 hover:bg-accent cursor-pointer flex items-center gap-3 transition-colors",
      onClick: () => toggleGuest(email)
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn(
      "w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all",
      selectedGuests.includes(email) ? "bg-primary border-primary" : "border-border"
    ) }, selectedGuests.includes(email) && /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Check, { className: "w-3 h-3 text-primary-foreground" })),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: "w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold text-white",
        style: { backgroundColor: `hsl(${fakeGuests.indexOf(email) * 60}, 70%, 50%)` }
      },
      email[0].toUpperCase()
    ), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm" }, email))
  ))))), selectedGuests.length > 0 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-wrap gap-2 mt-2" }, selectedGuests.map((email) => /* @__PURE__ */ React15__namespace.default.createElement(
    "div",
    {
      key: email,
      className: "flex items-center gap-2 pl-1 pr-2 py-1 bg-muted/30 border border-border/30 rounded-full"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white",
        style: { backgroundColor: `hsl(${fakeGuests.indexOf(email) * 60}, 70%, 50%)` }
      },
      email[0].toUpperCase()
    ),
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-xs font-medium text-foreground" }, email.split("@")[0]),
    /* @__PURE__ */ React15__namespace.default.createElement(
      "button",
      {
        type: "button",
        onClick: () => toggleGuest(email),
        className: "p-0.5 hover:bg-destructive/10 rounded-full transition-colors"
      },
      /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.X, { className: "w-3 h-3 text-muted-foreground" })
    )
  )))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.MapPin, { className: "w-5 h-5 text-muted-foreground shrink-0" }), /* @__PURE__ */ React15__namespace.default.createElement(
    "input",
    {
      type: "text",
      className: "flex-1 bg-transparent text-sm text-foreground placeholder-muted-foreground focus:outline-none",
      placeholder: translations.addLocation,
      value: formData.location || "",
      onChange: (e) => setFormData({ ...formData, location: e.target.value })
    }
  )), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.AlignLeft, { className: "w-4 h-4 text-muted-foreground" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-medium text-foreground" }, translations.notes)), /* @__PURE__ */ React15__namespace.default.createElement(
    "textarea",
    {
      className: "w-full bg-muted/20 border border-border/30 rounded-xl px-4 py-3 text-sm min-h-[100px] resize-none text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all",
      placeholder: translations.addDescription,
      value: formData.description || "",
      onChange: (e) => setFormData({ ...formData, description: e.target.value })
    }
  )), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/30" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Repeat, { className: "w-5 h-5 text-muted-foreground shrink-0" }), /* @__PURE__ */ React15__namespace.default.createElement(
    "select",
    {
      className: "flex-1 bg-transparent text-sm text-foreground focus:outline-none cursor-pointer",
      value: formData.recurrence?.freq || "",
      onChange: (e) => {
        if (e.target.value === "") {
          setFormData({ ...formData, recurrence: void 0 });
        } else {
          setFormData({
            ...formData,
            recurrence: {
              freq: e.target.value,
              interval: 1
            }
          });
        }
      }
    },
    /* @__PURE__ */ React15__namespace.default.createElement("option", { value: "" }, translations.doesNotRepeat),
    /* @__PURE__ */ React15__namespace.default.createElement("option", { value: "DAILY" }, translations.daily),
    /* @__PURE__ */ React15__namespace.default.createElement("option", { value: "WEEKLY" }, translations.weekly),
    /* @__PURE__ */ React15__namespace.default.createElement("option", { value: "MONTHLY" }, translations.monthly),
    /* @__PURE__ */ React15__namespace.default.createElement("option", { value: "YEARLY" }, translations.yearly)
  )), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border/30" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Tag, { className: "w-5 h-5 text-muted-foreground" }), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm text-foreground" }, translations.calendar)), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "relative" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setIsCalendarDropdownOpen(!isCalendarDropdownOpen),
      className: "flex items-center gap-2 px-3 py-1.5 bg-background border border-border/50 rounded-lg text-sm hover:bg-accent/50 transition-all"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: "w-3 h-3 rounded-full",
        style: { backgroundColor: calendars?.find((c) => c.id === formData.calendarId)?.color || "#3b82f6" }
      }
    ),
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "font-medium" }, calendars?.find((c) => c.id === formData.calendarId)?.label || "Select"),
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.ChevronDown, { className: "w-3.5 h-3.5 text-muted-foreground" })
  ), isCalendarDropdownOpen && /* @__PURE__ */ React15__namespace.default.createElement(React15__namespace.default.Fragment, null, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "fixed inset-0 z-40", onClick: () => setIsCalendarDropdownOpen(false) }), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute right-0 bottom-full mb-2 w-48 bg-background border border-border rounded-xl shadow-xl z-50 py-1" }, calendars?.map((cal) => /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      key: cal.id,
      type: "button",
      className: "w-full flex items-center gap-3 px-3 py-2 hover:bg-accent transition-colors text-left",
      onClick: () => {
        setFormData({
          ...formData,
          calendarId: cal.id,
          color: cal.color || formData.color
        });
        setIsCalendarDropdownOpen(false);
      }
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-3 h-3 rounded-full", style: { backgroundColor: cal.color } }),
    /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "flex-1 text-sm" }, cal.label),
    formData.calendarId === cal.id && /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Check, { className: "w-4 h-4 text-primary" })
  )))))))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "px-5 py-4 border-t border-border/50 flex items-center justify-between bg-muted/10 shrink-0" }, mode === "edit" && /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      type: "button",
      onClick: handleDelete,
      className: "flex items-center gap-2 px-4 py-2 text-destructive hover:bg-destructive/10 rounded-xl transition-all text-sm font-medium"
    },
    /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Trash2, { className: "w-4 h-4" }),
    translations.delete
  ), mode === "create" && /* @__PURE__ */ React15__namespace.default.createElement("div", null), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      type: "button",
      onClick: onClose,
      className: "px-4 py-2.5 text-muted-foreground hover:text-foreground font-medium text-sm rounded-xl transition-all hover:bg-accent"
    },
    translations.cancel
  ), /* @__PURE__ */ React15__namespace.default.createElement(
    "button",
    {
      type: "submit",
      className: "px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm rounded-xl shadow-md transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
    },
    mode === "edit" ? translations.saveChanges : translations.createEvent
  ))));
  return /* @__PURE__ */ React15__namespace.default.createElement(Modal, { isOpen, onClose, hideHeader: true, className: "p-0 overflow-hidden max-w-lg rounded-2xl shadow-2xl" }, /* @__PURE__ */ React15__namespace.default.createElement(framerMotion.AnimatePresence, { mode: "wait" }, mode === "view" && event ? /* @__PURE__ */ React15__namespace.default.createElement(
    framerMotion.motion.div,
    {
      key: "view",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 }
    },
    renderViewMode()
  ) : /* @__PURE__ */ React15__namespace.default.createElement(
    framerMotion.motion.div,
    {
      key: "edit",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 }
    },
    renderEditMode()
  )));
};
var Skeleton = ({ className, style }) => /* @__PURE__ */ React15__namespace.default.createElement("div", { className: cn("animate-pulse bg-muted/40 rounded", className), style });
var MonthViewSkeleton = () => /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "h-full bg-background border border-border/50 rounded-2xl overflow-hidden" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "grid grid-cols-7 border-b border-border/50 bg-muted/10" }, Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: i, className: "py-3 px-2 text-center border-r border-border/30 last:border-r-0" }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-4 w-8 mx-auto" })))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "grid grid-cols-7 flex-1" }, Array.from({ length: 35 }).map((_, i) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: i, className: "min-h-[120px] border-r border-b border-border/30 p-2" }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-4 w-6 mb-2" }), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "space-y-1" }, Math.random() > 0.5 && /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-5 w-full rounded-md" }), Math.random() > 0.7 && /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-5 w-3/4 rounded-md" }))))));
var WeekViewSkeleton = () => /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "h-full bg-background border border-border/50 rounded-2xl overflow-hidden" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex border-b border-border/50 bg-muted/10" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-16 p-3 border-r border-border/30" }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-8 w-10 mx-auto" })), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 grid grid-cols-7" }, Array.from({ length: 7 }).map((_, i) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: i, className: "py-3 px-2 text-center border-r border-border/30 last:border-r-0" }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-3 w-8 mx-auto mb-1" }), /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-8 w-8 mx-auto rounded-xl" }))))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-1", style: { height: "600px" } }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-16 border-r border-border/30" }, Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: i, className: "h-[60px] relative" }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-4 w-10 absolute right-2 -translate-y-1/2" })))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 grid grid-cols-7 relative" }, Array.from({ length: 7 }).map((_, colIdx) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: colIdx, className: "relative border-r border-border/30 last:border-r-0" }, Array.from({ length: 10 }).map((_2, rowIdx) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: rowIdx, className: "h-[60px] border-b border-dashed border-border/20" })), Math.random() > 0.3 && /* @__PURE__ */ React15__namespace.default.createElement(
  Skeleton,
  {
    className: "absolute rounded-md",
    style: {
      top: `${Math.floor(Math.random() * 400)}px`,
      left: "4px",
      right: "4px",
      height: `${60 + Math.floor(Math.random() * 120)}px`
    }
  }
))))));
var DayViewSkeleton = () => /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "h-full bg-background border border-border/50 rounded-2xl overflow-hidden" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "px-6 py-4 border-b border-border/50 bg-muted/10 text-center" }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-7 w-64 mx-auto" })), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-1", style: { height: "600px" } }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "w-20 border-r border-border/30 bg-muted/5" }, Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: i, className: "h-[80px] relative" }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-4 w-12 absolute left-1/2 -translate-x-1/2 -translate-y-1/2" })))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 relative" }, Array.from({ length: 10 }).map((_, i) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: i, className: "h-[80px] border-b border-dashed border-border/20" })), /* @__PURE__ */ React15__namespace.default.createElement(
  Skeleton,
  {
    className: "absolute rounded-lg left-4 right-4",
    style: { top: "160px", height: "120px" }
  }
), /* @__PURE__ */ React15__namespace.default.createElement(
  Skeleton,
  {
    className: "absolute rounded-lg left-4 right-4",
    style: { top: "400px", height: "80px" }
  }
))));
var AgendaViewSkeleton = () => /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "h-full bg-background border border-border/50 rounded-2xl overflow-hidden p-6" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "space-y-6" }, Array.from({ length: 4 }).map((_, dayIdx) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: dayIdx }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-5 w-40 mb-4" }), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "space-y-3" }, Array.from({ length: 2 + Math.floor(Math.random() * 3) }).map((_2, eventIdx) => /* @__PURE__ */ React15__namespace.default.createElement("div", { key: eventIdx, className: "flex items-center gap-4 p-3 rounded-xl bg-muted/10" }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-10 w-10 rounded-lg" }), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 space-y-2" }, /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-4 w-3/4" }), /* @__PURE__ */ React15__namespace.default.createElement(Skeleton, { className: "h-3 w-1/2" })))))))));
var EventContextMenu = ({
  event,
  position,
  onClose,
  onEdit,
  onDelete,
  onDuplicate,
  customActions = [],
  translations
}) => {
  const menuRef = React15.useRef(null);
  React15.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (position) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [position, onClose]);
  React15.useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    if (position) {
      setTimeout(() => {
        document.addEventListener("mousedown", handleClickOutside);
      }, 0);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [position, onClose]);
  if (!event || !position) return null;
  const actions = [
    ...onEdit ? [{
      id: "edit",
      label: translations?.edit || "Edit",
      icon: /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Edit3, { className: "w-4 h-4" }),
      onClick: () => {
        onEdit(event);
        onClose();
      }
    }] : [],
    ...onDuplicate ? [{
      id: "duplicate",
      label: translations?.duplicate || "Duplicate",
      icon: /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Copy, { className: "w-4 h-4" }),
      onClick: () => {
        onDuplicate(event);
        onClose();
      }
    }] : [],
    ...customActions,
    ...onDelete ? [{
      id: "delete",
      label: translations?.delete || "Delete",
      icon: /* @__PURE__ */ React15__namespace.default.createElement(lucideReact.Trash2, { className: "w-4 h-4" }),
      onClick: () => {
        onDelete(event.id);
        onClose();
      },
      variant: "danger"
    }] : []
  ];
  const adjustedPosition = {
    x: Math.min(position.x, window.innerWidth - 200),
    y: Math.min(position.y, window.innerHeight - (actions.length * 44 + 80))
  };
  return /* @__PURE__ */ React15__namespace.default.createElement(framerMotion.AnimatePresence, null, /* @__PURE__ */ React15__namespace.default.createElement(
    framerMotion.motion.div,
    {
      ref: menuRef,
      initial: { opacity: 0, scale: 0.95, y: -5 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: -5 },
      transition: { duration: 0.15, ease: "easeOut" },
      className: "fixed z-[100] min-w-[180px] bg-background border-[0.5px] border-border rounded-xl shadow-xl overflow-hidden",
      style: {
        left: adjustedPosition.x,
        top: adjustedPosition.y
      }
    },
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "px-3 py-2 border-b-[0.5px] border-border bg-muted/30" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex items-center gap-2" }, /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        className: "w-2.5 h-2.5 rounded-full shrink-0",
        style: { backgroundColor: event.color || "var(--primary)" }
      }
    ), /* @__PURE__ */ React15__namespace.default.createElement("span", { className: "text-sm font-medium truncate text-foreground" }, event.title))),
    /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "py-1" }, actions.map((action, index) => /* @__PURE__ */ React15__namespace.default.createElement(React15__namespace.default.Fragment, { key: action.id }, index > 0 && action.variant === "danger" && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "h-px bg-border my-1" }), /* @__PURE__ */ React15__namespace.default.createElement(
      "button",
      {
        onClick: action.onClick,
        disabled: action.disabled,
        className: cn(
          "w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors",
          action.disabled && "opacity-50 cursor-not-allowed",
          action.variant === "danger" ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20" : "text-foreground hover:bg-accent"
        )
      },
      action.icon,
      /* @__PURE__ */ React15__namespace.default.createElement("span", null, action.label)
    ))))
  ));
};
var useEventContextMenu = () => {
  const [contextMenu, setContextMenu] = React15.useState({ event: null, position: null });
  const openContextMenu = React15.useCallback((event, e) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({
      event,
      position: { x: e.clientX, y: e.clientY }
    });
  }, []);
  const closeContextMenu = React15.useCallback(() => {
    setContextMenu({ event: null, position: null });
  }, []);
  return {
    contextMenuEvent: contextMenu.event,
    contextMenuPosition: contextMenu.position,
    openContextMenu,
    closeContextMenu
  };
};

// src/lib/theme.ts
function colorToHsl(color) {
  let r = 0, g = 0, b = 0;
  if (color.startsWith("#") || /^[0-9a-fA-F]{3,6}$/.test(color)) {
    let c = color.replace(/^#/, "");
    if (c.length === 3) {
      c = c.split("").map((char) => char + char).join("");
    }
    if (c.length !== 6) return null;
    r = parseInt(c.substring(0, 2), 16) / 255;
    g = parseInt(c.substring(2, 4), 16) / 255;
    b = parseInt(c.substring(4, 6), 16) / 255;
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (!match || match.length < 3) return null;
    r = parseInt(match[0]) / 255;
    g = parseInt(match[1]) / 255;
    b = parseInt(match[2]) / 255;
  } else {
    return null;
  }
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  const hDeg = Math.round(h * 360);
  const sPct = Math.round(s * 100);
  const lPct = Math.round(l * 100);
  return `${hDeg} ${sPct}% ${lPct}%`;
}
function getThemeStyles(theme) {
  if (!theme) return {};
  const styles = {};
  if (theme.colors) {
    const mappings = {
      "--background": "background",
      "--foreground": "foreground",
      "--primary": "primary",
      "--secondary": "secondary",
      "--muted": "muted",
      "--accent": "accent",
      "--border": "border"
    };
    Object.entries(mappings).forEach(([cssVar, themeKey]) => {
      const colorValue = theme.colors?.[themeKey];
      if (colorValue) {
        const hsl = colorToHsl(colorValue);
        if (hsl) {
          styles[cssVar] = hsl;
        }
      }
    });
  }
  if (theme.borderRadius) {
    styles["--radius"] = theme.borderRadius;
  }
  if (theme.fontFamily) {
    styles["fontFamily"] = theme.fontFamily;
  }
  return styles;
}
var useCalendarLogic = ({
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
}) => {
  const [internalView, setInternalView] = React15.useState("week");
  const [internalDate, setInternalDate] = React15.useState(/* @__PURE__ */ new Date());
  const [isSidebarOpen, setIsSidebarOpen] = React15.useState(false);
  React15.useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);
  const [isModalOpen, setIsModalOpen] = React15.useState(false);
  const [selectedEvent, setSelectedEvent] = React15.useState(null);
  const [modalInitialDate, setModalInitialDate] = React15.useState(void 0);
  const view = controlledView ?? internalView;
  const currentDate = controlledDate ?? internalDate;
  const expandedEvents = React15.useMemo(() => {
    const allEvents = [];
    const rangeStart = dateFns.subDays(currentDate, 365);
    const rangeEnd = dateFns.addDays(currentDate, 365);
    events.forEach((event) => {
      if (event.recurrence) {
        try {
          const rule = new rrule.RRule({
            freq: rrule.RRule[event.recurrence.freq],
            interval: event.recurrence.interval || 1,
            dtstart: new Date(event.start),
            until: event.recurrence.until ? new Date(event.recurrence.until) : void 0,
            count: event.recurrence.count
          });
          const dates = rule.between(rangeStart, rangeEnd);
          dates.forEach((date) => {
            const duration = dateFns.differenceInMilliseconds(new Date(event.end), new Date(event.start));
            allEvents.push({
              ...event,
              id: `${event.id}-${date.getTime()}`,
              // Unique ID for each instance
              originalEventId: event.id,
              // Reference to original
              start: date,
              end: new Date(date.getTime() + duration)
            });
          });
        } catch (e) {
          console.error("Error parsing recurrence rule", e);
          allEvents.push(event);
        }
      } else {
        allEvents.push(event);
      }
    });
    return allEvents;
  }, [events, currentDate]);
  const handleViewChange = (newView) => {
    if (controlledOnViewChange) {
      controlledOnViewChange(newView);
    } else {
      setInternalView(newView);
    }
  };
  const handleDateChange = (newDate) => {
    if (controlledOnDateChange) {
      controlledOnDateChange(newDate);
    } else {
      setInternalDate(newDate);
    }
  };
  const handlePrev = () => {
    switch (view) {
      case "month":
        handleDateChange(dateFns.subMonths(currentDate, 1));
        break;
      case "week":
        handleDateChange(dateFns.subWeeks(currentDate, 1));
        break;
      case "day":
      case "resource":
        handleDateChange(dateFns.subDays(currentDate, 1));
        break;
      case "agenda":
        handleDateChange(dateFns.subDays(currentDate, 7));
        break;
    }
  };
  const handleNext = () => {
    switch (view) {
      case "month":
        handleDateChange(dateFns.addMonths(currentDate, 1));
        break;
      case "week":
        handleDateChange(dateFns.addWeeks(currentDate, 1));
        break;
      case "day":
      case "resource":
        handleDateChange(dateFns.addDays(currentDate, 1));
        break;
      case "agenda":
        handleDateChange(dateFns.addDays(currentDate, 7));
        break;
    }
  };
  const handleToday = () => {
    handleDateChange(/* @__PURE__ */ new Date());
  };
  const handleDateClick = (date) => {
    handleDateChange(date);
    handleViewChange("day");
  };
  const handleTimeSlotClick = (date) => {
    if (readOnly) return;
    setSelectedEvent(null);
    setModalInitialDate(date);
    setIsModalOpen(true);
  };
  const handleEventClickInternal = (event) => {
    if (onEventClick) {
      onEventClick(event);
    }
    if (!readOnly) {
      setSelectedEvent(event);
      setModalInitialDate(void 0);
      setIsModalOpen(true);
    }
  };
  const handleCreateEvent = () => {
    if (readOnly) return;
    setSelectedEvent(null);
    setModalInitialDate(/* @__PURE__ */ new Date());
    setIsModalOpen(true);
  };
  const handleModalSave = (eventData) => {
    let effectiveEventId = selectedEvent?.id;
    if (selectedEvent?.originalEventId) {
      effectiveEventId = selectedEvent.originalEventId;
    }
    if (effectiveEventId) {
      if (onEventUpdate) {
        onEventUpdate({
          ...eventData,
          id: effectiveEventId
        });
      }
    } else {
      if (onEventCreate) {
        onEventCreate(eventData);
      }
    }
  };
  const handleModalDelete = (eventId) => {
    let effectiveEventId = eventId;
    if (selectedEvent?.originalEventId && selectedEvent.id === eventId) {
      effectiveEventId = selectedEvent.originalEventId;
    }
    if (onEventDelete) {
      onEventDelete(effectiveEventId);
    }
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;
    const activeEvent = active.data.current?.event;
    const overDate = over.data.current?.date;
    if (!activeEvent || !overDate) return;
    const originalStart = new Date(activeEvent.start);
    const originalEnd = new Date(activeEvent.end);
    const duration = dateFns.differenceInMilliseconds(originalEnd, originalStart);
    let newStart;
    if (view === "month") {
      if (timezone) {
        const zonedOriginal = dateFnsTz.toZonedTime(originalStart, timezone);
        const zonedNew = new Date(overDate);
        zonedNew.setHours(zonedOriginal.getHours());
        zonedNew.setMinutes(zonedOriginal.getMinutes());
        zonedNew.setSeconds(zonedOriginal.getSeconds());
        zonedNew.setMilliseconds(zonedOriginal.getMilliseconds());
        newStart = dateFnsTz.fromZonedTime(zonedNew, timezone);
      } else {
        newStart = new Date(overDate);
        newStart.setHours(originalStart.getHours());
        newStart.setMinutes(originalStart.getMinutes());
        newStart.setSeconds(originalStart.getSeconds());
        newStart.setMilliseconds(originalStart.getMilliseconds());
      }
    } else {
      if (timezone) {
        newStart = dateFnsTz.fromZonedTime(overDate, timezone);
      } else {
        newStart = new Date(overDate);
      }
      newStart.setSeconds(0);
      newStart.setMilliseconds(0);
    }
    const newEnd = new Date(newStart.getTime() + duration);
    let newResourceId = activeEvent.resourceId;
    const overResourceId = over.data.current?.resourceId;
    if (overResourceId) {
      newResourceId = overResourceId;
    }
    if (newStart.getTime() === originalStart.getTime() && newEnd.getTime() === originalEnd.getTime() && newResourceId === activeEvent.resourceId) {
      return;
    }
    if (onEventDrop) {
      onEventDrop(
        { ...activeEvent, start: newStart, end: newEnd, resourceId: newResourceId },
        newStart,
        newEnd
      );
    } else if (onEventUpdate) {
      onEventUpdate({
        ...activeEvent,
        start: newStart,
        end: newEnd,
        resourceId: newResourceId
      });
    }
  };
  return {
    view,
    currentDate,
    isSidebarOpen,
    setIsSidebarOpen,
    isModalOpen,
    setIsModalOpen,
    selectedEvent,
    modalInitialDate,
    expandedEvents,
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
    handleDragEnd
  };
};
var useSwipeGesture = (options) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    threshold = 100,
    restraint = 100,
    allowedTime = 500,
    enabled = true
  } = options;
  const touchInfoRef = React15.useRef(null);
  const elementRef = React15.useRef(null);
  const handleTouchStart = React15.useCallback((e) => {
    if (!enabled) return;
    const touch = e.touches[0];
    touchInfoRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now()
    };
  }, [enabled]);
  const handleTouchEnd = React15.useCallback((e) => {
    if (!enabled || !touchInfoRef.current) return;
    const touch = e.changedTouches[0];
    const { startX, startY, startTime } = touchInfoRef.current;
    const distX = touch.clientX - startX;
    const distY = touch.clientY - startY;
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
        if (distX > 0) {
          onSwipeRight?.();
        } else {
          onSwipeLeft?.();
        }
      } else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint) {
        if (distY > 0) {
          onSwipeDown?.();
        } else {
          onSwipeUp?.();
        }
      }
    }
    touchInfoRef.current = null;
  }, [enabled, threshold, restraint, allowedTime, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown]);
  React15.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    element.addEventListener("touchstart", handleTouchStart, { passive: true });
    element.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchEnd]);
  return elementRef;
};
var useViewSwipe = (onPrev, onNext, enabled = true) => {
  return useSwipeGesture({
    onSwipeLeft: onNext,
    onSwipeRight: onPrev,
    threshold: 50,
    restraint: 100,
    allowedTime: 300,
    enabled
  });
};

// src/index.tsx
var Scheduler = ({
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
  language = "tr",
  // default language is Turkish
  onLanguageChange,
  locale,
  sidebarMenus,
  customViews
}) => {
  const [activeCustomMenu, setActiveCustomMenu] = React15.useState(null);
  const [activeCustomViewId, setActiveCustomViewId] = React15.useState(null);
  const [reverseTime, setReverseTime] = React15.useState(reverseTimeProp);
  const [activeDragEvent, setActiveDragEvent] = React15.useState(null);
  const schedulerRef = React15.useRef(null);
  const [fabCssVars, setFabCssVars] = React15.useState({});
  const [isMounted, setIsMounted] = React15.useState(false);
  const [isMobile, setIsMobile] = React15.useState(false);
  React15.useEffect(() => {
    setIsMounted(true);
  }, []);
  React15.useEffect(() => {
    if (!isMounted) return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [isMounted]);
  const syncFabTheme = React15.useCallback(() => {
    const root = schedulerRef.current;
    if (!root) return;
    const cs = getComputedStyle(root);
    const vars = ["--primary", "--primary-foreground"];
    const next = {};
    vars.forEach((name) => {
      const value = cs.getPropertyValue(name).trim();
      if (value) next[name] = value;
    });
    setFabCssVars(next);
  }, []);
  React15.useEffect(() => {
    if (!isMounted) return;
    syncFabTheme();
  }, [isMounted, theme, isDarkMode, syncFabTheme]);
  const {
    contextMenuEvent,
    contextMenuPosition,
    closeContextMenu
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
    expandedEvents
    // New export
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
  const sensors = core.useSensors(
    core.useSensor(core.PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );
  const gridSize = 15;
  const snapToGrid = modifiers.createSnapModifier(gridSize);
  const modifiers$1 = [snapToGrid, modifiers.restrictToWindowEdges];
  const dndSensors = readOnly ? [] : sensors;
  const handleEventResize = (event, newEnd) => {
    if (readOnly) return;
    if (onEventResize) {
      onEventResize(event, event.start, newEnd);
    }
    if (onEventUpdate) {
      onEventUpdate({
        ...event,
        end: newEnd
      });
    }
  };
  const id = React15.useId();
  const swipeRef = useViewSwipe(handlePrev, handleNext, true);
  const t = getTranslations(language, translations ?? {});
  const handleDragStart = (event) => {
    const { active } = event;
    const draggedEvent = expandedEvents.find((e) => e.id === active.id);
    if (draggedEvent) {
      setActiveDragEvent(draggedEvent);
    }
  };
  const onDragEndWrapper = (event) => {
    setActiveDragEvent(null);
    handleDragEnd(event);
  };
  const getDragHeight = () => {
    if (!activeDragEvent) return void 0;
    if (view === "resource") {
      return 80;
    }
    if (view !== "week" && view !== "day") return void 0;
    const duration = dateFns.differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
    const hourHeight = view === "day" ? 80 : 60;
    return duration / 60 * hourHeight;
  };
  const getDragWidth = () => {
    if (view === "month") return "100%";
    if (view === "resource" && activeDragEvent) {
      const duration = dateFns.differenceInMinutes(activeDragEvent.end, activeDragEvent.start);
      const width = duration / 60 * 100;
      return `${Math.max(width, 4)}px`;
    }
    return "150px";
  };
  const filteredEvents = React15.useMemo(() => {
    if (!calendars) return expandedEvents;
    const activeCalendarIds = calendars.filter((c) => c.active !== false).map((c) => c.id);
    return expandedEvents.filter((e) => {
      if (!e.calendarId) return true;
      return activeCalendarIds.includes(e.calendarId);
    });
  }, [expandedEvents, calendars]);
  const viewEventCount = React15.useMemo(() => {
    let rangeStart;
    let rangeEnd;
    switch (view) {
      case "month":
        rangeStart = dateFns.startOfMonth(currentDate);
        rangeEnd = dateFns.endOfMonth(currentDate);
        break;
      case "week":
        rangeStart = dateFns.startOfWeek(currentDate, { weekStartsOn: 1 });
        rangeEnd = dateFns.endOfWeek(currentDate, { weekStartsOn: 1 });
        break;
      case "day":
      case "resource":
        rangeStart = dateFns.startOfDay(currentDate);
        rangeEnd = dateFns.endOfDay(currentDate);
        break;
      case "agenda":
        rangeStart = dateFns.startOfDay(currentDate);
        rangeEnd = dateFns.addDays(rangeStart, 30);
        break;
      default:
        return filteredEvents.length;
    }
    return filteredEvents.filter(
      (e) => e.start >= rangeStart && e.start <= rangeEnd
    ).length;
  }, [filteredEvents, view, currentDate]);
  return /* @__PURE__ */ React15__namespace.default.createElement(React15__namespace.default.Fragment, null, /* @__PURE__ */ React15__namespace.default.createElement(
    core.DndContext,
    {
      id,
      sensors: dndSensors,
      onDragStart: handleDragStart,
      onDragEnd: onDragEndWrapper,
      modifiers: modifiers$1
    },
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        ref: schedulerRef,
        className: cn("flex flex-col h-full bg-background text-foreground relative", className),
        style: getThemeStyles(theme)
      },
      renderHeader ? (
        // Custom header: consumer gets full navigation/state props
        renderHeader({
          currentDate,
          view,
          onPrev: handlePrev,
          onNext: handleNext,
          onToday: handleToday,
          onViewChange: handleViewChange,
          translations: t,
          language,
          onLanguageChange,
          isDarkMode,
          onThemeToggle
        })
      ) : /* @__PURE__ */ React15__namespace.default.createElement(
        CalendarHeader,
        {
          currentDate,
          onPrev: handlePrev,
          onNext: handleNext,
          onToday: handleToday,
          view,
          onViewChange: handleViewChange,
          onMenuClick: () => setIsSidebarOpen(!isSidebarOpen),
          isDarkMode,
          onThemeToggle,
          translations: t,
          hideViewSwitcher,
          language,
          onLanguageChange,
          locale,
          onCreateEvent: handleCreateEvent,
          customViews,
          activeCustomViewId,
          onCustomViewChange: (id2) => {
            setActiveCustomViewId(id2);
            setActiveCustomMenu(null);
          },
          eventCount: viewEventCount,
          hideLanguageSwitcher
        }
      ),
      /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-1 overflow-hidden" }, /* @__PURE__ */ React15__namespace.default.createElement(
        framerMotion.motion.div,
        {
          className: "hidden md:block overflow-hidden shrink-0",
          initial: false,
          animate: {
            width: isSidebarOpen ? 256 : 0,
            opacity: isSidebarOpen ? 1 : 0
          },
          transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }
        },
        /* @__PURE__ */ React15__namespace.default.createElement(
          Sidebar,
          {
            currentDate,
            onDateChange: handleDateChange,
            onViewChange: handleViewChange,
            onEventCreate: handleCreateEvent,
            timezone,
            onTimezoneChange,
            className: "w-full h-full",
            readOnly,
            calendars,
            onCalendarToggle,
            translations: t,
            renderMiniCalendar,
            sidebarMenus,
            activeCustomMenu,
            onCustomMenuChange: (id2) => {
              setActiveCustomMenu(id2);
              setActiveCustomViewId(null);
            },
            reverseTime,
            onReverseTimeChange: setReverseTime,
            customViews,
            activeCustomViewId,
            onCustomViewChange: (id2) => {
              setActiveCustomViewId(id2);
              setActiveCustomMenu(null);
            }
          }
        )
      ), /* @__PURE__ */ React15__namespace.default.createElement(framerMotion.AnimatePresence, null, isSidebarOpen && /* @__PURE__ */ React15__namespace.default.createElement(
        framerMotion.motion.div,
        {
          key: "mobile-sidebar-overlay",
          className: "md:hidden fixed inset-0 z-[100] flex",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          transition: { duration: 0.2 }
        },
        /* @__PURE__ */ React15__namespace.default.createElement(
          framerMotion.motion.div,
          {
            className: "w-[280px] h-full bg-background shadow-2xl overflow-hidden",
            initial: { x: -280 },
            animate: { x: 0 },
            exit: { x: -280 },
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] }
          },
          /* @__PURE__ */ React15__namespace.default.createElement(
            Sidebar,
            {
              currentDate,
              onDateChange: handleDateChange,
              onViewChange: handleViewChange,
              onEventCreate: () => {
                setIsSidebarOpen(false);
                handleCreateEvent();
              },
              timezone,
              onTimezoneChange,
              className: "w-full h-full",
              readOnly,
              calendars,
              onCalendarToggle,
              translations: t,
              renderMiniCalendar,
              sidebarMenus,
              activeCustomMenu,
              onCustomMenuChange: (id2) => {
                setActiveCustomMenu(id2);
                setActiveCustomViewId(null);
                setIsSidebarOpen(false);
              },
              reverseTime,
              onReverseTimeChange: setReverseTime,
              customViews,
              activeCustomViewId,
              onCustomViewChange: (id2) => {
                setActiveCustomViewId(id2);
                setActiveCustomMenu(null);
                setIsSidebarOpen(false);
              }
            }
          )
        ),
        /* @__PURE__ */ React15__namespace.default.createElement(
          framerMotion.motion.div,
          {
            className: "flex-1 bg-black/50 backdrop-blur-sm",
            onClick: () => setIsSidebarOpen(false)
          }
        )
      )), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 flex flex-col overflow-hidden relative min-h-0" }, activeCustomMenu !== null && sidebarMenus && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 overflow-y-auto p-4 md:p-6" }, sidebarMenus.find((m) => m.id === activeCustomMenu)?.component), activeCustomViewId !== null && activeCustomMenu === null && customViews && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 overflow-y-auto p-4 md:p-6" }, customViews.find((v) => v.id === activeCustomViewId)?.component), activeCustomMenu === null && activeCustomViewId === null && (isLoading ? /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex-1 overflow-auto p-0 md:p-4 min-h-0" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "h-full min-w-full" }, view === "month" && /* @__PURE__ */ React15__namespace.default.createElement(MonthViewSkeleton, null), view === "week" && /* @__PURE__ */ React15__namespace.default.createElement(WeekViewSkeleton, null), view === "day" && /* @__PURE__ */ React15__namespace.default.createElement(DayViewSkeleton, null), view === "agenda" && /* @__PURE__ */ React15__namespace.default.createElement(AgendaViewSkeleton, null), view === "resource" && /* @__PURE__ */ React15__namespace.default.createElement(WeekViewSkeleton, null))) : (
        /* overflow-hidden here: each view owns its own scroll container */
        /* @__PURE__ */ React15__namespace.default.createElement("div", { ref: swipeRef, className: "flex-1 overflow-hidden p-0 md:p-4 touch-pan-y min-h-0" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "flex flex-col h-full min-w-full min-h-0" }, /* @__PURE__ */ React15__namespace.default.createElement(framerMotion.AnimatePresence, { mode: "wait", initial: false }, /* @__PURE__ */ React15__namespace.default.createElement(
          framerMotion.motion.div,
          {
            key: `${view}-${currentDate.toISOString()}-${timezone || "local"}`,
            initial: { opacity: 0, y: 8 },
            animate: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }
            },
            exit: {
              opacity: 0,
              y: -8,
              transition: {
                duration: 0.15,
                ease: [0.25, 0.1, 0.25, 1]
              }
            },
            className: "flex-1 min-h-0 flex flex-col",
            style: { height: "100%" }
          },
          view === "month" && /* @__PURE__ */ React15__namespace.default.createElement(
            MonthView,
            {
              currentDate,
              events: filteredEvents,
              onEventClick: handleEventClickInternal,
              onDateClick: handleDateClick,
              timezone,
              locale
            }
          ),
          view === "week" && /* @__PURE__ */ React15__namespace.default.createElement(
            WeekView,
            {
              currentDate,
              events: filteredEvents,
              onEventClick: handleEventClickInternal,
              onTimeSlotClick: handleTimeSlotClick,
              onEventResize: handleEventResize,
              timezone,
              locale,
              readonly: readOnly,
              language,
              initialScrollHour,
              reverseTime
            }
          ),
          view === "day" && /* @__PURE__ */ React15__namespace.default.createElement(
            DayView,
            {
              currentDate,
              events: filteredEvents,
              onEventClick: handleEventClickInternal,
              onTimeSlotClick: handleTimeSlotClick,
              onEventResize: handleEventResize,
              timezone,
              locale,
              readonly: readOnly,
              language,
              initialScrollHour,
              reverseTime
            }
          ),
          view === "agenda" && /* @__PURE__ */ React15__namespace.default.createElement(
            AgendaView,
            {
              currentDate,
              events: filteredEvents,
              onEventClick: handleEventClickInternal,
              onCreateEvent: handleCreateEvent,
              translations: t,
              language,
              renderEmptyState
            }
          ),
          view === "resource" && resources && /* @__PURE__ */ React15__namespace.default.createElement(
            ResourceView,
            {
              currentDate,
              events: filteredEvents,
              resources,
              onEventClick: handleEventClickInternal,
              onTimeSlotClick: (date) => {
                if (readOnly) return;
                handleTimeSlotClick(date);
              },
              locale,
              language
            }
          )
        ))))
      )))),
      renderEventForm ? renderEventForm({
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false),
        event: selectedEvent,
        initialDate: modalInitialDate,
        onSave: handleModalSave,
        onDelete: handleModalDelete
      }) : /* @__PURE__ */ React15__namespace.default.createElement(
        EventModal,
        {
          isOpen: isModalOpen,
          onClose: () => setIsModalOpen(false),
          event: selectedEvent,
          initialDate: modalInitialDate,
          onSave: handleModalSave,
          onDelete: handleModalDelete,
          calendars,
          eventTypes,
          translations: t,
          language
        }
      ),
      /* @__PURE__ */ React15__namespace.default.createElement(
        EventContextMenu,
        {
          event: contextMenuEvent,
          position: contextMenuPosition,
          onClose: closeContextMenu,
          onEdit: (event) => {
            handleEventClickInternal(event);
            closeContextMenu();
          },
          onDelete: (eventId) => {
            onEventDelete?.(eventId);
            closeContextMenu();
          },
          onDuplicate: (event) => {
            const duplicatedEvent = {
              ...event,
              id: `${event.id}-copy-${Date.now()}`,
              title: `${event.title} ${t.copy}`,
              start: new Date(event.start.getTime() + 24 * 60 * 60 * 1e3),
              // +1 day
              end: new Date(event.end.getTime() + 24 * 60 * 60 * 1e3)
            };
            onEventCreate?.(duplicatedEvent);
            closeContextMenu();
          },
          translations: {
            edit: t.edit,
            delete: t.delete,
            duplicate: t.duplicate
          }
        }
      ),
      /* @__PURE__ */ React15__namespace.default.createElement(core.DragOverlay, { dropAnimation: null }, activeDragEvent ? /* @__PURE__ */ React15__namespace.default.createElement(
        "div",
        {
          className: cn(
            "rounded-lg shadow-2xl border-2 overflow-hidden cursor-grabbing transition-transform",
            "backdrop-blur-sm",
            !activeDragEvent.color && "bg-primary/90 border-primary/60 text-primary-foreground"
          ),
          style: {
            backgroundColor: activeDragEvent.color ? `${activeDragEvent.color}e0` : void 0,
            borderColor: activeDragEvent.color ? `${activeDragEvent.color}80` : void 0,
            color: activeDragEvent.color ? "#fff" : void 0,
            width: getDragWidth(),
            height: getDragHeight() ? `${getDragHeight()}px` : void 0,
            boxShadow: `0 20px 40px -15px ${activeDragEvent.color || "var(--primary)"}40, 0 10px 20px -10px rgba(0,0,0,0.2)`,
            transform: "rotate(-2deg) scale(1.02)"
          }
        },
        /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "p-2.5 h-full flex flex-col" }, /* @__PURE__ */ React15__namespace.default.createElement(
          "div",
          {
            className: "absolute left-0 top-0 bottom-0 w-1 rounded-l-lg",
            style: { backgroundColor: activeDragEvent.color || "var(--primary)" }
          }
        ), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "pl-2" }, /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "font-semibold truncate text-sm" }, activeDragEvent.title), (view === "week" || view === "day") && getDragHeight() && getDragHeight() > 40 && /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "text-xs opacity-80 mt-0.5 flex items-center gap-1" }, /* @__PURE__ */ React15__namespace.default.createElement("svg", { className: "w-3 h-3", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2" }, /* @__PURE__ */ React15__namespace.default.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React15__namespace.default.createElement("path", { d: "M12 6v6l4 2" })), dateFns.format(activeDragEvent.start, getTimeFormatFull(language)), " - ", dateFns.format(activeDragEvent.end, getTimeFormatFull(language)))), /* @__PURE__ */ React15__namespace.default.createElement("div", { className: "absolute bottom-1.5 right-1.5 opacity-60" }, /* @__PURE__ */ React15__namespace.default.createElement("svg", { className: "w-4 h-4", viewBox: "0 0 24 24", fill: "currentColor" }, /* @__PURE__ */ React15__namespace.default.createElement("circle", { cx: "9", cy: "5", r: "1.5" }), /* @__PURE__ */ React15__namespace.default.createElement("circle", { cx: "15", cy: "5", r: "1.5" }), /* @__PURE__ */ React15__namespace.default.createElement("circle", { cx: "9", cy: "12", r: "1.5" }), /* @__PURE__ */ React15__namespace.default.createElement("circle", { cx: "15", cy: "12", r: "1.5" }), /* @__PURE__ */ React15__namespace.default.createElement("circle", { cx: "9", cy: "19", r: "1.5" }), /* @__PURE__ */ React15__namespace.default.createElement("circle", { cx: "15", cy: "19", r: "1.5" }))))
      ) : null)
    )
  ), isMounted && isMobile && !readOnly && reactDom.createPortal(
    /* @__PURE__ */ React15__namespace.default.createElement(
      "div",
      {
        style: {
          position: "fixed",
          bottom: "max(1.5rem, env(safe-area-inset-bottom, 0px))",
          right: "max(1.5rem, env(safe-area-inset-right, 0px))",
          zIndex: 9999,
          pointerEvents: "none",
          ...fabCssVars
        }
      },
      /* @__PURE__ */ React15__namespace.default.createElement(
        "button",
        {
          type: "button",
          "aria-label": t.createEvent ?? t.create ?? "Create event",
          onClick: handleCreateEvent,
          style: {
            pointerEvents: "auto",
            width: 48,
            height: 48,
            borderRadius: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "hsl(var(--primary, 221.2 83.2% 53.3%))",
            color: "hsl(var(--primary-foreground, 210 40% 98%))",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.25)"
          }
        },
        /* @__PURE__ */ React15__namespace.default.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ React15__namespace.default.createElement("path", { d: "M5 12h14" }), /* @__PURE__ */ React15__namespace.default.createElement("path", { d: "M12 5v14" }))
      )
    ),
    document.body
  ));
};
var ProScheduler = Scheduler;

exports.LANGUAGE_META = LANGUAGE_META;
exports.LOCALES = LOCALES;
exports.ProScheduler = ProScheduler;
exports.Scheduler = Scheduler;
exports.cn = cn;
exports.getTranslations = getTranslations;
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map