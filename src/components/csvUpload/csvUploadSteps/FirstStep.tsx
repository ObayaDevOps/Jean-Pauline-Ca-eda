import StepIndicator from '@/src/components/StepIndicator';
import classNames from '@/src/app/utils/classNames';
import StepSummary from '@/src/components/StepSummary';
import Button from '@/src/components/Button';
import InfoModal from '@/src/components/InfoModal';

interface UploadStep {
  step: number;
  team: teamProp;
  track: trackProp;
  setTeam: (team: teamProp) => void;
  setTrack: (track: trackProp) => void;
  setStep: (step: number) => void;
}

interface teamProp {
  teamId: number;
  name: '';
}
interface trackProp {
  trackId: number;
  name: '';
}

export default function FirstStep({
  step,
  team,
  track,
  setTeam,
  setTrack,
  setStep,
}: UploadStep) {
  const handleTeamChange = (e: any) => {
    setTeam({
      ...team,
      [e.target.name]: e.target.value,
    });
  };
  const handleTrackChange = (e: any) => {
    setTrack({
      ...track,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={classNames('flex mt-8')}>
      <StepIndicator step={step} thisStep={1} />

      <div className="w-full pl-4 ">
        {step !== 0 && team && track && team.name && track.name ? (
          <StepSummary
            onClick={() => setStep(0)}
            mainText={'Team and Track Selected'}
            chipText={`Team: ${team.name} - Track: ${track.name}`}
          />
        ) : (
          <div className="flex items-center">
            <p className="text-neutral-black-100 font-medium">
              Which team and track this upload is for?
            </p>
            <InfoModal
              title="Selecting a Team and Track"
              text="description of information text here" //TODO
              height="h-96"
              width="w-[30em]"
            />
          </div>
        )}

        {step === 0 && (
          <>
            <div className="flex w-full py-4 space-x-8">
              <div className="w-72">
                <label
                  htmlFor="team"
                  className="block text-sm font-medium leading-6 text-neutral-black-100"
                >
                  Team
                </label>
                <select
                  id="team"
                  name="name"
                  onChange={handleTeamChange}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-neutral-black-100 ring-1 ring-inset ring-neutral-black-40 focus:ring-2 focus:ring-primary-blue-100 sm:text-sm sm:leading-6"
                  value={team.name}
                >
                  <option value="">Select a Team</option>
                  <option value="Team A">Team A</option>
                  <option value="Team B">Team B</option>
                  <option value="Team C">Team C</option>
                </select>
              </div>
              <div className="w-72">
                <label
                  htmlFor="track"
                  className="block text-sm font-medium leading-6 text-neutral-black-100"
                >
                  Track
                </label>
                <select
                  id="track"
                  name="name"
                  onChange={handleTrackChange}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-neutral-black-100 ring-1 ring-inset ring-neutral-black-40 focus:ring-2 focus:primary-blue-100 sm:text-sm sm:leading-6"
                  value={track.name}
                >
                  <option value="">Select a Track</option>
                  <option value="Track A">Track A</option>
                  <option value="Track B">Track B</option>
                  <option value="Track C">Track C</option>
                </select>
              </div>
            </div>
            <div className="rounded flex justify-end items-center my-6 ">
              <Button
                text="Continue"
                onClick={() => setStep(step + 1)}
                disabled={!team.name || !track.name}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
