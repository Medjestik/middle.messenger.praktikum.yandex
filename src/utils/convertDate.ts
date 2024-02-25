interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup';
  weekday?: 'long' | 'short' | 'narrow';
  era?: 'long' | 'short' | 'narrow';
  year?: 'numeric' | '2-digit';
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
  timeZoneName?: 'long' | 'short';
  formatMatcher?: 'best fit' | 'basic';
  hour12?: boolean;
  timeZone?: string;
}

function convertDate(dateString: string): string {
  const date: Date = new Date(dateString);

  const moscowOffset: number = 3 * 60;
  date.setMinutes(date.getMinutes() + moscowOffset);

  const today: Date = new Date();
  const weekStart: Date = new Date(today);
  weekStart.setHours(0, 0, 0, 0 - (today.getDay() * 24 * 60 * 60 * 1000));
  const weekEnd: Date = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Moscow' });
  }
  if (date >= weekStart && date <= weekEnd) {
    const days: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[date.getDay()];
  }

  const options: DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timeZone: 'Europe/Moscow',
  };
  const formattedDate: string = date.toLocaleDateString('ru-RU', options);
  return formattedDate.replace(/\sг\.$/, '');
}

export default convertDate;
