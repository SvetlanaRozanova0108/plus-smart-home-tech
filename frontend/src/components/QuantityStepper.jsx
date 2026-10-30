import UiIcon from './UiIcon.jsx';

export default function QuantityStepper({ value, onChange, min = 1, max = 99, size = 'md' }) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className={`stepper stepper--${size}`}>
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label="Уменьшить количество"
      >
        <UiIcon name="minus" size={15} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label="Увеличить количество"
      >
        <UiIcon name="plus" size={15} />
      </button>
    </div>
  );
}
