import Image from "next/image";
import Link from "next/link";
import React, { useState, FC } from "react";
import Header from "./Header";
import ObservationsTitle from "./ObservationsTitle";
import ObservationsContent from "./ObservationsContent";

interface ViewType {
  viewType: number;
  setViewType: React.Dispatch<React.SetStateAction<number>>;
}

const Observations: FC = () => {
  const [viewType, setViewType] = useState<number>(1);

  return (
    <>
      <Header />
      <main className="p-6 sm:p-10 space-y-6 bg-white h-full">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <ObservationsTitle setViewType={setViewType} viewType={viewType} />
        </div>

        <section className="grid md:grid-cols-1 xl:grid-cols-1 gap-6">
          <ObservationsContent viewType={viewType} />
        </section>
      </main>
    </>
  );
};

export default Observations;
