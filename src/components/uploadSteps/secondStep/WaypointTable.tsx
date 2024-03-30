
interface Props {
 waypoints: [];
 }

export default function WaypointTable({
    waypoints,
}: Props) {

  return (
    <div className="border border-neutral-black-40 rounded h-full w-2/3 flex justify-center items-center mr-5">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th
              scope="col"
              className="py-1.5 pr-3 text-left text-sm font-semibold sm:pl-6"
            ></th>
            <th
              scope="col"
              className="px-3 pt-3 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              GPX #
            </th>
            <th
              scope="col"
              className="px-3 pt-3 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              Time
            </th>
            <th
              scope="col"
              className="px-3 pt-3 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              Latitude
            </th>
            <th
              scope="col"
              className="px-3 pt-3 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              Longitude
            </th>
            <th
              scope="col"
              className="px-3 pt-3 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              Elevation
            </th>
          </tr>
        </thead>
        <tbody className="">
          {waypoints.map((point) => (
            <tr key={point.id} className="hover:bg-primary-blue-10">
              <td className="whitespace-nowrap py-1 pl-4 pr-3 text-sm font-medium text-neutral-black-60 sm:pl-6">
                {point.id}
              </td>
              <td className="whitespace-nowrap px-3 py-1 text-sm text-neutral-black-100 font-medium">
                {point.gpxId}
              </td>
              <td className="whitespace-nowrap px-3 py-1 text-sm text-neutral-black-100 font-medium">
                {point.time}
              </td>
              <td className="whitespace-nowrap px-3 py-1 text-sm text-neutral-black-100 font-medium">
                {point.latitude}
              </td>
              <td className="whitespace-nowrap px-3 py-1 text-sm text-neutral-black-100 font-medium">
                {point.longitude}
              </td>
              <td className="whitespace-nowrap px-3 py-1 text-sm text-neutral-black-100 font-medium">
                {point.elevation}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
