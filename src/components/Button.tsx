import classNames from '@/src/app/utils/classNames';

interface ButtonProps {
  text: string;
  disabled?: boolean;
  caution?: boolean;
  onClick(): any;
}

export default function Button({
  text,
  disabled,
  caution,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'rounded-md text-neutral-black-02 font-semibold px-8 py-2  hover:brightness-110 disabled:bg-neutral-black-40 disabled:hover:brightness-100',
        caution ? 'bg-extended-yellow-120' : 'bg-primary-blue-100 '
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
