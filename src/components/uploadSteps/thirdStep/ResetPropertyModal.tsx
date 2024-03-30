import Button from '@/src/components/Button';
import { useState } from 'react';
import ModalBase from '../../ModalBase';

interface props {
  resetProperties(): any;
}

export default function ResetPropertyModal({ resetProperties }: props) {
  const [isResetPopertiesModalOpen, setIsResetPropertiesModalOpen] =
    useState<boolean>(false);

  const confirmReset = () => {
    resetProperties();
    setIsResetPropertiesModalOpen(false);
  };

  return (
    <>
      <Button
        text="Reset Properties"
        onClick={() => {
          setIsResetPropertiesModalOpen(true);
        }}
        caution={true}
      />

      {isResetPopertiesModalOpen && (
        <ModalBase
          isModalOpen={isResetPopertiesModalOpen}
          handleClose={() => {
            setIsResetPropertiesModalOpen(false);
          }}
          height="h-72"
          width="w-[30em]"
        >
          <div className="h-full flex flex-col mx-4">
            <p className="font-medium text-lg text-neutral-black-80">
              Reset Properties
            </p>
            <p className="grow flex items-center text-neutral-black-100 justify-center font-medium">
              Are you sure you want to reset properties? This will undo all of
              the changes you made.
            </p>

            <div className="w-full flex justify-between mt-10">
              <button
                type="button"
                onClick={() => {
                  setIsResetPropertiesModalOpen(false);
                }}
                className="text-neutral-black-60 font-medium"
              >
                Cancel
              </button>
              <Button
                text="Reset Properties"
                onClick={confirmReset}
                caution={true}
              />
            </div>
          </div>
        </ModalBase>
      )}
    </>
  );
}
