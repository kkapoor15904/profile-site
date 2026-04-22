import { format, isValid, parse } from 'date-fns';

export function formatDateRange(start?: string, end?: string) {
  const formatDatePart = (value?: string) => {
    if (!value) return '';
    if (/^\d{4}$/.test(value)) return value;

    const parsedMonthDate = parse(value, 'yyyy-MM', new Date());
    if (isValid(parsedMonthDate) && /^\d{4}-\d{2}$/.test(value)) {
      return format(parsedMonthDate, 'MMM yyyy');
    }

    const parsedFullDate = parse(value, 'yyyy-MM-dd', new Date());
    if (isValid(parsedFullDate) && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return format(parsedFullDate, 'MMM yyyy');
    }

    return value;
  };

  const formattedStart = formatDatePart(start);
  const formattedEnd = formatDatePart(end);

  if (!formattedStart && !formattedEnd) return '';
  if (formattedStart && formattedEnd) {
    return `${formattedStart} - ${formattedEnd}`;
  }

  return formattedStart || formattedEnd;
}

export function getDateValue(value?: string) {
  if (!value) return Number.NEGATIVE_INFINITY;

  if (/^\d{4}$/.test(value)) {
    return parseInt(value, 10) * 10000;
  }

  const parsedMonthDate = parse(value, 'yyyy-MM', new Date());
  if (isValid(parsedMonthDate) && /^\d{4}-\d{2}$/.test(value)) {
    return parsedMonthDate.getTime();
  }

  const parsedFullDate = parse(value, 'yyyy-MM-dd', new Date());
  if (isValid(parsedFullDate) && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return parsedFullDate.getTime();
  }

  if (value.toLowerCase() === 'present') {
    return Number.POSITIVE_INFINITY;
  }

  return Number.NEGATIVE_INFINITY;
}
