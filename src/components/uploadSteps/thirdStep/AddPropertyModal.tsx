import { PlusIcon } from '@heroicons/react/24/outline';
import ModalBase from '@/src/components/ModalBase';
import Button from '@/src/components/Button';
import { useEffect, useState } from 'react';

interface props {
  addedColumns: colProp[];
  setAddedColumns: (cols: colProp[]) => void;
}

interface colProp {
  name: string;
  value: string;
}

export default function AddPropertyModal({
  addedColumns,
  setAddedColumns,
}: props) {
  const [isAddPropertiesModalOpen, setIsAddPropertiesModalOpen] =
    useState<boolean>(false);
  const [propertyWithValue, setPropertyWithValue] = useState<boolean>(false);
  const [propertyName, setPropertyName] = useState<string>('');
  const [propertyValue, setPropertyValue] = useState<string>('');
  const [duplicateColName, setDuplicateColName] = useState<boolean>(false);

  useEffect(() => {
    if (!propertyWithValue) {
      setPropertyValue('');
    }
  }, [propertyWithValue]);
  useEffect(() => {
    if (!isAddPropertiesModalOpen) {
      resetPropertyModal();
    }
  }, [isAddPropertiesModalOpen]);
  useEffect(() => {
    if (propertyName && addedColumns && addedColumns.length > 0) {
      const propNameMatch = addedColumns?.filter(
        (el) => el.name === propertyName.trim()
      );
      if (propNameMatch.length > 0) {
        setDuplicateColName(true);
      } else {
        setDuplicateColName(false);
      }
    }
  }, [propertyName, addedColumns]);

  const handleAddProperty = () => {
    if (propertyName) {
      const newProp = { name: propertyName, value: propertyValue };
      setAddedColumns([...addedColumns, newProp]);
      resetPropertyModal();
    }
  };

  const resetPropertyModal = () => {
    setIsAddPropertiesModalOpen(false);
    setPropertyName('');
    setPropertyValue('');
    setPropertyWithValue(false);
  };
  return (
    <>
      <button
        type="button"
        onClick={() => setIsAddPropertiesModalOpen(true)}
        className="rounded bg-primary-blue-100 flex py-0.5 pl-2 pr-1 items-center text-neutral-black-02 text-sm uppercase space-x-1.5"
      >
        <p className=''>Add Property </p>
        <PlusIcon className="h-5 w-5" />
      </button>

      <ModalBase
        isModalOpen={isAddPropertiesModalOpen}
        handleClose={() => {
          setIsAddPropertiesModalOpen(false);
        }}
      >
        <div className="h-full flex flex-col justify-between p-4">
          <p className="font-medium text-lg text-neutral-black-100">
            Add Property
          </p>
          <div className="space-y-10">
            <div>
              <div className=" mb-1 flex justify-between">
                <p className="text-neutral-black-60 font-medium">
                  Property Name
                </p>
                {duplicateColName && (
                  <p className="text-secondary-red-100 font-medium">
                    Column name already used!
                  </p>
                )}
              </div>

              <input
                placeholder="Name"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}
                className="border border-neutral-black-20 text-neutral-black-100 rounded w-full py-1 px-3 focus:outline-none"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={propertyWithValue}
                onChange={() => {
                  setPropertyWithValue(!propertyWithValue);
                }}
                className="border border-[3px] border-neutral-black-20 rounded p-1 h-5 w-5 focus:outline-none"
              />
              <p className="ml-5">Apply a value to all rows</p>
            </div>
            <div className={propertyWithValue ? '' : 'opacity-40'}>
              <p className="text-neutral-black-60 font-medium mb-1">
                Property Value
              </p>
              <input
                placeholder="Value"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                disabled={!propertyWithValue}
                className="border border-neutral-black-20 rounded w-full py-1 px-3 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-full flex justify-between mt-10">
            <button
              type="button"
              onClick={resetPropertyModal}
              className="text-neutral-black-60 font-medium"
            >
              Discard
            </button>
            <Button
              disabled={duplicateColName || !propertyName}
              text="Add Property"
              onClick={handleAddProperty}
            />
          </div>
        </div>
      </ModalBase>
    </>
  );
}
