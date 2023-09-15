import React from "react";

interface Props {
  label?: string;
  options: string[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  [key: string]: any;
}

export default function SelectBox({ options, label, onChange }: Props) {
  return (
    <div>
      {label && (
        <label className="label" dir="rtl">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select
        className="select select-accent w-full max-w-xs capitalize"
        onChange={onChange}
      >
        {options.map((opt) => (
          <option value={opt} key={opt} className="capitalize">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
