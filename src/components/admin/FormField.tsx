"use client";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  options?: { value: string; label: string }[];
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  rows,
  options,
}: FormFieldProps) {
  const baseClass =
    "w-full rounded-sm border border-cream-dark bg-cream px-4 py-2.5 font-body text-sm text-dark placeholder:text-gray focus:border-primary focus:outline-none";

  return (
    <div>
      <label className="mb-1 block font-body text-sm font-semibold text-dark">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {options ? (
        <select name={name} value={value} onChange={onChange} required={required} className={baseClass}>
          <option value="">Select...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : rows ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={baseClass}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={baseClass}
        />
      )}
    </div>
  );
}
