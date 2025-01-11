import clsx from "clsx";
import { Upload, X } from "lucide-react";
import { useRef } from "react";

interface FileUploadBoxProps {
  title: string; 
  description: string; 
  exampleText: string;
  required?: boolean;
  accept: string;
  fileKey: 'drawing' | 'bom' | 'fromTo';
  files: { [key: string]: File | null };
  setFiles: React.Dispatch<React.SetStateAction<{ [key: string]: File | null }>>;
}

export const FileUploadBox = ({ 
  title, 
  description, 
  exampleText,
  required = false,
  accept,
  fileKey,
  files,
  setFiles,
}: FileUploadBoxProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!files[fileKey]) {
      inputRef.current?.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [fileKey]: file }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [fileKey]: file }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles(prev => ({ ...prev, [fileKey]: null }));
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={clsx(
        "relative border-2 border-dashed rounded-lg p-6 text-center transition-colors",
        files[fileKey] ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-500 cursor-pointer"
      )}
    >
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
        accept={accept}
      />
      
      {files[fileKey] && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      )}

      <div className="mb-4">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
      </div>
      <div className="flex items-center justify-center gap-1 mb-2">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        {required && <span className="text-red-500">*</span>}
      </div>
      {files[fileKey] ? (
        <p className="text-sm text-blue-600 font-medium">
          {files[fileKey]?.name}
        </p>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
            {exampleText}
          </a>
        </>
      )}
    </div>
  );
};