import { useState } from 'react';

export default function useCustomFileUpload(initialFiles: File[] = []) {
  const [files, setFiles] = useState<File[]>(initialFiles);

  const handleFileChange = (index: number, file: File) => {
    const newFiles = [...files];
    newFiles[index] = file;
    setFiles(newFiles);
  };

  return {
    files,
    handleFileChange,
  };
}
