import React, { Fragment } from 'react';

import classNames from '@/src/app/utils/classNames';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import ModalBase from '@/src/components/ModalBase';

interface Props {
  title?: string;
  text?: string;
  height?: string;
  width?: string;
  muted?: boolean;
}

export default function InfoModal({
  title,
  text,
  height,
  width,
  muted,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        <InformationCircleIcon
          className={classNames(
            'h-5 w-5 m-1',
            muted ? 'text-neutral-black-60 ' : 'text-neutral-black-100'
          )}
        />
      </button>

      <ModalBase
        isModalOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        height={height}
        width={width}
      >
        <p className="text-xl font-medium mb-6 text-neutral-black-100">{title}</p>
        <p className='text-neutral-black-100'> {text}</p>
      </ModalBase>
    </>
  );
}
