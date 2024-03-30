import classNames from '@/src/app/utils/classNames';
import InfoModal from '@/src/components/InfoModal';
import AddPropertyModal from './AddPropertyModal';

interface props {
  waypoints: pointProp[];
  addedColumns: colProp[];
  setAddedColumns: (cols: colProp[]) => void;
}

interface colProp {
  name: string;
  value: string;
}
interface pointProp {
  id: string;
  gpxId: string;
  time: string;
  latitude: string;
  longitude: string;
  elevation: string;
  line: string;
}

export default function PropertyTable({
  waypoints,
  addedColumns,
  setAddedColumns,
}: props) {
  return (
    <div className="border border-neutral-black-40 rounded w-full flex justify-center items-center my-5 mr-5">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th
              scope="col"
              className="py-1.5 pr-3 text-left text-sm font-semibold sm:pl-6"
            ></th>
            <th
              scope="col"
              className="px-3 pt-2 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              GPX #
            </th>
            <th
              scope="col"
              className="px-3 pt-2 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              Time
            </th>
            <th
              scope="col"
              className="px-3 pt-2 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              Latitude
            </th>
            <th
              scope="col"
              className="px-3 pt-2 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              Longitude
            </th>
            <th
              scope="col"
              className="px-3 pt-2 text-left text-sm font-semibold text-neutral-black-60 uppercase"
            >
              Elevation
            </th>

            <th
              scope="col"
              className="px-3 pt-2 text-left text-sm font-semibold text-neutral-black-60 uppercase flex items-center"
            >
              <p>Line</p>
              <InfoModal
                title="What Is a Line?"
                text="description of information text here" //TODO
                height="h-96"
                width="w-[30em]"
                muted={true}
              />{' '}
            </th>
            {addedColumns && addedColumns.length > 0 && (
              <>
                {addedColumns.map((col) => (
                  <th
                    key={col.name}
                    scope="col"
                    className="px-3 py-2 text-left text-sm font-semibold text-neutral-black-60 uppercase"
                  >
                    {col.name}
                  </th>
                ))}
              </>
            )}
            <th
              scope="col"
              className="py-2 pr-2 text-right text-sm font-semibold uppercase "
            >
              <div className="flex justify-end">
                <AddPropertyModal
                  addedColumns={addedColumns}
                  setAddedColumns={setAddedColumns}
                />
              </div>
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
              <td
                className={classNames(
                  'whitespace-nowrap px-3 py-1 text-sm font-medium',
                  point && point.line
                    ? 'text-neutral-black-100'
                    : 'text-neutral-black-40'
                )}
              >
                {point && point.line ? point.line : 'Unknown'}
              </td>
              {addedColumns && addedColumns.length > 0 && (
                <>
                  {addedColumns.map((col) => (
                    <td
                      key={col.name}
                      className={classNames(
                        'whitespace-nowrap px-3 py-1 text-sm text-neutral-black-100 font-medium',
                        col.value
                          ? 'text-neutral-neutral-black-100'
                          : 'text-neutral-black-40'
                      )}
                    >
                      {col.value ? col.value : '--'}
                    </td>
                  ))}
                </>
              )}
              <td className="whitespace-nowrap py-1 text-sm text-neutral-black-100 font-medium" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
