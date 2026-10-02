/**
 * Date & Calendar helpers for Ponleu & Meyjing's Engagement Ceremony
 */

// Ceremony Date: Tuesday, August 17, 2027 at 8:00 PM (Phnom Penh UTC+7)
export const CEREMONY_DATE_STR = '2027-08-17T20:00:00+07:00';
export const CEREMONY_TIMESTAMP = new Date(CEREMONY_DATE_STR).getTime();

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasPassed: boolean;
}

export function calculateTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const difference = CEREMONY_TIMESTAMP - now;

  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      hasPassed: true,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    hasPassed: false,
  };
}

/**
 * Generate Google Calendar URL
 */
export function getGoogleCalendarUrl(): string {
  const title = encodeURIComponent('ពិធីភ្ជាប់ពាក្យ ពន្លឺ & ម៉ីជីង');
  const details = encodeURIComponent(
    "សូមគោរពអញ្ជើញចូលរួមពិធីពិសាស្លាភ្ជាប់ពាក្យ ពន្លឺ & ម៉ីជីង។ រួមជាមួយមាតាបិតាទាំងសងខាង យើងខ្ញុំមានកិត្តិយសសូមគោរពអញ្ជើញលោកអ្នកចូលរួមក្នុងថ្ងៃដ៏មានសិរីមង្គលនេះ។\n\nសម្លៀកបំពាក់: ប្រពៃណីខ្មែរ ឬសមរម្យសម័យទំនើប (ពណ៌ផ្ទៃមេឃស្រាល / ស)\nទីតាំង: គេហដ្ឋានខាងស្រី រាជធានីភ្នំពេញ (កូដទីតាំង: GR4H+89W រាជធានីភ្នំពេញ)"
  );
  const location = encodeURIComponent("គេហដ្ឋានខាងស្រី GR4H+89W រាជធានីភ្នំពេញ កម្ពុជា");
  // 20270817T130000Z to 20270817T170000Z (20:00 to 00:00 UTC+7)
  const dates = '20270817T130000Z/20270817T170000Z';

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/**
 * Download .ics file for Apple Calendar / Outlook
 */
export function downloadIcsFile(): void {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ponleu and Meyjing//Engagement Ceremony//KM',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:ponleu-meyjing-engagement-20270817@invitation.app',
    'DTSTAMP:20261001T000000Z',
    'DTSTART:20270817T130000Z',
    'DTEND:20270817T170000Z',
    'SUMMARY:ពិធីភ្ជាប់ពាក្យ ពន្លឺ & ម៉ីជីង',
    "DESCRIPTION:សូមគោរពអញ្ជើញចូលរួមពិធីពិសាស្លាភ្ជាប់ពាក្យ ពន្លឺ & ម៉ីជីង នៅគេហដ្ឋានខាងស្រី រាជធានីភ្នំពេញ (កូដទីតាំង: GR4H+89W)\\n\\nសម្លៀកបំពាក់: សម្លៀកបំពាក់ប្រពៃណីខ្មែរ ឬសមរម្យសម័យទំនើប",
    "LOCATION:គេហដ្ឋានខាងស្រី, GR4H+89W, រាជធានីភ្នំពេញ",
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Ponleu_Meyjing_Engagement_Ceremony.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
