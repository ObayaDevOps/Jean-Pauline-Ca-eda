import classNames from '@/src/app/utils/classNames';
import { ArrowUpTrayIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUpload {
  setFileList: (file: any) => void;
  setRejectedFileList: (file: any) => void;
  small?: boolean;
}

export default function BulkImageDrop({
  setFileList,
  setRejectedFileList,
  small,
}: ImageUpload) {
  /**
   * ./src/components/pageComponents/item/CreateItem/Bulk/BulkImageDrop.jsx
   * React Hook useCallback does nothing when called with only one argument.
   * Did you forget to pass an array of dependencies?
   */

  // eslint-disable-next-line
  const onDrop = useCallback(
    (acceptedFiles: [], fileRejections: []) => {
      setFileList(acceptedFiles);
      setRejectedFileList(fileRejections);
    },
    [setFileList]
  );

  const { fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={classNames(
          'rounded border border-[3px] border-neutral-black-20 border-dashed p-2 hover:cursor-pointer flex flex-col justify-center items-center ',
          small ? 'h-36 py-4' : 'h-64 my-3'
        )}      >
        <input 
        type='image'
            accept='.png, .jpg'
        {...getInputProps()} />
        {isDragActive ? (
          <>
            <ArrowUpTrayIcon  
            className={classNames(
                ' text-neutral-black-40 animate-pulse ',
                small ? 'w-10 h-10 mb-1' : 'mb-3 w-16 h-16 '
              )} />
              
            <p className="font-medium animate-pulse text-primary-blue-100 text-lg ">
              Drop images here..
            </p>
          </>
        ) : (
          <>
            <ArrowUpTrayIcon 
                 className={classNames(
                  'text-neutral-black-40',
                  small ? 'w-10 h-10 mb-2' : 'mb-4 w-16 h-16 '
                )} />
            {small ? (
              <div className="text-sm text-center text-neutral-black-100">
                <p> Drag and Drop or</p>
                <p className="text-primary-blue-100 font-medium ">
                  Choose any additional photo(s)
                </p>
                <p> for upload.</p>
              </div>
            ) : (
              <p>
                Drag and Drop or{' '}
                <span className="text-primary-blue-100 font-medium">
                  Choose Photo(s)
                </span>{' '}
                to upload.
              </p>
            )}
          </>
        )}
      </div>
      {fileRejectionItems && fileRejectionItems.length > 0 && (
        <>
          <p className="text-lg font-medium flex items-center">
            <ExclamationCircleIcon className="h-5 w-5 text-secondary-red-100 mr-3" />
            Incorrect File Type
          </p>
          <ul>{fileRejectionItems}</ul>
        </>
      )}
    </div>
  );
}
