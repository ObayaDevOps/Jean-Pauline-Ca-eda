import React, { Fragment } from 'react';
import classNames from '@/src/app/utils/classNames';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
interface Props {
  children: string | JSX.Element | JSX.Element[];
  isModalOpen: boolean;
  handleClose(): any;
  height?: string;
  width?: string;
}

export default function ModalBase({
  children,
  isModalOpen,
  handleClose,
  height,
  width,
}: Props) {
  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="absolute z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-in duration-600"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-black-100/25 backdrop-blur transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-in duration-600"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-50"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-out duration-300"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-50"
            >
              <Dialog.Panel
                className={classNames(
                  height || 'h-[30rem]',
                  width || 'w-[35rem]',
                  'relative transform overflow-hidden rounded-lg bg-white px-7 py-7 text-neutral-black-100 shadow-xl transition-all '
                )}
              >
                <XMarkIcon
                  className="absolute right-6 top-6 h-5 w-5 text-neutral-black-80"
                  onClick={handleClose}
                />

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
