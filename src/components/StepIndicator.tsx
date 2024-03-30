// import { useState } from 'react';
import classNames from '../app/utils/classNames';

interface UploadStep {
  step: number;
  thisStep: number;
  last?: boolean;
  noPoints?: boolean;
}

export default function StepIndicator({
  step,
  thisStep,
  last,
  noPoints,
}: UploadStep) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={classNames(
          'rounded-full h-6 w-6 flex justify-center items-end text-neutral-black-02 font-semibold text-sm',
          !noPoints && step === thisStep - 1 && 'bg-primary-blue-100',
          !noPoints && step < thisStep - 1 && 'bg-neutral-black-40',
          !noPoints && step > thisStep - 1 && 'bg-secondary-green-100',
          noPoints && 'bg-neutral-black-10'
        )}
      >
        <p>{thisStep}</p>
      </div>

      <div
        className={classNames(
          'w-0',
          last !== true && 'border',
          step === thisStep - 1 ? 'grow' : 'h-4'
        )}
      />
    </div>
  );
}
