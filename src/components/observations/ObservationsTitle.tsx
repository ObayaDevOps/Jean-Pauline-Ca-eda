import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ObservationsTitle = ({ setViewType, viewType }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [enabled, setEnabled] = useState(false);

  const handleDateChange = (newValue) => {
    console.log("newValue:", newValue);
    setDate(newValue);
  };

  return (
    <>
      <div className="mr-6 flex gap-4 w-[72%] justify-between">
        <div className="w-[18%]">
          <label className="text-sm text-gray-400">Status</label>
          <div className="flex items-center border-b border-blue-600  focus:border-blue-600">
            <select
              id="underline_select"
              className="block py-2.5 px-0 w-full  bg-transparent border-0  appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 peer">
              <option selected>New</option>
              <option value="US">Active</option>
            </select>
          </div>
        </div>
        <div className="w-[18%]">
          <label className="text-sm text-gray-400">Priority</label>
          <div className="flex items-center border-b border-blue-600  focus:border-blue-600">
            <select
              id="underline_select"
              className="block py-2.5 px-0 w-full  bg-transparent border-0  appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 peer">
              <option selected>High</option>
              <option value="US">Critical</option>
              <option value="CA">Maintenance</option>
            </select>
          </div>
        </div>
        <div className="w-[18%]">
          <label className="text-sm text-gray-400">Assigned</label>
          <div className="flex items-center border-b border-blue-600  focus:border-blue-600">
            <select
              id="underline_select"
              className="block py-2.5 px-0 w-full  bg-transparent border-0  appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 peer">
              <option selected>Jesse Sprague</option>
              <option value="US">Jesse</option>
              {/* <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option> */}
            </select>
          </div>
        </div>
        <div className="w-[18%]">
          <label className="text-sm text-gray-400">Due date</label>
          <div className="flex border-0 border-b border-blue-600 pt-2 pb-3">
            <div className="DateContainer">
              <span className="dateInput">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dayClassName={() => "example-datepicker-day-class"}
                  popperClassName="example-datepicker-class"
                  todayButton="TODAY"
                />
              </span>
              <span className="icon">
                <img width={"20px"} height="20px" src="/icons/calendar.png" />{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="w-[18%] border-b border-blue-600">
          <div className="flex justify-between items-end pt-9">
            <p className="block  w-full  bg-transparent border-0  appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 peer">
              Archived
            </p>
            <label className="inline-flex relative items-center  cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={enabled}
                readOnly
              />
              <div
                onClick={() => {
                  setEnabled(!enabled);
                }}
                className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-blue-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-end -mb-3 items-center gap-8 pt-4">
        <span>
          {" "}
          <img
            style={{ width: "3px", height: "40px" }}
            src="/icons/verticalLine.png"
            alt="ASIO Earth"
          />
        </span>
        <span>View as:</span>
        <button
          onClick={() => setViewType(1)}
          className={`${
            viewType == 1 ? "bg-sky-200" : "bg-white"
          } p-2 rounded`}>
          <img
            style={{ width: "15px", height: "15px" }}
            src={`${
              viewType == 1 ? "/icons/viewHover1.png" : "/icons/view1.png"
            }`}
            alt="ASIO Earth"
          />
        </button>
        <button
          onClick={() => setViewType(2)}
          className={`${
            viewType == 2 ? "bg-sky-200" : "bg-white"
          } p-2 rounded`}>
          <img
            style={{ width: "15px", height: "15px" }}
            src={`${
              viewType == 2 ? "/icons/viewHover2.png" : "/icons/view2.png"
            }`}
            alt="ASIO Earth"
          />
        </button>
        <button
          onClick={() => setViewType(3)}
          className={`${
            viewType == 3 ? "bg-sky-200" : "bg-white"
          } p-2 rounded`}>
          <img
            style={{ width: "15px", height: "15px" }}
            src={`${
              viewType == 3 ? "/icons/viewHover3.png" : "/icons/view3.png"
            }`}
            alt="ASIO Earth"
          />
        </button>
      </div>
    </>
  );
};

export default ObservationsTitle;
