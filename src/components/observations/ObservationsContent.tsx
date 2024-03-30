import React, { useState, FC } from "react";
import Table, {
  SelectColumnFilter,
  StatusPill,
  LocateCell,
} from "./ObservationsTable";

import ObservationsGrid from "./ObservationsGrid";
import ObservationsMap from "./ObservationsMap";

interface DataType {
  type: string;
  priority: string;
  status: string;
  assigendTo: string;
  observationDate: string;
  geometry: [number, number];
  imgUrl: string;
}

const getData = (): Array<DataType> => [
  {
    id: 1,
    type: "Debris",
    priority: "High",
    status: "Active",
    assigendTo: "Admin",
    observationDate: "2023-1-1",
    geometry: [35.668641, 139.750567],
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 2,
    type: "Debris",
    priority: "High",
    status: "Active",
    assigendTo: "Admin",
    observationDate: "2023-1-1",
    geometry: [26.345345, 43.45],
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 3,
    type: "Debris",
    priority: "High",
    status: "Active",
    assigendTo: "Admin",
    observationDate: "2023-1-1",
    geometry: [26, 90],
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 4,
    type: "Debris",
    priority: "Critical",
    status: "Active",
    assigendTo: "Admin",
    observationDate: "2023-1-1",
    geometry: [28, 50],
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 5,
    type: "Debris",
    priority: "Maintenance",
    status: "Active",
    assigendTo: "Admin",
    observationDate: "2023-1-1",
    geometry: [6, 100],
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    id: 8,
    type: "Debris",
    priority: "Critical",
    status: "Active",
    assigendTo: "Admin",
    observationDate: "2023-1-1",
    geometry: [29, 50],
    imgUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

interface ObservationsContentProps {
  viewType: number;
}

const ObservationsContent: FC<ObservationsContentProps> = ({ viewType }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Observation Date",
        accessor: "observationDate",
        Cell: LocateCell,
        posAccessor: "posCoords",
      },
      {
        Header: "Assigned to",
        accessor: "assigendTo",
        Filter: SelectColumnFilter,
        filter: "includes",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
    ],
    []
  );
  const data = React.useMemo(() => getData(), []);

  //Pagination
  const [activePage, setActivePage] = useState(15);
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <>
      {viewType == 1 && (
        <div className="">
          <div className="flex gap-5 pt-6 pb-8">
            <div className="py-3 pr-8  font-medium text-xl">Count 154</div>
            <div className="flex bg-amber-100 py-3 px-4 gap-4 rounded-full text-amber-400">
              <img width="15px" height={"15px"} src="/icons/lightning.png" />
              <p className="pt-1">23 Unread</p>
            </div>
            <div className="flex py-3 px-4 gap-4 rounded-full bg-red-100 text-red-500 text">
              <img
                width="25px"
                height={"25px"}
                className="object-contain"
                src="/icons/warning.png"
              />{" "}
              <p className="pt-1">Observations are not assigned</p>
            </div>
          </div>
          <Table columns={columns} data={data} />{" "}
        </div>
      )}
      {viewType == 2 && <ObservationsGrid data={data} />}{" "}
      {viewType == 3 && (
        <div style={{ height: "70vh" }}>
          <ObservationsMap data={data} />
        </div>
      )}
    </>
  );
};

export default ObservationsContent;
