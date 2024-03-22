function convertDate(dateString: string): string {
  const date: Date = new Date(dateString);

  const today: Date = new Date();
  const weekStart: Date = new Date(today);
  weekStart.setHours(0, 0, 0, 0 - (today.getDay() * 24 * 60 * 60 * 1000));
  const weekEnd: Date = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  if (date.toDateString() === today.toDateString()) {
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const formattedTime: string = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
    return formattedTime;
  }
  if (date >= weekStart && date <= weekEnd) {
    const days: string[] = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    return days[date.getDay()];
  }

  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();
  const formattedDate: string = `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
  return formattedDate;
}

export default convertDate;
