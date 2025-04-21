import React from "react";
import { useController } from "react-hook-form";

const InputField = ({
  name,
  control,
  rules,
  defaultValue = "",
  label,
  className = "p-2 focus:bg-blue-100 focus:text-gray-700 duration-300 border rounded",
  ...props
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules, defaultValue });

  return (
    <div className="flex flex-col w-full h-full">
      <label htmlFor={name} className="block">
        {label}
      </label>
      <input
        className={className}
        id={name}
        {...field}
        {...props}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
