import React, { MouseEventHandler, useState } from 'react';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from '@nextui-org/react';

import { FileUploadProps } from 'src/types';

const FileUpload = (props: FileUploadProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [file, setFile] = useState<File | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      props.onFileChange(selectedFile, props.fileType);
    }
  };

  const handleFileClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    if (file) {
      onOpen();
    }
  };

  return (
    <div className="flex flex-col">
      <label
        className={`transition-all flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed border-gray-200 cursor-pointer hover:border-gray-300 ${
          file ? 'border-green-500' : null
        }`}
      >
        <svg
          className="w-6 h-6 text-gray-500 mb-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        <span className="text-sm text-gray-500">{props.label}</span>
        <input
          type="file"
          className="hidden"
          accept={props.accept}
          onChange={handleInputChange}
        />
      </label>

      {file && (
        <div
          onClick={handleFileClick}
          className="border border-green-500 cursor-pointer bg-green-100 text-green-800 px-2 py-1 mt-2 rounded-md"
        >
          Preview: {file.name}
        </div>
      )}
      {file && (
        <Modal isOpen={isOpen} onClose={onClose} placement="center">
          <ModalContent>
            <ModalHeader>{file.name}</ModalHeader>
            <ModalBody>
              <img src={URL.createObjectURL(file)} alt={file.name} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default FileUpload;
