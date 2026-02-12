import { eventConfig } from '../config/event';
import { addHours, parseISO, format } from 'date-fns';

export const generateGoogleCalendarUrl = () => {
    const startDate = parseISO(eventConfig.startDateTimeISO);
    const endDate = addHours(startDate, 1); // Assume 1 hour duration

    const formatDate = (date: Date) => format(date, "yyyyMMdd'T'HHmmss");

    const params = new URLSearchParams({
        action: 'TEMPLATE',
        text: eventConfig.title,
        details: eventConfig.description,
        dates: `${formatDate(startDate)}/${formatDate(endDate)}`,
        location: eventConfig.location,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadIcsFile = () => {
    const startDate = parseISO(eventConfig.startDateTimeISO);
    const endDate = addHours(startDate, 1);

    const formatDate = (date: Date) => format(date, "yyyyMMdd'T'HHmmss");

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Brivé//Webinar//ES
BEGIN:VEVENT
UID:${crypto.randomUUID()}@brive.com
DTSTAMP:${formatDate(new Date())}Z
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${eventConfig.title}
DESCRIPTION:${eventConfig.description}
LOCATION:${eventConfig.location}
END:VEVENT
END:VCALENDAR`.trim();

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'webinar-brive.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
