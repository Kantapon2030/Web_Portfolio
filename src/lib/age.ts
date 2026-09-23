/**
 * Age calculation utility
 * Calculates exact age in years, months, and days based on local calendar dates,
 * properly accounting for leap years, variable days in months, and Feb 29 leap day birthdays.
 */

export interface DetailedAge {
  years: number;
  months: number;
  days: number;
  text: string;
  ariaLabel: string;
}

/**
 * Returns whether a year is a leap year in the Gregorian calendar.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns the number of days in a specific month of a specific year (1-indexed month: 1=Jan, 12=Dec).
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Calculates exact age in years, months, days from a birthdate string (YYYY-MM-DD)
 * to a target date (defaults to current local date).
 */
export function calculateDetailedAge(
  birthDateString: string,
  currentDate: Date = new Date()
): DetailedAge {
  const parts = birthDateString.split('-').map((p) => parseInt(p, 10));
  if (parts.length !== 3 || parts.some(isNaN)) {
    return {
      years: 17,
      months: 0,
      days: 0,
      text: '17 ปี',
      ariaLabel: 'อายุ 17 ปี',
    };
  }

  const [birthYear, birthMonth, birthDay] = parts;

  // Use local calendar year, month (1-indexed), and day
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let years = currentYear - birthYear;
  let months = currentMonth - birthMonth;
  let days = currentDay - birthDay;

  // If current day is less than birth day, borrow days from previous month
  if (days < 0) {
    months -= 1;
    // Month to borrow from: month prior to currentMonth in currentYear
    // If currentMonth is 1 (Jan), previous month is Dec (month 12) of currentYear - 1
    const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    days += daysInPrevMonth;
  }

  // If current month is less than birth month, borrow from previous year
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const text = `${years} ปี ${months} เดือน ${days} วัน`;
  const ariaLabel = `อายุ ${years} ปี ${months} เดือน ${days} วัน`;

  return {
    years,
    months,
    days,
    text,
    ariaLabel,
  };
}
