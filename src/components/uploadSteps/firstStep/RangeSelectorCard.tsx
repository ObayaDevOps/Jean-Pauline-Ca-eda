const DUMMY_DATA = '2 hrs 15 mins';

interface Props {
  startDateTime: string;
  setStartDateTime: (start: string) => void;
  endDateTime: string;
  setEndDateTime: (start: string) => void;
}

export default function RangeSelectorCard({
  startDateTime,
  setStartDateTime,
  endDateTime,
  setEndDateTime,
}: Props) {
  return (
    <div className="border rounded min-h-[24em] w-3/5 flex flex-col justify-between items-center mr-5 pt-4 pb-10 px-12">
      <p className="text-neutral-black-80">
        Trim the GPX logs to specific time range
      </p>
      <div className="w-full flex flex-col items-center font-semibold">
        <p className="text-neutral-black-100">Accepted Range</p>
        <p className="text-3xl text-neutral-black-100 ">{DUMMY_DATA}</p>
      </div>
      <div className="border w-full h-0" />
      <div className="flex w-full justify-between">
        <div>
          <p className="font-medium text-neutral-black-60 ml-2">Start</p>
          <input
            type="dateTime-local" // this option might not allow for timezones
            name="startDateTime"
            id="startDateTime"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            className="w-64 border-neutral-black-20  rounded h-8 focus:outline-none p-2 font-medium text-neutral-black-100"
          />
        </div>
        <div>
          <p className="font-medium text-neutral-black-60 ml-2">End</p>
          <input
            type="dateTime-local" // this option might not allow for timezones
            name="endDateTime"
            id="endDateTime"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            className="w-64 border-neutral-black-20 rounded h-8 focus:outline-none p-2 font-medium text-neutral-black-100"
          />
        </div>
      </div>
    </div>
  );
}
