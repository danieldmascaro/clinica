import React from "react";
import { useController } from "react-hook-form";

const InputField = ({name, control, rules, defaultValue = '', label, ...props}) => {
  const {field, fieldState: { error },} = useController({name, control, rules, defaultValue});

  return (
  <div className="flex flex-col">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
    <input className="p-2 text-blue-500 placeholder:text-blue-500 focus:bg-blue-100 duration-300 rounded-md border-blue-900"
      id={name}
      {...field}
      {...props}
      />
      { error && <p className="text-red-500">{error.message}</p>}
  </div>
  );
}

export default InputField;