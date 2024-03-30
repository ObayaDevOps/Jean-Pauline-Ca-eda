import { useState } from 'react';
import FirstStep from './csvUploadSteps/FirstStep';
import SecondStep from './csvUploadSteps/SecondStep';
import ThirdStep from './csvUploadSteps/ThirdStep';
import FinishStep from './csvUploadSteps/FinishStep';

interface teamProp {
  teamId: number;
  name: '';
}

interface trackProp {
  trackId: number;
  name: '';
}

export default function CSVUpload() {
  const [step, setStep] = useState<number>(0);
  const [team, setTeam] = useState<teamProp>({
    teamId: 0,
    name: '',
  });
  const [track, setTrack] = useState<trackProp>({
    trackId: 0,
    name: '',
  });
  const [csvData, setCsvData] = useState<File>();
  const [fileList, setFileList] = useState([]);
  const [bulkUpload, setBulkUpload] = useState<{}>({});

  const submitBulkUpload = () => {
    // setBulkUpload({
    //   teamId: team.teamId,
    //   trackId: track.trackId,
    //   csv: csvData.data,
    //   fileList: fileList,
    // });
    console.log({
      team: team,
      track: track,
      csv: csvData,
      fileList: fileList,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center my-8">
        <p className="text-2xl text-neutral-black-100 font-semibold capitalize">
          Bulk Observation Upload with CSV
        </p>
        <p className="text-lg text-neutral-black-80">
          Upload a CSV file and the relevant images to create records of
          observations for that patrol.
        </p>
      </div>

      <div className="mx-10 my-3 text-sm">
        <div className="border w-full my-2" />
        <FirstStep
          step={step}
          team={team}
          track={track}
          setTeam={setTeam}
          setTrack={setTrack}
          setStep={setStep}
        />

        <SecondStep
          step={step}
          csvData={csvData}
          setCsvData={setCsvData}
          setStep={setStep}
        />
        <ThirdStep
          step={step}
          fileList={fileList}
          csvData={csvData}
          setFileList={setFileList}
          setStep={setStep}
        />
        <FinishStep
          step={step}
          submitBulkUpload={submitBulkUpload}
          setStep={setStep}
        />
      </div>
    </>
  );
}
