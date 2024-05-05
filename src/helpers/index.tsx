import { DateValue } from '@nextui-org/react';
import { getLocalTimeZone } from '@internationalized/date';
import { createBrowserHistory } from 'history';

export function isValidISODate(dateString: string): boolean {
  try {
    new Date(dateString);
    return true;
  } catch (error) {
    return false;
  }
}

export function DateToString(date: DateValue) {
  const dateString = date.toDate(getLocalTimeZone()).toISOString();

  if (!isValidISODate(dateString)) {
    console.error('Invalid date selected. Please choose a valid date.');
    return;
  }

  const formattedDate = dateString;

  return formattedDate;
}

export function getBlobFromFile(
  file: File,
  setter: (data: string | ArrayBuffer | null) => void
) {
  const reader = new FileReader();
  reader.onload = () => {
    const fileData = reader.result;
    if (typeof fileData === 'string') {
      const base64String = fileData.split(',')[1];
      setter(base64String);
    }
  };
  reader.readAsDataURL(file);
}

export const Router = createBrowserHistory({ window });
