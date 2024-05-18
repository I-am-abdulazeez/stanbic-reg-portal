import { DateValue } from '@nextui-org/react';
import { getLocalTimeZone } from '@internationalized/date';
import useStore from 'src/store';
import { StoreDocumentUploadType, base64Type } from 'src/types';

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
  setter: (data: base64Type) => void,
  fieldName: keyof StoreDocumentUploadType
) {
  const reader = new FileReader();
  reader.onload = () => {
    const fileData = reader.result;
    if (typeof fileData === 'string') {
      const originalString = fileData;
      setter(originalString);
      useStore.setState((state) => ({
        currentUserDocs: {
          ...state.currentUserDocs,
          [fieldName]: originalString as base64Type,
        },
      }));
    }
  };
  reader.readAsDataURL(file);
}

export function getFileFromBlob(
  base64String: string,
  fileName: string
): File | null {
  // Extracting MIME type from base64 string
  const mimeTypeRegex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/;
  const matches = base64String.match(mimeTypeRegex);

  if (!matches || matches.length !== 2) {
    console.error('Invalid base64 string format');
    return null;
  }

  const mimeType = matches[1];

  // Extracting file extension from MIME type
  const extension = mimeType.split('/')[1];

  // Convert base64 string to byte array
  const byteCharacters = atob(base64String.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Create Blob from byte array
  const blob = new Blob([byteArray], { type: mimeType });

  // Append file extension to the file name
  const fileNameWithType = `${fileName}.${extension}`;

  // Create File object
  return new File([blob], fileNameWithType, { type: mimeType });
}
