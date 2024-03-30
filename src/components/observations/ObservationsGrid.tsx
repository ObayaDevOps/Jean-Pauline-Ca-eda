import React, { FC } from "react";

interface DataType {
  priority: string;
  observationDate: string;
  assigendTo: string;
}

interface ObservationsGridProps {
  data: DataType[];
}

const ObservationsGrid: FC<ObservationsGridProps> = ({ data }) => {
  return (
    <>
      <div className="flex justify-between mt-7">
        <div className="w-[30%]">
          <div className="flex justify-between">
            <p>
              To Do<span className="text-blue-400 pl-3">3</span>
            </p>
            <div>
              <label>Sort by:</label>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="w-[30%] rounded-lg bg-sky-200 p-4 flex flex-col gap-4 h-max">
          {data &&
            data.length &&
            data.map(
              (item) =>
                item.priority == "High" && (
                  <div className="p-4 px-6 bg-white rounded-lg text-zinc-600">
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <img
                            src="icons/decatur.png"
                            style={{ width: "12px", height: "12px" }}
                          />
                          <span> Decatur</span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="bg-yellow-400 rounded-full h-2 w-2"></div>{" "}
                          {item.priority}
                        </div>
                      </div>
                      <div>{item.observationDate}</div>
                    </div>
                    <div className="text-black text-lg">
                      Exposed Pipe Line 3Xb near Decatur
                    </div>
                    <div className="flex justify-between mb-3 mt-7">
                      <div>Due Date</div>
                      <div>{item.assigendTo}</div>
                    </div>
                  </div>
                )
            )}
        </div>
        <div className="w-[30%] rounded-lg bg-sky-200  p-4 flex flex-col gap-4 h-max">
          {data &&
            data.length &&
            data.map(
              (item) =>
                item.priority == "Critical" && (
                  <div className="p-4 px-6  bg-white rounded-lg text-zinc-600">
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <img
                            src="icons/decatur.png"
                            style={{ width: "12px", height: "12px" }}
                          />
                          <span> Decatur</span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="bg-red-400 rounded-full h-2 w-2"></div>{" "}
                          {item.priority}
                        </div>
                      </div>
                      <div>{item.observationDate}</div>
                    </div>
                    <div className="text-black text-lg">
                      Exposed Pipe Line 3Xb near Decatur
                    </div>
                    <div className="flex justify-between mb-3 mt-7">
                      <div>Due Date</div>
                      <div>{item.assigendTo}</div>
                    </div>
                  </div>
                )
            )}
        </div>
        <div className="w-[30%] rounded-lg bg-sky-200 p-4 flex flex-col gap-4 h-max">
          {data &&
            data.length &&
            data.map(
              (item) =>
                item.priority == "Maintenance" && (
                  <div className="p-4 px-6 bg-white rounded-lg text-zinc-600">
                    <div className="flex justify-between mb-3">
                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <img
                            src="icons/decatur.png"
                            style={{ width: "12px", height: "12px" }}
                          />
                          <span> Decatur</span>
                        </div>
                        <div className="flex gap-3 items-center">
                          <div className="bg-blue-400 rounded-full h-2 w-2"></div>{" "}
                          {item.priority}
                        </div>
                      </div>
                      <div>{item.observationDate}</div>
                    </div>
                    <div className="text-black text-lg">
                      Exposed Pipe Line 3Xb near Decatur
                    </div>
                    <div className="flex justify-between mb-3 mt-7">
                      <div>Due Date</div>
                      <div>{item.assigendTo}</div>
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
    </>
  );
};

export default ObservationsGrid;
