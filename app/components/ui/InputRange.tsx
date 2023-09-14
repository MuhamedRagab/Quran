import React from "react";

interface Props {
  label?: string;
  min?: number;
  max?: number;
  value?: number;
  step?: number;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
}

export default function InputRange({
  label,
  min = 1,
  max = 100,
  value = 25,
  step = 25,
  className,
  onChange,
  ...props
}: Props) {
  return (
    <div>
      {label && (
        <label className="label" dir="rtl">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type="range"
        className={`range ${className}`}
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={onChange}
        {...props}
      />
      <div className="w-full flex justify-between text-xs px-2">
        {Array((((max - min) / step) | 0) + 1)
          .fill(null)
          .map((_, i) => (
            <span key={i}>{min + i * step}</span>
          ))}
      </div>
    </div>
  );
}
