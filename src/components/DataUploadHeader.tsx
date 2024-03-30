export default function DataUploadHeader() {
  return (
    <div className="w-full">
      <p className="text-xs text-neutral-black-60 font-semibold uppercase">
        Team
      </p>
      <p className="text-3xl text-neutral-black-100 font-medium capitalize">
        **Team Name**
      </p>
      <div className="w-full flex flex-col items-center my-8">
        <p className="text-2xl text-neutral-black-100 font-semibold capitalize">
          Visual Patrol Results
        </p>
        <p className="text-lg text-neutral-black-80">
          Upload the GPX files and images, add and make edits to the
          observations.{' '}
        </p>
      </div>
      <div className="mx-10">
        <p className="text-xs text-neutral-black-60 font-semibold uppercase">
          **Collection/Track?**
        </p>
        <p className="text-2xl text-neutral-black-100 font-medium capitalize">
          **Track Name**
        </p>
        <div className="border w-full my-2" />
      </div>
    </div>
  );
}
