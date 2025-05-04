
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface DropzoneProps {
  onFilesAccepted: (files: File[]) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onFilesAccepted }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesAccepted(acceptedFiles);
  }, [onFilesAccepted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.ms-excel': ['.xls', '.xlsx'],
      'application/json': ['.json'],
    }
  });

  return (
    <div 
      {...getRootProps()} 
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center">
        <div className="mb-4 bg-blue-100 p-3 rounded-full">
          <Upload className="h-6 w-6 text-blue-600" />
        </div>
        <p className="text-sm font-medium">
          {isDragActive ? 'Drop the files here' : 'Upload credential spreadsheet'}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Drag and drop a CSV file, or click to browse
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Supports CSV, Excel, or JSON files
        </p>
      </div>
    </div>
  );
};
