/** @format */

import React from "react";

interface FileDetailsProps {
  file: File;
}

const formatFileSize = (sizeInBytes: number): string => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} bytes`;
  } else if (sizeInBytes < 1024 * 1024) {
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  } else {
    return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
  }
};

const FileDetails: React.FC<FileDetailsProps> = ({ file }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <p className="text-sm font-semibold mt-4 w-4/5 text-center">
        {file.name}
      </p>
      <p className="text-gray-100 text-center w-80 text-xs">
        {formatFileSize(file.size)}
      </p>
    </div>
  );
};

export default FileDetails;
