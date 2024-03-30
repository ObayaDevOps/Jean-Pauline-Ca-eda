import React from 'react';

interface Props {
  structure: structure;
}

interface structure {
  name: string;
  line: string;
  mile: string;
  number: string;
  longitude: number;
  latitude: number;
}

export default function LocationUpdateHeader({ structure }: Props) {
  return (
    <div className="flex">
      <div className="flex flex-col mr-8">
        <p className="text-xs text-neutral-black-60 font-semibold uppercase">
          Structure Name
        </p>
        <p className="text-2xl text-neutral-black-100 font-medium capitalize">
          {structure.name}
        </p>
      </div>
      <div className="flex flex-col mr-8">
        <p className="text-xs text-neutral-black-60 font-semibold uppercase">
          Structure Line
        </p>
        <p className="text-2xl text-neutral-black-100 font-medium capitalize">
          {structure.line}
        </p>
      </div>
      <div className="flex flex-col mr-8">
        <p className="text-xs text-neutral-black-60 font-semibold uppercase">
          Structure Mile
        </p>
        <p className="text-2xl text-neutral-black-100 font-medium capitalize">
          {structure.mile}
        </p>
      </div>
      <div className="flex flex-col mr-8">
        <p className="text-xs text-neutral-black-60 font-semibold uppercase">
          Structure Number
        </p>
        <p className="text-2xl text-neutral-black-100 font-medium capitalize">
          {structure.number}
        </p>
      </div>
    </div>
  );
}
