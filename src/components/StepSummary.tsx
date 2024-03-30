interface StepSummary {
  chipText: string;
  mainText: string;
  onClick(): any;
}

export default function StepSummary({ chipText, mainText, onClick }: StepSummary) {
  return (

    <button
    type="button"
    onClick={onClick}
    className="flex space-x-3 items-center"
  >
    <p className="text-neutral-black-100 font-medium">
      {mainText}
    </p>
    <div className="bg-primary-blue-10 rounded-full font-medium text-extended-blue-150 py-0.5 px-3">
      <p>{chipText}</p>
    </div>
  </button>

  );
}
